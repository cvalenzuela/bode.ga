// ========
// Editor Buttons Manager
// ========

import { audio, playAudio } from './audioManager';
import { saveSubtitlesToFile, loadSubtitlesFromFile } from './../subtitlesManager';
import { renderSubtitlesKeys, removeSubtitles } from './subtitleKeysManager';
import { addSub, removeSub } from './subtitlesMiddleManager';

import { saveModelsToFile, loadModelsFromFile } from './../modelManager';
import { renderModelsKeys, removeModels } from './modelKeysManager';
import { addM, removeM } from './modelsMiddleManager';

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
  saveModelsToFile();
});

// Load Subtitles Button
loadSubtitlesFileBtn.addEventListener('click', () => {
  loadSubtitlesFromFile(removeSubtitles, renderSubtitlesKeys)
})

// Load Models Button
loadModelsFileBtn.addEventListener('click', () => {
  loadModelsFromFile(removeModels, renderModelsKeys);
})

// Add a Subtitle
addSubtitleBtn.addEventListener('click', () => {
  addSub();
});

// Remove a Subtitle 
removeSubtitleBtn.addEventListener('click', () => {
  removeSub();
});

// Add a Model
addModelBtn.addEventListener('click', () => {
  addM();
});

// Remove a Model 
removeModelBtn.addEventListener('click', () => {
  removeM();
});

export {
  playBtn,
  stopBtn,
  saveBtn,
  addSubtitleBtn
}