import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Paper, Pagination, Avatar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { bgGrayColorLight, bgGrayColorDark, sideBarBgColor } from '../constants/colors';
import { useStateContext } from '../context/ContextProvider';
import { getPublicImages } from '../actions/public';
import { PublicImageCard } from '../components/';
import { logoNoBg } from '../assets/';

const Public = () => {
  const navigate = useNavigate();
  const { user } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getPublicImages(page);
      setImages(data.populatedImages);
      setImageCount(data.publicImagesCount);
      setIsLoading(false);
    };
    fetchImages();
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
  }, [page]);

  return (
    <Box sx={{ width: '100wh', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
      <Box
        sx={{
          width: '100%',
          height: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: sideBarBgColor,
          my: '.3rem',
          borderTopLeftRadius: '30px',
          borderTopRightRadius: '30px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: '1rem',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/menu')}
        >
          <img src={logoNoBg} alt="logo" width="40px" height="40px" />
          <Typography variant="h4">Public Share</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: '2rem' }}>
          <Avatar
            sx={{
              bgcolor: 'darkmagenta',
              color: 'white',
              width: '40px',
              height: '40px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/menu')}
          >
            {user?.user.email.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6" sx={{ ml: '.3rem' }}>
            {user?.user.email.split('@')[0]}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: '90%',
          height: 'calc(100% - 150px)',
          flexGrow: 1,
          flexDirection: 'column',
          p: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: bgGrayColorDark
        }}
      >
        {!isLoading ? (
        <Grid
          container
          spacing={2}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            mr: '1rem',
            alignItems: 'flex-start'
          }}
        >
          {images.map((image, index) => (
            <Grid item xs={12} sm={3} md={3} lg={3} key={index}>
              <PublicImageCard image={image} />
            </Grid>
          ))}
        </Grid>
        ) : (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mb:'37%' }}>
            <CircularProgress />
          </Box>
        )}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: '1rem',
          }}
        >
          <Pagination
            count={Math.ceil(imageCount / 8)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="secondary"
            size="large"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Public;
