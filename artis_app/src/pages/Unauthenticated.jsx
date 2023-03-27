import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthenticated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      //localStorage.removeItem('profile');
      navigate('/');
    }, 3000);
  }, [navigate]);

  return (
    <div
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <h1>Error: 403 - forbidden</h1>
    </div>
  );
};

export default Unauthenticated;
