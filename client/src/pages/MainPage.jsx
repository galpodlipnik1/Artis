import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Topbar, Sidebar, MainContent } from '../components/index';

const MainPage = () => {
  useEffect(() => {
    document.title = 'Artis | Editing...';
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flex: '0 0 auto' }}>
        <Topbar />
      </Box>
      <Box sx={{ display: 'flex', flex: '1 1 auto' }}>
        <Box sx={{ flex: '0 0 auto' }}>
          <Sidebar />
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <MainContent />
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
