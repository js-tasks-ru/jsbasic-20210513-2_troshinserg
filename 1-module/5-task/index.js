function truncate(str, maxlength) {
  if (typeof str !== 'string') {
    return false;
  }

  let length = str.length;
  let ending = '…';

  return length <= maxlength ? str : str.slice(0, maxlength - 1) + ending;
}
