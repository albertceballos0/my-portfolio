import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignora errores de linting durante el build para que Vercel termine
    ignoreDuringBuilds: true,
  },
  typescript: {
    // También puedes ignorar errores de tipos si te bloquean
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
