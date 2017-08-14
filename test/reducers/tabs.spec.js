import { TOGGLE_STATE, TOGGLE_PROPS ,TOGGLE_STYLES, TOGGLE_EVENTS } from '../../app/actions/tabs';
import toggleTabs from '../../app/reducers/tabs';

const defaultTabs = {
  State: false,
  Props: true,
  Events: false,
  Styles: false,
};

const tabInfo = {
  tabs: defaultTabs,
  activeTab: 'Props',
};

describe('tabs reducer', () => {
  describe('TOGGLES', () => {
    it('should return a true value for the StateTab', () => {
      expect(toggleTabs(tabInfo, {
        type: TOGGLE_STATE,
        name: 'State',
      })).toHaveProperty('tabs.State', true);
    });

    it('should return a true value for the PropsTab', () => {
      expect(toggleTabs(tabInfo, {
        type: TOGGLE_PROPS,
        name: 'Props',
      })).toHaveProperty('tabs.Props', true);
    });

    it('should return a true value for the stylesTab', () => {
      expect(toggleTabs(tabInfo, {
        type: TOGGLE_STYLES,
        name: 'Styles',
      })).toHaveProperty('tabs.Styles', true);
    });

    it('should return a true value for the eventsTab', () => {
      expect(toggleTabs(tabInfo, {
        type: TOGGLE_EVENTS,
        name: 'Events',
      })).toHaveProperty('tabs.Events', true);
    });
  });
});
