// Load a object and prepare it for the scene

import * as THREE from 'three';
import * as utils from './utils/utils';

let currentMeshOriginalPosition = [];
let currentMeshes = {queens: {}, parkSlope: {}};

// Add a Geometry
let addObject = (scenes, model, id, bodega) => {
  let loader = new THREE.JSONLoader().load('dist/models/' + model.name + '/' + model.name + '.js', geometry =>  {
      let material = new THREE.MeshBasicMaterial();
      let mesh = new THREE.Mesh(geometry, material);
      material.map = new THREE.TextureLoader().load('dist/models/' + model.name + '/' + model.name + '.jpg');
      currentMeshes[bodega][id] = mesh;
      scenes[bodega].add(mesh);
    },
    xhr => {
      console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    },
    err => {
      console.log(`An error happened ${err}`);
    });
};

// Add Buffer Geometry: haven't tried this with the array of meshes.
let addBufferGeometry = (scenes, model) => {
  currentMeshOriginalPosition = [];
  let loader = new THREE.BufferGeometryLoader().load('./models/' + model.name + '/' + model.name + '.json', geometry => {
      let material = new THREE.MeshBasicMaterial();
      let mesh = new THREE.Mesh(geometry, material);
      currentMeshOriginalPosition = Float32Array.from(mesh.geometry.attributes.position.array);
      let randomPosition = utils.shuffleArray(Float32Array.from(mesh.geometry.attributes.position.array));
      material.map = new THREE.TextureLoader().load('./models/' + model.name + '/' + model.name + '.jpg');
      mesh.geometry.attributes.position.dynamic = true;
      for (let i = 0; i < mesh.geometry.attributes.position.array.length; i++) {
        mesh.geometry.attributes.position.array[i] = randomPosition[i];
      }
      currentMeshes[bodega][id] = mesh;
      scenes[bodega].add(mesh);
    },
    xhr => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    err => {
      console.log(`An error happened ${err}`);
    }
  );
};

// Remove current object
let removeObject = (scenes, model, id, bodega) => {
  scenes[bodega].remove(currentMeshes[bodega][id]);
  delete currentMeshes[bodega][id];
}

export { addObject, addBufferGeometry, removeObject, currentMeshes, currentMeshOriginalPosition }