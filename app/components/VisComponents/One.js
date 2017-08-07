import React from 'react';

// import styles from './BlackBox.css';

const defaultStyles = {
  position: 'absolute',
  height: '20px',
  width: '20px',
  display: 'inline-block',
  backgroundColor: 'green',
  resize: 'both',
  overflow: 'auto',
  zIndex: 3
};

const One = (props) => (
  <div id={props.id} style={{...defaultStyles, ...props.style }}>
     {props ? props.children : null}
  </div>
);

export default One;
