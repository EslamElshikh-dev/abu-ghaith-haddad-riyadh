import { site, realPhotos } from './site.js';

export const absoluteUrl = (path = '/') => new URL(path, `${site.url}/`).href;

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

