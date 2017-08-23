
import React, { Component } from 'react';
import BlackBox_000 from '../BlackBox_000/BlackBox_000';
import BlueBox_001 from '../BlueBox_001/BlueBox_001';

const divStyle = {"width":"602.40625px","height":"617.75px"}
class App extends Component {
  constructor(props){
    super(props);
  this.state = {}
  this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('test');
}
  render(){
    
    return (
      <div style={divStyle}  >
        
        <BlackBox_000
         onClick={()=>{console.log("test")}}
 /> 
        <BlueBox_001
         handleClick={()=>this.handleClick()}
 /> 

      </div>
    );
  }
}
export default App;
