// ========
// Load an object and prepare it for the scene
// ========

import * as THREE from 'three';
import { HHMMSStoSeconds } from './utils/utils';

const currentMeshes = {};

// Load all Models(meshes)
const loadMeshes = (scene, models) => {
  models.forEach((model, index) => {
    setTimeout(() => {
      addMesh(scene, model);
    }, HHMMSStoSeconds(model.start) * 1000);
    setTimeout(() => {
      removeMesh(scene, model);
    }, HHMMSStoSeconds(model.end) * 1000);
  });
};

// Add a Mesh
const addMesh = (scene, model) => {
  let loader = new THREE.JSONLoader().load('dist/models/' + model.name + '/' + model.name + '.js', geometry =>  {
      let material = new THREE.MeshBasicMaterial();
      let mesh = new THREE.Mesh(geometry, material);
      material.map = new THREE.TextureLoader().load('dist/models/' + model.name + '/' + model.name + '.jpg');
      currentMeshes[model.id] = mesh;
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
const removeMesh = (scene, model) => {
  scene.remove(currentMeshes[model.id]);
  delete currentMeshes[model.id];
}

export { loadMeshes, addMesh, removeMesh, currentMeshes }