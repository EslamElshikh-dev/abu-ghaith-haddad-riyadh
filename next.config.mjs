/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  async redirects() {
    return [{
      source: '/images/abu-ghaith-hilux-service-vehicle-03.webp',
      destination: '/images/abu-ghaith-truck-equipment-01.webp',
      permanent: true
    }];
  }
};
export default nextConfig;
