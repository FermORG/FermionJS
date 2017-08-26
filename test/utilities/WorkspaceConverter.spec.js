const WorkspaceConverter = require('../../app/utilities/WorkspaceConverter');
import { WORKSPACE_ID } from '../../app/constants';

describe('empty ws', ()=>{
  const defaultWorkspace = {
    componentCounter: 0,
    activeComponent: 'workspace',
    components: {
      workspace: {
        id: 'workspace',
        children: [],
        events: {},
        props: {
          style: {
            width: '1558px',
            height: '0px'
          }
        }
      }
    },
    state: {},
    methods: '',
    methodNames: []
  };
  it('will generate App jsx', () => {
    const wc = new WorkspaceConverter(defaultWorkspace);
    let result = wc.convert();
    expect(result).toMatchSnapshot();
  });
});

describe('ws with two components as siblings', ()=>{
  const flatWorkspace = {
    componentCounter: 2,
    activeComponent: '0',
    components: {
      '0': {
        events: {},
        children: [],
        props: {
          style: {
            width: '100px',
            height: '100px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'black',
            border: '1px solid lightgreen',
            left: 176,
            top: 35
          }
        },
        name: 'BlackBox',
        parentID: 'workspace',
        id: 0
      },
      '1': {
        events: {},
        children: [],
        props: {
          style: {
            width: '50px',
            height: '73px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'blue',
            left: 0,
            top: 0
          }
        },
        name: 'BlueBox',
        parentID: 'workspace',
        id: 1
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
            width: '447px',
            height: '638.921875px'
          }
        }
      }
    },
    state: {},
    methods: '',
    methodNames: []
  };
  it('will generate 3 exportable component jsx', () => {
    const wc = new WorkspaceConverter(flatWorkspace);
    let result = wc.convert(flatWorkspace);
    expect(result).toMatchSnapshot();
  });
});

describe('ws with one nested component', ()=>{
  const nestedWorkspace = {
    componentCounter: 2,
    activeComponent: '0',
    components: {
      '0': {
        events: {},
        children: [ 1 ],
        props: {
          style: {
            width: '100px',
            height: '100px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'black',
            border: '1px solid lightgreen',
            left: 176,
            top: 35
          }
        },
        name: 'BlackBox',
        parentID: 'workspace',
        id: 0
      },
      '1': {
        events: {},
        children: [],
        props: {
          style: {
            width: '50px',
            height: '73px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'blue',
            left: 0,
            top: 0
          }
        },
        name: 'BlueBox',
        parentID: 0,
        id: 1
      },
      workspace: {
        id: 'workspace',
        children: [ 0 ],
        events: {},
        props: {
          style: {
            width: '447px',
            height: '638.921875px'
          }
        }
      }
    },
    state: {},
    methods: '',
    methodNames: []
  };
  it('will generate 3 exportable component jsx App->Blackbox->Bluebox', () => {
    const wc = new WorkspaceConverter(nestedWorkspace);
    let result = wc.convert();
    expect(result).toMatchSnapshot();
  });
});

describe('ws with one nested component and the child has event', ()=>{
  const nestedWorkspace = {
    componentCounter: 2,
    activeComponent: '1',
    components: {
      '0': {
        events: {},
        children: [
          1
        ],
        props: {
          style: {
            width: '197px',
            height: '202px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'black'
          }
        },
        name: 'BlackBox',
        parentID: 'workspace',
        id: 0
      },
      '1': {
        events: {
          onClick: '()=>console.log(\'hello\')'
        },
        children: [],
        props: {
          style: {
            width: '100px',
            height: '100px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'blue',
            left: 0,
            top: 0,
            border: '1px solid lightgreen'
          }
        },
        name: 'BlueBox',
        parentID: 0,
        id: 1
      },
      workspace: {
        id: 'workspace',
        children: [
          0
        ],
        events: {},
        props: {
          style: {
            width: '1558px',
            height: '0px'
          }
        }
      }
    },
    state: {},
    methods: '',
    methodNames: []
  };
  it('will generate 3 exportable component jsx with event', () => {
    const wc = new WorkspaceConverter(nestedWorkspace);
    let result = wc.convert();
    expect(result).toMatchSnapshot();
  });
});

