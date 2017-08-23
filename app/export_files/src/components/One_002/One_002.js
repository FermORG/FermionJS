
import React, { Component } from 'react';

const divStyle = {"position":"relative","height":"20px","width":"20px","display":"inline-block","backgroundColor":"yellow","resize":"both","overflow":"auto"}
class One extends Component {
  constructor(props){
    super(props);
  
  }
  
  render(){
    
    return (
      <div style={divStyle}  >
        

      </div>
    );
  }
}
export default One;
