import { ADD_COMPONENTS, ADD_TO_PROJECT } from '../../app/actions/complist';
import listReducer from '../../app/reducers/complist';

const testData = {
  components: [
    {
      name: 'Six',
      styles: {
        backgroundColor: 'white',
        height: '50%',
        width: '50%'
      },
    },
    {
      name: 'Seven',
      styles: {
        backgroundColor: 'blue',
        height: '50%',
        width: '50%'
      },
    },
  ]
};

const defaultData = {
  availableComponents: [
    {
      name: 'One',
      styles: {
        backgroundColor: 'red',
        height: '50%',
        width: '50%'
      }
    },
    {
      name: 'Two',
      styles: {
        backgroundColor: 'yellow',
        height: '50%',
        width: '50%'
      }
    },
    {
      name: 'Five',
      styles: {
        backgroundColor: 'white',
        height: '50%',
        width: '50%'
      },
    },
    {
      name: 'Four',
      styles: {
        backgroundColor: 'blue',
        height: '50%',
        width: '50%'
      },
    }
  ]
};


describe('component listReducer', () => {
  it('should add testData to the components list', () => {
    expect(listReducer(defaultData, {
      type: ADD_COMPONENTS,
      components: testData.components,
    })).toMatchSnapshot();
  });

  it('should return default data when presented with gibberish', () => {
    expect(listReducer(defaultData, {
      type: 'GIBBERISH',
      components: testData.components,
    })).toMatchSnapshot();
  });

  it('should return default data when the action type is ADD_TO_PROJECT', () => {
    expect(listReducer(defaultData, {
      type: ADD_TO_PROJECT,
      components: testData.components,
    })).toMatchSnapshot();
  });

});
