// ==UserScript==
// @name         ot76 строка поиска
// @namespace    ot76.ru
// @author       AHOHNMYC
// @include      http://ot76.ru/
// @version      0.0.2
// @description  Adds search filed
// @grant        GM_addStyle
// ==/UserScript==

/* Поиск маршрута по номеру при помощи регулярных выражений
 * Скрытие левой панели по нажатию `H'
 */

GM_addStyle(`
#hidemenu {top: calc(50% — 20px) !important}
#rmenu, #map {top: 0px !important}
#infostring {bottom: 0px !important}
#map {bottom: 21px !important}
tr:hover {background-color: #eee;}
tr:hover, #hidemenu {cursor: pointer;}
td {padding: 0;}
table[id^='rlist'] {display: table !important}
table[id^='rlist'] td:nth-child(2) {width: 3em}
table[id^='rlist'] td:nth-child(3) {width: 100%}

#tmenu, #bmenu, img[src="usloboz.png"], #usloboz + p,
[id^="OpenLayers.Control.PanZoom_6_pan"],
.olControlAttribution
{display: none !important}
`);

var rmenu = document.getElementById('rmenu'),
    sb = document.createElement('input'),
    query = {};
sb.id = 'searchBox';
sb.style.width = '100%';
/* Поиск регэкспа query в строке. Также выдаёт true, если маршрут отображается на карте (chbxState==true) */
function testRow ({cells:{0:{firstElementChild:{checked:chbxState}}, 1:{innerText:text}}}) { return query.test(text) || chbxState; }
/* Основная функция поиска по маршрутам */
function search() {
  query = new RegExp(sb.value);
  for (let i=1; i<=4; i++) {
    let flag = false,
        list = document.getElementById('rlist'+i);
    for (let row of list.rows) {
        row.style.display = testRow(row) ? '' : 'none';
        if ( testRow(row) ) flag = true;
    }
    list.previousElementSibling.style.display = flag ? '' : 'none';
  }
}
sb.addEventListener('keyup', search);
sb.addEventListener('keypress', search);
/* Если в строке поиска число, по стрелки вверх/вниз делают ин/декремент */
function plusMinus (e) {
  let t = e.target,
	  k = e.key;
  if ( isNaN(+t.value) || !( k == 'ArrowUp' || k == 'ArrowDown' ) ) return; /* Not a number or pressed key is not arrow */
  e.preventDefault();
  if ( k == 'ArrowUp' ) t.value++; else t.value--;
}
sb.addEventListener('keydown', plusMinus);

rmenu.insertBefore(sb, rmenu.firstElementChild);
sb.focus();

/* Скрытие боковой панели по клавише 'h' */
document.addEventListener('keypress', e=>{
  if ( e.key != 'h' && e.key != 'р' ) {
    sb.focus();
    return;
  }
  e.preventDefault();
  document.getElementById('arrow').click();
  sb.focus();
});

/* Кликабельной становится вся строка */
for (let i=1; i<=4; i++)
  for (let row of document.getElementById('rlist'+i).rows)
    row.addEventListener('click', ({target:{nodeName:n}})=>{
      if (n == 'INPUT') return;
      row.getElementsByTagName('input')[0].click();
      sb.focus();
    });

sb.placeholder = 'Поиск по номеру (regex)';
sb.title = `Если в поле число, работают стрелки вверх и вниз.

Краткая справка по регулярным выражениям:
^  —  определяет начало строки
$   —  конец строки
|    —  альтернативный вариант

^8         —  начинающиеся на 8
8$          —  заканчивающиеся на 8
^8$       —  покажет _только_ восьмые номера
^8$|4$  —  покажет восьмые номера И номера, оканчивающиеся на четвёрку`;
document.getElementById('hidemenu').title = 'Скрытие доступно по горячей клавише "H"';