import Link from 'next/link';
import { site, services, whatsappUrl } from '@/lib/site';

export function PhoneIcon({ className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsappIcon({ className = 'icon' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M27.3 4.7A15.6 15.6 0 0 0 2.8 23.5L.6 31.4l8.1-2.1A15.6 15.6 0 0 0 27.3 4.7ZM16.2 28.8a12.9 12.9 0 0 1-6.6-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5a13 13 0 1 1 10.9 6Zm7.1-9.7c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-2.3-1.1-3.8-2.1-5.3-4.8-.4-.7.4-.7 1.1-1.5.2-.2.2-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.4 1.4-1.4 3.4s1.5 4 1.7 4.3c.2.3 2.9 4.4 7 6.2 2.6 1.1 3.6 1.2 4.9 1 .8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z" />
    </svg>
  );
}

export function ArrowIcon({ className = 'small-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = 'check-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m20 6-11 11-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ className = 'meta-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ShieldIcon({ className = 'meta-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" /><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Brand({ footer = false }) {
  return (
    <Link className={`brand${footer ? ' footer-brand' : ''}`} href="/" aria-label="أبو غيث - الصفحة الرئيسية">
      <span className="brand-mark" aria-hidden="true">غ</span>
      <span className="brand-copy"><strong>أبو غيث</strong><small>حداد مظلات وساندوتش بانل</small></span>
    </Link>
  );
}

export function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">انتقل إلى المحتوى</a>
      <div className="utility-bar"><div className="shell utility-inner"><span>نخدم جميع أحياء مدينة الرياض</span><a href={`tel:${site.phone}`} aria-label={`اتصل على ${site.phoneDisplay}`}>{site.phoneDisplay}</a></div></div>
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            <Link href="/">الرئيسية</Link><Link href="/#services">الخدمات</Link><Link href="/#real-work">صور فعلية</Link><Link href="/#work-method">طريقة العمل</Link><Link href="/#about">عن أبو غيث</Link>
          </nav>
          <a className="header-call" href={`tel:${site.phone}`} aria-label={`اتصل الآن على ${site.phoneDisplay}`}><PhoneIcon /><span><small>اتصل مباشرة</small>{site.phoneDisplay}</span></a>
          <details className="mobile-menu"><summary aria-label="فتح قائمة التنقل"><span></span><span></span><span></span></summary><nav aria-label="التنقل على الجوال"><Link href="/">الرئيسية</Link><Link href="/#services">الخدمات</Link><Link href="/#real-work">صور فعلية</Link><Link href="/#work-method">طريقة العمل</Link><Link href="/#about">عن أبو غيث</Link><a href={`tel:${site.phone}`}>اتصل: {site.phoneDisplay}</a></nav></details>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro"><Brand footer /><p>تفصيل وتركيب أعمال الحدادة والمظلات والسواتر والساندوتش بانل والهياكل المعدنية داخل مدينة الرياض.</p><p className="footer-proof">صور سيارة ومعدات الخدمة المعروضة بالموقع صور فعلية من الميدان.</p></div>
        <div><h2 className="footer-heading">الخدمات</h2><ul className="footer-links">{services.slice(0, 4).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.label}</Link></li>)}</ul></div>
        <div><h2 className="footer-heading">خدمات إضافية</h2><ul className="footer-links">{services.slice(4).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.label}</Link></li>)}</ul></div>
        <div><h2 className="footer-heading">تواصل الآن</h2><div className="footer-contact"><a href={`tel:${site.phone}`}><PhoneIcon /><span>اتصال مباشر<strong>{site.phoneDisplay}</strong></span></a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsappIcon /><span>إرسال التفاصيل<strong>عبر واتساب</strong></span></a></div></div>
      </div>
      <div className="shell footer-bottom"><p>© 2026 أبو غيث. جميع الحقوق محفوظة.</p><p>نطاق الخدمة: مدينة الرياض</p></div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="floating-actions" aria-label="التواصل السريع">
      <a className="float-button float-call" href={`tel:${site.phone}`} aria-label={`اتصل بأبو غيث على ${site.phoneDisplay}`}><PhoneIcon className="float-icon" /><span>اتصال</span></a>
      <a className="float-button float-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="راسل أبو غيث على واتساب"><WhatsappIcon className="float-icon" /><span>واتساب</span></a>
    </div>
  );
}
