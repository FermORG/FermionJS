// @flow
import React, { Component } from 'react';
import styles from './photon.scss';
import coreStyles from './Core.scss';
import panelStyles from './Panels.scss';
import ConfigOption from './ConfigOptions';

 // sends data to the store from config panel;
function updateStore(e, action, component) {
  if (e.key === 'Enter' && e.target.value !== '') {
    const key = e.target.value.trim();
    if (key === '') return;
    const newStateObj = {};
    newStateObj[key] = null;
    action(newStateObj, (component || null));
    e.target.value = '';
  }
}
  // updates values associated with props, styles, etc.
function updateStoreValues(e, action:()=>void, component:string, prop:string) {
  if (e.key === 'Enter' && e.target.value !== '') {
    const value = e.target.value.trim();
    if (value === '') return;
    const newStateObj = {};
    newStateObj[prop] = value;
    action(newStateObj, (component || null));
  }
}
  // removes a key value pair from props, styles, etc.
function deleteStoreValues(deleter:()=>void, component:string, propKey:string) {
  deleter(propKey, component);
}


export class State extends Component {
  constructor(props) {
    super(props);
    this.updateStore = updateStore.bind(this);
    this.updateStoreValues = updateStoreValues.bind(this);
    this.deleteStoreValues = deleteStoreValues.bind(this);
  }

  props: {
    addState : () => void,
    deleteState : () => void,
    workspace: {},
  }
  // should return a list built from the current state.
  render() {
    const { workspace, addState, deleteState } = this.props;
    const { state, activeComponent } = this.props.workspace;

    const list = Object.keys(state).map((prop) => (
      <ConfigOption
        key={prop}
        activeComponent={activeComponent}
        propKey={prop}
        value={state[prop]}
        action={addState}
        actionHandler={this.updateStoreValues}
        deleter={deleteState}
        onClick={this.deleteStoreValues}
      />
      ));

    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          onKeyPress={(event) => this.updateStore(event, addState)}
          placeholder="add state key..."
        />
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
    this.deleteStoreValues = deleteStoreValues.bind(this);
  }

  props: {
    addProps : ()=> void,
    deleteProps : ()=> void,
    workspace: {},
  }
    // maps over the array of properties for whatever component is selected and returns a list of their names and values.
  render() {
    const { activeComponent } = this.props.workspace;
    const { addProps, deleteProps } = this.props;
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
          action={addProps}
          deleter={deleteProps}
          actionHandler={this.updateStoreValues}
          onClick={this.deleteStoreValues}
        />
      );
    });

    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          placeholder="add prop key..."
          onKeyPress={(event) => this.updateStore(event, addProps, activeComponent)}
        />
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
    this.deleteStoreValues = deleteStoreValues.bind(this);
  }

  props: {
    addStyles : ()=> void,
    deleteStyles : ()=> void,
    workspace: {},
  }

  render() {
    const { activeComponent } = this.props.workspace;
    const { addStyles, deleteStyles } = this.props;
    const style = this.props.workspace.components[activeComponent].props.style;

    const list = Object.keys(style).map((prop) => (
      <ConfigOption
        key={prop}
        activeComponent={activeComponent}
        propKey={prop}
        value={style[prop]}
        action={addStyles}
        actionHandler={this.updateStoreValues}
        deleter={deleteStyles}
        onClick={this.deleteStoreValues}
      />
      ));

    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          placeholder="add style key..."
          onKeyPress={(event) => this.updateStore(event, addStyles, activeComponent)}
        />
        {list}
      </div>
    );
  }

}
// should return a list of event handlers that can be applied to the app.
// should be able to insert some custom code for that event handler.
export class Events extends Component {
  constructor(props) {
    super(props);
    this.updateStore = updateStore.bind(this);
    this.updateStoreValues = updateStoreValues.bind(this);
    this.deleteStoreValues = deleteStoreValues.bind(this);
  }
  props: {
    addEvents : ()=> void,
    deleteEvents : ()=> void,
    workspace: {},
  }

  render() {
    const { activeComponent } = this.props.workspace;
    const { addEvents, deleteEvents } = this.props;
    const events = this.props.workspace.components[activeComponent].events;

    const list = Object.keys(events).map((prop) => (
      <ConfigOption
        key={prop}
        activeComponent={activeComponent}
        propKey={prop}
        value={events[prop]}
        action={addEvents}
        deleter={deleteEvents}
        actionHandler={this.updateStoreValues}
        onClick={this.deleteStoreValues}
      />
      ));

    return (
      <div className={`${styles['form-group']}`}>
        <input
          className={`${styles['form-control']} ${coreStyles.input}`}
          placeholder="add event handler..."
          onKeyPress={(event) => this.updateStore(event, addEvents, activeComponent)}
        />
        {list}
      </div>
    );
  }
}
