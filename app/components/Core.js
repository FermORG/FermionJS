import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './photon.css';
import coreStyles from './Core.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/twilight';



// Gui columns
import Left from './left';
import Right from '../containers/RightPage.js';

// Main editor component
import Workspace from '../containers/Workspace';

// Visual component exporter function
import getVisComponent from './VisComponents/exporter';

class Core extends Component {
  constructor(props){
    super(props);
    this.state = {
      code: "*** Insert Code Here ***",
      hideEditor: false
    }
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChanges = this.onChanges.bind(this);
  }
  // updateCode(newCode) {
	// 	this.setState({
	// 		code: newCode,
	// 	});
  // }
  onChanges(newValue) {
    console.log('change',newValue);
  }
  handleClick(e){
    console.log("inside handle click");
    
    this.setState({
      hideEditor: !this.state.hideEditor
    })
  }
  handleTextArea(e){
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      code: e.target.value
    })
  }
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
    const options = {
      lineNumbers: true
    }
    return (
      <div>
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
           
            <div className = {`${this.state.hideEditor ? coreStyles.hideEditor : ""} ${coreStyles.pads}`}>
               <form data-tid="textEditor">
                  <div className={`${coreStyles.ace}`}>
                    <AceEditor
                        className={`${coreStyles.footer} ${coreStyles.header}`} 
                        mode="javascript"
                        theme="twilight"
                        onChange={this.onChanges}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                      />
                  </div>
              </form>
            </div>
            <footer className ={coreStyles.footer}>
              <div className={coreStyles.backButton} data-tid='backButton'>
                <Link to="/">
                  <i className="fa fa-arrow-left" />
                </Link>
              </div>
              {/* <h1 className = {`${styles.title} ${coreStyles.title} ${coreStyles.footTitle}`}>Footer</h1> */}
              <button className = {`${styles.btn} ${styles['btn-primary']} ${styles['pull-right']} ${coreStyles.btn}`} onClick={this.handleClick}>Show Editor</button>
              <button className = {`${styles.btn} ${styles['btn-primary']} ${styles['pull-right']} ${coreStyles.btn}`}>Export</button>
            </footer>
          </div>
          <Right />
        </div>
      </div>
      </div>
    );
  }
}
            //  <textarea
            //       id={`${coreStyles.editor}`} 
            //       name="codeEditor" 
            //       cols="30" 
            //       rows="10" 
            //       onChange={this.handleTextArea} 
            //       value={this.state.code}>
            //     </textarea>
export default DragDropContext(HTML5Backend)(Core)
