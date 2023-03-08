import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateDefaultDimensions } from '../util/index';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [canvasState, setCanvasState] = useState(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  }, [localStorage.getItem('profile')]);

  useEffect(() => {
    if (dimensions.width === 0 && dimensions.height === 0) {
      const { width, height } = calculateDefaultDimensions(window.innerWidth, window.innerHeight);
      setDimensions({ width, height });
    }
  }, []);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        canvasState,
        setCanvasState,
        dimensions,
        setDimensions,
        mousePos,
        setMousePos,
        zoom,
        setZoom
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
