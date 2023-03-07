import React from 'react';
import { MainPage, Auth, LoadingPage, SavedDocs } from './pages';
import { HashRouter, Routes as Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/edit" element={<MainPage />} />
        <Route path="/saved" element={<SavedDocs />} />
      </Switch>
    </HashRouter>
  );
};

export default App;
