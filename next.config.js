/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://ecommerce.routemisr.com/**/**")],
  },
};

module.exports = nextConfig;
