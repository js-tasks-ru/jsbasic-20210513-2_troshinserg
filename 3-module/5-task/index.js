function getMinMax(str) {
  const sep = '( . )';
  let arr = str.replace(/[\s,]/g, sep).split(sep);
  let numbers = arr.filter(it => {
  	return isFinite(parseFloat(it));
  }).map(it => parseFloat(it)).sort((a, b) => a - b);
  return {
  	min: numbers[0],
    max: numbers[numbers.length - 1]
  }
}
