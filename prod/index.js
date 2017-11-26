// ========
// BODEGA MAIN
// ========

import init from './animationManager';

// OPTIONS
import models from './models/queens';
import subtitles from './subtitles/1511661098592';
const audioSrc = 'dist/sounds/queens.mp3';
const editMode = false;
// OPTIONS

// Edit Mode
import './editor/index';
// Edit Mode

window.onload = () => {
  const body = document.getElementById('body');
  const cover = document.getElementById('cover');
  const overlay = document.getElementById('overlay');
  const watchBtn = document.getElementById('watchBtn');
  const creditsBtn = document.getElementById('creditsBtn'); // Not in use for now
  const loader = document.getElementById('loader');
  const subtitlesElt = document.getElementById('subtitles');
  const editor = document.getElementById('editor');

  // Start the Film
  const start = () => {
    body.style.background = '#000000';
    cover.style.display = 'none';
    overlay.style.display = 'none';
    loader.style.display = 'block';
    init(audioSrc, models, subtitles, subtitlesElt);
  }

  // Begin on click or in debug mode
  if (editMode) {
    start();
  } else {
    editor.style.display = 'none';
    watchBtn.addEventListener('click', start);
  }
};

export { editMode }