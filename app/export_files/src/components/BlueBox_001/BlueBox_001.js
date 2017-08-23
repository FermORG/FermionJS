
import React, { Component } from 'react';

const divStyle = {"position":"absolute","height":"100px","width":"100px","display":"inline-block","backgroundColor":"#ffcc00","overflow":"auto","border":"1px solid lightgreen","left":210,"top":0}
class BlueBox extends Component {
  constructor(props){
    super(props);
  
  
  }
  
  render(){
    const { handleClick } = this.props;
    return (
      <div style={divStyle}  onClick={()=>handleClick()} >
        

      </div>
    );
  }
}
export default BlueBox;
