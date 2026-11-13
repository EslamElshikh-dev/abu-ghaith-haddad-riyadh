import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import { ArrowIcon } from '@/components/SiteChrome';
import { blogPosts } from '@/lib/blog';

export default function BlogPreview({ service = false }) {
  const posts = service ? [blogPosts[0], blogPosts[2], blogPosts[4]] : blogPosts.slice(0, 3);
  return (
    <section className="section blog-preview" id="panel-guides">
      <div className="shell">
        <div className="section-heading"><div><span className="kicker">من مدونة أبو غيث</span><h2>قرار أوضح قبل أول مقاس</h2></div><div className="blog-preview-intro"><p>أدلة عملية عن اختيار الساندوتش بانل وتكلفته وتفاصيل التنفيذ داخل الرياض.</p><Link className="text-link" href="/blog">كل أدلة الساندويتش بانل <ArrowIcon /></Link></div></div>
        <div className="blog-preview-grid">{posts.map((post) => <BlogCard post={post} key={post.slug} />)}</div>
      </div>
    </section>
  );
}
