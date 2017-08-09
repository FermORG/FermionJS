export default function addStateValue(state, aStateValue){
  const newState = Object.assign({}, state);
  console.log('newState: ', JSON.stringify(state));
  const newAppState = Object.assign({}, newState.state, aStateValue);
  newState.state = newAppState;
  console.log('newState.state: ', JSON.stringify(newState.state));
  return newState;
};
