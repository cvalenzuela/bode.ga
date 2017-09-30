/*
Time manager
*/

let getCurrentTime = (element) =>  {
  let time = new Date;
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  minutes < 10 && (minutes = '0' + minutes);
  seconds < 10 && (seconds = '0' + seconds);
  element.innerHTML = `${time.getHours()}: ${minutes}: ${seconds}`;
}

export { getCurrentTime };