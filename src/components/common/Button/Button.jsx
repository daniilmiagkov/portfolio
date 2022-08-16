import React from 'react';
import './Button.css';

const Button = (props) => {
  function handleClick() {
    props.onClick();
  }
  
  return (
      <button className={[props.className, 'allButtons'].join(' ')}
              id={props.id}
              style={props.style}
              onClick={handleClick}>
        <p>{props.text}</p>
      </button>
  )
};

export default Button;