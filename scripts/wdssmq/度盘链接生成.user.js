// ==UserScript==
// @name        度盘链接生成
// @namespace   wdssmq
// @version     1.3.4
// @description 分享资源后生成相应的html代码。
// @author      沉冰浮水
// @url         https://greasyfork.org/zh-CN/scripts/6505-%E5%BA%A6%E7%9B%98%E9%93%BE%E6%8E%A5%E7%94%9F%E6%88%90
// @include     *//pan.baidu.com/disk/home*
// @grant       none
// ==/UserScript==
/*jshint esversion: 6 */
(function () {
  console.log("xnxf");

  $(document).delegate('.content', 'mouseover', function () {
    let url = $('.link-info .share-url').val();
    let pwd = $('.link-info .share-password').val();
    let title = $('.dialog-header h3 .select-text').text().replace(/分享文件\(夹\):|文件上传|上传完成/g, '');
    let html = '<a href="' + url + '" title="' + title + '" target="_blank" rel="nofollow">' + url + '</a>';
    let value = ('<p>度盘下载：' + html + ' 提取密码：' + pwd + '</p>');
    if ($('#new-input').length === 0 && $(".share-url-border").length > 0 && url) {
      console.log(url, pwd, title);
      //$('.create-success').html(html);
      $('.create-success').html([title,url,pwd].join("|"));
      //$('.url').after('<div><input id="new-input" class="share-url" type="text" value="' + value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') + '" readonly="readonly" spellingcheck="false"></div>');
      $(".url").after('<div><textarea id="new-input" readonly="readonly" spellingcheck="false" style="width: 100%;height: 6em;">' + value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') + '</textarea></div>');
      $('#new-input').css({
        width: "100%",
        height: "5em",
        padding: "6px",
        border: "1px solid #e9e9e9",
        borderRadius: "4px"
      }).mouseover(function () {
        $(this).select();
      });
    } else {
      //$('.create-success').html(html);
      $('.create-success').html([title,url,pwd].join("|"));
      $('#new-input').val(value);
    }
  });
})();