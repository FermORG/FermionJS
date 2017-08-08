// @flow
import React, { Component } from 'react';
import styles from './photon.css';
import coreStyles from './Core.css';
import panelStyles from './Panels.css';

// returns renderable config Panel options.

export default function configOptions(option) {
  // const option = props.option;
  console.log('op: ', option);
  const list = Object.keys(option).map((component) => {
      // prevents prop tab from rendering style.
    if (component === 'style') return null;
    return (
      <li key={component} className={`${styles["list-group-item"]}  ${panelStyles.list}`}>
        <input className={`${panelStyles.editField}`} defaultValue={`${component}`}></input>
        <strong> : </strong>
        <input className={`${panelStyles.editField}`} defaultValue={`${option[component]}`}></input>
        <div className={`${panelStyles.deleteKey}`}>X</div>
      </li>
    )
  });
// return a null component for react if there's nothing to display.
  return list.length !== 0 ? list : null;
}
