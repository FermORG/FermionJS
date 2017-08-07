// @flow
// config actions


export const ADD_STATE = 'ADD_STATE';
export const ADD_PROPS = 'ADD PROPS';
export const ADD_STYLES = 'ADD STYLES';
export const ADD_EVENTS = 'ADD EVENTS';
export const CHANGE_STATE = 'CHANGE STATE';
export const CHANGE_PROPS = 'CHANGE PROPS';
export const CHANGE_STYLES = 'CHANGE STYLES';
export const CHANGE_EVENTS = 'CHANGE EVENTS';

export function AddState(aState, component) {
  return {
    type: 'ADD_STATE',
    aState,
    component
  };
}

export function AddProps(prop, component) {
  return {
    type: 'ADD_PROPS',
    prop,
    component
  };
}

export function AddStyles(style, component) {
  return {
    type: 'ADD_STYLES',
    style,
    component
  };
}

export function AddEvents(event, component) {
  return {
    type: 'ADD_EVENTS',
    event,
    component
  }
}

export function ChangeState(aState, component) {
  return {
    type: 'CHANGE_STATE',
    aState,
    component
  };
}

export function ChangeProps(prop, component) {
  return {
    type: 'CHANGE_PROPS',
    prop,
    component
  };
}

export function ChangeStyles(style, component) {
  return {
    type: 'CHANGE_STYLES',
    style,
    component
  };
}

export function ChangeEvents(event, component) {
  return {
    type: 'CHANGE_EVENTS',
    event,
    component
  }
}
