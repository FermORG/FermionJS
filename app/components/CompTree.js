import React, { Component } from 'react';
import styles from './photon.css';
import panelStyles from './Panels.css';
// import { Link } from 'react-router-dom';
import FileTree from './FileSystem.js';

function Tree(props){
  return (
    <div className = {panelStyles.treeContainer}>
      <header className = {panelStyles.header}>
        <h1 className={`${styles.title} ${panelStyles.title}`}>Component Tree</h1>
      </header>
      <FileTree />
    </div>
  )
}

export default Tree;
