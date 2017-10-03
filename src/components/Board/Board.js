import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Grid from '../../containers/Grid';
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
    onButtonFocus: PropTypes.func.isRequired,

    output: PropTypes.shape({
      image: PropTypes.string,
      label: PropTypes.string
    }),
    onOutputClick: PropTypes.func,
    onOutputChange: PropTypes.func
  };

  renderButtons() {
    const { board, buttons, images, onButtonClick, onButtonFocus } = this.props;

    return board.buttons.map(buttonId => {
      const button = buttons[buttonId];
      const image = images[button.image_id];
      const symbol = image.symbol;
      const imageSrc = symbol ? `symbols/${symbol.set}/${symbol.filename}` : '';

      return (
        <div key={buttonId}>
          <BoardButton
            {...button}
            imageSrc={imageSrc}
            onClick={onButtonClick}
            onFocus={onButtonFocus}
          />
        </div>
      );
    });
  }

  render() {
    const { output, onOutputClick, onOutputChange } = this.props;
    const buttons = this.renderButtons();

    return (
      <div className="Board">
        <Output
          values={output}
          onClick={onOutputClick}
          onChange={onOutputChange}
        />
        <Navbar />
        <Grid>{buttons}</Grid>
      </div>
    );
  }
}

export default injectIntl(Board);
