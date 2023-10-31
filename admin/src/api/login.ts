import request from '@/utils/request'

interface loginForm {
	username: string
	password: string
	remember?: boolean
}

/**
 * 登录
 * @param data
 * @returns
 */
export const Login = (data: loginForm) => {
	return request({
		url: '/auth/login',
		method: 'post',
		data,
	})
}
