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
  Button,
  TextField,
  Autocomplete
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
import { crop, drawRect } from '../functions/crop';
import { browserFonts } from '../constants/fonts';

import {
  blurFilter,
  saturationFilter,
  sharpnessFilter,
  levelsFilter,
  grayscaleFilter,
  invertFilter
} from '../functions/filters';
import { colorPicker, rgbToHex } from '../functions/color';

const Sidebar = () => {
  const {
    canvasState,
    setZoom,
    dimensions,
    zoom,
    mousePos,
    setPickedColorState,
    pickedColorState
  } = useStateContext();
  const [originalData, setOriginalData] = useState(null);
  const [currentImageData, setCurrentImageData] = useState(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [brushSettings, setBrushSettings] = useState({ color: '#000000', size: 10 });
  const [erasorSettings, setEraserSettings] = useState({ size: 10 });
  const [anchorEl, setAnchorEl] = useState(null);
  const BrushOpen = Boolean(anchorEl && anchorEl.id === 'brush');
  const EraserOpen = Boolean(anchorEl && anchorEl.id === 'eraser');
  const TextOpen = Boolean(anchorEl && anchorEl.id === 'text');
  const [textSettings, setTextSettings] = useState({
    text: '',
    fontSize: 12,
    fontColor: '#000000',
    fontFamily: 'Arial',
    fontWeight: 'Normal'
  });
  const [availableFonts, setAvailableFonts] = useState([]);

  useEffect(() => {
    if (canvasState) {
      const ctx = canvasState.getContext('2d');
      const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
      setOriginalData(imageData);
      setCurrentImageData(imageData);
    }
  }, [canvasState]);

  const handleCrop = () => {
    let cropPos = [];
    let isDrawing = false;

    canvasState.addEventListener('mousedown', (e) => {
      const x = e.clientX - canvasState.offsetLeft;
      const y = e.clientY - canvasState.offsetTop;
      cropPos.push({ x, y });
      isDrawing = true;

      canvasState.addEventListener('mousemove', (e) => {
        drawRect(e, cropPos, canvasState, isDrawing);
      });

      canvasState.addEventListener('mouseup', (e) => {
        const x = e.clientX - canvasState.offsetLeft;
        const y = e.clientY - canvasState.offsetTop;
        cropPos.push({ x, y });
        crop(cropPos, canvasState);
        isDrawing = false;

        canvasState.removeEventListener('mousemove', (e) => {
          drawRect(e, cropPos, canvasState);
        });

        canvasState.removeEventListener('mousedown', (e) => {
          const x = e.clientX - canvasState.offsetLeft;
          const y = e.clientY - canvasState.offsetTop;
          cropPos.push({ x, y });
        });
      });
    });

  };
  
  const handleMouseDownText = (e) => {
    const { text, fontSize, fontColor, fontFamily, fontWeight } = textSettings;
    const ctx = canvasState.getContext('2d');
    const rect = canvasState.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontColor;
    ctx.fillText(text, x, y);
  };

  const handleMouseDownColor = (event) => {
    const color = colorPicker(event, canvasState);
    setPickedColorState(color);
    setSelectedTool('select');
  };

  useEffect(() => {
    const handleMouseDownBrush = (e) => handleMouseDown(e, canvasState, brushSettings);
    const handleMouseDownEraser = (e) => handleMouseDownErasor(e, canvasState, erasorSettings);

    if (selectedTool === 'brush') {
      canvasState.addEventListener('mousedown', handleMouseDownBrush);
    } else if (selectedTool === 'eraser') {
      canvasState.addEventListener('mousedown', handleMouseDownEraser);
    } else if (selectedTool === 'crop') {
    } else if (selectedTool === 'text') {
      canvasState.addEventListener('mousedown', handleMouseDownText);
    } else if (selectedTool === 'color') {
      canvasState.addEventListener('mousedown', handleMouseDownColor);
    }

    return () => {
      if (selectedTool === 'brush') {
        canvasState.removeEventListener('mousedown', handleMouseDownBrush);
      } else if (selectedTool === 'eraser') {
        canvasState.removeEventListener('mousedown', handleMouseDownEraser);
      } else if (selectedTool === 'text') {
        canvasState.removeEventListener('mousedown', handleMouseDownText);
      } else if (selectedTool === 'color') {
        canvasState.removeEventListener('mousedown', handleMouseDownColor);
      }
    };
  }, [selectedTool, brushSettings, erasorSettings, textSettings]);

  useEffect(() => {
    const fonts = grouped(browserFonts);
    setAvailableFonts(fonts);
  }, []);

  const handleTextSettings = (e) => {
    setTextSettings({ ...textSettings, [e.target.name]: e.target.value });
  };
  const handleFontFamily = (value) => {
    setTextSettings({ ...textSettings, fontFamily: value.name });
  };

  const handleBrushSettings = (e, type) => {
    if (type === 'color') {
      setBrushSettings({ ...brushSettings, color: e.target.value });
    } else if (type === 'brush') {
      setBrushSettings({ ...brushSettings, size: e.target.value });
    } else if (type === 'colorPicker') {
      if (e.target.checked) setBrushSettings({ ...brushSettings, color: pickedColorState });
    }
  };

  const handleEraserSettings = (e) => {
    setEraserSettings({ ...erasorSettings, size: e.target.value });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const grouped = (fonts) => {
    const options = fonts.map((option) => {
      const firstLetter = option.name.charAt(0).toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option
      };
    });

    return options;
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
    const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
    pixels = imageData.data;
    const newImageData = blurFilter(pixels, dimensions.width, dimensions.height);
    setCurrentImageData(newImageData);
    ctx.putImageData(newImageData, 0, 0);
  };

  const handleSaturation = () => {
    let pixels = null;
    const ctx = canvasState.getContext('2d');
    const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
    pixels = imageData.data;
    const newImageData = saturationFilter(pixels, dimensions.width, dimensions.height, 1.5);
    setCurrentImageData(newImageData);
    ctx.putImageData(newImageData, 0, 0);
  };

  const handleSharpness = () => {
    let pixels = null;
    const ctx = canvasState.getContext('2d');
    const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
    pixels = imageData.data;
    const newImageData = sharpnessFilter(pixels, dimensions.width, dimensions.height);
    setCurrentImageData(newImageData);
    ctx.putImageData(newImageData, 0, 0);
  };

  const handleLevels = () => {
    let pixels = null;
    const ctx = canvasState.getContext('2d');
    if (!originalData) {
      const imageData = ctx.getImageData(0, 0, dimensions.width, dimensions.height);
      pixels = imageData.data;
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
              onClick={(e) => {
                handleClick(e);
                setSelectedTool('brush');
              }}
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
                value={
                  brushSettings.color.charAt(0) === 'r'
                    ? rgbToHex(brushSettings.color)
                    : brushSettings.color
                }
                onChange={(e) => handleBrushSettings(e, 'color')}
              />
            </MenuItem>
            {pickedColorState !== 'ni izbrana' && (
              <MenuItem
                sx={{
                  width: '300px',
                  p: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <label htmlFor="checkbox">Use color picked color</label>
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={(e) => handleBrushSettings(e, 'colorPicker')}
                />
              </MenuItem>
            )}
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
                value={erasorSettings.size}
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
                onClick={(e) => {
                  handleClose(e);
                }}
              >
                Save
              </Button>
            </MenuItem>
          </Menu>
          <Tooltip title="Crop" placement="right" onClick={() => setSelectedTool('crop')}>
            <IconButton
              id="crop"
              variant="contained"
              size="small"
              onClick={() => {
                setSelectedTool('crop');
                handleCrop();
              }}
              sx={
                selectedTool === 'crop'
                  ? { backgroundColor: '#000059', ...buttonStyle }
                  : { backgroundColor: '#838383', ...buttonStyle }
              }
            >
              {<BiCrop />}{' '}
            </IconButton>
          </Tooltip>
          <Tooltip title="Text" placement="right" onClick={() => setSelectedTool('text')}>
            <IconButton
              id="text"
              aria-controls={TextOpen ? 'crop-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={TextOpen ? true : undefined}
              onClick={handleClick}
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
          <Menu
            id="text-menu"
            open={TextOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={() => setSelectedTool('text')}
            MenuListProps={{
              'area-labelledby': 'text'
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
                Text:
              </Typography>
              <TextField
                id="outlined-basic"
                label="Text"
                variant="outlined"
                value={textSettings.text}
                onChange={(e) => handleTextSettings(e)}
                onKeyDown={(e) => e.stopPropagation()}
                name="text"
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
                Font Size:
              </Typography>
              <input
                type="number"
                name="fontSize"
                value={textSettings.fontSize}
                onChange={(e) => handleTextSettings(e)}
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
                Font Color:
              </Typography>
              <input
                type="color"
                name="fontColor"
                value={textSettings.fontColor}
                onChange={(e) => handleTextSettings(e)}
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
                Font Family:
              </Typography>
              {availableFonts && availableFonts.length > 0 && (
                <Autocomplete
                  id="Font Family"
                  options={availableFonts?.sort(
                    (a, b) => -b?.firstLetter.localeCompare(a?.firstLetter)
                  )}
                  groupBy={(availableFonts) => availableFonts.firstLetter}
                  getOptionLabel={(availableFonts) => availableFonts.name}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Font Family" variant="outlined" />
                  )}
                  onChange={(e, value) => handleFontFamily(value)}
                />
              )}
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
                Font Weight:
              </Typography>
              <select
                name="fontWeight"
                value={textSettings.fontWeight}
                onChange={(e) => handleTextSettings(e)}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="bolder">Bolder</option>
                <option value="lighter">Lighter</option>
              </select>
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
                sx={{ backgroundColor: '#000059', color: '#fff' }}
                onClick={handleClose}
              >
                Save
              </Button>
            </MenuItem>
          </Menu>

          <Tooltip title="Color Picker" placement="right" onClick={() => setSelectedTool('color')}>
            <IconButton
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
