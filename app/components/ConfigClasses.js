//@flow

// important note to self: need an active component definition, so go add that to state you cock boi.
import React, { Component } from 'react';
import styles from './photon.css';
import coreStyles from './Core.css';
import panelStyles from './Panels.css';
import configOptions from './ConfigOptions';

export class State extends Component {
  props: {
    addState : ()=> void,
    changeState: ()=> void,
    workspace: {},
  }
  // should return a list built from the current state.
  render(){
    const { state } = this.props.workspace;
    return (
      <div className={`${styles['form-group']}`}>
        <input className={`${styles['form-control']} ${coreStyles.input}`} placeholder="new State value..."></input>
        <hr />
        {configOptions(state)}
      </div>
    );
  }
}

export class Props extends Component {
  props: {
    addProps : ()=> void,
    changeProps: ()=> void,
    workspace: {},
  }
    // maps over the array of properties for whatever component is selected and returns a list of their names and values.
  render() {
     const { activeComponent } = this.props.workspace;
     const Props = this.props.workspace.components[activeComponent].props;
    return (
      <div className = {panelStyles.container}>
        <div className={`${styles['form-group']}`}>
          <input className={`${styles['form-control']} ${coreStyles.input}`} placeholder="new Prop: Value..."></input>
          <hr />
        </div>
        {configOptions(Props)}
      </div>
    );
  }
}

//should return controls to adjust predetermined styles.
    // bg color, color, margins, padding, display, font size maybe more

export class Styles extends Component {
  props: {
    addStyles : ()=> void,
    changeStyles: ()=> void,
    workspace: {},
  }
  render(){
    const { activeComponent } = this.props.workspace;
    const style = this.props.workspace.components[activeComponent].props.style;
    return (
      <div className={`${styles['form-group']}`}>
      <input className={`${styles['form-control']} ${coreStyles.input}`} placeholder="new Styles..."></input>
      <hr />
      {configOptions(style)}
    </div>
  );
  }

}
//should return a list of event handlers that can be applied to the app.
// should be able to insert some custom code for that event handler.
export class Events extends Component {
  props: {
    addEvents : ()=> void,
    changeEvents: ()=> void,
    workspace: {},
  }
  render() {
    const { activeComponent } = this.props.workspace;
    const events = this.props.workspace.components[activeComponent].events;
    return (
      <div className={`${styles['form-group']}`}>
      <input className={`${styles['form-control']} ${coreStyles.input}`} placeholder="new Event Handler..."></input>
      <hr />
      {configOptions(events)}
    </div>
    );
  }
}

// const testAry = [{'Prop 1': 'Red'}, {'Prop 2': 6}, {'Prop 3': 'true'}, {'Prop 4': '6'}];
//
// const list = testAry.map((component) => {
//     // grabs key from array of props. function may need to be updated to work with live data.
//   const key = Object.keys(component)[0];
//   return (
//     <li key={key} className={`${styles["list-group-item"]}  ${panelStyles.list}`}>
//       {/* <strong>{`${key} : ${component[key]}`}</strong> */}
//       <input className={`${panelStyles.editField}`} defaultValue={`${key}`}></input>
//       <strong> : </strong>
//       <input className={`${panelStyles.editField}`} defaultValue={`${component[key]}`}></input>
//       <div className={`${panelStyles.deleteKey}`}>X</div>
//     </li>
//   );
// });
