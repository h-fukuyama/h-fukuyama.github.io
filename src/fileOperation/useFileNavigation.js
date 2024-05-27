import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from './FileContext';
import useFileContent from './useFileContent';

const useFileNavigation = () => {
  const { file } = useFileContext();
  const { fileContent } = useFileContent(file);
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  return { file, fileContent };
};

export default useFileNavigation;