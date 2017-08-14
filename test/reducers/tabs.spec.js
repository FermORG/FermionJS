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

const actionMock = (type, name) => {
  return {
    type,
    name,
  };
};

describe('tabs reducer', () => {

  describe('TOGGLES', () => {
    it('should return a true value for the StateTab', () => {
      expect(toggleTabs(tabInfo, actionMock(TOGGLE_STATE, 'State'))).toHaveProperty('tabs.State', true);
    });

    it('should return a true value for the PropsTab', () => {
      expect(toggleTabs(tabInfo, actionMock(TOGGLE_PROPS, 'Props'))).toHaveProperty('tabs.Props', true);
    });

    it('should return a true value for the stylesTab', () => {
      expect(toggleTabs(tabInfo, actionMock(TOGGLE_STYLES, 'Styles'))).toHaveProperty('tabs.Styles', true);
    });

    it('should return a true value for the eventsTab', () => {
      expect(toggleTabs(tabInfo, actionMock(TOGGLE_EVENTS, 'Events'))).toHaveProperty('tabs.Events', true);
    });

    it('State should be activeTab', () => {
      expect(toggleTabs(tabInfo, actionMock(TOGGLE_STATE, 'State'))).toHaveProperty('activeTab', 'State');
    });

    it('Should return the same values when the action matches the current state', () => {
      expect(toggleTabs(tabInfo, actionMock(TOGGLE_STATE, 'State'))).toHaveProperty('activeTab', 'State');
    });

    it('Props should be activeTab', () => {
      expect(toggleTabs(tabInfo, actionMock(TOGGLE_PROPS, 'Props'))).toHaveProperty('activeTab', 'Props');
    });

    it('Styles should be activeTab', () => {
      expect(toggleTabs(tabInfo, actionMock(TOGGLE_STYLES, 'Styles'))).toHaveProperty('activeTab', 'Styles');
    });

    it('Events should be activeTab', () => {
      expect(toggleTabs(tabInfo, actionMock(TOGGLE_EVENTS, 'Events'))).toHaveProperty('activeTab', 'Events');
    });

    it('data should not change when a bad action is recieved', () => {
      expect(toggleTabs(tabInfo, actionMock('GIBBERISH', 'Props'))).toHaveProperty('activeTab', 'Props');
    });

  });
});
