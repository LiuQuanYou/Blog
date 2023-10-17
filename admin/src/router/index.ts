import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/pages/layout/index.vue'
import { useStore } from '@/store/index'
import { MenuItem } from '@/models/Sidebar'

export const routes = [
	{
		path: '/',
		component: Layout,
		children: [
			{
				name: 'workplace',
				path: 'workplace',
				component: () => import('@/pages/workplace.vue'),
			},
			{
				path: 'article/list',
				component: () => import('@/pages/article/list.vue'),
			},
			{
				path: 'article/test',
				component: () => import('@/pages/article/test.vue'),
			},
		],
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('@/pages/login.vue'),
	},
]

const router = createRouter({
	scrollBehavior: () => ({ left: 0, top: 0 }),
	history: createWebHistory(),
	routes,
})

/**
 * 递归生成面包屑内容
 * @param menu 菜单内容
 * @param targetPath 当前路由
 * @param ancestors
 * @returns
 */
function getBreadcrumb(menu: any, targetPath: string, ancestors = <any>[]): any {
	for (let i = 0; i < menu.length; i++) {
		const menuItem = menu[i]

		// 如果当前菜单项的路径匹配目标路径
		if (menuItem.path === targetPath) {
			// 返回包含当前项及其所有父项的数组
			return [...ancestors, menuItem]
		}

		// 如果当前菜单项有子菜单，递归查找子菜单
		if (menuItem.children && menuItem.children.length > 0) {
			const foundInChildren = getBreadcrumb(menuItem.children, targetPath, [
				...ancestors,
				menuItem,
			])

			// 如果在子菜单中找到了匹配的项，返回该项及其所有父项的数组
			if (foundInChildren) {
				return foundInChildren
			}
		}
	}

	// 如果没有找到匹配项，返回null
	return null
}

router.beforeEach((to, from, next) => {
	const IndexStore = useStore()
	var fullPath = to.fullPath
	var SliderMenu = IndexStore.SliderMenu

	IndexStore.setBreadcrumb(getBreadcrumb(SliderMenu, fullPath))

	next()
})

export default router
