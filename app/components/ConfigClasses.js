//@flow

import React, { Component } from 'react';
import styles from './photon.css';
import coreStyles from './Core.css';
import panelStyles from './Panels.css';
import ConfigOption from './ConfigOptions';

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

function updateStoreValues(e, action, component, prop) {
  if (e.key === 'Enter' && e.target.value !== '') {
    const value = e.target.value.trim();
    if (value === '') return;
    const newStateObj = {};
    newStateObj[prop] = value;
    console.log(newStateObj);
    action(newStateObj, (component || null) );
    // e.target.value = '';
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
    workspace: {},
  }
  // should return a list built from the current state.
  render(){
    const { workspace, addState } = this.props;
    const { state, activeComponent } = this.props.workspace;

    const list = Object.keys(state).map((prop) => {
      return (
        <ConfigOption
          key={prop}
          activeComponent={activeComponent}
          propKey={prop}
          value={state[prop]}
          action = {addState}
          actionHandler={this.updateStoreValues}

        />
      )
    });

    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          onKeyPress ={(event) => this.updateStore(event, addState)}
          placeholder='New State Key...'
        >
        </input>
        <hr />
        {list}
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
    workspace: {},
  }
    // maps over the array of properties for whatever component is selected and returns a list of their names and values.
  render() {
    const { activeComponent } = this.props.workspace;
    const { addProps } = this.props;
    const Props = this.props.workspace.components[activeComponent].props;

    const list = Object.keys(Props).map((prop) => {
      // prevents prop tab from rendering style.
      if (prop === 'style') return null;
      return (
        <ConfigOption
          key={prop}
          activeComponent={activeComponent}
          propKey={prop}
          value={Props[prop]}
          action = {addProps}
          actionHandler={this.updateStoreValues}

        />
      )
    });

    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          placeholder="new Prop Key..."
          onKeyPress ={(event) => this.updateStore(event, addProps, activeComponent)}
        >
        </input>
        <hr />
        {list}
      </div>
    );
  }
}

export class Styles extends Component {
  constructor(props) {
    super(props);
    this.updateStore = updateStore.bind(this);
    this.updateStoreValues = updateStoreValues.bind(this);
  }

  props: {
    addStyles : ()=> void,
    workspace: {},
  }

  render(){
    const { activeComponent } = this.props.workspace;
    const { addStyles } = this.props;
    const style = this.props.workspace.components[activeComponent].props.style;

    const list = Object.keys(style).map((prop) => {
      return (
        <ConfigOption
          key={prop}
          activeComponent={activeComponent}
          propKey={prop}
          value={style[prop]}
          action = {addStyles}
          actionHandler={this.updateStoreValues}

        />
      )
    });

    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          placeholder="new Styles..."
          onKeyPress ={(event) => this.updateStore(event, addStyles, activeComponent)}
        >
        </input>
        <hr />
        {list}
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
    workspace: {},
  }

  render() {
    const { activeComponent } = this.props.workspace;
    const { addEvents, changeEvents } = this.props;
    const events = this.props.workspace.components[activeComponent].events;

    const list = Object.keys(events).map((prop) => {
      return (
        <ConfigOption
          key={prop}
          activeComponent={activeComponent}
          propKey={prop}
          value={events[prop]}
          action = {addEvents}
          actionHandler={this.updateStoreValues}

        />
      )
    });

    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          placeholder="new Event Handler..."
          onKeyPress ={(event) => this.updateStore(event, addEvents, activeComponent)}
        >
        </input>
        <hr />
        {list}
      </div>
    );
  }
}
