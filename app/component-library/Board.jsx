import React from 'react';

const style = {
  height: "300px",
  width: "300px",
  display: "inline-block",
  backgroundColor: "black",
  border: "1px solid white"
}

/* @fermion jsx */
const Board = (props) => <div {...props}/>;
/* @fermion !jsx */

export default {
  jsx: Board,
  style
};