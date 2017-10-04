import defaultBoards from '../../api/boards.json';

import {
  IMPORT_BOARDS,
  CHANGE_BOARD,
  PREVIOUS_BOARD,
  ADD_BOARD,
  ADD_SYMBOL,
  DELETE_SYMBOLS,
  EDIT_SYMBOLS,
  FOCUS_BOARD_BUTTON,
  CHANGE_OUTPUT,
  PUSH_OUTPUT
} from './constants';

const ROOT_BOARD_ID = 'root';
const initialState = {
  activeBoardId: ROOT_BOARD_ID,
  boards: defaultBoards.boards,
  buttons: defaultBoards.buttons,
  images: defaultBoards.images,
  output: [],
  breadcrumbs: [ROOT_BOARD_ID]
};

// function symbolReducer(board, action) {
//   switch (action.type) {
//     case ADD_SYMBOL:
//       return {
//         ...board,
//         symbols: [...board.symbols, { ...action.symbol }]
//       };
//     case DELETE_SYMBOLS:
//       return {
//         ...board,
//         symbols: board.symbols.filter(
//           symbol => action.symbols.indexOf(symbol.id) === -1
//         )
//       };
//     case EDIT_SYMBOLS:
//       return {
//         ...board,
//         symbols: board.symbols.map(
//           symbol => action.symbols.find(s => s.id === symbol.id) || symbol
//         )
//       };
//     default:
//       return board;
//   }
// }

// function boardReducer(state = initialState, action) {
//   switch (action.type) {
//     case IMPORT_BOARDS:
//       return {
//         ...state,
//         boards: action.boards
//       };
//     case CHANGE_BOARD:
//       return {
//         ...state,
//         activeBoardId: action.boardId,
//         breadcrumbs: [...state.breadcrumbs, action.boardId]
//       };
//     case PREVIOUS_BOARD:
//       const [...breadcrumbs] = state.breadcrumbs;
//       if (breadcrumbs.length === 1) {
//         return state;
//       }
//       breadcrumbs.pop();
//       return {
//         ...state,
//         activeBoardId: breadcrumbs[breadcrumbs.length - 1],
//         breadcrumbs
//       };
//     case ADD_BOARD:
//       return {
//         ...state,
//         boards: [
//           ...state.boards,
//           {
//             id: action.boardId,
//             symbols: []
//           }
//         ]
//       };
//     case ADD_SYMBOL:
//       return {
//         ...state,
//         boards: state.boards.map(
//           board =>
//             board.id !== action.boardId ? board : symbolReducer(board, action)
//         )
//       };
//     case DELETE_SYMBOLS:
//       return {
//         ...state,
//         boards: state.boards.map(
//           board =>
//             board.id !== action.boardId ? board : symbolReducer(board, action)
//         )
//       };
//     case EDIT_SYMBOLS:
//       return {
//         ...state,
//         boards: state.boards.map(
//           board =>
//             board.id !== action.boardId ? board : symbolReducer(board, action)
//         )
//       };
//     case FOCUS_BOARD_BUTTON:
//       return {
//         ...state,
//         boards: state.boards.map(
//           board =>
//             board.id !== action.boardId
//               ? board
//               : { ...board, focusedBoardButtonSymbolId: action.symbolId }
//         )
//       };
//     case CHANGE_OUTPUT:
//       return {
//         ...state,
//         output: action.output
//       };
//     case PUSH_OUTPUT:
//       return {
//         ...state,
//         output: [...state.output, action.output]
//       };
//     default:
//       return state;
//   }
// }
function boardReducer(state = initialState, action) {
  debugger;
  switch (action.type) {
    case CHANGE_OUTPUT:
      return {
        ...state,
        output: action.output
      };
    case PUSH_OUTPUT:
      return {
        ...state,
        output: [...state.output, action.value]
      };
    default:
      return state;
  }
}
export default boardReducer;
