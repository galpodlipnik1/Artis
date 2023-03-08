import React, { useState, useEffect } from 'react';
import { Stack, Paper, Divider, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logoNoBg } from '../assets/index';
import { useStateContext } from '../context/ContextProvider';

const Topbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { dimensions, mousePos, zoom } = useStateContext();

  const handleClick = (event) => {
    setAnchorEl({
      el: event.currentTarget,
      controller: event.currentTarget.getAttribute('aria-controls')
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <MenuItem onClick={handleClose}>New</MenuItem>
          <MenuItem onClick={handleClose}>Open</MenuItem>
          <MenuItem onClick={handleClose}>Save</MenuItem>
          <MenuItem onClick={handleClose}>Save As</MenuItem>
          <MenuItem onClick={handleClose}>Page Setup</MenuItem>
          <MenuItem onClick={handleClose}>Print</MenuItem>
          <MenuItem onClick={handleClose}>Exit</MenuItem>
        </Menu>
        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff' }} />
        <Button
          variant="contained"
          size="small"
          id="edit-button"
          aria-controls="edit-menu"
          aria-haspopup="true"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            backgroundColor: '#5d5d5d',
            color: '#fff',
            ':hover': { backgroundColor: '#838383' }
          }}
        >
          Edit
        </Button>
        <Menu
          id="edit-menu"
          anchorEl={anchorEl ? anchorEl.el : null}
          open={Boolean(anchorEl) && anchorEl.controller === 'edit-menu'}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'edit-button'
          }}
          sx={{
            '& .MuiMenu-list': {
              backgroundColor: '#5d5d5d',
              color: '#fff'
            }
          }}
        >
          <MenuItem onClick={handleClose}>Undo</MenuItem>
          <MenuItem onClick={handleClose}>Redo</MenuItem>
          <MenuItem onClick={handleClose}>Cut</MenuItem>
          <MenuItem onClick={handleClose}>Copy</MenuItem>
          <MenuItem onClick={handleClose}>Paste</MenuItem>
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
          <MenuItem onClick={handleClose}>Zoom</MenuItem>
          <MenuItem onClick={handleClose}>Status Bar</MenuItem>
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
          <MenuItem onClick={handleClose}>Font</MenuItem>
          <MenuItem onClick={handleClose}>Align</MenuItem>
          <MenuItem onClick={handleClose}>Borders</MenuItem>
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
          <MenuItem onClick={handleClose}>View Help</MenuItem>
          <MenuItem onClick={handleClose}>Send Feedback</MenuItem>
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
    </Paper>
  );
};

export default Topbar;
