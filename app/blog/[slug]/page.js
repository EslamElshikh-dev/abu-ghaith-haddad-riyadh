import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import JsonLd from '@/components/JsonLd';
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsappIcon } from '@/components/SiteChrome';
import { blogPosts, getBlogPost, getRelatedPosts, blogWhatsappUrl, coverCaption, formatBlogDate } from '@/lib/blog';
import { site } from '@/lib/site';
import { blogMetadata } from '@/lib/metadata';
import { blogPostStructuredData } from '@/lib/structured-data';

export const dynamicParams = false;
export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return post ? blogMetadata(post) : {};
}

function ArticleSection({ section }) {
  return (
    <section className="blog-article-section" id={section.id} aria-labelledby={`${section.id}-heading`}>
      <h2 id={`${section.id}-heading`}>{section.title}</h2>
      {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
      {section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
      {section.table && <div className="blog-table-scroll" role="region" aria-label={`جدول: ${section.title}`} tabIndex={0}><table><caption>{section.title}</caption><thead><tr>{section.table.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>}
      {section.callout && <aside className="blog-callout"><span className="kicker">ضعها في اعتبارك</span><p>{section.callout}</p></aside>}
      {section.paragraphsAfter?.map((p) => <p key={p}>{p}</p>)}
    </section>
  );
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);
  return (
    <main id="main-content" className="blog-main">
      <JsonLd id="article-structured-data" data={blogPostStructuredData(post)} />
      <article>
        <header className="blog-article-header"><div className="shell">
          <nav className="breadcrumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link><span aria-hidden="true">/</span><Link href="/blog">المدونة</Link><span aria-hidden="true">/</span><strong aria-current="page">{post.category}</strong></nav>
          <div className="blog-article-heading"><Link className="blog-category" href="/blog">{post.category}</Link><h1>{post.title}</h1><p className="blog-article-lead">{post.lead}</p><div className="blog-byline"><span>إعداد: <a href={site.profileUrl} target="_blank" rel="noopener noreferrer">{post.author}</a></span><time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time><span>{post.readingMinutes} دقائق قراءة</span></div></div>
        </div></header>
        <figure className="shell blog-article-cover"><div><Image src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} priority sizes="(max-width: 1180px) 100vw, 1180px" /></div><figcaption>{coverCaption}</figcaption></figure>
        <div className="shell blog-reading-layout">
          <aside className="blog-sidebar"><nav className="blog-toc" aria-label="فهرس المقال"><span className="kicker">في هذا الدليل</span><ol>{post.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol><a className="text-link" href="#article-questions">أسئلة شائعة <ArrowIcon /></a></nav><div className="blog-sidebar-contact"><span>من المعرفة إلى التنفيذ</span><strong>ساندوتش بانل حسب موقعك ومقاسك</strong><Link href="/services/sandwich-panel">تفاصيل خدمة أبو غيث <ArrowIcon /></Link><a href={site.profileUrl} target="_blank" rel="noopener noreferrer">صور النشاط على Google ↗</a></div></aside>
          <div className="blog-article-body">
            <section className="blog-takeaways" aria-label="أهم النقاط"><span className="kicker">ابدأ بهذه النقاط</span><ul>{post.takeaways.map((point) => <li key={point}><CheckIcon />{point}</li>)}</ul></section>
            {post.sections.map((section) => <ArticleSection section={section} key={section.id} />)}
            <section className="blog-inline-service"><span className="kicker">خدمة مرتبطة بهذا الدليل</span><h2>تركيب ساندوتش بانل بالرياض مع أبو غيث</h2><p>أسقف وجدران وغرف وتغطيات حسب الموقع والمقاس، مع مناقشة الهيكل المعدني والفتحات وتشطيب الحواف ضمن نطاق العمل.</p><Link className="text-link" href="/services/sandwich-panel">تفاصيل الخدمة وصور الملف <ArrowIcon /></Link><Link className="text-link" href="/services/warehouses-hangars">أعمال الهناجر والمستودعات <ArrowIcon /></Link></section>
            <section className="blog-article-faq" id="article-questions"><span className="kicker">أسئلة شائعة</span><h2>إجابات تكمل الصورة</h2><div className="faq-list">{post.faq.map(([q, a], index) => <details key={q} open={index === 0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
            {post.sources.length > 0 && <section className="blog-sources"><h2>مراجع فنية للاطلاع</h2><p>المراجع التالية تخص أنظمة ومنتجات محددة؛ يُرجع في التنفيذ إلى مستندات المنتج الفعلي والتصميم المعتمد للمشروع.</p><ul>{post.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul></section>}
            <section className="blog-article-contact"><span className="kicker light">خلّ طلبك أوضح من البداية</span><h2>صورة للموقع، ومقاس مبدئي، ونرتب التفاصيل</h2><p>أرسل الحي داخل الرياض ونوع الاستخدام والمقاسات التقريبية، مع صور للهيكل والفتحات إن وجدت.</p><div className="hero-actions"><a className="button button-primary" href={blogWhatsappUrl(post)} target="_blank" rel="noopener noreferrer"><WhatsappIcon className="button-icon" /> ناقش طلب الساندوتش بانل</a><a className="button button-outline-light" href={`tel:${site.phone}`}><PhoneIcon className="button-icon" /> {site.phoneDisplay}</a></div><a className="blog-google-link" href={site.profileUrl} target="_blank" rel="noopener noreferrer">زيارة ملف أبو غيث التجاري على Google ↗</a></section>
          </div>
        </div>
      </article>
      <section className="section blog-related"><div className="shell"><div className="section-heading"><div><span className="kicker">أكمل قراءة الصورة</span><h2>أدلة مرتبطة بطلبك</h2></div><Link className="text-link" href="/blog">العودة إلى المدونة <ArrowIcon /></Link></div><div className="blog-grid">{related.map((item) => <BlogCard post={item} key={item.slug} />)}</div></div></section>
    </main>
  );
}
