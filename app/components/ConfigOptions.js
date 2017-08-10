// @flow
import React, { Component } from 'react';
import styles from './photon.css';
import coreStyles from './Core.css';
import panelStyles from './Panels.css';

// returns renderable config Panel options.

export default function ConfigOptions(option, eHandler,  actionOptions) {
  const list = Object.keys(option).map((component) => {
      // prevents prop tab from rendering style.
      console.log('cc: ',component);
      actionOptions.prop = component;
    if (component === 'style') return null;
    return (
      <li key={component} className={`${styles["list-group-item"]}  ${panelStyles.list}`}>
        <strong>{`${component}`}</strong>
        <strong> : </strong>
        <input
          className={`${panelStyles.editField}`} defaultValue={`${option[component]}`}
          onKeyPress={(event)=> eHandler(event, actionOptions)}
        >
        </input>
        <div className={`${panelStyles.deleteKey}`}>X</div>
      </li>
    )
  });
// return a null component for react if there's nothing to display.
  return list.length !== 0 ? list : null;
}
