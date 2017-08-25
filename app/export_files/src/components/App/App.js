
import React, { Component } from 'react';
import BlackBox_000 from '../BlackBox_000/BlackBox_000';

const divStyle = {"width":"602.40625px","height":"617.75px"}
class App extends Component {
  constructor(props){
    super(props);
  this.state = {}
  this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('i should work fine');
}
  render(){
    
    return (
      <div style={divStyle}  >
        
        <BlackBox_000
         handleClick={this.handleClick}
 /> 

      </div>
    );
  }
}
export default App;
