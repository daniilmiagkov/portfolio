import React, {useState} from 'react';
import './Range.css'

const Range = (props) => {
  
  function getArray(a) {
    let array = [];
    for (let i = (props.min !== undefined) ? props.min : 0; i < a; i+=props.step) {
      array.push(i);
    }
    return array;
  }
  
  const [array, setArray] = useState(getArray(props.max() + 1));
  
  function getNumbers() {
    if (props.withoutNumbers !== 1) {
        if (props.onlyLast !== 0) {
          return <div className={props.classChildUp}>
            {array.map((element) => <span key={element.toString()}>{element}</span>)}
          </div>
        }
        else {
          return <div className={props.classChildUp}>
            {[0, props.max].map((element) => <span key={element.toString()}>{element}</span>)}
          </div>
        }
    }
  }
  return (
    <div className= {props.className} id={props.id}>
      {getNumbers()}
      <div className='range'>
      <input className='allRanges'
             step={props.step}
             type="range"
             value={props.value}
             max={props.max()}
             min={props.min}
             onChange={(e) => {
               props.onChange(+e.target.value)
             }}/>
      </div>
    </div>
  );
    
}

export default Range;