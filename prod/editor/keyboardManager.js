// ========
// Editor Keyboard Manager
// ========

import { audio, playAudio } from './audioManager';
import { updateSubtitles } from './../subtitlesManager';
import { updateModels } from './../modelManager';
import { redrawSubtitle, addSub, removeSub } from './subtitlesMiddleManager';
import { redrawModel, addM, removeM } from './modelsMiddleManager';
import { isASubtitleKeySelected, clearSubtitleKeys, currentSubtitleSelected, showHideSubtitleTooltips } from './subtitleKeysManager';
import { isAModelKeySelected, clearModelKeys, currentModelSelected, showHideModelsTooltips } from './modelKeysManager';

const subtitleTimeTooltip = document.getElementById('subtitleTimeTooltip');
const subtitleTooltip = document.getElementById('subtitleTooltip');
const modelTimeTooltip = document.getElementById('modelTimeTooltip');
const modelTooltip = document.getElementById('modelTooltip');

let keys = [];

// Manage Keyboard
document.body.onkeydown = e => {
  let isShiftPressed = keys.indexOf(16) != -1;
  // Spacebar
  if (e.keyCode == 32) {
    if (!isASubtitleKeySelected && !isAModelKeySelected) {
      playAudio();
    }
  }
  // Enter
  if (e.keyCode == 13) {
    if (!isShiftPressed) {
      e.preventDefault();
      if (isASubtitleKeySelected) {
        const time = subtitleTimeTooltip.innerText.split('-');
        const txt = subtitleTooltip.innerText.split(/\n/);
        const data = {
          id: currentSubtitleSelected,
          start: time[0],
          end: time[1],
          first: txt[0],
          second: txt[1]
        }
        updateSubtitles(data);
        redrawSubtitle(true);
      } else if (isAModelKeySelected) {
        const time = modelTimeTooltip.innerText.split('-');
        const name = modelTooltip.innerText;
        const data = {
          id: currentModelSelected,
          start: time[0],
          end: time[1],
          name: name
        }
        updateModels(data);
        redrawModel(true);
      }
    }
  }
  // Esc
  if (e.keyCode == 27) {
    clearSubtitleKeys()
    clearModelKeys();
    showHideSubtitleTooltips('none');
    showHideModelsTooltips('none');
  }
  // Shift
  if (e.keyCode == 16) {
    keys.push(e.keyCode);
  }
  // S: add a subtitle
  if (e.keyCode == 83) {
    if (isShiftPressed) {
      addSub();
    }
  }
  // D: delete a subtitle 
  if (e.keyCode == 68) {
    if (isShiftPressed) {
      removeSub();
    }
  }
  // M: add a model 
  if (e.keyCode == 77) {
    if (isShiftPressed) {
      addM();
    }
  }
  // R: remove a model 
  if (e.keyCode == 82) {
    if (isShiftPressed) {
      removeM();
    }
  }
  // Right: skip forward one second
  if (e.keyCode == 39) {
    if(!isAModelKeySelected && !isASubtitleKeySelected){
      audio.skipForward()
    }
  }
  // Left: skip backward one second
  if (e.keyCode == 37) {
    if(!isAModelKeySelected && !isASubtitleKeySelected){
      audio.skipBackward()
    }
  }

}

document.body.onkeyup = e => {
  if (e.keyCode == 16) {
    keys = [];
  }
}

// Update a subtitle or model when it has moved in the timeline
window.onmouseup = e => {
  if (isASubtitleKeySelected) {
    redrawSubtitle(false);
  }
  if (isAModelKeySelected) {
    redrawModel(false);
  }
}