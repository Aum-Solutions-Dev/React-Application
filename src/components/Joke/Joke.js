import React from 'react';
import { useLocation } from 'react-router-dom';

const Joke = () => {
  const location = useLocation();
  const joke = location.state?.joke || 'No joke available';

  return (
    <div className="joke-content">
      <h1>Your Dad Joke</h1>
      <p>{joke}</p>
    </div>
  );
};

export default Joke;