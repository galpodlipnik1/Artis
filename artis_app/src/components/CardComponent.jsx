import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, ButtonBase, Divider } from '@mui/material';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { bgGrayColorDark, bgGrayColorLight } from '../constants/colors';
import { deletePreset } from '../actions/presets';

const CardComponent = ({ isDeleting, preset }) => {
  const navigate = useNavigate();
  const { setDimensions, setPresetsState } = useStateContext();

  const handleClick = () => {
    if (isDeleting) {
      deletePreset(preset._id);
      setPresetsState((prev) => prev.filter((p) => p._id !== preset._id));
    } else {
      setDimensions({ width: preset.dimensionX, height: preset.dimensionY });
      navigate('/edit/blank');
    }
  };
  return (
    <Card sx={{ maxWidth: 300, backgroundColor: bgGrayColorDark, borderRadius: '50px' }} raised>
      <ButtonBase sx={{ width: '100%', height: '100%' }} onClick={handleClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: bgGrayColorLight }}>
            {preset.name}
          </Typography>
          <Divider sx={{ backgroundColor: bgGrayColorLight, marginBottom: '5px' }} />
          <Typography variant="body2" sx={{ color: bgGrayColorLight }}>
            {preset.dimensionX}px x {preset.dimensionY}px
          </Typography>
          <Typography variant="body2" sx={{ color: bgGrayColorLight }}>
            Created: {new Date(preset.createdAt).toLocaleDateString('sl-SI')} |{' '}
            {preset.owner === '6409f695c0d9247e878e36cf' ? 'Devs' : 'You'}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default CardComponent;
