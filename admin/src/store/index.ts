import { defineStore, acceptHMRUpdate } from 'pinia'
import { MenuItem } from '@/models/Sidebar'
import { MenuTabs } from '@/models/MenuTabs'
import { DashboardOutlined } from '@ant-design/icons-vue'
import BlogIcon from '@/components/Icon/index.vue'

const defaultMenu = [
	{
		title: '工作台',
		label: '工作台',
		key: 1,
		icon: () => h(DashboardOutlined),
		path: '/workplace',
	},
]

const defaultTabs = [
	{
		title: '工作台',
		path: '/workplace',
	},
]

export const useStore = defineStore({
	id: 'index',
	state: () => ({
		//侧边栏菜单
		SliderMenu: defaultMenu as MenuItem[],
		//面包屑内容
		Breadcrumb: [] as MenuItem[],
		//tabs路由
		MenuTabs: defaultTabs as MenuTabs[],
		TabsIndex: 0,
	}),
	getters: {},
	actions: {
		/**
		 * 递归生成菜单数据
		 * @param items
		 * @param parentId
		 * @param parentIndex
		 */
		organizeDataByParentId(items: any, parentId = null, parentIndex = null) {
			const organizedItems = new Array()
			items.forEach((item: any, index: any) => {
				if (item.parent_id === parentId) {
					const children = this.organizeDataByParentId(items, item.id, index)
					if (children.length) {
						item.children = children
					}
					item.key = parentIndex !== null ? `${parentIndex}-${index}` : `${index}`
					organizedItems.push(item)
				}
			})
			return organizedItems
		},
		//存储菜单内容
		setMenu(data: MenuItem[]) {
			var Menu = this.organizeDataByParentId(data, null)
			Menu.forEach((item: any, index) => {
				if (item.icon) {
					var Icon = item.icon
					item.iconClass = Icon
					item.icon = () => h(BlogIcon, { Icon })
				}
			})
			this.SliderMenu = Menu
		},
		//动态存储面包屑
		setBreadcrumb(data: MenuItem[]) {
			this.Breadcrumb = data
			if (data) {
				if (
					data[data.length - 1].title != this.MenuTabs[0].title &&
					this.MenuTabs.length == 1
				) {
					var row = data[data.length - 1]
					this.MenuTabs = [
						{
							title: row.title,
							path: row?.path,
						},
					]
				}
			}
		},
		//存储菜单卡片
		setMenuTabs(data: MenuTabs[]) {
			this.MenuTabs = data
		},
	},
	persist: {
		paths: ['SliderMenu'],
	},
})
