import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsappIcon, PinIcon, ShieldIcon } from '@/components/SiteChrome';
import { site, services, realPhotos, homeFaq, whatsappUrl } from '@/lib/site';

export const metadata = {
  title: 'أبو غيث حداد مظلات وساندوتش بانل بالرياض',
  description: site.description,
  keywords: ['حداد بالرياض', 'حداد مظلات بالرياض', 'تركيب ساندوتش بانل بالرياض', 'تفصيل مظلات سيارات', 'تفصيل سواتر بالرياض', 'بوابات حديد بالرياض', 'هياكل معدنية بالرياض'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'أبو غيث حداد مظلات وساندوتش بانل بالرياض',
    description: site.description,
    url: '/',
    images: [{ url: '/images/abu-ghaith-hilux-service-vehicle-03.webp', width: 1536, height: 864, alt: realPhotos[2].alt }]
  },
  twitter: {
    title: 'أبو غيث حداد مظلات وساندوتش بانل بالرياض',
    description: site.description,
    images: ['/images/abu-ghaith-hilux-service-vehicle-03.webp']
  }
};

function businessSchema() {
  const area = {
    '@type': 'City',
    name: 'الرياض',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'منطقة الرياض',
      containedInPlace: { '@type': 'Country', name: 'المملكة العربية السعودية', identifier: 'SA' }
    }
  };
  const photoObjects = realPhotos.map((photo, i) => ({
    '@type': 'ImageObject',
    '@id': `${site.url}/#real-photo-${i + 1}`,
    url: `${site.url}${photo.src}`,
    contentUrl: `${site.url}${photo.src}`,
    width: photo.width,
    height: photo.height,
    caption: photo.caption,
    representativeOfPage: i === 2,
    inLanguage: 'ar-SA'
  }));
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
        image: [
          `${site.url}/images/car-shade-riyadh.webp`,
          ...realPhotos.map((p) => `${site.url}${p.src}`)
        ],
        areaServed: area,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: site.phone,
          contactType: 'customer service',
          availableLanguage: ['ar'],
          areaServed: 'SA'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'خدمات الحدادة والمظلات',
          itemListElement: services.map((service) => ({
            '@type': 'Offer',
            url: `${site.url}/services/${service.slug}`,
            itemOffered: {
              '@type': 'Service',
              '@id': `${site.url}/services/${service.slug}#service`,
              name: service.title,
              serviceType: service.serviceType,
              areaServed: area
            }
          }))
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        alternateName: site.shortName,
        description: site.description,
        inLanguage: 'ar-SA',
        publisher: { '@id': `${site.url}/#business` }
      },
      ...photoObjects,
      {
        '@type': 'WebPage',
        '@id': `${site.url}/#webpage`,
        url: site.url,
        name: 'أبو غيث حداد مظلات وساندوتش بانل بالرياض',
        description: site.description,
        isPartOf: { '@id': `${site.url}/#website` },
        about: { '@id': `${site.url}/#business` },
        primaryImageOfPage: { '@id': `${site.url}/#real-photo-3` },
        inLanguage: 'ar-SA'
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}/#faq`,
        inLanguage: 'ar-SA',
        mainEntity: homeFaq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
      }
    ]
  };
}

