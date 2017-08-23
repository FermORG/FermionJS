import { WORKSPACE_ID } from '../../app/constants';
import { ADD_COMPONENT, CREATE_COMPONENT, DELETE_COMPONENT, MOVE_COMPONENT, UPDATE_STYLE } from '../../app/actions/workspace';
import { addComponent, deleteComponent, moveComponent, updateStyle } from '../../app/actions/workspace';

describe('workspace actions', () => {
  describe('addComponent', () => {
    it('should return a payload with the correct action type, a component and a target', () => {
      const componentMock = {
        name: 'testComponent',
        props: {
          testKey: 'testProps'
        },
      };
      const result = addComponent('target', componentMock);
      expect(result).toMatchSnapshot();
      expect(result).toHaveProperty('targetID', 'target');
      expect(result).toHaveProperty('newComponent');
      expect(result).toHaveProperty('newComponent.props.testKey', 'testProps');
      expect(result).toHaveProperty('newComponent.name', 'testComponent');
      expect(result).toHaveProperty('newComponent.parentID', WORKSPACE_ID);
      expect(result).toHaveProperty('type', ADD_COMPONENT);
    });
  });

  describe('deleteComponent', () => {
    it('should return a payload with the correct action type and an id', () => {
      const result = deleteComponent('testID');
      expect(result).toMatchSnapshot();
      expect(result).toHaveProperty('type', DELETE_COMPONENT);
      expect(result).toHaveProperty('id', 'testID');
    });
  });

  describe('moveComponent', () => {
    it('should return a payload with the correct action type, a target and a source', () => {
      const result = moveComponent('testSource', 'testTarget');
      expect(result).toMatchSnapshot();
      expect(result).toHaveProperty('type', MOVE_COMPONENT);
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
