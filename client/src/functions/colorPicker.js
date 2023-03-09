export const colorPicker = (x, y, canvasState) => {
  const ctx = canvasState.getContext('2d');
  ctx.willReadFrequently = true;
  const imgData = ctx.getImageData(x, y, 1, 1);
  const r = imgData.data[0];
  const g = imgData.data[1];
  const b = imgData.data[2];
  const a = imgData.data[3] / 255;
  const rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  return rgba;
};
