import React from 'react';

const Crossmark = ( { onClick }) => (          //TODO: move styles
    <div
      style={ {right:'22px', top: '2px', position: 'absolute'/*, zIndex: '1'*/} }
      onClick={onClick}
    >
        <svg
            style={{ fill: 'white', position: 'absolute' }}
            width='24px'
            height='24px'
        >
            <circle cx='12.5' cy='8' r='8.5' />
        </svg>
        <svg
            style={{ fill: '#06befa', position: 'absolute' }}
            width='24px'
            height='24px'
        >
        <line
            x1='7' y1='14'
            x2='18' y2='2'
            stroke='black'
            strokeWidth='5'
        />
        <line
            x1='7' y1='2'
            x2='18' y2='14'
            stroke='black'
            strokeWidth='5'
        />
      </svg>
    </div>
);

export default Crossmark;