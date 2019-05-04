// ==UserScript==
// @name         博客园显示随笔标签
// @version      0.1
// @description:zh-cn    博客园自动显示随笔标签
// @author       lepecoder
// @match        https://i.cnblogs.com/EditPosts.aspx?*
// @grant        none
// @namespace https://greasyfork.org/users/164817
// ==/UserScript==

(function() {
$(".itemspace:eq(1)").load("/tags/list");
    function f(){
        $("#taglist a").removeAttr("href");
        $("#taglist a").removeAttr("onclick");
        $("#taglist a").css({"color":"#163C09","cursor":"pointer"});
         $("#taglist a").click(function(){
             var decodedTag = $(this).html();


var txbTag = '';
try {
    txbTag = document.getElementById("Editor_Edit_Advanced_txbTag");
} catch(e) {
    document.domain = 'cnblogs.com';
    txbTag = document.getElementById("Editor_Edit_Advanced_txbTag");
}

if (txbTag.value === '') {
    txbTag.value += decodedTag;
}
else {
    txbTag.value += "," + decodedTag;
}
 });
    }
 setTimeout(f,1000);

})();