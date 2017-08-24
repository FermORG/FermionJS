import { getChildEvents, flattenEvents, insertMethods, insertThis } from '../../app/utilities/eventsRecursor';
import { WORKSPACE_ID } from '../../app/constants';
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
  events: { test2: 'test2' }
};



describe('events Recursor', () => {
  describe('insertThis', () => {
    const events = {
      handleTest: '()=>handleTest()',
      test: '()=>test()',
    };
    const methods = ['handleTest'];

    it('should insert the This Keyword when a method name is encountered', () => {
      const newEvent = insertThis(events, methods);
      expect(newEvent['handleTest']).toEqual('()=>this.handleTest()');
    });

    it('should do nothing to an event that does not reference a method', () => {
      const newEvent = insertThis(events, methods);
      expect(newEvent['test']).toEqual('()=>test()');
    });
  });

  describe('insertMethods', () => {
    const events = {
      onClick: '()=>handleTest()',
      test: '()=>test()',
    };
    const methods = ['handleTest'];
    it('should change keys to method names when they are referenced', ()=> {
      const newEvent = insertMethods(events, methods);
      expect(newEvent).not.toHaveProperty('onClick');
      expect(newEvent).toHaveProperty('handleTest');
      expect(newEvent).not.toHaveProperty('test');
    });

    it('should remove events from the chain that do not reference methods', ()=> {
      const newEvent = insertMethods(events, methods);
      expect(newEvent).not.toHaveProperty('test');
    });
  });

  describe('getChildEvents', () => {
    it('should return parent events when there are no children', () => {
      const events = getChildEvents(defaultWorkspace.components[0], defaultWorkspace.components);
      expect(events).toHaveProperty('test');
    });

    it('should return each child\'s events', () => {
      const events = getChildEvents(defaultWorkspace.components['workspace'], defaultWorkspace.components);
      expect(events).toHaveProperty('0');
      expect(events).toHaveProperty('1');
      expect(events["0"]).toHaveProperty("test", "test");
      expect(events["1"]).toHaveProperty("test2", "test2");
    });
  });

  describe('flattenEvents', () => {
    it('should flatten an eventsMap into an unnested object', () => {
      const events = getChildEvents(defaultWorkspace.components['workspace'], defaultWorkspace.components);
      const flatEvents = flattenEvents(events, 'workspace', defaultWorkspace.components);
      expect(flatEvents).toHaveProperty('test');
      expect(flatEvents).toHaveProperty('test2');
      expect(flatEvents).not.toHaveProperty('0');
      expect(flatEvents).not.toHaveProperty('1');
    });
  });
});
