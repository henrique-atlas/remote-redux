import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';

import reducer, { changeAppNameAction } from './reducer';

const remoteAppScope = 'remoteApp';

const RemoteApp = props => {
  // const { store } = props;
  // console.log('here with store', store);
  // useEffect(() => {
  //   store.injectReducer(remoteAppScope, reducer);
  // }, []);


  // const [state, setState] = useState(true);
  // const dispatch = useDispatch();
  // const state = useSelector(state => state[remoteAppScope]);
  // const [remoteAppInput, setRemoteAppInput] = useState('');

  // dispatch(changeAppNameAction('banana'))

  return (
      <div style={{ marginTop: '10px' }}>
        <div>RemoteApp Starting</div>
        {/* <div>RemoteApp's name from the redux store : {state && state.appName}</div> */}

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

// const RemoteAppWrapper = props => {
//   return (
//     <RemoteApp {...props} />
//   );
// };

let one = false
const RemoteAppWrapper = props => {
  // if (one) return
  // console.log('here with props', props, one);
  // const { store } = props;
  // console.log('here with store', store);
  // useEffect(() => {
  //   store.injectReducer(remoteAppScope, reducer);
  // }, []);
  // one = true

  return (
      <RemoteApp />
    // <Provider store={store || {}}>
    // </Provider>
  );
};

export default RemoteAppWrapper;
