// @flow
import React, { Component } from 'react';
import styles from './photon.scss';
import coreStyles from './Core.scss';
import panelStyles from './Panels.scss';

// returns renderable config Panel options.

export default function ConfigOption(props) {
  const { activeComponent, propKey, value, action, deleter, actionHandler, onClick } = props;
  return (
    <li className={`${styles['list-group-item']}  ${panelStyles.list}`}>
      <strong>{`${propKey}`}</strong>
      <strong> : </strong>
      <input
        className={`${panelStyles.editField}`}
        onKeyPress={(event) => actionHandler(event, action, activeComponent, propKey)}
        defaultValue={value}
      />

       <a className={`${coreStyles['btn']} ${coreStyles['btn-blue']} ${styles['pull-right']}`}
        onClick={() => { onClick(deleter, activeComponent, propKey)}}>
         X
      </a> 
    </li>
  );
}
