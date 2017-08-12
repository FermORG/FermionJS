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
    this.handleClick = this.handleClick.bind(this);
  }
  // for flow
  props: {
    workspace: {},
    setActiveComponent: ()=> void,
  };

  getUpdate(){
    this.setState({
      treeData: this.getInitial()
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const curr = this.props.workspace.components.workspace.children.length;
  //   const next = nextProps.workspace.components.workspace.children.length
  //   console.log('CUR: ', this.props.workspace.components.workspace.children.length);
  //   console.log('NEXT: ', nextProps.workspace.components.workspace.children.length);
  //   return curr === next;
  // }

  getInitial(){
    const treeStructure = this.props.workspace.components.workspace;
    const treeComponents = this.props.workspace.components;
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
    return treeData;
  }
    //changes activeComponent
  handleClick (e,component) {
    this.props.setActiveComponent(component);
  }
  render() {
    // console.log('FS PROPS: ', this.props.workspace);
    // console.log('TD: ', this.state.treeData);
    // const components = this.props.workspace.components;

    // const toRender = Object.keys(components).map((component)=>{
    //     if (component === 'workspace')
    // })

    const treeData = this.getInitial();
    const treeDataFetch = this.state.treeData;
    const getData = this.props.workspace;
    return (
      <div style={{ height: '100%' }}>
        <SortableTreeWithoutDndContext
          treeDataRedux={getData}
          treeData={this.state.treeData}
          // treeData={treeData}
          canDrag={false}
          onChange={(treeDataRedux)=>{ this.setState({ treeData: treeDataRedux }) }}
          handleClick={this.handleClick}
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
