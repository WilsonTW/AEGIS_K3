// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
// import mqttModule from './modules/mqtt';

Vue.use(Vuex);

// export default new Vuex.Store({
//   modules: {
//     mqtt: mqttModule
//   }
// });

export default new Vuex.Store({
  state: {
    mqttClient: null,  // 添加 MQTT 客户端实例
    mqttMessage: {},
  },
  getters: {
    getMqttMsg: (state) => {
      return state.mqttMessage;
    }
  },
  mutations: {
    setMqttMessage(state, message) {
      state.mqttMessage = message;
    },
    setMqttClient(state, client) {  // Mutation 来设置 MQTT 客户端实例
      state.mqttClient = client;
    }
  },
  actions: {
    initialize({ commit }, client){
      // console.log(message);
      commit('setMqttClient', client);
    },
    receiveMqttMessage({ commit }, message) {
      // console.log(message);
      commit('setMqttMessage', message);
    },
    publishMqttMessage({ state }, { topic, message }) {
      if (state.mqttClient && state.mqttClient.connected) {
        state.mqttClient.publish(topic, message);
        // console.log(topic+message);
      } else {
        console.error('MQTT Client not connected');
      }
    }
  }
});