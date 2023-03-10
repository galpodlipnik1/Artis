import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, ButtonBase, Divider, IconButton } from '@mui/material';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { bgGrayColorDark, bgGrayColorLight } from '../constants/colors';
import { AiFillLike } from 'react-icons/ai';
import { BsCloudDownload } from 'react-icons/bs';
import { updatePublicImage } from '../actions/public';

const PublicImageCard = ({ image }) => {
  const { user } = useStateContext();
  const [newLikes, setNewLikes] = useState(image?.likes);
  const [isInLiked, setIsInLiked] = useState(false);

  useEffect(() => {
    if (user) {
      setIsInLiked(newLikes.includes(user.user._id));
    }
  }, [user, image, newLikes]);

  const handleClick = async() => {
    const userId = user.user._id

    const isInLiked = newLikes.includes(userId);
    setIsInLiked(isInLiked);
    let result = null;
    if (isInLiked) {
      const temp = newLikes.filter((id) => id !== userId);
      setNewLikes(temp);
      result = await updatePublicImage(image.id, temp);
    } else {
      const temp = [...newLikes, userId];
      setNewLikes(temp);
      result = await updatePublicImage(image.id, temp);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `${image.name}.png`;
    link.href = image.image;
    link.click();
  };

  const buttonStyle = {
    color: '#fff',
    margin: '5px',
    ':hover': {
      backgroundColor: '#000059'
    }
  };
  return (
    <Card sx={{ maxWidth: 300, backgroundColor: bgGrayColorDark, borderRadius: '50px' }} raised>
      <CardMedia component="img" height="140" image={image.image} alt={image.name} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%' }}>
        <CardContent sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: bgGrayColorLight, fontWeight: 'bold' }}
          >
            {image.name}
          </Typography>
          <IconButton
            variant="contained"
            size="small"
            sx={buttonStyle}
            onClick={handleDownload}
          >
            <BsCloudDownload color="white" />
          </IconButton>
          </Box>
          <Divider sx={{ backgroundColor: bgGrayColorLight, marginBottom: '5px' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
              variant="contained"
              size="small"
              sx={buttonStyle}
              onClick={handleClick}
            >
              <AiFillLike color={isInLiked ? 'red' : 'white'} />
            </IconButton>
            <Typography variant="body1" sx={{ color: bgGrayColorLight, fontWeight:'bold' }}>
              {newLikes.length}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: bgGrayColorLight }}>
            Created At: {new Date(image.createdAt).toLocaleDateString('sl-SI')}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PublicImageCard;
