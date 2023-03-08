import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useStateContext } from '../context/ContextProvider';
import { calculateDefaultDimensions } from '../util';
import { useParams, useLocation } from 'react-router-dom';

import { fabric } from 'fabric';

const MainContent = () => {
  const { type } = useParams();
  const { state } = useLocation();
  const canvasRef = useRef(null);
  const { dimensions, setCanvasState, setMousePos } = useStateContext();
  const [canvas, setCanvas] = useState(null);
  const [imageSettings, setImageSettings] = useState({
    selectable: false,
    evented: false,
    hasControls: false,
    hoverCursor: 'default'
  });
  const [currentPixelData, setCurrentPixelData] = useState(null);
  useEffect(() => {
    let newCanvas = null;
    let backupDimensions = dimensions;
    if (dimensions.width === 0 && dimensions.height === 0) {
      const { width, height } = calculateDefaultDimensions(window.innerWidth, window.innerHeight);
      backupDimensions = { width, height };
    }
    if (canvasRef.current) {
      newCanvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: 'white',
        width: dimensions?.width || backupDimensions?.width,
        height: dimensions?.height || backupDimensions?.height
      });
      setCanvas(newCanvas);
      setCanvasState(newCanvas);
    }
    if (type === 'image') {
      const img = new Image();
      img.src = state.imageData;
      img.onload = function () {
        const newImage = new fabric.Image(img);
        newImage.selectable = imageSettings.selectable;
        newImage.evented = imageSettings.evented;
        newImage.hasControls = imageSettings.hasControls;
        newImage.hoverCursor = imageSettings.hoverCursor;
        const { width, height } = newImage;
        if (width > dimensions.width || height > dimensions.height) {
          const ratio = Math.min(dimensions.width / width, dimensions.height / height);
          newCanvas.setDimensions({ width: width * ratio, height: height * ratio });
          newImage.scale(ratio);
        } else {
          const ratio = Math.max(dimensions.width / width, dimensions.height / height);
          newCanvas.setDimensions({ width: (width * ratio) / 2, height: (height * ratio) / 2 });
          newImage.scale(ratio);
        }
        //get pixel data
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const pixelData = ctx.getImageData(0, 0, width, height);
        setCurrentPixelData(pixelData.data);
        newCanvas.add(newImage);
      };
    }
  }, []);
  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:move', (e) => {
        const { x, y } = e.pointer;
        setMousePos({ x: Number(x).toFixed(0), y: Number(y).toFixed(0) });
      });
    }
  }, [canvas]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100%',
        width: '100%',
        margin: '20px 0 0 20px'
      }}
    >
      <canvas ref={canvasRef} id="canvas" />
    </Box>
  );
};

export default MainContent;
