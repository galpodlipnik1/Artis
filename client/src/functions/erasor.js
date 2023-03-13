let isErasing = false;

export const handleMouseDownErasor = (event, canvasState, eraserSettings) => {
  isErasing = true;
  const context = canvasState.getContext('2d');
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  canvasState.addEventListener('mousemove', (e) => handleMouseMove(e, canvasState, eraserSettings));
  canvasState.addEventListener('mouseup', () => handleMouseUp(canvasState));
};

const handleMouseMove = (event, canvasState, eraserSettings) => {
  if (!isErasing) return;
  const context = canvasState.getContext('2d');
  context.lineWidth = eraserSettings.size;
  context.lineCap = 'round';
  context.strokeStyle = 'white';
  context.lineTo(event.clientX - canvasState.offsetLeft, event.clientY - canvasState.offsetTop);
  context.stroke();
}

const handleMouseUp = (canvasState) => {
  isErasing = false;
  canvasState.removeEventListener('mousemove', handleMouseMove);
  canvasState.removeEventListener('mouseup', handleMouseUp);

  const context = canvasState.getContext('2d');
  context.closePath();
  context.beginPath();
}