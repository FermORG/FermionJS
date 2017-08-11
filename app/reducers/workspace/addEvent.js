export default function addEvent(state, event, component){
  const newEvents = Object.assign({}, state.components[component].events, event);
  const newState = Object.assign({}, state);
  newState.components[component].events = newEvents;
  return newState;
};
