import React, { Component } from 'react';
// import SortableTreeWithoutDndContext from './src/index'//'react-sortable-tree';
import {SortableTreeWithoutDndContext} from './src/index'; //'react-sortable-tree';
import SortableTree from './src/index';
import { connect } from "react-redux";
const path = require('path')
const dirTree = require('directory-tree');

class FileTree extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState(){
    const treeStructure = this.props.workspace.components.workspace;
    const treeComponents = this.props.workspace.components;
    console.log(this.props.workspace);
    const treeData = [getTreeData(treeStructure)];
    console.log(treeStructure);

    function getTreeData(workspaceTree){
        return {
          title: workspaceTree.id,
          children: getChildrenData(workspaceTree.children)
        }
    }

    function getChildrenData(childrenArray){
      let childrenArrayFinal = [];
      for (let i=0; i<childrenArray.length; i++){
        let currComponent = treeComponents[childrenArray[i]]
        let currComponentChildren = currComponent.children;
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
    return { treeData };


  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <SortableTreeWithoutDndContext
          innerStyle = {this.state.innerStyle}
          treeData={this.state.treeData}
          canDrag = {false}
          onChange={treeData => this.setState({ treeData })}
        />
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
