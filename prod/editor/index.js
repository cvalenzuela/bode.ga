// ========
// Editor Main
// ========

import ws from 'wavesurfer.js';
import { moveElt } from './move';
import { mapRange, secondstoHHMMSS, HHMMSStoSeconds, UUIID } from './../utils/utils';
import { subtitles, initSubtitles, loadSubtitles, clearSubtitlesQueue, updateSubtitles, removeSubtitle, saveSubtitlesToFile } from './../subtitlesManager';

const waveform = document.getElementById('waveform');

const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const saveBtn = document.getElementById('save');
const addSubtitleBtn = document.getElementById('addSubtitle');
const removeSubtitleBtn = document.getElementById('removeSubtitle');
const addModelBtn = document.getElementById('addModel');
const removeModelBtn = document.getElementById('removeModel');
const editor = document.getElementById('editor');
const moveBtn = document.getElementById('move');
const currentTime = document.getElementById('currentTime');
const modelsKeys = document.getElementById('modelsKeys');
const subtitleTooltip = document.getElementById('subtitleTooltip');
const subtitlesKeys = document.getElementById('subtitlesKeys');
const subtitleTimeTooltip = document.getElementById('subtitleTimeTooltip');
const subtitlesTracks = document.getElementById('subtitlesTracks');
const app = document.getElementById('app');
const loading = document.getElementById('loader');

const WIDTH = 1000;
let currentSubtitleSelected;
let isASubtitleSelected = false;

let firstTimeLoadingSubtitles = true;
let audio, subtitlesElt;
let keys = [];
waveform.style.width = `${WIDTH}px`;
modelsKeys.style.width = `${WIDTH}px`;
subtitlesKeys.style.width = `${WIDTH}px`;

// Manage Keyboard
document.body.onkeydown = e => {
  let isShiftPressed = keys.indexOf(16) != -1;
  // Spacebar
  if (e.keyCode == 32) {
    if (!isASubtitleSelected) {
      playAudio();
    }
  }
  // Enter
  if (e.keyCode == 13) {
    if (!isShiftPressed) {
      e.preventDefault();
      const time = subtitleTimeTooltip.innerText.split('-');
      const txt = subtitleTooltip.innerText.split(/\n/);
      const data = {
        id: currentSubtitleSelected,
        start: time[0],
        end: time[1],
        first: txt[0],
        second: txt[1]
      }
      updateSubtitles(data);
      redrawSubtitle(true);
    }
  }
  // Esc
  if (e.keyCode == 27) {
    currentSubtitleSelected = '';
    isASubtitleSelected = false;
    subtitleTooltip.innerText = '';
    subtitleTimeTooltip.innerText = '';
  }
  // Shift
  if (e.keyCode == 16) {
    keys.push(e.keyCode);
  }
  // S: add a subtitle
  if (e.keyCode == 83) {
    if (isShiftPressed) {
      addSubtitle();
    }
  }
  // D: delete a subtitle 
  if (e.keyCode == 68) {
    if (isShiftPressed) {
      removeSub();
    }
  }
  // M: add a model 
  if (e.keyCode == 77) {
    if (isShiftPressed) {
     
    }
  }
  // R: remove a model 
  if (e.keyCode == 82) {
    if (isShiftPressed) {
      
    }
  }
}

document.body.onkeyup = e => {
  if (e.keyCode == 16) {
    keys = [];
  }
}

// Update a subtitle when it has moved in the timeline
window.onmouseup = e => {
  if (isASubtitleSelected) {
    redrawSubtitle(false);
  }
}

// Add a subtitle
const addSubtitle = () => {
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
  let subtitleEdit = document.getElementById(`${currentSubtitleSelected}Edit`);

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

  // Update the Key part
  key.style.left = `${left}px`;
  key.dataset.left = left;
  key.dataset.first = first;
  key.dataset.second = second;
  key.dataset.start = start;
  key.dataset.end = end;

  // Update the Edit part
  subtitleEdit.children[1].innerText = start;
  subtitleEdit.children[2].innerText = end;
  subtitleEdit.children[3].innerText = first;
  subtitleEdit.children[4].innerText = second;

  // Move the tooltip
  subtitleTooltip.style.left = `${left}px`;
  subtitleTimeTooltip.style.left = `${left}px`;
  subtitleTimeTooltip.innerHTML = `${start}-${end}`;

  const data = {
    id: key.id,
    start,
    end,
    first,
    second
  };
  updateSubtitles(data);
}

