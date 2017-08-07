import cloneComponentAndChildren from './utilities';

/**
 * Creates a new child and adds it to the provided parent component (parentID)
 * @param {object} state - workspace data
 * @param {object} action
 * -> @property {number} action.targetID - id of parent to append new component to
 * -> @property {object} action.newComponent - new component to append to target
 */
export default function addComponent(state, action) {
  const components = { ...state.components };
  components.workspace = cloneComponentAndChildren(components.workspace);
  const { newComponent } = action;
  newComponent.id = state.componentCounter;
  components[newComponent.id] = newComponent;
  components.workspace.children.push(state.componentCounter);

  return {
    ...state,
    componentCounter: state.componentCounter + 1,
    components,
  };
}
