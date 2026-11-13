import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { site, services, realPhotos } from '../lib/site.js';
import { pageMetadata, blogMetadata } from '../lib/metadata.js';
import { blogPosts, getRelatedPosts, blogWhatsappUrl } from '../lib/blog.js';
import { homeStructuredData, servicesStructuredData, serviceStructuredData, blogStructuredData, blogPostStructuredData, serializeJsonLd, ids } from '../lib/structured-data.js';

const graphs = [homeStructuredData(), servicesStructuredData(), ...services.map(serviceStructuredData), blogStructuredData(), ...blogPosts.map(blogPostStructuredData)];
const nodesOfType = (data, type) => data['@graph'].filter((node) => [].concat(node['@type']).includes(type));

function walk(value, visit) {
  if (!value || typeof value !== 'object') return;
  visit(value);
  for (const child of Object.values(value)) walk(child, visit);
}

test('every page has one consistent business and website identity', () => {
  assert.equal(site.name, 'أبو غيث حداد أبواب ونوافذ وسندوتش بانل');
  assert.equal(site.profileName, 'أبو غيث حداد ابواب ونوافذ');
  assert.ok(site.description.startsWith(site.profileName));
  for (const data of graphs) {
    const businesses = nodesOfType(data, 'HomeAndConstructionBusiness');
    const websites = nodesOfType(data, 'WebSite');
    assert.equal(businesses.length, 1);
    assert.equal(websites.length, 1);
    assert.equal(businesses[0].name, site.profileName);
    assert.equal(websites[0].name, site.name);
    assert.equal(businesses[0].telephone, site.phone);
    assert.equal(websites[0].publisher['@id'], businesses[0]['@id']);
    assert.equal(websites[0].creator['@id'], ids.developer);
  }
});

test('JSON-LD identifiers are unique and all references resolve', () => {
  for (const data of graphs) {
    const definitions = new Set();
    const references = [];
    walk(data, (node) => {
      if (!node['@id']) return;
      if (Object.keys(node).length === 1) references.push(node['@id']);
      else {
        assert.ok(!definitions.has(node['@id']), `Duplicate entity: ${node['@id']}`);
        definitions.add(node['@id']);
      }
    });
    for (const id of references) assert.ok(definitions.has(id), `Unresolved entity: ${id}`);
  }
});

test('service pages map each service to its provider, canonical page, and actual category URL', () => {
  for (const service of services) {
    const data = serviceStructuredData(service);
    const item = nodesOfType(data, 'Service')[0];
    const page = nodesOfType(data, 'WebPage')[0];
    const trail = nodesOfType(data, 'BreadcrumbList')[0];
    assert.equal(item.provider['@id'], ids.business);
    assert.equal(item.name, service.title);
    assert.equal(page.mainEntity['@id'], item['@id']);
    assert.equal(item.mainEntityOfPage['@id'], page['@id']);
    assert.equal(page.url, `${site.url}/services/${service.slug}`);
    assert.deepEqual(trail.itemListElement.map((entry) => entry.position), [1, 2, 3]);
    assert.equal(trail.itemListElement[1].item, `${site.url}/services`);
    assert.equal(trail.itemListElement[2].item, page.url);
    assert.ok(trail.itemListElement.every((entry) => !entry.item.includes('#')));
  }
});

test('catalog represents the eight real service pages without fabricated commercial terms', () => {
  for (const data of graphs.slice(0, 2)) {
    const catalog = nodesOfType(data, 'OfferCatalog')[0];
    assert.equal(catalog.numberOfItems, services.length);
    assert.deepEqual(catalog.itemListElement.map((offer) => offer.itemOffered.url), services.map((service) => `${site.url}/services/${service.slug}`));
  }
  for (const data of graphs) walk(data, (node) => {
    assert.ok(!('aggregateRating' in node));
    assert.ok(!('review' in node));
    assert.ok(!('price' in node));
    assert.ok(!('openingHoursSpecification' in node));
    assert.notEqual(node['@type'], 'FAQPage');
  });
});

