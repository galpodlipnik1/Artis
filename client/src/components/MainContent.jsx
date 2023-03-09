import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useStateContext } from '../context/ContextProvider';
import { calculateDefaultDimensions } from '../util';
import { useParams, useLocation } from 'react-router-dom';
import { StatusPopup } from './';

const MainContent = () => {
  const { type } = useParams();
  const { state } = useLocation();
  const canvasRef = useRef(null);
  const { dimensions, setCanvasState, setMousePos, setDimensions } = useStateContext();
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    let newCanvas = null;
    let backupDimensions = dimensions;
    if (dimensions.width === 0 && dimensions.height === 0) {
      const { width, height } = calculateDefaultDimensions(window.innerWidth, window.innerHeight);
      backupDimensions = { width, height };
    }
    if (canvasRef.current) {
      newCanvas = document.getElementById('canvas');
      setCanvas(newCanvas);
      setCanvasState(newCanvas);
      newCanvas.width = backupDimensions.width;
      newCanvas.height = backupDimensions.height;

      if (type === 'image') {
        const ctx = newCanvas.getContext('2d');
        const img = new Image();
        img.src = state.imageData;
        img.onload = () => {
          const { width, height } = calculateDefaultDimensions(img.width, img.height);
          setDimensions({ width, height });
          newCanvas.width = width;
          newCanvas.height = height;
          ctx.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
        };
      } else if (type === 'blank') {
        const ctx = newCanvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
      }
    }
  }, []);
  useEffect(() => {
    const getMousePos = (canvas, evt) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    };
    const handleMouseMove = (e) => {
      const mousePos = getMousePos(canvas, e);
      setMousePos(mousePos);
    };
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
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
      <StatusPopup />
    </Box>
  );
};

export default MainContent;
