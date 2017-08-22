import BlackBox from './BlackBox';
import BlueBox from './BlueBox';
import Square from './Square';
import Row from './Square';
import Board from './Square';
const components = { BlackBox, BlueBox, Square, Row, Board };

const getVisComponent = (key) => components[key];

export default getVisComponent;
