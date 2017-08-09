// @flow
// config reducer

import { ADD_STATE, ADD_PROPS, ADD_STYLES, ADD_EVENTS, CHANGE_STATE, CHANGE_PROPS, CHANGE_STYLES, CHANGE_EVENTS } from '../actions/config';
import { WORKSPACE_ID } from './../constants';
export type configStateType = {
  //what goes here?
};

type actionType = {
  +type: string
};

const addStateValue = (state, aStateValue) =>{
  const newState = Object.assign({}, state);
  console.log('newState: ', JSON.stringify(state));
  const newAppState = Object.assign({}, newState.state, aStateValue);
  newState.state = newAppState;
  console.log('newState.state: ', JSON.stringify(newState.state));
  return newState;
}

const defaultWorkspace = {
  componentCounter: 2,
  activeComponent: '0',
  components: {
    workspace: {
      id: WORKSPACE_ID,
      children: [0, 1],
    },
  },
  state: {
    'blue': 'waffle',
  },
};

defaultWorkspace.components[0] = {
  id: 0,
  name: 'BlackBox',
  children: [],
  parentID: WORKSPACE_ID,
  props: {
    style: {
      position: 'relative',
      height: '100px',
      width: '100px',
      display: 'inline-block',
      backgroundColor: 'black',
      resize: 'both',
      overflow: 'auto',
      zIndex: 1,
    },
    'zIndex': 'testProp',
  },
  events: { test: 'event test =]' }
};

defaultWorkspace.components[1] = {
  id: 1,
  name: 'BlueBox',
  children: [],
  parentID: WORKSPACE_ID,
  props: {
    style: {
      position: 'relative',
      height: '30px',
      width: '30px',
      display: 'inline-block',
      backgroundColor: 'blue',
      resize: 'both',
      overflow: 'auto',
      zIndex: 2,
    },
  },
  events: { test: 'event test =]' }
};


export default function toggleConfig(state: configStateType = defaultWorkspace, action: actionType) {


  switch (action.type) {
    // use component name to locate change.
    // inject new whatever if adding
    // update whatever if changing.
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
  }

  // should allow user to add a prop/etc
  // should allow user to edit prop.
  // should show relevant data bits when a tab is displayed. does that need a reducer? compLib isn't using one.
}
