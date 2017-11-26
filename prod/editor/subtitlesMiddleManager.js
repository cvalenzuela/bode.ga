// ========
// Editor Subtitles Middle Manager. Not to confuse with the global subtitles Manager.
// ========


import { WIDTH } from './index';
import { audio } from './audioManager';
import { secondstoHHMMSS, UUIID, mapRange, HHMMSStoSeconds } from './../utils/utils';
import { createSubKey, currentSubtitleSelected } from './subtitleKeysManager';
import { updateSubtitles, removeSubtitle } from './../subtitlesManager';

const subtitleTimeTooltip = document.getElementById('subtitleTimeTooltip');
const subtitleTooltip = document.getElementById('subtitleTooltip');

// Add a subtitle
const addSub = () =>  {
  const data = {
    id: UUIID(),
    start: secondstoHHMMSS(audio.getCurrentTime()),
    end: secondstoHHMMSS(audio.getCurrentTime() + 2),
    first: '- Sample Text',
    second: undefined
  };
  let startPos = mapRange(audio.getCurrentTime(), 0, audio.getDuration(), 0, WIDTH);
  createSubKey(data, startPos);
  updateSubtitles(data);
}

// Remove a subtitle 
const removeSub = () => {
  const currentPos = secondstoHHMMSS(audio.getCurrentTime());
  let id = removeSubtitle(currentPos);
  let elt = document.getElementById(id);
  elt.remove();
}

// Redraw a subtitle
const redrawSubtitle = manualEdit => {
  let key = document.getElementById(currentSubtitleSelected);

  let offset, first, second, left, start, end;
  if (manualEdit) {
    let time = subtitleTimeTooltip.innerText.split('-');
    let txt = subtitleTooltip.innerText.split(/\n/);
    start = time[0];
    end = time[1];
    offset = HHMMSStoSeconds(time[0]);
    first = txt[0];
    second = txt[1];
    left = mapRange(offset, 0, audio.getDuration(), 0, WIDTH);
  } else {
    first = key.dataset.first;
    second = key.dataset.second;
    offset = parseFloat(key.style.left.split('px')[0]).toFixed(100);
    left = offset;
    let newStart = mapRange(offset, 0, WIDTH, 0, audio.getDuration());
    let newEnd = newStart + (HHMMSStoSeconds(key.dataset.end) - HHMMSStoSeconds(key.dataset.start));
    start = secondstoHHMMSS(newStart);
    end = secondstoHHMMSS(newEnd);
  }

  // Update the Key
  key.style.left = `${left}px`;
  key.dataset.left = left;
  key.dataset.first = first;
  key.dataset.second = second;
  key.dataset.start = start;
  key.dataset.end = end;

  // Move the tooltip
  subtitleTooltip.style.left = `${left}px`;
  subtitleTimeTooltip.style.left = `${left}px`;
  subtitleTimeTooltip.innerHTML = `${start}-${end}`;

  if(!manualEdit){
    const data = {
      id: key.id,
      start,
      end,
      first,
      second
    }
    updateSubtitles(data);
  }
}

export {
  addSub,
  removeSub,
  redrawSubtitle
}