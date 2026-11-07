import { serializeJsonLd } from '@/lib/structured-data';

export default function JsonLd({ id, data }) {
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
