import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import keycode from 'keycode';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import BackspaceIcon from 'material-ui-icons/Backspace';
import ClearIcon from 'material-ui-icons/Clear';

import Symbol from '../Symbol';
import './Output.css';

const styles = {
  button: {
    height: '64px',
    width: '64px'
  },
  icon: {
    height: '32px',
    width: '32px'
  }
};

class Output extends Component {
  static propTypes = {
    className: PropTypes.string,
    values: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        image: PropTypes.string
      })
    ),
    onClick: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    values: []
  };

  handleOutputClick = () => {
    const { onClick, values } = this.props;
    onClick(values);
  };

  handleOutputKeyDown = event => {
    if (event.keyCode === keycode('enter')) {
      this.handleOutputClick();
    }
  };

  handleBackspaceClick = () => {
    const { onChange } = this.props;
    const [...values] = this.props.values;

    if (values.length) {
      values.pop();
      onChange(values);
    }
  };

  handleClearClick = () => {
    const { onChange } = this.props;
    const values = [];
    onChange(values);
  };

  render() {
    const { className, classes, dir, values } = this.props;
    const oppositeDir = dir === 'ltr' ? 'rtl' : 'ltr';
    return (
      <div className={classNames('Output', className)}>
        <div
          className="Output__scroll"
          style={{ direction: oppositeDir }}
          tabIndex={values.length ? '0' : '-1'}
          onClick={this.handleOutputClick}
          onKeyDown={this.handleOutputKeyDown}
        >
          <div className="Output__values-container" style={{ direction: dir }}>
            {values.map(({ label, image }, index) => (
              <div className="Output__value" key={index}>
                <Symbol label={<FormattedMessage id={label} image={image} />} />
              </div>
            ))}
          </div>
        </div>

        <IconButton
          className={classNames('Output__clear', classes.button)}
          style={{ visibility: values.length ? 'visible' : 'hidden' }}
          onClick={this.handleClearClick}
        >
          <ClearIcon className={classes.icon} />
        </IconButton>
        <IconButton
          className={classNames('Output__backspace', classes.button)}
          onClick={this.handleBackspaceClick}
        >
          <BackspaceIcon className={classes.icon} />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles, { name: 'Output' })(Output);
