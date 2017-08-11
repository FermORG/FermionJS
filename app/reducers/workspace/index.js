import {
  ADD_CHILD,
  REMOVE_CHILD,
  MOVE_CHILD,
  DELETE_CHILD,
  UPDATE_STYLE
} from '../../actions/workspace';

import { WORKSPACE_ID } from './../../constants';
import addComponent from './addComponent';
import removeComponent from './removeComponent';
import moveChild from './moveChild';
import updateStyle from './updateStyle';

// /// TEST DATA /////

const defaultWorkspace = {
  componentCounter: 2,
  components: {
    workspace: {
      id: WORKSPACE_ID,
      children: [0, 1],
    },
  },
  state: {},
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
      overflow: 'auto',
    },
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
      height: '100px',
      width: '100px',
      display: 'inline-block',
      backgroundColor: 'blue',
      overflow: 'auto',
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
    case UPDATE_STYLE:
      return updateStyle(state, action);
    default:
      return state;
  }
}
