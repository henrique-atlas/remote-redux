import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import { importRemote } from '@module-federation/utilities'

const dynamicFederation = async (scope, module) => {
  const container = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  return container.get(module).then(factory => {
    const Module = factory();
    return Module;
  });
};
const RemoteApp = React.lazy(() => dynamicFederation('app2', './RemoteApp'));

const App = () => {
//   const RemoteApp = React.lazy(() =>
//   importRemote({
//     url: 'http://localhost:3002',
//     scope: 'app2',
//     module: './RemoteApp',
//   })
// )

  return (
    <Provider store={store}>
      <div>
        Welcome to Host App
        <div>
          <Suspense fallback="Loading...">
            <label>
              Hello, below starts remote app
            </label>
            <RemoteApp store={store} />
          </Suspense>
        </div>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
