import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Button, Divider } from '@mui/material';
import { userStats } from '../actions/status'
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const data = await userStats(user?.user?._id);
      setStats(data);
    }
    fetchStats();
  }, [user?.user?._id]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Avatar
        sx={{
          width: 100,
          height: 100,
          marginBottom: 2,
        }}
      />
      <Typography variant="h5" component="h1" gutterBottom>
        {user?.user?.email.split('@')[0]}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>

      </Typography>
      <Box>
        <Divider sx={{ marginTop: 2, marginBottom: 2, bgcolor:'white' }} />
        <Typography variant="h6" component="h2" gutterBottom>
          Number of Posts: {stats?.numOfPosts}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Number of Likes: {stats?.numOfLikes}
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2, bgcolor:'white' }} />
      </Box>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => navigate('/menu')}>
        Back
      </Button>
    </Box>
  )
};

export default Account;
