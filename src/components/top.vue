<template>
  <div class="animated fadeIn">
    <big-count v-for="(item, idx) in numList" :key="'count' + idx" v-bind="item"></big-count>
  </div>
</template>

<script>
  import bigCount from './common/bicCount.vue';
  import { mapGetters } from 'vuex';
  // import { mapActions, mapState } from 'vuex';
  export default {
    name: 'Top',
    computed: {
      ...mapGetters([
        'getMqttMsg'
      ]),
      numList() {
        return [
          { title: '總用電量', value: this.getMqttMsg.consumption, num: -8.6 },
          { title: '總發電量', value: this.getMqttMsg.generation, num: 10.3 },
          { title: '再生能源', value: this.getMqttMsg.renewable, num: 7.69 }
        ]
      },
    },
    components: {
      bigCount
    }
    // data: () => ({
    //   numList: [
    //     { title: '總用電量', value: 124, num: -8.6 },
    //     { title: '總發電量', value: 150, num: 10.3 },
    //     { title: '再生能源', value: 36, num: 7.69 }
    //   ]
    // })
    // computed: {
    // ...mapState('mqtt', ['mqttMessage', 'connected'])
    // },
    // methods: {
    //   ...mapActions('mqtt', ['connectMqtt', 'subscribeMqtt', 'disconnectMqtt']),
    //   connect() {
    //     this.connectMqtt();
    //   },
    //   subscribe(topic) {
    //     this.subscribeMqtt(topic);
    //   },
    //   disconnect() {
    //     this.disconnectMqtt();
    //   }
    // }
  };
</script>

<style></style>
