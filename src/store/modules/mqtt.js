// store/modules/mqtt.js
export default {
    state: {
      mqttClient: null,
      mqttMessage: '',
    },
    mutations: {
      SET_MQTT_CLIENT(state, client) {
        state.mqttClient = client;
      },
      SET_MQTT_MESSAGE(state, message) {
        state.mqttMessage = message;
      },
    },
    actions: {
      setMqttClient({ commit }, client) {
        commit('SET_MQTT_CLIENT', client);
      },
      subscribeToTopic({ state }, topic) {
        if (state.mqttClient) {
          state.mqttClient.subscribe(topic, (err) => {
            if (!err) {
              state.mqttClient.on('message', (topic, message) => {
                commit('SET_MQTT_MESSAGE', message.toString());
              });
            }
          });
        }
      },
    },
  };
  