test('page metadata keeps the site name on shared previews and canonical URLs', () => {
  const home = pageMetadata();
  assert.deepEqual(home.title, { absolute: site.homeTitle });
  assert.equal(home.openGraph.siteName, site.name);
  assert.equal(home.openGraph.url, `${site.url}/`);
  for (const service of services) {
    const path = `/services/${service.slug}`;
    const metadata = pageMetadata({ title: service.title, description: service.description, path, image: service });
    assert.equal(metadata.title, service.title);
    assert.equal(metadata.alternates.canonical, path);
    assert.equal(metadata.openGraph.siteName, site.name);
    assert.equal(metadata.openGraph.title, `${service.title} | ${site.name}`);
    assert.equal(metadata.openGraph.images[0].url, `${site.url}${service.image}`);
  }
});

test('JSON-LD serialization cannot terminate its script element', () => {
  const value = { name: '</script><script>alert(1)</script>\u2028\u2029' };
  const serialized = serializeJsonLd(value);
  assert.ok(!serialized.includes('<'));
  assert.ok(!serialized.includes('\u2028'));
  assert.ok(!serialized.includes('\u2029'));
  assert.deepEqual(JSON.parse(serialized), value);
});

test('all referenced WebP files have complete containers', async () => {
  const images = new Set([...realPhotos.map((photo) => photo.src), ...services.map((service) => service.image), ...services.flatMap((service) => (service.projectPhotos || []).map((photo) => photo.src)), ...blogPosts.map((post) => post.image.src)]);
  for (const image of images) {
    const bytes = await readFile(new URL(`../public${image}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', image);
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', image);
    assert.equal(bytes.readUInt32LE(4) + 8, bytes.length, `Truncated image: ${image}`);
  }
});

test('five discoverable blog articles have unique identities and valid navigation targets', () => {
  assert.equal(blogPosts.length, 5);
  for (const key of ['slug', 'title', 'description']) assert.equal(new Set(blogPosts.map((post) => post[key])).size, 5);
  const list = nodesOfType(blogStructuredData(), 'ItemList')[0];
  assert.equal(list.numberOfItems, 5);
  assert.deepEqual(list.itemListElement.map((item) => item.url), blogPosts.map((post) => `${site.url}/blog/${post.slug}`));
  for (const post of blogPosts) {
    assert.match(post.slug, /^[a-z0-9-]+$/);
    assert.ok(post.wordCount > 450, post.slug);
    assert.equal(new Set(post.sections.map((section) => section.id)).size, post.sections.length);
    assert.equal(getRelatedPosts(post).length, 2);
    assert.ok(getRelatedPosts(post).every((item) => item.slug !== post.slug));
    const contact = new URL(blogWhatsappUrl(post));
    assert.equal(contact.hostname, 'wa.me');
    assert.equal(contact.pathname, `/${site.whatsapp}`);
    assert.ok(contact.searchParams.get('text').includes(post.title));
  }
});

test('article markup and previews identify the actual business, page, cover and publication date', () => {
  for (const post of blogPosts) {
    const data = blogPostStructuredData(post);
    const article = nodesOfType(data, 'BlogPosting')[0];
    const page = nodesOfType(data, 'WebPage')[0];
    const image = data['@graph'].find((node) => node['@id'] === article.image['@id']);
    const metadata = blogMetadata(post);
    const path = `/blog/${post.slug}`;
    assert.equal(article.headline, post.title);
    assert.equal(article.author['@id'], ids.business);
    assert.equal(article.publisher['@id'], ids.business);
    assert.equal(article.mainEntityOfPage['@id'], page['@id']);
    assert.equal(page.mainEntity['@id'], article['@id']);
    assert.equal(article.url, `${site.url}${path}`);
    assert.equal(article.datePublished, post.datePublished);
    assert.ok(Number.isFinite(Date.parse(article.datePublished)));
    assert.ok(Date.parse(article.dateModified) >= Date.parse(article.datePublished));
    assert.equal(image.url, `${site.url}${post.image.src}`);
    assert.ok(image.width >= 1200 && image.height > 600);
    assert.equal(metadata.alternates.canonical, path);
    assert.equal(metadata.openGraph.type, 'article');
    assert.equal(metadata.openGraph.publishedTime, article.datePublished);
    assert.equal(metadata.openGraph.images[0].url, image.url);
    assert.equal(nodesOfType(data, 'HomeAndConstructionBusiness')[0].sameAs[0], site.profileUrl);
    assert.deepEqual(nodesOfType(data, 'BreadcrumbList')[0].itemListElement.map((item) => item.item), [`${site.url}/`, `${site.url}/blog`, article.url]);
  }
});

