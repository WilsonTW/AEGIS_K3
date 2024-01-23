<template>
  <div>
    <big-card title="用電紀錄" class="left animated bounceInUp">
      <chart :option="option1"></chart>
    </big-card>
    <big-card title="分區用電量" class="left animated bounceInUp card2-animate">
      <chart :option="option2"></chart>
    </big-card>
    <big-card title="再生能源比例" class="left animated bounceInUp card3-animate">
      <chart :option="option31"></chart>
    </big-card>
    <big-card title="再生能源(YoY)" class="left animated bounceInUp card4-animate">
      <chart :option="option41"></chart>
    </big-card>
    <big-card title="抑低用電" class="left animated bounceInUp card5-animate">
      <chart :option="option11"></chart>
    </big-card>
    <big-card title="核能" class="left animated bounceInUp card6-animate">
      <chart :option="option6"></chart>
    </big-card>
  </div>
</template>

<script>
  import chart from './chart/chart.vue';
  import bigCard from './common/bigCard.vue';
  import option1 from './chart/option1';
  import option11 from './chart/option11';
  import option2 from './chart/option2';
  // import option3 from './chart/option3';
  import option31 from './chart/option31';
  // import option4 from './chart/option4';
  import option41 from './chart/option41';
  // import option5 from './chart/option5';
  import option6 from './chart/option6';
  export default {
    name: 'Left',
    components: {
      bigCard,
      chart
    },
    data: () => ({
      option1,
      option2,
      option31,
      option41,
      option11,
      option6
    })
  };
</script>

<style lang="less" scoped>
  .left {
    float: left;
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
