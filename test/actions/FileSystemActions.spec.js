import { SET_ACTIVE_COMPONENT } from '../../app/actions/FileSystemActions';
import { setActiveComponent } from '../../app/actions/FileSystemActions';

describe('Component Tree Tests', () => {
  describe('setActiveComponent', () => {
    it('should return the correct action type and a component to mark as active', () => {
      expect(setActiveComponent('component')).toEqual({
        type: SET_ACTIVE_COMPONENT,
        component: 'component'
      });
    });
  });
});
