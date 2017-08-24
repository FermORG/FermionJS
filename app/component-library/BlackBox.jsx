import React from 'react';

const style = {
  position: 'relative',
  height: '100px',
  width: '100%',
  display: 'inline-block',
  backgroundColor: 'black',
};

const BlackBox = (props) => <div {...props} />

module.exports = {
  jsx: BlackBox,
  style
};
