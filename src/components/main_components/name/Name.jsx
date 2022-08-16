import React from 'react';
import './name.css';

const Name = (props) => {
  const [load, setLoad] = React.useState(1);
  
  function handleError () {
    setLoad(0)
  }
  
  function handleLoad () {
    setLoad(1)
  }
  
  let image = (<div id="name" className='whiteColor'>
    <h1 id="name_h1">name</h1>
  </div>);
  
  return (
    <div id ="info">
      <div id="avatar">
        <img
          src='./img/background-labs.jpg'
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
      {(load) ? <div id="name" className='whiteColor'>
        <h1 id="name_h1">{props.name}</h1>
      </div> : <div id="name" className='blackColor'>
        <h1 id="name_h1">{props.name}</h1>
      </div>}
    </div>
  );
};

export default Name;