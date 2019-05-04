// ==UserScript==
// @name         显示信号强度
// @namespace    http://yonsm.net/
// @version      1.0
// @description  在 Padavan 设备状态中显示 WIFI 信号强度，URL 中加上#sort则按信号强度排序。
// @author       Yonsm
// @include      */device-map/clients.asp
// @run-at       document-end.
// @grant        none
// ==/UserScript==


(function() {
    //'use strict';

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var text = this.responseText;
            var token = 'MAC                PhyMode  BW MCS SGI LDPC STBC TRate RSSI PSM Connect Time';
            var start = text.indexOf(token);
            if (start == -1) {
                console.log('未找到特征：' + text);
                return;
            }

            start += token.length;
            var end = text.indexOf('</textarea>', start);
            var lines = text.substring(start, end).split('\n');
            var dict = [];
            for (var i = 0; i < lines.length; i++) {
                var fields = lines[i].split(/\s+/);
                if (fields.length == 11) {
                    var mac = fields[0].split(':').join('');
                    dict[mac] = fields[8];
                }
            }

            var table = document.getElementById('Clients_table');
            if (table == null) {
                console.log('未找到表格');
                return;
            }
            var rows = table.rows;
            rows[1].cells[4].innerText = '信号'
            var items = [];
            for (i = 2; i < rows.length; i++) {
                var cells = rows[i].cells;
                if (cells.length < 5) {
                    console.log('列表数据不足');
                    return;
                }
                mac = cells[3].innerText;
                var rssi = dict.hasOwnProperty(mac) ? dict[mac] : '-00';
                items.push([cells[0].innerHTML, cells[1].innerHTML, cells[2].innerHTML, cells[3].innerHTML, rssi]);
            }
            if (top.location.hash == '#sort') {
                items.sort(function(x, y) {return y[4] - x[4]});
            }
            for (i = 2; i < rows.length; i++) {
                for (var j = 0; j < 5; j++) {
                    rows[i].cells[j].innerHTML = items[i-2][j];
                }
            }
        }
    };
	ajax.open("GET", '/Main_WStatus2g_Content.asp', true);
    ajax.send();
})();
