/*
Time manager
*/

let currentTime = document.getElementById('current_time');

let updateClock = () =>  {
  let time = new Date;
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  minutes < 10 && (minutes = '0' + minutes);
  seconds < 10 && (seconds = '0' + seconds);
  currentTime.innerHTML = `${time.getHours()}: ${minutes}: ${seconds}`;
}

export { updateClock };