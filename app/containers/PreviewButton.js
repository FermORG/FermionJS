import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../components/photon.css';
import coreStyles from '../components/Core.css';
import path from 'path'

const EXPORT_DIR = 'export'
class PreviewButton extends Component {
  constructor(props){
    super(props)
    this.exportCode = this.exportCode.bind(this)
    this.displayText = this.displayText.bind(this)
  }
  changeViewMode(){

  }
  displayText(){
    return 'preview'
  }
  render() {
    return (
      <button className = {`${styles.btn} ${styles['btn-primary']} ${styles['pull-right']} ${coreStyles.btn}`} onClick={this.changeViewMode}>{this.displayText()}</button> 
    );
  }
}
function mapDispatchToProps(dispatch){

}

function mapStateToProps(state) {
  return {
    components: state.workspace.components
  };
}

export default connect(mapStateToProps, {})(PreviewButton);
