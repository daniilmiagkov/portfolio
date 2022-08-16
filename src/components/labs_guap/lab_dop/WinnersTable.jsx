import React from 'react';
import {findWinners} from "./FindWinners";

const WinnersTable = (props) => {
  if (props.character_enemy !== null) {
    let winners = findWinners(props);
    
    if (winners !== 0) {
      return (
        <div className={[props.className, 'tableCharacters'].join(' ')}>
          <h3>Победители</h3>
          <table className="table">
            <tbody>
            {winners.map(character =>
              <tr
                className="stringCharacter"
                key={character.id}
                id={character.id}>
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
    }
    else
      return <h3>Никто не смог выиграть этого крутого парня</h3>
  
  }
};

export default WinnersTable;