import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { bgGrayColorLight, bgGrayColorDark, sideBarBgColor } from '../constants/colors';
import { NewPresetPopup, CardDisplay } from '../components';
import { useNavigate } from 'react-router-dom';

const Dimensions = () => {
  const navigate = useNavigate();
  const [openNewPreset, setOpenNewPreset] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.title = 'Artis | Dimensions...';
  }, []);

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: bgGrayColorDark,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}
      >
        <Paper
          sx={{
            width: '100%',
            height: '60px',
            backgroundColor: sideBarBgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10px',
            borderRadius: '30px',
            padding: '5px'
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ padding: '10px', color: 'gray' }}
          >
            Dimensions Presets
          </Typography>
          {isDeleting && (
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ padding: '10px', color: 'red' }}
            >
              Deleting Presets
            </Typography>
          )}
          <Box>
            <Button
              variant="contained"
              sx={{ margin: '10px', backgroundColor: bgGrayColorLight, color: sideBarBgColor }}
              onClick={() => setOpenNewPreset(true)}
            >
              New Preset
            </Button>
            <Button
              variant="contained"
              onClick={() => setIsDeleting(!isDeleting)}
              sx={{ margin: '10px', backgroundColor: bgGrayColorLight, color: sideBarBgColor }}
            >
              Delete Preset
            </Button>
          </Box>
        </Paper>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '80%',
            backgroundColor: sideBarBgColor,
            marginTop: '10px',
            borderRadius: '30px',
            padding: '5px'
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ padding: '10px', color: 'gray' }}
          >
            <CardDisplay isDeleting={isDeleting} />
          </Typography>
        </Paper>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: '10%',
            backgroundColor: sideBarBgColor,
            marginTop: '10px',
            borderRadius: '30px',
            padding: '5px'
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate('/menu')}
            sx={{
              margin: '10px',
              backgroundColor: bgGrayColorLight,
              color: sideBarBgColor,
              width: '10%'
            }}
          >
            Back
          </Button>
        </Paper>
      </Box>
      <NewPresetPopup open={openNewPreset} setOpen={setOpenNewPreset} />
    </Box>
  );
};

export default Dimensions;
