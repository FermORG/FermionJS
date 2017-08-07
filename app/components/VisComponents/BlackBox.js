import React from 'react';

// import styles from './BlackBox.css';

const defaultStyles = {
  position: 'relative',
  height: '100px',
  width: '100px',
  display: 'inline-block',
  backgroundColor: 'black',
  resize: 'both',
  overflow: 'auto',
  zIndex: 1
};

const BlackBox = (props) => (
  <div id={props.id} style={props.style}>
    {props
      ? props.children
      : null}
  </div>
);

export default BlackBox;
