/* 
Bodegas Doc
*/

import * as animationManager from './animationManager';
import { startSound, queens, parkSlope } from './sounds';
import { startSubtitles } from './loadSubtitles';
import { startTimelineOfObjects } from './modelsToLoad';

let debugMode = false;
let currentScene = 'queens';

window.onload = () => {
  let body = document.getElementById('body');
  let overlay = document.getElementById('overlay');
  let watchBtn = document.getElementById('watchBtn');
  let creditsBtn = document.getElementById('creditsBtn');
  let cover = document.getElementById('cover');
  let loader = document.getElementById('loader');
  let switchToQueens = document.getElementById('switchToQueens');
  let switchToParkSlope = document.getElementById('switchToParkSlope');
  let currentBodega = document.getElementById('currentBodega');
  let queensSubtitles = document.getElementById('queens');
  let parkSlopeSubtitles = document.getElementById('parkSlope');

  // Start the Film
  watchBtn.addEventListener('click', () => {
    body.style.background = '#000000';
    cover.style.display = 'none';
    overlay.style.display = 'none';
    loader.style.display = 'block';
    animationManager.init(startSound, startSubtitles, startTimelineOfObjects);
  });

  // Switch to queens
  switchToQueens.addEventListener('click', () => {
    queensSubtitles.style.display = 'block';
    parkSlopeSubtitles.style.display = 'none';
    switchToQueens.style.opacity = 1;
    switchToParkSlope.style.opacity = 0.5;
    queens.setVolume(1);
    parkSlope.setVolume(0);
    currentBodega.innerText = 'Bodega in Long Island City, Queens';
    currentScene = 'queens';
  });

  // Switch to parkSlope
  switchToParkSlope.addEventListener('click', () => {
    queensSubtitles.style.display = 'none';
    parkSlopeSubtitles.style.display = 'block';
    switchToQueens.style.opacity = 0.5;
    switchToParkSlope.style.opacity = 1;
    queens.setVolume(0);
    parkSlope.setVolume(1);
    currentBodega.innerText = 'Bodega in South Park Slope, Brooklyn';
    currentScene = 'parkSlope'
  });

  // Debug mode
  if (debugMode) {
    body.style.background = '#000000';
    cover.style.display = 'none';
    overlay.style.display = 'none';
    loader.style.display = 'block';
    animationManager.init(startSound, startSubtitles, startTimelineOfObjects, debugMode);
  };
};

export { debugMode, currentScene };