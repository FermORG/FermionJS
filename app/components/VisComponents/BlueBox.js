import React from 'react';

// import styles from './BlackBox.css';

const defaultStyles = {
  position: 'relative',
  height: '30px',
  width: '30px',
  display: 'inline-block',
  backgroundColor: 'blue',
  resize: 'both',
  overflow: 'auto',
  zIndex: 2,
};


const BlueBox = (props) => (
  <div {...props}>
    {props ? props.children : null}
  </div>
    );

export default BlueBox;
