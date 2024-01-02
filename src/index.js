import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';
import App3 from './App3';
import App4 from './App4';
import App5 from './App5';

const root = ReactDOM.createRoot(document.getElementById('root'));
// App = get API
// App2 = get + post API
// App3 = get + post + delete API
// App4 = get + post + delete + update API
root.render(
  <>
    <App4 />
  </>
);