import { watchEffect } from 'vue'
export const paginationMixin = {
	data() {
		return {
			pageSize: 10,
			pageNo: 1,
			total: 0,
		}
	},
	computed: {},
	methods: {},
}
