import './globals.css';
import { Header, Footer, FloatingActions } from '@/components/SiteChrome';
import { site } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: 'خدمات حدادة ومظلات',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: { google: site.verification },
  manifest: '/manifest.webmanifest',
  icons: { icon: '/icon.svg' },
  openGraph: { locale: 'ar_SA', type: 'website', siteName: site.name },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false, address: false, email: false }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111315',
  colorScheme: 'dark light'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
