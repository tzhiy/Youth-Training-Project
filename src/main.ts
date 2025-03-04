/*
 * @Author: Merlin218
 * @Date: 2022-02-03 21:26:54
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-04 19:52:06
 * @Description: 请填写简介
 */
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
import App from './App.vue';
import router from './router';
import 'default-passive-events';

const store = createPinia();
store.use(piniaPluginPersist);

createApp(App).use(router).use(store).use(VXETable).mount('#app');
