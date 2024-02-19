<template>
  <div>
    <big-card title="虛擬電廠設備" class="right animated bounceInUp">
      <chart :option="option81"></chart>
    </big-card>
    <big-card title="創能設備" class="right animated bounceInUp card2-animate">
      <chart :option="option85"></chart>
    </big-card>
    <big-card title="告警" class="right animated bounceInUp card3-animate">
      <dv-scroll-board :config="option10" class="dv" />
    </big-card>
    <big-card title="告警" class="right animated bounceInUp card4-animate">
      <dv-scroll-board :config="option10" class="dv" />
    </big-card>
    <big-card title="維修紀錄" class="right animated bounceInUp card5-animate">
      <dv-scroll-ranking-board :config="option12" class="dv" />
    </big-card>
    <big-card title="維修紀錄" class="right animated bounceInUp card6-animate">
      <dv-scroll-ranking-board :config="option13" class="dv" />
    </big-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import chart from './chart/chart.vue';
  import bigCard from './common/bigCard.vue';
  // import option7 from './chart/option7';
  import option81 from './chart/option81';
  import option8 from './chart/option8';
  import { getSeries } from './chart/option8';
  import option3 from './chart/option3';
  import option10 from './chart/option10';
  import option12 from './chart/option12';
  import option13 from './chart/option13';
  export default {
    name: 'Left',
    components: {
      bigCard,
      chart
    },
    data: () => ({
      option81,
      option8,
      option3,
      option10,
      option12,
      option13
    }),
    computed: {
      ...mapGetters([
        'getMqttMsg'
      ]),
      option85() {
        return {
          color: option8.color,
          graphic: option8.graphic,
          toolyip: option8.tooltip,
          legend: option8.legend,
          toolbox: option8.toolbox,
          series: getSeries([
          { name: 'HE', value: this.getMqttMsg.generation },
          { name: 'GRID', value: this.getMqttMsg.consumption },
          { name: 'PV', value: this.getMqttMsg.renewable }
        ])
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .dv {
    width: 520px;
    height: 220px;
    padding-left: 36px;
  }
  .right {
    float: right;
  }

  .card1-animate {
    animation-delay: 0;
  }

  .card2-animate {
    animation-delay: 0.2s;
  }

  .card3-animate {
    animation-delay: 0.4s;
  }

  .card4-animate {
    animation-delay: 0.6s;
  }

  .card5-animate {
    animation-delay: 0.8s;
  }

  .card6-animate {
    animation-delay: 1s;
  }
</style>

<style>
  .dv-scroll-board .header {
    background-image: url('./../assets/image/table1.png') !important;
    background-size: 100% 100%;
    background-color: transparent !important;
  }

  .dv-scroll-board .header .header-item {
    opacity: 0.8;
  }

  .dv-scroll-board .rows .ceil {
    opacity: 0.8;
  }

  .dv-scroll-board .row-item:nth-child(2n) {
    background-image: url('./../assets/image/table2.png') !important;
    background-size: 100% 100%;
    background-color: transparent !important;
  }

  .dv-scroll-board .header .left {
    opacity: 1;
  }

  .tableScrollBoard .time {
    position: absolute;
    left: 893px;
    top: 111px;
    font-size: 18px;
    color: #fff;
  }

  .tableScrollBoard .close {
    position: absolute;
    left: 1150px;
    top: 87px;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
  }
</style>
