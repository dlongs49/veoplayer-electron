import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Jsx from "@vitejs/plugin-vue-jsx";
import electron from 'vite-plugin-electron'
export default defineConfig({
    plugins: [
        vue(),
        Jsx(),
        electron({
            entry: 'src/electron/main.ts',
        })
    ],
    resolve: {
        // 配置路径别名
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 800,
        host: "0.0.0.0"
    },
    build:{
        outDir:"build",
        rollupOptions:{
            output:{
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',

                manualChunks(id){
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();           }
                }

            }

        }
    }
})
