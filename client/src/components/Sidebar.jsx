import React, { useEffect, useState } from 'react';
import {
  Stack,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Slider,
  Typography,
  Button
} from '@mui/material';
import { BsFillBrushFill, BsEraserFill } from 'react-icons/bs';
import { BiText, BiCrop } from 'react-icons/bi';
import { MdLensBlur, MdInvertColors } from 'react-icons/md';
import { DiFsharp } from 'react-icons/di';
import { GiAlienFire, GiLevelTwo, GiArrowCursor } from 'react-icons/gi';
import { CgEditNoise, CgColorPicker } from 'react-icons/cg';
import { AiOutlineUndo } from 'react-icons/ai';
import { Box } from '@mui/system';
import { useStateContext } from '../context/ContextProvider';
import { handleMouseDown } from '../functions/brush';
import { handleMouseDownErasor } from '../functions/erasor';
import { crop } from '../functions/crop';


import {
  blurFilter,
  saturationFilter,
  sharpnessFilter,
  levelsFilter,
  grayscaleFilter,
  invertFilter
} from '../functions/filters';

const Sidebar = () => {
  const { canvasState, setZoom, dimensions, zoom, mousePos } = useStateContext();
  const [originalData, setOriginalData] = useState(null);
  const [currentImageData, setCurrentImageData] = useState(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [brushSettings, setBrushSettings] = useState({ color: '#000000', size: 10 });
  const [erasorSettings, setEraserSettings] = useState({ size: 10 });
  const [cropSettings, setCropSettings] = useState({ top: 0, left: 0, bottom: 0, right: 0 });
  const [anchorEl, setAnchorEl] = useState(null);
  const BrushOpen = Boolean(anchorEl && anchorEl.id === 'brush');
  const EraserOpen = Boolean(anchorEl && anchorEl.id === 'eraser');
  const CropOpen = Boolean(anchorEl && anchorEl.id === 'crop');
  const [hasSavedCrop, setHasSavedCrop] = useState(false);
  const [hasColorBeenPicked, setHasColorBeenPicked] = useState(false);
  const [pickedColor, setPickedColor] = useState(null);


  useEffect(() => {
    console.log(hasColorBeenPicked);
  }, [hasColorBeenPicked]);
  useEffect(() => {
    if (selectedTool === 'brush') {
      canvasState.addEventListener('mousedown', (e) =>
      handleMouseDown(e, canvasState, brushSettings)
      );
    } else if (selectedTool === 'eraser') {
      canvasState.addEventListener('mousedown', (e) =>
        handleMouseDownErasor(e, canvasState, erasorSettings)
      );
    } else if (selectedTool === 'crop') {
      if(hasSavedCrop)
        crop(canvasState, cropSettings);
      setHasSavedCrop(false);
    } else if (selectedTool === 'color') {
      canvasState.addEventListener('mousedown', (e) => {
        const ctx = canvasState.getContext('2d');
        const imageData = ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
        const pixel = imageData.data;
        const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        setPickedColor(color);
        setHasColorBeenPicked(true);
      });
    };

    return () => {
      if (selectedTool === 'brush') {
        canvasState.removeEventListener('mousedown', (e) =>
          handleMouseDown(e, canvasState, brushSettings, selectedTool)
        );
      } else if (selectedTool === 'eraser') {
        canvasState.removeEventListener('mousedown', (e) =>
          handleMouseDownErasor(e, canvasState, erasorSettings)
        );
      } else if (selectedTool === 'color') {
        canvasState.removeEventListener('mousedown', (e) => {
          const ctx = canvasState.getContext('2d');
          const imageData = ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
          const pixel = imageData.data;
          const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
          setBrushSettings({ ...brushSettings, color });
          setHasColorBeenPicked(true);
        });
      };

    };
  }, [selectedTool, brushSettings, erasorSettings, hasSavedCrop, hasColorBeenPicked]);

  const handleBrushSettings = (e, type) => {
    if (type === 'color') {
      setBrushSettings({ ...brushSettings, color: e.target.value });
    } else if (type === 'brush') {
      setBrushSettings({ ...brushSettings, size: e.target.value });
    }
  };

  const handleEraserSettings = (e) => {
    setEraserSettings({ ...erasorSettings, size: e.target.value });
  };

  const handleCropSettings = (e) => {
    setCropSettings({ ...cropSettings, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleRevert = () => {
    const ctx = canvasState.getContext('2d');
    if (!originalData) return;
    const originalImage = new ImageData(originalData, dimensions.width, dimensions.height);
    ctx.putImageData(originalImage, 0, 0);
    setCurrentImageData(originalImage);
  };

  const handleBlur = () => {
    let pixels = null;
    const ctx = canvasState.getContext('2d');
    if (!originalData) {
      const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
      pixels = imageData.data;
      setOriginalData(pixels);
    }
    const newImageData = blurFilter(
      originalData !== null ? originalData : pixels,
      dimensions.width,
      dimensions.height
    );
    setCurrentImageData(newImageData);
    ctx.putImageData(newImageData, 0, 0);
  };

  const handleSaturation = () => {
    let pixels = null;
    const ctx = canvasState.getContext('2d');
    if (!originalData) {
      const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
      pixels = imageData.data;
      setOriginalData(pixels);
    }
    const newImageData = saturationFilter(
      originalData != null ? originalData : pixels,
      dimensions.width,
      dimensions.height,
      1.5
    );
    setCurrentImageData(newImageData);
    ctx.putImageData(newImageData, 0, 0);
  };

  const handleSharpness = () => {
    let pixels = null;
    const ctx = canvasState.getContext('2d');
    if (!originalData) {
      const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
      pixels = imageData.data;
      setOriginalData(pixels);
    }
    const newImageData = sharpnessFilter(
      originalData != null ? originalData : pixels,
      dimensions.width,
      dimensions.height
    );
    setCurrentImageData(newImageData);
    ctx.putImageData(newImageData, 0, 0);
  };

  const handleLevels = () => {
    let pixels = null;
    const ctx = canvasState.getContext('2d');
    if (!originalData) {
      const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
      pixels = imageData.data;
      setOriginalData(pixels);
    }
    const gamma = window.prompt('Enter the gamma value:');
    const newImageData = levelsFilter(
      originalData != null ? originalData : pixels,
      dimensions.width,
      dimensions.height,
      gamma
    );
    setCurrentImageData(newImageData);
    ctx.putImageData(newImageData, 0, 0);
  };

  const handleGrayscale = () => {
    let pixels = null;
    const ctx = canvasState.getContext('2d');
    if (!originalData) {
      const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
      pixels = imageData.data;
      setOriginalData(pixels);
    }
    const newImageData = grayscaleFilter(
      originalData != null ? originalData : pixels,
      dimensions.width,
      dimensions.height
    );
    setCurrentImageData(newImageData);
    ctx.putImageData(newImageData, 0, 0);
  };

  const handleInvert = () => {
    let pixels = null;
    const ctx = canvasState.getContext('2d');
    if (!originalData) {
      const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
      pixels = imageData.data;
      setOriginalData(pixels);
    }
    const newImageData = invertFilter(
      originalData != null ? originalData : pixels,
      dimensions.width,
      dimensions.height
    );
    setCurrentImageData(newImageData);
    ctx.putImageData(newImageData, 0, 0);
  };

  const buttonStyle = {
    color: '#fff',
    margin: '5px',
    ':hover': {
      backgroundColor: '#000059'
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
          <Tooltip title="Select" placement="right" onClick={() => setSelectedTool('select')}>
            <IconButton
              variant="contained"
              size="small"
              sx={
                selectedTool === 'select'
                  ? { backgroundColor: '#000059', ...buttonStyle }
                  : { backgroundColor: '#838383', ...buttonStyle }
              }
            >
              {<GiArrowCursor />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Brush" placement="right" onClick={() => setSelectedTool('brush')}>
            <IconButton
              id="brush"
              aria-controls={BrushOpen ? 'brush-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={BrushOpen ? true : undefined}
              onClick={(e) => { handleClick(e); setSelectedTool('brush') }}
              variant="contained"
              size="small"
              sx={
                selectedTool === 'brush'
                  ? { backgroundColor: '#000059', ...buttonStyle }
                  : { backgroundColor: '#838383', ...buttonStyle }
              }
            >
              {<BsFillBrushFill />}{' '}
            </IconButton>
          </Tooltip>
          <Menu
            id="brush-menu"
            open={BrushOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={() => setSelectedTool('brush')}
            MenuListProps={{
              'area-labelledby': 'brush'
            }}
          >
            <MenuItem
              sx={{
                width: '300px',
                p: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" id="input-slider" gutterBottom sx={{ mr: '1rem' }}>
                Brush Size:
              </Typography>
              <Slider
                size="small"
                defaultValue={1}
                aria-label="Small"
                valueLabelDisplay="auto"
                value={brushSettings.size}
                onChange={(e) => handleBrushSettings(e, 'brush')}
                min={1}
                max={100}
              />
            </MenuItem>
            <MenuItem
              sx={{
                width: '300px',
                p: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" id="input-slider" gutterBottom sx={{ mr: '1rem' }}>
                Brush Color:
              </Typography>
              <input
                type="color"
                id="myColorPicker"
                value={brushSettings.color}
                onChange={(e) => handleBrushSettings(e, 'color')}
              />
            </MenuItem>
            <MenuItem
              sx={{
                width: '300px',
                p: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: '#000059', color: '#fff', mr: '1rem' }}
                onClick={handleClose}
              >
                Save
              </Button>
            </MenuItem>
          </Menu>
          <Tooltip title="Eraser" placement="right" onClick={() => setSelectedTool('eraser')}>
            <IconButton
              id="eraser"
              aria-controls={EraserOpen ? 'eraser-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={EraserOpen ? true : undefined}
              onClick={handleClick}
              variant="contained"
              size="small"
              sx={
                selectedTool === 'eraser'
                  ? { backgroundColor: '#000059', ...buttonStyle }
                  : { backgroundColor: '#838383', ...buttonStyle }
              }
            >
              {<BsEraserFill />}{' '}
            </IconButton>
          </Tooltip>
            <Menu
              id="eraser-menu"
              open={EraserOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
              onClick={() => setSelectedTool('eraser')}
              MenuListProps={{
                'area-labelledby': 'eraser'
              }}
            >
              <MenuItem
                sx={{
                  width: '300px',
                  p: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography variant="body2" id="input-slider" gutterBottom sx={{ mr: '1rem' }}>
                  Eraser Size:
                </Typography>
                <Slider
                  size="small"
                  defaultValue={1}
                  value = {erasorSettings.size}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  onChange={(e) => handleEraserSettings(e)}
                  min={1}
                  max={100}
                />
              </MenuItem>
              <MenuItem
                sx={{
                  width: '300px',
                  p: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: '#000059', color: '#fff', mr: '1rem' }}
                  onClick={(e) => { setHasSavedCrop(true); handleClose(e)}}
                >
                  Save
                </Button>
              </MenuItem>
            </Menu>
          <Tooltip title="Crop" placement="right" onClick={() => setSelectedTool('crop')}>
            <IconButton
              id="crop"
              aria-controls={CropOpen ? 'crop-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={CropOpen ? true : undefined}
              onClick={handleClick}
              variant="contained"
              size="small"
              sx={
                selectedTool === 'crop'
                  ? { backgroundColor: '#000059', ...buttonStyle }
                  : { backgroundColor: '#838383', ...buttonStyle }
              }
            >
              {<BiCrop />}{' '}
            </IconButton>
          </Tooltip>
          <Menu
            id="crop-menu"
            open={CropOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={() => setSelectedTool('crop')}
            MenuListProps={{
              'area-labelledby': 'crop'
            }}
          >
            <MenuItem
              sx={{
                width: '300px',
                p: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" id="input-slider" gutterBottom sx={{ mr: '1rem' }}>
                Top:
              </Typography>
              <input type="number" name="top" value={cropSettings.top} onChange={(e) => handleCropSettings(e)} />
            </MenuItem>
            <MenuItem
              sx={{
                width: '300px',
                p: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" id="input-slider" gutterBottom sx={{ mr: '1rem' }}>
                Left:
              </Typography>
              <input type="number" name="left" value={cropSettings.left} onChange={(e) => handleCropSettings(e)} />
            </MenuItem>
            <MenuItem

              sx={{
                width: '300px',
                p: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" id="input-slider" gutterBottom sx={{ mr: '1rem' }}>
                Right:
              </Typography>
              <input type="number" name="right" value={cropSettings.right} onChange={(e) => handleCropSettings(e)} />
            </MenuItem>
            <MenuItem
              sx={{
                width: '300px',
                p: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" id="input-slider" gutterBottom sx={{ mr: '1rem' }}>
                Bottom:
              </Typography>
              <input type="number" name="bottom" value={cropSettings.bottom} onChange={(e) => handleCropSettings(e)} />
            </MenuItem>
            <MenuItem
              sx={{
                width: '300px',
                p: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: '#000059', color: '#fff', mr: '1rem' }}
                onClick={(e) => { setHasSavedCrop(true); handleClose(e)}}
              >
                Save
              </Button>
            </MenuItem>
          </Menu>
          <Tooltip title="Text" placement="right" onClick={() => setSelectedTool('text')}>
            <IconButton
              variant="contained"
              size="small"
              sx={
                selectedTool === 'text'
                  ? { backgroundColor: '#000059', ...buttonStyle }
                  : { backgroundColor: '#838383', ...buttonStyle }
              }
            >
              {<BiText />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Color Picker" placement="right" onClick={() => setSelectedTool('color')}>
            <IconButton
              id="color"
              aria-controls={hasColorBeenPicked ? 'color-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={hasColorBeenPicked ? true : undefined}
              onClick={(e) => { setSelectedTool('color'); handleClick(e)}}
              variant="contained"
              size="small"
              sx={
                selectedTool === 'color'
                  ? { backgroundColor: '#000059', ...buttonStyle }
                  : { backgroundColor: '#838383', ...buttonStyle }
              }
            >
              {<CgColorPicker />}{' '}
            </IconButton>
          </Tooltip>
          <Menu
            id="color-menu"
            open={hasColorBeenPicked}
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={() => setHasColorBeenPicked(false)}
            MenuListProps={{
              'area-labelledby': 'color'
            }}
          >
            <MenuItem
              sx={{
                width: '300px',
                p: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="body2" id="input-slider" gutterBottom sx={{ mr: '1rem' }}>
                Picked Color: {pickedColor}
              </Typography>
            </MenuItem>
            <MenuItem>
              <Box
                sx={{
                  width:'50px',
                  height:'50px',
                  backgroundColor: pickedColor,
                  borderRadius: '50%',
                }}
              >
              </Box>
            </MenuItem>
            <MenuItem
              sx={{
                width: '300px',
                p: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: '#000059', color: '#fff', mr: '1rem' }}
                onClick={(e) => { setHasColorBeenPicked(false); handleClose(e)}}
              >
                Close
              </Button>
            </MenuItem>
          </Menu>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Tooltip title="Revert" placement="right" onClick={handleRevert}>
            <IconButton
              variant="contained"
              size="small"
              sx={{ backgroundColor: '#838383', ...buttonStyle }}
            >
              {<AiOutlineUndo />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Blur" placement="right" onClick={handleBlur}>
            <IconButton
              variant="contained"
              size="small"
              sx={{ backgroundColor: '#838383', ...buttonStyle }}
            >
              {<MdLensBlur />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Sharpen" placement="right" onClick={handleSharpness}>
            <IconButton
              variant="contained"
              size="small"
              sx={{ backgroundColor: '#838383', ...buttonStyle }}
            >
              {<DiFsharp />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Hue/Saturation" placement="right" onClick={handleSaturation}>
            <IconButton
              variant="contained"
              size="small"
              sx={{ backgroundColor: '#838383', ...buttonStyle }}
            >
              {<GiAlienFire />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Levels" placement="right" onClick={handleLevels}>
            <IconButton
              variant="contained"
              size="small"
              sx={{ backgroundColor: '#838383', ...buttonStyle }}
            >
              {<GiLevelTwo />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Grayscale" placement="right" onClick={handleGrayscale}>
            <IconButton
              variant="contained"
              size="small"
              sx={{ backgroundColor: '#838383', ...buttonStyle }}
            >
              {<CgEditNoise />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Invert" placement="right" onClick={handleInvert}>
            <IconButton
              variant="contained"
              size="small"
              sx={{ backgroundColor: '#838383', ...buttonStyle }}
            >
              {<MdInvertColors />}{' '}
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Sidebar;
