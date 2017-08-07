// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import styles from '../components/photon.css';
export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div className = {styles.window}>
        {this.props.children}
      </div>
    );
  }
}
