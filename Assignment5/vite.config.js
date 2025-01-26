import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(

    ({ mode }) => {
        const env = loadEnv(mode, process.cwd(), '')
        const envWithProcessPrefix = Object.keys(env).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(env[next])
            return prev
        }, {})
        return {
            plugins: [react()],
            define: envWithProcessPrefix
        }
    }
)
