export interface MenuItem {
	title: string
	label: string
	icon?: any
	key?: any
	img?: string
	path?: string
	children?: MenuItem[]
}

export interface MenuData {
	siderMenu: MenuItem[]
}
