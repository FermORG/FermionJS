import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import tabs from './tabs';
import workspace from './workspace/index';
import availableComponents from './complist';

const rootReducer = combineReducers({
  router,
  tabs,
  workspace,
  availableComponents,
});

export default rootReducer;
