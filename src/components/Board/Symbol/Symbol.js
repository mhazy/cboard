import React from 'react';
import PropTypes from 'prop-types';

import './Symbol.css';

Symbol.propTypes = {
  src: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export function Symbol({ src, label }) {
  return (
    <div className="Symbol">
      {src && (
        <div className="Symbol__container">
          <img className="Symbol__image" src={src} alt="" />
        </div>
      )}
      <div className="Symbol__label">{label}</div>
    </div>
  );
}

export default Symbol;
