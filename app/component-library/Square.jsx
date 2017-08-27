import React from 'react';

const style = {
  height: "100px",
  width: "100px",
  display: "inline-block",
  backgroundColor: "grey",
}
/* @fermion jsx */
const Square = (props) => <div {...props}/>;
/* @fermion !jsx */

export default {
  jsx: Square,
  style
};