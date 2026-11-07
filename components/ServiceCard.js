import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from './SiteChrome';

export default function ServiceCard({ service, index }) {
  return (
    <article className="service-card">
      <Link className="service-image" href={`/services/${service.slug}`} aria-label={`تفاصيل ${service.title}`}>
        <Image src={service.image} alt={service.alt} fill sizes="(max-width: 620px) 100vw, (max-width: 1020px) 50vw, 33vw" />
        <span className="image-shade" aria-hidden="true" />
      </Link>
      <div className="service-card-body">
        {typeof index === 'number' && <span className="service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
        <h3><Link href={`/services/${service.slug}`}>{service.label}</Link></h3>
        <p>{service.description}</p>
        <Link className="text-link" href={`/services/${service.slug}`}>تفاصيل الخدمة <ArrowIcon /></Link>
      </div>
    </article>
  );
}
