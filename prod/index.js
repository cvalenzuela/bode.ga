/* 
Bodegas Doc
*/

import init from './animationManager';

// OPTIONS
import models from './models/queens';
import subtitles from './subtitles/queens';
const audioSrc = 'dist/sounds/queens.mp3';
const debugMode = false;
// OPTIONS

window.onload = () => {
  const body = document.getElementById('body');
  const cover = document.getElementById('cover');
  const overlay = document.getElementById('overlay');
  const watchBtn = document.getElementById('watchBtn');
  const creditsBtn = document.getElementById('creditsBtn'); // Not in use for now
  const loader = document.getElementById('loader');
  const subtitlesElt = document.getElementById('subtitles');

  // Start the Film
  watchBtn.addEventListener('click', () => {
    body.style.background = '#000000';
    cover.style.display = 'none';
    overlay.style.display = 'none';
    loader.style.display = 'block';
    init(debugMode, audioSrc, models, subtitles, subtitlesElt);
  });
};

export { debugMode };