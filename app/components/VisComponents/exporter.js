import BlackBox from './BlackBox';
import BlueBox from './BlueBox';
import One from './One';

const components = { BlackBox, BlueBox, One };

const getVisComponent = (key) => components[key];

export default getVisComponent;
