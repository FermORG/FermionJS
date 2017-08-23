
import React, { Component } from 'react';
import BlackBox_000 from '../BlackBox_000/BlackBox_000';
import BlueBox_001 from '../BlueBox_001/BlueBox_001';

const divStyle = {"width":"1140px","height":"906.5px"}
class App extends Component {
  constructor(props){
    super(props);
  this.state = {}
  
  }
  /*Anything you type in here will be appended to App.js as a 
 method. you can then attach them as event handlers, logic handlers, etc.*/
  render(){
    
    return (
      <div style={divStyle}  >
        
        <BlackBox_000
         onClick={()=>{console.log("test")}}
 /> 
        <BlueBox_001
  /> 

      </div>
    );
  }
}
export default App;
