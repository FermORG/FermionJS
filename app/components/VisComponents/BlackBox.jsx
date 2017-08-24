const style = {
  position: 'relative',
  height: '100px',
  width: '100%',
  display: 'inline-block',
  backgroundColor: 'black',
  resize: 'both',
  overflow: 'auto',
  zIndex: 1
};

const BlackBox = (props) => <div {...props} />

module.exports = {
  jsx: BlackBox,
  style
};
