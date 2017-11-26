// ========
// Add an audio source to the scene
// ========

import * as THREE from 'three';

let audioListener, audio, loader;

let startAudio = (camera, audioSrc, callback) =>  {
  // Create the Audio Listener
  audioListener = new THREE.AudioListener();
  audio = new THREE.Audio(audioListener);
  loader = new THREE.AudioLoader();

  // Add the Audio Listener to the camera
  camera.add(audioListener);

  let onProgress = xhr => {
    console.log(`Loading sound: ${xhr.loaded / xhr.total * 100} % loaded`);
  };
  let onError = err => {
    console.log(`An error happened ${err}`);
  }
  // Load the audio src
  loader.load(audioSrc, audioBuffer => {
    audio.setBuffer(audioBuffer);
    audio.play();
    callback();
  }, onProgress, onError);

};

export { startAudio };