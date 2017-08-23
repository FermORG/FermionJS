import React from 'react';

const One = (props) => (
  <div id={props.id} {...props} style={{ ...props.style }}>
    {props ? props.children : null}
    {props.value? props.value: null}
  </div>
);

export default One;
