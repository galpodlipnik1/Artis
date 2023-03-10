import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, ButtonBase, Divider } from '@mui/material';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { bgGrayColorDark, bgGrayColorLight } from '../constants/colors';
import { deletePreset } from '../actions/presets';

const PublicImageCard = ({ image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/edit/image', { state: { imageData: image.image } });
  };
  return (
    <Card sx={{ maxWidth: 300, backgroundColor: bgGrayColorDark, borderRadius: '50px' }} raised>
      <CardMedia component="img" height="140" image={image.image} alt={image.name} />
      <ButtonBase sx={{ width: '100%', height: '100%' }} onClick={handleClick}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: bgGrayColorLight, fontWeight: 'bold' }}
          >
            {image.name}
          </Typography>
          <Divider sx={{ backgroundColor: bgGrayColorLight, marginBottom: '5px' }} />
          <Typography variant="body2" sx={{ color: bgGrayColorLight }}>
            Created At: {new Date(image.createdAt).toLocaleDateString('sl-SI')}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default PublicImageCard;
