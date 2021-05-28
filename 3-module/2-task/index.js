function filterRange(arr, a, b) {
  return arr.filter(it => {
    return it >= a && it <= b;
  });
}
