import { WORKSPACE_ID } from '../../constants';
import cloneComponentAndChildren from './utilities';

/**
 * Moves a component already in the workspace
 * @param {object} state
 * @param {object} action
 * -> @property {number} action.targetID - ID of parent component to add component to
 * -> @property {number} action.sourceID - ID of component being moved into another
 */
export default function moveChild(state, action) {
  if (action.targetID === action.sourceID) {
    return state;
  }

  const { components } = state;
  const source = cloneComponentAndChildren(components[action.sourceID]);
  const target = cloneComponentAndChildren(components[action.targetID]);
  const prevParent = cloneComponentAndChildren(components[source.parentID]);

  if (source.parentID === target.id || target.parentID === source.id) {
    return state;
  }

  source.parentID = target.id;
  target.children.push(source.id);

  prevParent.children = prevParent.children.filter(val => val !== source.id);

  const newComponents = { ...components };
  [source, target, prevParent].forEach(comp => newComponents[comp.id] = comp);

  return {
    ...state,
    components: newComponents
  };
}
