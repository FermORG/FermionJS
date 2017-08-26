const WorkspaceConverter = require('../../app/utilities/WorkspaceConverter');
import { WORKSPACE_ID } from '../../app/constants';

describe('conversion of empty workspace', ()=>{
  const defaultWorkspace = {
    componentCounter: 0,
    activeComponent: '0',
    components: {
      workspace: {
        id: 'workspace',
        children: [],
        events: {},
        props: {
          style: {
            width: '602.40625px',
            height: '617.75px'
          }
        }
      }
    },
    state: {},
    methods: '/*Anything you type in here will be appended to App.js as a \n method. you can then attach them as event handlers, logic handlers, etc. \n make sure to append an "@" symbol following the closing bracket of your method!*/',
    methodNames: []
  };
  it('will ', () => {
    const wc = new WorkspaceConverter(defaultWorkspace);
    let result = wc.convert();
    expect(result).toMatchSnapshot();
  });
});

describe('conversion of workspace with two components', ()=>{
  const flatWorkspace = {
    componentCounter: 2,
    activeComponent: '0',
    components: {
      '0': {
        id: 0,
        name: 'BlackBox',
        children: [],
        parentID: 'workspace',
        props: {
          style: {
            position: 'absolute',
            height: '100px',
            width: '100px',
            display: 'inline-block',
            backgroundColor: 'black',
            overflow: 'auto'
          }
        },
        events: {
          onClick: '()=>{console.log("test")}'
        }
      },
      '1': {
        id: 1,
        name: 'BlueBox',
        children: [],
        parentID: 'workspace',
        props: {
          style: {
            position: 'absolute',
            height: '100px',
            width: '100px',
            display: 'inline-block',
            backgroundColor: 'blue',
            overflow: 'auto'
          }
        },
        events: {}
      },
      workspace: {
        id: 'workspace',
        children: [
          0,
          1
        ],
        events: {},
        props: {
          style: {
            width: '602.40625px',
            height: '617.75px'
          }
        }
      }
    },
    state: {},
    methods: '/*Anything you type in here will be appended to App.js as a \n method. you can then attach them as event handlers, logic handlers, etc. \n make sure to append an "@" symbol following the closing bracket of your method!*/',
    methodNames: []
  };
  it('will generate 3 exportable texts', () => {
    const wc = new WorkspaceConverter(flatWorkspace);
    let result = wc.convert(flatWorkspace);
    expect(result).toMatchSnapshot();
  });
});

describe('conversion of workspace with one nested components', ()=>{
  const flatWorkspace = {
    componentCounter: 2,
    activeComponent: '0',
    components: {
      '0': {
        id: 0,
        name: 'BlackBox',
        children: [ 1 ],
        parentID: 'workspace',
        props: {
          style: {
            position: 'absolute',
            height: '100px',
            width: '100px',
            display: 'inline-block',
            backgroundColor: 'black',
            overflow: 'auto'
          }
        },
        events: {}
      },
      '1': {
        id: 1,
        name: 'BlueBox',
        children: [],
        parentID: 'workspace',
        props: {
          style: {
            position: 'absolute',
            height: '100px',
            width: '100px',
            display: 'inline-block',
            backgroundColor: 'blue',
            overflow: 'auto'
          }
        },
        events: {}
      },
      workspace: {
        id: 'workspace',
        children: [ 0 ],
        events: {},
        props: {
          style: {
            width: '602.40625px',
            height: '617.75px'
          }
        }
      }
    },
    state: {},
    methods: '/*Anything you type in here will be appended to App.js as a \n method. you can then attach them as event handlers, logic handlers, etc. \n make sure to append an "@" symbol following the closing bracket of your method!*/',
    methodNames: []
  };
  it('will generate 3 exportable texts', () => {
    const wc = new WorkspaceConverter(flatWorkspace);
    let result = wc.convert(flatWorkspace);
    expect(result).toMatchSnapshot();
  });
});

describe('conversion of workspace with one nested components and the child has events', ()=>{
  const flatWorkspace = {
    componentCounter: 2,
    activeComponent: '0',
    components: {
      '0': {
        id: 0,
        name: 'BlackBox',
        children: [ 1 ],
        parentID: 'workspace',
        props: {
          style: {
            position: 'absolute',
            height: '100px',
            width: '100px',
            display: 'inline-block',
            backgroundColor: 'black',
            overflow: 'auto'
          }
        },
        events: {
          onClick: '()=>{console.log("test")}'
        }
      },
      '1': {
        id: 1,
        name: 'BlueBox',
        children: [],
        parentID: 'workspace',
        props: {
          style: {
            position: 'absolute',
            height: '100px',
            width: '100px',
            display: 'inline-block',
            backgroundColor: 'blue',
            overflow: 'auto'
          }
        },
        events: {
          onClick: '()=>{console.log("hello")'
        }
      },
      workspace: {
        id: 'workspace',
        children: [ 0 ],
        events: {},
        props: {
          style: {
            width: '602.40625px',
            height: '617.75px'
          }
        }
      }
    },
    state: {},
    methods: '/*Anything you type in here will be appended to App.js as a \n method. you can then attach them as event handlers, logic handlers, etc. \n make sure to append an "@" symbol following the closing bracket of your method!*/',
    methodNames: []
  };
  it('will generate 3 exportable texts', () => {
    const wc = new WorkspaceConverter(flatWorkspace);
    let result = wc.convert(flatWorkspace);
    expect(result).toMatchSnapshot();
  });
});