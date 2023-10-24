/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const nextConfig = {
  basePath,
  images: {
    domains: ["csm-prod.s3.us-east-005.backblazeb2.com"],
  },
};

module.exports = nextConfig;
