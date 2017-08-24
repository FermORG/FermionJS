// @flow
import React, { Component } from 'react';
import styles from './photon.scss';
import panelStyles from './Panels.scss';
import { WORKSPACE_ID } from '../constants';
// import { Link } from 'react-router-dom';
// import BlackBox from './VisComponents/BlackBox';


// function List(props){
class List extends Component {

  props: {
    availableComponents: {},
    workspace: {},
    // AddComponents: () => void,
    // AddToProject: () => void,
    addComponent: () => void,
  };

  render() {
    console.log('fasfsafasfas', this.props)
    const { availableComponents, addComponent, workspace } = this.props;
    const renderAry = Object.keys(availableComponents).map((component) => (
      <li
        key={availableComponents[component].name}
        className={`${styles['list-group-item']}  ${panelStyles.list}`}
        onDoubleClick={() => addComponent(WORKSPACE_ID, availableComponents[component])}
      >
        <strong>{availableComponents[component].name}</strong>
      </li>
      ));
    // console.log(availableComponents)
    // console.log('wewewe', availableComponents[0].name)

    return (
      <div className={panelStyles.listContainer}>
        <header className={panelStyles.header}>
          <h1 className={`${styles.title} ${panelStyles.title}`}>Component Library</h1>
        </header>
        <div className={panelStyles.container}>
          {/* <BlackBox drag={props.drag}/> */}
          <ul className={styles['list-group']}>
            {renderAry}
          </ul>
        </div>
      </div>
    );
  }

}

export default List;
