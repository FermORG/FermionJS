
import React, { Component } from 'react';
import BlackBox_000 from '../BlackBox_000/BlackBox_000';
import BlueBox_001 from '../BlueBox_001/BlueBox_001';
import One_002 from '../One_002/One_002';
import One_003 from '../One_003/One_003';

const divStyle = {"width":"587.828125px","height":"645.984375px"}
class App extends Component {
  constructor(props){
    super(props);
  this.state = {}
  }
  /*Anything you type in here will be appeneded to App.js as a 
 method. you can then attach them as event handlers, logic handlers, etc.*/
  render(){
    
    return (
      <div style={divStyle}  >
        
        <BlackBox_000
         onClick={()=>{console.log("test")}}
 /> 
        <BlueBox_001
  /> 
        <One_002
  /> 
        <One_003
  /> 

      </div>
    );
  }
}
export default App;
