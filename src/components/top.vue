<template>
  <div class="animated fadeIn">
    <big-count v-for="(item, idx) in numList" :key="'count' + idx" v-bind="item"></big-count>
  </div>
</template>

<script>
  import bigCount from './common/bicCount.vue';
  export default {
    name: 'Top',
    components: {
      bigCount
    },
    data: () => ({
      numList: [
        { title: '總用電量', value: 124, num: -8.6 },
        { title: '總發電量', value: 150, num: 10.3 },
        { title: '再生能源', value: 36, num: 7.69 }
      ]
    })
  };
</script>

<style></style>
