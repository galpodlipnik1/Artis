import React, { useState } from 'react';
import { Stack, Paper, Divider, IconButton, Tooltip } from '@mui/material';
import { BsFillBrushFill } from 'react-icons/bs';
import { MdLensBlur, MdGradient } from 'react-icons/md';
import { DiFsharp } from 'react-icons/di';
import { GiAlienFire, GiLevelTwo } from 'react-icons/gi';
import { CgEditNoise } from 'react-icons/cg';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { Box } from '@mui/system';

const Sidebar = () => {
  const buttonStyle = {
    backgroundColor: '#5d5d5d',
    color: '#fff',
    margin: '5px',
    ':hover': {
      backgroundColor: '#838383'
    }
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
          <Tooltip title="Brush" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<BsFillBrushFill />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom In" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<AiOutlineZoomIn />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out" placement="right">
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
          <Tooltip title="Blur" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<MdLensBlur />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Sharpen" placement="right">
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              {<DiFsharp />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Hue/Saturation" placement="right">
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
