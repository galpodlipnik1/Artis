export const blurFilter = (pixels, width, height) => {
  const kernel = [
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1]
  ];

  const kernelSize = kernel.length;
  const kernelHalf = Math.floor(kernelSize / 2);

  const newData = new Uint8ClampedArray(pixels.length);

  const weightSum = kernel.reduce((sum, row) => sum + row.reduce((acc, curr) => acc + curr, 0), 0);

  for (let i = 0; i < pixels.length; i += 4) {
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

        const weight = kernel[kr][kc] / weightSum;

        r += pixels[index] * weight;
        g += pixels[index + 1] * weight;
        b += pixels[index + 2] * weight;
      }
    }

    newData[i] = r;
    newData[i + 1] = g;
    newData[i + 2] = b;
    newData[i + 3] = pixels[i + 3];
  }

  return new ImageData(newData, width, height);
};

export const saturationFilter = (pixels, width, height, saturation) => {
  const newData = new Uint8ClampedArray(pixels.length);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    const avg = (r + g + b) / 3;

    newData[i] = avg + (r - avg) * saturation;
    newData[i + 1] = avg + (g - avg) * saturation;
    newData[i + 2] = avg + (b - avg) * saturation;
    newData[i + 3] = pixels[i + 3];
  }

  return new ImageData(newData, width, height);
};

export const sharpnessFilter = (pixels, width, height) => {
  const kernel = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
  ];

  const kernelSize = kernel.length;
  const kernelHalf = Math.floor(kernelSize / 2);

  const newData = new Uint8ClampedArray(pixels.length);

  for (let i = 0; i < pixels.length; i += 4) {
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

        r += pixels[index] * weight;
        g += pixels[index + 1] * weight;
        b += pixels[index + 2] * weight;
      }
    }

    newData[i] = r;
    newData[i + 1] = g;
    newData[i + 2] = b;
    newData[i + 3] = pixels[i + 3];
  }

  return new ImageData(newData, width, height);
};

export const levelsFilter = (pixels, width, height, levels) => {
  const newData = new Uint8ClampedArray(pixels.length);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    newData[i] = r * levels;
    newData[i + 1] = g * levels;
    newData[i + 2] = b * levels;
    newData[i + 3] = pixels[i + 3];
  }

  return new ImageData(newData, width, height);
};

export const grayscaleFilter = (pixels, width, height) => {
  const newData = new Uint8ClampedArray(pixels.length);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    const avg = (r + g + b) / 3;

    newData[i] = avg;
    newData[i + 1] = avg;
    newData[i + 2] = avg;
    newData[i + 3] = pixels[i + 3];
  }

  return new ImageData(newData, width, height);
};

export const invertFilter = (pixels, width, height) => {
  const newData = new Uint8ClampedArray(pixels.length);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    newData[i] = 255 - r;
    newData[i + 1] = 255 - g;
    newData[i + 2] = 255 - b;
    newData[i + 3] = pixels[i + 3];
  }

  return new ImageData(newData, width, height);
};
