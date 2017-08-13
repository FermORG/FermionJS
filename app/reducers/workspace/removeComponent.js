import { WORKSPACE_ID } from '../../constants';

/**
 * Removes a component
 * @param {object} state
 * @param {object} action
 * -> @property {number} action.id - id of component to remove
 */
export default function removeComponent(state, action) {
  const newWorkspace = Object.assign({}, state);
  const components = Object.assign({}, newWorkspace.components);
  const componentToDelete = components[action.id];

  if (!componentToDelete) {
    throw 'Attempted to remove component which does not exist';
    return state;
  } else if (componentToDelete.id === WORKSPACE_ID) {
    throw 'cannot delete workspace';
    return state;
  }

  const parentID = componentToDelete.parentID;
  if (!parentID) {
    throw 'parent doesn\'t exist';
    return state;
  } else if (parentID === WORKSPACE_ID) {
    const children = state.children;
    const indexOf = children.indexOf(action.id);
    componentToDelete.parentID = '';
    return {
      ...state,
      children: [
        ...children.slice(0, indexOf),
        ...children.slice(indexOf + 1)
      ],
      components
    };
  }
  const parent = components[parentID];
  const indexOf = parent.children.indexOf(action.id);
  const parentsChildren = parent.children;
  parent.children = [
    ...parentsChildren.slice(0, indexOf),
    ...parentsChildren.slice(indexOf + 1)
  ];
  componentToDelete.parentID = '';
  return {
    ...state,
    components
  };
}
