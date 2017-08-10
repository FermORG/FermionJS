//@flow

import React, { Component } from 'react';
import styles from './photon.css';
import coreStyles from './Core.css';
import panelStyles from './Panels.css';
import configOptions from './ConfigOptions';

 // sends data to the store from config panel;
function updateStore(e, action, component) {
  if (e.key === 'Enter' && e.target.value !== '') {
    const key = e.target.value.trim();
    if (key === '') return;
    const newStateObj = {};
    newStateObj[key] = null;
    action(newStateObj, (component || null) );
    e.target.value = '';
  }
}

function updateStoreValues(e, actionOptions) {
  const { component, prop, action } = actionOptions;
  console.log("AO: ", actionOptions);
  if (e.key === 'Enter' && e.target.value !== '') {
    const key = e.target.value.trim();
    if (key === '') return;
    const newStateObj = {};
    newStateObj[key] = null;
    action(newStateObj, (component || null) );
    e.target.value = '';
  }
}


export class State extends Component {
  constructor(props) {
    super(props);
    this.updateStore = updateStore.bind(this);
    this.updateStoreValues = updateStoreValues.bind(this);
  }

  props: {
    addState : ()=> void,
    changeState: ()=> void,
    workspace: {},
  }
  // should return a list built from the current state.
  render(){
    const { workspace, addState, changeState } = this.props;
    const { state } = this.props.workspace;

    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          onKeyPress ={(event) => this.updateStore(event, addState)}
          placeholder='New State Key...'
        >
        </input>
        <hr />
        {configOptions(state, this.updateStoreValues, {action: changeState})}
      </div>
    );
  }
}

export class Props extends Component {
  constructor(props) {
    super(props);
    this.updateStore = updateStore.bind(this);
    this.updateStoreValues = updateStoreValues.bind(this);
  }

  props: {
    addProps : ()=> void,
    changeProps: ()=> void,
    workspace: {},
  }
    // maps over the array of properties for whatever component is selected and returns a list of their names and values.
  render() {
    const { activeComponent } = this.props.workspace;
    const { addProps, changeProps } = this.props;
    const Props = this.props.workspace.components[activeComponent].props;
    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          placeholder="new Prop: Value..."
          onKeyPress ={(event) => this.updateStore(event, addProps, activeComponent)}
        >
        </input>
        <hr />
        {configOptions(Props, this.updateStoreValues, {action: changeProps, component: activeComponent})}
      </div>
    );
  }
}

//should return controls to adjust predetermined styles.
    // bg color, color, margins, padding, display, font size maybe more

export class Styles extends Component {
  constructor(props) {
    super(props);
    this.updateStore = updateStore.bind(this);
    this.updateStoreValues = updateStoreValues.bind(this);
  }

  props: {
    addStyles : ()=> void,
    changeStyles: ()=> void,
    workspace: {},
  }

  render(){
    const { activeComponent } = this.props.workspace;
    const { addStyles, changeStyles } = this.props;
    const style = this.props.workspace.components[activeComponent].props.style;
    return (
      <div className={`${styles['form-group']}`}>
      <input
        className={`${styles['form-control']} ${coreStyles.input}`}
        placeholder="new Styles..."
        onKeyPress ={(event) => this.updateStore(event, addStyles, activeComponent)}
      >
      </input>
      <hr />
      {configOptions(style, this.updateStoreValues, {action: changeStyles, component: activeComponent})}
    </div>
  );
  }

}
//should return a list of event handlers that can be applied to the app.
// should be able to insert some custom code for that event handler.
export class Events extends Component {
  constructor(props) {
    super(props);
    this.updateStore = updateStore.bind(this);
    this.updateStoreValues = updateStoreValues.bind(this);
  }
  props: {
    addEvents : ()=> void,
    changeEvents: ()=> void,
    workspace: {},
  }

  render() {
    const { activeComponent } = this.props.workspace;
    const { addEvents, changeEvents } = this.props;
    const events = this.props.workspace.components[activeComponent].events;
    return (
      <div className={`${styles['form-group']}`}>
      <input
        className={`${styles['form-control']} ${coreStyles.input}`}
        placeholder="new Event Handler..."
        onKeyPress ={(event) => this.updateStore(event, addEvents, activeComponent)}
      >
      </input>
      <hr />
      {configOptions(events, this.updateStoreValues, {action: changeEvents, component: activeComponent})}
    </div>
    );
  }
}
