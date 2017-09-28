import defaultBoards from '../../api/boards.json';

import {
  IMPORT_BOARDS,
  CHANGE_BOARD,
  PREVIOUS_BOARD,
  ADD_BOARD,
  ADD_SYMBOL,
  DELETE_SYMBOLS,
  EDIT_SYMBOLS,
  FOCUS_BOARD_BUTTON
} from './constants';

const rootBoardId = 'root';
const initialState = {
  boards: defaultBoards.boards,
  buttons: defaultBoards.buttons,
  images: defaultBoards.images,
  activeBoardId: rootBoardId,
  navHistory: [rootBoardId]
};

function symbolReducer(board, action) {
  switch (action.type) {
    case ADD_SYMBOL:
      return {
        ...board,
        symbols: [...board.symbols, { ...action.symbol }]
      };
    case DELETE_SYMBOLS:
      return {
        ...board,
        symbols: board.symbols.filter(
          symbol => action.symbols.indexOf(symbol.id) === -1
        )
      };
    case EDIT_SYMBOLS:
      return {
        ...board,
        symbols: board.symbols.map(
          symbol => action.symbols.find(s => s.id === symbol.id) || symbol
        )
      };
    default:
      return board;
  }
}

function boardReducer(state = initialState, action) {
  switch (action.type) {
    case IMPORT_BOARDS:
      return {
        ...state,
        boards: action.boards
      };
    case CHANGE_BOARD:
      return {
        ...state,
        navHistory: [...state.navHistory, action.boardId],
        activeBoardId: action.boardId
      };
    case PREVIOUS_BOARD:
      const [...navHistory] = state.navHistory;
      if (navHistory.length === 1) {
        return state;
      }
      navHistory.pop();
      return {
        ...state,
        navHistory,
        activeBoardId: navHistory[navHistory.length - 1]
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            id: action.boardId,
            symbols: []
          }
        ]
      };
    case ADD_SYMBOL:
      return {
        ...state,
        boards: state.boards.map(
          board =>
            board.id !== action.boardId ? board : symbolReducer(board, action)
        )
      };
    case DELETE_SYMBOLS:
      return {
        ...state,
        boards: state.boards.map(
          board =>
            board.id !== action.boardId ? board : symbolReducer(board, action)
        )
      };
    case EDIT_SYMBOLS:
      return {
        ...state,
        boards: state.boards.map(
          board =>
            board.id !== action.boardId ? board : symbolReducer(board, action)
        )
      };
    case FOCUS_BOARD_BUTTON:
      return {
        ...state,
        boards: state.boards.map(
          board =>
            board.id !== action.boardId
              ? board
              : { ...board, focusedBoardButtonSymbolId: action.symbolId }
        )
      };
    default:
      return state;
  }
}

export default boardReducer;
