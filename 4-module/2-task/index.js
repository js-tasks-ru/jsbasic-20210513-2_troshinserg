function makeDiagonalRed(table) {
  let counter = 0;

  for(let tr of table.rows) {
  	tr.cells[counter].style.backgroundColor = 'red';
    counter++;
  }
}
