import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './photon.css';
import coreStyles from './Core.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Gui columns
import Left from './left';
import Right from '../containers/RightPage.js';

// Main editor component
import Workspace from '../containers/Workspace';

// Visual component exporter function
import getVisComponent from './VisComponents/exporter';

class Core extends Component {
   /* Recursively renders all levels of a nested component
   */
  renderDeep(nestedComponentsList) {
    if (!nestedComponentsList.length) return [];

    return nestedComponentsList.map((nestedComponent) => {
      const CustomComponent = getVisComponent(nestedComponent.name);
      return (
        <CustomComponent id={nestedComponent.id} key={Math.random() * 10000}>
          {this.renderDeep(nestedComponent.children)}
        </CustomComponent>
      );
    });
  }

  render() {
    return (
      <div className={`${styles['window-content']} ${coreStyles.container}`}>
        <div className={styles["pane-group"]}>
          <Left drag={this.dragComponent} />
          <div className={`${styles.pane} ${coreStyles.main}`}>
            <header className={`${coreStyles.footer} ${coreStyles.header}`}>
              <h1 className={`${styles.title} ${coreStyles.title}`}>Web View</h1>
            </header>
            <div className = {coreStyles.pads} data-tid='AppContainer'>
              <Workspace />
            </div>
            <footer className ={coreStyles.footer}>
              <div className={coreStyles.backButton} data-tid='backButton'>
                <Link to="/">
                  <i className="fa fa-arrow-left" />
                </Link>
              </div>
              {/* <h1 className = {`${styles.title} ${coreStyles.title} ${coreStyles.footTitle}`}>Footer</h1> */}
              <button className = {`${styles.btn} ${styles['btn-primary']} ${styles['pull-right']} ${coreStyles.btn}`}>Export</button>
            </footer>
          </div>
          <Right />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Core)
