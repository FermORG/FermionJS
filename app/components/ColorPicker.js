'use strict'
import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker, ChromePicker } from 'react-color';

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
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
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        container: {
          display: 'inline-block'
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '100%',
          background: 'none',
          // borderRadius: '100%',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'relative',
          width: '100%',
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
      <div style={ styles.container}>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <ChromePicker
            color={ this.state.color }
            onChange={ this.handleChange }
            display={'inlineBlock'}
            backgroundColor={'blue'}
          />
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker;
