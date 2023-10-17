<template>
	<a-layout-sider breakpoint="lg" v-model:collapsed="collapsed" :trigger="null" collapsible>
		<div class="logo">
			<img src="@/assets/vue.svg" />
			<h1 v-if="!collapsed">Blog-Admin</h1>
		</div>
		<a-menu v-model:selectedKeys="selectedKeys" theme="dark" v-model:openKeys="openKeys" mode="inline"
			:style="{ height: '100%', borderRight: 0 }" :items="SliderMenu" @click="handleClick"></a-menu>
	</a-layout-sider>
</template>

<script lang="ts" setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined, DashboardOutlined, TableOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import type { MenuProps } from 'ant-design-vue';

import { MenuItem } from '@/models/Sidebar'
import { useStore } from '@/store/index'

const IndexStor = useStore()
const router = useRouter()

const props = defineProps({
	isCollapsed: {
		default: false,
		type: Boolean,
	},
});

const collapsed = computed(() => {
	return props.isCollapsed
});

const selectedKeys = ref(['1'])
const openKeys = ref([])


var Menu: MenuItem[] = [
	{
		title: '工作台',
		label: '工作台',
		key: 1,
		icon: () => h(DashboardOutlined),
		img: 'DashboardOutlined',
		path: '/workplace',
	},
	{
		title: '测试',
		label: '测试',
		key: 1,
		icon: () => h(DashboardOutlined),
		img: 'DashboardOutlined',
		path: '/workplace',
	},
	{
		title: '文章管理',
		label: '文章管理',
		key: 2,
		icon: () => h(TableOutlined),
		img: 'TableOutlined',
		children: [
			{
				key: '2-1',
				title: '文章列表',
				label: '文章列表',
				path: '/article/list',
				children: [
					{
						key: '2-1-1',
						title: '测试三级菜单',
						label: '测试三级菜单',
						path: '/article/test',
					}
				]
			},
			{
				key: '2-2',
				title: '测试列表',
				label: '测试列表',
				path: '/article/list',
				children: [
					{
						key: '2-2-1',
						title: '测试三级菜单2',
						label: '测试三级菜单2',
						path: '/article/test',
					}
				]
			},
		],
	},
]
const SliderMenu = computed(() => {
	return IndexStor.SliderMenu
});

const onCollapse = (collapsed: boolean, type: string) => {
	console.log(collapsed, type)
}

const onBreakpoint = (broken: boolean) => {
	console.log(broken)
}

onMounted(() => {
	IndexStor.setMenu(Menu)
})

/**
 * 菜单点击路由跳转
 */
const handleClick: MenuProps['onClick'] = e => {
	router.push({
		path: e.item.path,
	})
}
</script>

<style lang="scss">
.logo {
	display: flex;
	padding: 10px 4px 10px 10px;
	align-items: center;

	h1 {
		display: inline-block;
		color: #fff;
		margin: 0;
		font-size: 20px;
		margin-left: 10px;
	}
}
</style>