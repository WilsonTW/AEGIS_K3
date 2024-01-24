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
import mqtt from 'mqtt';
import countTo from 'vue-count-to';

// import VueLazyload from 'vue-lazyload';
// import { initializeApp } from "firebase/app";

  // MQTT 服務器配置
  // const options = {
  //   connectTimeout: 4000,
  //   // 認證信息
  //   clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  //   // clientId: 'mqttjs_123123' ,
  //   username: 'wilson', // 替換為你的用戶名
  //   password: 'wilsonpw', // 替換為你的密碼
  // };

  // // 連接到 MQTT 服務器
  // const mqttClient = mqtt.connect('ws://3.129.206.52:8083/mqtt', options);

  // mqttClient.on('connect', () => {
  //   console.log('Connected to MQTT Broker');

  // });

  // store.dispatch('mqtt/setMqttClient', mqttClient);
  // store.dispatch('mqtt/subscribeToTopic', '/BOFI/PCS/1/report');

  // mqttClient.on('message', (topic, message) => {
  //   // 处理接收到的消息
  //   console.log(`Received message from ${topic}: ${message.toString()}`);
  // });

  // MQTT 服務器配置
  const mqttUrl = 'ws://3.129.206.52:8083/mqtt';
  const options = {
    connectTimeout: 4000,
    // 認證信息
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    // clientId: 'mqttjs_123123' ,
    username: 'wilson', // 替換為你的用戶名
    password: 'wilsonpw', // 替換為你的密碼
  };
  const mqttClient = mqtt.connect(mqttUrl, options);

  mqttClient.on('connect', () => {
    console.log('MQTT Connected')
  })

  mqttClient.subscribe('/AEGIS/K3/1/report', (err) => {
    if (!err) {
      console.log('Subscribed to mqttTest');
    } else {
      console.error('Failed to subscribe:', err);
    }
  });

  mqttClient.on('message', (topic, message) => {
    // console.log(JSON.parse(message));
    store.dispatch('receiveMqttMessage', JSON.parse(message));
  })

  mqttClient.on('close', () => {
    console.log("closed");
  })

  // Vue.prototype.$mqtt = mqttClient; 
  
  // this.$mqtt.on('connect', () => {
  //   console.log('Connected to MQTT Broker');
  //   // 訂閱特定主題
  //   this.$mqtt.subscribe('your/topic');
  // });

  // this.$mqtt.on('message', (topic, message) => {
  //   // 處理接收到的消息
  //   console.log(`Received message: ${message.toString()}`);
  //   this.message = message.toString();
  // });

  // this.$mqtt.on('error', (error) => {
  //   console.error('Connection error:', error);
  // });

// 创建 MQTT 客户端
// const mqttClient = mqtt.connect('wss://3.129.206.52:1883');

// 添加 MQTT 客户端到 Vue 原型，这样可以在任何组件中通过 this.$mqtt 访问
// Vue.prototype.$mqtt = mqttClient;

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
