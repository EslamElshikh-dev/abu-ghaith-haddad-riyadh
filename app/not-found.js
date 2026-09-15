import Link from 'next/link';
export default function NotFound() {
  return <main className="not-found" id="main-content"><span>404</span><h1>الصفحة غير موجودة</h1><p>يمكنك العودة إلى الصفحة الرئيسية والاطلاع على جميع خدمات أبو غيث في الرياض.</p><Link className="button button-primary" href="/">العودة للرئيسية</Link></main>;
}
