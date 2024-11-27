import React, { createContext } from 'react';

const UserContext = createContext();

const ContextFile = ({ children }) => {
  return (
    <UserContext.Provider value={{ children }}>
      {children}
    </UserContext.Provider>
  );
};

export  { UserContext, ContextFile };
