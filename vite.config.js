import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    server: {
        port: 5173,
        proxy: {
            "/api/iam": {
                target: "http://localhost:5073",
                changeOrigin: true,
                rewrite: (path) =>
                    path.replace(/^\/api\/iam/, ""),
            },
        },
    },
});