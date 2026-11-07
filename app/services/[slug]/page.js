import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsappIcon } from '@/components/SiteChrome';
import { site, services, getService, whatsappUrl, realPhotos } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import { serviceStructuredData } from '@/lib/structured-data';
import JsonLd from '@/components/JsonLd';
import ServiceCard from '@/components/ServiceCard';

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.description, path: `/services/${service.slug}`, image: service });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const currentIndex = services.findIndex((s) => s.slug === slug);
  const related = [1, 2, 3].map((offset) => services[(currentIndex + offset) % services.length]);
  return (
    <main id="main-content">
      <JsonLd id="service-structured-data" data={serviceStructuredData(service)} />
      <section className="service-hero"><div className="shell service-hero-grid">
        <div className="service-hero-copy"><nav className="breadcrumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link><span>/</span><Link href="/services">الخدمات</Link><span>/</span><strong aria-current="page">{service.label}</strong></nav><span className="kicker light">خدمة داخل مدينة الرياض</span><h1>{service.title}</h1><p>{service.intro}</p><div className="hero-actions"><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappIcon className="button-icon" /> أرسل صورة الموقع</a><a className="button button-outline-light" href={`tel:${site.phone}`}><PhoneIcon className="button-icon" /> اتصال مباشر</a></div></div>
        <div className="service-hero-image"><Image src={service.image} alt={service.alt} fill priority sizes="(max-width: 900px) 100vw, 48vw" /></div>
      </div></section>

      <section className="section service-content-section"><div className="shell service-content-grid">
        <article className="service-article"><span className="kicker">تفاصيل الخدمة</span><h2>{service.label} حسب مساحة الموقع والاستخدام</h2>{service.paragraphs.map((p) => <p key={p}>{p}</p>)}<div className="feature-panel"><h2>ما الذي يشمله التخطيط للتنفيذ؟</h2><ul>{service.benefits.map((benefit) => <li key={benefit}><CheckIcon />{benefit}</li>)}</ul></div></article>
        <aside className="contact-card"><span>اطلب الخدمة</span><h2>أرسل المقاس أو صورة الموقع</h2><p>اذكر الحي، نوع الخدمة، المقاسات التقريبية، والشكل المطلوب لبدء مناقشة التفاصيل.</p><a className="button button-whatsapp full-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappIcon className="button-icon" /> واتساب {site.phoneDisplay}</a><a className="button button-dark full-button" href={`tel:${site.phone}`}><PhoneIcon className="button-icon" /> اتصال مباشر</a><a className="service-location-link" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">الموقع: {site.address.short}</a><small>نطاق الخدمة: مدينة الرياض</small></aside>
      </div></section>

      <section className="section service-process"><div className="shell"><div className="section-heading compact-heading"><div><span className="kicker">خطوات التنفيذ</span><h2>مسار واضح من الفكرة إلى التشطيب</h2></div></div><ol className="process-grid"><li><span>01</span><h3>معاينة الأبعاد والاستخدام</h3></li><li><span>02</span><h3>تحديد الشكل والخامة</h3></li><li><span>03</span><h3>التفصيل والتجهيز</h3></li><li><span>04</span><h3>التركيب ومراجعة التشطيب</h3></li></ol></div></section>

      <section className="section service-proof"><div className="shell service-proof-grid"><div><span className="kicker">تجهيز ميداني</span><h2>سيارة ومعدات أبو غيث للوصول للمواقع داخل الرياض</h2><p>سيارة الخدمة والمعدات المستخدمة في أعمال الحدادة والوصول إلى مواقع العملاء داخل مدينة الرياض.</p><a className="text-link" href="/#real-work">شاهد جميع الصور الفعلية <ArrowIcon /></a></div><div className="service-proof-image"><Image src="/images/abu-ghaith-truck-equipment-01.webp" alt={realPhotos[0].alt} fill sizes="(max-width: 820px) 100vw, 48vw" /></div></div></section>

      <section className="section faq-section service-faq"><div className="shell faq-grid"><div className="faq-heading"><span className="kicker">أسئلة شائعة</span><h2>أسئلة عن {service.label}</h2><p>توضح هذه الإجابات المعلومات الأساسية قبل اعتماد المقاس ونطاق العمل.</p></div><div className="faq-list">{service.faq.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>

      <section className="section related-section"><div className="shell"><div className="section-heading"><div><span className="kicker">خدمات مرتبطة</span><h2>قد تحتاج أيضًا</h2></div><Link className="text-link" href="/services">عرض جميع الخدمات <ArrowIcon /></Link></div><div className="services-grid related-grid">{related.map((item) => <ServiceCard key={item.slug} service={item} />)}</div></div></section>
    </main>
  );
}
