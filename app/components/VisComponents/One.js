import React from 'react';

const defaultStyles = {
  position: 'relative',
  height: '20px',
  width: '20px',
  display: 'inline-block',
  backgroundColor: 'green',
  resize: 'both',
  overflow: 'auto',
  zIndex: 3
};

const One = (props) => (
  <div id={props.id} {...props} style={{...defaultStyles, ...props.style}}>
     {props ? props.children : null}
  </div>
);

export default One;
