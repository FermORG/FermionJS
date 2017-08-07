import React, { Component } from 'react';
import styles from './photon.css';
import coreStyle from './Core.css';
import Tree from './CompTree.js';
import CompList from '../containers/CompList.js';

function Left(props){
  return (
    <div className = {`${styles['pane-med']} ${coreStyle.sidebar}`}>
      <CompList />
        <Tree />  
    </div>
  )
}

export default Left;
