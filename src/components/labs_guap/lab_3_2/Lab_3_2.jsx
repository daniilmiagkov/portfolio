import React, {useEffect, useReducer} from 'react';
import Button from "../../common/Button/Button";
import Description from "../../main_components/Description";
import Range from "../../common/Range/Range";
import './Lab_3_2.scss'
import SquaresStartPoint from "./SquaresStartPoint";
import Input from "../../common/Input/Input";
import SquaresSteps from "./SquaresSteps";

const Lab_3_2 = (props) => {
  const initialState = {
    arraySteps: [{
      key: '1_1',
      x: 1,
      y: 1,
    }],
    x: 0,
    y: 0,
    height: 2,
    width: 2,
    square: '',
    squares: getArray(2,2),
    numberBlock: 0,
    buttonRun: <Button className='buttonLabs' text='run' onClick={run}/>,
  };
  
  const [state, setState] = useReducer((state, updates) => ({
      ...state,
      ...updates,
    }), initialState);
  
  let block = (<div className="labs">
    <div className='labsDiv'>
      <div style={{height: 100 + 'px'}}>
        <h3 >lab 3.2</h3>
      </div>
      <div>
        <Button
          className='buttonLabs'
          text='all labs'
          onClick={() => props.changeBlock('description')}>
        </Button>
      </div>
      <div style={{height: 20 + 'px'}}>
      </div>
      <div>{state.buttonRun}</div>
    </div>
    
    <div className='workBlock'>
      {getSubBlock(state.numberBlock)}
    </div>
    
    <div className='labsDiv'>
      
      <div style={{height: 100 + 'px'}}><h3></h3></div>
      
      <div>{(state.numberBlock !== 0) ? <Button text='next' className='buttonLabs' onClick={() => setState({numberBlock: state.numberBlock + 1})}/> : null}</div>
      
      <div style={{height: 20 + 'px'}}></div>
      
      <div>
        {(state.numberBlock > 1) ? <Button text='back' className='buttonLabs' onClick={() => setState({numberBlock: state.numberBlock - 1})}/> : null}
      </div>
    </div>
  </div>)
  
  function getSubBlock(numberBlock) {
    switch (numberBlock) {
      case 0:
        return <Description
          description={state.description}/>;
      case 1:
        return (
          <div className='lab3_2'>
            <h4>Настройте размер поля и выберите начальный квадрат</h4>
            <Range
              classChildUp='upRangeHorizontal'
              className='labsRangesHorizontal'
              max={() => 4}
              step={1}
              value={state.width}
              onChange={(a) => getSquares('width', +a)}
            />
            <div className='rangeWithMatrix'>
              <Range
                classChildUp='upRangeVertical'
                className='labsRangesVertical'
                max={() => 4}
                step={1}
                value={state.height}
                onChange={(a) => getSquares('height', +a)}
              />
              <SquaresStartPoint
                squares={state.squares}
                onClick={(j) => setState({square: j})}
                square={state.square}
              />
            </div>
          </div>);
      case 2:
        return <div className='lab3_2'>
          <h4>Выберите варианты ходов</h4>
          {/*<div className='arraySteps'>
          {state.arraySteps.map((step) =>
            <div key={step.key} className='steps'>
            <span>{step.x}; </span>
            <span>{step.y}</span>
          </div>)}
          </div>
          <Input
            className="inputLabs"
            value={state.x}
            onChange={(a) => {
              setState({x: a})
            }}
          />
          <Input
            className="inputLabs"
            value={state.y}
            onChange={(a) => {
              setState({y: a})
            }}/>*/}
          <SquaresSteps
            squares={getArray(5,5)}
            onClick={(j) => setState({square: j})}
            square={state.square}
          />
          {/*<Button
            text='+'
            className='buttonLabs'
            onClick={() => {
              let a = state.arraySteps;
              a.push({
                x: state.x,
                y: state.y
              })
              setState({
                array: a
              })
            }}
          />*/}
        </div>
      case 3:
        return (<div></div>)
        
      case 4:
    }
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
        setState({height: a});
        setState({squares: getArray(a, state.width)})
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
    setState({buttonRun: <Button className='buttonLabs' text='run' onClick={run}/>})
  }
  return block;

  
}

export default Lab_3_2;