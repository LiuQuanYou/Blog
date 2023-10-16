<template>
	<a-layout class="v-main">
		<vSider :isCollapsed="collapsed" />
		<a-layout>
			<a-layout>
				<vHeader :isCollapsed="collapsed" @setCollapsd="changeCollapsed" />
				<a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
					<RouterView />
				</a-layout-content>
			</a-layout>
		</a-layout>
	</a-layout>
	<!-- <a-layout class="v-main">
		<vHeader />
		<a-layout>
			<vSider />
			<a-layout style="padding: 0 24px 24px">
				<a-breadcrumb style="margin: 16px 0">
					<a-breadcrumb-item>Home</a-breadcrumb-item>
					<a-breadcrumb-item>List</a-breadcrumb-item>
					<a-breadcrumb-item>App</a-breadcrumb-item>
				</a-breadcrumb>
				<a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
					<RouterView />
				</a-layout-content>
			</a-layout>
		</a-layout>
	</a-layout> -->
</template>
<script lang="ts" setup>
import vHeader from './components/Header/index.vue'
import vSider from './components/Sider/index.vue'
const collapsed = ref<boolean>(false);

const changeCollapsed = (e: boolean) => {
	collapsed.value = e
}
</script>
<style scoped>
.v-main {
	width: 100%;
	height: 100vh;
	overflow: hidden;
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
	float: right;
	margin: 16px 0 16px 24px;
}

.site-layout-background {
	background: #fff;
}
</style>
