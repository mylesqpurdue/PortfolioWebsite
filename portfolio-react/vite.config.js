import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/PortfolioWebsite/",     // repo name
  build: { outDir: "../docs" },   // <-- build to the root-level docs/
});
