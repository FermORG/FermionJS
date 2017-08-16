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
     input: component.find('.form-control')
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
    });
  });
});
