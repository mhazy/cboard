import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushOutput, changeOutput } from './actions';
import Board from './Board';

export class BoardContainer extends Component {
  static propTypes = {
    /**
     * ID of the board in view
     */
    activeBoardId: PropTypes.string,
    /**
     * Boards prop, contains the entire boards.
     */
    boards: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        format: PropTypes.string,
        license: PropTypes.shape({
          type: PropTypes.string,
          copyright_notice_url: PropTypes.string,
          source_url: PropTypes.string,
          author_name: PropTypes.string,
          author_url: PropTypes.string,
          author_email: PropTypes.string
        }),
        buttons: PropTypes.arrayOf(PropTypes.string)
      })
    ),
    /**
     * All buttons used by boards
     */
    buttons: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        background_color: PropTypes.string,
        load_board: PropTypes.shape({ id: PropTypes.string }),
        image_id: PropTypes.string
      })
    ),
    /**
     * All images used by boards
     */
    images: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string,
        content_type: PropTypes.string,
        symbol: PropTypes.shape({
          set: PropTypes.string,
          filename: PropTypes.string
        })
      })
    ),
    /**
     * Output data for the Output component.
     */
    output: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        label: PropTypes.string
      })
    ),
    /**
     * Callback fired when output changes.
     */
    changeOutput: PropTypes.func,
    /**
     * Action creator to push a value to output.
     */
    pushOutput: PropTypes.func,
    /**
     * Board navigation history stack
     */
    breadcrumbs: PropTypes.arrayOf(PropTypes.string)
  };

  handleOutputClick = output => {
    console.log(output);
  };

  handleOutputChange = output => {
    const { changeOutput } = this.props;
    changeOutput(output);
  };

  handleButtonClick = buttonId => {
    const { buttons, images, pushOutput } = this.props;
    const button = buttons[buttonId];
    const value = {
      label: button.label,
      image: images[button.image_id].symbol.filename
    };
    pushOutput(value);
  };

  handleButtonFocus = buttonId => {
    console.log('todo: handleButtonFocus');
  };

  render() {
    const { activeBoardId, boards, buttons, images, output } = this.props;
    // todo reselect
    const { ...board } = boards[activeBoardId];
    board.buttons = board.buttons.map(buttonId => {
      const button = buttons[buttonId];
      return {
        ...button,
        image:
          '/symbols/' +
          images[button.image_id].symbol.set +
          '/' +
          images[button.image_id].symbol.filename
      };
    });

    return (
      <Board
        board={board}
        output={output}
        onOutputClick={this.handleOutputClick}
        onOutputChange={this.handleOutputChange}
        onButtonClick={this.handleButtonClick}
        onButtonFocus={this.handleButtonFocus}
      />
    );
  }
}

const mapStateToProps = state => {
  const { board } = state;

  return {
    activeBoardId: board.activeBoardId,
    boards: board.boards,
    buttons: board.buttons,
    images: board.images,
    output: board.output,
    breadcrumbs: board.breadcrumbs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pushOutput: output => {
      dispatch(pushOutput(output));
    },
    changeOutput: output => {
      dispatch(changeOutput(output));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
