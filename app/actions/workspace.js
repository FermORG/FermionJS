import { WORKSPACE_ID } from './../constants';

export const ADD_COMPONENT = 'ADD_COMPONENT';
export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const DELETE_COMPONENT = 'DELETE_COMPONENT';
export const MOVE_COMPONENT = 'MOVE_COMPONENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
export const UPDATE_STYLE = 'UPDATE_STYLE';

const createComponent = ({ name, props, events }) => ({
  name,
  props,
  events,
  children: [],
  parentID: WORKSPACE_ID,
});

export function addComponent(targetID, component) {
  const newComponent = createComponent(component);
  return {
    type: ADD_COMPONENT,
    newComponent,
    targetID
  };
}

export function removeComponent(id) {
  return {
    type: REMOVE_COMPONENT,
    id
  };
}

export function moveComponent(sourceID, targetID) {
  return {
    type: MOVE_COMPONENT,
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
