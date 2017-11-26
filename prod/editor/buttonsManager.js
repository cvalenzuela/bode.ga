// ========
// Editor Buttons Manager
// ========

import { audio, playAudio } from './audioManager';
import { saveSubtitlesToFile, removeSubtitle, loadSubtitlesFromFile } from './../subtitlesManager';
import { renderSubtitlesKeys, removeSubtitles } from './subtitleKeysManager';
import { addSub, removeSub } from './subtitlesMiddleManager';


const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const saveBtn = document.getElementById('save');
const loadSubtitlesFileBtn = document.getElementById('loadSubtitlesFile');
const loadModelsFileBtn = document.getElementById('loadModelsFile');
const addSubtitleBtn = document.getElementById('addSubtitle');
const removeSubtitleBtn = document.getElementById('removeSubtitle');
const addModelBtn = document.getElementById('addModel');
const removeModelBtn = document.getElementById('removeModel');

// Play Button
playBtn.addEventListener('click', () =>  {
  playAudio()
});

// Stop Button
stopBtn.addEventListener('click', () =>  {
  audio.stop();
  playBtn.innerText = 'Play';
});

// Save Button
saveBtn.addEventListener('click', () => {
  saveSubtitlesToFile();
  // saveModelsToFile();
});

// Load Subtitles Button
loadSubtitlesFileBtn.addEventListener('click', () => {
  removeSubtitles(loadSubtitlesFromFile, renderSubtitlesKeys)
})

// Load Models Button
loadModelsFileBtn.addEventListener('click', () => {
  // removeModels(loadModelsFromFile, renderModelsKeys)
})

// Add a Subtitle
addSubtitleBtn.addEventListener('click', () => {
  addSub();
});

// Remove a Subtitle 
removeSubtitleBtn.addEventListener('click', () => {
  removeSub();
});

export {
  playBtn,
  stopBtn,
  saveBtn,
  addSubtitleBtn
}