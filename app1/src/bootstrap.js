import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Header } from './header'
import TabsLgBasic from './tabs'
import './main.css'

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
  const tabNames = [
    'maint tab',
    'Remote app',
  ]
  const tabContent = [
    <p>
      First tab, click on remote tab to load remote app
    </p>,
    <div>
      <Suspense fallback="Loading...">
        <h1 className="text-3xl font-bold underline text-blue-400">
          Hello world! 
        </h1>
        <label>below starts remote app</label>
        <RemoteApp store={store} />
      </Suspense>
    </div>
  ]
  return (
    <Provider store={store}>
      <div>
        <Header />
        <TabsLgBasic tabContent={tabContent} tabNames={tabNames} />
        
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
