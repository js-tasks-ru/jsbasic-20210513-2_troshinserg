function ucFirst(str) {
  let newStr = String(str);
  return newStr === '' ? '' : newStr[0].toUpperCase() + newStr.slice(1);
}
