import { WORKSPACE_ID } from '../../constants';
import cloneComponentAndChildren from './utilities';
import updateStyle from './updateStyle';
import UPDATE_STYLE from '../../actions/workspace';

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

  const [targetWidth, targetHeight] = [
    state.components[action.targetID].props.style.width,
    state.components[action.targetID].props.style.height
  ];

  const [sourceWidth, sourceHeight] = [
    state.components[action.sourceID].props.style.width,
    state.components[action.sourceID].props.style.height
  ];

  console.log(targetWidth, targetHeight, sourceWidth, sourceHeight)

  let newStyle = {};

  if (sourceWidth < targetWidth && sourceHeight < targetHeight){
    newStyle = {
      left: 0,
      top: 0,
      width: sourceWidth,
      height: sourceHeight
    }
  }else{
    newStyle = {
      left: 0,
      top: 0,
      width: parseInt(targetWidth.split('px')[0]) * 0.5 + 'px',
      height: parseInt(targetHeight.split('px')[0]) * 0.5 + 'px'
    }

  }

  

  const { components } = updateStyle(state, { type: UPDATE_STYLE, sourceID: action.sourceID, newStyle });
  const source = cloneComponentAndChildren(components[action.sourceID]);
  const target = cloneComponentAndChildren(components[action.targetID]);
  const prevParent = cloneComponentAndChildren(components[source.parentID]);

  // const [sourceWidth, sourceHeight] = [source.props.style.width, source.props.style.height];
  // const [targetWidth, targetHeight] = [target.props.style.width, target.props.style.height];

 

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
