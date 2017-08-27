
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
      { props.children }
  </div>
);
