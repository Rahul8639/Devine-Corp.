import React from 'react';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-text">Loading...</div>
      <div className="loading-spinner-bottom">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
