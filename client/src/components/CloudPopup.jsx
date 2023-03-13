import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, Button, Grid, CircularProgress, Pagination } from '@mui/material';
import { bgGrayColorLight, bgGrayColorDark, sideBarBgColor } from '../constants/colors';
import { CloudImageCard } from '.';
import { getCloud } from '../actions/cloud';

const StatusPopup = ({ open, setOpen }) => {
  const [cloudImages, setCloudImages] = useState([]);
  const [imagesCount, setImagesCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCloudImages = async () => {
      const res = await getCloud(page);
      setCloudImages(res.cloudImages);
      setImagesCount(res.countCloudImages);
      setIsLoaded(true);
    };
    fetchCloudImages();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setIsLoaded(false);
  }, [page]);

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
            height: '70px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: bgGrayColorDark,
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            my: '.5rem'
          }}
        >
          <Typography variant="h6" sx={{ color: bgGrayColorLight, fontWeight: 'bold', ml: '30px' }}>
            Cloud Images
          </Typography>
          {isDeleting && (
            <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold', mr: '30px' }}>
              Deleting...
            </Typography>
          )}
          <Box>
            <Button
              variant="contained"
              sx={{ mr: '1rem', borderRadius: '50px' }}
              onClick={() => setOpen(false)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{ mr: '1rem', borderRadius: '50px' }}
              onClick={() => setIsDeleting(!isDeleting)}
            >
              Delete
            </Button>
          </Box>
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
            borderBottomLeftRadius: '30px',
            borderBottomRightRadius: '30px'
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
                      sm={2}
                      md={2}
                      lg={3}
                      key={cloudImage._id}
                      sx={{ marginBottom: '20px' }}
                    >
                      <CloudImageCard
                        cloudImage={cloudImage}
                        isDeleting={isDeleting}
                        setCloudImages={setCloudImages}
                        setIsDeleting={setIsDeleting}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgColor: bgGrayColorLight,
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <Pagination
                    count={Math.ceil(imagesCount / 8)}
                    page={page}
                    onChange={handleChange}
                    color="secondary"
                  />
                </Box>
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
      </Box>
    </Modal>
  );
};

export default StatusPopup;
