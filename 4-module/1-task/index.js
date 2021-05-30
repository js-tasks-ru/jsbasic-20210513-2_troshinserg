function makeFriendsList(friends) {
  let list = document.createElement('ul');

  friends.forEach(it => {
  	let li = document.createElement('li');
    li.textContent = `${it.firstName} ${it.lastName}`;
  	list.append(li);
  });
  return list;
}
