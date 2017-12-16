// ========
// Load an object and prepare it for the scene
// ========

import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { HHMMSStoSeconds } from './utils/utils';

let currentModels = {};
let modelsQueue = [];
let scene, models;
const MODELS = [];

// Init the Meshes
const initModels = (_scene, _models) => { 
  scene = _scene;
  models = _models;
 };

// Load all Models(meshes)
const loadModels = currentTime => {
  models.forEach((model, i) => {
    let start = HHMMSStoSeconds(model.start);
    let end = HHMMSStoSeconds(model.end);
    if (start > currentTime) {
      start = start - currentTime;
      end = end - currentTime;
      modelsQueue.push(setTimeout(() => {
        addModel(model);
      }, start * 1000));
      modelsQueue.push(setTimeout(() => {
        removeModel(model);
      }, end * 1000));
    }
  });
};

// Clear the queue of models to render
const clearModelsQueue = () => {
  removeAllModels();
  modelsQueue.forEach(model => {
    clearTimeout(model);
  });
  modelsQueue = [];
  currentModels = {};
}

// Update the values in the models JSON. Can modify an existing or add a new.
const updateModels = input => {
  let updatedExisting = false;
  models.forEach(model => {
    if (model.id == input.id) {
      input.start && (model.start = input.start);
      input.end && (model.end = input.end);
      input.name && (model.name = input.name);
      updatedExisting = true;
    }
  });
  if (!updatedExisting) {
    models.push(input)
  }
}

// Deletes an Existing model
const deleteModel = input => {
  let id;
  models.forEach(model => {
    if (model.start == input) {
      id = model.id;
      models.splice(models.indexOf(model), 1);
    }
  });
  return id;
}

// Add a Model
const addModel = model => {
  let loader = new THREE.JSONLoader().load('dist/models/' + model.name + '/' + model.name + '.js', geometry =>  {
      let material = new THREE.MeshBasicMaterial();
      let mesh = new THREE.Mesh(geometry, material);
      material.map = new THREE.TextureLoader().load('dist/models/' + model.name + '/' + model.name + '.jpg');
      material.transparent = true;
      material.opacity = 0.1;
      new TWEEN.Tween(material).to({opacity: 1}, 15000).easing(TWEEN.Easing.Exponential.Out).start()
      currentModels[model.id] = mesh;
      scene.add(mesh);
    },
    xhr => {
      console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    },
    err => {
      console.log(`An error happened ${err}`);
    });
};

// Remove a Model
const removeModel = model => {
  scene.remove(currentModels[model.id]);
  delete currentModels[model.id];
}

const removeModelKey = start => {
  let id;
  models.forEach(model => {
    if (model.start == start) {
      id = model.id;
      models.splice(models.indexOf(model), 1);
    }
  });
  return id;
}

// Remove all models from the scene 
const removeAllModels = () => {
  for(let i = scene.children.length - 1; i >= 0; i--) {
    let obj = scene.children[i];
    scene.remove(obj);
  }
}

// Save the JSON file
const saveModelsToFile = () => {
  const date = new Date;
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(models)], { type: 'text/plain' });
  a.href = URL.createObjectURL(file);
  a.download = `${date.getTime()}.json`;
  a.click();
}

// Load Models from File
const loadModelsFromFile = (removeCurrentModel, renderNewModels) => {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.click();
  fileSelector.addEventListener('change', () => {
    let file = fileSelector.files[0];
    let reader = new FileReader();
    reader.onload = e => {
      removeCurrentModel();
      models = JSON.parse(reader.result);
      renderNewModels()
    }
    reader.readAsText(file);
  }, false)
}

export {
  saveModelsToFile,
  loadModelsFromFile,
  models,
  initModels,
  loadModels, 
  deleteModel,
  clearModelsQueue,
  updateModels,
  addModel, 
  removeModel, 
  removeModelKey,
  currentModels 
}