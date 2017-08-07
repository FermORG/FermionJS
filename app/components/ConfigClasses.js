//@flow
import React, { Component } from 'react';
import styles from './photon.css';
import coreStyles from './Core.css';
import panelStyles from './Panels.css';

export class State extends Component {
  // should return a list built from the current state.
  render(){
    return (
      <div className={`${styles['form-group']}`}>
        <input className={`${styles['form-control']}`} placeholder="new State value..."></input>
        <hr />
      </div>
    );
  }
}

const testAry = [{'Prop 1': 'Red'}, {'Prop 2': 6}, {'Prop 3': 'true'}, {'Prop 4': '6'}];

export class Props extends Component {
    // maps over the array of properties for whatever component is selected and returns a list of their names and values.
  render() {
    const list = testAry.map((component) => {
      const key = Object.keys(component)[0];
      return (
        <li key = {key} className={`${styles["list-group-item"]}  ${panelStyles.list}`}>
          <strong>{`${key} : ${component[key]}`}</strong>
        </li>
      );
    });

    return (
      <div className = {panelStyles.container}>
        <div className={`${styles['form-group']}`}>
          <input className={`${styles['form-control']}`} placeholder="new Prop: Value..."></input>
          <hr />
        </div>
        {list}
      </div>
    );
  }
}

//should return controls to adjust predetermined styles.
    // bg color, color, margins, padding, display, font size maybe more

export class Styles extends Component {

  render(){
    return (
      <div className={`${styles['form-group']}`}>
      <input className={`${styles['form-control']}`} placeholder="new Styles..."></input>
      <hr />
    </div>
  );
  }

}
//should return a list of event handlers that can be applied to the app.
// should be able to insert some custom code for that event handler.
export class Events extends Component {
  render() {
    return (
      <div className={`${styles['form-group']}`}>
      <input className={`${styles['form-control']}`} placeholder="new Event Handler..."></input>
      <hr />
    </div>
    );
  }
}