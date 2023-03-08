import React, { useState, useEffect } from 'react';
import { logo, logoNoBg } from '../assets/index';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dbStatus, serverStatus } from '../actions/status';

import '../style.css';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [dbStatusRes, setDbStatusRes] = useState(null);
  const [serverStatusRes, setServerStatusRes] = useState(null);
  const [latency, setLatency] = useState(null);
  const [status, setStatus] = useState('Loading...');

  const navigate = useNavigate();

  useEffect(() => {
    const checkServerStatus = async () => {
      const start = new Date().getTime();
      const serverStatusRes = await serverStatus();
      const end = new Date().getTime();
      setLatency(end - start);
      setServerStatusRes(serverStatusRes);
    };
    checkServerStatus();

    const checkDbStatus = async () => {
      const dbStatusRes = await dbStatus();
      setDbStatusRes(dbStatusRes);
    };
    checkDbStatus();
  }, []);

  useEffect(() => {
    document.title = 'Artis | Loading...';

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setLoadingFinished(true);
          setProgress(100);
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (loadingFinished) {
      const loadingPage = document.querySelector('#logoImg');
      loadingPage.classList.remove('loadingImg');
      loadingPage.classList.add('finnishedImg');
      setTimeout(() => {
        navigate('/menu');
      }, 2000);
    }
  }, [loadingFinished]);

  useEffect(() => {
    if (progress <= 33) {
      setStatus({
        status: `Checking server status... ${serverStatusRes?.status}`,
        color: `${serverStatusRes?.status === 'OK' ? 'white' : 'red'}`
      });
    } else if (progress <= 66) {
      setStatus({
        status: `Checking database status... ${dbStatusRes?.status}`,
        color: `${dbStatusRes?.status === 'OK' ? 'white' : 'red'}`
      });
    } else {
      setStatus({
        status: `Checking latency... ${latency}ms`,
        color: `${latency < 500 ? 'white' : 'red'}`
      });
    }
  }, [progress, serverStatusRes, dbStatusRes, latency]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <img id="logoImg" src={logoNoBg} alt="logo" className="loadingImg" />
      <Box sx={{ width: '30%', height: '10px', marginTop: '20px' }}>
        <LinearProgress
          variant="determinate"
          color={loadingFinished ? 'success' : 'inherit'}
          value={progress}
        />
      </Box>
      <Box sx={{ width: '30%', height: '10px', marginTop: '20px' }}>
        <Typography variant="body2" color={status.color}>
          {status.status}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingPage;
