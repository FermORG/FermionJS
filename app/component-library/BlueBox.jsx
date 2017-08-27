import React from 'react';

const style = {
  position: 'relative',
  height: '100px',
  width: '100px',
  display: 'inline-block',
  backgroundColor: 'blue',
};

/* @fermion jsx */
const BlueBox = (props) => <div {...props} />
/* @fermion !jsx */

export default {
  jsx: BlueBox,
  style
};
