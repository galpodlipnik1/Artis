import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Avatar,
  Box,
  IconButton
} from '@mui/material';
import { logoNoBg, logo } from '../assets';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Box
        sx={{
          width: '100%',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '30px',
          my: '.5rem'
        }}
      >
        <IconButton onClick={() => navigate('/menu')}>
          <IoMdArrowRoundBack size={30} />
        </IconButton>
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Roboto' }}>
          About Artis
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid item xs={12} sm={6}>
          <Card sx={{ maxWidth: '600px', margin: 'auto' }}>
            <CardHeader
              avatar={
                <Avatar>
                  <img src={logo} alt="Artis logo" width={40} height={40} />
                </Avatar>
              }
              title="Artis"
              subheader="Photoshop Remake"
            />
            <CardMedia
              component="img"
              image={logoNoBg}
              title="Artis logo"
              sx={{ height: '300px', width: '100%' }}
            />
            <CardContent>
              <Typography variant="body1" component="p">
                Artis is a powerful image editing tool that allows you to create stunning graphics
                and manipulate photos with ease. With a user-friendly interface and a comprehensive
                set of tools, Artis is perfect for both beginners and professionals alike.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
