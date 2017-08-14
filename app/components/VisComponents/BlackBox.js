import React from 'react';

const defaultStyles = {
  position: 'relative',
  height: '100px',
  width: '100%',
  display: 'inline-block',
  backgroundColor: 'black',
  resize: 'both',
  overflow: 'auto',
  zIndex: 1
};

const BlackBox = (props) => (
  <div id={props.id} {...props}>
    {props
      ? props.children
      : null}
    <ul>
      <li> Garrett </li>
      <li> Jeff </li>
      <li> Hai </li>
      <li> Chris</li>
    </ul>
  </div>
);

export default BlackBox;
