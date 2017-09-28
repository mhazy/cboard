import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {} from './actions';
import Board from '../../components/Board';
export class BoardContainer extends Component {
  static propTypes = {
    activeBoardId: PropTypes.bool,

    boards: PropTypes.shape({
      byId: PropTypes.shape({
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

    breadcrumbs: PropTypes.arrayOf(PropTypes.string)
  };

  handleButtonClick = () => {};

  handleButtonFocus = () => {};

  render() {
    const { activeBoardId, boards, buttons, images } = this.props;
    const activeBoard = boards[activeBoardId];

    return (
      <Board
        board={activeBoard}
        buttons={buttons}
        images={images}
        onButtonClick={this.handleButtonClick}
        onButtonFocus={this.handleButtonFocus}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    activeBoardId: state.board.activeBoardId,
    boards: state.board.boards,
    buttons: state.board.buttons,
    images: state.board.images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatch(focusBoardButton(symbolId, boardId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
