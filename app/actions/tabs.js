// @flow

// tabs actions.

import type { activeTabStateType } from '../reducers/tabs';

type actionType = {
  +type: string
};

export const TOGGLE_STATE = 'TOGGLE_STATE';
export const TOGGLE_PROPS = 'TOGGLE_PROPS';
export const TOGGLE_EVENTS = 'TOGGLE_EVENTS';
export const TOGGLE_STYLES = 'TOGGLE_STYLES';
export const TOGGLE_TAB = 'TOGGLE_TAB';

export function toggleTabs(name: string) {
  switch (name) {
    case 'Props':
      return {
        type: TOGGLE_PROPS,
        name,
      };
    case 'Events':
      return {
        type: TOGGLE_EVENTS,
        name,
      };
    case 'Styles':
      return {
        type: TOGGLE_STYLES,
        name,
      };
    default:
      return {
        type: TOGGLE_STATE,
        name,
      };
  }
}
