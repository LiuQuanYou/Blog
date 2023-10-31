import request from '@/utils/request'

/**
 * 添加文章
 * @returns
 */
export const add = (data: any) => {
	return request({
		url: '/article/add',
		method: 'post',
		data,
	})
}

/**
 * 获取列表
 * @param params
 * @returns
 */
export const getList = (params: any = {}) => {
	return request({
		url: '/article/getList',
		method: 'get',
		params,
	})
}

/**
 * 根据Id获取实体类
 * @param id
 * @returns
 */
export const getEntity = (id: string) => {
	return request({
		url: `/article/${id}`,
		method: 'get',
	})
}

/**
 * 修改文章。
 * @param id
 * @param data
 * @returns
 */
export const update = (id: string, data: any) => {
	return request({
		url: `/article/update`,
		method: 'post',
		data,
	})
}

/**
 * 删除文章
 * @param id 文章Id
 * @returns
 */
export const remove = (id: string) => {
	return request({
		url: `/article/remove`,
		method: 'post',
		data: {
			id,
		},
	})
}
