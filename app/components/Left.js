import React, { Component } from 'react';
import styles from './photon.scss';
import coreStyle from './Core.scss';
import panelStyles from './Panels.scss';
import CompList from '../containers/CompList.js';
import FileTree from '../containers/FileSystem.js';

function Left(props) {
  return (
    <div className={`${styles['pane-med']} ${coreStyle.sidebar}`}>
      <CompList />
      <div className={panelStyles.treeContainer}>
        <header className={panelStyles.header}>
          <h1 className={`${styles.title} ${panelStyles.title}`}>Component Tree</h1>
        </header>
        <FileTree />
      </div>
    </div>
  );
}

export default Left;
