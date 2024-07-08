/** @type {import('next').NextConfig} */
const nextConfig = {
  // qui attivo instrumentation.js
  // è sperimentale
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
