// Models and time to load them

let loader = document.getElementById('loader')

import { debugMode } from './index';
import { addObject, addBufferGeometry, removeObject, removeAllObjects } from './loadObject';
import * as queens from './models/queens';
import * as parkSlope from './models/parkSlope';
import { models as debugModels } from './debug/models';

let startTimelineOfObjects = scenes => {
  loader.style.display = 'none';
  let bodegaModels = {};
  if (debugMode) {
    bodegaModels.queens = debugModels;
    bodegaModels.parkSlope = [];
  } else {
    bodegaModels.queens = queens.models;
    bodegaModels.parkSlope = parkSlope.models;
  }

  for (let bodega in bodegaModels) {
    bodegaModels[bodega].forEach((model, index) => {
      let id = Date.now() + Math.random();
      setTimeout(() => {
        model.buffer ? addBufferGeometry(scenes, model) : addObject(scenes, model, id, bodega);
      }, model.startTime * 1000);
      setTimeout(() => {
        removeObject(scenes, model, id, bodega);
      }, model.endTime * 1000);
    });
  }

};

export { startTimelineOfObjects };