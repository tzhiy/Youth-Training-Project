<template>
	<a-layout class="layout">
		<a-layout-header class="header">
			<div class="logo" />
			<template v-if="route.path !== '/login'">
				<a-menu theme="dark" :selected-keys="selectedKeys" :inline-collapsed="false" mode="horizontal" @select="handleMenuChange">
					<a-menu-item key="/projects"> 项目 </a-menu-item>
					<a-menu-item key="/start"> 开始 </a-menu-item>
					<a-menu-item key="/preproccess"> 预处理 </a-menu-item>
					<a-menu-item key="/visual"> 可视化 </a-menu-item>
					<a-menu-item key="/publish"> 发布 </a-menu-item>
				</a-menu>
				<template v-if="store.username">
					<a-dropdown trigger="click">
						<a-avatar size="large" style="cursor: pointer">
							<UserOutlined />
						</a-avatar>
						<template #overlay>
							<a-menu>
								<a-menu-item key="1" @click="logout"> <LogoutOutlined /> 登出 </a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</template>
				<template v-else>
					<div>
						<a-button type="link" @click="toLogin"> 登录 </a-button>
					</div>
				</template>
			</template>
		</a-layout-header>
		<a-layout-content class="content">
			<Scroller :height="contentHeight" background-color="#fff">
				<div :style="{ padding: '40px 20px' }">
					<router-view v-slot="{ Component }">
						<component :is="Component"></component>
					</router-view>
				</div>
			</Scroller>
		</a-layout-content>
		<a-layout-footer class="footer"> Chart ©2022 Created by BugRight </a-layout-footer>
	</a-layout>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import docCookies from '@/utils/cookie';
import { useMainStore } from '@/store/user';
import { loginApi } from '@/api';

const router = useRouter();
const route = useRoute();
const store = useMainStore();

const selectedKeys = ref<Array<string>>([route.path]);

const contentHeight = window.innerHeight - 171;

const handleMenuChange = ({ key }: { key: string }) => {
	if (key.includes(selectedKeys.value[0])) return;
	selectedKeys.value = [key];
	router.push(key);
};

const toLogin = () => {
	router.push('/login');
};

const logout = async () => {
	await loginApi.logout();
	docCookies.setItem('user', '');
	store.updateStatus();
	router.push('/login');
};

watch(
	() => route.path,
	newPath => {
		handleMenuChange({ key: newPath });
	}
);

onMounted(() => {});
</script>

<style lang="scss" scoped>
.layout .logo {
	width: 120px;
	height: 31px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px 24px 16px 0;
}
.header {
	z-index: 99;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}
.content {
	padding: 0 50px;
	margin-top: 100px;
}
.footer {
	text-align: center;
	position: relative;
	left: 0;
	right: 0;
}
</style>
