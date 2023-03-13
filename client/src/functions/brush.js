let isDrawing = false;

export const handleMouseDown = (event, canvasState, brushSettings, selectedTool) => {
  if(selectedTool !== 'brush') return;
  console.log(selectedTool);
  isDrawing = true;
  const context = canvasState.getContext('2d');
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  canvasState.addEventListener('mousemove', (e) => handleMouseMove(e, canvasState, brushSettings));
  canvasState.addEventListener('mouseup', () => handleMouseUp(canvasState));
}

const handleMouseMove = (event, canvasState, brushSettings) => {
  if (!isDrawing) return;
  const context = canvasState.getContext('2d');
  context.lineWidth = brushSettings.size;
  context.lineCap = 'round';
  context.strokeStyle = brushSettings.color;
  context.lineTo(event.clientX - canvasState.offsetLeft, event.clientY - canvasState.offsetTop);
  context.stroke();
}

const handleMouseUp = (canvasState) => {
  isDrawing = false;
  canvasState.removeEventListener('mousemove', handleMouseMove);
  canvasState.removeEventListener('mouseup', handleMouseUp);
  canvasState.removeEventListener('mousedown', handleMouseDown);
  const context = canvasState.getContext('2d');
  context.closePath();
  context.beginPath();
}