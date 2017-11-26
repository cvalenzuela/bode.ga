/*
Set of utils for Three.js
Cristobal Valenzuela
*/

import * as THREE from 'three';

// ----
// Change zoom based on mouse Scroll
// ----
let focalLength = 25.734;
const onScroll = (scroll, camera) => {
  scroll.deltaY > 0 ? focalLength += 4 : focalLength -= 4;
  camera.setFocalLength(focalLength);
}

// ----
// Move Object based on mouse movement
// ----
let mousePosition = { x: 0, y: 0 };
let previousMousePosition = { x: 0, y: 0 };
const onDocumentMouseMove = (mouse, object, isDragging) => {
  let deltaMove = {
    x: mouse.offsetX - previousMousePosition.x,
    y: mouse.offsetY - previousMousePosition.y
  };

  if (isDragging) {
    let deltaRotationQuaternion = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(
        toRadians(deltaMove.y * 1),
        toRadians(deltaMove.x * 1),
        0,
        'XYZ'
      ));
    object.quaternion.multiplyQuaternions(deltaRotationQuaternion, object.quaternion);
  }

  previousMousePosition = {
    x: mouse.offsetX,
    y: mouse.offsetY
  };
}

// ----
// Recenter when window is resized
// ----
const onWindowResize = (e, renderer, camera) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// ----
// Angles to Radians
// ----
const toRadians = angle => {
  return angle * (Math.PI / 180);
}

// ----
// Radians to Degrees
// ----
const toDegrees = angle => {
  return angle * (180 / Math.PI);
}

// ----
// Shuffle an array
// ----
const shuffleArray = (arr) => arr.sort(() => (Math.random() - 0.5));

// ----
// Map a value between a range
// ----
const mapRange = (value, low1, high1, low2, high2) => {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// ----
// Transform an int of seconds into HH:MM:SS
// ----
const secondstoHHMMSS = input => {
  let sec_num = parseInt(input);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}

// ----
// Transform HH:MM:SS into an int of seconds
// ----
const HHMMSStoSeconds = input => {
  let a = input.split(':');
  return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
}

// ----
// Create a UUIID
// ----
const UUIID = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}



module.exports = {
  onScroll,
  onDocumentMouseMove,
  onWindowResize,
  toRadians,
  toDegrees,
  shuffleArray,
  mapRange,
  secondstoHHMMSS,
  HHMMSStoSeconds,
  UUIID
}