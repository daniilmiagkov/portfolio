import React from 'react';
import {useEffect, useState} from "react";

const SquaresSteps = (props) => {
  const [number, setNumber] = useState(props.square);
  const [numberDynamic, setNumberDynamic] = useState(-1);
  
  useEffect(() => {
    let elem, inArrayNumberDynamic = 0, inArrayNumber = 0;
    
    props.squares.map(i => {
      i.array.map((id) => {
        elem = document.getElementById(id);
        elem.style.backgroundColor = 'white';
        elem = document.getElementById(id + 'sub');
        elem.style.backgroundColor = 'white';
        
        if (id === numberDynamic)
          inArrayNumberDynamic = 1;
        
        if (id === number)
          inArrayNumber = 1;
      });
    })
    
    
    if (numberDynamic !== -1 && inArrayNumberDynamic !== 0) {
      elem = document.getElementById(numberDynamic);
      elem.style.backgroundColor = '#d6f1f1';
      elem = document.getElementById(numberDynamic + 'sub');
      elem.style.backgroundColor = '#d6f1f1';
    }
    
    if (number !== -1 && inArrayNumber !== 0) {
      elem = document.getElementById(number + 'sub');
      elem.style.backgroundColor = 'black';
    }
    
    if (inArrayNumber === 0) {
      setNumber(-1);
    }
  })
  
  return (
    <div className='squares'>
      <table>
        <tbody>
        {props.squares.map((i) =>
          <tr key = {i.key}>
            {i.array.map((j) =>
              <td
                id={j}
                key={j}
                className='square'
                onClick={() => {
                  props.onClick(j)
                  setNumber(j);
                }}
                onMouseOver={() => {
                  setNumberDynamic(j);
                }}
                onMouseOut={() => {
                  setNumberDynamic(-1);
                }}
              >
                <div
                  id={j + 'sub'}
                  className='subSquare'>
                </div>
              </td>
            )}
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default SquaresSteps;