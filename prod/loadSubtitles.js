// ========
// Load and remove subtitles at a specific time using setTimeout.
// ========

import { subtitles as debugSubtitles } from './debug/subtitles';

let loadSubtitles = (debugMode, subtitles, subtitlesElt) => {
  let subtitlesToLoad = subtitles;
  debugMode && (subtitlesToLoad = debugSubtitles);

  subtitlesToLoad.forEach((sub, i) => {
    setTimeout(() => {
      subtitlesElt.children[0].style.background = '#1d1d1d';
      subtitlesElt.children[0].innerText = sub.first;
      if (sub.second) {
        subtitlesElt.children[2].style.background = '#1d1d1d';
        subtitlesElt.children[2].innerText = sub.second;
      }
    }, sub.start * 1000);
    setTimeout(() => {
      subtitlesElt.children[0].style.background = '#000000';
      subtitlesElt.children[0].innerText = '';
      if (sub.second) {
        subtitlesElt.children[2].style.background = '#000000';
        subtitlesElt.children[2].innerText = '';
      }
    }, sub.end * 1000);
  });

};

export { loadSubtitles };