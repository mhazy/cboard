import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import Symbol from '../Symbol';
import './BoardButton.css';

class BoardButton extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    id: PropTypes.string,
    label: PropTypes.string,
    load_board: PropTypes.string,
    vocalization: PropTypes.string,
    image_id: PropTypes.string,
    imageSrc: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
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
    const { id, label, vocalization, image, load_board, onClick } = this.props;
    const button = { id, label, vocalization, image, load_board };
    onClick(button);
  };

  handleFocus = () => {
    const { id, onFocus } = this.props;
    onFocus(id);
  };

  render() {
    const { className, children, label, symbol, load_board } = this.props;

    return (
      <button
        className={classNames('BoardButton', className, {
          'BoardButton--folder': !!load_board
        })}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        ref={element => (this.buttonElement = element)}
      >
        <Symbol src={symbol} label={<FormattedMessage id={label} />} />
        {children}
      </button>
    );
  }
}

export default BoardButton;
