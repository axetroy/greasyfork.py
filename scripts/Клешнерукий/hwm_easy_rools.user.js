// ==UserScript==
// @name            hwm_easy_rools
// @author          Kleshnerukij
// @description     Скрипт ускоряющий игру в рулетку.
// @version         1.7.6
// @homepage        https://greasyfork.org/ru/scripts/11127-hwm-easy-rools
// @namespace       https://greasyfork.org/ru/scripts/11127-hwm-easy-rools
// @include         http://www.heroeswm.ru/roulette.php
// @include         http://qrator.heroeswm.ru/roulette.php
// @include         http://178.248.235.15/roulette.php
// @include         http://www.lordswm.com/roulette.php
// @encoding 	    utf-8
// ==/UserScript==

// (c) Клешнерукий http://www.heroeswm.ru/pl_info.php?id=7076906

var rs_user_gold = new RegExp('gold\\.gif.*?<td>([\\d,]*)','i');
var rs_user_lvl = new RegExp('<td>([\\d,]*)<\\/td><\\/tr><\/tbody><\\/table><\\/td><\\/tr><\/tbody><\\/table>&nbsp','i');
var rs_user_cur = new RegExp('([\\d,]*)<\\/b><\\/td><\\/tr><\/tbody><\\/table>','i');

var user_gold = rs_user_gold.exec(document.body.innerHTML);
user_gold = getCorrectNumber(user_gold[1]);

var user_lvl = rs_user_lvl.exec(document.body.innerHTML);
user_lvl = getCorrectNumber(user_lvl[1]).slice(0, -3);

var user_cur = rs_user_cur.exec(document.body.innerHTML);
user_cur = getCorrectNumber(user_cur[1]);

document.getElementsByTagName('table')[34].onclick = function(event) {
    if (document.getElementById('cForm') !== null) {
        document.getElementById("cForm").remove();
    }
    var field = event.target;

    while (field != document.getElementsByTagName('table')[34]) {
        if (field.tagName == 'IMG') {
            cFormCreate(field, event);
            break;
        }
        field = field.parentNode;
    }
	document.getElementsByTagName('table')[35].getElementsByTagName('input')[2].value = field.title;
};

