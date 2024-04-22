// ResetComponent.js
import React from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';

const ResetComponent = () => {
  const { resetFile } = useFileContext(); // useFileContextを使ってFileContextからresetFileを取得
  const navigate = useNavigate();

  React.useEffect(() => {
    resetFile();
    navigate('/');
  }, [resetFile, navigate]);

  return (
    <div>
      <p>Resetting...</p>
    </div>
  );
};

export default ResetComponent;