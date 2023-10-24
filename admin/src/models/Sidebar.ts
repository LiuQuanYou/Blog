export interface MenuItem {
	title: string
	label: string
	icon?: any
	key?: any
	img?: string
	parent_id?: string
	path?: string
	children?: MenuItem[]
}

export interface MenuRow {
	id?: number
	title: string
	label: string
	icon?: any
	key?: any
	parent_id?: string
	path?: string
}
