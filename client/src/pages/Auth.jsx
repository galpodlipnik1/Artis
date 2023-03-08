import React, { useState, useEffect } from 'react';
import {
  Grow,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  Avatar,
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../actions/user';
import { useStateContext } from '../context/ContextProvider';

import { AiOutlineLock, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai ';
import { bgGrayColorDark } from '../constants/colors';

const Auth = () => {
  const navigate = useNavigate();
  const paperStyle = {
    width: '100%',
    padding: '1.5rem',
    margin: 'auto',
    backgroundColor: 'white',
    borderRadius: '20px'
  };
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser, user } = useStateContext();

  useEffect(() => {
    if (user && localStorage.getItem('profile')) {
      navigate('/loading');
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = null;
    if (isSignUp) {
      res = await signUp(form);
    } else {
      res = await signIn(form);
    }

    if (!res) {
      alert('Something went wrong.');
    } else {
      setUser(res);
      localStorage.setItem('profile', JSON.stringify(res));
      navigate('/');
    }
  };
  return (
    <Grow in>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundColor: bgGrayColorDark,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
        >
          <Paper elevation={24} sx={paperStyle}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Avatar
                  sx={{ bgcolor: bgGrayColorDark, margin: 'auto', width: '45px', height: '45px' }}
                >
                  <AiOutlineLock />
                </Avatar>
                <Grid item xs={12} sx={{ padding: '10px 0 0 0!important' }}>
                  <Typography fontSize="20px" align="center">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    name="email"
                    label="Email"
                    variant="standard"
                    required
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type={showPassword === false ? 'password' : 'text'}
                    name="password"
                    label="Password"
                    variant="standard"
                    required
                    fullWidth
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} mt="25px">
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ color: 'white', backgroundColor: bgGrayColorDark }}
                  >
                    Log In
                  </Button>
                </Grid>
                <Grid item xs={12} mt="25px">
                  <Button
                    variant="text"
                    fullWidth
                    sx={{ color: 'black' }}
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    New User? Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '.1rem',
            backgroundColor: bgGrayColorDark
          }}
        >
          <Typography variant="body" sx={{ color: '#d3d3d3', fontWeight: 'bold' }}>
            &copy; {new Date().getFullYear()} Artis | All rights reserved
          </Typography>
        </Box>
      </Box>
    </Grow>
  );
};

export default Auth;
