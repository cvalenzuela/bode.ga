// ========
// Editor GUI Manager
// ========

import { WIDTH } from './index';
import { mapRange, secondstoHHMMSS } from './../utils/utils';
import { audio } from './audioManager';

// DOM Elements
const currentTime = document.getElementById('currentTime');
const modelsKeys = document.getElementById('modelsKeys');
modelsKeys.style.width = `${WIDTH}px`;

// Update the position of the div showing the audio time
const updateCurrentAudioTimePosition = () => {
  const pos = mapRange(audio.getCurrentTime(), 0, audio.getDuration(), 0, WIDTH);
  currentTime.innerText = secondstoHHMMSS(audio.getCurrentTime());
  currentTime.style.left = `${pos}px`;
}

export {
  modelsKeys,
  updateCurrentAudioTimePosition
}