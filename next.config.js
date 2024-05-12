/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true, // That also fixes with classname did not match using TailwindCSS! Don't know why tho.
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
}

module.exports = nextConfig
