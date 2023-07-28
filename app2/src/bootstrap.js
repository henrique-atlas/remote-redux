import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {
  Route,
  Routes,
  Link,
  Outlet
} from "react-router-dom";
import reducer from './reducer';
import Home from './home';
import './app.css';
import Tabs from './tabsRaw';

const remoteAppScope = 'remoteApp';

function PageA() {
  return <div>PageA</div>;
}

function Layout() {
  return (
    <div>
      
      <hr />
      <div className="App">
        <Tabs />
      </div>

    </div>
  );
}

const RemoteApp = () => {
  return (
      <div style={{ marginTop: '10px' }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='page-a' element={<PageA />} />
          </Route>
        </Routes>
      </div>
  );
};

const RemoteAppWrapper = props => { 
  const { store } = props;
  useEffect(() => {
    store.injectReducer(remoteAppScope, reducer);
  }, []);

  return (
    <Provider store={store || {}}>
      <RemoteApp />
    </Provider>
  );
};

export default RemoteAppWrapper;
