import React, { useState, useEffect } from 'react';
import { Stack, Paper, Divider, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logoNoBg } from '../assets/index';
import { useStateContext } from '../context/ContextProvider'
import { SaveToCloudPopup } from '../components/'
import {
  handleTopBarFile,
  handleTopBarView,
  handleTopBarFormat,
  handleTopBarHelp
} from '../functions/handlerExport';

const Topbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCloudSaving, setIsCloudSaving] = useState(false);
  const { dimensions, mousePos, zoom, canvasState, setStatusBar, statusBar } = useStateContext();

  const handleClick = (event) => {
    setAnchorEl({
      el: event.currentTarget,
      controller: event.currentTarget.getAttribute('aria-controls')
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (el, menuType) => {
    if (menuType === 'File') {
      if(el === 'Save to cloud'){
        setIsCloudSaving(true);
      }
      handleTopBarFile(el, canvasState, navigate);
    } else if (menuType === 'View') {
      handleTopBarView(el, setStatusBar, statusBar);
    } else if (menuType === 'Format') {
      handleTopBarFormat(el);
    } else if (menuType === 'Help') {
      handleTopBarHelp(el, navigate);
    }
    handleClose();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        height: '50px',
        borderRadius: '0px',
        backgroundColor: '#0e151c',
        color: '#fff',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center'
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: '100%',
          height: '20px',
          marginLeft: '5px',
          borderRadius: '0px',
          backgroundColor: '#0e151c',
          color: '#fff',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center'
        }}
      >
        <Link to="/menu" style={{ textDecoration: 'none', color: '#fff', margin: '0 6px 0 6px' }}>
          <img src={logoNoBg} alt="logo" style={{ height: '40px', width: '40px' }} />
        </Link>
        <Button
          variant="contained"
          size="small"
          id="file-button"
          aria-controls="file-menu"
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            backgroundColor: '#5d5d5d',
            color: '#fff',
            ':hover': { backgroundColor: '#838383' }
          }}
        >
          File
        </Button>
        <Menu
          id="file-menu"
          anchorEl={anchorEl ? anchorEl.el : null}
          open={Boolean(anchorEl) && anchorEl.controller === 'file-menu'}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'file-button'
          }}
          sx={{
            '& .MuiMenu-list': {
              backgroundColor: '#5d5d5d',
              color: '#fff'
            }
          }}
        >
          <MenuItem onClick={() => handleMenuClick('New', 'File')}>New</MenuItem>
          <MenuItem onClick={() => handleMenuClick('Open', 'File')}>Open</MenuItem>
          <MenuItem onClick={() => handleMenuClick('Save to cloud', 'File')}>
            Save to cloud
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick('Save File', 'File')}>Save File</MenuItem>
          <MenuItem onClick={() => handleMenuClick('Page Setup', 'File')}>Page Setup</MenuItem>
          <MenuItem onClick={() => handleMenuClick('Print', 'File')}>Print</MenuItem>
          <MenuItem onClick={() => handleMenuClick('Exit', 'File')}>Exit</MenuItem>
        </Menu>
        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff' }} />
        <Button
          variant="contained"
          size="small"
          id="view-button"
          aria-controls="view-menu"
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            backgroundColor: '#5d5d5d',
            color: '#fff',
            ':hover': { backgroundColor: '#838383' }
          }}
        >
          View
        </Button>
        <Menu
          id="view-menu"
          anchorEl={anchorEl ? anchorEl.el : null}
          open={Boolean(anchorEl) && anchorEl.controller === 'view-menu'}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'view-button'
          }}
          sx={{
            '& .MuiMenu-list': {
              backgroundColor: '#5d5d5d',
              color: '#fff'
            }
          }}
        >
          <MenuItem onClick={() => handleMenuClick('Status Bar', 'View')}>Status Bar</MenuItem>
        </Menu>
        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff' }} />
        <Button
          variant="contained"
          size="small"
          id="insert-button"
          aria-controls="insert-menu"
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            backgroundColor: '#5d5d5d',
            color: '#fff',
            ':hover': { backgroundColor: '#838383' }
          }}
        >
          Format
        </Button>
        <Menu
          id="insert-menu"
          anchorEl={anchorEl ? anchorEl.el : null}
          open={Boolean(anchorEl) && anchorEl.controller === 'insert-menu'}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'insert-button'
          }}
          sx={{
            '& .MuiMenu-list': {
              backgroundColor: '#5d5d5d',
              color: '#fff'
            }
          }}
        >
          <MenuItem onClick={() => handleMenuClick('Font', 'Format')}>Font</MenuItem>
          <MenuItem onClick={() => handleMenuClick('Align', 'Format')}>Align</MenuItem>
          <MenuItem onClick={() => handleMenuClick('Borders', 'Format')}>Borders</MenuItem>
        </Menu>
        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff' }} />
        <Button
          variant="contained"
          size="small"
          id="help-button"
          aria-controls="help-menu"
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            backgroundColor: '#5d5d5d',
            color: '#fff',
            ':hover': { backgroundColor: '#838383' }
          }}
        >
          Help
        </Button>
        <Menu
          id="help-menu"
          anchorEl={anchorEl ? anchorEl.el : null}
          open={Boolean(anchorEl) && anchorEl.controller === 'help-menu'}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'help-button'
          }}
          sx={{
            '& .MuiMenu-list': {
              backgroundColor: '#5d5d5d',
              color: '#fff'
            }
          }}
        >
          <MenuItem onClick={() => handleMenuClick('Send Feedback', 'Help')}>
            Send Feedback
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick('About', 'Help')}>About Artis</MenuItem>
        </Menu>
        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff' }} />
        <Typography
          variant="body"
          sx={{ marginLeft: 'auto', marginRight: '5px', fontSize: '12px', color: '#d3d3d3' }}
        >
          Dimensions: {dimensions.width} x {dimensions.height}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff' }} />
        <Typography variant="body" sx={{ marginRight: '5px', fontSize: '12px', color: '#d3d3d3' }}>
          Position: {mousePos.x}, {mousePos.y}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff' }} />
        <Typography variant="body" sx={{ marginRight: '5px', fontSize: '12px', color: '#d3d3d3' }}>
          Zoom: {Number(zoom).toFixed(0)}%
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff' }} />
      </Stack>
      <SaveToCloudPopup open={isCloudSaving} setOpen={setIsCloudSaving} canvas={canvasState} />
    </Paper>
  );
};

export default Topbar;
