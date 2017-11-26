// ========
// Editor Keyboard Manager
// ========

import { audio, playAudio } from './audioManager';
import { updateSubtitles } from './../subtitlesManager';
import { redrawSubtitle, addSub, removeSub } from './subtitlesMiddleManager';
import { isASubtitleKeySelected, clearSubtitleKeys, currentSubtitleSelected } from './subtitleKeysManager';
isASubtitleKeySelected
const subtitleTimeTooltip = document.getElementById('subtitleTimeTooltip');
const subtitleTooltip = document.getElementById('subtitleTooltip');

let keys = [];

// Manage Keyboard
document.body.onkeydown = e => {
  let isShiftPressed = keys.indexOf(16) != -1;
  // Spacebar
  if (e.keyCode == 32) {
    if (!isASubtitleKeySelected) {
      playAudio();
    }
  }
  // Enter
  if (e.keyCode == 13) {
    if (!isShiftPressed) {
      e.preventDefault();
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
    }
  }
  // Esc
  if (e.keyCode == 27) {
    clearSubtitleKeys()
    subtitleTooltip.innerText = '';
    subtitleTimeTooltip.innerText = '';
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

    }
  }
  // R: remove a model 
  if (e.keyCode == 82) {
    if (isShiftPressed) {

    }
  }
}

document.body.onkeyup = e => {
  if (e.keyCode == 16) {
    keys = [];
  }
}

// Update a subtitle when it has moved in the timeline
window.onmouseup = e => {
  if (isASubtitleKeySelected) {
    redrawSubtitle(false);
  }
}