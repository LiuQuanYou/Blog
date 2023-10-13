<template>
	<a-layout-sider breakpoint="lg" collapsed-width="0" width="200" style="background: #fff" @collapse="onCollapse"
		@breakpoint="onBreakpoint">
		<a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline"
			:style="{ height: '100%', borderRight: 0 }" :items="siderMenu" @click="handleClick"></a-menu>
	</a-layout-sider>
</template>

<script lang="ts" setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined, DashboardOutlined, TableOutlined } from '@ant-design/icons-vue'
import { ref, reactive, h } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const selectedKeys = ref(['1'])
const openKeys = ref([])
const siderMenu = reactive([
	{
		title: '工作台',
		label: '工作台',
		key: '1',
		icon: () => h(DashboardOutlined),
		path: '/workplace',
	},
	{
		title: '文章管理',
		label: '文章管理',
		key: '2',
		icon: () => h(TableOutlined),
		children: [
			{
				key: '2-1',
				title: '文章列表',
				label: '文章列表',
				path: '/article/list',
			},
		],
	},
])

const onCollapse = (collapsed: boolean, type: string) => {
	console.log(collapsed, type)
}

const onBreakpoint = (broken: boolean) => {
	console.log(broken)
}

/**
 * 菜单点击路由跳转
 */
const handleClick: MenuProps['onClick'] = e => {
	router.push({
		path: e.item.path,
	})
}
</script>
