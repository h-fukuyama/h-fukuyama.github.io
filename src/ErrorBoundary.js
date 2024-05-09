// ErrorBoundary.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorBoundary(props) {
  const navigate = useNavigate();

  // エラーが発生したら/resetに遷移する
  const handleOnError = (error, errorInfo) => {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    navigate('/reset');
  };

  return (
    <React.ErrorBoundary onError={handleOnError}>
      {props.children}
    </React.ErrorBoundary>
  );
}

export default ErrorBoundary;
