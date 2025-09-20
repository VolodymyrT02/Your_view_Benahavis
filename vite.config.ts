import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import path from "path";
import { componentTagger } from "lovable-tagger";

const imagePresets = {
  hero: {
    width: "2400;1800;1400;1000;720",
    format: "webp;jpg",
    quality: "82",
    as: "picture",
  },
  heroBlur: {
    width: "40",
    format: "webp",
    quality: "30",
    blur: "15",
    as: "src",
  },
  gallery: {
    width: "2000;1500;1200;900;640;420",
    format: "webp;jpg",
    quality: "80",
    as: "picture",
  },
  galleryBlur: {
    width: "36",
    format: "webp",
    quality: "28",
    blur: "12",
    as: "src",
  },
} as const;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/Your_view_Benahavis/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    imagetools({
      presets: imagePresets,
    }),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@media": path.resolve(__dirname, "./assets-source"),
    },
  },
}));
