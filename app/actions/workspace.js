import { WORKSPACE_ID } from './../constants';

export const ADD_CHILD = 'ADD_CHILD';
export const CREATE_CHILD = 'CREATE_CHILD';
export const DELETE_CHILD = 'DELETE_CHILD';
export const MOVE_CHILD = 'MOVE_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const UPDATE_STYLE = 'UPDATE_STYLE';

const createChild = ({ name, props, events }) => ({
  name,
  props,
  events,
  children: [],
  parentID: WORKSPACE_ID,
});

export function addChild(targetID, component) {
  const newComponent = createChild(component);
  return {
    type: ADD_CHILD,
    newComponent,
    targetID
  };
}

export function removeChild(id) {
  return {
    type: REMOVE_CHILD,
    id
  };
}

export function moveChild(sourceID, targetID) {
  return {
    type: MOVE_CHILD,
    targetID,
    sourceID
  };
}

export function updateStyle(sourceID, newStyle) {
  return {
    type: UPDATE_STYLE,
    sourceID,
    newStyle
  };
}
