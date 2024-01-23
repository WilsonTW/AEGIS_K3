import Vue from 'vue'
import Vuex from 'vuex'

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

// store.js
// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mqttMessage: ''
  },
  mutations: {
    setMqttMessage(state, message) {
      state.mqttMessage = message;
    }
  },
  actions: {
    receiveMqttMessage({ commit }, message) {
      commit('setMqttMessage', message);
    }
  }
});