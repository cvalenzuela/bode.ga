// ========
// Editor Model Keys Manager
// ========

import { WIDTH } from './index';
import { audio } from './audioManager';
import { moveElt } from './move';
import { models } from './../modelManager';
import { mapRange, HHMMSStoSeconds } from './../utils/utils';

const modelTimeTooltip = document.getElementById('modelTimeTooltip');
const modelTooltip = document.getElementById('modelTooltip');

let modelsKeys;
let currentModelSelected;
let isAModelKeySelected = false;

// Show/Hide tooltips
const showHideModelsTooltips = state => {
  modelTooltip.style.display = state;
  modelTimeTooltip.style.display = state;
}


// Create a model Key (the green things)
const createModelKey = (data, startPos) => {
  let key = document.createElement('div');
  key.className = 'modelKey';
  key.style.left = `${startPos}px`;
  key.draggable = 'true';
  key.dataset.start = data.start;
  key.dataset.end = data.end;
  key.dataset.name = data.name;
  key.dataset.left = startPos;
  key.id = data.id;
  
  // Make it movable
  moveElt(key, key, true, false);

  const showModelAndTime = () => {
    modelTooltip.innerHTML = data.name;
    modelTimeTooltip.innerHTML = `${data.start}-${data.end}`;
    modelTooltip.style.left = `${key.dataset.left}px`;
    modelTimeTooltip.style.left = `${key.dataset.left}px`;
  }
  key.addEventListener('mouseover', () => {
    if (!isAModelKeySelected) {
      showModelAndTime();
      showHideModelsTooltips('inline-block');
      modelTooltip.style.left = `${key.dataset.left}px`;
      modelTimeTooltip.style.left = `${key.dataset.left}px`;
    }
  });
  key.addEventListener('mouseleave', () => {
    if (!isAModelKeySelected) {
      showHideModelsTooltips('none');
    }
  });
  key.addEventListener('mousedown', () => {
    showHideModelsTooltips('inline-block');
    isAModelKeySelected = true;
    currentModelSelected = data.id;
    showModelAndTime();
  });
  modelsKeys.appendChild(key);
}

// Render Subtitles Keys
const renderModelsKeys = () => {
  modelsKeys = document.getElementById('modelsKeys');
  modelsKeys.style.width = `${WIDTH}px`;

  models.forEach(model => {
    let startPos = mapRange(HHMMSStoSeconds(model.start), 0, audio.getDuration(), 0, WIDTH);
    createModelKey(model, startPos);
  });
};

// Remove all Models Keys
const removeModels = callback => {
  models.forEach(model => {
    let elt = document.getElementById(model.id);
    elt.remove();
  });
}

// Clear selected models key
const clearModelKeys = () => {
  currentModelSelected = '';
  isAModelKeySelected = false;
}

export { 
  showHideModelsTooltips,
  clearModelKeys,
  currentModelSelected,
  modelsKeys,
  isAModelKeySelected,
  createModelKey, 
  renderModelsKeys, 
  removeModels 
}
