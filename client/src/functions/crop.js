export const crop = (cropPos, canvasState ) => {

};

export const drawRect = (e, cropPos, canvasState, isDrawing) => {
  if (!isDrawing) return;
  const ctx = canvasState.getContext("2d");
  const currentX = e.clientX - canvasState.offsetLeft;
  const currentY = e.clientY - canvasState.offsetTop;
  const width = currentX - cropPos[0].x;
  const height = currentY - cropPos[0].y;

  ctx.clearRect(0, 0, canvasState.width, canvasState.height);
  const currentImage = new Image();
  currentImage.src = canvasState.toDataURL();
  currentImage.onload = () => {
    ctx.drawImage(currentImage, 0, 0);
    ctx.beginPath();
    ctx.rect(cropPos[0].x, cropPos[0].y, width, height);
    ctx.stroke();
  };
};
