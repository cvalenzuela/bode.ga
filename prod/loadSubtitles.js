// Load the Subtitles

import { debugMode } from './index';
import * as queensSubs from './subtitles/queens';
import * as parkSlopeSubs from './subtitles/parkSlope';
import { subtitles as debugSubtitles } from './debug/subtitles';

let subtitleElements = {
  queens: document.getElementById('queens'),
  parkSlope: document.getElementById('parkSlope')
}

let startSubtitles = () => {
  let bodegaSubtitles = {};
  if (debugMode) {
    bodegaSubtitles.queens = debugSubtitles;
    bodegaSubtitles.parkSlope = [];
  } else {
    bodegaSubtitles.queens = queensSubs.subtitles;
    bodegaSubtitles.parkSlope = parkSlopeSubs.subtitles;
  }

  for (let bodega in bodegaSubtitles) {
    bodegaSubtitles[bodega].forEach((sub, i) => {
      setTimeout(() => {
        subtitleElements[bodega].children[0].style.background = '#1d1d1d';
        subtitleElements[bodega].children[0].innerText = sub.first;
        if (sub.second) {
          subtitleElements[bodega].children[1].style.background = '#1d1d1d';
          subtitleElements[bodega].children[1].innerText = sub.second;
        }
      }, sub.start * 1000);
      setTimeout(() => {
        subtitleElements[bodega].children[0].style.background = '#000000';
        subtitleElements[bodega].children[0].innerText = '';
        if (sub.second) {
          subtitleElements[bodega].children[1].style.background = '#000000';
          subtitleElements[bodega].children[1].innerText = '';
        }
      }, sub.end * 1000);
    });
  }
};

export { startSubtitles };