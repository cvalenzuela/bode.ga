// ========
// Editor Audio Manager
// ========

import ws from 'wavesurfer.js';
import { WIDTH } from './index';
import { clearSubtitlesQueue, loadSubtitles } from './../subtitlesManager';
import { clearModelsQueue, loadModels } from './../modelManager';
import { firstTimeLoadingSubtitles, subtitlesLoadedForTheFirstTime } from './subtitlesMiddleManager';
import { renderSubtitlesKeys } from './subtitleKeysManager';
import { renderModelsKeys } from './modelKeysManager';
import { playBtn } from './buttonsManager';

let audio;
let waveform;

// Create the Audio instance
const createAudio = audioSrc => {
  // Set the max width
  waveform = document.getElementById('waveform');
  waveform.style.width = `${WIDTH}px`;

  audio = ws.create({
    container: '#waveform',
    scrollParent: false,
    cursorColor: '#399ACA',
    barHeight: 7,
    skipLength: 1
  });
  audio.load(audioSrc);

  // When the audio is loaded, load the subtitles
  audio.on('ready', () => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    renderSubtitlesKeys();
    renderModelsKeys();
  });

  // When the audio bar is moved, reload the subtitles and models
  audio.on('seek', e => {
    clearSubtitlesQueue();
    clearModelsQueue();
    if(audio.isPlaying()){
      loadSubtitles(audio.getCurrentTime());
      loadModels(audio.getCurrentTime());
    }
  })
}

// Play the audio
const playAudio = () => {
  if (audio.isPlaying()) {
    clearSubtitlesQueue();
    clearModelsQueue();
    audio.pause();
    playBtn.innerText = 'Play';
  } else {
    loadSubtitles(audio.getCurrentTime());
    loadModels(audio.getCurrentTime());
    audio.play();
    playBtn.innerText = 'Pause';
  }
};

export { audio, createAudio, playAudio }