import { cloneDeep } from 'lodash';
import { getChildEvents } from './eventsRecursor';
/**
* @param {object} workspace - redux top level workspace state obj
*/

export function appParser(workspace) {
  const clonedWorkspace = cloneDeep(workspace);
  const components = clonedWorkspace.components;
  const app = components.app || components.workspace;
  let state = clonedWorkspace.state;
  let events = app.events;
  // events = Object.assign(state, getChildEvents(app, components));
  events = Object.assign(events, getChildEvents(app, components));
  state = Object.assign(state, getChildProps(app, components));
  return clonedWorkspace;
}

/**
* @param {object} parent - Object being examined
* @param {object} components - workspace.components regardless of first param ID
*/

function getChildProps(parent, components) {
  const { children } = parent;
  let props = parent.props || {};
  if (children.length === 0){
    return props;
  }
  children.forEach((child) => {
    props[child] = Object.assign({}, getChildProps(components[child], components));
  });
  return props;
}

/**
* @param {object} state - workspace state or component props
* @param {string} component - string name of component
* @param {object} components - workspace.components regardless of first param ID
*/

export function flattenStateProps(state, component, components) {
  const children = components[component].children;
  state = cloneDeep(state);
  return Object.keys(state).reduce((final, init) => {
    if (children.indexOf(Number(init)) === -1) {
      final[init] = state[init];
    } else {
      final = Object.assign(final, flattenStateProps(state[init], init, components));
    }
    delete final.style;
    return final;
  }, {});
}
