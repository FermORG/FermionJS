import { ADD_CHILD, REMOVE_CHILD, MOVE_CHILD, DELETE_CHILD, UPDATE_STYLE } from '../../actions/workspace';
import { ADD_STATE, ADD_PROPS, ADD_STYLES, ADD_EVENTS, DELETE_STATE, DELETE_PROPS, DELETE_STYLES, DELETE_EVENTS } from '../../actions/config';
import { SET_ACTIVE_COMPONENT } from '../../actions/FileSystemActions';
import { WORKSPACE_ID } from './../../constants';
import addComponent from './addComponent';
// import removeComponent from './removeComponent';
import moveChild from './moveChild';
import addStateValue from './addStateValue';
import addPropsValue from './addPropsValue';
import addStyleValue from './addStyleValue';
import addEvent from './addEvent';
import deleteStateValue from './deleteStateValue';
import deletePropsValue from './deletePropsValue';
import deleteStylesValue from './deleteStylesValue';
import deleteEvent from './deleteEvent';
import setActiveComponent from './setActiveComponent';
import updateStyle from './updateStyle';
// /// TEST DATA /////

const defaultWorkspace = {
  componentCounter: 2,
  activeComponent: '0',
  components: {
    workspace: {
      id: WORKSPACE_ID,
      children: [0, 1],
      events: {},
    },
  },
  state: {},
  methods: {},
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
// currently unused
    // case REMOVE_CHILD:
    //   return removeComponent(state, action);

    case MOVE_CHILD:
      return moveChild(state, action);

    case ADD_STATE:
      return addStateValue(state, action.aState);

    case ADD_PROPS:
      return addPropsValue(state, action.prop, action.component);

    case ADD_STYLES:
      return addStyleValue(state, action.style, action.component);

    case ADD_EVENTS:
      return addEvent(state, action.event, action.component);

    case DELETE_STATE:
      return deleteStateValue(state, action.propKey);

    case DELETE_PROPS:
      return deletePropsValue(state, action.prop, action.component);

    case DELETE_STYLES:
      return deleteStylesValue(state, action.style, action.component);

    case DELETE_EVENTS:
      return deleteEvent(state, action.event, action.component);

    case SET_ACTIVE_COMPONENT:
      return setActiveComponent(state, action.component);

    case UPDATE_STYLE:
      return updateStyle(state, action);
    default:
      return state;
  }
}
