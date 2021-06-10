/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.render(rows);
    this.elem.onclick = this.onButtonClick;
  }
  render(rows) {
    const items = rows.map(it => {
      return `
      <tr>
        <td>${it.name}</td>
        <td>${it.age}</td>
        <td>${it.salary}</td>
        <td>${it.city}</td>
        <td><button type="button">[X]</button></td>
      </tr>`;
    }).join('');

    this.elem.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
       ${items}
      </tbody>`;
  }
  onButtonClick(evt) {
    const target = evt.target;

    if (target === target.closest('button')) {
      target.closest('tr').remove();
    }
  }
}
