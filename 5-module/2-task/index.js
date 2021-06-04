function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const div = document.querySelector('#text');

  button.onclick = () => div.hidden = !div.hidden;
}
