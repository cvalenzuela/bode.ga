// Sounds

import * as THREE from 'three';

let queensSrc = 'dist/sounds/queens.mp3';
let parkSlopeSrc = 'dist/sounds/parkSlope.mp3';
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
    soundsLoaded++;
    startPlaying()
  }, onProgress, onError);

  // Load parkSlope
  loader.load(parkSlopeSrc, audioBuffer => {
    loading.style.display = 'none';
    app.style.display = 'block';
    parkSlope.setBuffer(audioBuffer);
    soundsLoaded++;
    startPlaying()
  }, onProgress, onError);

  // When both sounds are ready, start!
  let startPlaying = () =>  {
    if (soundsLoaded > 1) {
      parkSlope.setVolume(0);
      parkSlope.play();
      queens.play();
      startSubtitles && startSubtitles();
      startTimelineOfObjects && startTimelineOfObjects(scenes);
      soundsLoaded = 0;
    }

    if (queens.source) {
      queens.source.onended = () => {
        queens.setBuffer(audioBuffer);
        soundsLoaded++;
        startPlaying();
      };
    }

    if (parkSlope.source) {
      parkSlope.source.onended = () => {
        parkSlope.setBuffer(audioBuffer);
        soundsLoaded++;
        startPlaying();
      };
    }

  };

};

export { startSound, queens, parkSlope };