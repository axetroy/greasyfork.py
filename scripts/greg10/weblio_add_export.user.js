// ==UserScript==
// @name        weblio_add_export
// @namespace   http://catherine.v0cyc1pp.com/weblio_add_export.user.js
// @include     https://uwl.weblio.jp/word-list
// @run-at      document-start
// @version     1.6
// @author      greg10
// @license     GPL 3.0
// @require     http://code.jquery.com/jquery-3.1.1.min.js
// @grant       none
// @description Weblioの単語帳にエクスポートを追加し、単語リストだけでなく、意味、発音などをCSV形式でダウンロードできるようにする。
// ==/UserScript==

// [Details]
// 「単語帳のインポート」メニューの下に「単語帳のエクスポート」メニューが追加されます。
// クリックするとダウンロードフォルダにcsvファイルがエクスポートされます。
// 単語、発音、品詞、意味、例文、レベルなどが保存されます。


this.$ = this.jQuery = jQuery.noConflict(true);
//console.log("weblio_add_export start");

function getImportElement() {
	var ret = null;
	$("li").each( function() {
		var str = $(this).text();
		if ( str.indexOf("単語帳のインポート") !== -1 ) {
			ret = $(this);
		}
	});
	return ret;
}

function exportlist() {
	//alert("export() clicked!");

	var alldata='';
	$("tr.tngMainTrOn").each( function() {
		var kids = $(this).children("td");
		var line = "";
		for( var i = 0; i < kids.length; i++ ){
			var kid = kids[i];
			var str = "";
			if ( i === 0 ) {
				str = $(kid).children("div").children("a").text();
			} else if ( i === 3 ) {
				str = $(kid).find("tbody > tr > td > div.tngMainTIML").text();
			} else if ( i === 4 ) {
				str = $(kid).find("tbody > tr > td > div.tngMainTSRHB > p.tngMainTSRH").text();
			} else {
				str = $(kid).text();
			}

			if ( line.length !== 0 ) {
				line = line + ',';
			}
			line = line + "\"" + str + "\"";
		}
		alldata = alldata + line + '\n';
	});


	var a = document.createElement('a');
	a.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(alldata);

	// 単語帳の名前を取得する
	//var listname = $("td.selectFolderName").children("span").text();
	var listname = $("td.selectFolderName > div > div").children("span").text();
	if ( listname === null || listname === undefined || listname === "" ) {
		listname = "単語帳";
	}
	var filename = listname + ".csv";

	//supported by chrome 14+ and firefox 20+
	a.download = filename;
	//needed for firefox
	document.getElementsByTagName('body')[0].appendChild(a);
	//supported by chrome 20+ and firefox 5+
	a.click();
}


function main() {

	var imp = getImportElement();
	//$(imp).after('<li class="sideCat" onclick="exportlist();"><span>単語帳のエクスポート</span></li>');

	if ( imp === null ) {
		return;
	}
	if ( $(imp).attr('mydone') === "done" ) {
		return;
	}
	$(imp).attr("mydone","done");
	var lielem = $("<li class=\"\"/>");
	$(lielem).append( $("<a/>", {
		text: "単語帳のエクスポート",
		click: function() {
			exportlist();
		}
	}));

	$(imp).after(lielem);

}


var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    main();
    observer.observe( document, config);
});

var config = { attributes: false, childList: true, characterData: false, subtree:true };

observer.observe( document, config);

