import React from 'react';

const style = {
  border: '1 px solid #131131 ',
  borderRadius: '5px',
  display: 'inline-block',
  backgroundColor: '#000',
  inputStyles: {
    display: 'inline-block',
    margin: 'auto',
    borderRadius: '1px'
  },
  buttonStyles: {
    display: 'inline-block',
    margin: 'auto',
    borderRadius: '1px',
    backgroundColor: 'blue',
  }
};

const props = { };

const Weatherbox = (props) => (
  <div {...props}>
    <form onSubmit={(e) => props.getWeather(e)}>
      <input style={style.inputStyles} type="text" placeholder="Enter location"/>
      <button style={style.buttonStyles} type="submit">Get Weather</button>
      <div>{props.weatherData}</div>
    </form>
  </div>
);

export default {
  jsx : Weatherbox,
  style
};
