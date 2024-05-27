import React, { createContext, useContext, useState } from 'react';

// FileContext の作成
const FileContext = createContext();
export const useFileContext = () => useContext(FileContext);

// プロバイダーコンポーネントの作成
export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  
  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  );
};
