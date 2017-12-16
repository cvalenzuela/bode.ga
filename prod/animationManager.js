// ========
// Animation Manager
// ========

import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import * as utils from './utils/utils';
import { initSubtitles, loadSubtitles } from './subtitlesManager';
import { startAudio, audio } from './audioManger';
import { updateClock } from './timeManager';
import { initModels, loadModels, currentModels } from './modelManager';
import { initEditMode } from './editor';
import { updateCurrentAudioTimePosition } from './editor/GUIManager';
import { editMode } from './index';

const app = document.getElementById('app');
const loading = document.getElementById('loader');

let container, camera, renderer, scene;

let init = (audioSrc, models, subtitles, subtitlesElt) => {

  // Append to DOM
  container = document.createElement('div');
  document.body.appendChild(container);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = -0.3;

  // Scene
  scene = new THREE.Scene();
  let ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  let directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1).normalize();
  scene.add(directionalLight);

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.left = '0px';
  renderer.domElement.style.top = '0px';

  // Event Listeners
  window.addEventListener('resize', e => { utils.onWindowResize(e, renderer, camera) }, false);

  // Load and start the sound, once loaded, load the animations and the subtitles.
  initSubtitles(subtitles, subtitlesElt);
  initModels(scene, models);
  if (editMode) {
    initEditMode(audioSrc, scene, models);
    animate();
  } else {
    startAudio(camera, audioSrc, () => {
      loading.style.display = 'none';
      app.style.display = 'block';
      loadSubtitles(0);
      loadModels(0);
      animate();
    });
  }
}

// Render
let render = () => {
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

// Animate Loop
let animate = () => {
  TWEEN.update();
  
  if (audio) {
    if (!audio.isPlaying) {
      audio.play();
      loadSubtitles(0);
      loadModels(0);
    }
  }

  let current = 1;
  let total = Object.keys(currentModels).length;
  // Rotate the objects
  for (let id in currentModels) {
    currentModels[id].rotation.y += 0.005;
    if (total == 2) {
      if (current == 1) {
        currentModels[id].position.x = +0.1;
      } else if (current == 2) {
        currentModels[id].position.x = -0.1;
      }
    } else if (total == 3) {
      if (current == 1) {
        currentModels[id].position.x = +0.2;
      } else if (current == 2) {
        currentModels[id].position.x = 0;
      } else if (current == 3) {
        currentModels[id].position.x = -0.2;
      }
    } else {
      currentModels[id].position.x = 0;
    }
    current++;
  }

  editMode && updateCurrentAudioTimePosition();
  updateClock();
  render();
  window.requestAnimationFrame(animate);
}

export default init;