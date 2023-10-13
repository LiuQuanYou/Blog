import { defineStore } from 'pinia'

interface User {
	id: number
	avatar: string
	sex: number
	userName?: string
}

export const userStore = defineStore({
	id: 'user',
	persist: true,
	state: () => ({
		token: '',
		user: {} as User,
	}),
	getters: {},
	actions: {
		setToken(token: string) {
			this.token = token
		},
		setUser(user: User) {
			this.user = user
		},
	},
})
