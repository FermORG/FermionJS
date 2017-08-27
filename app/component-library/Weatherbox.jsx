import React from 'react';

const style = {
  border: '1 px solid #131131 ',
  borderRadius: '5px',
  display: 'inline-block',
  backgroundColor: '#000'
};

const inputStyle = {
  display: 'inline-block',
  margin: 'auto',
  borderRadius: '1px'
};

const buttonStyle = {
  display: 'inline-block',
  margin: 'auto',
  borderRadius: '1px'
};

/* @FERMION JSX */
const Weatherbox = (props) => (
  <div {...props}>
    <form onSubmit={(e) => props.getWeather(e)}>
      <input
        style={{ ...inputStyle, ...props.inputStyle}}
        type="text"
        placeholder="Enter location"/>
      <button
        style={{ ...buttonStyle, ...props.inputStyle }}
        type="submit">Get Weather
      </button>
        {props.weatherData}
    </form>
  </div>
);
/* @FERMION !JSX */

export default {
  jsx : Weatherbox,
  style
};
