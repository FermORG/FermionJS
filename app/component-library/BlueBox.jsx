import React from 'react';

const style = {
  position: 'relative',
  height: '100px',
  width: '100px',
  display: 'inline-block',
  backgroundColor: 'blue',
};

const BlackBox = (props) => <div {...props} />

export default {
  jsx: BlackBox,
  style
};
