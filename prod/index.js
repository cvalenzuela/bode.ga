/* 
Bodegas Doc
*/

import * as animationManager from './animationManager';
import { startSound } from './sounds';
import { startSubtitles } from './loadSubtitles';
import { startTimelineOfObjects } from './modelsToLoad';

window.onload = () => {
  let watchBtn = document.getElementById('watchBtn');
  let creditsBtn = document.getElementById('creditsBtn');
  let cover = document.getElementById('cover');
  let loader = document.getElementById('loader');

  watchBtn.addEventListener('click', ()=>{
    cover.style.display = 'none';
    loader.style.display = 'block';
    animationManager.init(startSound, startSubtitles, startTimelineOfObjects);
  });

}

