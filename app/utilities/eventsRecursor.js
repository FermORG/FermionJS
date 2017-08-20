const { cloneDeep } = require('lodash');
/**
* @param {object} workspace - redux top level workspace state obj
*/

export function propsParser(workspace) {
  const clonedWorkspace = cloneDeep(workspace);
  const components = clonedWorkspace.components;
  const app = components.app || components.workspace;
  let state = clonedWorkspace.state;
  state = Object.assign(state, getChildProps(app, components));
  return clonedWorkspace;
}
