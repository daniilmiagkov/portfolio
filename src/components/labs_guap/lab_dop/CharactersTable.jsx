import React, {useEffect, useState} from 'react';

const CharactersTable = (props) => {
  const [number, setNumber] = useState(props.numberCharacter);
  const [numberDynamic, setNumberDynamic] = useState(-1);
  
  useEffect(() => {
      let elem;
      
      (props.characters).map(character => {
        elem = document.getElementById(character.id);
        elem.style.backgroundColor = 'white';});
      
      if (numberDynamic !== -1 && numberDynamic !== 'id') {
        elem = document.getElementById(numberDynamic);
        elem.style.backgroundColor = '#d6f1f1';
      }
      
      if (number !== -1 && number !== 'id') {
        elem = document.getElementById(number);
        elem.style.backgroundColor = '#e08384ff';
      }
    
  })
  
  return (
  <div className={[props.className, 'tableCharacters'].join(' ')}>
    <h3>Выберите персонажа</h3>
    <table className="table">
      <tbody>
      {props.characters.map(character =>
        <tr
          className="stringCharacter"
          key={character.id}
          id={character.id}
          onClick={() => {
              setNumber(character.id);
              props.onClick(character.id)
          }}
          onMouseOver={() => setNumberDynamic(character.id)}
          onMouseOut={() => setNumberDynamic(-1)}>
          {Object.keys(character).map(id => (id !== 'history') ?
              <td
                key={id.toString()}
                className="propertyCharacter">
                {character[id]}
              </td>
            : null)}
        </tr>)}
      </tbody>
    </table>
  </div>
);
};

export default CharactersTable;