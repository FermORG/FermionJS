import React from 'react';

const style = {
  height: "100px",
  width: "300px",
  display: "inline-block",
  backgroundColor: "grey",
}
/* @fermion jsx */
const Row = (props) => <div {...props}/>;
/* @fermion !jsx */

export default {
  jsx: Row,
  style
};