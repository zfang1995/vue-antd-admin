import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
import axios from 'axios'
import 'babel-polyfill'
import localforage from 'localforage'
import vueComponentPopup from './utils/vue-component-popup'
import {i18n} from './store/modules/i18n' // Internationalization
import '@/assets/styles/variables.scss'
import iconFont from "@/assets/components/iconFont"
import appLink from "@/assets/appLink"
import longPress from 'vue-longpress'
import VCharts from 'vue-echarts'
import '@/assets/mockData'

Vue.use(Antd);
Vue.component('v-chart', VCharts)
Vue.component('iconFont', iconFont);
Vue.component('appLink', appLink);
Vue.component('longPress', longPress);

Vue.use(vueComponentPopup);

Vue.prototype.$axios = axios;
Vue.prototype.$localforage = localforage;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

