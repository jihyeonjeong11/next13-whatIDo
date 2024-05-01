/** @type {import('next').NextConfig} */

const MS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 86400;
const nextConfig = {
  compiler: {
    styledComponents: true, // That also fixes with classname did not match using TailwindCSS! Don't know why tho.
  },
}

module.exports = nextConfig
