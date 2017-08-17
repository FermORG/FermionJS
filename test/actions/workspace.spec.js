import { WORKSPACE_ID } from '../../app/constants';
import { ADD_CHILD, CREATE_CHILD, DELETE_CHILD, MOVE_CHILD, REMOVE_CHILD, UPDATE_STYLE } from '../../app/actions/workspace';
import { addChild, removeChild, moveChild, updateStyle } from '../../app/actions/workspace';

describe('workspace actions', () => {
  describe('addChild', () => {
    it('should return a payload with the correct action type, a component and a target', () => {
      const componentMock = {
        name: 'testComponent',
        props: {
          testKey: 'testProps'
        },
      };
      const result = addChild('target', componentMock);
      expect(result).toMatchSnapshot();
      expect(result).toHaveProperty('targetID', 'target');
      expect(result).toHaveProperty('newComponent');
      expect(result).toHaveProperty('newComponent.props.testKey', 'testProps');
      expect(result).toHaveProperty('newComponent.name', 'testComponent');
      expect(result).toHaveProperty('newComponent.parentID', WORKSPACE_ID);
      expect(result).toHaveProperty('type', ADD_CHILD);
    });
  });

  describe('removeChild', () => {
    it('should return a payload with the correct action type and an id', () => {
      const result = removeChild('testID');
      expect(result).toMatchSnapshot();
      expect(result).toHaveProperty('type', REMOVE_CHILD);
      expect(result).toHaveProperty('id', 'testID');
    });
  });

  describe('moveChild', () => {
    it('should return a payload with the correct action type, a target and a source', () => {
      const result = moveChild('testSource', 'testTarget');
      expect(result).toMatchSnapshot();
      expect(result).toHaveProperty('type', MOVE_CHILD);
      expect(result).toHaveProperty('sourceID', 'testSource');
      expect(result).toHaveProperty('targetID', 'testTarget');
    });
  });

  describe('updateStyle', () => {
    it('should return a payload with correct action type, a source and a style', () => {
      const styleMock = {
        'height': '100px',
      };

      const result = updateStyle('testSource', styleMock);
      expect(result).toMatchSnapshot();
      expect(result).toHaveProperty('type', UPDATE_STYLE);
      expect(result).toHaveProperty('sourceID', 'testSource');
      expect(result).toHaveProperty('newStyle.height', '100px');
    });
  });

});
