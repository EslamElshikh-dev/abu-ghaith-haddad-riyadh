import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '@/components/SiteChrome';

export default function BlogCard({ post, index, featured = false }) {
  return (
    <article className={`blog-card${featured ? ' blog-card-featured' : ''}`} id={`guide-${post.slug}`}>
      <Link className="blog-card-image" href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
        <Image src={post.image.src} alt={post.image.alt} fill sizes={featured ? '(max-width: 820px) 100vw, 53vw' : '(max-width: 620px) 100vw, (max-width: 1020px) 50vw, 40vw'} />
        {typeof index === 'number' && <span className="blog-card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
      </Link>
      <div className="blog-card-copy">
        <div className="blog-card-meta"><span>{post.category}</span><span>{post.readingMinutes} دقائق قراءة</span></div>
        <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <p>{featured ? post.lead : post.description}</p>
        <Link className="text-link" href={`/blog/${post.slug}`} aria-label={`اقرأ: ${post.title}`}>اقرأ الدليل <ArrowIcon /></Link>
      </div>
    </article>
  );
}
