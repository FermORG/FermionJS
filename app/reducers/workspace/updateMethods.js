import { cloneDeep } from 'lodash';
export default function updateMethods(state, methods) {
  console.log('hit');
  const nextState = Object.assign({}, state);
  nextState.methods = methods;
  return nextState;
}
