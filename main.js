import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

App.mpType = 'app'

import uView from 'uview-ui';
Vue.use(uView);


import store from '@/store';

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

const app = new Vue({
	store,
    ...App
})
app.$mount()
