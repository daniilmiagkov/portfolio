import React, {useState} from 'react';
import Button from "../common/Button/Button";
import InputTime from "./InputTime";
import Clock from "./Clock";
import ImageButton from "../common/ImageButton/ImageButton";

const BlockTimer = (props) => {
    let refClock = React.createRef();
    let refInput = React.createRef();
    
    const [state, setState] = useState({
      isToggle: 0,
      isPause: 0,
    });
    
    const [startTime, setStartTime] = useState(0);
  
    function handleTimeChange(e) {
      setStartTime(e)
  }
  
  function handleButtonStartClick() {
    refClock.current.startTimer();
    /*temp = state;
    temp.isToggle = 1;
    setState(temp);*/
    setState({
      isToggle: 1,
      isPause: state.isPause,
    })
  };
  
  function handleButtonStopClick() {
    refClock.current.stopTimer();
    setState({
      isToggle: 0,
      isPause: 0
    })
  };
  
  function handleButtonResetClick() {
    refInput.current.resetTimer();
    setState({
      isToggle: 0,
      isPause: 0,
    })
    setStartTime(0);
  };
  
  function handleButtonPauseClick() {
    refClock.current.pauseTimer();
    setState({
      isToggle: state.isToggle,
      isPause: 1
    })
  };
  
  function handleButtonResumeClick() {
    refClock.current.resumeTimer();
    setState({
      isToggle: state.isToggle,
      isPause: 0
    })
  };
  
  function buttonDelete() {
    props.onClick(props.id);
  }
  
  const buttons = {
    buttonPause:
      <Button
        className='buttonTimer'
        name={'buttonPause'}
        id={props.id}
        text={'pause'}
        onClick={handleButtonPauseClick}/>,
    buttonResume:
      <Button
        className='buttonTimer'
        name={'buttonResume'}
        id={props.id}
        text={'resume'}
        onClick={handleButtonResumeClick}/>,
    buttonStop:
      <Button
        className='buttonTimer'
        name={'buttonStop'}
        id={props.id}
        text={'stop'}
        onClick={handleButtonStopClick}/>,
    buttonStart:
      <Button
        className='buttonTimer'
        name={'buttonStart'}
        id={props.id}
        text={'start'}
        onClick={handleButtonStartClick}/>,
    buttonReset:
      <Button
        className='buttonTimer's
        name={'buttonReset'}
        id={props.id}
        text={'reset'}
        onClick={handleButtonResetClick}/>,
    }
    
  const blockStop = (
    <div className="blockStop">
      {buttons.buttonStop}
      {(state.isPause === 0) ? buttons.buttonPause : buttons.buttonResume}
    </div>
  );
  
  const blockStart = (
    <div className='blockStart'>
      {buttons.buttonStart}
      {buttons.buttonReset}
    </div>);

  return (
    <div className="blockTimer">
      <div></div>
      <div className="timer">
        <Clock
          ref={refClock}
          id={props.id}
          isToggle={state.isToggle}
          startTime={startTime}/>
        <InputTime
          id={props.id}
          ref={refInput}
          onChange={handleTimeChange}/>
        {(state.isToggle === 0) ? blockStart : (blockStop)}
      </div>
      <div>
        <ImageButton
          className='buttonDelete'
          name={'buttonDelete'}
          onClick={buttonDelete}
          src={'img/cross.png'}
        />
      </div>
    </div>
  );
};

export default BlockTimer;