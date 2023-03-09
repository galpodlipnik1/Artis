import React, { useEffect, useState } from 'react';
import {
  Editor,
  Auth,
  LoadingPage,
  Menu,
  Account,
  Dimensions,
  Feedback,
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
        <Route path="/loading" element={user ? <LoadingPage /> : <Unauthentificated />} />
        <Route path="/edit/:type" element={user ? <Editor /> : <Unauthentificated />} />
        <Route path="/menu" element={user ? <Menu /> : <Unauthentificated />} />
        <Route path="/account" element={user ? <Account /> : <Unauthentificated />} />
        <Route path="/dimensions" element={user ? <Dimensions /> : <Unauthentificated />} />
        <Route path="/feedback" element={user ? <Feedback /> : <Unauthentificated />} />
      </Switch>
    </HashRouter>
  );
};

export default App;
