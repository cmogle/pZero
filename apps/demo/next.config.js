/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@pzero/runtime', '@pzero/app'],
};

module.exports = nextConfig;
