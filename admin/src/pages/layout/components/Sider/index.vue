<template>
	<div class="logo">
		<img src="@/assets/vue.svg" />
		<h1 v-show="!collapsed">Blog-Admin</h1>
	</div>
	<a-menu v-model:selectedKeys="selectedKeys" theme="dark" v-model:openKeys="openKeys" mode="inline"
		:style="{ height: '100%', borderRight: 0 }" :items="SliderMenu" @click="handleClick"></a-menu>
</template>

<script lang="ts" setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined, DashboardOutlined, TableOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import { MenuProps } from 'ant-design-vue';
import { getMenu } from '@/api/menu'
import { MenuItem } from '@/models/Sidebar'
import { useStore } from '@/store/index'
import BlogIcon from '@/components/Icon/index.vue'
import _ from 'lodash'

const IndexStor = useStore()
const router = useRouter()
const aMenuKey = ref(1)

const props = defineProps({
	isCollapsed: {
		default: false,
		type: Boolean,
	},
});

const getTreeList = (list: any) => {
	var listData = list.filter((item: any) => item.status == 1)
	listData.map((item: any) => {
		if (item['children']) {
			item.children = getTreeList(item.children);
		}
		item.iconClass = item.iconClass ? item.iconClass : null
	})
	return listData
}


const SliderMenu = computed(() => {
	var menuData = _.cloneDeep(IndexStor.SliderMenu)
	var data = getTreeList(menuData)
	return data
})

const collapsed = computed(() => {
	return props.isCollapsed
});

const selectedKeys = ref(['0'])
const openKeys = ref([])

onMounted(() => {
	getMenuData();
})

/**
 * 获取菜单数据
 */
const getMenuData = async () => {
	var res = await getMenu()
	if (res.code == 200) {
		IndexStor.setMenu(res.data)
	}
}

/**
 * 菜单点击路由跳转
 */
const handleClick: MenuProps['onClick'] = e => {
	var row = e.item
	var tabs = IndexStor.MenuTabs;
	var checkRow = tabs.find((item) => item.path == e.item.path)
	if (!checkRow) {
		tabs.push({
			title: row.title,
			path: row.path
		})
		IndexStor.setMenuTabs(tabs)
		IndexStor.TabsIndex = tabs.length - 1
	} else {
		//当前路由已在tabs中存在
		var index = tabs.findIndex((item) => item.path == row.path)
		IndexStor.TabsIndex = index
	}
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