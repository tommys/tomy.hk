// src/components/ExploreRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/explore/archive', { replace: true });
  }, [navigate]);

  return null;
};

export default ExploreRedirect;