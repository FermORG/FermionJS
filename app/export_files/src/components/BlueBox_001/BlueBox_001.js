
import React, { Component } from 'react';

const divStyle = {"position":"absolute","height":"100px","width":"100px","display":"inline-block","backgroundColor":"blue","overflow":"auto","left":102,"top":0,"border":"1px solid lightgreen"}
class BlueBox extends Component {
  constructor(props){
    super(props);
  
  
  }
  
  render(){
    const { onClick } = this.props;
    return (
      <div style={divStyle}  onClick={()=>console.log('jeff fucking chill')} >
        

      </div>
    );
  }
}
export default BlueBox;
