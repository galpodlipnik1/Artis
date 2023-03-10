import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { bgGrayColorLight, bgGrayColorDark, sideBarBgColor } from '../constants/colors';
import { CloudImageCard } from '.';
import { getCloud } from '../actions/cloud';

const StatusPopup = ({ open, setOpen }) => {
  const [cloudImages, setCloudImages] = useState([]);
  const [isDeleting, setIsDeleted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCloudImages = async () => {
      const res = await getCloud();
      setCloudImages(res);
      setIsLoaded(true);
    };
    fetchCloudImages();
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: sideBarBgColor
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '60px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: bgGrayColorDark,
            borderRadius: '30px',
            my: '.5rem'
          }}
        >
          <Typography variant="h6" sx={{ color: bgGrayColorLight, fontWeight: 'bold', ml: '30px' }}>
            Cloud Images
          </Typography>
          <Button variant="contained" sx={{ mr: '1rem' }}>
            Delete
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgGrayColorDark,
            borderRadius: '30px'
          }}
        >
          <Box sx={{ width: '100%', height: '100%', flexGrow: 1, p: 4 }}>
            {isLoaded ? (
              <Box>
                <Grid container spacing={2}>
                  {cloudImages?.map((cloudImage) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={cloudImage._id}
                      sx={{ marginBottom: '20px' }}
                    >
                      <CloudImageCard
                        cloudImage={cloudImage}
                        isDeleting={isDeleting}
                        setCloudImages={setCloudImages}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '60px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgGrayColorDark,
            borderRadius: '30px',
            my: '.5rem'
          }}
        >
          <Button
            variant="contained"
            sx={{ marginLeft: '1rem' }}
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StatusPopup;
