export const crop = (canvasState, cropSettings) => {
  const requiredSettings = ['top', 'left', 'bottom', 'right'];
  if (!requiredSettings.every((setting) => setting in cropSettings)) {
    throw new Error('Missing required crop setting');
  }

  const canvas = canvasState;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = new Uint8ClampedArray(imgData.data);
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
  const newWidth = newCanvas.width;
  const newHeight = newCanvas.height;
  const len = pixels.length;
  let i = 0;
  let x = 0;
  let y = 0;
  let newX = 0;
  let newY = 0;
  let newPos = 0;

  for (i = 0; i < len; i += 4) {
    x = (i / 4) % width;
    y = Math.floor(i / 4 / width);
    if (x >= cropLeft && x < width - cropRight && y >= cropTop && y < height - cropBottom) {
      newX = x - cropLeft;
      newY = y - cropTop;
      newPos = (newY * newWidth + newX) * 4;
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
};
