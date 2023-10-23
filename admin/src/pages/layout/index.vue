<template>
	<a-layout class="v-main">
		<a-layout-sider breakpoint="lg" v-model:collapsed="collapsed" :trigger="null" collapsible>

			<vSider :isCollapsed="collapsed" />
		</a-layout-sider>
		<a-layout>
			<a-layout>
				<vHeader :isCollapsed="collapsed" @setCollapsd="changeCollapsed" />
				<a-layout-content
					:style="{ background: '#f5f5f5', padding: '12px', margin: 0, minHeight: '280px', position: 'relative', overflow: 'hidden' }">
					<div class="routerPage">
						<RouterView />
					</div>
				</a-layout-content>
			</a-layout>
		</a-layout>
	</a-layout>
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

.routerPage {
	background-color: #fff;
	position: absolute;
	height: calc(100% - 24px);
	width: calc(100% - 24px);
	left: 12px;
	top: 12px;
	padding: 20px 15px;
	overflow-x: hidden;
	overflow-y: auto;
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
	float: right;
	margin: 16px 0 16px 24px;
}

.site-layout-background {
	background: #fff;
}
</style>
