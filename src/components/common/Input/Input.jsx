import React from 'react';
import './Input.css'

const Input = (props) => {
  return (
    <input className={[props.className, 'allInputs'].join(' ')}
           type="text"
           value={props.value}
           onChange={(e) => props.onChange(e.target.value)}/>
  );
}

export default Input;