import { site, services } from '@/lib/site';
import { blogPosts } from '@/lib/blog';
export default function sitemap() {
  return [
    { url: `${site.url}/`, lastModified: new Date(site.updatedAt), changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/services`, lastModified: new Date(site.updatedAt), changeFrequency: 'monthly', priority: 0.8 },
    ...services.map((service) => ({ url: `${site.url}/services/${service.slug}`, lastModified: new Date(site.updatedAt), changeFrequency: 'monthly', priority: 0.8 })),
    { url: `${site.url}/blog`, lastModified: new Date(blogPosts[0].dateModified), changeFrequency: 'weekly', priority: 0.8 },
    ...blogPosts.map((post) => ({ url: `${site.url}/blog/${post.slug}`, lastModified: new Date(post.dateModified), changeFrequency: 'monthly', priority: 0.7 }))
  ];
}

