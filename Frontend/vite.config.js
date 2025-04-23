import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: true,  // ✅ Allow external access
    port: 5173,  // ✅ Ensure it's the same as the tunnel
    strictPort: true, // ✅ Ensures the exact port is used
    cors: true, // ✅ Enable CORS (useful if needed)
    origin: "https://animated-beijinho-a700b5.netlify.app", // ✅ Explicitly allow tunnel URL
  },
})
