import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/reset.css';
import bus from './bus';
import dataV from '@jiaminghi/data-view';
import echarts from 'echarts';
import './assets/animate.css';
import countTo from 'vue-count-to';
// import VueLazyload from 'vue-lazyload';
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyBOohvvBQGrQuriOVXf8HFEn8Y46rQrJd0",
//   authDomain: "aegis-59eb3.firebaseapp.com",
//   projectId: "aegis-59eb3",
//   storageBucket: "aegis-59eb3.appspot.com",
//   messagingSenderId: "952504725651",
//   appId: "1:952504725651:web:3636a8f82e0c473335dd66",
//   measurementId: "G-25PDYS5B96"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

Vue.component('count-to', countTo);
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$EventBus = bus;

Vue.prototype.$echarts = echarts;

Vue.use(dataV);
// Vue.use(VueLazyload);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
