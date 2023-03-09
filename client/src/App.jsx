import React, { useEffect, useState } from 'react';
import {
  Editor,
  Auth,
  LoadingPage,
  Menu,
  Account,
  Dimensions,
  Public,
  About,
  Unauthentificated
} from './pages';
import { HashRouter, Routes as Switch, Route } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'));

    if (user) {
      setUser(user);
    }
  }, [localStorage.getItem('profile')]);

  return (
    <HashRouter>
      <Switch>
        <Route path="/" element={<Auth />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/edit/:type" element={user ? <Editor /> : <Unauthentificated />} />
        <Route path="/menu" element={user ? <Menu /> : <Unauthentificated />} />
        <Route path="/account" element={user ? <Account /> : <Unauthentificated />} />
        <Route path="/dimensions" element={user ? <Dimensions /> : <Unauthentificated />} />
        <Route path="/public" element={user ? <Public /> : <Unauthentificated />} />
        <Route path="/about" element={user ? <About /> : <Unauthentificated />} />
      </Switch>
    </HashRouter>
  );
};

export default App;
