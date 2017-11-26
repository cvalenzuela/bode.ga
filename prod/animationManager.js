// ========
// Animation Manager
// ========

import * as THREE from 'three';
import * as utils from './utils/utils';
import { initSubtitles, loadSubtitles } from './subtitlesManager';
import { startAudio } from './audioManger';
import { updateClock } from './timeManager';
import { loadMeshes, currentMeshes } from './meshManager';
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
  if (editMode) {
    initEditMode(audioSrc, scene, models);
    animate();
  } else {
    startAudio(camera, audioSrc, () => {
      loading.style.display = 'none';
      app.style.display = 'block';
      loadSubtitles(0);
      loadMeshes(scene, models);
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
  let current = 1;
  let total = Object.keys(currentMeshes).length;
  // Rotate the objects
  for (let id in currentMeshes) {
    currentMeshes[id].rotation.y += 0.005;
    if (total == 2) {
      if (current == 1) {
        currentMeshes[id].position.x = +0.1;
      } else if (current == 2) {
        currentMeshes[id].position.x = -0.1;
      }
    } else if (total == 3) {
      if (current == 1) {
        currentMeshes[id].position.x = +0.2;
      } else if (current == 2) {
        currentMeshes[id].position.x = 0;
      } else if (current == 3) {
        currentMeshes[id].position.x = -0.2;
      }
    } else {
      currentMeshes[id].position.x = 0;
    }
    current++;
  }

  editMode && updateCurrentAudioTimePosition();
  updateClock();
  render();
  window.requestAnimationFrame(animate);
}

export default init;