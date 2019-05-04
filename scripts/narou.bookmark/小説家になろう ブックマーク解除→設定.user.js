// ==UserScript==
// @name        小説家になろう ブックマーク解除→設定
// @namespace   narou.bookmark
// @description 小説ページの「ブックマーク解除」を「ブックマーク設定」に置き換え
// @description ついでに「縦書きPDF」を直リンクに置き換え
// @include     *://ncode.syosetu.com/*
// @include     *://novel18.syosetu.com/*
// @version     2.2
// @grant       none
// ==/UserScript==


(function(){

    var userid = 0;    // ユーザid
    var xuserid = 0;    // Xユーザid

    var code = '//li[3]/a';   // 位置
    var bookmark = '//*[contains(@class, "booklist_now")]/a';   // 位置
    var pdf = '//li[5]/a';   // 位置

    code = document.evaluate(code, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var text = 'https://syosetu.com/favnovelmain/updateinput/useridfavncode/' + userid + '_';
    if(code.href.match("novelcom18")){  // Xなら
        text = 'https://syosetu.com/favnovelmain18/updateinput/xidfavncode/' + xuserid + '_';
    }
	code = code.href.replace(/^.*?ncode\//, text);

    var result = document.evaluate(bookmark, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i=0;i<result.snapshotLength;i++){
    	bookmark = result.snapshotItem(i);
	    bookmark.setAttribute('href', bookmark.href.replace(/.*/, code));
	    bookmark.text = 'ブックマーク設定';
    }

    pdf = document.evaluate(pdf, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    pdf.setAttribute('href', pdf.href = pdf.href + 'main.pdf');

})();

/*
2.2 SSL化対応
2.1 「小説情報」での置換に対応(1.1をすっ飛ばしてました)
2.0 2017年8月の仕様変更に対応。縦書きPDFのリンク置き換え。
1.1 「小説情報」での置換に対応
1.0 公開
*/
