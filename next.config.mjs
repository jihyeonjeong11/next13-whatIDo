import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  compiler: {
    styledComponents: true, // That also fixes with classname did not match using TailwindCSS! Don't know why tho.
  },
  sassOptions: {
    implementation: 'sass-embedded',
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/og',
        search: '*',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'ui.dev',
      },
      {
        protocol: 'https',
        hostname: 'jihyeonjeong.com'
      }
    ],
  },
};

export default createMDX(nextConfig);
