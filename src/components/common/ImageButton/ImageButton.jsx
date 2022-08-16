import React from 'react';
import './ImageButton.css'

const ImageButton = (props) => {
  function handleClick() {
    props.onClick();
  }
  
  return (
    <div
      className={props.className}
      onClick={() => props.onClick()}>
      <img className="imageButton"
      id={props.id}
      src={props.src}
      alt={props.alt}/>
    </div>
  )
};

export default ImageButton;