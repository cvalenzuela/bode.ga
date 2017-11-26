// ========
// Load and remove a mesh at a specific time using setTimeout.
// ========

import { addMesh, removeMesh } from './meshManager';

const loadModels = (scene, models) => {
  models.forEach((model, index) => {
    const id = Date.now() + Math.random();
    setTimeout(() => {
      addMesh(scene, model, id);
    }, model.start * 1000);
    setTimeout(() => {
      removeMesh(scene, model, id);
    }, model.end * 1000);
  });
};

export { loadModels };