import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <h2>Home from second app single/local loaded</h2>
      <h3>without Main Container</h3>
      <h4>import root here, without using Reducer from Container, same for ReactRouter </h4>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
