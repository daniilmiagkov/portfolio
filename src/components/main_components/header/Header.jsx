import React from 'react';
import "./header.scss";
import Menu from "./Menu";

const Header = (props) => {
  
  return (
    <div className="header">
      <Menu
        name={'menu'}
        f={(str) => props.changeBlock(str)}
        array={['home', 'guap op labs', 'timer', 'crosses and nulls', "julia's photo"]}/>
      <div className="titleSite">
        <h1>portfolio</h1>
      </div>
      <Menu
        name={'language'}
        f={(str) => props.changeLanguage(str)}
        array={['russian', 'english']}/>
    </div>
  );
};

export default Header;