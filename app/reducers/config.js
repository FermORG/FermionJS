// @flow
// config reducer

import { ADD_STATE, ADD_PROPS, ADD_STYLES, ADD_EVENTS, CHANGE_STATE, CHANGE_PROPS, CHANGE_STYLES, CHANGE_EVENTS } from '../actions/config';
import { WORKSPACE_ID } from './../constants';

export type configStateType = {
  // what goes here?
};

type actionType = {
  +type: string
};

const addStateValue = (state, aStateValue) => {
  const newState = Object.assign({}, state);
  const newAppState = Object.assign({}, newState.state, aStateValue);
  newState.state = newAppState;
  return newState;
};


export default function toggleConfig(state: configStateType = {}, action: actionType) {
  switch (action.type) {
    case ADD_STATE:
      return addStateValue(state, action.aState);

    case ADD_PROPS:
      return state;

    case ADD_STYLES:
      return state;

    case ADD_EVENTS:
      return state;

    case CHANGE_STATE:
      return state;

    case CHANGE_PROPS:
      return state;

    case CHANGE_STYLES:
      return state;

    case CHANGE_EVENTS:
      return state;

    default:
      return state;
  };
}
