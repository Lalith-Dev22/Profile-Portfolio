import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/', // Base path for production
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Ensure @ alias works
      },
    },
    server: {
      host: "::",
      port: 8080,
      hmr: { overlay: true },
      // Only add CSP headers in development
      ...(mode === 'development' ? {
        headers: {
          "Content-Security-Policy":
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws://localhost:; object-src 'none'; connect-src 'self' http://localhost: ws://localhost:;"
        }
      } : {})
    },
    build: {
      outDir: "dist", // Output folder for production
      target: "esnext",
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-react';
              }
              if (id.includes('framer-motion') || id.includes('gsap')) {
                return 'animations';
              }
              if (id.includes('@radix-ui') || id.includes('@tabler') || id.includes('lucide-react')) {
                return 'ui';
              }
              if (id.includes('tailwind') || id.includes('clsx') || id.includes('class-variance-authority')) {
                return 'utils';
              }
              return 'vendor';
            }
          }
        }
      },
      commonjsOptions: { transformMixedEsModules: true }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: []
    }
  };
});