import { ADD_CHILD, REMOVE_CHILD, MOVE_CHILD, DELETE_CHILD } from '../../actions/workspace';
/* ADDING CONFIG ACTIONS: */
import { ADD_STATE, ADD_PROPS, ADD_STYLES, ADD_EVENTS, CHANGE_STATE, CHANGE_PROPS, CHANGE_STYLES, CHANGE_EVENTS } from '../../actions/config';
/* ACA */
import { WORKSPACE_ID } from './../../constants';
import addComponent from './addComponent';
import removeComponent from './removeComponent';
import moveChild from './moveChild';
import addStateValue from './addStateValue';
// /// TEST DATA /////

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

// Children is just a list of ids
// Order doesnt matter here, children could be something like -> [4, 2, 6, 1]
// defaultWorkspace.children[0] = 0;
// defaultWorkspace.children[1] = 1;

// ////////

export default function workspace(state = defaultWorkspace, action) {
  switch (action.type) {
    case ADD_CHILD:
      return addComponent(state, action);

    case REMOVE_CHILD:
      return removeComponent(state, action);

    case MOVE_CHILD:
      return moveChild(state, action);

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
}
