import request from '@/utils/request'

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = () => {
	return request({
		url: '/user/getUserInfo',
		method: 'get',
	})
}
