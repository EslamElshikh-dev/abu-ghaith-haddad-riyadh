'use client';

import Link from 'next/link';
import { site } from '@/lib/site';

export default function MobileMenu() {
  function closeAfterNavigation(event) {
    if (event.target.closest('a')) event.currentTarget.open = false;
  }

  return (
    <details className="mobile-menu" onClick={closeAfterNavigation}>
      <summary aria-label="فتح قائمة التنقل"><span /><span /><span /></summary>
      <nav aria-label="التنقل على الجوال">
        <Link href="/">الرئيسية</Link>
        <Link href="/services">الخدمات</Link>
        <Link href="/blog">المدونة</Link>
        <Link href="/#real-work">صور فعلية</Link>
        <Link href="/#work-method">طريقة العمل</Link>
        <Link href="/#about">عن أبو غيث</Link>
        <a href={`tel:${site.phone}`}>اتصل: {site.phoneDisplay}</a>
      </nav>
    </details>
  );
}
