import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import photon from './photon.css';

export default class Home extends Component {
  render() {
    return (
      <div className={`${photon['window-content']} ${styles.main}`}>
        <div className={photon['pane-group']}>
          <div className={photon.pane} data-tid="container">
            <h2 className={photon['text-center']}>Welcome to Fermion.</h2>
            <div className={`${photon['text-center']} ${styles.link}`}>
              <Link to="/core">Get to Prototyping</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
