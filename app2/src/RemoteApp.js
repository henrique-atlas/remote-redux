import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';

import reducer, { changeAppNameAction, changeMainPropertyAction } from './reducer';

const remoteAppScope = 'remoteApp';

const RemoteApp = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state[remoteAppScope]);
  const [remoteAppInput, setRemoteAppInput] = useState('');

  return (
      <div style={{ marginTop: '10px' }}>
        <div className='underline text-blue-200' >RemoteApp</div>
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
