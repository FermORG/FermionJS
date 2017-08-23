
import React, { Component } from 'react';

const divStyle = {"position":"absolute","height":"100px","width":"100px","display":"inline-block","backgroundColor":"black","overflow":"auto"}
class BlackBox extends Component {
  constructor(props){
    super(props);
  
  
  }
  
  render(){
    const { handleClick } = this.props;
    return (
      <div style={divStyle}  onClick={()=>handleClick(red)} >
        

      </div>
    );
  }
}
export default BlackBox;