describe('ws with one nested component and the child has event attached to method', ()=>{
  const nestedWorkspaceMethod = {
    componentCounter: 2,
    activeComponent: '1',
    components: {
      '0': {
        events: {},
        children: [
          1
        ],
        props: {
          style: {
            width: '100px',
            height: '100px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'black'
          }
        },
        name: 'BlackBox',
        parentID: 'workspace',
        id: 0
      },
      '1': {
        events: {
          onClick: '()=>hello()'
        },
        children: [],
        props: {
          style: {
            width: '53px',
            height: '51px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'blue',
            border: '1px solid lightgreen',
            left: 0,
            top: 0
          }
        },
        name: 'BlueBox',
        parentID: 0,
        id: 1
      },
      workspace: {
        id: 'workspace',
        children: [
          0
        ],
        events: {},
        props: {
          style: {
            width: '1558px',
            height: '0px'
          }
        }
      }
    },
    state: {},
    methods: 'hello(){\n    console.log(\'hello\')\n}@\n',
    methodNames: [
      'hello'
    ]
  };
  it('will generate 3 exportable jsx with event and method', () => {
    const wc = new WorkspaceConverter(nestedWorkspaceMethod);
    let result = wc.convert();
    expect(result).toMatchSnapshot();
  });
});

describe('ws with one nested component and the child has prop', ()=>{
  const nestedWorkspaceProp = {
    componentCounter: 2,
    activeComponent: '1',
    components: {
      '0': {
        events: {},
        children: [
          1
        ],
        props: {
          style: {
            width: '100px',
            height: '100px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'black'
          }
        },
        name: 'BlackBox',
        parentID: 'workspace',
        id: 0
      },
      '1': {
        events: {},
        children: [],
        props: {
          style: {
            width: '50px',
            height: '56px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'blue',
            border: '1px solid lightgreen',
            left: 0,
            top: 0
          },
          key: '1'
        },
        name: 'BlueBox',
        parentID: 0,
        id: 1
      },
      workspace: {
        id: 'workspace',
        children: [
          0
        ],
        events: {},
        props: {
          style: {
            width: '587.40625px',
            height: '638.921875px'
          }
        }
      }
    },
    state: {},
    methods: '',
    methodNames: []
  };
  it('will generate 3 exportable component jsx with prop', () => {
    const wc = new WorkspaceConverter(nestedWorkspaceProp);
    let result = wc.convert();
    expect(result).toMatchSnapshot();
  });
});
describe('ws with one nested component and the child has event handler associated to prop', ()=>{
  const nestedWorkspaceProp = {
    componentCounter: 2,
    activeComponent: '1',
    components: {
      '0': {
        events: {},
        children: [
          1
        ],
        props: {
          style: {
            width: '100px',
            height: '100px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'black'
          }
        },
        name: 'BlackBox',
        parentID: 'workspace',
        id: 0
      },
      '1': {
        events: {
          onClick: '()=>console.log(\'name\', name)'
        },
        children: [],
        props: {
          style: {
            width: '68px',
            height: '55px',
            position: 'absolute',
            display: 'inline-block',
            backgroundColor: 'blue',
            left: 0,
            top: 0,
            border: '1px solid lightgreen'
          },
          name: '\'jeff\''
        },
        name: 'BlueBox',
        parentID: 0,
        id: 1
      },
      workspace: {
        id: 'workspace',
        children: [
          0
        ],
        events: {},
        props: {
          style: {
            width: '587.40625px',
            height: '638.921875px'
          }
        }
      }
    },
    state: {},
    methods: '',
    methodNames: []
  };
  it('will generate 3 exportable component jsx with event handler and associated method', () => {
    const wc = new WorkspaceConverter(nestedWorkspaceProp);
    let result = wc.convert();
    expect(result).toMatchSnapshot();
  });
});