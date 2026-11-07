import { site } from '@/lib/site';

export default function manifest() {
  return {
    name: site.name,
    short_name: site.shortName,
    lang: 'ar-SA',
    dir: 'rtl',
    start_url: '/',
    display: 'standalone',
    background_color: '#111315',
    theme_color: '#111315',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }]
  };
}
