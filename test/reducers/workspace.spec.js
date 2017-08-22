import { ADD_CHILD, MOVE_CHILD, DELETE_COMPONENT, UPDATE_STYLE } from '../../app/actions/workspace';
import { ADD_STATE, ADD_PROPS, ADD_STYLES, ADD_EVENTS, DELETE_STATE, DELETE_PROPS, DELETE_STYLES, DELETE_EVENTS } from '../../app/actions/config';
import { SET_ACTIVE_COMPONENT } from '../../app/actions/FileSystemActions';
import { WORKSPACE_ID } from '../../app/constants';
import addComponent from '../../app/reducers/workspace/addComponent';
import moveComponent from '../../app/reducers/workspace/moveComponent';
import addStateValue from '../../app/reducers/workspace/addStateValue';
import addPropsValue from '../../app/reducers/workspace/addPropsValue';
import addStyleValue from '../../app/reducers/workspace/addStyleValue';
import addEvent from '../../app/reducers/workspace/addEvent';
import deleteStateValue from '../../app/reducers/workspace/deleteStateValue';
import deletePropsValue from '../../app/reducers/workspace/deletePropsValue';
import deleteStylesValue from '../../app/reducers/workspace/deleteStylesValue';
import deleteEvent from '../../app/reducers/workspace/deleteEvent';
import setActiveComponent from '../../app/reducers/workspace/setActiveComponent';
import updateStyle from '../../app/reducers/workspace/updateStyle';

import workspace from '../../app/reducers/workspace/index';

const defaultWorkspace = {
  componentCounter: 2,
  activeComponent: '0',
  components: {
    workspace: {
      id: WORKSPACE_ID,
      children: [0, 1],
    },
  },
  state: { default: 'default' },
};

defaultWorkspace.components[0] = {
  id: 0,
  name: 'BlackBox',
  children: [],
  parentID: WORKSPACE_ID,
  props: {
    style: {
      position: 'relative',
      height: '100px',
      width: '100px',
      display: 'inline-block',
      backgroundColor: 'black',
      overflow: 'auto',
    },
    testProp: null,
  },
  events: { test: 'test' }
};

defaultWorkspace.components[1] = {
  id: 1,
  name: 'BlueBox',
  children: [],
  parentID: WORKSPACE_ID,
  props: {
    style: {
      position: 'relative',
      height: '100px',
      width: '100px',
      display: 'inline-block',
      backgroundColor: 'blue',
      overflow: 'auto',
    },
  },
  events: { test: 'event test =]' }
};



