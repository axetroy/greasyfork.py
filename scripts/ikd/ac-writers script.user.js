// ==UserScript==
// @name         ac-writers script
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  AtCoder成績表のページで各コンテストのwriterを表示
// @author       ikd
// @match        https://atcoder.jp/users/*/history
// @grant        none
// ==/UserScript==

const table = document.getElementById('history');

const thead = table.querySelector('thead>tr');
const th = document.createElement('th');
th.setAttribute('width', '10%');
th.setAttribute('class', 'text-center');
th.textContent = 'writer';
thead.appendChild(th);

const rows = table.querySelectorAll('tbody>tr');
for (let i = 0; i < rows.length; i += 1) {
  const td = document.createElement('td');
  rows[i].appendChild(td);
}

fetch('https://script.google.com/macros/s/AKfycby4KIWAxOn_Eg1ipsUbOO7PDd-CNjf0L2yPEHv8dafMx6LYGOn5/exec')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    for (let i = 0; i < rows.length; i += 1) {
      const href = rows[i].querySelector('td>a').getAttribute('href');
      const contestid = href.replace(/\/contests\//, '');
      const writers = json[contestid];
      const td = rows[i].lastElementChild;
      if (Array.isArray(writers)) {
        for (let j = 0; j < writers.length; j += 1) {
          const a = document.createElement('a');
          a.setAttribute('href', '/user/' + writers[j].name);
          a.setAttribute('class', 'username');
          const span = document.createElement('span');
          span.textContent = writers[j].name;
          span.style.color = writers[j].color;
          a.appendChild(span);
          td.appendChild(a);
          if (j + 1 < writers.length) {
            const comma = document.createElement('span');
            comma.textContent = ', ';
            td.appendChild(comma);
          }
        }
      }
    }
    $('#history').DataTable({ retrieve: true }).destroy();
    $('#history').DataTable({ 'paging': false, 'info': false, 'order': [[0, 'desc']] });
  })
  .catch((err) => {
    console.error(err);
  })