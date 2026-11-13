import { site, realPhotos } from './site.js';

export const absoluteUrl = (path = '/') => new URL(path, `${site.url}/`).href;

export function blogMetadata(post) {
  const metadata = pageMetadata({ title: post.seoTitle, description: post.description, path: `/blog/${post.slug}`, image: post.image });
  const title = `${post.seoTitle} | ${site.shortName}`;
  return {
    ...metadata,
    title: { absolute: title },
    authors: [{ name: site.profileName, url: site.profileUrl }],
    publisher: site.profileName,
    openGraph: { ...metadata.openGraph, type: 'article', title, publishedTime: post.datePublished, modifiedTime: post.dateModified, authors: [site.url], section: post.category },
    twitter: { ...metadata.twitter, title }
  };
}

export function pageMetadata({ title = site.name, description = site.description, path = '/', image = realPhotos[0] } = {}) {
  const fullTitle = path === '/' ? site.homeTitle : `${title} | ${site.name}`;
  const imageUrl = absoluteUrl(image.src || image.image);
  return {
    title: path === '/' ? { absolute: site.homeTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      siteName: site.name,
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      images: [{ url: imageUrl, alt: image.alt, ...(image.width && image.height ? { width: image.width, height: image.height } : {}) }]
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [imageUrl] }
  };
}

