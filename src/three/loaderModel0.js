import * as THREE from 'three';
import { buildingMaterial } from './material';
import { createBuilding } from './createBuilding';
import EventBus from '../bus';

export function loaderModel(app) {
    return new Promise((resolve) => {
        app.mapModel = new THREE.Group();
        const center = [113.293398, 23.147409];
        const urls = [
            {
                type: 'file',
                url: 'model/building.json',
                onLoad: (json) => {
                    console.log(json);
                    const buildingMesh = createBuilding(json, center, buildingMaterial);
                    app.mapModel.add(buildingMesh);
                }
            }
        ];

        // let urlsLength = urls.length;
        app.iterateLoad(urls, null, () => {
            // urls,
            // (xhr) => {
            // let proportion = parseInt((xhr.loaded / xhr.total) * 100);
            //     if (proportion === 100) {
            //         EventBus.$emit('changeLoaidng', parseInt(100 / urlsLength));
            //         urlsLength--;
            //         if (urlsLength <= 1) {
            //         EventBus.$emit('changeScene', true);
            //         }
            //     }
            // },
            // () => {
            //     // app.modelGroup.scale.set(0.01, 0.01, 0.01);
            //     // app.scene.add(app.modelGroup);
            //     setTimeout(() => {
            //       app.flyTo({
            //         position: [8.7, 5.23, 58.73],
            //         controls: [-7.6, 0.77, 27.81],
            //         duration: 1500
            //       });
            //     }, 200);
            //   }
            app.scene.add(app.mapModel);
            console.log(1);
        });

        resolve();
    });
}