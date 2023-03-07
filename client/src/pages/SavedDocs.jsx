import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SavedDocs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/edit');
  }, []);

  return <div>SavedDocs</div>;
};

export default SavedDocs;
