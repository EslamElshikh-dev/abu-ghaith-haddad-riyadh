import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import JsonLd from '@/components/JsonLd';
import { ArrowIcon, WhatsappIcon } from '@/components/SiteChrome';
import { blogPosts, blogTitle, blogDescription } from '@/lib/blog';
import { site, whatsappUrl } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import { blogStructuredData } from '@/lib/structured-data';

export const metadata = { ...pageMetadata({ title: 'مدونة ساندوتش بانل بالرياض', description: blogDescription, path: '/blog', image: blogPosts[0].image }), title: { absolute: 'مدونة ساندوتش بانل بالرياض | أبو غيث' } };

export default function BlogPage() {
  return (
    <main id="main-content" className="blog-main">
      <JsonLd id="blog-structured-data" data={blogStructuredData()} />
      <section className="blog-masthead">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link><span aria-hidden="true">/</span><strong aria-current="page">المدونة</strong></nav>
          <div className="blog-masthead-grid"><div><span className="kicker light">دفتر أبو غيث · الرياض</span><h1>{blogTitle}<em>من أول فكرة<br />إلى آخر تفصيلة.</em></h1></div><div className="blog-masthead-note"><span className="blog-edition">دليل اختيار وتنفيذ</span><p>خمس قراءات تساعدك تختار الخامة، ترتب المساحة، وتقارن العرض وتراجع الاستلام. معرفة عملية تبدأ منها طلبك بثقة ووضوح.</p><Link className="text-link light-link" href="/services/sandwich-panel">اكتشف خدمة الساندويتش بانل <ArrowIcon /></Link></div></div>
          <nav className="blog-topics" aria-label="موضوعات المدونة">{blogPosts.map((post, index) => <a href={`#guide-${post.slug}`} key={post.slug}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{post.category}</a>)}</nav>
        </div>
      </section>
      <section className="blog-stories" aria-label="مقالات الساندوتش بانل"><div className="shell"><BlogCard post={blogPosts[0]} index={0} featured /><div className="blog-grid">{blogPosts.slice(1).map((post, index) => <BlogCard key={post.slug} post={post} index={index + 1} />)}</div></div></section>
      <section className="blog-bottom-contact"><div className="shell blog-bottom-grid"><div><span className="kicker">الفكرة عندك، والخطوة الجاية نرتبها معك</span><h2>عندك موقع يحتاج ساندوتش بانل في الرياض؟</h2><p>أرسل الحي وصورة الموقع والمقاسات التقريبية ونوع الاستخدام؛ نناقش معك نطاق العمل والتفاصيل المطلوبة.</p><div className="hero-actions"><a className="button button-dark" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappIcon className="button-icon" /> ناقش طلبك على واتساب</a><a className="button blog-button-outline" href={site.profileUrl} target="_blank" rel="noopener noreferrer">ملف أبو غيث على Google <ArrowIcon /></a></div></div><div className="blog-location-note"><span>خدمة داخل مدينة الرياض</span><strong>{site.profileName}</strong><address>{site.address.short}</address><a href={`tel:${site.phone}`} dir="ltr">{site.phoneDisplay}</a></div></div></section>
    </main>
  );
}
