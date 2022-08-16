import React from 'react';
import {useState} from "react";
import Range from "../../common/Range/Range";
import Squares from "../../common/Squares/Squares";
import Button from "../../common/Button/Button";
import {useReducer} from "react";
import Description from "../Description";
import SquaresSteps from "../../labs_guap/lab_3_2/SquaresSteps";
import './crossesAndNulls.css';
import SquaresWithActions from "../../common/SquaresWithActions/SquaresWithActions";
import ImageButton from "../../common/ImageButton/ImageButton";

const CrossesAndNulls = (props) => {
  let length = 3;
  const initialState = {
    start: 0,
    score: {left: 0, right: 0},
    size: 50,
    text: 'the game has started',
    length: length,
    height: length*2,
    width: length*2,
    max: length*5,
    square: '',
    finish: 0,
    squares: getArray(length*2, length*2),
    numberBlock: 0,
    buttonRun: <Button className='buttonLabs' text='run' onClick={run}/>,
  };
  
  const [state, setState] = useReducer((state, updates) => ({
    ...state,
    ...updates,
  }), initialState);
  
  let block = (<div className="labs">
    <div className='labsDiv'>
      
      <div>{state.buttonRun}</div>
  
      {state.numberBlock === 3 ? <div style={{height: 20 + 'px'}}></div> : null}
      {state.numberBlock === 3 ? <h4>{state.score.left}/{state.score.right}</h4> : null}
    
    </div>
    
    <div className='workBlock'>
      {getSubBlock(state.numberBlock)}
    </div>
    
    <div className='labsDiv'>
      {(state.numberBlock !== 0 && state.numberBlock < 3&& state.finish === 0) ?
        <div>
          <Button text='next' className='buttonLabs' onClick={() => setState({numberBlock: state.numberBlock + 1})}/> </div> : null}
  
      {(state.finish === 1) ?
        <div>
          <ImageButton
            alt='reset' src='img/reset.png'
            className='buttonLabs'
            onClick={() => {
              setState({
                squares: getArray(state.height,state.width),
                finish: 0,
                text: 'the game has started',
              })
                state.squares.map(i => {
                  i.array.map((j) => {
                    document.getElementById(j.id).style.backgroundColor = 'white';
                  })
                })
            }}/> </div> : null}
  
      {state.numberBlock < 3 ? <div style={{height: 20 + 'px'}}></div> : null}
      
      {(state.numberBlock > 1 && state.numberBlock < 3 && state.finish === 0) ?
        <div >
        <Button text='back' className='buttonLabs'
          onClick={
            () => {
              setState({numberBlock: state.numberBlock - 1,
              squares: getArray(state.height, state.width)})
            }}/>
      </div> : null}
  
      {(state.numberBlock === 3 && state.finish === 0) ?
        <div className='crossesAndNulls'>
          <Range
            id={'inputSize'}
            classChildUp='upRangeVertical'
            className='labsRangesVertical'
            max={() => 100}
            step={1}
            onlyLast={0}
            value={state.size}
            onChange={(a) => setState({size: +a})}
          />
        </div> : null}
  
      {(state.numberBlock === 3) ?
        <div className='crossesAndNulls'>
          <div style={{height: 20 + 'px'}}></div>
          <Button
            text={'reset score'}
            className='buttonLabs'
            style={{width: '60px'}}
            onClick={
            () => {
              setState({
                score: {left: 0, right: 0},
                squares: getArray(state.height, state.width)})}}/>
        </div> : null}
    </div>
  </div>)
  
  function getSubBlock(numberBlock) {
    switch (numberBlock) {
      case 0:
        return <div className='crossesAndNulls' style={{width: 500 + 'px'}}>
          <h3>game</h3>
          <ol>
            <li>setting up cells to win</li>
            <li>setting field sizes</li>
            <li>winner search algorithm</li>
            <li>the algorithm for early termination of the game if there is no way to win</li>
          </ol>
        </div>
      case 1:
        return (<div className='crossesAndNulls'>
            <h4>adjust the number of cells to win</h4>
            <Range
              key='rangeLength'
              classChildUp='upRangeHorizontal'
              className='labsRangesHorizontal'
              max={() => 7}
              min={3}
              step={1}
              value={state.length}
              onChange={(a) => setState({
                length: a,
                width: a * 2,
                height: a * 2,
                max: a * 5,
                squares: getArray(a * 2,a * 2),
              })}
            />
            <div className='rangeWithMatrix'>
              <Squares
                className='squaresLength'
                id={'squaresGame'}
                squares={getArray(1,state.length)}
                sizeSquare={20}
              />
            </div>
          </div>);
      case 2:
        return (<div className='crossesAndNulls'>
          <h4>adjust the field size</h4>
          <Range
            classChildUp='upRangeHorizontal'
            className='labsRangesHorizontal'
            max={() => state.max}
            step={state.length}
            value={state.width}
            onChange={(a) => getSquares('width', +a)}
          />
          <div className='rangeWithMatrix'>
            <Range
              classChildUp='upRangeVertical'
              className='labsRangesVertical'
              max={() => state.max}
              step={state.length}
              value={state.height}
              onChange={(a) => getSquares('height', +a)}
            />
            <Squares
              id={'squaresGame'}
              squares={state.squares}
              sizeSquare={Math.round(400 / state.max - 1)}
            />
          </div>
        </div>);
      case 3:
        return (<div className='crossesAndNulls'>
            <SquaresWithActions
              start={() => state.start}
              setStart={(a) => setState({start: 1})}
              score={() => state.score}
              setScore={(a) => setState({score: a})}
              id={'squaresGame'}
              squares={() => state.squares}
              setSquares={(a) => setState({squares: a})}
              className='squaresGame'
              finish={() => state.finish}
              setFinish={(a) => setState({
                finish: 1,
                text: a,
              })}
              text={() => state.text}
              setText={(a) => setState({
                text: a,
              })}
              length={state.length}
              subBlockIsTrue={1}
              sizeSquare={() => setSizeSquare()}
              onClick={(j) => setState({square: j})}
              square={state.square}
            />
        </div>);
    }
  }
  
  function setSizeSquare() {
    let size = 500, k = 6;
    function myFunction(x) {
      if (x.matches) {  // Если медиа запрос совпадает
        size = 300;
        k = 2;
      }
    }
  
    let x = window.matchMedia("(max-width: 960px)")
    myFunction(x) // Вызов функции прослушивателя во время выполнения
    x.addListener(myFunction) // Присоединить функцию прослушивателя при изменении состояния
  
    return (size + state.size * k) / ((state.width > state.height) ? state.width : state.height) -1;
  }
  
  function getArray(a,b) {
    let array = [], temp = {
      key: null,
      array: [],
    };
    for (let i = 0; i < a; i++) {
      temp = {
        key: null,
        array: [],
      };
      temp.key = i.toString();
      
      temp.array = [];
      for (let j = 0; j < b; j++) {
        temp.array.push({
          id: i.toString() + '.' + j.toString(),
          img: null,
          imgName: null,
          cross: null,
        });
      }
      array.push(temp);
    }
    return array;
  }
  
  function getSquares(b, a) {
    switch (b) {
      case 'height':
        setState({
          height: a,
          squares: getArray(a, state.width)})
        break;
      case 'width':
        setState({width: a});
        setState({squares: getArray(state.height, a)})
        break;
    }
  }
  
  function run(){
    setState({numberBlock: 1});
    setState({buttonRun: <Button className='buttonLabsInvert' text='stop' onClick={stop}/>})
  }
  
  function stop(){
    setState(initialState);
    setState({
      squares: getArray(length*2,length*2),
      buttonRun: <Button className='buttonLabs' text='run' onClick={run}/>,
      finish: 0,
    })
  }
  return block;
};

export default CrossesAndNulls;