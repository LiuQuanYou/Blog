import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '127.0.0.1',
		port: 3002, // 端口
		open: true,
		proxy: {
			'/api': {
				// 请求接口中要替换的标识
				target: 'http://192.168.2.21:8002', // 代理地址
				changeOrigin: true, // 是否允许跨域
				secure: true,
				rewrite: path => path.replace(/^\/api/, ''), // api标志替换为''
			},
		},
	},
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue', 'vue-router'],
			dts:"src/auto-import.d.ts"
		}),
	],
	resolve: {
		alias: [
			{
				find: '@', // 别名
				replacement: resolve(__dirname, 'src'), // 别名对应地址
			},
			{
				find: 'components',
				replacement: resolve(__dirname, 'src/components'),
			},
		],
	},
})
