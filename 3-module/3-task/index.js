function camelize(str) {
  let arr = str.split('-');
  arr.forEach((it, index, arr) => {
  	if (index > 0) {
    	arr[index] = it[0].toUpperCase() + it.slice(1);
    }
  });
  return arr.join('');
}
