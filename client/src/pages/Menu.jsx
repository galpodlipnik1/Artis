import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tooltip, IconButton, Typography, Avatar, Button } from '@mui/material';
import { AiFillFolderOpen, AiOutlineCloudDownload } from 'react-icons/ai';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { TbDimensions } from 'react-icons/tb';
import { VscNewFile } from 'react-icons/vsc';
import { TfiWorld } from 'react-icons/tfi';
import { logoNoBg } from '../assets';
import { bgGrayColorDark, sideBarBgColor, bgGrayColorLight } from '../constants/colors';
import { CloudPopup } from '../components';
import { useStateContext } from '../context/ContextProvider';

const Menu = () => {
  const navigate = useNavigate();
  const { user, setDimensions } = useStateContext();
  const [openCloudPopup, setOpenCloudPopup] = useState(false);

  const buttonStyle = {
    minWidth: '100px',
    minHeight: '100px',
    maxWidth: '100px',
    maxHeight: '100px',
    backgroundColor: sideBarBgColor,
    margin: '5px',
    ':hover': { backgroundColor: bgGrayColorLight }
  };
  useEffect(() => {
    document.title = 'Artis | Menu...';

    setDimensions({ height: 0, width: 0 });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('profile');
    navigate('/');
  };

  const handleBlank = () => {
    setDimensions({ height: 0, width: 0 });
    navigate('/edit/blank');
  };

  const handleOpenFromPC = () => {
    let imageData = '';
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        imageData = reader.result;
      };
      reader.readAsDataURL(file);

      setTimeout(() => {
        navigate('/edit/image', { state: { imageData } });
      }, 1000);
    };
    input.click();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh ', width: '100vw' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          flexDirection: 'row',
          padding: '1rem'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img src={logoNoBg} alt="logo" style={{ height: '50px', width: '50px' }} />
          <Typography variant="h4" sx={{ color: '#d3d3d3', fontWeight: 'bold' }}>
            Menu
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}
        >
          <Avatar
            sx={{ width: '50px', height: '50px', marginLeft: '1rem', backgroundColor: 'purple' }}
          >
            {user?.user.email.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            variant="h6"
            sx={{ color: '#d3d3d3', fontWeight: 'bold', marginLeft: '1rem' }}
          >
            {user?.user.email.slice(0, user?.user.email.indexOf('@'))}
          </Typography>
          <Button variant="contained" sx={{ marginLeft: '1rem' }} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: bgGrayColorDark,
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gridTemplateRows: 'repeat(auto-fit, minmax(100px, 1fr))',
            gridGap: '10px',
            width: '25%'
          }}
        >
          <Tooltip title="New blank" placement="top" onClick={handleBlank}>
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              <VscNewFile size="2rem" color="#d3d3d3" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open from pc" placement="top" onClick={handleOpenFromPC}>
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              <AiFillFolderOpen size="2rem" color="#d3d3d3" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open from cloud" placement="top" onClick={() => setOpenCloudPopup(true)}>
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              <AiOutlineCloudDownload size="2rem" color="#d3d3d3" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Preset Dimentions"
            placement="bottom"
            onClick={() => navigate('/dimensions')}
          >
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              <TbDimensions size="2rem" color="#d3d3d3" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Public" placement="bottom" onClick={() => navigate('/public')}>
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              <TfiWorld size="2rem" color="#d3d3d3" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account" placement="bottom" onClick={() => navigate('/account')}>
            <IconButton variant="contained" size="small" sx={buttonStyle}>
              <MdOutlineAccountCircle size="2rem" color="#d3d3d3" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '.1rem',
          backgroundColor: bgGrayColorDark
        }}
      >
        <Typography variant="body" sx={{ color: '#d3d3d3', fontWeight: 'bold' }}>
          &copy; {new Date().getFullYear()} Artis | All rights reserved
        </Typography>
      </Box>
      <CloudPopup open={openCloudPopup} setOpen={setOpenCloudPopup} />
    </Box>
  );
};

export default Menu;
