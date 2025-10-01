import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: "::",
      port: 8080,
      // Only add CSP headers in development mode to avoid security issues in production
      ...(mode === 'development' ? {
        headers: {
          "Content-Security-Policy": "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws://localhost:*; object-src 'none'; connect-src 'self' http://localhost:* ws://localhost:*;"
        }
      } : {})
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      rollupOptions: {
        external: [],
        output: {
          manualChunks: undefined,
        }
      },
      commonjsOptions: {
        transformMixedEsModules: true
      },
      target: "esnext"
    },
    optimizeDeps: {
      exclude: []
    }
  };
});