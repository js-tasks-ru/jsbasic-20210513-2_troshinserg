function checkSpam(str) {
  let newStr = String(str).toLowerCase();
  return newStr.includes('1xbet') || newStr.includes('xxx') ? true : false;
}
