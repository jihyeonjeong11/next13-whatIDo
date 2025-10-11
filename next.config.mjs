/** @type {import('next').NextConfig} */


import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

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

export default withMDX(nextConfig);

