import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Symbol from '../Symbol';
import './BoardButton.css';

class BoardButton extends PureComponent {
  static propTypes = {
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * Button ID
     */
    id: PropTypes.string.isRequired,
    /**
     * Label to display
     */
    label: PropTypes.string.isRequired,
    /**
     * Board to load on button click
     */
    loadBoard: PropTypes.string,
    /**
     * Text to vocalize (speech synthesis), overrides label
     */
    vocalization: PropTypes.string,
    /**
     * Image to display source path
     */
    image: PropTypes.string,
    /**
     * Callback fired when clicking a button
     */
    onClick: PropTypes.func,
    /**
     * Callback fired when button is focused
     */
    onFocus: PropTypes.func,
    /**
     * If true, button element will be focused
     */
    hasFocus: PropTypes.bool
  };

  static defaultProps = {
    id: '',
    label: '',
    hasFocus: false
  };

  componentDidMount() {
    this.updateFocus();
  }

  componentDidUpdate() {
    this.updateFocus();
  }

  updateFocus() {
    if (this.props.hasFocus) {
      this.buttonElement.focus();
    }
  }

  handleClick = () => {
    const { id, onClick } = this.props;
    onClick(id);
  };

  handleFocus = () => {
    const { id, onFocus } = this.props;
    onFocus(id);
  };

  render() {
    const { className, children, label, image, load_board } = this.props;

    return (
      <button
        className={classNames('BoardButton', className, {
          'BoardButton--folder': !!load_board
        })}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        ref={element => (this.buttonElement = element)}
      >
        <Symbol src={image} label={label} />} />
        {children}
      </button>
    );
  }
}

export default BoardButton;
