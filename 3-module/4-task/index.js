function showSalary(users, age) {
  let filteredUsers = users.filter(it => it.age <= age);
  let result = '';
  filteredUsers.forEach((it, index, array) => {
  	result += index < array.length - 1 ? `${it.name}, ${it.balance}\n` : `${it.name}, ${it.balance}`;

  });
  return result;
}
