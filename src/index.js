import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
// import { Provider } from 'react-redux';

axios.defaults.baseURL = 'http://api.kiki-bus.com';
axios.defaults.withCredentials = true;

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider> */}
    <App />
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById('root')
);
