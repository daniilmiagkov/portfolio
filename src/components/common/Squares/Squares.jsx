import React from 'react';

const Squares = (props) => {

  return (
    <div className={[props.className, 'squares'].join(' ')}>
      <table>
        <tbody>
        {props.squares.map((i) =>
          <tr key = {i.key}>
            {i.array.map((j) =>
              <td
                style={{
                  width: props.sizeSquare + 'px',
                  height: props.sizeSquare + 'px'}}
                id={j.id}
                key={j.id}
                className='square'
              >
              </td>
            )}
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default Squares;