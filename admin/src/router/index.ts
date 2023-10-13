import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/pages/layout/index.vue'

export const routes = [
	{
		path: '/',
		component: Layout,
		children: [
			{
				name: 'workplace',
				path: 'workplace',
				component: () => import('@/pages/workplace.vue'),
			},
			{
				name: 'articleList',
				path: 'article/list',
				component: () => import('@/pages/article/list.vue'),
			},
		],
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('@/pages/login.vue'),
	},
]

const router = createRouter({
	scrollBehavior: () => ({ left: 0, top: 0 }),
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	next()
})

export default router
