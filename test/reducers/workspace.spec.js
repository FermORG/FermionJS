import { ADD_CHILD, REMOVE_CHILD, MOVE_CHILD, DELETE_CHILD, UPDATE_STYLE } from '../../app/actions/workspace';
import { ADD_STATE, ADD_PROPS, ADD_STYLES, ADD_EVENTS, DELETE_STATE, DELETE_PROPS, DELETE_STYLES, DELETE_EVENTS } from '../../app/actions/config';
import { SET_ACTIVE_COMPONENT } from '../../app/actions/FileSystemActions';
import { WORKSPACE_ID } from '../../app/constants';
import addComponent from '../../app/reducers/workspace/addComponent';
import removeComponent from '../../app/reducers/workspace/removeComponent';
import moveChild from '../../app/reducers/workspace/moveChild';
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
  state: {},
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
  // too big for tonight
  // describe('CASE: REMOVE CHILD', () => {
  //   it('should remove a child from the workspace state', () => {
  //     const actionMock = {
  //       type: REMOVE_CHILD,
  //     }
  //   });
  // });

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

    });
  });





});
