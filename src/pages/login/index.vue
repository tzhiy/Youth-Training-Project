<template>
	<div class="login">
		<h1 style="color: #333; margin-bottom: 40px">登录</h1>
		<a-form>
			<a-form-item label="账号：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
				<a-input ref="username" placeholder="用户名">
					<template #prefix>
						<UserOutlined />
					</template>
				</a-input>
			</a-form-item>
			<a-form-item label="密码：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
				<a-input-password ref="password" placeholder="密码" />
			</a-form-item>
			<a-form-item label="验证码：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
				<div class="flex">
					<a-input placeholder="验证码" style="width: 40%" @change="codeInput" />
					<div id="svgWrapper"></div>
					<a-button type="link" @click="refreshImg">换一个</a-button>
				</div>
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
				<div class="flex">
					<span></span>
					<a-button type="primary" style="margin-left: 8px" @click="handleSubmit">登陆</a-button>
					<a-button @click="handleReset">重置</a-button>
					<!-- <router-link to="/register" style="margin-left: 30px">去注册</router-link> -->
				</div>
			</a-form-item>
		</a-form>
	</div>
</template>

<script>
import { message } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { loginApi } from '@/api';
import { useMainStore } from '@/store/user';

export default {
	components: { UserOutlined },
	data() {
		return {
			submit: {
				user_name: '',
				password: '',
			},
			code: '',
			randomNum: 0.0,
		};
	},
	mounted() {
		this.refreshImg();
	},
	methods: {
		refreshNum() {
			let newNum = 0;
			while (newNum === 0 || newNum === this.randomNum) {
				newNum = Math.random() * 10;
			}
			this.randomNum = newNum;
		},
		codeInput(e) {
			document.cookie = `captcha_client=${e.target.value}`;
		},
		async refreshImg() {
			this.refreshNum();
			const svgWrapper = document.getElementById('svgWrapper');
			svgWrapper.innerHTML = '';
			const res = await loginApi.getImg({ v: this.randomNum });
			svgWrapper.innerHTML = res;
		},
		async handleSubmit() {
			const store = useMainStore();
			const form = {
				user_name: this.$refs.username.stateValue,
				password: this.$refs.password.input.stateValue,
			};
			const fakeUser = {
				user_name: 'alexzhli',
				password: '123456',
			};
			const res = await loginApi.login(form || fakeUser);
			store.updateStatus();
			switch (res.code) {
				case 0:
					message.success('登录成功,即将跳转到主页');
					setTimeout(() => this.$router.push({ path: `/projects` }), 3000);
					break;
				case 1:
					message.error(res.message);
					break;
				default:
					break;
			}
		},
		handleReset() {
			this.submit = {};
		},
	},
};
</script>

<style>
.login {
	width: 100%;
	height: 100%;
	background-size: cover;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.flex {
	width: 340px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
#svgWrapper {
	width: 123px;
	height: 43px;
	border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
