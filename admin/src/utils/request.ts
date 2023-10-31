import axios from 'axios'
import router from '@/router'
import nprogress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //样式必须引入
import { userStore } from '@/store/user'
import { message } from 'ant-design-vue'

declare module 'axios' {
	interface AxiosResponse<T = any> {
		code: any
		token: any
	}
	export function create(config?: AxiosRequestConfig): AxiosInstance
}

// 创建一个 axios 实例
const service = axios.create({
	baseURL: '/api', // 所有的请求地址前缀部分
	timeout: 60000, // 请求超时时间毫秒
	withCredentials: true, // 异步请求携带cookie
	headers: {
		// 设置后端需要的传参类型
		'Content-Type': 'application/json',
	},
})

// 添加请求拦截器
service.interceptors.request.use(
	function (config) {
		// 在发送请求之前做些什么
		const user = userStore()
		config.headers.Authorization = 'Bearer ' + user.token
		nprogress.start()
		return config
	},
	function (error) {
		// 对请求错误做些什么
		debugger
		console.log(error)
		return Promise.reject(error)
	},
)

// 添加响应拦截器
service.interceptors.response.use(
	function (response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		// dataAxios 是 axios 返回数据中的 data
		const dataAxios = response.data
		nprogress.done()
		if (dataAxios.code == 500) {
			message.error(dataAxios.message)
		}
		return dataAxios
	},
	function (error) {
		var status = error.response.status
		if (status == 403 || status == 401) {
			router.push({
				path: '/login',
			})
		}
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		if(status == 500){
			message.error(error.response.data.message)
		}
		nprogress.done()
		return Promise.reject(error)
	},
)

export default service
