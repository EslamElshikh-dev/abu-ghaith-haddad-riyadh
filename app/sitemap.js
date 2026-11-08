import { site, services } from '@/lib/site';
export default function sitemap() {
  return [
    { url: `${site.url}/`, lastModified: new Date(site.updatedAt), changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/services`, lastModified: new Date(site.updatedAt), changeFrequency: 'monthly', priority: 0.8 },
    ...services.map((service) => ({ url: `${site.url}/services/${service.slug}`, lastModified: new Date(site.updatedAt), changeFrequency: 'monthly', priority: 0.8 }))
  ];
}
