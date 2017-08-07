import React from 'react';

// import styles from './BlackBox.css';

const defaultStyles = {
    position: 'relative',
    height: '30px',
    width: '30px',
    display: 'inline-block',
    backgroundColor: 'blue',
    resize: 'both',
    overflow: 'auto',
    zIndex: 2,
}


const BlueBox = (props) => {
    return (
        <div
            id={props.id}
            style={props.style}
            draggable='true'
            onDragStart={(ev) => ev.dataTransfer.setData('text', ev.target.id)}
        >
            {props ? props.children : null}
        </ div>
    );
};

export default BlueBox;
