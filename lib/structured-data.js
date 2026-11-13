import { site, services, realPhotos, businessPostalAddress } from './site.js';
import { absoluteUrl } from './metadata.js';

export const ids = {
  business: `${site.url}/#business`,
  website: `${site.url}/#website`,
  area: `${site.url}/#service-area`,
  catalog: `${site.url}/services#catalog`,
  developer: 'https://www.eslam-elshikh.com/#person'
};

const ref = (id) => ({ '@id': id });
const graph = (nodes) => ({ '@context': 'https://schema.org', '@graph': nodes });

function photoNode(photo) {
  return {
    '@type': 'ImageObject',
    '@id': `${site.url}/#real-photo-${realPhotos.indexOf(photo) + 1}`,
    url: absoluteUrl(photo.src),
    contentUrl: absoluteUrl(photo.src),
    width: photo.width,
    height: photo.height,
    caption: photo.caption,
    description: photo.alt,
    inLanguage: 'ar-SA'
  };
}

function baseNodes({ includeCatalog = false, photos = [realPhotos[0]] } = {}) {
  return [
    {
      '@type': 'HomeAndConstructionBusiness',
      '@id': ids.business,
      name: site.profileName,
      alternateName: site.shortName,
      description: site.description,
      url: absoluteUrl(),
      telephone: site.phone,
      address: businessPostalAddress,
      hasMap: site.mapsUrl,
      sameAs: [site.profileUrl],
      image: ref(`${site.url}/#real-photo-1`),
      areaServed: ref(ids.area),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phone,
        contactType: 'customer service',
        availableLanguage: ['ar'],
        areaServed: ref(ids.area)
      },
      ...(includeCatalog ? { hasOfferCatalog: ref(ids.catalog) } : {})
      // Opening hours and prices are omitted until operational details are confirmed.
      // Do not add self-serving rating markup to the business's own website.
    },
    {
      '@type': 'WebSite',
      '@id': ids.website,
      name: site.name,
      alternateName: site.shortName,
      url: absoluteUrl(),
      description: site.description,
      inLanguage: 'ar-SA',
      publisher: ref(ids.business),
      creator: ref(ids.developer),
      creditText: 'تصميم وبرمجة وتطوير الموقع: المهندس إسلام الشيخ'
    },
    {
      '@type': 'City',
      '@id': ids.area,
      name: site.city,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: site.address.addressRegion,
        containedInPlace: { '@type': 'Country', name: 'المملكة العربية السعودية', identifier: 'SA' }
      }
    },
    {
      '@type': 'Person',
      '@id': ids.developer,
      name: 'إسلام الشيخ',
      alternateName: ['المهندس إسلام الشيخ', 'Eslam Elshikh'],
      url: 'https://www.eslam-elshikh.com/',
      sameAs: ['https://github.com/EslamElshikh-dev']
    },
    ...photos.map(photoNode)
  ];
}

function catalogNode() {
  return {
    '@type': 'OfferCatalog',
    '@id': ids.catalog,
    name: 'خدمات الحدادة والمظلات والساندويتش بانل في الرياض',
    url: absoluteUrl('/services'),
    numberOfItems: services.length,
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      url: absoluteUrl(`/services/${service.slug}`),
      itemOffered: {
        '@type': 'Service',
        '@id': `${site.url}/services/${service.slug}#service`,
        name: service.title,
        serviceType: service.serviceType,
        description: service.description,
        url: absoluteUrl(`/services/${service.slug}`),
        provider: ref(ids.business),
        areaServed: ref(ids.area)
      }
    }))
  };
}

function breadcrumbNode(path, service) {
  const url = absoluteUrl(path);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: absoluteUrl() },
      { '@type': 'ListItem', position: 2, name: 'الخدمات', item: absoluteUrl('/services') },
      ...(service ? [{ '@type': 'ListItem', position: 3, name: service.label, item: url }] : [])
    ]
  };
}

export function homeStructuredData() {
  return graph([
    ...baseNodes({ includeCatalog: true, photos: realPhotos }),
    catalogNode(),
    {
      '@type': 'WebPage',
      '@id': `${site.url}/#webpage`,
      url: absoluteUrl(),
      name: site.homeTitle,
      description: site.description,
      isPartOf: ref(ids.website),
      about: ref(ids.business),
      mainEntity: ref(ids.business),
      primaryImageOfPage: ref(`${site.url}/#real-photo-1`),
      inLanguage: 'ar-SA'
    }
  ]);
}

export function servicesStructuredData() {
  const url = absoluteUrl('/services');
  return graph([
    ...baseNodes({ includeCatalog: true }),
    catalogNode(),
    breadcrumbNode('/services'),
    {
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name: `خدمات ${site.name} في الرياض`,
      description: site.description,
      isPartOf: ref(ids.website),
      about: ref(ids.business),
      mainEntity: ref(ids.catalog),
      breadcrumb: ref(`${url}#breadcrumb`),
      primaryImageOfPage: ref(`${site.url}/#real-photo-1`),
      inLanguage: 'ar-SA'
    }
  ]);
}

export function serviceStructuredData(service) {
  const path = `/services/${service.slug}`;
  const url = absoluteUrl(path);
  const projectPhotos = service.projectPhotos || [];
  const projectPhotoIds = projectPhotos.map((_, index) => `${url}#project-photo-${index + 1}`);
  return graph([
    ...baseNodes(),
    ...projectPhotos.map((photo, index) => ({
      '@type': 'ImageObject',
      '@id': projectPhotoIds[index],
      url: absoluteUrl(photo.src),
      contentUrl: absoluteUrl(photo.src),
      width: photo.width,
      height: photo.height,
      caption: photo.caption,
      description: photo.alt,
      inLanguage: 'ar-SA'
    })),
    ...(projectPhotos.length ? [{
      '@type': 'ImageGallery',
      '@id': `${url}#gallery`,
      name: 'صور ساندوتش بانل من ملف أبو غيث التجاري',
      url: `${url}#panel-project-gallery`,
      isPartOf: ref(`${url}#webpage`),
      image: projectPhotoIds.map(ref),
      inLanguage: 'ar-SA'
    }] : []),
    {
      '@type': 'ImageObject',
      '@id': `${url}#primaryimage`,
      url: absoluteUrl(service.image),
      contentUrl: absoluteUrl(service.image),
      caption: service.alt,
      inLanguage: 'ar-SA'
    },
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: service.title,
      serviceType: service.serviceType,
      description: service.description,
      url,
      image: ref(`${url}#primaryimage`),
      areaServed: ref(ids.area),
      provider: ref(ids.business),
      mainEntityOfPage: ref(`${url}#webpage`)
    },
    breadcrumbNode(path, service),
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: service.title,
      description: service.description,
      isPartOf: ref(ids.website),
      about: ref(ids.business),
      mainEntity: ref(`${url}#service`),
      primaryImageOfPage: ref(`${url}#primaryimage`),
      ...(projectPhotos.length ? { hasPart: ref(`${url}#gallery`) } : {}),
      breadcrumb: ref(`${url}#breadcrumb`),
      inLanguage: 'ar-SA'
    }
  ]);
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

