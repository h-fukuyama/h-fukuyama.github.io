import React, { createContext, useState, useContext } from 'react';

const VisibleContext = createContext();

export const VisibleProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <VisibleContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </VisibleContext.Provider>
  );
};

export const useVisible = () => useContext(VisibleContext);
