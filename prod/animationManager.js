/* 
Animation Manager
*/

import * as THREE from 'three';
import * as utils from './utils/utils';
import { getCurrentTime } from './timeManager';
import { currentMesh, currentMeshOriginalPosition } from './loadObject';

let currentTime = document.getElementById('current_time');
let container, camera, scene, renderer;

// init
let init = (startSound, startSubtitles, startTimelineOfObjects) => {
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

  // Event Listeners
  window.addEventListener('resize', e => { utils.onWindowResize(e, renderer, camera) }, false);

  // Start the sound that will trigger the animations and the subtitles
  startSound && startSound(camera, scene, startSubtitles, startTimelineOfObjects); 
  animate();
}

// Render
let render = () => {
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

// Animate Loop
let animate = () => {
  if (currentMesh) {
    if(currentMesh.geometry.attributes){
      currentMesh.geometry.attributes.position.needsUpdate = true;
      for (let i = 0; i < currentMesh.geometry.attributes.position.array.length; i++) {
        currentMesh.geometry.attributes.position.array[i] = THREE.Math.lerp(currentMesh.geometry.attributes.position.array[i], currentMeshOriginalPosition[i], 0.005);
      }
    }
    currentMesh.rotation.y += 0.005;
  }
  getCurrentTime(currentTime);
  render();
  window.requestAnimationFrame(animate);
}

export { animate, init, scene }