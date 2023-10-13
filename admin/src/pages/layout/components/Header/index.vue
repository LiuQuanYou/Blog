<template>
	<a-layout-header class="header">
		<div class="logo">
			<img src="@/assets/vue.svg" />
			<h1>Blog</h1>
		</div>

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
	</a-layout-header>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import userImg from '@/assets/img/user.jpg'
import { userStore } from '@/store/user'
import { getUserInfo } from '@/api/user'

const user = userStore()

interface User {
	id: number
	avatar: string
	sex: number
	userName?: string
}

const userData = computed(() => {
	return user.user
});

onMounted(async () => {
	var res = await getUserInfo()
})
</script>

<style lang="scss">
.header {
	display: flex;
	justify-content: space-between;

	.user-btns {
		display: flex;
		align-items: center;

		span {
			color: #fff;
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
</style>
