const PAD_LENGTH = 3;
const WORKSPACE_ID = 'workspace';
const TOP_LEVEL_NAME = 'App';
import { appParser, flattenStateProps } from './propsRecursor';
// import { cloneDeep } from 'lodash';
import cloneDeep from './cloneDeep';
import { getChildEvents, flattenEvents, insertMethods, insertThis } from './eventsRecursor';
/**
* @param {object} state - a flattened version of the state object and all component's props - rolled into one object for exporting the state.
    stateMap = JSON.stringify(Object.assign({}, clonedWorkspace.state));
* @param {object} events - similar to state, a compressed version of event listeners to be injected into props chain from the top-level down.
* @param {object} methods - a list of methods applied in app class to be spread to eventhandlers.
* @param {object} methodNames - a list of method names used to bind this in app constructor.
*/

let state;
// let events;
let methods;
let methodNames;
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength >>= 0; // floor if number or convert non-number to 0;
    padString = String(padString || ' ');
    if (this.length > targetLength) {
      return String(this);
    }

    targetLength -= this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(this);
  };
}

const padName = (name, id) => `${name}_${id.padStart(PAD_LENGTH, '0')}`;

class ComponentConverter {
  constructor(component, components) {
    this.component = component;
    this.components = components;
    this.events = component.events;
    this.children = components[component.id].children;
  }
  get ext() {
    return '.js';
  }
  get fileName(){
    if (this.component.id === WORKSPACE_ID){
      return TOP_LEVEL_NAME;
    }
    return padName(this.component.name, this.component.id.toString())
  }
  get id() {
    return this.component.id;
  }
  get name() {
    return this.component.name;
  }

  getEvents() {
    return Object.keys(this.events).reduce((events, event) => {
     if (this.component.children.indexOf(Number(event)) === -1){
       events += `${event}=`;
       events += `{${this.events[event]}} `;
     }
     return events;
   }, '');
  }

  getMethods() {
    const boundMethods = methodNames.map((method) => `this.${method} = this.${method}.bind(this);`)
    return boundMethods.join('\n');
  }
  getImports() {
    return this.component.childrenFileNames.reduce((final, childFile) => {
      final += `import ${childFile} from '../${childFile}/${childFile}';` + '\n';
      return final;
    }, '');
  }
  getChildren() {
    return this.component.childrenFileNames.reduce((final, childFile, i, array) => {
      final += `        <${childFile}\n ${this.getChildProps(childFile)} /> `;
      final += '\n';
      return final;
    }, '\n');
  }
  getClass() {
    return `${this.component.name}`;
  }
  getStyle() {
    let style;
    if (!this.component.props){
      style = {height: '100vh', width:'100vw', 'backgroundColor': '#FFF', 'margins': '0px'};
    } else {
      style = this.component.props.style;
    }
    return JSON.stringify(style);
  }

    // obj destructures props in render method automatically.
  destructureProps() {
    let props;
    let events;
    if (this.component.id !== WORKSPACE_ID){
      props = flattenStateProps(this.component.props, this.component.id, this.components);
      events = flattenEvents(this.component.events, this.component.id, this.components, methodNames);
      events = insertMethods(events, methodNames);
      props = Object.assign(props, events);
      if (Object.keys(props).length === 0) return '';
    } else {
      return '';
    }
    delete props.style;
    const destructuredProps = Object.keys(props).reduce((final, key) => {
      final += `${key}, `;
      return final;
    }, 'const { ');
    return destructuredProps.slice(0, destructuredProps.length - 2) + ' } = this.props;'
  }
    //adds child props to component calls in JSX.
  getChildProps(childFile) {
    const child = parseInt(childFile.slice(-3));
    let childProps;
    let childEvents;

    if (this.component.id !== WORKSPACE_ID){
      childProps = cloneDeep(this.component.props[child]);
      childProps = flattenStateProps(childProps, child, this.components, methodNames);
      childEvents = cloneDeep(this.component.events[child]);
      childEvents = flattenEvents(childEvents, child, this.components, methodNames);
    } else {
      childProps = flattenStateProps(this.components[child].props, String(child), this.components);
      childEvents = flattenEvents(this.components[child].events, String(child), this.components, methodNames);
    }
    childEvents = insertMethods(childEvents, methodNames);
    if(this.component.id === WORKSPACE_ID) {
      childEvents = insertThis(childEvents, methodNames);
    }

    childProps = Object.assign(childProps, childEvents);
    delete childProps.style;
    const className = this.getClass();

    return Object.keys(childProps).reduce((inline, prop) => {
      if (className === 'App') {
        if(childEvents.hasOwnProperty(prop)) {
          inline+= `        ${prop}={this.${prop}}\n`;
        } else {
          inline+= `        ${prop}={this.state.${prop}}\n`;
        }
      } else {
        inline+= `        ${prop}={${prop}}\n`;
      }
      return inline;
    }, '');
  }

  generateCode() {
    const className = this.getClass();
    return (
`
import React, { Component } from 'react';
${this.getImports()}
const divStyle = ${this.getStyle()}
class ${className} extends Component {
  constructor(props){
    super(props);
  ${className === 'App' ? `this.state = ${state.replace(/\"/g, "")}` : `` }
  ${className === 'App' ? `${this.getMethods()}` : `` }
  }
  ${className === 'App' ? `${methods.replace(/\"/g, "")}`: ``}
  render(){
    ${this.destructureProps()}
    return (
      <div style={divStyle}  ${this.getEvents()}>
        ${this.getChildren()}
      </div>
    );
  }
}
export default ${className};
`
    );
  }
}
class WorkspaceConverter {
  constructor(workspace){
    const clonedWorkspace = appParser(workspace);
    let comps = Object.assign({}, clonedWorkspace.components);

    methods = (clonedWorkspace.methods.split('@').join(''));
    methodNames = (clonedWorkspace.methodNames);
    state = JSON.stringify(Object.assign({}, flattenStateProps(clonedWorkspace.state, 'workspace', clonedWorkspace.components)), '  ');

    comps[WORKSPACE_ID].name = TOP_LEVEL_NAME;

    this.components = this.convertChildIDtoFileName(comps);
  }
  convertChildIDtoFileName(components){
    let converted = Object.keys(components).reduce((acc, id)=>{
      let newComponent = Object.assign({}, components[id]);
      newComponent.childrenFileNames = components[id].children.map(childID =>{
        return padName(components[childID].name, components[childID].id.toString())
      });
      acc[id] = newComponent;
      return acc;
    }, {});
    return converted;
  }
  convert(){
    return Object.keys(this.components).reduce((acc, key)=>{
      const cc = new ComponentConverter(this.components[key], this.components);
      acc.push({
        name: cc.name,
        id: cc.id,
        fileName: cc.fileName,
        ext: cc.ext,
        code: cc.generateCode() });
      return acc;
    }, []);
  }
}
module.exports = WorkspaceConverter;
