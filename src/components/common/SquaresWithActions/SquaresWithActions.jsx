import React from 'react';
import {useEffect, useState} from "react";
import Button from "../Button/Button";
import {useReducer} from "react";

const Squares = (props) => {
  let imgCross = <img style={{width: props.sizeSquare + 'px', height: props.sizeSquare + 'px'}} src={'img/crossesAndNulls/cross_border_9px.png'} alt='cross'/>
  let imgNull = <img style={{width: props.sizeSquare + 'px', height: props.sizeSquare + 'px'}} src={'img/crossesAndNulls/null_border_9px.png'} alt='plus'/>
  let imgCross50 = <img style={{width: props.sizeSquare + 'px', height: props.sizeSquare + 'px', cursor: 'pointer'}} src={'img/crossesAndNulls/cross_border_9px_50.png'} alt='cross'/>
  let imgNull50 = <img style={{width: props.sizeSquare + 'px', height: props.sizeSquare + 'px', cursor: 'pointer'}}src={'img/crossesAndNulls/null_border_9px_50.png'} alt='plus'/>
  let imgCrossBlack = <img style={{width: props.sizeSquare + 'px', height: props.sizeSquare + 'px'}} src={'img/crossesAndNulls/cross_black.png'} alt='cross'/>
  
  let arrayWin = [], variants, allVariants, victoryOption;
  
  const initialState = {
    number: '',
    numberDynamic: '',
    img: 'cross',
    score: props.score(),
  };
  
  const [state, setState] = useReducer((state, updates) => ({
    ...state,
    ...updates,
  }), initialState);
  
  function click(id) {
    props.setText('cells to win: ' + props.length);
    let squares = [];
    Object.assign(squares, props.squares());
    squares.map(i => {
      i.array.map((j) => {
        if (j.id === id && j.imgName !== 'imgNull' && j.imgName !== 'imgCross') {
          if (state.img === 'cross') {
            setState({
              img: 'null',
            })
            j.imgName = 'imgCross';
            j.img = imgCross;
          }
          else {
            j.img = imgNull;
            j.imgName = 'imgNull';
            setState({
              img: 'cross',
            })
          }
        }
      })
    })
    props.setSquares(squares);
    findWinner();
  }
  
  function over(id) {
    let array = [];
    Object.assign(array, props.squares());
    array.map(i => {
      i.array.map((j) => {
        if (j.imgName === 'imgCross50' || j.imgName === 'imgNull50') {
          j.img = null;
          j.imgName = null;
        }
        if (j.id === id && j.imgName !== 'imgCross' && j.imgName !== 'imgNull')
          if (state.img === 'cross') {
            j.img = imgCross50;
            j.imgName = 'imgCross50';
          }
          else {
            j.img = imgNull50;
            j.imgName = 'imgNull50';
          }
      })
    })
    setState({arrayPoint: array});
  }
  
  function out(id) {
    let array = [];
    Object.assign(array, props.squares());
    array.map(i => {
      i.array.map((j) => {
        if (j.id === id && (j.imgName !== 'imgNull' && j.imgName !== 'imgCross'))
          j.imgName = null;
      })
    })
    setState({arrayPoint: array});
  }
  
  function functionFinish(text, condition) {
    props.setFinish(text);
    setState({
      finish: 1,
    });
    props.setText(text);
    
    let squares = [];
    Object.assign(squares, props.squares());
    squares.map(i => {
      i.array.map((j) => {
        for (let i = 0; i < arrayWin.length; i++) {
          if (arrayWin[i] === j.id) {
            if (text === 'the crosses won') {
              switch (condition) {
                case 'vertical': j.imgName = 'imgCrossBlackVertical'; break;
                case 'horizontal': j.imgName = 'imgCrossBlackHorizontal'; break;
                case 'main': j.imgName = 'imgCrossBlackMain'; break;
                case 'secondary': j.imgName = 'imgCrossBlackSecondary'; break;
              }
            }
            if (text === 'the nulls won') {
              switch (condition) {
                case 'vertical': j.imgName = 'imgNullBlackVertical'; break;
                case 'horizontal': j.imgName = 'imgNullBlackHorizontal'; break;
                case 'main': j.imgName = 'imgNullBlackMain'; break;
                case 'secondary': j.imgName = 'imgNullBlackSecondary'; break;
              }
            }
          }
        }
      })
    })
  }
  
  function findWinner() {
    variants = allVariants = 0;
    
    let arrayCheck = [{
      func: check,
      condition: 'vertical',
    },{
      func: check,
      condition: 'horizontal',
    },{
      func: checkDiagonal,
      condition: 'main',
    },{
      func: checkDiagonal,
      condition: 'secondary',
    }]
    
    let checkResult;
    for (let i of arrayCheck) {
      checkResult = i.func(i.condition);
      if (checkResult === 1) {
        functionFinish('the crosses won', i.condition);
        props.setScore({
          left: props.score().left + 1,
          right: props.score().right
        })
        break;
      }
      if (checkResult === 0) {
        functionFinish('the nulls won', i.condition);
        props.setScore({
          left: props.score().left,
          right: props.score().right + 1
        })
        break;
      }
    }
    if (variants === allVariants) {
      functionFinish('draw')
    }
  }
  
  function check(condition) {
    let count_null = 0, count_cross = 0, imgName, array;
    label_1:for (let i = 0; i < props.squares().length; i++) {
      label_2:for (let j = 0; j < props.squares()[i].array.length; j++) {
        count_null = count_cross = 0; array = [];
        
        for (let b = 0; b < props.length; b++) {
          if (condition === 'vertical') {
            if (i > state.arrayPoint.length - props.length)
              break label_1;
            imgName = state.arrayPoint[b + i].array[j].imgName;
            array.push(state.arrayPoint[b + i].array[j].id);
          }
          if (condition === 'horizontal') {
            if (j > state.arrayPoint[0].array.length - props.length)
              break label_2;
            imgName = state.arrayPoint[i].array[j + b].imgName;
            array.push(state.arrayPoint[i].array[j + b].id);
          }
          
          if (imgName === 'imgCross')
            count_cross++;
          else if (imgName === 'imgNull')
            count_null++;
        }
        if (count_cross > 0 && count_null > 0)
          variants++;
        allVariants++;
        if (count_cross === props.length) {
          arrayWin = array;
          return 1;
        }
        if (count_null === props.length) {
          arrayWin = array;
          return 0;
        }
      }
    }
  }
  
  function checkDiagonal(condition) {
    let count_cross = 0, count_null = 0, imgName, array;
    for (let i = 0; i <= props.squares().length - props.length; i++) {
      for (let j = 0; j <= props.squares()[i].array.length - props.length; j++) {
        count_cross = count_null = 0; array = [];
        for (let a = 0; a < props.length; a++) {
          if (condition === 'main') {
            imgName = state.arrayPoint[i + a].array[j + a].imgName;
            array.push(state.arrayPoint[i + a].array[j + a].id);
          }
          if (condition === 'secondary') {
            imgName = state.arrayPoint[i + props.length - 1 - a].array[j + a].imgName;
            array.push(state.arrayPoint[i + props.length - 1 - a].array[j + a].id);
          }
          
          if (imgName === 'imgCross')
            count_cross++;
          else if (imgName === 'imgNull')
            count_null++;
        }
        allVariants++;
        if (count_cross === props.length) {
          arrayWin = array;
          return 1;
        }
        if (count_null === props.length) {
          arrayWin = array;
          return 0;
        }
      }
    }
  }
  
  return (
    <div className={[props.className, 'squaresWithActions'].join(' ')}>
      <h4 style={{height: '20px'}}>{props.text()}</h4>
      <table id='squaresWithActions__table'>
        <tbody>
        {props.squares().map((i) =>
          <tr key = {i.key}>
            {i.array.map((j) =>
              <td
                style={{
                  width: props.sizeSquare() + 'px',
                  height: props.sizeSquare() + 'px'}}
                id={j.id}
                key={j.id}
                className='square'
                onClick={() => (props.finish() === 0 ) ? click(j.id) : null}
                onMouseOver={() => (props.finish() === 0 ) ? over(j.id) : null}
                onMouseOut={() =>  (props.finish() === 0 ) ? out(j.id) : null}
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
    let sizeImage = props.sizeSquare() + 'px';
    let sizeImage918 = props.sizeSquare() * 0.918 + 'px';
    switch (a) {
      case 'imgCross': return <img style={{width: sizeImage918, height: sizeImage918}} src={'img/crossesAndNulls/cross_border_9px.png'} alt='cross'/>;
      case 'imgNull': return <img style={{width: sizeImage918, height: sizeImage918}} src={'img/crossesAndNulls/null_border_9px.png'} alt='plus'/>;
      case 'imgCross50': return <img style={{width: sizeImage918, height: sizeImage918, cursor: 'pointer'}} src={'img/crossesAndNulls/cross_border_9px_50.png'} alt='cross'/>;
      case 'imgNull50': return <img style={{width: sizeImage918, height: sizeImage918, cursor: 'pointer'}} src={'img/crossesAndNulls/null_border_9px_50.png'} alt='plus'/>;
      case 'imgCrossBlackVertical': return <img style={{width: sizeImage, height: sizeImage}} src={'img/crossesAndNulls/crossBlackVertical.png'} alt='cross'/>
      case 'imgCrossBlackHorizontal': return <img style={{width: sizeImage, height: sizeImage}} src={'img/crossesAndNulls/crossBlackHorizontal.png'} alt='cross'/>
      case 'imgCrossBlackMain': return <img style={{width: sizeImage, height: sizeImage}} src={'img/crossesAndNulls/crossBlackMain.png'} alt='cross'/>
      case 'imgCrossBlackSecondary': return <img style={{width: sizeImage, height: sizeImage}} src={'img/crossesAndNulls/crossBlackSecondary.png'} alt='cross'/>
      case 'imgNullBlackVertical': return <img style={{width: sizeImage, height: sizeImage}} src={'img/crossesAndNulls/nullBlackVertical.png'} alt='null'/>
      case 'imgNullBlackHorizontal': return <img style={{width: sizeImage, height: sizeImage}} src={'img/crossesAndNulls/nullBlackHorizontal.png'} alt='null'/>
      case 'imgNullBlackMain': return <img style={{width: sizeImage, height: sizeImage}} src={'img/crossesAndNulls/nullBlackMain.png'} alt='null'/>
      case 'imgNullBlackSecondary': return <img style={{width: sizeImage, height: sizeImage}} src={'img/crossesAndNulls/nullBlackSecondary.png'} alt='null'/>
      default: return  null
    }
  }
};

export default Squares;