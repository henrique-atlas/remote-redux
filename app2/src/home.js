import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeAppNameAction, changeMainPropertyAction } from './reducer';

const remoteAppScope = 'remoteApp';

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector(state => state[remoteAppScope]);
  const [remoteAppInput, setRemoteAppInput] = useState('');
  return (
    <div>
      <h1>Home from second app2</h1>

      <h1>------------------------------------------------</h1>

      <div className='underline text-blue-200'><strong>RemoteApp Content</strong></div>
      <div>RemoteApp's name from the redux store : {state && state.appName}</div>

      <div>
        <input
          style={{ marginRight: '10px',     
          "border": 'black',
          "borderRadius": '1px',
          "borderStyle": 'solid',
          "color": 'black'
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
}