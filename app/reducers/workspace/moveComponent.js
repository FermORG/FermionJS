import { WORKSPACE_ID } from '../../constants';
import cloneComponentAndchildren from './utilities';
import updateStyle from './updateStyle';
import UPDATE_STYLE from '../../actions/workspace';
import { pixelsToInt } from '../../utilities/helperFunctions';

/**
 * Moves a component already in the workspace
 * @param {object} state
 * @param {object} action
 * -> @property {number} action.targetID - ID of parent component to add component to
 * -> @property {number} action.sourceID - ID of component being moved into another
 */
export default function moveComponent(state, action) {
  if (action.targetID === action.sourceID) {
    return state;
  }

  const components = { ...state.components };
  const source = cloneComponentAndchildren(components[action.sourceID]);
  const target = cloneComponentAndchildren(components[action.targetID]);
  const prevParent = cloneComponentAndchildren(components[source.parentID]);
  [source, target, prevParent].forEach(component => components[component.id] = component);

  if (source.parentID === target.id || target.parentID === source.id) {
    return state;
  }

  source.parentID = target.id;
  target.children.push(source.id);
  prevParent.children = prevParent.children.filter(val => val !== source.id);

  const [sourceWidth, sourceHeight, targetWidth, targetHeight] = [
    source.props.style.width,
    source.props.style.height,
    target.props.style.width,
    target.props.style.height
  ].map(elem => pixelsToInt(elem));


  const reduceSourceSize = sourceHeight > targetHeight || sourceWidth > targetWidth;
  const newStyle = { left: 0, top: 0 };

  if (reduceSourceSize) {
    newStyle.width = `${targetWidth / 2}px`;
    newStyle.height = `${targetHeight / 2}px`;
  }

  const updateStyleAction = {
    type: UPDATE_STYLE,
    sourceID: source.id,
    newStyle
  };

  const newState = updateStyle({ ...state, components }, updateStyleAction);

  return newState;
}
