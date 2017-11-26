// ========
// Clock Manager (not the THREE or animation clock, just the one on top)
// ========

const currentTime = document.getElementById('current_time');

const updateClock = () =>  {
  let time = new Date;
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  minutes < 10 && (minutes = '0' + minutes);
  seconds < 10 && (seconds = '0' + seconds);
  currentTime.innerHTML = `${time.getHours()}: ${minutes}: ${seconds}`;
}

export { updateClock };