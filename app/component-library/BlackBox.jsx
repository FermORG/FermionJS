import React from 'react';

const style = {
  position: 'relative',
  height: '100px',
  width: '100px',
  display: 'inline-block',
  backgroundColor: 'black',
};

/* @fermion jsx */
const BlackBox = (props) => <div {...props} />
/* @fermion !jsx */

export default {
  jsx: BlackBox,
  style
};
