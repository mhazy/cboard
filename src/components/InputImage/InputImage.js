import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getOrientedImage from 'exif-orientation-image';
import PhotoCameraIcon from 'material-ui-icons/PhotoCamera';

import './InputImage.css';

class InputImage extends PureComponent {
  static propTypes = {
    image: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  handleChange(event) {
    const { onChange } = this.props;
    const file = event.target.files[0];

    getOrientedImage(file, (error, canvas) => {
      if (!error) {
        const dataURL = canvas.toDataURL('image/png');
        onChange(dataURL);
      }
    });
  }

  render() {
    const { image, label } = this.props;

    return (
      <div className="InputImage">
        <label
          className={classNames('InputImage__label', {
            'is-hidden': image
          })}
        >
          {label}
          <input
            className="InputImage__input"
            type="file"
            value=""
            onChange={this.handleChange}
          />
        </label>
        {image && <img className="InputImage__img" src={image} alt="" />}
        <PhotoCameraIcon />
      </div>
    );
  }
}

function InputImage(props) {}

export default InputImage;
