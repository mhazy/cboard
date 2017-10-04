import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keycode from 'keycode';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import BackspaceIcon from 'material-ui-icons/Backspace';
import ClearIcon from 'material-ui-icons/Clear';

import Symbol from '../Symbol';
import './SymbolOutput.css';

const invertDirection = dir => (dir === 'ltr' ? 'rtl' : 'ltr');

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

export class SymbolOutput extends Component {
  static propTypes = {
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * @ignore
     */
    classes: PropTypes.object,
    /**
     * Language direction
     */
    dir: PropTypes.string,
    /**
     * Values to display
     */
    symbols: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Label to display
         */
        label: PropTypes.string,
        /**
         * Image source path
         */
        image: PropTypes.string
      })
    ),
    /**
     * Callback fired when user click the output symbols
     */
    onClick: PropTypes.func,
    /**
     * Callback fired when output symbols change from inside the component
     */
    onChange: PropTypes.func
  };

  static defaultProps = {
    classes: {},
    dir: 'ltr',
    symbols: []
  };

  handleOutputClick = () => {
    const { onClick, symbols } = this.props;
    onClick(symbols);
  };

  handleOutputKeyDown = event => {
    if (event.keyCode === keycode('enter')) {
      this.handleOutputClick();
    }
  };

  handleBackspaceClick = () => {
    const { onChange } = this.props;
    const [...symbols] = this.props.symbols;

    if (symbols.length) {
      symbols.pop();
      onChange(symbols);
    }
  };

  handleClearClick = () => {
    const { onChange } = this.props;
    const symbols = [];
    onChange(symbols);
  };

  render() {
    const { className, classes, dir, symbols } = this.props;
    return (
      <div className={classNames('SymbolOutput', className)}>
        <div
          className="SymbolOutput__scroll-container"
          style={{ direction: invertDirection(dir) }}
          tabIndex={symbols.length ? '0' : '-1'}
          onClick={this.handleOutputClick}
          onKeyDown={this.handleOutputKeyDown}
        >
          <div
            className="SymbolOutput__symbols-container"
            style={{ direction: dir }}
          >
            {symbols.map(({ label, image }, index) => (
              <div className="SymbolOutput__symbol" key={index}>
                <Symbol label={label} image={image} />} />
              </div>
            ))}
          </div>
        </div>

        <IconButton
          className={classNames('SymbolOutput__clear', classes.button)}
          style={{ visibility: symbols.length ? 'visible' : 'hidden' }}
          onClick={this.handleClearClick}
        >
          <ClearIcon className={classes.icon} />
        </IconButton>
        <IconButton
          className={classNames('SymbolOutput__backspace', classes.button)}
          onClick={this.handleBackspaceClick}
        >
          <BackspaceIcon className={classes.icon} />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles, { name: 'SymbolOutput' })(SymbolOutput);
