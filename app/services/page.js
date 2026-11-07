import Link from 'next/link';
import { site, services } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import { servicesStructuredData } from '@/lib/structured-data';
import JsonLd from '@/components/JsonLd';
import ServiceCard from '@/components/ServiceCard';

export const metadata = pageMetadata({ title: 'خدمات الحدادة والساندويتش بانل بالرياض', path: '/services' });

export default function ServicesPage() {
  return (
    <main id="main-content">
      <JsonLd id="services-structured-data" data={servicesStructuredData()} />
      <section className="services-index-hero">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link><span aria-hidden="true">/</span><strong aria-current="page">الخدمات</strong></nav>
          <span className="kicker light">{site.name}</span>
          <h1>حدادة وساندويتش بانل،<br /><em>حسب احتياج موقعك.</em></h1>
          <p>اختر نوع العمل للاطلاع على نطاق الخدمة والصور والمعلومات المطلوبة لبدء مناقشة مشروعك داخل الرياض.</p>
          <div className="service-filter-links" aria-label="روابط الخدمات">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.label}</Link>)}</div>
        </div>
      </section>
      <section className="section services-index-content" aria-labelledby="services-list-title">
        <div className="shell">
          <div className="section-heading"><div><span className="kicker">نطاق التنفيذ</span><h2 id="services-list-title">الخدمة المناسبة تبدأ بتفاصيل واضحة</h2></div><p>الموقع، المقاسات، الاستخدام، والفتحات المطلوبة تساعد على تحديد نطاق العمل قبل الاتفاق.</p></div>
          <div className="services-grid">{services.map((service, index) => <ServiceCard service={service} index={index} key={service.slug} />)}</div>
        </div>
      </section>
    </main>
  );
}
