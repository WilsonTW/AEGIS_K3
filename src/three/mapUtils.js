import * as THREE from 'three';
//geolib
import { getDistance, getRhumbLineBearing} from 'geolib';

export function createPolygon(center, data, height){
    let shape, geometry;
    // 建築物的孔
    let holes = [];
    for (let i = 0; i < data.length; i++) {
        let el = data[i];

        if (i == 0) {
            shape = genShape(el, center);
            console.log(shape);
        }else{
            holes.push(genShape(el, center));
        }
    }

    for (let i = 0; i < holes.length; i++) {
        shape.holes.push(holes[i]);
    }

    geometry = genGeometry(shape, {
        curveSegments: 1,
        depth: height,
        bevelEnabled: false
    });

    geometry.rotateX(Math.PI / 2);
    geometry.rotateZ(Math.PI);

    return geometry;
}

/**
 * 
 * @param {Object} shape 
 * @param {Object} settings
 * @return {Object} 
 */
export function genGeometry(shape, settings){
    let geometry = new THREE.ExtrudeBufferGeometry(shape, settings);
    geometry.computeBoundingBox();

    return geometry;
}

/**
 * 
 * @param {Array} points 
 * @param {Array} center
 * @return {Object} 
 */
function genShape(points, center){
    let shape = new THREE.Shape();

    for (let i = 0; i < points.length; i++) {
        let elp = points[i];
        elp = GPSRelativePosition(elp, center);

        if(i == 0){
            shape.moveTo(elp[0], elp[1]);
        }else{
            shape.lineTo(elp[0], elp[1]);
        }
    }
    // console.log(shape);
    return shape;
}

/**
 * 
 * @param {Array} objPosi 
 * @param {Array} centerPosi
 * @return {Array} 
 */
function GPSRelativePosition(objPosi, centerPosi){
    let dis = getDistance(objPosi, centerPosi);
    let bearing = getRhumbLineBearing(objPosi, centerPosi);
    let x = centerPosi[0] + dis * Math.cos((bearing * Math.PI) / 180);
    let y = centerPosi[1] + dis * Math.sin((bearing * Math.PI) / 180);

    return [-x / 100,  y / 100];
}