// Play the audio
const playAudio = () => {
  if (audio.isPlaying()) {
    clearSubtitlesQueue(subtitlesElt);
    audio.pause();
    playBtn.innerText = 'Play';
  } else {
    if (firstTimeLoadingSubtitles) {
      loading.style.display = 'none';
      app.style.display = 'block';
      firstTimeLoadingSubtitles = false;
    }
    loadSubtitles(subtitlesElt, audio.getCurrentTime());
    audio.play();
    playBtn.innerText = 'Pause';
  }
};

// Play Button
playBtn.addEventListener('click', () =>  {
  playAudio()
});

// Stop Button
stopBtn.addEventListener('click', () =>  {
  audio.stop();
  playBtn.innerText = 'Play';
});

// Save Button
saveBtn.addEventListener('click', () => {
  saveSubtitlesToFile();
});

// Add a Subtitle
addSubtitleBtn.addEventListener('click', () => {
  addSubtitle();
});

// Remove a Subtitle 
removeSubtitleBtn.addEventListener('click', () => {
  removeSub();
});

// Append a new subtitle track
const newSubTrack = sub => {
  const newElements = ['subtitleTrack', 'subId', 'subStart', 'subEnd', 'subFirst', 'subSecond'];
  const domElements = [];
  newElements.forEach((e, i) => {
    let elt = document.createElement('div');
    elt.className = e;
    i > 0 && (elt.contentEditable = 'true');
    domElements.push(elt);
  });
  domElements[0].id = `${sub.id}Edit`;
  domElements[1].innerText = sub.id.substring(0, 5);
  domElements[2].innerText = sub.start;
  domElements[3].innerText = sub.end;
  domElements[4].innerText = sub.first;
  domElements[5].innerText = sub.second;
  domElements.forEach((e, i) => {
    i > 0 && domElements[0].appendChild(e);
  });
  subtitlesTracks.appendChild(domElements[0]);
}

// Create a subtitle Key (the yellow things)
const createSubKey = (data, startPos) => {
  let key = document.createElement('div');
  key.className = 'subtitleKey';
  key.style.left = `${startPos}px`;
  key.draggable = 'true';
  key.dataset.start = data.start;
  key.dataset.end = data.end;
  key.dataset.first = data.first;
  key.dataset.second = data.second;
  key.dataset.left = startPos;
  key.id = data.id;

  newSubTrack(data);
  moveElt(key, key, true, false);
  const showSubtitleAndTime = () => {
    !data.second ? subtitleTooltip.innerHTML = data.first : subtitleTooltip.innerHTML = `${data.first}<br>${data.second}`;
    subtitleTimeTooltip.innerHTML = `${data.start}-${data.end}`;
    subtitleTooltip.style.left = `${key.dataset.left}px`;
    subtitleTimeTooltip.style.left = `${key.dataset.left}px`;
  }
  key.addEventListener('mouseover', () => {
    if (!isASubtitleSelected) {
      showSubtitleAndTime();
      subtitleTooltip.style.left = `${key.dataset.left}px`;
      subtitleTimeTooltip.style.left = `${key.dataset.left}px`;
    }
  });
  key.addEventListener('mouseleave', () => {
    if (!isASubtitleSelected) {
      subtitleTooltip.innerText = '';
      subtitleTimeTooltip.innerText = '';
    }
  });
  key.addEventListener('mousedown', () => {
    isASubtitleSelected = true;
    currentSubtitleSelected = data.id;
    showSubtitleAndTime();
  });
  subtitlesKeys.appendChild(key);

}

// Subtitles Keys and Tracks
const renderSubtitles = () => {
  subtitles.forEach(sub => {
    let startPos = mapRange(HHMMSStoSeconds(sub.start), 0, audio.getDuration(), 0, WIDTH);
    createSubKey(sub, startPos);
  });
};

// Init the edit mode
const initEditMode = (audioSrc, _subtitlesElt, scene, models) => {
  subtitlesElt = _subtitlesElt;

  moveElt(editor, moveBtn, true, true);

  audio = ws.create({
    container: '#waveform',
    scrollParent: false,
    cursorColor: '#399ACA',
    barHeight: 7
  });
  audio.load(audioSrc);

  // When the audio is loaded, load the subtitles
  audio.on('ready', () => {
    renderSubtitles(subtitles);
  });

  // When the audio bar is moved, reload the subtitles
  audio.on('seek', e => {
    clearSubtitlesQueue(subtitlesElt);
    audio.isPlaying() && loadSubtitles(subtitlesElt, audio.getCurrentTime());
  })
};

// Update the position of the div showing the audio time
const updateCurrentAudioTimePosition = () => {
  const pos = mapRange(audio.getCurrentTime(), 0, audio.getDuration(), 0, WIDTH);
  currentTime.innerText = secondstoHHMMSS(audio.getCurrentTime());
  currentTime.style.left = `${pos}px`
}

export { initEditMode, updateCurrentAudioTimePosition }