// ==UserScript==
// @name         公視公播網
// @version      庫庫
// @description  喵喵喵
// @author       pica
// @match        http://ptsvod.sunnystudy.com.tw/contentPage.aspx*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://unpkg.com/axios/dist/axios.min.js
// @run-at       document-onload
// @icon         http://ptsvod.sunnystudy.com.tw/images/favicon.ico
// @namespace    https://greasyfork.org/users/168155
// ==/UserScript==
axios.post('ashx/video.ashx', {
    JJMethod: 'GetVideoDetail',
    VideoId: CurrVideoId
}).then(function (response) {
    console.log(response.data.Data[0].Files_HD);
    $(".mainVideo").attr('style','display:none')
    // 新增 iframe
    var iframe = document.createElement('iframe');
    var html = `<body>
<video controls id="movie" poster="http://ptsvod.sunnystudy.com.tw/videoFiles/`+response.data.Data[0].VideoGroupImg+`" width="100%" height="100%">
<source src="http://ptsvod.sunnystudy.com.tw/videoFiles/`+response.data.Data[0].Files_HD+`" type="video/mp4" />
<source src="http://ptsvod.sunnystudy.com.tw/videoFiles/`+response.data.Data[0].Files_SD+`" type="video/mp4" />
</video>
</body>`;
    iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
    iframe.setAttribute('style', 'width:100%;height: 480px;background-color:#000');
    $(iframe).insertBefore(".mainVideo");
    // 新增下載按鈕
    var dlink = document.createElement('a');
    dlink.setAttribute('style', 'margin-right:3px;');
    dlink.setAttribute('class', 'floatR btn-white btn-line');
    if(response.data.Data[0].Files_HD)
        dlink.setAttribute('href', '/videoFiles/'+response.data.Data[0].Files_HD);
    else
        dlink.setAttribute('href', '/videoFiles/'+response.data.Data[0].Files_SD);
    dlink.setAttribute('download', response.data.Data[0].Name+'#'+response.data.Data[0].ID+'.mp4');
    dlink.innerHTML='下載'
    $(dlink).insertAfter("#form1 div.container div.row.padding-big div.wrapper div.titleBox a.floatR.btn-white.btn-line.program.cboxElement");
    // 以 IINA 開啟
    var IINA = document.createElement('a');
    IINA.setAttribute('style', 'margin-right:3px;');
    IINA.setAttribute('class', 'floatR btn-white btn-line');
    if(response.data.Data[0].Files_HD)
        IINA.setAttribute('href', 'iina://weblink?url=http://ptsvod.sunnystudy.com.tw/videoFiles/' + encodeURIComponent(response.data.Data[0].Files_HD));
    else
        IINA.setAttribute('href', 'iina://weblink?url=http://ptsvod.sunnystudy.com.tw/videoFiles/' + encodeURIComponent(response.data.Data[0].Files_SD));
    IINA.innerHTML='以 IINA 開啟'
    if(navigator.platform.indexOf("Mac") == 0)
        $(IINA).insertAfter("#form1 div.container div.row.padding-big div.wrapper div.titleBox a.floatR.btn-white.btn-line.program.cboxElement");
}).catch(function (error) {
    console.log(error);
});