describe('workspace Reducer', () => {
  describe('CASE: ADD CHILD', () => {
    it('should add a child to the workspace state', () => {
      const actionMock = {
        type: ADD_CHILD,
        newComponent: {
          id: 2,
          name: 'test',
          props: {
            style: {
              position: 'relative',
            },
          },
          events: {test: 'test'}
        },
      };
      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toMatchSnapshot();
      expect(result).toHaveProperty('componentCounter', 3);
      expect(result).toHaveProperty('components.workspace.children', [0,1,2]);
        //write some more here later, this is a big object and needs to be controlled.
    });
  });
  
  describe('CASE: MOVE_CHILD', () => {
    it('should nest a component in another component', () => {
      const actionMock = {
        type: MOVE_CHILD,
        targetID: 1,
        sourceID: 0,
      };
      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toMatchSnapshot();
      expect(result).toHaveProperty('componentCounter', 2);
      expect(result.components[1]).toHaveProperty('children', [0]);
    });

    it('should not move a component into itself', () => {
      const actionMock = {
        type: MOVE_CHILD,
        targetID: 1,
        sourceID: 1,
      };

      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toMatchObject(defaultWorkspace);
    });

    it('should not move a component into its own parent', () => {
      const actionMock = {
        type: MOVE_CHILD,
        targetID: WORKSPACE_ID,
        sourceID: 0,
      };

      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toMatchObject(defaultWorkspace);
    })
  });

  describe('CASE: ADD STATE', () => {
    it('should add a value to the workspace state object', () => {
      const actionMock = {
        type: ADD_STATE,
        aState: {
          'test': null,
        },
      };

      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toMatchSnapshot();
      expect(result).toHaveProperty('state.test', null);
      expect(result).toHaveProperty('state.default', 'default');
    });
  });

  describe('CASE: ADD_PROPS', () => {
    it('should add a prop to a component', () => {
      const actionMock = {
        type: ADD_PROPS,
        prop: {
          test: null,
        },
        component: 0,
      };

      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toMatchSnapshot();
      expect(result.components[0]).toHaveProperty('props.test', null);
    });

    it('should not add a style prop', () => {
      const actionMock = {
        type: ADD_PROPS,
        prop: {
          style: null,
        },
        component: 0,
      };
      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toMatchObject(defaultWorkspace);
    })
  });

  describe('CASE: ADD_STYLES', () => {
    it('should add a new style to props.style', () => {
      const actionMock = {
        type: ADD_STYLES,
        style: { border: null },
        component: 0,
      };

      const result = workspace(defaultWorkspace, actionMock);

      expect(result).toMatchSnapshot();
      expect(result.components[0].props.style).toHaveProperty('border', null);
    });
  });

  describe('CASE: ADD_EVENTS', () => {
    it('should add a new event to a component', () => {
      const actionMock = {
        type: ADD_EVENTS,
        event: { onClick: null },
        component: 0,
      };

      const result = workspace(defaultWorkspace, actionMock);

      expect(result).toMatchSnapshot();
      expect(result.components[0].events).toHaveProperty('onClick', null);
    });
  });

  describe('CASE: DELETE_STATE', () => {
    it('should remove a value from the app state', () => {
      const actionMock = {
        type: DELETE_STATE,
        propKey: 'default'
      };

      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toMatchSnapshot();
      expect(result.state).not.toHaveProperty('default');
    });
  });

  describe('CASE: DELETE_PROPS', () => {
    it('should remove a value from a component\'s props', () => {
      const actionMock = {
        type: DELETE_PROPS,
        prop: 'testProp',
        component: 0,
      };

      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toMatchSnapshot();
      expect(result.components[0].props).not.toHaveProperty('testProp');
    });

    it('should not remove the style prop from a component', () => {
      const actionMock = {
        type: DELETE_PROPS,
        prop: 'style',
        component: 0,
      };
      const result = workspace(defaultWorkspace, actionMock);
      expect(result.components[0].props).toHaveProperty('style');
      expect(result).toMatchObject(defaultWorkspace);
    });
  });

  describe('CASE: DELETE STYLE', () => {
    it('should remove a key from the style object', () => {
      const actionMock = {
        type: DELETE_STYLES,
        style: 'backgroundColor',
        component: 0,
      };

      const result = workspace(defaultWorkspace, actionMock);
      expect(result.components[0].props.style).not.toHaveProperty('backgroundColor');
      expect(result).toMatchSnapshot();
    });
  });

  describe('CASE: DELETE EVENTS', () => {
    it('should remove an event from a component', () => {
      const actionMock = {
        type: DELETE_EVENTS,
        event: 'test',
        component: 0,
      };

      const result = workspace(defaultWorkspace, actionMock);
      expect(result.components[0].events).toBeDefined();
      expect(result.components[0].events).not.toHaveProperty('test');
      expect(result).toMatchSnapshot();
    });
  });

  describe('CASE: SET ACTIVE COMPONENT', () => {
    it('should update the activeComponent', () => {
      const actionMock = {
        type: SET_ACTIVE_COMPONENT,
        component: "1",
      };
      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toHaveProperty('activeComponent', "1");
    });

    it('should do nothing if component is already active', () => {
      const actionMock = {
        type: SET_ACTIVE_COMPONENT,
        component: "0",
      };
      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toHaveProperty('activeComponent', "0");
    });
  });

  describe('CASE: UPDATE_STYLE', () => {
    it('should update style for a component', () => {
      const actionMock = {
        type: UPDATE_STYLE,
        sourceID: 0,
        newStyle: { 'newStyle': null },
      };
      const result = workspace(defaultWorkspace, actionMock);
      expect(result.components[0].props.style).toHaveProperty('newStyle', null);
    });
  });

  describe('CASE: GIBBERISH', () => {
    it('should do nothing when presented with a bad action type', () => {
      const actionMock = {
        type: 'GIBBERISH',
      };
      const result = workspace(defaultWorkspace, actionMock);
      expect(result).toMatchObject(defaultWorkspace);
    });
  });
});