function cFormCreate(field, event) {
    var host = window.location.hostname;
    var rs_name_img = new RegExp('.*\\/(.*)\\.gif','i');
    var name_img = rs_name_img.exec(field.src)[1];
    document.getElementsByName('bettype')[0].value = "";
    document.getElementsByName('bet')[0].value = "";

    var c_form = document.createElement('div');
    c_form.id = "cForm";
    c_form.style.position = "absolute";
    c_form.style.width = "200px";
    //c_form.style.minHeight = "170px";
    c_form.style.margin = "0px";
    c_form.style.padding = "0px";
    c_form.style.background = "#E4E0D3";

    c_form.style.WebkitBoxShadow = "0px 0px 15px #000";
    c_form.style.MozBoxShadow = "0px 0px 15px #000";
    c_form.style.BoxShadow = "0px 0px 15px #000";
    c_form.style.top = event.clientY;
    c_form.style.left = event.clientX;

    var author = document.createElement('div');
    author.id = "author";
    author.style.height = "25px";
    author.style.width = "100%";
    author.style.margin = "20px 0px -5px 35px";
    author.style.cursor = "pointer";
    author.style.color = "#000";
    author.innerHTML = "<a href=\"http://"+host+"/sms-create.php?mailto=%CA%EB%E5%F8%ED%E5%F0%F3%EA%E8%E9&subject=%CF%EE+%EF%EE%E2%EE%E4%F3+%F1%EA%F0%E8%EF%F2%E0+hwm_easy_rools\">Сообщить об ошибке</a>";

    var c_form_head = document.createElement('div');
    c_form_head.id = "c_form_head";
    c_form_head.style.height = "25px";
    c_form_head.style.width = "196px";
    c_form_head.style.margin = "2px 2px 0px 2px";
    c_form_head.style.background = "#2B903D";
    c_form_head.style.color = "#000";

    var c_form_head_num = document.createElement('div');
    c_form_head_num.id = "c_form_head_num";
    c_form_head_num.style.height = "23";
    c_form_head_num.style.float = "left";
    c_form_head_num.style.fontSize = "15px";
    c_form_head_num.innerHTML = field.title;
    c_form_head_num.style.color = "#fff";
    c_form_head_num.style.padding = "2px 0 0 0";

    var c_form_head_close = document.createElement('div');
    c_form_head_close.id = "close_form";
    c_form_head_close.innerHTML = "X";
    c_form_head_close.style.width = "21px";
    c_form_head_close.style.height = "25px";
    c_form_head_close.style.float = "right";
    c_form_head_close.style.padding = "0px 0px 0px 6px";
    c_form_head_close.style.fontSize = "20px";
    c_form_head_close.style.color = "#fff";
    c_form_head_close.style.background = "#CC3322";
    c_form_head_close.style.cursor = "pointer";

    c_form_head_close.onclick = function() {
        var elem = document.getElementById("cForm");
        elem.remove();
    };

    var message = document.createElement('text');
    message.id = "message";

    var t = document.createElement('table');

    var tbody = document.createElement('tbody');

    var min_cur = 0;
    if (user_lvl > 4) {
        min_cur = user_lvl*25;
    } else min_cur = 100;

    var residue_rate = user_lvl*1000-user_cur;

    var first_cur = Math.ceil(min_cur/100);
    var last_cur = parseInt(user_lvl)+9;
    var cur_step = 0;
    var step = 0;
    var print_min_cur = false;
    var br = false;

    for (var i = first_cur; i <= last_cur; i++) {
        console.log(i);
        var td = document.createElement('td');
        td.style.width = "42px";
        td.style.height = "20px";
        td.style.padding = "0px 3px";
        td.style.color = "#fff";
        td.style.background = "#2B903D";
        td.style.fontSize = "13px";
        td.style.cursor = "pointer";

        td.onmouseover = function(){
            this.style.background = "#DDD9CD";
            this.style.color = "#000";
        };
        td.onmouseout = function(){
            this.style.background = "#2B903D";
            this.style.color = "#fff";
        };

        if (step % 4 === 0) {
            var tr = document.createElement('tr');
        }

        if (user_gold >= min_cur && residue_rate >= min_cur) {
            if (i < (first_cur+1) && user_lvl > 5 && step === 0 && print_min_cur === false && ((user_lvl/4)-Math.floor(user_lvl/4)) !== 0) {

                td.style.title = min_cur;
                td.innerHTML = min_cur;

                i--;
                print_min_cur = true;

            } else {
                if ((i * 100) < 1000) {
                    cur_step = i * 100;
                } else {
                    cur_step = (i - 9) * 1000;
                }

                if (user_gold <= cur_step) {
                    cur_step = user_gold;
                    br = true;
                }

                if (residue_rate <= cur_step) {
                    cur_step = residue_rate;
                    br = true;
                }

                td.style.title = cur_step;

                if (cur_step % 1000 === 0) {
                    cur_step = String(cur_step);
                    cur_step = cur_step.slice(0, -3);
                    cur_step = cur_step + 'к';
                }

                td.innerHTML = cur_step;
            }
        } else {
            if (residue_rate < min_cur) {
                message.innerHTML = "Больше ставить нельзя";
            } else if(user_gold < min_cur) {
                message.innerHTML = "Недостаточно средств";
            }
            break;
        }


        td.ondblclick = function () {
            document.getElementsByName('bettype')[0].value = field.title;
            document.getElementsByName('bet')[0].value = this.style.title;
            document.getElementsByName('rform')[0].submit();
        };

        tr.appendChild(td);

        if (step % 4 === 0) {
            tbody.appendChild(tr);
        }
        if (br) break;
        step++;
    }
    t.appendChild(tbody);

    c_form_head.appendChild(c_form_head_num);
    c_form_head.appendChild(c_form_head_close);
    c_form.appendChild(c_form_head);
    c_form.appendChild(t);
    c_form.appendChild(message);
    c_form.appendChild(author);
    document.body.appendChild(c_form);
}

function getCorrectNumber (num) {
    num = num.replace(/,/i,"");
    return num;
}