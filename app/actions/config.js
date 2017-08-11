// @flow
// config actions


export const ADD_STATE = 'ADD_STATE';
export const ADD_PROPS = 'ADD_PROPS';
export const ADD_STYLES = 'ADD_STYLES';
export const ADD_EVENTS = 'ADD_EVENTS';

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
