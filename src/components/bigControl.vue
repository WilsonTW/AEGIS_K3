<template>
  <div class="wapper">
    <div
      class="card"
      v-for="(item, index) in controls"
      :class="{ active: activeVar == index }"
      @click="activeFun(item, index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        controls: [
          // {
          //   name: '旅館分佈'
          // },
          // {
          //   name: '熱力分佈'
          // },
          {
            name: '高耗能區'
          },
          {
            name: '虛擬電廠'
          }
        ],
        activeVar: null
      };
    },
    methods: {
      activeFun(item, index) {
        this.activeVar = index;
        this.$emit('activeFun', item);
      }
    },
    mounted() {}
  };
</script>
<style lang="less" scoped>
  .wapper {
    display: flex;
    .card {
      margin: 2px 10px;
      background: url('./../assets/image/control.png');
      font-size: 24px;
      color: #fff;
      padding: 10px 42px;
      text-align: center;
      cursor: pointer;
    }
    .active {
      background: url('./../assets/image/control_active.png');
    }
  }
</style>
