// Models and time to load them

let loader = document.getElementById('loader')

import { addObject, addBufferGeometry, removeObject, removeAllObjects } from './loadObject';
import { models } from './models';

let startTimelineOfObjects = scene => {
  loader.style.display = 'none';
  models.forEach((model, index) => {
    setTimeout(() => {
      model.buffer ? addBufferGeometry(scene, model) : addObject(scene, model);
    }, model.startTime * 1000);
    setTimeout(() => {
      removeObject(scene, model);
    }, model.endTime * 1000);
  });
};

export { startTimelineOfObjects };