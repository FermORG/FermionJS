import React from "react";

const style = {
  borderRadius: "5px",
  display: "inline-block",
  backgroundColor: "#f4f4f4",
  color: "#000",
  height: "200px",
  width: "320px",
  // inputStyles: {
  //   display: "block",
  //   margin: "auto",
  //   borderRadius: "2px"
  // },
  inputStyles: {
    display: "block",
    margin: "30px auto 10px auto",
    border: "2px solid #89d2d5",
    padding: "5px",
    borderRadius: "5px"
  },
  inputStylesFocus: { backgroundColor: "#000" },
  buttonStyles: {
    display: "block",
    margin: "auto",
    backgroundColor: "white",
    color: "black",
    border: "2px solid #89d2d5  " /* Green */
  },
  output: {
    fontFamily: "Arial, Helvetica",
    textAlign: "center",
    color: "black"
  }
};

const props = {};

const Weatherbox = props =>
  <div {...props}>
    <form onSubmit={(e) => props.getWeather(e)}>
      <input
        style={style.inputStyles}
        type="text"
        placeholder="Enter location"
      />
      <button
        style={style.buttonStyles}
        type="submit"
      >
        Get Weather
      </button>
      <hr width="50%" />
      <p style={style.output}>
        {props.weatherData
          ? `It is ${props.weatherData.tempF}f, ${props.weatherData.description}`
          : "Enter a location above..."}
      </p>
    </form>
  </div>;

export default {
  jsx: Weatherbox,
  style
};
