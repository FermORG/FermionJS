import React from 'react';

const style = {
  height: "600px",
  width: "600px",
  display: "inline-block",
  backgroundColor: "grey",
}
/* @fermion jsx */
const Board = (props) => <div {...props}/>;
/* @fermion !jsx */

export default {
  jsx: Board,
  style
};