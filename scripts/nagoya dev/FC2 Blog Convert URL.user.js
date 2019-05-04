// ==UserScript==
// @name        FC2 Blog Convert URL
// @description FC2ブログのリンク周りを置換して使いやすくします。
// @namespace   http://userscripts.org/users/559497
// @include     *.blog.fc2.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function(){
var node = document.getElementsByTagName("a");
for(var i=0;i<node.length;i++){
var n=node[i].href;
if(n.match(/#entry/)){
var temp = n.replace(/(^http.+com\/)(.+#entry)(.+)/, '$1blog-entry-$3\.html');
node[i].setAttribute("href", temp);
}
}
})();
