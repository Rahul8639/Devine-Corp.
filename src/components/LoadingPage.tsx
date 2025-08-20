import React from 'react';

interface LoadingPageProps {
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ message }) => {
  return (
    <div className="loading-page">
      <div className="loading-text">{message ?? 'Loading...'}</div>
      <div className="loading-spinner-bottom">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
