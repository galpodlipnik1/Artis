import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, Button, TextField } from '@mui/material';
import { bgGrayColorLight, bgGrayColorDark, sideBarBgColor } from '../constants/colors';
import { dbStatus, serverStatus } from '../actions/status';
import { useStateContext } from '../context/ContextProvider';

const StatusPopup = () => {
  const { statusBar, setStatusBar } = useStateContext();
  const [statuses, setStatuses] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (statusBar) {
      setOpen(true);
    }
  }, [statusBar]);

  useEffect(() => {
    const getStatuses = async () => {
      let latency = 0;

      const start = new Date().getTime();
      const dbStatuses = await dbStatus();
      latency = new Date().getTime() - start;
      const serverStatuses = await serverStatus();
      setStatuses([dbStatuses, serverStatuses, latency]);
    };
    getStatuses();
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setStatusBar(false);
      }}
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
            Page Status
          </Typography>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ padding: '10px', color: 'gray' }}
          >
            Server Status:
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            color={statuses[0]?.status === 'OK' ? 'green' : 'red'}
            sx={{ padding: '10px' }}
          >
            {`${statuses[0]?.status} | ${statuses[0]?.message}`}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ padding: '10px', color: 'gray' }}
          >
            Database Status:
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            color={statuses[1]?.status === 'OK' ? 'green' : 'red'}
            sx={{ padding: '10px' }}
          >
            {`${statuses[1]?.status} | ${statuses[1]?.message}`}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            sx={{ padding: '10px', color: 'gray' }}
          >
            Latency:
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            color={statuses[2] < 500 ? 'green' : 'red'}
            sx={{ padding: '10px' }}
          >
            {statuses[2]} ms
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%'
            }}
          ></Box>
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
              onClick={() => {
                setOpen(false);
                setStatusBar(false);
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default StatusPopup;
