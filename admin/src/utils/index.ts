import { message } from 'ant-design-vue'

export const config = {
	message: (type: string, message: string) => {
		message[type](message)
	},
}
