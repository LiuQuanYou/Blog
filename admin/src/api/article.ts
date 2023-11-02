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

/**
 * 获取文章分类列表
 * @param params
 * @returns
 */
export const getTypeList = (params: any = {}) => {
	return request({
		url: '/article-type',
		method: 'get',
		params,
	})
}

/**
 * 获取分类选项
 * @returns
 */
export const getTypeOptions = () => {
	return request({
		url: '/article-type/getList',
		method: 'get',
	})
}

/**
 * 添加文章分类
 * @param data
 * @returns
 */
export const addType = (data: any) => {
	return request({
		url: '/article-type/create',
		method: 'post',
		data,
	})
}

/**
 * 修改文章分类。
 * @param id
 * @param data
 * @returns
 */
export const updateType = (id: string, data: any) => {
	return request({
		url: `/article-type/update`,
		method: 'post',
		data,
	})
}

/**
 * 删除文章文章
 * @param id 文章分类Id
 * @returns
 */
export const removeType = (id: string) => {
	return request({
		url: `/article-type/remove`,
		method: 'post',
		data: {
			id,
		},
	})
}

/**
 * 根据Id获取分类实体类
 * @param id
 * @returns
 */
export const getTypeEntity = (id: string) => {
	return request({
		url: `/article-type/${id}`,
		method: 'get',
	})
}
