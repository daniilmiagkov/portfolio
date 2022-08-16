import {useState} from "react";
import BlockTimer from "./BlockTimer";
import ImageButton from "../common/ImageButton/ImageButton";
import './timer.scss';

const ArrayTimers = (props) => {
  const[array, setArray] = useState(Array(1).fill('0'));
  
  function newTimer() {
    if (array.length !== 0) {
      let temp = array.slice();
      temp.push((+temp.at(-1) + 1).toString());
      setArray(temp);}
    else {
      setArray(Array(1).fill('0'));
    }
  }
  
  function deleteButton(id) {
    let temp = array.slice();
    temp.splice(temp.indexOf(id.toString()), 1);
    setArray(temp);
  }
  
  return (
    <div className="timers">
      {array.map((id) =>
        <BlockTimer
          key={id}
          id={id}
          onClick={deleteButton}
        />
      )}
      <ImageButton
        className='buttonAdd'
        name={'buttonAdd'}
        id={props.id}
        onClick={newTimer}
        src={'img/plus.png'} />
    </div>
  );
};

export default ArrayTimers;