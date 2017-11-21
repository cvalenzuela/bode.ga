// ========
// Load an object and prepare it for the scene
// ========

import * as THREE from 'three';
import * as utils from './utils/utils';

const currentMeshes = {};

// Add a Mesh
const addMesh = (scene, model, id) => {
  let loader = new THREE.JSONLoader().load('dist/models/' + model.name + '/' + model.name + '.js', geometry =>  {
      let material = new THREE.MeshBasicMaterial();
      let mesh = new THREE.Mesh(geometry, material);
      material.map = new THREE.TextureLoader().load('dist/models/' + model.name + '/' + model.name + '.jpg');
      currentMeshes[id] = mesh;
      scene.add(mesh);
    },
    xhr => {
      console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    },
    err => {
      console.log(`An error happened ${err}`);
    });
};

// Remove a Mesh
const removeMesh = (scene, model, id) => {
  scene.remove(currentMeshes[id]);
  delete currentMeshes[id];
}

export { addMesh, removeMesh, currentMeshes }