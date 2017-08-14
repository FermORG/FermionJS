import { TOGGLE_STATE, TOGGLE_PROPS, TOGGLE_EVENTS, TOGGLE_STYLES } from '../../app/actions/tabs';
import { toggleTabs } from '../../app/actions/tabs';

describe('Config Tab Actions', () => {
  describe('Case: State', () => {
    it('should return the proper action type, and the name of the tab', () => {
      expect(toggleTabs('State')).toEqual({
        type: TOGGLE_STATE,
        name: 'State',
      });
    });
  });

  describe('Case: Props', () => {
    it('should return the proper action type, and the name of the tab', () => {
      expect(toggleTabs('Props')).toEqual({
        type: TOGGLE_PROPS,
        name: 'Props',
      });
    });
  });

  describe('Case: Styles', () => {
    it('should return the proper action type, and the name of the tab', () => {
      expect(toggleTabs('Styles')).toEqual({
        type: TOGGLE_STYLES,
        name: 'Styles',
      });
    });
  });

  describe('Case: Events', () => {
    it('should return the proper action type, and the name of the tab', () => {
      expect(toggleTabs('Events')).toEqual({
        type: TOGGLE_EVENTS,
        name: 'Events',
      });
    });
  });
})
