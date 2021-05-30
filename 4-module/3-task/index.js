function highlight(table) {
  const ColumnIndex = {};
  const StatusClass = {
    true: 'available',
    false: 'unavailable'
  };

  const GenderClass = {
  	m: 'male',
    f: 'female'
  };

  const adultAge = 18;

	const tableRows = table.tBodies[0].rows;
  const tHeadCells = table.tHead.rows[0].cells;

  for (let cell of tHeadCells) {
  	let cellText = cell.textContent.toLowerCase();
  	ColumnIndex[cellText] = cell.cellIndex;
  }

  for (let tr of tableRows) {
  	let isAdultAge = parseInt(tr.cells[ColumnIndex.age].textContent, 10) < adultAge;
    let statusAttr = tr.cells[ColumnIndex.status].dataset.available;
    let genderCellText = tr.cells[ColumnIndex.gender].textContent;

    if (isAdultAge) {
    	tr.style.textDecoration = 'line-through';
    }

    if (genderCellText) {
    	tr.classList.add(GenderClass[genderCellText]);
    }

    if (statusAttr) {
      tr.classList.add(StatusClass[statusAttr]);
    } else {
    	tr.hidden = true;
    }
  }
}