function ServiceCard({ service, index }) {
  return (
    <article className="service-card">
      <Link className="service-image" href={`/services/${service.slug}`} aria-label={`تفاصيل ${service.title}`}>
        <Image src={service.image} alt={service.alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        <span className="image-shade"></span>
      </Link>
      <div className="service-card-body">
        <span className="service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h3><Link href={`/services/${service.slug}`}>{service.label}</Link></h3>
        <p>{service.description}</p>
        <Link className="text-link" href={`/services/${service.slug}`}>تفاصيل الخدمة <ArrowIcon /></Link>
      </div>
    </article>
  );
}

export default function HomePage() {
  const schema = businessSchema();
  return (
    <main id="main-content">
      <script id="home-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy animate-in">
            <span className="eyebrow"><span></span>حدادة ومظلات داخل الرياض</span>
            <h1>تفصيل حديد <em>يناسب موقعك</em> من أول مقاس حتى التركيب</h1>
            <p className="hero-lead">أبو غيث لأعمال المظلات والسواتر والساندوتش بانل والأبواب والهياكل المعدنية، بخدمة ميدانية تغطي مدينة الرياض.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappIcon className="button-icon" /> أرسل صورة الموقع</a>
              <a className="button button-secondary" href={`tel:${site.phone}`}><PhoneIcon className="button-icon" /> اتصال مباشر</a>
            </div>
            <div className="hero-meta">
              <div><PinIcon /><span>مدينة الرياض<small>نطاق خدمة ميداني</small></span></div>
              <div><ShieldIcon /><span>تفصيل حسب الطلب<small>مقاس واستخدام وتشطيب</small></span></div>
            </div>
          </div>
          <div className="hero-visual animate-in delay-one">
            <div className="hero-image-wrap"><Image src="/images/car-shade-riyadh.webp" alt="مظلة سيارات حديدية حديثة في الرياض" fill priority sizes="(max-width: 820px) 100vw, 48vw" /></div>
            <div className="steel-lines" aria-hidden="true"></div>
            <div className="hero-stamp"><strong>8</strong><span>خدمات حدادة ومظلات أساسية داخل الرياض</span></div>
          </div>
        </div>
        <div className="shell hero-service-strip"><span>مظلات</span><span>سواتر</span><span>ساندوتش بانل</span><span>بوابات حديد</span><span>هياكل وهناجر</span></div>
      </section>

      <section className="section services-section" id="services">
        <div className="shell">
          <div className="section-heading"><div><span className="kicker">الخدمات</span><h2>تنفيذ معدني واضح من القياس إلى التشطيب</h2></div><p>خدمات مرتبة حسب نوع العمل، وكل خدمة لها صفحة مستقلة بمعلوماتها لتسهيل اختيار المطلوب وإرسال التفاصيل.</p></div>
          <div className="services-grid">{services.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}</div>
        </div>
      </section>

      <section className="section real-work-section" id="real-work">
        <div className="shell">
          <div className="section-heading real-heading"><div><span className="kicker">صور فعلية من الميدان</span><h2>سيارة ومعدات أبو غيث للخدمة داخل الرياض</h2></div><p>تم دمج الصور الأصلية للسيارة والمعدات داخل الموقع لتوضيح الهوية الميدانية للنشاط ودعم موثوقية المحتوى المحلي.</p></div>
          <div className="real-gallery">
            {realPhotos.map((photo, index) => (
              <figure className={`real-photo real-photo-${index + 1}`} key={photo.src}>
                <div className="real-photo-frame"><Image src={photo.src} alt={photo.alt} fill sizes={index === 1 ? '(max-width: 720px) 100vw, 34vw' : '(max-width: 720px) 100vw, 50vw'} /></div>
                <figcaption><span className="real-dot" aria-hidden="true"></span>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="proof-note"><strong>صور أصلية للنشاط</strong><span>تم تحسينها للويب بصيغة WebP مع الحفاظ على تفاصيل السيارة والهوية الظاهرة عليها.</span></div>
        </div>
      </section>

      <section className="section method-section" id="work-method">
        <div className="shell method-grid">
          <div className="method-copy"><span className="kicker light">طريقة العمل</span><h2>الموقع أولًا، ثم المقاس، ثم تنفيذ يناسب الاستخدام</h2><p>أرسل صورة الموقع والأبعاد التقريبية. نراجع نوع العمل، نقاط التثبيت والحركة، ثم يتم الاتفاق على تفاصيل التنفيذ.</p><a className="text-link light-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">ابدأ بإرسال صورة الموقع <ArrowIcon /></a></div>
          <ol className="method-steps">
            <li><span>01</span><div><h3>صورة ومقاس مبدئي</h3><p>أرسل صورة الموقع والحي والطول والعرض والارتفاع التقريبي.</p></div></li>
            <li><span>02</span><div><h3>تحديد الحل المناسب</h3><p>نراجع نوع الهيكل ونقاط التثبيت والتغطية بما يناسب المساحة والاستخدام.</p></div></li>
            <li><span>03</span><div><h3>التفصيل والتجهيز</h3><p>قص وتجهيز ولحام القطاعات بحسب المقاسات التي تم اعتمادها.</p></div></li>
            <li><span>04</span><div><h3>التركيب والتشطيب</h3><p>تركيب منظم ومراجعة الاستقامة والوصلات والتشطيب النهائي.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="shell about-grid">
          <div className="about-image"><Image src="/images/abu-ghaith-hilux-service-vehicle-03.webp" alt={realPhotos[2].alt} fill sizes="(max-width: 820px) 100vw, 44vw" /><span className="about-badge"><PinIcon className="badge-icon" /> سيارة خدمة فعلية داخل الرياض</span></div>
          <div className="about-copy"><span className="kicker">عن أبو غيث</span><h2>حداد متنقل لخدمة مواقع العملاء في مدينة الرياض</h2><p>نركز على أعمال الحديد المرتبطة بالمظلات والسواتر والبوابات والساندوتش بانل والهياكل، مع تجهيزات ميدانية للوصول إلى الموقع وتنفيذ الأعمال وفق المقاسات.</p><p>الصور الجديدة المعروضة هنا ليست صورًا تجميلية؛ هي صور السيارة والمعدات الفعلية الخاصة بالخدمة، وتم دمجها داخل المحتوى والبيانات المنظمة للموقع.</p><ul className="check-list"><li><CheckIcon /> نطاق الخدمة: مدينة الرياض</li><li><CheckIcon /> اتصال وواتساب مباشر على {site.phoneDisplay}</li><li><CheckIcon /> تفصيل حسب المقاس وطبيعة الاستخدام</li><li><CheckIcon /> صفحات مستقلة لكل خدمة لسهولة الوصول</li></ul></div>
        </div>
      </section>

      <section className="local-section">
        <div className="shell local-card"><div><span className="kicker light">خدمة محلية بالرياض</span><h2>عندك موقع وتحتاج حداد؟ أرسل الصورة والمقاس.</h2><p>أرسل الحي ونوع الخدمة وصورة واضحة للمكان والمقاسات التقريبية، وسنبدأ من المعلومات التي تساعد على تحديد نطاق العمل الصحيح.</p></div><div className="local-action"><span>اتصال مباشر</span><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a><small>أبو غيث — الرياض</small></div></div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid"><div className="faq-heading"><span className="kicker">أسئلة شائعة</span><h2>قبل إرسال طلبك</h2><p>إجابات مختصرة عن نطاق الخدمة والمقاسات والصور الميدانية.</p></div><div className="faq-list">{homeFaq.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div>
      </section>

      <section className="final-cta"><div className="shell final-cta-inner"><div><span>جاهز ترسل الموقع؟</span><h2>أرسل صورة ومقاس مبدئي على واتساب</h2><p>نطاق الخدمة داخل مدينة الرياض.</p></div><div className="final-actions"><a className="button button-dark" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappIcon className="button-icon" /> واتساب</a><a className="button button-outline-light" href={`tel:${site.phone}`}><PhoneIcon className="button-icon" /> اتصال</a></div></div></section>
    </main>
  );
}
