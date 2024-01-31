import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createPolygon } from '@/three/mapUtils';

export function createBuilding(json, center, material){
    let features = json.features;
    // 建構數據對象
    let geos_building = [];
    for (let i = 0;i < features.length;i++) {
        let fel = features[i];
        if(!fel['properties']) return;

        let info = fel.properties;

        if(info['building']){
            const geometry = createPolygon(center, fel.geometry.coordinates, 1);
            geos_building.push(geometry);
        }
    }

    const mergeGeometry = BufferGeometryUtils.mergeBufferGeometries(geos_building);

    const mesh = new THREE.Mesh(mergeGeometry, material);

    return mesh;
}