
import React, { Component } from 'react';

const divStyle = {"position":"absolute","height":"100px","width":"100px","display":"inline-block","backgroundColor":"blue","overflow":"auto","left":286,"top":228}
class BlueBox extends Component {
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
export default BlueBox;
