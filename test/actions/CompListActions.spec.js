import { AddComponents, AddToProject } from '../../app/actions/complist';

describe('Component List Actions', () => {
  describe('ADD_COMPONENTS', () => {
    it('should return an object with the right type and an array of component objects to add to the component list', ()=>{
      expect(AddComponents([{'one': 'five'}])).toEqual({
        type: 'ADD_COMPONENTS',
        components:[{one:'five'}],
      });
    });
  });
  describe('ADD_TO_PROJECT', () => {
    it('should return the correct action type and a component object to add to the workspace.', () => {
      expect(AddToProject({One:'Two'})).toEqual({
        type: 'ADD_TO_PROJECT',
        component: {One:'Two'}
      });
    });
  });
});
