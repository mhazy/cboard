import React from 'react';
import PropTypes from 'prop-types';

import './Symbol.css';

Symbol.propTypes = {
  /**
   * Image source path
   */
  src: PropTypes.string,
  /**
   * Label to display
   */
  label: PropTypes.string.isRequired
};

Symbol.defaultProps = {
  label: ''
};

export function Symbol({ src, label }) {
  return (
    <div className="Symbol">
      {src && (
        <div className="Symbol__image-container">
          <img className="Symbol__image" src={src} alt="" />
        </div>
      )}
      <div className="Symbol__label">{label}</div>
    </div>
  );
}

export default Symbol;
