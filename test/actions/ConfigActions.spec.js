import { addState, addProps, addStyles, addEvents, deleteState, deleteProps, deleteStyles, deleteEvents, } from '../../app/actions/config';
import { ADD_STATE, ADD_PROPS, ADD_STYLES, ADD_EVENTS, DELETE_STATE, DELETE_PROPS, DELETE_STYLES, DELETE_EVENTS } from '../../app/actions/config';

describe('Config Panel Actions', () => {
  describe('Adding Values', () => {
    describe('addState', () => {
      it('should return an object with Jeff\'s tiny biceps', () => {
        expect(addState({Key: 'value'})).toEqual({
          type: ADD_STATE,
          aState: {Key: 'value'},
        });
      });
    });

    describe('addProps', () => {
      it('should return an object with the right type, an object containing its recieved props key value pair and a component to add it to', () => {
        expect(addProps({'Key': 'value'}, {component: 'component'})).toEqual({
          type: ADD_PROPS,
          prop: {'Key': 'value'},
          component: {component: 'component'},
        });
      });
    });

    describe('addStyles', () => {
      it('should return an object with the right type, an object containing its recieved style key value pair and a component to add it to', () => {
        expect(addStyles({'Key': 'value'}, {component: 'component'})).toEqual({
          type: ADD_STYLES,
          style: {'Key': 'value'},
          component: {component: 'component'},
        });
      });
    });

    describe('addEvents', () => {
      it('should return an object with the right type, an object containing its recieved event key value pair and a component to add it to', () => {
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
      it('should return an object with the right type and an object containing its recieved state key value pair', () => {
        expect(deleteState('Key')).toEqual({
          type: DELETE_STATE,
          propKey: 'Key',
        });
      });
    });

    describe('deleteProps', () => {
      it('should return an object with the right type, an object containing its recieved props key value pair and a component to add it to', () => {
        expect(deleteProps('key', 'component')).toEqual({
          type: DELETE_PROPS,
          prop: 'key',
          component: 'component',
        });
      });
    });

    describe('deleteStyles', () => {
      it('should return an object with the right type, an object containing its recieved style key value pair and a component to add it to', () => {
        expect(deleteStyles('key', 'component')).toEqual({
          type: DELETE_STYLES,
          style: 'key',
          component: 'component',
        });
      });
    });

    describe('deleteEvents', () => {
      it('should return an object with the right type, an object containing its recieved event key value pair and a component to add it to', () => {
        expect(deleteEvents('key', 'component')).toEqual({
          type: DELETE_EVENTS,
          event: 'key',
          component: 'component',
        });
      });
    });
  });
});
