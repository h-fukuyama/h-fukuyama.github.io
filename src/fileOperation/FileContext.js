import React, { createContext, useContext, useState } from 'react';

// FileContext の作成
const FileContext = createContext();
export const useFileContext = () => useContext(FileContext);

// プロバイダーコンポーネントの作成
export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const resetFile = () => {
    setFile(null);
  }
  return (
    <FileContext.Provider value={{ file, setFile, resetFile }}>
      {children}
    </FileContext.Provider>
  );
};
