import React, { Component } from 'react';
import {SortableTreeWithoutDndContext} from './src/index'; //'react-sortable-tree';
import SortableTree from './src/index';
import { connect } from "react-redux";
import styles from './photon.css';
import coreStyles from './Core.css';

const path = require('path')
const dirTree = require('directory-tree');

class FileTree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      treeData: this.getInitial()
    }
    this.getInitial = this.getInitial.bind(this);
    this.getUpdate = this.getUpdate.bind(this);

  }
  getUpdate(){
    this.setState({
      treeData: this.getInitial()
    });
  }
  getInitial(){
    const treeStructure = this.props.workspace.components.workspace;
    const treeComponents = this.props.workspace.components;
    // console.log(this.props.workspace);
    const treeData = [getTreeData(treeStructure)];

    function getTreeData(workspaceTree){
        return {
          title: workspaceTree.id,
          children: getChildrenData(workspaceTree.children)
        }
    }

    function getChildrenData(childrenArray){
      const childrenArrayFinal = [];
      for (let i=0; i<childrenArray.length; i++){
        const currComponent = treeComponents[childrenArray[i]]
        const currComponentChildren = currComponent.children;
        if (currComponentChildren.length !== 0){
          childrenArrayFinal.push({
            title: currComponent.name,
            children: getChildrenData(currComponentChildren)
          });
        }
        else {
          childrenArrayFinal.push({
            title: currComponent.name,
          });
        }
      }
      return childrenArrayFinal;
    }
    console.log(treeData);
    return treeData;
  }
  render() {
    const treeDataFetch = this.state.treeData;
    const getData = this.props.workspace;
    console.log("hello")
    console.log("Get Data: ", getData)
    return (
      <div style={{ height: '100%' }}>
        <SortableTreeWithoutDndContext
          treeDataRedux={getData}
          treeData={this.state.treeData}
          canDrag={false}
          onChange={(treeDataRedux)=>{ this.setState({ treeData: treeDataRedux }) }}
        />
        <button className = {`${styles.btn} ${styles['btn-primary']} ${styles['pull-right']} ${coreStyles.btn}`} onClick={this.getUpdate}>Update</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace
  }
}


export default connect(mapStateToProps)(FileTree);
