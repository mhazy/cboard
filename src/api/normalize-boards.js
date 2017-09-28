const fs = require('fs');
const shortid = require('shortid');
const boardsOBF = require('./boards.obf.json');

const flatBoards = {};
const flatImages = {};
let flatButtons = {};
// todo rewrite with https://github.com/paularmstrong/normalizr
boardsOBF.forEach(board => {
  const boardId = shortid.generate();
  const flatBoardButtons = {};
  board.buttons.forEach(button => {
    const buttonId = shortid.generate();
    const imageId = shortid.generate();

    const buttonImage = Object.values(board.images).find(
      image => image.id === button.image_id
    );
    flatBoardButtons[buttonId] = { ...button, id: buttonId };

    if (buttonImage) {
      const flatImage = Object.values(flatImages).find(image => {
        return image.symbol.filename === buttonImage.symbol.filename;
      });

      if (flatImage) {
        flatBoardButtons[buttonId].image_id = flatImage.id;
      } else {
        flatImages[imageId] = { ...buttonImage, id: imageId };
        flatBoardButtons[buttonId].image_id = imageId;
      }
    }
  });

  flatBoards[boardId] = {
    id: boardId,
    name: board.name,
    format: board.format,
    description_html: board.description_html,
    license: board.license,
    buttons: Object.keys(flatBoardButtons)
  };
  flatButtons = { ...flatButtons, ...flatBoardButtons };
});

fs.writeFileSync(
  './boards-normalized.json',
  JSON.stringify({
    boards: flatBoards,
    buttons: flatButtons,
    images: flatImages
  }),
  'utf-8'
);
