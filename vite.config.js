import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteToml } from 'vite-plugin-toml'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),ViteToml()]
})
