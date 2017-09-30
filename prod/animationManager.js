/* 
Animation Manager
*/

import { getCurrentTime } from './timeManager';
import * as THREE from 'three';

let currentTime = document.getElementById('current_time');
let container, camera, scene, renderer, cube;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;


let render = () => {
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

let animate = () => {
  getCurrentTime(currentTime);
  cube.rotation.y += 0.01
  render()
  window.requestAnimationFrame(animate);
}

let init = () => {

  // Append to DOM
  container = document.createElement('div');
  document.body.appendChild(container);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = -15;

  // Scene
  scene = new THREE.Scene();
  let ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  let directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1).normalize();
  scene.add(directionalLight);


  var geometry = new THREE.CubeGeometry(10, 10, 10);
  var material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('red'),
    side: THREE.DoubleSide,
    wireframe: true
  });

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Render
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  animate();
}

export { animate, init }