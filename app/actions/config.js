// @flow
// config actions


export const ADD_STATE = 'ADD_STATE';
export const ADD_PROPS = 'ADD_PROPS';
export const ADD_STYLES = 'ADD_STYLES';
export const ADD_EVENTS = 'ADD_EVENTS';
export const CHANGE_STATE = 'CHANGE_STATE';
export const CHANGE_PROPS = 'CHANGE_PROPS';
export const CHANGE_STYLES = 'CHANGE_STYLES';
export const CHANGE_EVENTS = 'CHANGE_EVENTS';

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
  }
}

export function changeState(aState, component) {
  return {
    type: 'CHANGE_STATE',
    aState,
  };
}

export function changeProps(prop, component) {
  return {
    type: 'CHANGE_PROPS',
    prop,
    component
  };
}

export function changeStyles(style, component) {
  return {
    type: 'CHANGE_STYLES',
    style,
    component
  };
}

export function changeEvents(event, component) {
  return {
    type: 'CHANGE_EVENTS',
    event,
    component
  }
}
