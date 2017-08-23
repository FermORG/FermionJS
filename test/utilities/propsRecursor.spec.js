import { appParser, getChildProps, flattenStateProps } from '../../app/utilities/propsRecursor';
import { WORKSPACE_ID } from '../../app/constants';
const defaultWorkspace = {
  componentCounter: 2,
  activeComponent: '0',
  components: {
    workspace: {
      id: WORKSPACE_ID,
      children: [0, 1],
      events: {},
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
    otherTestProp: 'test',
  },
  events: { test2: 'test2' }
};



describe('props Recursor', () => {

  describe('getChildProps', () => {
    it('should return parent props when there are no children', () => {
      const props = getChildProps(defaultWorkspace.components[0], defaultWorkspace.components);
      expect(props).toHaveProperty('testProp');
    });

    it('should return each child\'s props', () => {
      const props = getChildProps(defaultWorkspace.components['workspace'], defaultWorkspace.components);
      expect(props).toHaveProperty('0');
      expect(props).toHaveProperty('1');
      expect(props["0"]).toHaveProperty("testProp", null);
      expect(props["1"]).toHaveProperty("otherTestProp", "test")
    });
  });

  describe('appParser', () => {
    it('should parse the state tree and return a stateMap and eventsMap', ()=> {
      const clonedWorkspace = appParser(defaultWorkspace);
      expect(clonedWorkspace).toHaveProperty('components');
      expect(clonedWorkspace.components.workspace).toHaveProperty('events');
      expect(clonedWorkspace.components.workspace.events).toHaveProperty('0');
      expect(clonedWorkspace.components.workspace.events).toHaveProperty('1');
    });
  });

  describe('flattenStateProps', () => {
    it('should flatten a stateMap into an unnested object', () => {
      const state = getChildProps(defaultWorkspace.components['workspace'], defaultWorkspace.components);
      const flatState = flattenStateProps(state, 'workspace', defaultWorkspace.components);

      expect(flatState).toHaveProperty('testProp');
      expect(flatState).toHaveProperty('otherTestProp');
      expect(flatState).not.toHaveProperty('0');
      expect(flatState).not.toHaveProperty('1');
      expect(flatState).not.toHaveProperty('style');
    });
  });
});
