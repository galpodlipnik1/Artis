let isDrawing = false;

export const handleMouseDown = (event, canvasState, brushSettings) => {
  isDrawing = true;
  const context = canvasState.getContext('2d');
  context.beginPath();
  context.lineWidth = brushSettings.size;
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  canvasState.addEventListener('mousemove', (e) => handleMouseMove(e, canvasState, brushSettings));
  canvasState.addEventListener('mouseup', () => handleMouseUp(canvasState));
};

const handleMouseMove = (event, canvasState, brushSettings) => {
  if (!isDrawing) return;
  const context = canvasState.getContext('2d');
  context.lineCap = 'round';
  context.strokeStyle = brushSettings.color;
  context.lineTo(event.clientX - canvasState.offsetLeft, event.clientY - canvasState.offsetTop);
  context.stroke();
};

const handleMouseUp = (canvasState) => {
  isDrawing = false;
  canvasState.removeEventListener('mousemove', handleMouseMove);
  canvasState.removeEventListener('mouseup', handleMouseUp);
  canvasState.removeEventListener('mousedown', handleMouseDown);
  const context = canvasState.getContext('2d');
  context.closePath();
  context.beginPath();
};
