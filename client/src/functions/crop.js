export const crop = (canvasState, cropSettings) => {
  const canvas = canvasState;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imgData.data;
  const len = pixels.length;
  const width = canvas.width;
  const height = canvas.height;
  const cropTop = parseInt(cropSettings.top);
  const cropLeft = parseInt(cropSettings.left);
  const cropBottom = parseInt(cropSettings.bottom);
  const cropRight = parseInt(cropSettings.right);
  const newCanvas = document.createElement('canvas');
  newCanvas.width = width - cropLeft - cropRight;
  newCanvas.height = height - cropTop - cropBottom;
  const newCtx = newCanvas.getContext('2d');
  const newImgData = newCtx.createImageData(newCanvas.width, newCanvas.height);
  const newPixels = newImgData.data;
  for (let i = 0; i < len; i += 4) {
      const x = (i / 4) % width;
      const y = Math.floor((i / 4) / width);
      if (x >= cropLeft && x < width - cropRight && y >= cropTop && y < height - cropBottom) {
          const newX = x - cropLeft;
          const newY = y - cropTop;
          const newPos = (newY * newCanvas.width + newX) * 4;
          newPixels[newPos] = pixels[i];
          newPixels[newPos + 1] = pixels[i + 1];
          newPixels[newPos + 2] = pixels[i + 2];
          newPixels[newPos + 3] = pixels[i + 3];
      }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = newCanvas.width;
  canvas.height = newCanvas.height;
  ctx.putImageData(newImgData, 0, 0);
}
