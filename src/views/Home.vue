<template>
  <div class="main">
    <loader :number="loadingNumber" v-if="loadingNumber !== 100"></loader>
    <div class="mask"></div>
    <div v-if="loadingNumber === 100 && isShowChart">
      <big-header></big-header>
      <big-left class="left"></big-left>
      <big-right class="right"></big-right>
      <big-top class="top"></big-top>
      <big-control class="control" @activeFun="handleClickControl"></big-control>
    </div>
    <div id="screen" class="screen"></div>
  </div>
</template>

<script>
  import loader from '@/components/loader';
  import ZThree from '@/three/ZThree';
  import * as THREE from 'three';
  import store from '../store';
  import {
    loaderModel,
    // createTourismText,
    destroyControlGroup,
    // createHotMap,
    createHome,
    createRipples,
    createRings
  } from '@/three/loaderModel';
  import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
  import { cssRender } from '@/three/cssRender';
  import bigHeader from '@/components/header';
  import bigLeft from '@/components/left';
  import bigRight from '@/components/right';
  import bigTop from '@/components/top';
  import bigControl from '@/components/bigControl';
  // import tooltip from '@/components/tooltip';
  import { addPoints } from '@/three/points';
  import { bulidingShader, rippleShader, ringShader } from '@/three/shader';
  import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

  let app, camera, scene, renderer, controls, clock, pointScene;

  export default {
    name: 'Home',
    components: {
      loader,
      bigHeader,
      bigLeft,
      bigRight,
      bigTop,
      // tooltip,
      bigControl
    },
    data() {
      return {
        // loading数值
        loadingNumber: 0,
        isShowChart: false,
        firstRenderTime: null,
        cameraPos: [-19.65, 398, 341],
        // cameraPos: [-19.65, 98, 0],
        // cameraPos: [-260.65, -7200, 341],
        controlsTarget: [-7.6, 0.77, 27.81]
      };
    },
    methods: {
      initZThree() {
        clock = new THREE.Clock();
        app = new ZThree('screen');
        app.initThree();
        // app.initHelper();
        app.initLight();
        app.initOrbitControls();
        // app.initRaycaster();
        window.app = app;
        camera = app.camera;
        camera.position.set(...this.cameraPos);
        scene = app.scene;
        renderer = app.renderer;
        // renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.logarithmicDepthBuffer = true;
        controls = app.controls;
        controls.target.set(...this.controlsTarget);
        controls.maxPolarAngle = Math.PI / 2.2;

        app.skyTexture = app.loaderSky('texture/sky/');
        scene.background = app.skyTexture;
        scene.environment = app.skyTexture;

        loaderModel(app);

        let instance = new cssRender(CSS3DRenderer, app);
        app.cssRenderer = instance.cssRenderer;
        app.instance = instance;

        //粒子特效
        const total = 1000;
        const height = 500;
        const width = 500;
        const depth = 40;
        pointScene = addPoints(app, total, height, width, depth);

        app.render(() => {
          if (this.isShowChart) {
            if (pointScene) {
              pointScene.geometry.vertices.forEach((item) => {
                item.x -= item.direction.x * 0.1;
                item.y -= item.direction.y * 0.1;
                item.z -= item.direction.z * 0.1;
                if (item.x > width || item.x < -width) item.x = item.origin.x;
                if (item.y > width || item.y < -width) item.y = item.origin.y;
                if (item.z > width || item.z < -width) item.z = item.origin.z;
              });
              pointScene.geometry.verticesNeedUpdate = true;
            }

            bulidingShader.uniforms.startY.value =
              bulidingShader.uniforms.startY.value > 152.1
                ? -5.89
                : bulidingShader.uniforms.startY.value + 0.5;

            if (rippleShader) {
              rippleShader.uniforms.time.value += 0.005;
            }

            if (ringShader) {
              ringShader.uniforms.time.value += 0.002;
            }

            controls.update(clock.getDelta());
            renderer.render(scene, camera);
            app.cssRenderer.render(scene, camera);
            TWEEN.update();
          }
        });
      },
      handleClickControl(item) {
        destroyControlGroup(app);
        switch (item.name) {
          // case '旅館分佈':
          //   createTourismText(app);
          //   break;

          case 'K館':
            // createHotMap(app);
            createHome(app);
            break;

          case '示範場域':
            createRipples(app);
            store.dispatch('publishMqttMessage', { topic: '/AEGIS/K3/1/pub', message: '0' });
            break;

          case '燈區亮點':
            createRings(app);
            break;

          default:
            break;
        }
      }
    },
    mounted() {
      this.$EventBus.$on('changeLoaidng', (val) => {
        this.loadingNumber = val;
      });
      this.$EventBus.$on('changeScene', (val) => {
        this.isShowChart = val;
      });
      this.initZThree();
    }
  };
</script>

<style lang="less" scoped>
  .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000;

    .video {
      position: absolute;
      width: 0;
      height: 0;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('./../assets/image/mask.png');
      background-size: 100% 100%;
      pointer-events: none;
      z-index: 3;
    }

    .screen {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
    }

    .left {
      width: 1200px;
      height: 82%;
      position: fixed;
      top: 160px;
      left: 24px;
      z-index: 3;
    }
    .right {
      width: 1200px;
      height: 82%;
      position: fixed;
      top: 160px;
      right: 24px;
      z-index: 3;
    }
    .top {
      width: 984px;
      height: 16%;
      position: fixed;
      top: 152px;
      right: 1466px;
      z-index: 3;
      float: left;
    }
    .control {
      width: 812px;
      height: 6%;
      position: fixed;
      bottom: 26px;
      right: 1433px;
      z-index: 3;
      float: left;
    }

    .back {
      width: 48px;
      height: 16%;
      position: fixed;
      bottom: -80px;
      right: 1909px;
      z-index: 3;
      cursor: pointer;
      img {
        width: 100%;
      }
      p {
        color: #fff;
        text-align: center;
      }
    }
  }
</style>
<style>
  .text-3d {
    padding: 0 10px;
    background: url('./../assets/image/bed_bg.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 24px;
    line-height: 48px;
    text-align: center;
    cursor: pointer;
  }
</style>
