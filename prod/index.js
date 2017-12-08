// ========
// BODEGA MAIN
// ========

import init from './animationManager';

// OPTIONS
import models from './models/jenny';
import subtitles from './subtitles/final';
const audioSrc = 'dist/sounds/licdeli.mp3';
const editMode = false;
// OPTIONS

// Edit Mode
import './editor/index';
// Edit Mode

window.onload = () => {
  const body = document.getElementById('body');
  const intro = document.getElementById('intro');
  const credits = document.getElementById('credits');
  const cover = document.getElementById('cover');
  const overlay = document.getElementById('overlay');
  const watchBtn = document.getElementById('watchBtn');
  const fromCreditsHomeBtn = document.getElementById('fromCreditsHomeBtn');
  const backHomeBtn = document.getElementById('backHomeBtn');
  const creditsBtn = document.getElementById('creditsBtn');
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

  // Pause the film
  const pause = () => {
    body.style.background = '#000000';
    cover.style.display = 'none';
    overlay.style.display = 'none';
    loader.style.display = 'block';
  }
  
  // Begin on click or in debug mode
  if (editMode) {
    start();
  } else {
    editor.style.display = 'none';
    watchBtn.addEventListener('click', start);
  }

  // Listen for the Credits buttons and show them
  creditsBtn.addEventListener('click', () => {
    overlay.style.backgroundImage = 'url(/dist/images/credits.jpg)';
    intro.style.opacity = '0';
    credits.style.opacity = '1';
  });
  fromCreditsHomeBtn.addEventListener('click', () => {
    overlay.style.backgroundImage = 'url(/dist/images/background.png)';
    intro.style.opacity = '1';
    credits.style.opacity = '0';
  });

  // Show home screen on main app
  backHomeBtn.addEventListener('click', () => {
    console.log('here');
  });
};

export { editMode }