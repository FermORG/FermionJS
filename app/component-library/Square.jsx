import React from 'react';

const style = {
  height: "100px",
  width: "100px",
  display: "inline-block",
  backgroundColor: "grey",
}

const Square = (props) => <div {...props}/>;

export default {
  jsx: Square,
  style
};