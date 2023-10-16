<template>
	<a-layout-header class="header" style="background-color: #fff;padding: 0;">
		<div class="header-top">
			<div>
				<menu-unfold-outlined v-if="collapsed" class="trigger" @click.native="changeCollapsed" />
				<menu-fold-outlined v-else class="trigger" @click.native="changeCollapsed" />
			</div>
			<div class="flex align-center">
				<a-space direction="vertical">
					<a-tooltip title="search">
						<a-button type="link" :icon="h(SearchOutlined)" />
					</a-tooltip>
				</a-space>
				<a-space :size="8">
					<a-dropdown>
						<template #overlay>
							<a-menu>
								<a-menu-item key="1">
									<UserOutlined />
									个人中心
								</a-menu-item>
								<a-menu-divider />
								<a-menu-item key="2">
									<LogoutOutlined />
									退出登录
								</a-menu-item>
							</a-menu>
						</template>
						<a-button type="link" class="user-btns">
							<a-avatar :src="userImg" />
							<span>{{ userData.userName }}</span>
							<DownOutlined />
						</a-button>
					</a-dropdown>
				</a-space>
			</div>
		</div>
	</a-layout-header>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import {
	UserOutlined, DownOutlined, LogoutOutlined, MenuUnfoldOutlined,
	MenuFoldOutlined, SearchOutlined
} from '@ant-design/icons-vue'
import userImg from '@/assets/img/user.jpg'
import { userStore } from '@/store/user'
import { getUserInfo } from '@/api/user'

const emit = defineEmits(["setCollapsd"])
const user = userStore()

const props = defineProps({
	isCollapsed: {
		default: false,
		type: Boolean,
	},

});


//切换侧边菜单展开、收缩
const collapsed = computed(() => {
	return props.isCollapsed
});

//获取当前登录用户信息
const userData = computed(() => {
	return user.user
});

//更改侧边菜单状态
const changeCollapsed = () => {
	emit('setCollapsd', !collapsed.value)
}

onMounted(async () => {
	var res = await getUserInfo()
})
</script>

<style lang="scss">
.header {

	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 48px;
		padding: 0 10px;

		.user-btns {
			display: flex;
			align-items: center;

			span {
				color: #666;
				margin-left: 5px;
			}
		}

		.logo {
			display: flex;
			justify-content: space-between;

			h1 {
				display: inline-block;
				color: #fff;
				margin: 0 0 0 10px;
			}
		}
	}


}
</style>
