// ========
// Move the an Element
// ========

const moveElt = (elementToMove, trigger, x, y) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  const dragMouseDown = e => {
    e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  const elementDrag = e => {
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    y && (elementToMove.style.top = `${elementToMove.offsetTop - pos2}px`);
    x && (elementToMove.style.left = `${elementToMove.offsetLeft - pos1}px`);
  }

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  trigger.onmousedown = dragMouseDown;
};

export { moveElt }