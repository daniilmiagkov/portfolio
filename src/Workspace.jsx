import React from 'react';
import DopLab from "./components/labs_guap/lab_dop/DopLab";

const Workspace = (props) => {
  
  const blocks = {
    "doplab": <DopLab/>,
  };
  return (
    <div>
      <h1>{props.name}</h1>
      {blocks[props.value]}
    </div>
  );
};

export default Workspace;