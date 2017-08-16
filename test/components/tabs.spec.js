import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { spy } from 'sinon';
 // for jest snapshots
import renderer from 'react-test-renderer';
import { State, Props, Styles, Events } from '../../app/components/ConfigClasses';

const defaultWorkspace = {
  componentCounter: 2,
  activeComponent: '0',
  components: {
    workspace: {
      id: 'workspace',
      children: [0, 1],
    },
  },
  state: { default: 'default', test:'test' },
};

defaultWorkspace.components[0] = {
  id: 0,
  name: 'BlackBox',
  children: [],
  parentID: 'workspace',
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
  parentID: 'workspace',
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

 function setupState() {
   const actions = {
     addState: spy(),
     deleteState: spy(),
   };
   const component = shallow(<State workspace={defaultWorkspace} {...actions} />);
   return {
     component,
     actions,
     input: component.find('.form-control'),
   }
 }

 function setupProps() {
   const actions = {
     addProps: spy(),
     deleteProps: spy(),
   };
   const component = shallow(<Props workspace={defaultWorkspace} {...actions} />);
   return {
     component,
     actions,
     input: component.find('.form-control'),
   }
 }

 function setupStyles() {
   const actions = {
     addStyles: spy(),
     deleteStyles: spy(),
   };
   const component = shallow(<Styles workspace={defaultWorkspace} {...actions} />);
   return {
     component,
     actions,
     input: component.find('.form-control'),
   }
 }

 function setupEvents() {
   const actions = {
     addEvents: spy(),
     deleteEvents: spy(),
   };
   const component = shallow(<Events workspace={defaultWorkspace} {...actions} />);
   return {
     component,
     actions,
     input: component.find('.form-control'),
   }
 }
describe('tabs components', () => {
  describe('State Tab', () => {
    const { component, input, actions } = setupState();
    it('should render HTML as expected', () => {
      expect(component.type()).toEqual('div');
      expect(component.contains(<hr />)).toBe(true);
      expect(input.is('.input')).toBe(true);
      expect(input.is('.form-control')).toBe(true);
    });

    it('should render a child for each entry in state', () => {
      const compLength = Object.keys(defaultWorkspace.state).length;
      // there are two pure html elements in the component.
      expect(component.children().length).toEqual(2 + compLength);
    });

    it('should pass a value to state from the input', () => {
      const keypressMock = {
        key: 'Enter',
        target: {
          value: 'test'
        },
      };
      input.simulate('keyPress', keypressMock);
      expect(actions.addState.called).toBe(true);
      expect(actions.addState.args[0][0]).toEqual({test: null});
      expect(actions.addState.args[0][1]).toEqual(null);
    });
  });

  describe('Props Tab', () => {
    const { component, input, actions } = setupProps();

    it('should render HTML as expected', () => {
      expect(component.type()).toEqual('div');
      expect(component.contains(<hr />)).toBe(true);
      expect(input.is('.input')).toBe(true);
      expect(input.is('.form-control')).toBe(true);
    });

    it('should render a child for each entry in props, less style', () => {
      const compLength = Object.keys(defaultWorkspace.components[0].props).length - 1; // less one for style
      // there are two pure html elements in the component.
      expect(component.children().length).toEqual(2 + compLength);
    });

    it('should pass a value to props from the input', () => {
      const keypressMock = {
        key: 'Enter',
        target: {
          value: 'test'
        },
      };
      input.simulate('keyPress', keypressMock);
      expect(actions.addProps.called).toBe(true);
      expect(actions.addProps.args[0][0]).toEqual({test: null});
      expect(actions.addProps.args[0][1]).toEqual('0');
    });
  });

  describe('Styles Tab', () => {
    const { component, input, actions } = setupStyles();

    it('should render HTML as expected', () => {
      expect(component.type()).toEqual('div');
      expect(component.contains(<hr />)).toBe(true);
      expect(input.is('.input')).toBe(true);
      expect(input.is('.form-control')).toBe(true);
    });

    it('should render a child for each entry in style', () => {
      const compLength = Object.keys(defaultWorkspace.components[0].props.style).length;
      // there are two pure html elements in the component.
      expect(component.children().length).toEqual(2 + compLength);
    });

    it('should pass a value to styles from the input', () => {
      const keypressMock = {
        key: 'Enter',
        target: {
          value: 'test'
        },
      };
      input.simulate('keyPress', keypressMock);
      expect(actions.addStyles.called).toBe(true);
      expect(actions.addStyles.args[0][0]).toEqual({test: null});
      expect(actions.addStyles.args[0][1]).toEqual('0');
    });
  });

  describe('Events Tab', () => {
    const { component, input, actions } = setupEvents();

    it('should render HTML as expected', () => {
      expect(component.type()).toEqual('div');
      expect(component.contains(<hr />)).toBe(true);
      expect(input.is('.input')).toBe(true);
      expect(input.is('.form-control')).toBe(true);
    });

    it('should render a child for each entry in style', () => {
      const compLength = Object.keys(defaultWorkspace.components[0].events).length;
      // there are two pure html elements in the component.
      expect(component.children().length).toEqual(2 + compLength);
    });

    it('should pass a value to styles from the input', () => {
      const keypressMock = {
        key: 'Enter',
        target: {
          value: 'test'
        },
      };
      input.simulate('keyPress', keypressMock);
      expect(actions.addEvents.called).toBe(true);
      expect(actions.addEvents.args[0][0]).toEqual({test: null});
      expect(actions.addEvents.args[0][1]).toEqual('0');
    });
  });
});
