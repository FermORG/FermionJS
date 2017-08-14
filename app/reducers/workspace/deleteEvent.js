export default function deleteEventValue(state, key, component) {
  const newState = Object.assign({}, state);
  const events = newState.components[component].events;
  const newEvents = Object.assign({}, events);
  delete newEvents[key];
  newState.components[component].events = newEvents;
  return newState;
}
