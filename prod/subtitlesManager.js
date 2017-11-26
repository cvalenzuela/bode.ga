// ========
// Load, remove and update subtitles.
// ========

import { HHMMSStoSeconds } from './utils/utils';

let subtitlesQueue = [];
let subtitles;
let subtitlesElt;

// Init: this is just called by the editor
const initSubtitles = (_subtitles, _subtitlesElt) => { 
  subtitles = _subtitles;
  subtitlesElt = _subtitlesElt;
 };

// Load the Subtitles in time
const loadSubtitles = currentTime => {
  subtitles.forEach((sub, i) => {
    let start = HHMMSStoSeconds(sub.start);
    let end = HHMMSStoSeconds(sub.end);
    if (start > currentTime) {
      start = start - currentTime;
      end = end - currentTime;
      subtitlesQueue.push(setTimeout(() => {
        subtitlesElt.children[0].style.background = '#1d1d1d';
        subtitlesElt.children[0].innerText = sub.first;
        if (sub.second != undefined && sub.second != 'undefined') {
          subtitlesElt.children[2].style.background = '#1d1d1d';
          subtitlesElt.children[2].innerText = sub.second;
        }
      }, start * 1000));
      subtitlesQueue.push(setTimeout(() => {
        subtitlesElt.children[0].style.background = '#000000';
        subtitlesElt.children[0].innerText = '';
        if (sub.second != undefined && sub.second != 'undefined') {
          subtitlesElt.children[2].style.background = '#000000';
          subtitlesElt.children[2].innerText = '';
        }
      }, end * 1000));
    }
  });
};

// Clear the queue of subtitles to render
const clearSubtitlesQueue = () => {
  subtitlesQueue.forEach(sub => {
    clearTimeout(sub);
  });
  subtitlesElt.children[0].style.background = '#000000';
  subtitlesElt.children[0].innerText = '';
  subtitlesElt.children[2].style.background = '#000000';
  subtitlesElt.children[2].innerText = '';
  subtitlesQueue = [];
}

// Update the values in the subtitles JSON. Can modify an existing or add a new.
const updateSubtitles = input => {
  let updatedExisting = false;
  subtitles.forEach(sub => {
    if (sub.id == input.id) {
      input.start && (sub.start = input.start);
      input.end && (sub.end = input.end);
      input.first && input.first != undefined && (sub.first = input.first);
      input.second && input.second != undefined && (sub.second = input.second);
      updatedExisting = true;
    }
  });
  if (!updatedExisting) {
    subtitles.push(input)
  }
}

// Remove an Existing subtitle
const removeSubtitle = input => {
  let id;
  subtitles.forEach(sub => {
    if (sub.start == input) {
      id = sub.id;
      subtitles.splice(subtitles.indexOf(sub), 1);
    }
  });
  return id;
}

// Save the JSON file
const saveSubtitlesToFile = () => {
  const date = new Date;
  const a = document.createElement("a");
  const file = new Blob([JSON.stringify(subtitles)], { type: 'text/plain' });
  a.href = URL.createObjectURL(file);
  a.download = `${date.getTime()}.json`;
  a.click();
}

// Load Subtitles from File
const loadSubtitlesFromFile = (removeCurrentSubtitles, renderNewSubtitles) => {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.click();
  fileSelector.addEventListener('change', () => {
    let file = fileSelector.files[0];
    let reader = new FileReader();
    reader.onload = e => {
      removeCurrentSubtitles()
      subtitles = JSON.parse(reader.result);
      renderNewSubtitles();
    }
    reader.readAsText(file);
  }, false)
}

export {
  subtitles,
  initSubtitles,
  loadSubtitles,
  clearSubtitlesQueue,
  removeSubtitle,
  updateSubtitles,
  saveSubtitlesToFile,
  loadSubtitlesFromFile
};