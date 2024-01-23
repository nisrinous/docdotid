/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  basePath: process.env.NEXT_PUBLIC_SITE_PATH,
};

module.exports = nextConfig;
