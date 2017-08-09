//@flow

import React, { Component } from 'react';
import styles from './photon.css';
import coreStyles from './Core.css';
import panelStyles from './Panels.css';
import configOptions from './ConfigOptions';

// captures key presses in config panel;
function captureKeyPress(e) {
  this.setState({key: e.target.value});
}
 // sends data to the store from config panel;
function updateStore(e,action, component) {
  if (e.key === 'Enter' && this.state.key !== '') {
    const key = this.state.key;
    if (key === undefined) return;
    const newStateObj = {};
    newStateObj[key] = null;
    this.setState({key: ''});
    action(newStateObj, (component || null) );
  }
}


export class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateKey: '',
    }
    this.captureKeyPress = captureKeyPress.bind(this);
    this.updateStore = updateStore.bind(this);
  }

  props: {
    addState : ()=> void,
    changeState: ()=> void,
    workspace: {},
  }
  // should return a list built from the current state.
  render(){
    const { workspace, addState } = this.props;
    const { state } = this.props.workspace;

    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          onChange={(event) => this.captureKeyPress(event)}
          onKeyPress ={(event) => this.updateStore(event, addState)}
          placeholder='New State Key...'
          defaultValue = ''
        >
        </input>
        <hr />
        {configOptions(state)}
      </div>
    );
  }
}

export class Props extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
    }
    this.captureKeyPress = captureKeyPress.bind(this);
    this.updateStore = updateStore.bind(this);
  }

  props: {
    addProps : ()=> void,
    changeProps: ()=> void,
    workspace: {},
  }
    // maps over the array of properties for whatever component is selected and returns a list of their names and values.
  render() {
    const { activeComponent } = this.props.workspace;
    const { addProps } = this.props;
    const Props = this.props.workspace.components[activeComponent].props;
    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          placeholder="new Prop: Value..."
          onChange={(event) => this.captureKeyPress(event)}
          onKeyPress ={(event) => this.updateStore(event, addProps, activeComponent)}
        >
        </input>
        <hr />
        {configOptions(Props)}
      </div>
    );
  }
}

//should return controls to adjust predetermined styles.
    // bg color, color, margins, padding, display, font size maybe more

export class Styles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
    }
    this.captureKeyPress = captureKeyPress.bind(this);
    this.updateStore = updateStore.bind(this);
  }

  props: {
    addStyles : ()=> void,
    changeStyles: ()=> void,
    workspace: {},
  }

  render(){
    const { activeComponent } = this.props.workspace;
    const { addStyles } = this.props;
    const style = this.props.workspace.components[activeComponent].props.style;
    return (
      <div className={`${styles['form-group']}`}>
      <input
        className={`${styles['form-control']} ${coreStyles.input}`}
        placeholder="new Styles..."
        onChange={(event) => this.captureKeyPress(event)}
        onKeyPress ={(event) => this.updateStore(event, addStyles, activeComponent)}
      >
      </input>
      <hr />
      {configOptions(style)}
    </div>
  );
  }

}
//should return a list of event handlers that can be applied to the app.
// should be able to insert some custom code for that event handler.
export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
    }
    this.captureKeyPress = captureKeyPress.bind(this);
    this.updateStore = updateStore.bind(this);
  }
  props: {
    addEvents : ()=> void,
    changeEvents: ()=> void,
    workspace: {},
  }
  render() {
    const { activeComponent } = this.props.workspace;
    const { addEvents } = this.props;
    const events = this.props.workspace.components[activeComponent].events;
    return (
      <div className={`${styles['form-group']}`}>
      <input
        className={`${styles['form-control']} ${coreStyles.input}`}
        placeholder="new Event Handler..."
        onChange={(event) => this.captureKeyPress(event)}
        onKeyPress ={(event) => this.updateStore(event, addEvents, activeComponent)}
      >
      </input>
      <hr />
      {configOptions(events)}
    </div>
    );
  }
}
