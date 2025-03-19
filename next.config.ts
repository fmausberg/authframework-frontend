import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  trailingSlash: true, // Optional, to add trailing slashes to the URLs
  output: 'standalone',
  // Other configurations if needed
}

export default nextConfig;
