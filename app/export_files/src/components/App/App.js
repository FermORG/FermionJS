
import React, { Component } from 'react';
import BlackBox_000 from '../BlackBox_000/BlackBox_000';
import Square_002 from '../Square_002/Square_002';

const divStyle = {"width":"696.625px","height":"872.375px"}
class App extends Component {
  constructor(props){
    super(props);
  this.state = {}
  this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
  }
  render(){
    
    return (
      <div style={divStyle}  >
        
        <BlackBox_000
         onClick={()=>{console.log("test")}}
 /> 
        <Square_002
         handleClick={()=>this.handleClick()}
 /> 

      </div>
    );
  }
}
export default App;
