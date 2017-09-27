const fs = require('fs');
const shortid = require('shortid');
const boardsOBF = require('./boards.obf.json');

const boards = {};
const images = {};

boardsOBF.forEach(board => {
  const boardId = shortid.generate();
  const buttons = {};

  board.buttons.forEach(button => {
    const buttonId = shortid.generate();
    const imageId = shortid.generate();
    const buttonImage = Object.values(board.images).find(
      image => image.id === button.image_id
    );
    buttons[buttonId] = { ...button, id: buttonId };

    if (buttonImage) {
      const image = Object.values(images).find(image => {
        return image.symbol.filename === buttonImage.symbol.filename;
      });

      if (image) {
        buttons[buttonId].image_id = image.id;
      } else {
        images[imageId] = { ...buttonImage, id: imageId };
        buttons[buttonId].image_id = imageId;
      }
    }
  });

  boards[boardId] = {
    id: boardId,
    name: board.name,
    buttons
  };
});

fs.writeFileSync(
  './boards-normalized.json',
  JSON.stringify({ boards, images }),
  'utf-8'
);
