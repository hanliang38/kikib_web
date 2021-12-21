import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import { Provider } from 'react-redux';
// import { store } from './redux/store'; //store.js에서 redux store관련코드 생성

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider>, */}
  </React.StrictMode>,
  document.getElementById('root')
);
