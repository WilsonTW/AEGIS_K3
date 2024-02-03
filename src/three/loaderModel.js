import * as THREE from 'three';
import { buildingMaterial } from './material';
import { createBuilding } from './createBuilding';
import {
  geziMaterial,
  building1Material,
  building0Material,
  coneMaterial,
  ringMaterial
} from './material';
import EventBus from '../bus';
import { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { heatMap } from '@/three/heatmap';
import { createRipple } from './ripple';
import { ringShader, rippleShader } from './shader';

export function loaderModel(app) {
  app.modelGroup = new THREE.Group();
  app.controlgroup = new THREE.Group();
  app.modelGroup.add(app.controlgroup);
  createPlane(app, 500, 500, [0, 0, -3], geziMaterial);
  const center = [113.293398, 23.147409];
  // const center = [120.2900994, 22.9213803];
  const urls = [
    {
      type: 'glb',
      url: 'model/building.glb',
      onLoad: (object) => {
        const building = object.scene.children[0].children[0];
        const roof = object.scene.children[0].children[1];
        building.material = building0Material;

        const parameters = {
          type: '貼圖'
        };
        const types = ['貼圖', 'shader'];
        app.gui
          .add(parameters, 'type')
          .options(types)
          .name('主題切換')
          .onChange(() => {
            if (parameters.type == '貼圖') {
              building.material = building0Material;
              roof.material.color = new THREE.Color('#555555');
            } else if (parameters.type == 'shader') {
              building.material = building1Material;
              roof.material.color = new THREE.Color('#086FF5');
            }
          });
      app.modelGroup.add(object.scene);
      }
    },
    // {
    //     type: 'file',
    //     url: 'model/building.json',
    //     onLoad: (json) => {
    //         console.log(json);
    //         const buildingMesh = createBuilding(json, center, buildingMaterial);
    //         // app.mapModel.add(buildingMesh);
    //         app.modelGroup.add(buildingMesh);
    //     }
    // },
    // {
    //   type: 'glb',
    //   url: 'model/water.glb',
    //   onLoad: (object) => {
    //     const water = object.scene.children[0];
    //     water.material.color = new THREE.Color('#006cb9');
    //     app.modelGroup.add(object.scene);
    //   }
    // },
    {
      type: 'glb',
      url: 'model/MPA_k館_light.glb',
      onLoad: (object) => {
        console.log(object.scene.children[2].position);
        const k31 = object.scene.children[0];
        const k32 = object.scene.children[1];
        const k33 = object.scene.children[2];
       
        app.modelGroup.add(k31);
        app.modelGroup.add(k32);
        app.modelGroup.add(k33);
        const kkSpotLight = app.scene.getObjectByName('kkSpotLight');
        kkSpotLight.target = k33;
        
        // k3.material = building0Material;
        // k32.material.color = new THREE.Color('#006cb9');
        // k31.material.color = new THREE.Color('#bf950b');
        // app.modelGroup.add(object.scene.children[0]);
      }
    },
    // {
    //   type: 'glb',
    //   url: 'model/primary.glb',
    //   onLoad: (object) => {
    //     app.modelGroup.add(object.scene.children[0]);
    //   }
    // },
    // {
    //   type: 'glb',
    //   url: 'model/secondary.glb',
    //   onLoad: (object) => {
    //     app.modelGroup.add(object.scene);
    //   }
    // },
    {
      type: 'glb',
      url: 'model/trunk1.glb',
      onLoad: (object) => {
        app.modelGroup.add(object.scene);
      }
    },
    // {
    //   type: 'gltf',
    //   url: 'model/box.gltf',
    //   onLoad: (object) => {
    //     app.modelGroup.add(object.scene);
    //   }
    // },
    // {
    //   type: 'glb',
    //   url: 'model/ctf2.glb',
    //   onLoad: (object) => {
    //     app.modelGroup.add(object.scene);
    //   }
    // },
    // {
    //   type: 'glb',
    //   url: 'model/国际金融中心2.glb',
    //   // url: 'model/simple_taipei_101.glb',
    //   onLoad: (object) => {
    //     app.modelGroup.add(object.scene);
    //   }
    // },
    // {
    //   type: 'glb',
    //   url: 'model/广州塔2.glb',
    //   onLoad: (object) => {
    //     app.modelGroup.add(object.scene);
    //   }
    // },
    // {
    //   type: 'glb',
    //   url: 'model/taipei_101_k3.glb',
    //   onLoad: (object) => {
    //     app.modelGroup.add(object.scene);
    //   }
    // },
    // {
    //   type: 'glb',
    //   url: 'model/tourism.glb',
    //   onLoad: (object) => {
    //     app.tourismModel = object.scene;
    //   }
    // },
    // {
    //   type: 'glb',
    //   url: 'model/hotMap.glb',
    //   onLoad: (object) => {
    //     app.hotMap = object.scene.children[0];
    //   }
    // },
    {
      type: 'glb',
      url: 'model/ripple_green.glb',
      // url: 'model/taipei_101.glb',
      onLoad: (object) => {
        app.ripple = object.scene;
      }
    },
    {
      type: 'glb',
      url: 'model/ring1.glb',
      onLoad: (object) => {
        // console.log(object);
        app.ring = object.scene;
      }
    }
  ];

  let urlsLength = urls.length;
  app.iterateLoad(
    urls,
    (xhr) => {
      let proportion = parseInt((xhr.loaded / xhr.total) * 100);
      if (proportion === 100) {
        EventBus.$emit('changeLoaidng', parseInt(100 / urlsLength));
        urlsLength--;
        if (urlsLength <= 1) {
          EventBus.$emit('changeScene', true);
        }
      }
    },
    () => {
      const parameters = {
        rippleColor: '#bfa',
        ringColor: '#bfa'
      };
      app.gui
        .addColor(parameters, 'rippleColor')
        .name('ripple顏色')
        .onChange(() => {
          rippleShader.uniforms.color.value = new THREE.Color(parameters.rippleColor);
        });

      app.gui
        .addColor(parameters, 'ringColor')
        .name('ring顏色')
        .onChange(() => {
          ringShader.uniforms.color.value = new THREE.Color(parameters.ringColor);
        });

      app.modelGroup.scale.set(0.01, 0.01, 0.01);
      app.scene.add(app.modelGroup);
      setTimeout(() => {
        app.flyTo({
          position: [39.00, 6.88, 54.00],
          controls: [25.00, 0.08, 40.00],
          done: () => {
            app.ripple.children.forEach((obj) => {
              const html = `
              <div class="text-3d animated fadeIn" id="${obj.name}">${obj.name}</div>`;
              // <div class="text-3d animated fadeIn" id="${obj.name}">${obj.name}</div>`;
              app.instance.add({
                parent: app.controlgroup,
                cssObject: CSS3DSprite,
                name: obj.name,
                element: html,
                position: [obj.position.x, obj.position.y + 500, obj.position.z],
                scale: [0.03, 0.03, 0.03]
              });
      
              const array = obj.geometry.attributes.position.array;
              const ripple = createRipple([...array], 90);
              ripple.position.copy(obj.position);
              app.controlgroup.add(ripple);
            });
          },
          duration:1800
        });
      }, 200);
    }
  );
}

function createPlane(option, width, height, position, material) {
  const geometry = new THREE.PlaneBufferGeometry(width, height);

  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(...position);
  option.scene.add(plane);
  plane.rotateX(-Math.PI / 2);
  plane.position.set(0, -1, 0);
  return plane;
}

/**
 * 创建旅游休闲文本
 * @param {*} app
 */
export function createTourismText(app) {
  app.flyTo({
    position: [8.7, 5.23, 58.73],
    controls: [-7.6, 0.77, 27.81],
    done: () => {
      const geometry = new THREE.ConeGeometry(50, 100, 4); //半径、高度、切割数
      const cone = new THREE.Mesh(geometry, coneMaterial);
      cone.rotateX(Math.PI);
      app.tourismModel.traverse((obj) => {
        if (obj.isObject3D) {
          const position = Object.values(obj.position);
          const html = `
        <div class="text-3d animated fadeIn" id="${obj.name}" position="${position}" >${obj.name}</div>`;
          app.instance.add({
            parent: app.controlgroup,
            cssObject: CSS3DSprite,
            name: obj.name,
            element: html,
            position: [position[0], position[1] + 600, position[2]],
            scale: [0.01, 0.01, 0.01]
          });
          const cone_clone = cone.clone();
          cone_clone.position.set(position[0], position[1] + 500, position[2]);
          app.controlgroup.add(cone_clone);
        }
      });
    }
  });
}

/**
 * 创建热力图
 * @param {*} app
 */
export function createHotMap(app) {
  app.flyTo({
    position: [-7.5, 727, 36.26],
    controls: [-7.6, 0.77, 27.81],
    done: () => {
      const heatMapTexture = new THREE.Texture(heatMap(100, 100));
      const heatMapMaterial = new THREE.MeshBasicMaterial({ map: heatMapTexture });
      heatMapMaterial.map.needsUpdate = true;
      app.hotMap.material = heatMapMaterial;
      app.controlgroup.add(app.hotMap);
    }
  });
}

/**
 * 创建热力图
 * @param {*} app
 */
export function createHome(app) {
  app.flyTo({
    position: [24.268, -7.4, 40.836],
    controls: [24.24, -0.4, 40.8],
    duration: 1800
    // position: [27.10, -7.2, 41.6],
    // controls: [27.00, -0.2, 39.50],
    // done: () => {
    //   const heatMapTexture = new THREE.Texture(heatMap(100, 100));
    //   const heatMapMaterial = new THREE.MeshBasicMaterial({ map: heatMapTexture });
    //   heatMapMaterial.map.needsUpdate = true;
    //   app.hotMap.material = heatMapMaterial;
    //   app.controlgroup.add(app.hotMap);
    // }
  });
}

/**
 * 创建高亮选中栅栏
 * @param {*} app
 */
export function createRipples(app) {
  app.flyTo({
    position: [39.00, 6.88, 54.00],
    // controls: [25.00, 0.08, 40.00],
    // controls: [24.24, -0.4, 40.8],
    controls: [25.00, 0.08, 40.00],
    // controls: [4.56, -4.65, 24.98],
    done: () => {
      app.ripple.children.forEach((obj) => {
        const html = `
        <div class="text-3d animated fadeIn" id="${obj.name}">${obj.name}</div>`;
        // <div class="text-3d animated fadeIn" id="${obj.name}">${obj.name}</div>`;
        app.instance.add({
          parent: app.controlgroup,
          cssObject: CSS3DSprite,
          name: obj.name,
          element: html,
          position: [obj.position.x, obj.position.y + 500, obj.position.z],
          scale: [0.03, 0.03, 0.03]
        });

        const array = obj.geometry.attributes.position.array;
        const ripple = createRipple([...array], 90);
        ripple.position.copy(obj.position);
        app.controlgroup.add(ripple);
      });
    }
  });
}

/**
 * 创建高亮涟漪点
 * @param {*} app
 */
export function createRings(app) {
  app.flyTo({
    position: [36.00, 3.98, 54.00],
    controls: [25.00, 1.08, 38.00],
    done: () => {
      const ringGeometry = new THREE.RingBufferGeometry(0.1, 150, 20, 5, 0, Math.PI * 2);
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      const octahedronGeometry = new THREE.OctahedronGeometry(30, 0);
      const octahedron = new THREE.Mesh(octahedronGeometry, coneMaterial);
      app.ring.children.forEach((obj) => {
        const html = `
        <div class="text-3d animated fadeIn" id="${obj.name}">${obj.name}</div>`;
        // <div class="text-3d animated fadeIn" id="${obj.name}">${obj.name}</div>`;
        // const html = ``;
        app.instance.add({
          parent: app.controlgroup,
          cssObject: CSS3DSprite,
          name: obj.name,
          element: html,
          position: [obj.position.x, obj.position.y + 340, obj.position.z],
          scale: [0.025, 0.025, 0.025]
        });
        const octahedron_clone = octahedron.clone();
        octahedron_clone.position.set(obj.position.x, obj.position.y + 150, obj.position.z);
        app.controlgroup.add(octahedron_clone);
        const ring_clone = ring.clone();
        ring_clone.rotateX(-Math.PI / 2);
        ring_clone.position.set(obj.position.x, obj.position.y + 10, obj.position.z);
        app.controlgroup.add(ring_clone);
      });
    }
  });
}

/**
 * 清空控制器组
 * @param {*} app
 * @returns
 */
export function destroyControlGroup(app) {
  if (app.controlgroup.children.length === 0) {
    return;
  }
  app.instance.removeAll(app.controlgroup);
  for (let i = app.controlgroup.children.length - 1; i > -1; i--) {
    const obj = app.controlgroup.children[i];
    if (obj.isMesh) {
      obj.geometry.dispose();
      obj.material.dispose();
      app.controlgroup.remove(obj);
    }
  }
}
