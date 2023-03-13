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
import { useStateContext } from './context/ContextProvider';
import { HashRouter, Routes as Switch, Route } from 'react-router-dom';

const App = () => {
  const { user, setUser } = useStateContext();
  const [userLocal, setUserLocal] = useState(JSON.parse(localStorage.getItem('profile')));
  const [stateUser, setStateUser] = useState(user);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'));

    if (user) {
      setUserLocal(user);
      setStateUser(user);
    }
  }, [localStorage.getItem('profile')]);

  useEffect(() => {
    if (user) {
      setStateUser(user);
    }
  }, [user, userLocal]);



  return (
    <HashRouter>
      <Switch>
        <Route path="/" element={<Auth />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/edit/:type" element={user || userLocal ? <Editor /> : <Unauthentificated />} />
        <Route path="/menu" element={user || userLocal ? <Menu /> : <Unauthentificated />} />
        <Route path="/account" element={user || userLocal ? <Account /> : <Unauthentificated />} />
        <Route path="/dimensions" element={user || userLocal ? <Dimensions /> : <Unauthentificated />} />
        <Route path="/public" element={user || userLocal ? <Public /> : <Unauthentificated />} />
        <Route path="/about" element={user || userLocal ? <About /> : <Unauthentificated />} />
      </Switch>
    </HashRouter>
  );
};

export default App;
