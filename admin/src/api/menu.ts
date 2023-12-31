import request from '@/utils/request'
import { MenuRow } from '@/models/Sidebar'

/**
 * 获取菜单
 * @param data
 * @returns
 */
export const getMenu = (data: any = {}) => {
	return request({
		url: '/menu/getMenu',
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
		url: '/menu/deleteMenu',
		data: {
			id,
		},
		method: 'post',
	})
}

/**
 * 添加菜单
 * @param row
 * @returns
 */
export const addMenu = (row: MenuRow) => {
	return request({
		url: '/menu/addMenu',
		data: row,
		method: 'post',
	})
}

/**
 * 修改菜单数据
 * @param row
 * @returns
 */
export const updateMenu = (row: MenuRow) => {
	return request({
		url: '/menu/editMenu',
		data: row,
		method: 'post',
	})
}
