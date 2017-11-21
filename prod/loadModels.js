// ========
// Load and remove a mesh at a specific time using setTimeout.
// ========

import { addMesh, removeMesh } from './meshManager';
import { models as debugModels } from './debug/models';

const loadModels = (debugMode, scene, models) => {
  let modelsToLoad = models;
  debugMode && (modelsToLoad = debugModels);

  modelsToLoad.forEach((model, index) => {
    const id = Date.now() + Math.random();
    setTimeout(() => {
      addMesh(scene, model, id);
    }, model.startTime * 1000);
    setTimeout(() => {
      removeMesh(scene, model, id);
    }, model.endTime * 1000);
  });

};

export { loadModels };