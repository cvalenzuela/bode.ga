// ========
// Editor Model Keys Manager
// ========

import { WIDTH } from './index';
import { audio } from './audioManager';
import { moveElt } from './move';
import { subtitles } from './../subtitlesManager';
import { mapRange, HHMMSStoSeconds } from './../utils/utils';

const subtitleTimeTooltip = document.getElementById('subtitleTimeTooltip');
const subtitleTooltip = document.getElementById('subtitleTooltip');

let subtitlesKeys;
let currentSubtitleSelected;
let isASubtitleKeySelected = false;

// Create a subtitle Key (the yellow things)
const createSubKey = (data, startPos) => {
  let key = document.createElement('div');
  key.className = 'subtitleKey';
  key.style.left = `${startPos}px`;
  key.draggable = 'true';
  key.dataset.start = data.start;
  key.dataset.end = data.end;
  key.dataset.first = data.first;
  key.dataset.second = data.second;
  key.dataset.left = startPos;
  key.id = data.id;
  
  // Make it movable
  moveElt(key, key, true, false);

  const showSubtitleAndTime = () => {
    !data.second ? subtitleTooltip.innerHTML = data.first : subtitleTooltip.innerHTML = `${data.first}<br>${data.second}`;
    subtitleTimeTooltip.innerHTML = `${data.start}-${data.end}`;
    subtitleTooltip.style.left = `${key.dataset.left}px`;
    subtitleTimeTooltip.style.left = `${key.dataset.left}px`;
  }
  key.addEventListener('mouseover', () => {
    if (!isASubtitleKeySelected) {
      showSubtitleAndTime();
      subtitleTooltip.style.left = `${key.dataset.left}px`;
      subtitleTimeTooltip.style.left = `${key.dataset.left}px`;
    }
  });
  key.addEventListener('mouseleave', () => {
    if (!isASubtitleKeySelected) {
      subtitleTooltip.innerText = '';
      subtitleTimeTooltip.innerText = '';
    }
  });
  key.addEventListener('mousedown', () => {
    isASubtitleKeySelected = true;
    currentSubtitleSelected = data.id;
    showSubtitleAndTime();
  });
  subtitlesKeys.appendChild(key);
}

// Render Subtitles Keys
const renderSubtitlesKeys = () => {
  subtitlesKeys = document.getElementById('subtitlesKeys');
  subtitlesKeys.style.width = `${WIDTH}px`;

  subtitles.forEach(sub => {
    let startPos = mapRange(HHMMSStoSeconds(sub.start), 0, audio.getDuration(), 0, WIDTH);
    createSubKey(sub, startPos);
  });
};

// Remove all Subtitle Keys
const removeSubtitles = callback => {
  subtitles.forEach(sub => {
    let elt = document.getElementById(sub.id);
    elt.remove();
  });
  callback(renderSubtitlesKeys);
}

// Clear selected subtitle key
const clearSubtitleKeys = () => {
  currentSubtitleSelected = '';
  isASubtitleKeySelected = false;
}

export { 
  clearSubtitleKeys,
  currentSubtitleSelected,
  subtitlesKeys,
  isASubtitleKeySelected,
  createSubKey, 
  renderSubtitlesKeys, 
  removeSubtitles 
}
