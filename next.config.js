/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000/' // development api
          : 'http://localhost:5000/' // production api
  }
}

module.exports = nextConfig
