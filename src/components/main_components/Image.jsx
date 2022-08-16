import React, {useEffect, useState} from 'react';

const Image = (props) => {
  const [state, setState] = useState(0);
  let img;
  
  function load() {
    img = document.createElement('img');
    img.src = props.src;
    
    img.onload = function() {
      img = (
        <img src={props.src}/>
      )
      setState(1);
    };
  }
  
  useEffect(() => {
    let img = document.createElement('img');
    img.src = props.src;
  
    img.onload = function() {
      img = (
        <img src={props.src}/>
      )
      setState(1);
    };
  });

  return (
    <div id="avatar">
      {img}
    </div>
  );
};

export default Image;