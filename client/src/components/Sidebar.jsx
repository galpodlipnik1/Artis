import React, { useState } from 'react';
import { Stack, Paper, Divider, IconButton, Tooltip } from '@mui/material';
import { BsFillBrushFill, BsEraserFill } from 'react-icons/bs';
import { BiText, BiCrop } from 'react-icons/bi';
import { MdLensBlur, MdGradient } from 'react-icons/md';
import { DiFsharp } from 'react-icons/di';
import { GiAlienFire, GiLevelTwo, GiArrowCursor } from 'react-icons/gi';
import { CgEditNoise, CgColorPicker } from 'react-icons/cg';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { Box } from '@mui/system';

import { useStateContext } from '../context/ContextProvider';

import { blurFilter, saturationFilter } from '../functions/filters';

const Sidebar = () => {
  const { canvasState, setZoom } = useStateContext();
  const [originalData, setOriginalData] = useState([]);

  const handleZoomIn = () => {
    canvasState.setZoom(canvasState.getZoom() * 1.1);
    setZoom(canvasState.getZoom() * 100);
  };
  const handleZoomOut = () => {
    canvasState.setZoom(canvasState.getZoom() / 1.1);
    setZoom(canvasState.getZoom() * 100);
  };

  const handleBlur = () => {
    console.log('blur');
    //get the current canvas data as a pixel array
    const canvas = document.createElement('canvas');
    canvas.width = canvasState.width;
    canvas.height = canvasState.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(canvasState.lowerCanvasEl, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newImageData = blurFilter(imageData);
    ctx.putImageData(newImageData, 0, 0);
    const newImage = new Image();
    newImage.src = canvas.toDataURL();
    newImage.onload = function () {
      canvasState.clear();
      canvasState.add(newImage);
    };


  };
  
  const buttonStyle = {
    backgroundColor: '#5d5d5d',
    color: '#fff',
    margin: '5px',
    ':hover': {
      backgroundColor: '#838383',
    },
  };
  return (
    <Paper
      elevation={3}
      sx={{
        width: '60px',
        height: '100%',
        borderRadius: '0px',
        backgroundColor: '#0e151c',
        color: '#fff',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Divider orientation="horizontal" flexItem sx={{ backgroundColor: '#fff' }} />
      <Stack
        direction="column"
        spacing={1}
        sx={{
          width: '60px',
          height: '100%',
          margin: '10px 5px 10px 0',
          borderRadius: '0px',
          backgroundColor: '#0e151c',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Tooltip title="Select" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<GiArrowCursor />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Brush" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<BsFillBrushFill />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Eraser" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<BsEraserFill />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Crop" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<BiCrop />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Text" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<BiText />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Color Picker" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<CgColorPicker />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom In" placement="right" onClick={handleZoomIn}>
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<AiOutlineZoomIn />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out" placement="right" onClick={handleZoomOut}>
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<AiOutlineZoomOut />}{' '}
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Tooltip title="Blur" placement="right" onClick={handleBlur}>
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<MdLensBlur />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Sharpen" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<DiFsharp />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Hue/Saturation"
            placement="right"
          >
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<GiAlienFire />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Levels" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<GiLevelTwo />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Gradient" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<MdGradient />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Noise" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<CgEditNoise />}{' '}
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Sidebar;
