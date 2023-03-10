import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel
} from '@mui/material';
import { bgGrayColorLight, bgGrayColorDark, sideBarBgColor } from '../constants/colors';
import { createCloud } from '../actions/cloud';
import { createPublic } from '../actions/public';

const SaveToCloudPopup = ({ open, setOpen, canvas }) => {
  const [enteredName, setEnteredName] = useState('');
  const [value, setValue] = useState('public');

  const handleNameChange = (e) => {
    setEnteredName(e.target.value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const TextFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': { borderColor: 'white' },
      '& .MuiOutlinedInput-input': { color: 'white' },
      '& .MuiInputLabel-outlined': { color: 'white' },
      '& .MuiInputLabel-outlined.Mui-focused': { color: 'white' },
      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
    }
  };
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
          width: '50%',
          height: '50%',
          flexDirection: 'column',
          borderRadius: '30px',
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
            borderTopRightRadius: '30px',
            borderTopLeftRadius: '30px',
            mb: '.5rem'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              ml: '1rem',
              color: '#fff'
            }}
          >
            Save to Cloud
          </Typography>
          <Button
            variant="contained"
            sx={{
              mr: '1rem',
              backgroundColor: bgGrayColorLight,
              color: '#fff'
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start'
          }}
        >
          <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', mt: '3rem' }}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={TextFieldStyle}
              InputLabelProps={{ style: { color: bgGrayColorLight } }}
              value={enteredName}
              onChange={handleNameChange}
            />
            <FormControl sx={{ mt: '1rem' }}>
              <FormLabel sx={{ color: '#fff' }}>Privacy</FormLabel>
              <RadioGroup
                row
                aria-label="privacy"
                name="privacy"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="public" control={<Radio />} label="Public" />
                <FormControlLabel value="private" control={<Radio />} label="Private" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: bgGrayColorLight,
              color: '#fff'
            }}
            onClick={async () => {
              setOpen(false);
              const data = canvas.toDataURL('image/png');
              const res = await createCloud({
                name: enteredName,
                data,
                isPublic: value === 'public'
              });
              if (value === 'public') {
                createPublic(res._id);
              }
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SaveToCloudPopup;
