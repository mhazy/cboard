import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

// import Grid from '../../containers/Grid';
import SymbolOutput from './SymbolOutput';
import BoardButton from './BoardButton';

import './Board.css';

export class Board extends Component {
  static propTypes = {
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * 
     */
    intl: intlShape.isRequired,
    /**
     * Contains all the data needed to render a single board
     */
    board: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      buttons: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string,
          background_color: PropTypes.string,
          load_board: PropTypes.shape({ id: PropTypes.string }),
          image: PropTypes.string
        })
      )
    }),
    /**
     * Callback fired when a button is clicked
     */
    onButtonClick: PropTypes.func.isRequired,
    /**
     * Callback fired when a button is focused
     */
    onButtonFocus: PropTypes.func.isRequired,
    /**
     * Ouput values to display
     */
    output: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        label: PropTypes.string
      })
    ),
    /**
     * Callback fired when output element is clicked
     */
    onOutputClick: PropTypes.func,
    /**
     * Callback fired when output values are changed
     */
    onOutputChange: PropTypes.func
  };

  render() {
    const {
      board,
      output,
      onButtonClick,
      onButtonFocus,
      onOutputClick,
      onOutputChange
    } = this.props;

    return (
      <div className="Board">
        <div className="Board__output">
          <SymbolOutput
            symbols={output}
            onClick={onOutputClick}
            onChange={onOutputChange}
          />
        </div>
        <div className="Board__navigation-bar" />
        <div className="Board__buttons">
          {board.buttons.map(button => (
            <BoardButton
              key={button.id}
              {...button}
              onClick={onButtonClick}
              onFocus={onButtonFocus}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default injectIntl(Board);
