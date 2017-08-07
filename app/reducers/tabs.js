// @flow

// tabs reducer

import { TOGGLE_STATE, TOGGLE_PROPS, TOGGLE_EVENTS, TOGGLE_STYLES } from '../actions/tabs';

export type tabStateType = {
  +activeTab: string,
  tabs: {}
};

type actionType = {
  +type: string
};

const defaultTabs = {
  State: false,
  Props: true,
  Events: false,
  Styles: false,
};

const tabInfo = {
  tabs: defaultTabs,
  activeTab: 'Props',
};

const toggler = (tabs: {}, name: string) => {
  const isActive = tabs[name];
  if (isActive) return tabs;
  const newTabs = Object.assign({}, tabs);
  Object.keys(newTabs).forEach((tab) => {
    newTabs[tab] = (tab === name);
  });
  return newTabs;
};

export default function toggleTabs(state: tabStateType = tabInfo, action: actionType) {
  const newState = Object.assign({}, state);
  switch (action.type) {

    case TOGGLE_STATE:
      newState.tabs = toggler(newState.tabs, action.name);
      newState.activeTab = action.name;
      return newState;

    case TOGGLE_PROPS:
      newState.tabs = toggler(newState.tabs, action.name);
      newState.activeTab = action.name;
      return newState;

    case TOGGLE_EVENTS:
      newState.tabs = toggler(newState.tabs, action.name);
      newState.activeTab = action.name;
      return newState;

    case TOGGLE_STYLES:
      newState.tabs = toggler(newState.tabs, action.name);
      newState.activeTab = action.name;
      return newState;

    default:
      return state;
  }
}
