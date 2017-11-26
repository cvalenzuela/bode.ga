// ========
// Editor Main
// ========

import { moveElt } from './move';
import { createAudio } from './audioManager';
import './keyboardManager';

const WIDTH = 1000;

const editor = document.getElementById('editor');
const moveBtn = document.getElementById('move');

// Init the edit mode
const initEditMode = (audioSrc, scene, models) => {
  moveElt(editor, moveBtn, true, true);
  createAudio(audioSrc);
  
};

export { initEditMode, WIDTH }