// @flow
// config actions
export const ADD_STATE = 'ADD_STATE';
export const ADD_PROPS = 'ADD_PROPS';
export const ADD_STYLES = 'ADD_STYLES';
export const ADD_EVENTS = 'ADD_EVENTS';
export const DELETE_STATE = 'DELETE_STATE';
export const DELETE_PROPS = 'DELETE_PROPS';
export const DELETE_STYLES = 'DELETE_STYLES';
export const DELETE_EVENTS = 'DELETE_EVENTS';

export function addState(aState, component) {
  return {
    type: 'ADD_STATE',
    aState,
  };
}

export function addProps(prop, component) {
  return {
    type: 'ADD_PROPS',
    prop,
    component
  };
}

export function addStyles(style, component) {
  return {
    type: 'ADD_STYLES',
    style,
    component
  };
}

export function addEvents(event, component) {
  return {
    type: 'ADD_EVENTS',
    event,
    component
  };
}

export function deleteState(stateKey, component) {
  return {
    type: 'DELETE_STATE',
    propKey: stateKey,
  };
}
export function deleteProps(propKey, component) {
  return {
    type: 'DELETE_PROPS',
    prop: propKey,
    component
  };
}
export function deleteStyles(styleKey, component) {
  return {
    type: 'DELETE_STYLES',
    style: styleKey,
    component
  };
}
export function deleteEvents(eventKey, component) {
  return {
    type: 'DELETE_EVENTS',
    event: eventKey,
    component
  };
}
