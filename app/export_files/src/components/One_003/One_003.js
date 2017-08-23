
import React, { Component } from 'react';

const divStyle = {"position":"relative","height":"50px","width":"50px","display":"inline-block","backgroundColor":"yellow","resize":"both","overflow":"auto","left":185,"top":294}
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
