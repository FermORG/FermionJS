import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

// const appPath  = './components/App'
// const appPath  = '../../../export/App/App'
const appPath  = '/Users/jyamamoto/_personal/Fermionjs/app/export/App/App'
// import App from './components/App';
// import App from '../../../export/App/App';
import App from '/Users/jyamamoto/_personal/Fermionjs/app/export/App/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(appPath, () => {
    render(App)
  });
}