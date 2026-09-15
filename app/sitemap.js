import { site, services } from '@/lib/site';
export default function sitemap() {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...services.map((service) => ({ url: `${site.url}/services/${service.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }))
  ];
}
