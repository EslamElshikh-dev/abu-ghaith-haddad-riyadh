import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsappIcon } from '@/components/SiteChrome';
import { site, services, getService, whatsappUrl, realPhotos, businessPostalAddress, businessOpeningHours } from '@/lib/site';

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | أبو غيث حداد بالرياض`,
    description: service.description,
    keywords: [service.title, service.serviceType, `${service.serviceType} بالرياض`, 'حداد بالرياض', 'أبو غيث حداد'],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `/services/${service.slug}`,
      images: [{ url: service.image, alt: service.alt }]
    },
    twitter: { title: service.title, description: service.description, images: [service.image] }
  };
}

function schemaFor(service) {
  const url = `${site.url}/services/${service.slug}`;
  const area = {
    '@type': 'City',
    name: 'الرياض',
    containedInPlace: {
      '@type': 'AdministrativeArea', name: 'منطقة الرياض',
      containedInPlace: { '@type': 'Country', name: 'المملكة العربية السعودية', identifier: 'SA' }
    }
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
        '@id': `${site.url}/#business`,
        name: site.name,
        alternateName: 'أبو غيث حداد بالرياض',
        description: site.description,
        url: site.url,
        telephone: site.phone,
        address: businessPostalAddress,
        hasMap: site.mapsUrl,
        openingHoursSpecification: businessOpeningHours,
        image: [`${site.url}${service.image}`, ...realPhotos.map((p) => `${site.url}${p.src}`)],
        areaServed: area,
        contactPoint: { '@type': 'ContactPoint', telephone: site.phone, contactType: 'customer service', availableLanguage: ['ar'], areaServed: 'SA' }
      },
      { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, inLanguage: 'ar-SA', publisher: { '@id': `${site.url}/#business` } },
      { '@type': 'ImageObject', '@id': `${url}#primaryimage`, url: `${site.url}${service.image}`, contentUrl: `${site.url}${service.image}`, caption: service.alt, inLanguage: 'ar-SA' },
      {
        '@type': 'Service', '@id': `${url}#service`, name: service.title, serviceType: service.serviceType,
        description: service.description, url, image: { '@id': `${url}#primaryimage` }, areaServed: area,
        provider: { '@id': `${site.url}/#business` }, mainEntityOfPage: { '@id': `${url}#webpage` }
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'الخدمات', item: `${site.url}/#services` },
          { '@type': 'ListItem', position: 3, name: service.title, item: url }
        ]
      },
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: service.title, description: service.description,
        isPartOf: { '@id': `${site.url}/#website` }, about: { '@id': `${site.url}/#business` }, mainEntity: { '@id': `${url}#service` },
        primaryImageOfPage: { '@id': `${url}#primaryimage` }, breadcrumb: { '@id': `${url}#breadcrumb` }, inLanguage: 'ar-SA'
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`, inLanguage: 'ar-SA',
        mainEntity: service.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
      }
    ]
  };
}

function MiniCard({ service }) {
  return (
    <article className="service-card">
      <Link className="service-image" href={`/services/${service.slug}`} aria-label={`تفاصيل ${service.title}`}><Image src={service.image} alt={service.alt} fill sizes="(max-width: 720px) 100vw, 33vw" /><span className="image-shade"></span></Link>
      <div className="service-card-body"><h3><Link href={`/services/${service.slug}`}>{service.label}</Link></h3><p>{service.description}</p><Link className="text-link" href={`/services/${service.slug}`}>تفاصيل الخدمة <ArrowIcon /></Link></div>
    </article>
  );
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const currentIndex = services.findIndex((s) => s.slug === slug);
  const related = [1, 2, 3].map((offset) => services[(currentIndex + offset) % services.length]);
  const schema = schemaFor(service);
  return (
    <main id="main-content">
      <script id="service-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="service-hero"><div className="shell service-hero-grid">
        <div className="service-hero-copy"><nav className="breadcrumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link><span>/</span><Link href="/#services">الخدمات</Link><span>/</span><strong>{service.label}</strong></nav><span className="kicker light">خدمة داخل مدينة الرياض</span><h1>{service.title}</h1><p>{service.intro}</p><div className="hero-actions"><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappIcon className="button-icon" /> أرسل صورة الموقع</a><a className="button button-outline-light" href={`tel:${site.phone}`}><PhoneIcon className="button-icon" /> اتصال مباشر</a></div></div>
        <div className="service-hero-image"><Image src={service.image} alt={service.alt} fill priority sizes="(max-width: 900px) 100vw, 48vw" /></div>
      </div></section>

      <section className="section service-content-section"><div className="shell service-content-grid">
        <article className="service-article"><span className="kicker">تفاصيل الخدمة</span><h2>{service.label} حسب مساحة الموقع والاستخدام</h2>{service.paragraphs.map((p) => <p key={p}>{p}</p>)}<div className="feature-panel"><h2>ما الذي يشمله التخطيط للتنفيذ؟</h2><ul>{service.benefits.map((benefit) => <li key={benefit}><CheckIcon />{benefit}</li>)}</ul></div></article>
        <aside className="contact-card"><span>اطلب الخدمة</span><h2>أرسل المقاس أو صورة الموقع</h2><p>اذكر الحي، نوع الخدمة، المقاسات التقريبية، والشكل المطلوب لبدء مناقشة التفاصيل.</p><a className="button button-whatsapp full-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappIcon className="button-icon" /> واتساب {site.phoneDisplay}</a><a className="button button-dark full-button" href={`tel:${site.phone}`}><PhoneIcon className="button-icon" /> اتصال مباشر</a><a className="service-location-link" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">الموقع: {site.address.short}</a><small>نطاق الخدمة: مدينة الرياض</small></aside>
      </div></section>

      <section className="section service-process"><div className="shell"><div className="section-heading compact-heading"><div><span className="kicker">خطوات التنفيذ</span><h2>مسار واضح من الفكرة إلى التشطيب</h2></div></div><ol className="process-grid"><li><span>01</span><h3>معاينة الأبعاد والاستخدام</h3></li><li><span>02</span><h3>تحديد الشكل والخامة</h3></li><li><span>03</span><h3>التفصيل والتجهيز</h3></li><li><span>04</span><h3>التركيب ومراجعة التشطيب</h3></li></ol></div></section>

      <section className="section service-proof"><div className="shell service-proof-grid"><div><span className="kicker">تجهيز ميداني</span><h2>سيارة ومعدات أبو غيث للوصول للمواقع داخل الرياض</h2><p>أضفنا الصور الأصلية للسيارة والمعدات للموقع لأنها تعكس طبيعة الخدمة الفعلية وتدعم هوية النشاط المحلي.</p><a className="text-link" href="/#real-work">شاهد جميع الصور الفعلية <ArrowIcon /></a></div><div className="service-proof-image"><Image src="/images/abu-ghaith-truck-equipment-01.webp" alt={realPhotos[0].alt} fill sizes="(max-width: 820px) 100vw, 48vw" /></div></div></section>

      <section className="section faq-section service-faq"><div className="shell faq-grid"><div className="faq-heading"><span className="kicker">أسئلة شائعة</span><h2>أسئلة عن {service.label}</h2><p>توضح هذه الإجابات المعلومات الأساسية قبل اعتماد المقاس ونطاق العمل.</p></div><div className="faq-list">{service.faq.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>

      <section className="section related-section"><div className="shell"><div className="section-heading"><div><span className="kicker">خدمات مرتبطة</span><h2>قد تحتاج أيضًا</h2></div><Link className="text-link" href="/#services">عرض جميع الخدمات <ArrowIcon /></Link></div><div className="services-grid related-grid">{related.map((item) => <MiniCard key={item.slug} service={item} />)}</div></div></section>
    </main>
  );
}
