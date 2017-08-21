// @flow
import React, { Component } from 'react';
import styles from './photon.css';
import coreStyles from './Core.css';
import panelStyles from './Panels.css';
import ColorPicker from './ColorPicker';
// returns renderable config Panel options.

export default function ConfigOption(props) {
  const { activeComponent, propKey, value, action, deleter, actionHandler, onClick } = props;
  return (
    <li className={`${styles['list-group-item']}  ${panelStyles.list}`}>
      <strong>{`${propKey}`}</strong>
      <strong> : </strong>
      {addColorPicker(props)}
      {/* <input
        className={`${panelStyles.editField}`}
        placeholder={`${value}`}
        onKeyPress={(event) => actionHandler(event, action, activeComponent, propKey)}
      /> */}
      <div
        className={`${panelStyles.deleteKey}`}
        onClick={() => { onClick(deleter, activeComponent, propKey); }}
      >
        X
      </div>
    </li>
  );
}

function addColorPicker(props) {
  const { activeComponent, propKey, value, action, deleter, actionHandler, onClick } = props;
  console.log(propKey);
  if (propKey.indexOf('Color') === -1) {
    return (
      <input
        className={`${panelStyles.editField}`}
        placeholder={`${value}`}
        onKeyPress={(event) => actionHandler(event, action, activeComponent, propKey)}
      />
    );
  } else {
    return (<ColorPicker
    color={value}
    onChange={(event) => actionHandler(event, action, activeComponent, propKey)}
    />);
  }
}
