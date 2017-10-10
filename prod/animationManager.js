/* 
Animation Manager
*/

import * as THREE from 'three';
import * as utils from './utils/utils';
import { getCurrentTime } from './timeManager';
import { currentMesh, currentMeshes, currentMeshOriginalPosition } from './loadObject';
import { currentScene } from './index';

let currentTime = document.getElementById('current_time');
let container, camera, renderer;
let scenes = { queens: null, parkSlope: null };

// init
let init = (startSound, startSubtitles, startTimelineOfObjects) => {
  // Append to DOM
  container = document.createElement('div');
  document.body.appendChild(container);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = -0.3;

  // Scenes
  for (let scene in scenes) {
    scenes[scene] = new THREE.Scene();
    let ambient = new THREE.AmbientLight(0x444444);
    scenes[scene].add(ambient);
    let directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    scenes[scene].add(directionalLight);
  }

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Event Listeners
  window.addEventListener('resize', e => { utils.onWindowResize(e, renderer, camera) }, false);

  // Start the sound that will trigger the animations and the subtitles
  startSound && startSound(camera, scenes, startSubtitles, startTimelineOfObjects);
  animate();
}

// Render
let render = currentScene => {
  camera.lookAt(scenes[currentScene].position);
  renderer.render(scenes[currentScene], camera);
}

// Animate Loop
let animate = () => {
  let current = 1;
  let total = Object.keys(currentMeshes[currentScene]).length;
  for (let id in currentMeshes[currentScene]) {
    currentMeshes[currentScene][id].rotation.y += 0.005;
    if (total == 2) {
      if (current == 1) {
        currentMeshes[currentScene][id].position.x = +0.1;
      } else if (current == 2) {
        currentMeshes[currentScene][id].position.x = -0.1;
      }
    } else if (total == 3) {
      if (current == 1) {
        currentMeshes[currentScene][id].position.x = +0.2;
      } else if (current == 2) {
        currentMeshes[currentScene][id].position.x = 0;
      } else if (current == 3) {
        currentMeshes[currentScene][id].position.x = -0.2;
      }
    } else {
      currentMeshes[currentScene][id].position.x = 0;
    }
    current++;
  }

  getCurrentTime(currentTime);
  render(currentScene);
  window.requestAnimationFrame(animate);
}

// Untested and not in use
let animateBuffer = () => {
  currentMesh.geometry.attributes.position.needsUpdate = true;
  for (let i = 0; i < currentMesh.geometry.attributes.position.array.length; i++) {
    currentMesh.geometry.attributes.position.array[i] = THREE.Math.lerp(currentMesh.geometry.attributes.position.array[i], currentMeshOriginalPosition[i], 0.005);
  }
}


export { animate, init, scenes }