import React from 'react';

const Menu = (props) => {

  return (
    <div className="menu">
      <div className="dropdown">
        <div className="dropbtn"><h3>{props.name}</h3></div>
        <div className="dropdown-content">
          {props.array.map((str) =>
            <a
              key={str}
              onClick={() => {props.f(str);}}>{str}</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;