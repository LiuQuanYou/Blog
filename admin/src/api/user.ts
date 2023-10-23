import request from '@/utils/request'

export const getUserInfo = () => {
	return request({
		url: '/user/getUserInfo',
		method: 'get',
	})
}

/**
 * 获取菜单
 * @param data
 * @returns
 */
export const getMenu = (data: any = {}) => {
	return request({
		url: '/user/getMenu',
		data,
		method: 'post',
	})
}

/**
 * 删除菜单
 * @param id 菜单id
 * @returns
 */
export const removeMenu = (id: number) => {
	return request({
		url: '/user/deleteMenu',
		data: {
			id,
		},
		method: 'post',
	})
}
