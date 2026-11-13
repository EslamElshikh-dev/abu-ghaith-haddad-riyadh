import Image from 'next/image';

export default function PanelProjectGallery({ photos }) {
  if (!photos?.length) return null;
  return (
    <section className="section panel-project-section" id="panel-project-gallery" aria-labelledby="panel-project-title">
      <div className="shell">
        <div className="section-heading">
          <div><span className="kicker">صور من الملف التجاري</span><h2 id="panel-project-title">ساندوتش بانل، بتفاصيل تشوفها</h2></div>
          <p>أمثلة معروضة في ملف أبو غيث للغرف والأسقف والهياكل. استخدمها لتوضيح فكرتك، ثم نراجع ما يناسب أبعاد موقعك واستخدامه في الرياض.</p>
        </div>
        <div className="panel-project-grid">
          {photos.map((photo) => (
            <figure className="panel-project-card" key={photo.src}>
              <div className="panel-project-image"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 820px) 100vw, 33vw" /></div>
              <figcaption><h3>{photo.caption}</h3><p>{photo.detail}</p></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
