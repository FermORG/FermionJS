import { ADD_COMPONENTS, ADD_TO_PROJECT } from '../../app/actions/complist';
import { listReducer } from '../../app/reducers/complist';

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
}

describe('component listReducer', ()=>{
  it('should add testData to the components list', () => {
    expect(listReducer({}, {
      type: ADD_COMPONENTS,
      components: testData.components,
    })).toMatchSnapshot();
  });
});
