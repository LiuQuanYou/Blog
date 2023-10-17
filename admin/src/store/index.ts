import { defineStore, acceptHMRUpdate } from 'pinia'
import { MenuItem, MenuData } from '@/models/Sidebar'
import { DashboardOutlined } from '@ant-design/icons-vue'

const defaultMenu = [
	{
		title: '工作台',
		label: '工作台',
		key: 1,
		icon: () => h(DashboardOutlined),
		path: '/workplace',
	},
]

export const useStore = defineStore({
	id: 'index',
	persist: true,
	state: () => ({
		SliderMenu: defaultMenu as MenuItem[],
		Breadcrumb: [] as MenuItem[],
	}),
	getters: {},
	actions: {
		//存储菜单内容
		setMenu(data: MenuItem[]) {
			this.SliderMenu = data
		},
		//动态存储面包屑
		setBreadcrumb(data: MenuItem[]) {
			this.Breadcrumb = data
		},
	},
})
