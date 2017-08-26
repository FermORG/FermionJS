import { WORKSPACE_ID } from './../constants';

export const ADD_COMPONENT = 'ADD_COMPONENT';
export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const DELETE_COMPONENT = 'DELETE_COMPONENT';
export const MOVE_COMPONENT = 'MOVE_COMPONENT';
export const UPDATE_STYLE = 'UPDATE_STYLE';

const createComponent = (component) => ({
  ...component,
  parentID: WORKSPACE_ID
});

export function addComponent(targetID, component) {
  const newComponent = createComponent(component);
  return {
    type: ADD_COMPONENT,
    newComponent,
    targetID
  };
}

export function deleteComponent(id) {
  return {
    type: DELETE_COMPONENT,
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
