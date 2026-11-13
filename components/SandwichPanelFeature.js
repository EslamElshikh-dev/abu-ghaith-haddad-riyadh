import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon, CheckIcon } from './SiteChrome';
import { getService } from '@/lib/site';

export default function SandwichPanelFeature() {
  const service = getService('sandwich-panel');
  return (
    <section className="sandwich-feature-section" aria-labelledby="sandwich-feature-title">
      <div className="shell sandwich-feature">
        <div className="sandwich-feature-copy">
          <span className="kicker">ساندويتش بانل في الرياض</span>
          <h2 id="sandwich-feature-title">تركيب ساندوتش بانل <em>من الهيكل إلى تفاصيل التشطيب.</em></h2>
          <p>أسقف وجدران وغرف وتغطيات للهناجر والمستودعات في الرياض، مع مراجعة مواصفات الألواح والهيكل المعدني والوصلات والحواف والفتحات قبل الاتفاق.</p>
          <ul className="sandwich-scope" aria-label="نطاقات خدمة الساندويتش بانل">
            <li><CheckIcon /><span><strong>أسقف</strong><small>تغطيات حسب مساحة الموقع</small></span></li>
            <li><CheckIcon /><span><strong>جدران</strong><small>وصلات وفتحات حسب الاستخدام</small></span></li>
            <li><CheckIcon /><span><strong>غرف</strong><small>أبعاد وأبواب ونوافذ واضحة</small></span></li>
          </ul>
          <Link className="button button-dark" href="/services/sandwich-panel">تركيب ساندوتش بانل بالرياض <ArrowIcon /></Link>
        </div>
        <Link className="sandwich-feature-image" href="/services/sandwich-panel" aria-label="تفاصيل خدمة تركيب الساندويتش بانل">
          <Image src={service.image} alt={service.alt} fill sizes="(max-width: 820px) 100vw, 45vw" />
          <span className="sandwich-image-label">قارن نطاق التنفيذ قبل السعر <ArrowIcon /></span>
        </Link>
      </div>
    </section>
  );
}

