import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Su Vercel puoi impostare AMAZON_ASSOCIATE_TAG (senza VITE_) senza warning.
  // In locale continua a funzionare anche VITE_AMAZON_ASSOCIATE_TAG nel .env.
  const env = loadEnv(mode, process.cwd(), '')
  const amazonTag =
    env.VITE_AMAZON_ASSOCIATE_TAG ||
    env.AMAZON_ASSOCIATE_TAG ||
    process.env.VITE_AMAZON_ASSOCIATE_TAG ||
    process.env.AMAZON_ASSOCIATE_TAG ||
    ''

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_AMAZON_ASSOCIATE_TAG': JSON.stringify(amazonTag),
    },
  }
})
