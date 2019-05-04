// ==UserScript==
// @name        MagnetTo115
// @namespace   Moe
// @description 在任意网站中，选中磁力链接，按Ctrl+M，会跳转到115网盘，并自动创建离线任务。
// @version     2.5
// @run-at      document-end
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

var domain = location.host;
console.warn("MagnetTo115 setup!")
if(domain.indexOf("115") ==-1){
    console.warn("MagnetTo115 is listening keyboard event!")
    document.getElementsByTagName("body")[0].addEventListener("keydown", function(e){
    if(e.ctrlKey && (e.keyCode==77)){
       var url = window.getSelection().focusNode.data;
         GM_setValue("magnet", url);
 
    window.open("http://115.com/?tab=offline&mode=wangpan");
    }
     
})
}else if(domain.indexOf("115")!=-1){
    var link = GM_getValue('magnet');
    var readyStareChange = setInterval(function () {
        if (document.readyState == 'complete') {
          clearInterval(readyStareChange);
          setTimeout(function () {
            Core['OFFL5Plug'].OpenLink();
            setTimeout(function () {
              document.querySelector('#js_offline_new_add').value=link;
            }, 0);
          }, 1000);
        }
    }, 200);
}


 

 