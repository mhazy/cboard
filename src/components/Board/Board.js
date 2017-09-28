import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Output from './Output';
import Navbar from './Navbar';
import EditToolbar from './EditToolbar';
import BoardButton from './BoardButton';

import './Board.css';

export class Board extends Component {
  static propTypes = {
    className: PropTypes.string,
    intl: intlShape.isRequired,

    board: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      buttons: PropTypes.arrayOf(PropTypes.string)
    }),

    buttons: PropTypes.shape({
      byId: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string,
          background_color: PropTypes.string,
          load_board: PropTypes.shape({ id: PropTypes.string }),
          image_id: PropTypes.string
        })
      )
    }),

    images: PropTypes.shape({
      byId: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.string,
          content_type: PropTypes.string,
          symbol: PropTypes.shape({
            set: PropTypes.string,
            filename: PropTypes.string
          })
        })
      )
    }),

    onButtonClick: PropTypes.func.isRequired,

    onButtonFocus: PropTypes.func.isRequired
  };

  state = {};

  renderButtons() {
    const { buttons, images, onButtonClick, onButtonFocus } = this.props;

    return Object.values(buttons).map(button => {
      const image = images[button.image_id];
      const symbol =
        image && image.symbol
          ? `${image.symbol.set}/${image.symbol.filename}`
          : '';

      return (
        <div key={button.id}>
          <BoardButton
            {...button}
            symbol={symbol}
            onClick={onButtonClick}
            onFocus={onButtonFocus}
          />
        </div>
      );
    });
  }

  render() {
    const buttons = this.renderButtons();
    return buttons;
  }
}

export default injectIntl(Board);
