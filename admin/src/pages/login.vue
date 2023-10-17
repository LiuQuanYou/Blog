<template>
	<div class="login-main">
		<div class="login-container">
			<div class="login-top">
				<img src="@/assets/vue.svg" alt="" />
				<h1 class="login-title">Yxn博客后台管理</h1>
			</div>

			<a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
				@finishFailed="onFinishFailed">
				<a-form-item label="" name="username" :rules="[{ required: true, message: '请输入账号' }]">
					<a-input v-model:value="formState.username">
						<template #prefix>
							<UserOutlined class="site-form-item-icon" />
						</template>
					</a-input>
				</a-form-item>

				<a-form-item label="" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
					<a-input-password v-model:value="formState.password">
						<template #prefix>
							<LockOutlined class="site-form-item-icon" />
						</template>
					</a-input-password>
				</a-form-item>

				<a-form-item>
					<a-form-item name="remember" no-style>
						<a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
					</a-form-item>
					<a class="login-form-forgot" href="">Forgot password</a>
				</a-form-item>

				<a-form-item>
					<a-button :disabled="disabled" type="primary" block html-type="submit" class="login-form-button">
						登录
					</a-button>

				</a-form-item>
			</a-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { Login } from '@/api/login'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { userStore } from '@/store/user'
import { message } from 'ant-design-vue';

const user = userStore()
const router = useRouter()


interface FormState {
	username: string;
	password: string;
	remember: boolean;
}
const formState = reactive<FormState>({
	username: '',
	password: '',
	remember: true,
});
const onFinish = async (values: any) => {
	var res = await Login(formState);
	if (res.code == 200) {
		user.setToken(res.token);
		user.setUser(res.data)
		message.success('登录成功。');
		router.push({
			path: "/workplace"
		})
	} else {
		message.error('账号或密码错误。');
	}
};

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
	return !(formState.username && formState.password);
});
</script>

<style lang="scss" scoped>
.login-main {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: auto;
	background-color: #f0f2f5;
	background-image: url(../assets/img/login.svg);
	background-repeat: no-repeat;
	background-position: center 110px;
	background-size: 100%;
}

.login-container {
	display: flex;
	flex: 1 1;
	flex-direction: column;
	height: 100%;
	padding: 105px 0 32px 0;
	overflow: auto;
	background: inherit;

	.login-top {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 44px;
		align-items: center;
		margin-bottom: 55px;

		img {
			width: 44px;
		}

		.login-title {
			position: relative;
			top: 2px;
			font-size: 33px;
			margin-left: 10px;
		}
	}

	.login-form {
		width: 328px;
		margin: 0 auto;
	}
}
</style>