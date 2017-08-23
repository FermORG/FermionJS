// @flow
import React, { Component } from 'react';
import styles from './photon.scss';
import coreStyles from './Core.scss';
import panelStyles from './Panels.scss';

// returns renderable config Panel options.

export default class ConfigOption extends Component {
  constructor(props){
    super(props)
    this.state = {
      deleteButton: ""
    }
  }
  render(){
    const { activeComponent, propKey, value, action, deleter, actionHandler, onClick } = this.props;
    return (
      <li className={`${styles['list-group-item']}  ${panelStyles.list}`}>
        <strong>{`${propKey}`}</strong>
        <strong> : </strong>
        <input
          className={`${panelStyles.editField}`}
          onKeyPress={(event) => actionHandler(event, action, activeComponent, propKey)}
          defaultValue={value}
        />
        <a className={`${coreStyles['deleteKey']}`}
          onClick={() => { onClick(deleter, activeComponent, propKey)}}
          onMouseOver={() => {this.setState({deleteButton: "X"})}}
          onMouseLeave={() => {this.setState({deleteButton: ""})}}>
          {this.state.deleteButton}
        </a> 
    
      </li>
    );
  }

}
 

// <a className={`${coreStyles['btn']} ${coreStyles['btn-blue']} ${styles['pull-right']}`}
//   onClick={() => { onClick(deleter, activeComponent, propKey)}}>
//   X
// </a> 
