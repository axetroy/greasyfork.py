// ==UserScript==
// @name           Virtonomica:30 People
// @namespace      Virtonomica
// @description    Расчет, показ и установка рекламы для 30 населений города
// @author         UnclWish
// @version        3.5
// @include        *virtonomic*.*/*/main/unit/view/*/virtasement*
// ==/UserScript==
var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    var $ = win.$;

	var title=$('#wrapper > div.metro_header > div > div.picture').attr('class');
	var a1=(location.href).slice(-3);
	var a2=$('div.title').text().trim();
	//if (isNaN(a1)) return; //Выход если не главная страница
	//if ((title.search('unit-header-office') != -1) & isNaN(a1)) return; // Выход если офис
	if ($('#mainContent > form > table.infoblock > tbody > tr:nth-child(1) > th').text() == "Рекламируемых товаров:") return;
	//console.log ('Working');
	//console.log($('#mainContent > form > table.infoblock > tbody > tr:nth-child(1) > th').text());
	//if (a2.indexOf("Офис") == -1 ) return; //Выход если главная страница не нашей компании


	function numberFormat (number) {
        number += '';
        var parts = number.split('.');
        var int = parts[0];
        var dec = parts.length > 1 ? '.' + parts[1] : '';
        var regexp = /(\d+)(\d{3}(\s|$))/;
        while (regexp.test(int)) {
            int = int.replace(regexp, '$1 $2');
        }
        return int + dec;
    }

	var inputview = $('<button>x30</button>').unbind('click').click( function() {
		var fl_people = parseInt($("input[name='advertData[population]']").val().replace(/ /g, '')),
            fl_tcost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_ccount = parseInt($("input[name='advertData[contactCount]']").val().replace(/ /g, '')),
            fl_cost = (fl_tcost / fl_ccount);
        //var fl_val = /([\D]+)*([\d\s]+\.*\d*)/.exec(people)[2].replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
        //fl_people = parseInt(fl_val);
        fl_cost = Math.ceil(fl_people * fl_cost * 30);
        if (isNaN(fl_cost))
            $("#out_p").text('Не выбрано размещение рекламы');
        else
        $("#out_p").text( numberFormat(fl_people * 30) +' = $' + numberFormat(fl_cost));
    });

    var input30_1 = $('<button>x30-1$</button>').unbind('click').click( function() {
		var fl_people = parseInt($("input[name='advertData[population]']").val().replace(/ /g, '')),
            fl_tcost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_ccount = parseInt($("input[name='advertData[contactCount]']").val().replace(/ /g, '')),
            fl_cost = (fl_tcost / fl_ccount);
		fl_cost = Math.ceil((fl_people * fl_cost * 30)) - 1;
        $("input[name='advertData[totalCost]']").val(fl_cost);
        refresh (fl_cost);
    });

    var input30 = $('<button>x30</button>').unbind('click').click( function() {
		var fl_people = parseInt($("input[name='advertData[population]']").val().replace(/ /g, '')),
            fl_tcost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_ccount = parseInt($("input[name='advertData[contactCount]']").val().replace(/ /g, '')),
            fl_cost = (fl_tcost / fl_ccount);
		fl_cost = Math.ceil(fl_people * fl_cost * 30);
        $("input[name='advertData[totalCost]']").val(fl_cost);
        refresh (fl_cost);
    });

    var input30_2 = $('<button>x30+1$</button>').unbind('click').click( function() {
		var fl_people = parseInt($("input[name='advertData[population]']").val().replace(/ /g, '')),
            fl_tcost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_ccount = parseInt($("input[name='advertData[contactCount]']").val().replace(/ /g, '')),
            fl_cost = (fl_tcost / fl_ccount);
		fl_cost = Math.ceil((fl_people * fl_cost * 30)) + 1;
        $("input[name='advertData[totalCost]']").val(fl_cost);
        refresh (fl_cost);
    });

    var input3 = $('<button>x3</button>').unbind('click').click( function() {
		var fl_people = parseInt($("input[name='advertData[population]']").val().replace(/ /g, '')),
            fl_tcost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_ccount = parseInt($("input[name='advertData[contactCount]']").val().replace(/ /g, '')),
            fl_cost = (fl_tcost / fl_ccount);
		fl_cost = Math.ceil(fl_people * fl_cost * 3);
        $("input[name='advertData[totalCost]']").val(fl_cost);
        refresh (fl_cost);
    });

    var input6 = $('<button>x6</button>').unbind('click').click( function() {
		var fl_people = parseInt($("input[name='advertData[population]']").val().replace(/ /g, '')),
            fl_tcost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_ccount = parseInt($("input[name='advertData[contactCount]']").val().replace(/ /g, '')),
            fl_cost = (fl_tcost / fl_ccount);
		fl_cost = Math.ceil(fl_people * fl_cost * 6);
        $("input[name='advertData[totalCost]']").val(fl_cost);
        refresh (fl_cost);
    });

    var input10 = $('<button>x10</button>').unbind('click').click( function() {
		var fl_people = parseInt($("input[name='advertData[population]']").val().replace(/ /g, '')),
            fl_tcost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_ccount = parseInt($("input[name='advertData[contactCount]']").val().replace(/ /g, '')),
            fl_cost = (fl_tcost / fl_ccount);
		fl_cost = Math.ceil(fl_people * fl_cost * 10);
        $("input[name='advertData[totalCost]']").val(fl_cost);
        refresh (fl_cost);
    });

    var input20 = $('<button>x20</button>').unbind('click').click( function() {
		var fl_people = parseInt($("input[name='advertData[population]']").val().replace(/ /g, '')),
            fl_tcost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_ccount = parseInt($("input[name='advertData[contactCount]']").val().replace(/ /g, '')),
            fl_cost = (fl_tcost / fl_ccount);
		fl_cost = Math.ceil(fl_people * fl_cost * 20);
        $("input[name='advertData[totalCost]']").val(fl_cost);
        refresh (fl_cost);
    });

    var inputmax = $('<button>MAX</button>').unbind('click').click( function() {
		var fl_people = parseInt($("input[name='advertData[population]']").val().replace(/ /g, '')),
            fl_tcost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_ccount = parseInt($("input[name='advertData[contactCount]']").val().replace(/ /g, '')),
            fl_cost = (fl_tcost / fl_ccount);
		fl_cost = Math.ceil(fl_people * fl_cost * 1600);
        $("input[name='advertData[totalCost]']").val(fl_cost);
        refresh (fl_cost);
    });

    var inputviewmax = $('<button>MAX</button>').unbind('click').click( function() {
		var fl_people = parseInt($("input[name='advertData[population]']").val().replace(/ /g, '')),
            fl_tcost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_ccount = parseInt($("input[name='advertData[contactCount]']").val().replace(/ /g, '')),
            fl_cost = (fl_tcost / fl_ccount);
		fl_cost = Math.ceil(fl_people * fl_cost * 1600);
        if (isNaN(fl_cost))
            $("#out_p").text('Не выбрано размещение рекламы');
        else
            $("#out_p").text( numberFormat(fl_people*1600) +' = $' + numberFormat(fl_cost));
    });

    var correctmax = $('<button>Корректировка MAX</button>').unbind('click').click( function() {
		var fl_cost = parseFloat($("input[name='advertData[totalCost]']").val().replace(/ /g, '')),
            fl_eff = parseFloat($("input[name='advertData[productivity]']").val().replace('%', ''));
        if (fl_eff===0) $("#out_p").text('Скорректировать максимальную сумму рекламы для 100% эффективности можно только после выбора размещения рекламы и нажатия на кнопку "MAX", для новых подразделений - на следующий пересчет после создания подразделения');
        if ((fl_eff>0)&(fl_eff<100)) {
            fl_cost = fl_cost * (fl_eff / 100);
            $("input[name='advertData[totalCost]']").val(fl_cost);
            refresh (fl_cost);}
        if (fl_eff===100) $("#out_p").text('Корректировка суммы рекламы не требуется - квалификации вашего топ-менеджера достаточно');
    });

    $("form").before('<div id=out_p align=center>').before('<b>Просмотр: ').before(inputview).before(inputviewmax).before('<br>').before('<b>Установка:').before(input30_1).before(input30).before(input30_2).before(input3).before(input6).before(input10).before(input20).before(inputmax).before('<br>').before('<b>Исправление максимальной рекламы под квалификацию:').before('<br>').before(correctmax);
//    $("table.tabsub").after(inputmax).after(input3).after(input2).after(input1).after(input).after('<div id=out_p>');

};

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);