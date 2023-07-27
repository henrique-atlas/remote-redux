import React from "react";
import { store } from './store';
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

export function SampleMicro() {
  const [system, setSystem] = React.useState({});
  function setApp2() {
    setSystem({
      remote: 'app2',
      url: 'http://localhost:3002',
      module: './RemoteApp',
    });
  }


  return (
    <div>

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
  );
}

SampleMicro.displayName = "SampleMicroFront";