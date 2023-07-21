const mainboard = document.querySelector('.mainboard');

for (let i = 0; i < 10; i += 1) {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let j = 0; j < 10; j += 1) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.textContent = `${j}, ${i}`;
    row.append(square);
  }
  mainboard.appendChild(row);
}
