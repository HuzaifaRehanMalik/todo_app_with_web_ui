import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Turbopack configuration (default in Next.js 16)
  // Turbopack handles module resolution automatically, so empty config is sufficient
  turbopack: {},
  // Webpack configuration (for use with --webpack flag)
  webpack: (config) => {
    // Ensure webpack resolves modules from the frontend directory first
    const frontendNodeModules = path.resolve(__dirname, "node_modules");
    
    // Set resolve modules to prioritize current directory's node_modules
    if (!config.resolve) {
      config.resolve = {};
    }
    
    if (!config.resolve.modules) {
      config.resolve.modules = [];
    }
    
    // Ensure frontend node_modules is first in the resolution path
    const existingModules = Array.isArray(config.resolve.modules) 
      ? config.resolve.modules 
      : [config.resolve.modules].filter(Boolean);
    
    config.resolve.modules = [
      frontendNodeModules,
      ...existingModules.filter(
        (m: string) => {
          if (typeof m !== 'string') return true;
          const resolved = path.resolve(m);
          return resolved !== frontendNodeModules;
        }
      ),
    ];
    
    return config;
  },
};

export default nextConfig;
