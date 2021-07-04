export default function promiseClick(button) {
	return new Promise((resolve, reject) => {
    button.addEventListener('click', evt => {
			resolve(evt);
    }, {once: true});
  })
}
