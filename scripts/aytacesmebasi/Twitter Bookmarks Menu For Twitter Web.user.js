// ==UserScript==
// @name              Twitter Bookmarks Menu For Twitter Web
// @name:en           Twitter Bookmarks Menu For Twitter Web
// @name:tr           Twitter Web İçin Twitter Yer İşaretleri Menüsü
// @description:en    Add bookmarks menu in twitter mobile to twitter web interface. Thanks to @martin from teknoseyir. Related topic link; https://teknoseyir.com/durum/967906
// @description:tr    Bu script ile twitter'ın web arayüzüne mobil arayüzünde bulunan Yer İşaratleri menüsünü eklersiniz. Bu scripti hazırlayan teknoseyir'den @martin 'e teşekkürler. İlgili konu bağlantısı; https://teknoseyir.com/durum/967906
// @version        1.0
// @namespace      https://twitter.com/
// @include        https://twitter.com/*
// ==/UserScript==
//Bu scripti geliştirmek için düşünülen fikir; Yer İşaretlerine tıklandığında twitter'ın mobil versiyonuna gidiliyor, geri web arayüzüne dönmek için bir eklenti yapılabilinir.

var $bookmarks = $('<a href="https://mobile.twitter.com/i/bookmarks" class="js-nav" role="menuitem"><span class="DashUserDropdown-linkIcon Icon Icon--bookmark"></span>Yer İşaretleri</a>');

$bookmarks.appendTo("li[data-name='lists']");