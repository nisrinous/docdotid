const { redirect } = require("next/dist/server/api-utils");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  basePath: process.env.NEXT_PUBLIC_SITE_PATH,

  async redirects() {
    if (process.env.NEXT_PUBLIC_SITE_PATH === "") return [];
    return [
      {
        source: "/",
        destination: `${process.env.NEXT_PUBLIC_SITE_PATH}`,
        basePath: false,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
