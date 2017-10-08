// Load the Subtitles

import { subtitles } from './subtitles';
let firstSub = document.getElementById('firstSub');
let secondSub = document.getElementById('secondSub');

let startSubtitles = () => {
  subtitles.forEach((sub, i) => {
    setTimeout(() => {
      firstSub.style.background = '#1d1d1d';
      firstSub.innerText = sub.first;
      if (sub.second){
        secondSub.style.background = '#1d1d1d';
        secondSub.innerText = sub.second;
      }
    }, sub.start * 1000);
    setTimeout(() => {
      firstSub.style.background = '#000000';
      firstSub.innerText = '';
      if(sub.second){
        secondSub.style.background = '#000000';
        secondSub.innerText = '';
      }
    }, sub.end * 1000);
  });
};

export { startSubtitles };