import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
    id: PropTypes.string,
    /**
     * Label to display
     */
    label: PropTypes.string,
    /**
     * Board to load when clicking a folder
     */
    load_board: PropTypes.shape({ id: PropTypes.string }),
    /**
     * Text to vocalize (speech synthesis), overrides label
     */
    vocalization: PropTypes.string,
    /**
     * Image to display source path
     */
    imageSrc: PropTypes.string,
    /**
     * Callback fired when clicking a button
     */
    onClick: PropTypes.func.isRequired,
    /**
     * Callback fired when button is focused
     */
    onFocus: PropTypes.func.isRequired,
    /**
     * If true, button element will have focus
     */
    hasFocus: PropTypes.bool
  };

  static defaultProps = {
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
    const { className, children, label, imageSrc, load_board } = this.props;

    return (
      <button
        className={classNames('BoardButton', className, {
          'BoardButton--folder': !!load_board
        })}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        ref={element => (this.buttonElement = element)}
      >
        <Symbol src={imageSrc} label={<FormattedMessage id={label} />} />
        {children}
      </button>
    );
  }
}

export default BoardButton;
