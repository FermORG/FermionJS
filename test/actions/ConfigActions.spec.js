import { addState, addProps, addStyles, addEvents, deleteState, deleteProps, deleteStyles, deleteEvents, } from '../../app/actions/config';
import { ADD_STATE, ADD_PROPS, ADD_STYLES, ADD_EVENTS, DELETE_STATE, DELETE_PROPS, DELETE_STYLES, DELETE_EVENTS } from '../../app/actions/config';

describe('Config Panel Actions', () => {
  describe('Adding Values', () => {
    describe('addState', () => {
      it('should return a payload with the right action type and the state', () => {
        expect(addState({Key: 'value'})).toEqual({
          type: ADD_STATE,
          aState: {Key: 'value'},
        });
      });
    });

    describe('addProps', () => {
      it('should return a payload with the right action type, the prop and component', () => {
        expect(addProps({'Key': 'value'}, {component: 'component'})).toEqual({
          type: ADD_PROPS,
          prop: {'Key': 'value'},
          component: {component: 'component'},
        });
      });
    });

    describe('addStyles', () => {
      it('should return a payload with the right action type, the style and the component', () => {
        expect(addStyles({'Key': 'value'}, {component: 'component'})).toEqual({
          type: ADD_STYLES,
          style: {'Key': 'value'},
          component: {component: 'component'},
        });
      });
    });

    describe('addEvents', () => {
      it('should return a payload with the right action type, the event and the component', () => {
        expect(addEvents({'Key': 'value'}, {component: 'component'})).toEqual({
          type: ADD_EVENTS,
          event: {'Key': 'value'},
          component: {component: 'component'},
        });
      });
    });

  });

  describe('Deleting Values', () => {
    describe('deleteState', () => {
      it('should return a payload with the right action type, and a key to be deleted from state', () => {
        expect(deleteState('Key')).toEqual({
          type: DELETE_STATE,
          propKey: 'Key',
        });
      });
    });

    describe('deleteProps', () => {
      it('should return a payload with the right action type, a key to delete and the component', () => {
        expect(deleteProps('key', 'component')).toEqual({
          type: DELETE_PROPS,
          prop: 'key',
          component: 'component',
        });
      });
    });

    describe('deleteStyles', () => {
      it('should return a payload with the right action type, a key to delete and the component', () => {
        expect(deleteStyles('key', 'component')).toEqual({
          type: DELETE_STYLES,
          style: 'key',
          component: 'component',
        });
      });
    });

    describe('deleteEvents', () => {
      it('should return a payload with the right action type, a key to delete and the component', () => {
        expect(deleteEvents('key', 'component')).toEqual({
          type: DELETE_EVENTS,
          event: 'key',
          component: 'component',
        });
      });
    });
  });
});
