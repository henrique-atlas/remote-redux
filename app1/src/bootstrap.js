import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Header } from './header'
import TabsLgBasic from './tabs'
import './main.css'
import { loadComponent } from './loadComponent';

function System(props) {
  const {
    system,
    system: { remote, url, module },
    store
  } = props;

  if (!system || !remote || !url || !module) {
    return <h2>No system specified</h2>;
  }
  const Component = React.lazy(loadComponent(remote, 'app2', module, url));
  
  return (
    <React.Suspense fallback="Loading System">
      <Component store={store} />
    </React.Suspense>
  );
}


const App = () => {
  const [system, setSystem] = React.useState({});
  function setApp2() {
    setSystem({
      remote: 'app2',
      url: 'http://localhost:3002',
      module: './RemoteApp',
    });
  }
  console.log('here with system', system);
  const tabNames = [
    'maint tab'
  ]
  const tabContent = [
    <p>
      First tab, click on remote tab to load remote app
    </p>
  ]
  return (
    <Provider store={store}>
      <div>
        <Header />
        <TabsLgBasic tabContent={tabContent} tabNames={tabNames} setSystem={setSystem} />
        <div>
        <button className='rounded-full'
            style={{
              border: "2px solid green"
            }}
         onClick={setApp2}>Load App 2 Widget</button>
        <div style={{ marginTop: '2em' }}>
          <System system={system} store={store} />
        </div>
        </div>
        
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
