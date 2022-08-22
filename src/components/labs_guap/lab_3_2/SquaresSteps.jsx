import React from 'react';
import {useEffect, useState} from "react";
import {useReducer} from "react";

const SquaresSteps = (props) => {
  const initialState = {
    number: props.square,
    numberDynamic: -1,
    img: 'cross',
    array: props.squares,
/*    score: props.score(),*/
  };
  
  const [state, setState] = useReducer((state, updates) => ({
    ...state,
    ...updates,
  }), initialState);
  
  function click(id) {
    props.squares.map(i => {
      i.array.map((j) => {
      
      })
    })
  }
  
  function over(id) {
    let squares = [];
    Object.assign(squares, state.array);
    squares.map(i => {
      i.array.map((j) => {
        if (id === j.id)
          j.imgName = 'rightArrowLong';
      })
    })
    setState({array: squares});
  }
  
  function out(id) {
    let squares = [];
    Object.assign(squares, state.array);
    squares.map(i => {
      i.array.map((j) => {
        if (id === j.id)
          j.imgName = null;
      })
    })
  }
  
  return (
    <div className='squaresSteps'>
      <table>
        <tbody>
        {props.squares.map((i) =>
          <tr key = {i.key}>
            {i.array.map((j) =>
              <td
                id={j.id}
                key={j.id}
                className='square'
                onClick={() => {click(j.id)}}
                onMouseOver={() => {over(j.id)}}
                onMouseOut={() => {out(j.id)}}
              >
                  {setImg(j.imgName)}
              </td>
            )}
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
  
  function setImg(a) {
    /*let sizeImage = props.sizeSquare() + 'px';
    let sizeImage918 = props.sizeSquare() * 0.918 + 'px';
*/    switch (a) {
      case 'rightArrowLong': return <img style={{width: 47 + 'px', height: 47 + 'px'}} src={'img/rightArrowLong.png'} alt='cross'/>;
      default: return  null
    }
  }
};

export default SquaresSteps;