import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import tabs from './tabs';
import workspace from './workspace/index';
import availableComponents from './complist';
import config from './config.js';
const rootReducer = combineReducers({
  router,
  tabs,
  workspace,
  availableComponents,
  config,
});

export default rootReducer;
