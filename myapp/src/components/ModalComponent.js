import React from 'react'
import ReactDom from "react-dom";

const modal_styles = {
    position: 'fixed',
    top:'50%', 
    left:'50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    color: 'black',
    padding:'50px',
    zindex: 1000
}

const overlay_style = {
    position: 'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zindex:1000
}

export default function ModalComponent({open}) {
    if (open===false) {
        console.log(open)
        return null};
    return ReactDom.createPortal(
        <>
        <div style={overlay_style}>
            <div style={modal_styles}>
                 hello
             </div>
        </div>
        </>,
        document.getElementById('root')
    )
}
