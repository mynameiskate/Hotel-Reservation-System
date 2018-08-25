import React from 'react';

import CrossMark from './CrossMark';

const GalleryImage = ({ index, onClick, photo, margin, direction, top, left }) => {
    if (direction === 'column') {
        cont.position = 'absolute';
        cont.left = left;
        cont.top = top;
    }
    return (
      <div
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
      >
        <CrossMark
          onClick={(e) => onClick(e, {index, ...photo })}
        />
        <img
          style={imgStyle}
          {...photo}
        />
        <style>{'.not-selected:hover{outline:2px solid #06befa}'}</style>
      </div>
    );
  };

export default GalleryImage;

const imgStyle = {
    transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s'
};

const cont = {
    backgroundColor: '#eee',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative'
};