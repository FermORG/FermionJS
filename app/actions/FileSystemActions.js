// @flow
export const SET_ACTIVE_COMPONENT = 'SET_ACTIVE_COMPONENT';

export function setActiveComponent(component: string) {
  return {
    type: SET_ACTIVE_COMPONENT,
    component,
  };
}
