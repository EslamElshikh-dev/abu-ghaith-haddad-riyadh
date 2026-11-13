import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsappIcon, PinIcon, ShieldIcon } from '@/components/SiteChrome';
import { site, services, realPhotos, homeFaq, whatsappUrl } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import { homeStructuredData } from '@/lib/structured-data';
import JsonLd from '@/components/JsonLd';
import ServiceCard from '@/components/ServiceCard';
import SandwichPanelFeature from '@/components/SandwichPanelFeature';

export const metadata = pageMetadata();

export default function HomePage() {
  return (
    <main id="main-content">
      <JsonLd id="home-structured-data" data={homeStructuredData()} />

      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy animate-in">
            <span className="eyebrow"><span aria-hidden="true" />تفصيل حديد يناسب موقعك من أول مقاس حتى التركيب</span>
            <h1>{site.shortName} <em>ساندوتش بانل وأعمال حدادة بالرياض</em></h1>
            <p className="hero-lead">ننفذ أسقف وجدران وغرف ساندويتش بانل حسب المقاس، مع الهياكل المعدنية والأبواب والمظلات والسواتر، بخدمة ميدانية داخل مدينة الرياض.</p>
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
        <div className="shell hero-service-strip"><span>مظلات</span><span>سواتر</span><span>ساندويتش بانل</span><span>بوابات حديد</span><span>هياكل وهناجر</span></div>
      </section>

      <SandwichPanelFeature />

      <section className="section services-section" id="services">
        <div className="shell">
          <div className="section-heading"><div><span className="kicker">الخدمات</span><h2>تنفيذ معدني واضح من القياس إلى التشطيب</h2></div><p>خدمات مرتبة حسب نوع العمل، مع تفاصيل المقاسات والتجهيزات المطلوبة لكل خدمة. <Link className="text-link" href="/services">استعرض جميع الخدمات <ArrowIcon /></Link></p></div>
          <div className="services-grid">{services.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}</div>
        </div>
      </section>

      <section className="section real-work-section" id="real-work">
        <div className="shell">
          <div className="section-heading real-heading"><div><span className="kicker">صور فعلية من الميدان</span><h2>سيارة ومعدات أبو غيث للخدمة داخل الرياض</h2></div><p>سيارة الخدمة والمعدات المستخدمة للوصول إلى مواقع العملاء وتنفيذ أعمال الحدادة داخل مدينة الرياض.</p></div>
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
          <div className="about-image"><Image src={realPhotos[0].src} alt={realPhotos[0].alt} fill sizes="(max-width: 820px) 100vw, 44vw" /><span className="about-badge"><PinIcon className="badge-icon" /> سيارة خدمة فعلية داخل الرياض</span></div>
          <div className="about-copy"><span className="kicker">عن أبو غيث</span><h2>حداد متنقل لخدمة مواقع العملاء في مدينة الرياض</h2><p>نركز على أعمال الحديد المرتبطة بالمظلات والسواتر والبوابات والساندويتش بانل والهياكل، مع تجهيزات ميدانية للوصول إلى الموقع وتنفيذ الأعمال وفق المقاسات.</p><p>من صورة الموقع والمقاسات الأولية إلى مراجعة الهيكل والخامة والتشطيب، نوضح تفاصيل العمل المطلوبة قبل الاتفاق على التنفيذ.</p><ul className="check-list"><li><CheckIcon /> نطاق الخدمة: مدينة الرياض</li><li><CheckIcon /> اتصال وواتساب مباشر على {site.phoneDisplay}</li><li><CheckIcon /> تفصيل حسب المقاس وطبيعة الاستخدام</li><li><CheckIcon /> صفحات مستقلة لكل خدمة لسهولة الوصول</li></ul></div>
        </div>
      </section>

      <section className="local-section" id="location">
        <div className="shell local-card"><div><span className="kicker light">موقع أبو غيث في الرياض</span><h2>موقع فعلي في حي المصيف وخدمة ميدانية لجميع أحياء الرياض.</h2><p>يمكنك فتح نقطة الموقع مباشرة على خرائط Google، ولطلب تنفيذ في موقعك أرسل الحي ونوع الخدمة وصورة واضحة والمقاسات التقريبية.</p></div><div className="local-action location-action"><span>العنوان</span><address>{site.address.full}</address><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer"><PinIcon /> فتح الموقع على خرائط Google</a><small>الهاتف: {site.phoneDisplay}</small></div></div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid"><div className="faq-heading"><span className="kicker">أسئلة شائعة</span><h2>قبل إرسال طلبك</h2><p>إجابات مختصرة عن نطاق الخدمة والمقاسات والصور الميدانية.</p></div><div className="faq-list">{homeFaq.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div>
      </section>

      <section className="final-cta"><div className="shell final-cta-inner"><div><span>جاهز ترسل الموقع؟</span><h2>أرسل صورة ومقاس مبدئي على واتساب</h2><p>نطاق الخدمة داخل مدينة الرياض.</p></div><div className="final-actions"><a className="button button-dark" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappIcon className="button-icon" /> واتساب</a><a className="button button-outline-light" href={`tel:${site.phone}`}><PhoneIcon className="button-icon" /> اتصال</a></div></div></section>
    </main>
  );
}

