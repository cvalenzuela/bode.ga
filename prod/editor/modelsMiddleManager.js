// ========
// Editor Models Middle Manager. Not to confuse with the global model Manager.
// ========

import { WIDTH } from './index';
import { audio } from './audioManager';
import { secondstoHHMMSS, UUIID, mapRange, HHMMSStoSeconds } from './../utils/utils';
import { createModelKey, currentModelSelected } from './modelKeysManager';
import { updateModels, removeModelKey } from './../modelManager';

const modelTimeTooltip = document.getElementById('modelTimeTooltip');
const modelTooltip = document.getElementById('modelTooltip');

// Add a Model
const addM = () =>  {
  const data = {
    id: UUIID(),
    start: secondstoHHMMSS(audio.getCurrentTime()),
    end: secondstoHHMMSS(audio.getCurrentTime() + 2),
    name: 'banana',
  };
  let startPos = mapRange(audio.getCurrentTime(), 0, audio.getDuration(), 0, WIDTH);
  createModelKey(data, startPos);
  updateModels(data);
}

// Remove a model 
const removeM = () => {
  const currentPos = secondstoHHMMSS(audio.getCurrentTime());
  let id = removeModelKey(currentPos);
  let elt = document.getElementById(id);
  elt && elt.remove();
}

// Redraw a model key
const redrawModel = manualEdit => {
  let key = document.getElementById(currentModelSelected);

  let offset, name, left, start, end;
  if (manualEdit) {
    let time = modelTimeTooltip.innerText.split('-');
    name = modelTooltip.innerText;
    start = time[0];
    end = time[1];
    offset = HHMMSStoSeconds(time[0]);
    left = mapRange(offset, 0, audio.getDuration(), 0, WIDTH);
  } else {
    name = key.dataset.name;
    offset = parseFloat(key.style.left.split('px')[0]).toFixed(100);
    left = offset;
    let newStart = mapRange(offset, 0, WIDTH, 0, audio.getDuration());
    let newEnd = newStart + (HHMMSStoSeconds(key.dataset.end) - HHMMSStoSeconds(key.dataset.start));
    start = secondstoHHMMSS(newStart);
    end = secondstoHHMMSS(newEnd);
  }

  // Update the Key
  key.style.left = `${left}px`;
  key.dataset.left = left;
  key.dataset.name = name;
  key.dataset.start = start;
  key.dataset.end = end;

  // Move the tooltip
  modelTooltip.style.left = `${left}px`;
  modelTimeTooltip.style.left = `${left}px`;
  modelTimeTooltip.innerHTML = `${start}-${end}`;

  if(!manualEdit){
    const data = {
      id: key.id,
      start,
      end,
      name
    }
    updateModels(data);
  }
}

export {
  addM,
  removeM,
  redrawModel
}