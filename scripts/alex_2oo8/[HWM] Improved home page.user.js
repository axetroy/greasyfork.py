// ==UserScript==
// @name         [HWM] Improved home page
// @namespace    https://greasyfork.org/en/users/242258
// @description  Makes items to be displayed in a grid on the home page.
// @version      0.3
// @author       Alex_2oo8
// @match        https://www.heroeswm.ru/home.php*
// @match        https://www.heroeswm.ru/inventory.php*
// ==/UserScript==

if (location.href.indexOf("home.php") != -1) {
    var imgs = document.getElementsByTagName("img"), regex = /\/i\/f\/r(\d+)\.png/, frac, itemTable = null;
    for (var i = 0; i < imgs.length; i++) {
        var m = imgs[i].src.match(regex);
        if (m) frac = m[1];
        if (imgs[i].src.indexOf("artifacts") != -1 || imgs[i].src.indexOf("transport") != -1) {
            itemTable = imgs[i];
            while (itemTable.tagName != "TABLE") itemTable = itemTable.parentNode;
        }
    }

    var bs = document.getElementsByTagName("b"), container;
    for (var j = 0; j < bs.length; j++) {
        if (bs[j].innerHTML.startsWith("Боевой уровень:")) {
            container = bs[j].parentNode;
        }
    }

    var items = [], item_row = [0, 0, 0, 1, 1, 2, 2, 2, 0, 1, 1, 2], item_col = [0, 1, 2, 1, 2, 0, 2, 1, 0, 0, 3, 3];
    items[ 0] = '<a href="inventory.php" style="position: absolute; top: 0; left: 180; z-index: 7;"><img width="50" height="50" border="0" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAADNQTFRFvb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29vb29////GovbuwAAAA90Uk5TAAIIheHbqcVY+xwE+fens+ITCQAAAAFiS0dEEJWyDSwAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAEuSURBVEjH5ZaJboMwDEBtJ6GUbu3//22pGZkvkiB10qQaVUKkj2fnBNAHBJdoBTwd55G/sMBveT/3PQvpGLBQyjISdS1A5SGjEDQssCFZIZlsYuSjGMRYaCpZx2WvJbbYvLe/cMw5ttD0CBBOtxzUEkj4rdKuLVvnXG0tleB6rIWfLbrDbjtR5nxgya85IRZJJYgEAspC4eivBPnEQLzGE4BjFklsHVo6FkUAz4NE2LII4havF2tRdVx4jGpTbJEEmARii6oDbQKxJclVOGaZvyoxaqH0XYkxy8rMiQ6amnMsbmrNsQ+0BJt0b1zCaFnMprTH9cASbH3+oJAI0r2N3J0FYWlqygIOQVzcYVGjTGLAOkeS3ig8EoziuvL5p5+djv/xQfImi/1Ca2bE1xPgqiR1IrwJkgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMi0yN1QyMjowMDo0NSswMTowMGafRJIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDItMjdUMjI6MDA6NDUrMDE6MDAXwvwuAAAAAElFTkSuQmCC" title="Инвентарь"></a>';
    items[ 1] = '<img width="50" height="50" border="0" src="https://dcdn3.heroeswm.ru/i/slots_png/slot0005.png" style="position: absolute; top: 0;   left: 60;  z-index: 5;"><img width="50" height="50" border="0" src="https://dcdn.heroeswm.ru/i/slots_png/slot0.png" style="position: absolute; top: 0;   left: 60;  z-index: 7;" title="Голова">';
    items[ 2] = '<img width="50" height="50" border="0" src="https://dcdn3.heroeswm.ru/i/slots_png/slot0006.png" style="position: absolute; top: 0;   left: 120; z-index: 5;"><img width="50" height="50" border="0" src="https://dcdn.heroeswm.ru/i/slots_png/slot0.png" style="position: absolute; top: 0;   left: 120; z-index: 7;" title="Шея">';
    items[ 3] = '<img width="50" height="50" border="0" src="https://dcdn3.heroeswm.ru/i/slots_png/slot0002.png" style="position: absolute; top: 75;  left: 60;  z-index: 5;"><img width="50" height="50" border="0" src="https://dcdn.heroeswm.ru/i/slots_png/slot0.png" style="position: absolute; top: 75;  left: 60;  z-index: 7;" title="Корпус">';
    items[ 4] = '<img width="50" height="50" border="0" src="https://dcdn3.heroeswm.ru/i/slots_png/slot0004.png" style="position: absolute; top: 75;  left: 120; z-index: 5;"><img width="50" height="50" border="0" src="https://dcdn.heroeswm.ru/i/slots_png/slot0.png" style="position: absolute; top: 75;  left: 120; z-index: 7;" title="Спина">';
    items[ 5] = '<img width="50" height="50" border="0" src="https://dcdn3.heroeswm.ru/i/slots_png/slot0008.png" style="position: absolute; top: 150; left: 0;   z-index: 5;"><img width="50" height="50" border="0" src="https://dcdn.heroeswm.ru/i/slots_png/slot0.png" style="position: absolute; top: 150; left: 0;   z-index: 7;" title="Правая рука">';
    items[ 6] = '<img width="50" height="50" border="0" src="https://dcdn3.heroeswm.ru/i/slots_png/slot0007.png" style="position: absolute; top: 150; left: 120; z-index: 5;"><img width="50" height="50" border="0" src="https://dcdn.heroeswm.ru/i/slots_png/slot0.png" style="position: absolute; top: 150; left: 120; z-index: 7;" title="Левая рука">';
    items[ 7] = '<img width="50" height="50" border="0" src="https://dcdn3.heroeswm.ru/i/slots_png/slot0003.png" style="position: absolute; top: 150; left: 60;  z-index: 5;"><img width="50" height="50" border="0" src="https://dcdn.heroeswm.ru/i/slots_png/slot0.png" style="position: absolute; top: 150; left: 60;  z-index: 7;" title="Ноги">';
    items[ 8] = '<img width="50" height="50" border="0" src="https://dcdn3.heroeswm.ru/i/slots_png/slot0001.png" style="position: absolute; top: 0;   left: 0;   z-index: 5;"><img width="50" height="50" border="0" src="https://dcdn.heroeswm.ru/i/slots_png/slot0.png" style="position: absolute; top: 0;   left: 0;   z-index: 7;" title="Кольцо">';
    items[ 9] = '<img width="50" height="50" border="0" src="https://dcdn3.heroeswm.ru/i/slots_png/slot0001.png" style="position: absolute; top: 75;  left: 0;   z-index: 5;"><img width="50" height="50" border="0" src="https://dcdn.heroeswm.ru/i/slots_png/slot0.png" style="position: absolute; top: 75;  left: 0;   z-index: 7;" title="Кольцо">';
    items[10] = '<img width="50" height="50" border="0" src="https://dcdn3.heroeswm.ru/i/slots_png/slot0009.png" style="position: absolute; top: 75;  left: 180; z-index: 7;" title="Рюкзак">';
    items[11] = '<img width="50" height="50" border="0" src="https://dcdn.heroeswm.ru/i/slots_png/slot0010.png"  style="position: absolute; top: 150; left: 180; z-index: 7;" title="Транспорт отсутствует">';

    if (itemTable !== null) {
        var tds = itemTable.getElementsByTagName("td");
        for (var k = 0, s = 1; k < tds.length; k++, s++) {
            var art = getArtifactId(tds[k].innerHTML);
            s = getSlot(art, s);
            items[s] = '<div style="position: absolute; top: ' + (75 * item_row[s]) + '; left: ' + (60 * item_col[s]) + '; z-index: 7;">' + tds[k].innerHTML + '</div>';
        }
    }

    var grid = '<div style="position: relative; top: 0; left: 0; width: 230px; height: 205px; margin: 25px auto 0 auto;">';
    grid += '<img src="https://dcdn.heroeswm.ru/i/kukla_png/kukla' + frac + '.png" alt="" title="" width="230" height="205" style="position: absolute; top: 0; left: 0; z-index: 6;">';
    for (var it = 0; it < 12; it++) grid += items[it];
    grid += '</div>';

    container.innerHTML += grid;
    if (itemTable !== null) {
        itemTable.parentNode.removeChild(itemTable);
    }
}
else {
    /* globals arts_c arts arts_pd */
    for (var a = 0; a < arts_c; a++) {
        var artId = getArtifactId(arts[a]);
        localStorage.setItem("ImprovedHomePage_" + artId, arts_pd[a]);
    }
}

function getArtifactId(html) {
    var m = html.match(/art_info\.php\?id\=([^&'"]*)/);
    if (m) return m[1];
    if (html.indexOf("/transport/") != -1) return "transport";
    return null;
}

function getSlot(art, def) {
    if (art == "transport") return 11;
    var slot = localStorage.getItem("ImprovedHomePage_" + art);
    if (slot === null) slot = def;
    return Math.max(slot, def);
}
