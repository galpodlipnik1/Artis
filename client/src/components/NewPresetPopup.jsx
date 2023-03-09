import React, { useState } from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';
import { bgGrayColorLight, bgGrayColorDark, sideBarBgColor } from '../constants/colors';
import { createPreset } from '../actions/presets';
import { useStateContext } from '../context/ContextProvider';


const NewPresetPopup = ({ open, setOpen }) => {
  const { presetsState, setPresetsState } = useStateContext();
  const [presetDetails, setPresetDetails] = useState({ name: '', width: 0, height: 0 });

  const handleChange = (e) => {
    setPresetDetails({ ...presetDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if(presetDetails.width > 1400 || presetDetails.height > 600) {
      alert('Please enter dimensions less than 1400x600');
      setPresetDetails({ name: '', width: 0, height: 0 });
      return;
    }
    const res = await createPreset(presetDetails);
    setPresetsState([...presetsState, res]);
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
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: '70%',
            height: '50%',
            backgroundColor: bgGrayColorDark,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderRadius: '30px'
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="div"
            gutterBottom
            sx={{ padding: '10px', color: 'gray' }}
          >
            New Preset
          </Typography>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ padding: '10px', color: 'gray' }}
          >
            Preset Name:
          </Typography>
          <TextField
            id="outlined-basic"
            name="name"
            label="Preset Name"
            variant="outlined"
            sx={TextFieldStyle}
            InputLabelProps={{ style: { color: bgGrayColorLight } }}
            value={presetDetails.name}
            onChange={handleChange}
            required
          />
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ padding: '10px', color: 'gray' }}
          >
            Preset values:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%'
            }}
          >
            <TextField
              id="outlined-basic"
              name="width"
              label="Width(X)"
              variant="outlined"
              sx={TextFieldStyle}
              InputLabelProps={{ style: { color: bgGrayColorLight } }}
              value={presetDetails.width}
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              name="height"
              label="Height(Y)"
              variant="outlined"
              sx={TextFieldStyle}
              InputLabelProps={{ style: { color: bgGrayColorLight } }}
              value={presetDetails.height}
              onChange={handleChange}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%'
            }}
          >
            <Button
              variant="contained"
              sx={{ margin: '15px', backgroundColor: bgGrayColorLight, color: sideBarBgColor }}
              onClick={() => { handleSubmit(); setOpen(false); }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              sx={{ margin: '15px', backgroundColor: bgGrayColorLight, color: sideBarBgColor }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewPresetPopup;
