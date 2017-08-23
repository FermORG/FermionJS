import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './photon.scss';
import coreStyles from './Core.scss';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night_bright';

// Gui columns
import Left from './Left';
import Right from '../containers/RightPage.js';

// Main editor component
import Workspace from '../containers/Workspace';

// Visual component exporter function
import getVisComponent from './VisComponents/exporter';

import ExportButton from '../containers/ExportButton';
import { ipcRenderer } from 'electron';

class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideEditor: true
    };
    this.toggleEditor = this.toggleEditor.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.updateMethods = this.props.updateMethods;
  }

  props: {
    updateMethods: () => void,
  }

  onEditorChange(newValue) {
    this.updateMethods(newValue);
  }

  toggleEditor(e){
    this.setState({
      hideEditor: !this.state.hideEditor
    });
  }

  render() {
    const options = {
      lineNumbers: true
    };
    const editorValue = this.props.methods;
    return (
      <div>
        <div className={`${styles['window-content']} ${coreStyles.container}`}>
          <div className={styles['pane-group']}>
            <Left drag={this.dragComponent} />
            <div className={`${styles.pane} ${coreStyles.main}`}>
              <header className={`${coreStyles.footer}`}>
                <h1 className={`${styles.title} ${coreStyles.title}`}>Workspace</h1>
              </header>
              <div data-tid="AppContainer">
                <Workspace
                  hideEditor={this.state.hideEditor}
                />
              </div>
              <div className={`${this.state.hideEditor ? coreStyles.hideEditor : ''}`}>
                <form data-tid="textEditor">
                  <div className={`${coreStyles.ace}`}>
                    <AceEditor
                      className={`${coreStyles.aceInterior}`}
                      mode="javascript"
                      theme="tomorrow_night_bright"
                      onChange={this.onEditorChange}
                      highlightActiveLine={true}
                      value={editorValue}
                      name="editorInterior"
                      style={{width: '100%', margin:'none'}}
                      editorProps={{ $blockScrolling: true }}
                    />
                  </div>
                </form>
              </div>
              <footer className={coreStyles.footer}>
                <div className={coreStyles.backButton} data-tid="backButton">
                  <Link to="/">
                    <i className="fa fa-arrow-left" />
                  </Link>
                </div>
                <ExportButton />
                <a className={`${coreStyles['btn']} ${coreStyles['btn-blue']} ${styles['pull-right']}`}  onClick={this.toggleEditor}>
                  {this.state.hideEditor ? 'Show' : 'Hide'} Text Editor
                </a>
                <button onClick={()=>{ipcRenderer.send('openSimulator')}}>preview</button>
              </footer>
            </div>
            <Right />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Core);
