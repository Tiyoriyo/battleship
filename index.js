const mainboard = document.querySelector('.mainboard');

for (let i = 0; i < 10; i += 1) {
  const column = document.createElement('div');
  column.classList.add('column');
  for (let j = 0; j < 10; j += 1) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.textContent = `${i}, ${j}`;
    column.append(square);
  }
  mainboard.appendChild(column);
}
