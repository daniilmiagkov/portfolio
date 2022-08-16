import React, {useState} from 'react';
import Labs from "./Labs";

const Body = (props) => {
  const [blocks , setBlocks] = useState(props.blocks);
  
  return (
    <div className="body">
      {props.block}
    </div>
  )
};

export default Body;