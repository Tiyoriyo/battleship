/* eslint-disable import/extensions */
import Game from './modules/game.js';

const game = Game();
const { player } = game;
const { computer } = game;
const plyBoard = document.querySelector('.boardSpace1');
const cpuBoard = document.querySelector('.boardSpace2');

const buildBoard = (player) => {
  const board = document.createElement('div');
  board.classList.add('board');

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
    board.appendChild(column);
  }
  return board;
};

plyBoard.appendChild(buildBoard(player));
cpuBoard.appendChild(buildBoard(player));
