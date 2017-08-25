
import React, { Component } from 'react';
import BlueBox_001 from '../BlueBox_001/BlueBox_001';

const divStyle = {"position":"absolute","height":"170px","width":"180px","display":"inline-block","backgroundColor":"black","overflow":"auto"}
class BlackBox extends Component {
  constructor(props){
    super(props);
  
  
  }
  
  render(){
    const { handleClick } = this.props;
    return (
      <div style={divStyle}  onClick={()=>{console.log("test")}} >
        
        <BlueBox_001
         handleClick={handleClick}
 /> 

      </div>
    );
  }
}
export default BlackBox;
