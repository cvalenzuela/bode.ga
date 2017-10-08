// Load a object and prepare it for the scene

import * as THREE from 'three';
import { models } from './models';
import * as utils from './utils/utils';

let currentMesh = null,
  previousMesh = null,
  currentMeshOriginalPosition = [];


// Add a Geometry
let addObject = (scene, model) => {
  previousMesh = currentMesh;
  let loader = new THREE.JSONLoader().load('./models/' + model.name + '/' + model.name + '.js', geometry =>  {
    let material = new THREE.MeshBasicMaterial();
    currentMesh = new THREE.Mesh(geometry, material);
    material.map = new THREE.TextureLoader().load('./models/' + model.name + '/' + model.name + '.jpg');
    scene.remove(previousMesh);
    scene.add(currentMesh);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (xhr) => {
    console.log('An error happened');
  });
};

// Add Buffer Geometry
let addBufferGeometry = (scene, model) => {
  previousMesh = currentMesh;
  currentMeshOriginalPosition = [];
  let loader = new THREE.BufferGeometryLoader().load('./models/' + model.name + '/' + model.name + '.json', geometry => {
      let material = new THREE.MeshBasicMaterial();
      currentMesh = new THREE.Mesh(geometry, material);
      currentMeshOriginalPosition = Float32Array.from(currentMesh.geometry.attributes.position.array);
      let randomPosition = utils.shuffleArray(Float32Array.from(currentMesh.geometry.attributes.position.array));
      material.map = new THREE.TextureLoader().load('./models/' + model.name + '/' + model.name + '.jpg');
      currentMesh.geometry.attributes.position.dynamic = true;
      for (let i = 0; i < currentMesh.geometry.attributes.position.array.length; i++) {
        currentMesh.geometry.attributes.position.array[i] = randomPosition[i];
      }
      scene.add(currentMesh);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (xhr) => {
      console.log('An error happened');
    }
  );
};

// Remove current object
let removeObject = scene => {
  scene.remove(currentMesh);
}

// Remove all Objects
let removeAllObjects = scene => {
  scene.remove(currentMesh);
  currentMesh = null;
  previousMesh = null;
}

export { addObject, addBufferGeometry, removeObject, removeAllObjects, currentMesh, currentMeshOriginalPosition }