import React, {useEffect, useState} from 'react';
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

const InputValuesCharacters = (props) => {
  const [state, setState] = useState(props.value);

  function change(a) {
    setState(a);
    props.onChange(a);
  }
  
  return (
    <div className='blockInput'>
      <h3>{props.title}</h3>
      <Input
        value={state}
        classChild='inputLabs'
        onChange={(a) => (!Number.isNaN(+a)) ? change(+a) : null}
      />
    </div>
  );
};

export default InputValuesCharacters;