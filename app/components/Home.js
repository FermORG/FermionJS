import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.scss';
import photon from './photon.scss';

export default class Home extends Component {
  render() {
    return (
      <div className={`${photon['window-content']} ${styles.main}`}>
        <div className={photon['pane-group']}>
          <div className={photon.pane} data-tid="container">
            <h2>Welcome to Fermion</h2>
            <div className={`${styles['logoContainer']}`}>
              <img className={`${styles['fermlogo']} ${photon['text-center']}`} src="http://i.imgur.com/2JFwuWm.png" alt="" />
            </div>
            <div className={`${photon['text-center']} ${styles.link}`}>
              <Link to="/core">Click Here to Start Prototyping</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
