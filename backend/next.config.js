/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { externalDir: true }, // allow import
  // cors http status not ok
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: '/api/:path*',
  //       headers: [
  //         { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //         { key: 'Access-Control-Allow-Origin', value: '*' },
  //         { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value: '*',
  //         },
  //       ],
  //     },
  //   ]
  // },

  // experimental: {
  //   urlImports: ['https://example.com/assets/', 'https://cdn.skypack.dev'],
  // },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'www.instagram.com',
        port: '',
        pathname: '/p/**',
      },
    ],
  },
}

module.exports = nextConfig
