// Sounds

import * as THREE from 'three';

let queensSrc = './sounds/queens.mp3';
let parkSlopeSrc = './sounds/parkSlope.mp3';
let app = document.getElementById('app');
let loading = document.getElementById('loader');
let soundsLoaded = 0;

let audioListener = new THREE.AudioListener();
let queens = new THREE.Audio(audioListener);
let parkSlope = new THREE.Audio(audioListener);

let startSound = (camera, scenes, startSubtitles, startTimelineOfObjects) =>  {

  camera.add(audioListener);

  let loader = new THREE.AudioLoader();

  let onProgress = xhr => {
    console.log(`Loading sound: ${xhr.loaded / xhr.total * 100} % loaded`);
  };
  let onError = err => {
    console.log(`An error happened ${err}`);
  }
  // Load queens
  loader.load(queensSrc, audioBuffer => {
    loading.style.display = 'none';
    app.style.display = 'block';
    queens.setBuffer(audioBuffer);
    queens.play();
    soundsLoaded++;
    startPlaying()
  }, onProgress, onError);

  // Load parkSlope
  loader.load(parkSlopeSrc, audioBuffer => {
    loading.style.display = 'none';
    app.style.display = 'block';
    parkSlope.setBuffer(audioBuffer);
    parkSlope.setVolume(0);
    parkSlope.play();
    soundsLoaded++;
    startPlaying()
  }, onProgress, onError);

  // When both sounds are ready, start!
  let startPlaying = () =>  {
    if (soundsLoaded > 1) {
      startSubtitles && startSubtitles();
      startTimelineOfObjects && startTimelineOfObjects(scenes);
    }
  };

};

export { startSound, queens, parkSlope };