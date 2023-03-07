import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    temp: true
  });

  return <StateContext.Provider value={[state, setState]}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
