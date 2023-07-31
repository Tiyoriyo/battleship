/* eslint-disable import/extensions */
import Game from './modules/game.js';

const game = Game();
const mainboard = document.querySelector('.mainboard');

for (let i = 0; i < 10; i++) {
  const column = document.createElement('div');
  column.classList.add('column');
  for (let j = 0; j < 10; j++) {
    const square = document.createElement('div');
    const content = document.createElement('div');
    square.classList.add('square');
    content.classList.add('content');

    square.appendChild(content);
    column.appendChild(square);
  }
  mainboard.appendChild(column);
}

// console.log([...mainboard.childNodes][1]);
console.log(mainboard.childNodes[0].childNodes[1].childNodes[0].innerHTML = '&#183;');
