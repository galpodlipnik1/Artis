export const crop = (cropPos, canvasState, currentImageData, setDimensions ) => {
  const ctx = canvasState.getContext("2d");
  setTimeout(() => {
    const confirm = window.confirm("Do you want to crop this image?");
    if (confirm && cropPos.length === 2) {
      ctx.clearRect(0, 0, canvasState.width, canvasState.height);
      ctx.putImageData(currentImageData, 0, 0);
      makeCrop(cropPos, canvasState, setDimensions);
    } else {
      ctx.clearRect(0, 0, canvasState.width, canvasState.height);
      ctx.beginPath();
      ctx.putImageData(currentImageData, 0, 0);
    }
  }, 200);
}

export const drawRect = (e, cropPos, canvasState, isDrawing, currentImageData) => {
  if (!isDrawing) return;
  const ctx = canvasState.getContext("2d");
  const currentX = e.clientX - canvasState.offsetLeft;
  const currentY = e.clientY - canvasState.offsetTop;
  const width = currentX - cropPos[0].x;
  const height = currentY - cropPos[0].y;

  ctx.clearRect(0, 0, canvasState.width, canvasState.height);
  ctx.putImageData(currentImageData, 0, 0);
  ctx.strokeRect(cropPos[0].x, cropPos[0].y, width, height);
  ctx.strokeStyle = "blue";
  ctx.setLineDash([5, 3]);
  ctx.lineWidth = 2;
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(cropPos[0].x, cropPos[0].y, width, height);
};

const makeCrop = (cropPos, canvasState, setDimensions ) => {
  const ctx = canvasState.getContext("2d");

  const cropWidth = cropPos[1].x - cropPos[0].x;
  const cropHeight = cropPos[1].y - cropPos[0].y;
  setDimensions({ width: cropWidth, height: cropHeight});

  const croppedImageData = ctx.getImageData(cropPos[0].x, cropPos[0].y, cropWidth, cropHeight);
  canvasState.width = cropWidth;
  canvasState.height = cropHeight;
  ctx.putImageData(croppedImageData, 0, 0);
};