/*
import React, {useState} from 'react';
import Description from "../main_components/Description";
import DopLab from "./lab_dop/DopLab";
import Button from "../common/Button/Button";

const Lab = (props) => {
  
  const [numberBlock, setNumberBlock] = useState(1);
  
/!*  const run = () => {
    props.setNumberBlock(1);
    setBlocks(<DopLab
        numberBlock={numberBlock}
      />);
    setButtonRun(<Button classChild='buttonLabsInvert' text='stop' onClick={stop}/>)
  }
  
  const stop = () => {
    props.setNumberBlock(0)
    setBlocks(<Description
      description={props.description}/>);
    setButtonRun(<Button classChild='buttonLabs' text='run' onClick={run}/>)
  }
  *!/
  const [block, setBlocks] = useState(<Description description={props.description}/>);
  
/!*
  const [buttonRun, setButtonRun] = useState(<Button classChild='buttonLabs' text='run' onClick={run}/>)
*!/
  
  return (
    <div className="labs">
      
      <div className='labsDiv'>
        
        <div style={{height: 100 + 'px'}}>
          <h3 >{props.name}</h3>
        </div>
        
        <div>
          <Button
            classChild='buttonLabs'
            text='all labs'
            onClick={() => props.changeBlock('description')}>
          </Button>
        </div>
  
        <div style={{height: 20 + 'px'}}>
        </div>
        <div >
          {
            (props.numberBlock() > 1) ? <Button text='back' classChild='buttonLabs' onClick={() => {props.setNumberBlock(props.numberBlock() - 1); setNumberBlock(numberBlock - 1)}}/> : null
          }
        </div>

      </div>
      
      <div className='workBlock'>
        {block}
      </div>
    </div>
  );
};

export default Lab;*/
