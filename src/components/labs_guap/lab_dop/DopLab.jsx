import React, {useReducer} from 'react';
import {fillArrayCharacters} from "./FillArrayCharacters";
import CharactersTable from "./CharactersTable";
import Button from "../../common/Button/Button";
import InputValuesCharacters from "./InputValuesCharacters";
import Description from "../../main_components/Description";
import charactersTable from "./CharactersTable";
import {findWinners} from "./FindWinners";
import WinnersTable from "./WinnersTable";

const DopLab = (props) => {
  let winners;
  const count = 9, maxDamage = 20;
  const initialState = {
    rang: null,
    numberCharacter: -1,
    numberBlock: 0,
    count: count,
    maxDamage: maxDamage,
    characters: fillArrayCharacters(count, maxDamage),
    buttonRun: <Button className='buttonLabs' text='run' onClick={run}/>,
    character: null,
    winners: 0,
  };
  const [state, setState] = useReducer(
    (state, updates) => ({
      ...state,
      ...updates,
    }),
    initialState
  );
  
  let block = (<div className="labs">
    <div className='labsDiv'>
      <div style={{height: 100 + 'px'}}>
        <h3 >dop lab</h3>
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
      
      <div style={{height: 100 + 'px'}}><h3 ></h3></div>
      
      {(state.count !== 0 && state.maxDamage !== 0 && !(state.numberBlock > 4 || state.numberBlock < 1 || (state.character === null && state.numberBlock === 3) || (state.rang === null && state.numberBlock === 4) )) ?
        <div>
          <Button text='next' className='buttonLabs' onClick={() => setState({numberBlock: state.numberBlock + 1})}/>
          <div style={{height: 20 + 'px'}}></div>
        </div> : null}
      
      <div >
        {
          (state.numberBlock > 1 && state.numberBlock < 6 ) ? <Button text='back' className='buttonLabs' onClick={() => setState({
            numberBlock: state.numberBlock - 1,
          rang: null})}/> : null
        }
      </div>
    </div>
  </div>)
  
  function run(){
    setState({numberBlock: 1});
    setState({buttonRun: <Button className='buttonLabsInvert' text='stop' onClick={stop}/>})
  }
  
  function stop(){
    setState(initialState);
    setState({characters: fillArrayCharacters(count, maxDamage)})
    setState({buttonRun: <Button className='buttonLabs' text='run' onClick={run}/>})
  }

  function getSubBlock(numberBlock) {
    switch (numberBlock) {
      case 0:
        return <Description
          description={props.description}/>;
      case 1:
        return (<div>
          <InputValuesCharacters
            key='count'
            value={state.count}
            title='Введите количество человек'
            onChange={(a) => {
              setState({count: a,
                characters: fillArrayCharacters(a, state.maxDamage)});
            }}
          />
        </div>);
      case 2:
        return <div>
          <InputValuesCharacters
            key='maxDamage'
            value={state.maxDamage}
            title='Введите максимальный урон'
            onChange={(a) => {
              setState({maxDamage: a,
              characters: fillArrayCharacters(state.count, a)})
            }}
          />
        </div>
      case 3:
        return (<div>
          <CharactersTable
            className='charactersTable'
            numberCharacter={state.numberCharacter}
            characters={state.characters}
            onClick={(a) => setState({character: state.characters[a + 1], numberCharacter: a})}/>
        </div>)
      case 4:
        return <div>
          <h3>Выберите вариант ранжирования</h3>
          <div id='container__range'>
            <div>
              <input
                type='radio'
                name='rang'
                id='percent'
                className='radioLabs'
                value='percent'
              onChange={() => setState({rang: 'percent'})}/>
              <label htmlFor="percent">%</label>
            </div>
            <div>
              <input type='radio'
                     name='rang'
                     id='time'
                     className='radioLabs'
                     value='percent'
                     onChange={() => setState({rang: 'time'})}/>
              <label htmlFor="time">time</label>
            </div>
            
          </div>
        </div>
      case 5:
        return (<div>
          <WinnersTable
          character_enemy={state.character}
          rang={state.rang}
          numberCharacter={state.numberCharacter + 1}
          characters={state.characters}/>
        </div>);
    }
  }
  return block;
}

export default DopLab;