export const calculateDefaultDimensions = (width, height) => {
  const defaultWidth = 1300;
  const defaultHeight = 600;
  const defaultRatio = defaultWidth / defaultHeight;
  const ratio = width / height;
  let newWidth = Number(width);
  let newHeight = Number(height);
  if (ratio > defaultRatio) {
    newWidth = defaultWidth;
    newHeight = defaultWidth / ratio;
  } else {
    newHeight = defaultHeight;
    newWidth = defaultHeight * ratio;
  }
  return { width: newWidth.toFixed(0), height: newHeight.toFixed(0) };
};
