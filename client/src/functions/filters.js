export const blurFilter = (pixels) => {
  const width = pixels.width;
  const height = pixels.height;
  const data = pixels.data;

  const kernel = [
    [0.0625, 0.125, 0.0625],
    [0.125, 0.25, 0.125],
    [0.0625, 0.125, 0.0625],
  ];

  const kernelSize = kernel.length;
  const kernelHalf = Math.floor(kernelSize / 2);

  const newData = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const row = Math.floor(i / 4 / width);
    const col = Math.floor(i / 4) % width;

    let r = 0;
    let g = 0;
    let b = 0;

    for (let kr = 0; kr < kernelSize; kr++) {
      const rowIndex = row + kr - kernelHalf;
      if (rowIndex < 0 || rowIndex >= height) {
        continue;
      }

      for (let kc = 0; kc < kernelSize; kc++) {
        const colIndex = col + kc - kernelHalf;
        if (colIndex < 0 || colIndex >= width) {
          continue;
        }

        const index = (rowIndex * width + colIndex) * 4;

        const weight = kernel[kr][kc];

        r += data[index] * weight;
        g += data[index + 1] * weight;
        b += data[index + 2] * weight;
      }
    }

    newData[i] = r;
    newData[i + 1] = g;
    newData[i + 2] = b;
    newData[i + 3] = data[i + 3];
  }

  return new ImageData(newData, width, height);
};


export const saturationFilter = (pixels, saturation) => {
  // Calculate constants outside the loop to optimize performance
  const RW = 0.3086;
  const RG = 0.6084;
  const RB = 0.082;
  const RW_1 = 1 - RW;
  const RG_1 = 1 - RG;
  const RB_1 = 1 - RB;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    const grayscale = RW * r + RG * g + RB * b;
    const newRed = saturation * r + (1 - saturation) * grayscale;
    const newGreen = saturation * g + (1 - saturation) * grayscale;
    const newBlue = saturation * b + (1 - saturation) * grayscale;

    pixels[i] = newRed;
    pixels[i + 1] = newGreen;
    pixels[i + 2] = newBlue;
  }

  return pixels;
};
