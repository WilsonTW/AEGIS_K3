<template>
  <div class="tooltip-wrapper">
    <div class="tooltip bottom">
      <h3>{{ name }}</h3>
      <div>
        <h6>負責統計人：XXX</h6>
        <h6>人口數：{{ val1 }}萬</h6>
        <h6>企業數：{{ val2 }}家</h6>
        <h6>稅收：{{ val3 }}億元</h6>
      </div>
    </div>
  </div>
</template>

<script>
  import { randomNum } from '@/utils/common';
  export default {
    name: '',
    components: {},
    props: ['name'],
    watch: {
      name(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.val1 = randomNum(400, 600);
          this.val2 = randomNum(14000, 16600);
          this.val3 = randomNum(10, 15);
        }
      }
    },
    data() {
      return {
        val1: randomNum(400, 600),
        val2: randomNum(14000, 16600),
        val3: randomNum(10, 15)
      };
    },
    mounted() {}
  };
</script>
<style lang="less" scoped>
  .tooltip-wrapper {
    display: inline-block;
    position: fixed;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    color: #fff;
    opacity: 1;
    transition: none;
    z-index: 101;
    pointer-events: none;
  }

  .tooltip-wrapper .tooltip {
    padding: 10px 15px 15px 15px;
    border-radius: 0;
    display: inline-block;
    position: relative;
    margin-left: -50%;
    margin-top: -100%;
    top: -83px;
    opacity: 1;
    border: 1px solid #2294ff;
    background: linear-gradient(to bottom, #081a30, #003678);
    box-shadow: inset 0 0 10px rgba(13, 150, 255, 0.8);
  }

  .tipnav {
    position: relative;
    z-index: 10;
  }

  .tooltip-wrapper .tooltip::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 0;
    pointer-events: none;
  }

  .tooltip-wrapper .tooltip::before {
    background: url('./../assets/image/mdbg.png') center top no-repeat,
      url(./../assets/image/ft_mdbg.png) left bottom no-repeat;
  }

  .tooltip-wrapper .tooltip > h3 {
    font-size: 32px;
    position: initial !important;
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 5px 0 13px 0;
    text-align: center;
  }

  .tooltip-wrapper .tooltip > h3:before {
    position: absolute;
    content: '';
    pointer-events: none;
    left: -10px;
    top: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    background: rgba(5, 7, 9, 0.2);
    border: 1px solid rgba(124, 192, 255, 0.1);
    z-index: -1;
  }

  .tooltip-wrapper .tooltip h6 {
    font-size: 24px;
    height: 36px;
  }
</style>
