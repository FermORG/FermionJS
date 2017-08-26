import { ADD_COMPONENT, MOVE_COMPONENT, DELETE_COMPONENT, UPDATE_STYLE } from '../../actions/workspace';
import { ADD_STATE, ADD_PROPS, ADD_STYLES, ADD_EVENTS, DELETE_STATE, DELETE_PROPS, DELETE_STYLES, DELETE_EVENTS } from '../../actions/config';
import { SET_ACTIVE_COMPONENT } from '../../actions/FileSystemActions';
import { METHODS } from '../../actions/methods';
import { WORKSPACE_ID } from './../../constants';
import addComponent from './addComponent';
import deleteComponent from './deleteComponent';
import moveComponent from './moveComponent';
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
import updateMethods from './updateMethods';

const defaultWorkspace = {
  componentCounter: 0,
  activeComponent: WORKSPACE_ID,
  components: {
    workspace: {
      id: WORKSPACE_ID,
      children: [],
      events: {},
      props: {
        style: {}
      }
    },
  },
  state: {},
  methods: '',
  methodNames: [],
};

export default function workspace(state = defaultWorkspace, action) {
  switch (action.type) {
    case ADD_COMPONENT:
      return addComponent(state, action);

    case DELETE_COMPONENT:
      return deleteComponent(state, action);

    case MOVE_COMPONENT:
      return moveComponent(state, action);

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
    case METHODS:
      return updateMethods(state, action.methods);
    default:
      return state;
  }
}
