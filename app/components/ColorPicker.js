'use strict'
import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker, ChromePicker } from 'react-color';

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {

    // fake an event object to allow colorpicker to reuse functions in redux.
    const fakeEvent = {
      key: 'Enter',
      target: {
        value: color.hex,
      },
    };
    this.props.onChange(fakeEvent);
  };

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '10px',
          display: 'inline-block',
          height: '10px',
          borderRadius: '50%',
          border: '1 px solid #FFF',
          background: `${this.props.color}`,
        },
        container: {
          display: 'inline-block'
        },
        swatch: {
          padding: '5px',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'relative',
          width: '95%',
          right: '-10px',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          display: 'inline-block',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div style={styles.container}>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? <div style={styles.popover}>
          <div style={styles.cover} onClick={this.handleClose}/>
          <ChromePicker
            color={this.props.color}
            onChange={this.handleChange}
            display={'inlineBlock'}
          />
        </div> : null}

      </div>
    )
  }
}

export default ColorPicker;
