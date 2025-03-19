import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  trailingSlash: true, // Optional, to add trailing slashes to the URLs
  output: 'standalone',
  reactStrictMode: true,
  webpack(config: WebpackConfig, { isServer }) {
    // Ensure CSS is bundled correctly
    if (!isServer && config.module && Array.isArray(config.module.rules)) {
      config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      });
    }
    return config;
  },
};

export default nextConfig;
