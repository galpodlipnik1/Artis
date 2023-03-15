export const colorPicker = (event, canvasState) => {
  const ctx = canvasState.getContext('2d');
  const rect = canvasState.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const imageData = ctx.getImageData(x, y, 1, 1);
  const data = imageData.data;
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

  return rgba;
};

export const rgbToHex = (rgba) => {
  const rgbaArr = rgba
    .substring(5, rgba.length - 1)
    .split(',')
    .map(Number);
  const alpha = Math.round(rgbaArr[3] * 255)
    .toString(16)
    .padStart(2, '0');
  const hex =
    '#' +
    rgbaArr
      .slice(0, 3)
      .map((c) => {
        const hexValue = Math.round(c).toString(16);
        return hexValue.length === 1 ? '0' + hexValue : hexValue;
      })
      .join('');
  return alpha === 'ff' ? hex : hex + alpha;
};
