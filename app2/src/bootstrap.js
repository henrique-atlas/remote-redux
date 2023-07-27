import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {
  Route,
  Routes,
  Link,
} from "react-router-dom";
import reducer, { changeAppNameAction, changeMainPropertyAction } from './reducer';
import Home from './home';

const remoteAppScope = 'remoteApp';

function PageA() {
  return <div>PageA</div>;
}

function PageB() {
  return <div>PageB</div>;
}

const RemoteApp = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state[remoteAppScope]);
  const [remoteAppInput, setRemoteAppInput] = useState('');

  const tabNames = [
    'maint tab', 'second tab route'
  ]
  const tabContent = [
    <>
      <h2>Sample Micro Front</h2>
      <p>
        First tab, click on remote tab to load remote app
      </p>
    </>
  ]

  return (
      <div style={{ marginTop: '10px' }}>
        {/* <TabsLgBasic tabContent={tabContent} tabNames={tabNames} /> */}
        <Routes element={Home} path="/">
          <Route index element={<Home />} />
          <Route path='page-a' element={<PageA />} />
          <Route path="page-b" element={<PageB />} />
        </Routes>

        <h1>------------------------------------------------</h1>

        <h2><strong>Navigation</strong></h2>
        <ul>
          <li>
            <Link to="/micro">Home Remote App</Link>
          </li>
          <li>
            <Link to="page-a">PageA</Link>
          </li>
          <li>
            <Link to="page-b">PageB</Link>
          </li>
        </ul>

        <h1>------------------------------------------------</h1>
        
        <div className='underline text-blue-200'><strong>RemoteApp Content</strong></div>
        <div>RemoteApp's name from the redux store : {state && state.appName}</div>

        <div>
          <input
            style={{ marginRight: '10px',     
            "border": 'black',
            "borderRadius": '1px',
            "borderStyle": 'solid',
          }}
            type="text"
            onChange={e => {
              setRemoteAppInput(e.target.value);
            }}
          />
          <button type='button' className='rounded-full'
            style={{
              border: "2px solid green"
            }}
            onClick={() => {
              dispatch(changeAppNameAction(remoteAppInput))
              dispatch(changeMainPropertyAction('new property'))
            }}>
            Dispatch Button
          </button>
        </div>
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
