import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';

import reducer, { changeAppNameAction } from './reducer';

const remoteAppScope = 'remoteApp';

const RemoteApp = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state[remoteAppScope]);
  const [remoteAppInput, setRemoteAppInput] = useState('');

  return (
      <div style={{ marginTop: '10px' }}>
        <div>RemoteApp Starting</div>
        <div>RemoteApp's name from the redux store : {state && state.appName}</div>

        <div>
          <input
            style={{ marginRight: '10px' }}
            type="text"
            onChange={e => {
              setRemoteAppInput(e.target.value);
            }}
          />
          <button onClick={() => dispatch(changeAppNameAction(remoteAppInput))}>
            Dispatch RemoteApp new name
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
