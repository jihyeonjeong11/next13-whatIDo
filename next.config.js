/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true, // That also fixes with classname did not match using TailwindCSS! Don't know why tho.
  },
  sassOptions: {
    implementation: 'sass-embedded',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'ui.dev',
      },
    ],
  },
};

module.exports = nextConfig;
