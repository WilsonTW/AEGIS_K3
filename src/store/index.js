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
    }
  },
  actions: {
    receiveMqttMessage({ commit }, message) {
      // console.log(message);
      commit('setMqttMessage', message);
    }
  }
});