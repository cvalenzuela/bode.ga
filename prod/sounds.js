// Sounds

import * as THREE from 'three';

let audioSrc = './sounds/bodega_01.mp3';
let app = document.getElementById('app');
let loading = document.getElementById('loader');

let startSound = (camera, scene, startSubtitles, startTimelineOfObjects) =>  {
  let audioListener = new THREE.AudioListener();
  camera.add(audioListener);
  let ambientSound = new THREE.Audio(audioListener);
  scene.add(ambientSound);

  let loader = new THREE.AudioLoader();

  loader.load(audioSrc, (audioBuffer) => {
      loading.style.display = 'none';
      app.style.display = 'block';
      // app.classList.add("animated","fadeIn");

      ambientSound.setBuffer(audioBuffer);
      ambientSound.play();
      // Start subtitles and the objects to load
      startSubtitles && startSubtitles();
      startTimelineOfObjects && startTimelineOfObjects(scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (xhr) => {
      console.log('An error happened');
    }
  );
};

export { startSound };