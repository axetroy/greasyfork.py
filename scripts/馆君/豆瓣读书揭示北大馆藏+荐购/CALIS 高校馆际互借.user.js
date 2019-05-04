// ==UserScript==
// @id            xuqb@lib.pku.edu.cn
// @name          豆瓣读书揭示北大馆藏+荐购/CALIS 高校馆际互借
// @namespace     lib.pku.edu.cn
// @version       4.01
// @description   为豆瓣读书增加北京大学图书馆相关图标和资源链接，以及 CALIS（中国高等教育文献保障系统）联合目录查询与馆际互借入口。1）图书页面——“在哪儿借这本书” 2）批量查馆藏——在图书搜索结果、丛书、豆列、作者作品、作品版本、标签浏览乃至广播页面显示每一本书的北大馆藏情况（该功能受限较多，不稳定，默认不开启，需先勾选页面顶部选项才开启）。如果该书有 ISBN（国际标准书号）但查无此书，或没有 ISBN，则改为提供一个按书名检索的链接。荐购功能：在图书页面点击查馆藏链接后，原图书页面还将显示推荐购买界面，如果能确认该书尚不为北大图书馆所收藏，可由此快捷荐购。
// @author        馆君
// @match         https://book.douban.com/subject/*
// @match         https://book.douban.com/subject_search*
// @match         https://book.douban.com/search/*
// @match         https://book.douban.com/series/*
// @match         https://book.douban.com/tag/*
// @match         https://book.douban.com/author/*/books*
// @match         https://book.douban.com/works/*
// @match         https://www.douban.com/doulist/*
// @match         https://www.douban.com/search*
// @match         https://www.douban.com/*
// @connect       api.douban.com
// @connect       162.105.138.200
// @connect       opac.calis.edu.cn
// @grant         GM_xmlhttpRequest
// @grant         GM_setClipboard
// @grant         GM_addStyle
// @grant         GM_setValue
// @grant         GM_getValue
// ==/UserScript==
var Douban_PKUL_Styles = "@charset utf-8;";
Douban_PKUL_Styles += " .searchOPACinList label { background-color: #545652; }";
Douban_PKUL_Styles += " #searchOPACinList { margin-left: 10px; vertical-align: text-bottom; }";
Douban_PKUL_Styles += " .PKULib, #CALIS { margin-right: 10px; font-size: 9px; }";
Douban_PKUL_Styles += " .PKULibLogo {height: 16px; vertical-align: text-bottom; padding-right: 2px;}";
Douban_PKUL_Styles += " #formPKULPurchase { width: 260px; font-size: 9px; background-color: rgba(144, 160, 238, 0.25); padding: 4px; border-radius: 6px; }";
Douban_PKUL_Styles += " #formPKULPurchase input, #formPKULPurchase label, #formPKULPurchase span { font-size: 9px; }";
Douban_PKUL_Styles += " #formPKULPurchase b { font-size: 12px; }";
Douban_PKUL_Styles += " .PKULibPurchaseTheme { font-size: 13px; color: #03155f; font-weight: bold; }";
Douban_PKUL_Styles += " #formPKULPurchase textarea { border-color: red; font-size: 10px; width: 250px; min-height: 40px; resize: vertical; }";
Douban_PKUL_Styles += " #paraTI, #paraAU { width: 213px; }";
Douban_PKUL_Styles += " #paraPUB { width: 124px; } #paraPD { width: 50px; } ";
Douban_PKUL_Styles += " #paraPR { width: 72px; } #paraISBN { width: 100px; } ";
Douban_PKUL_Styles += " #paraID { width: 100px; } ";
Douban_PKUL_Styles += " #buttSUBMIT { width: 255px; height:36px; font-size: 16px !important; letter-spacing: 0.8px; border-radius: 6px; color: #03155f; background-color: orange; font-weight: bold; } ";
Douban_PKUL_Styles += " .purchaseSubmitted { color: gray !important; } ";
Douban_PKUL_Styles += " #CALISholding { color: #666666; background-color: white; border-radius: 6px; padding: 6px; max-width: 224px; max-height: 396px; overflow-y: scroll; } ";
Douban_PKUL_Styles += " #CALISholding li { border: none; display: block; padding-left: 6px; line-height: 12px; } ";
Douban_PKUL_Styles += " #CALISholding li a { padding: 2px; font-size: 10px; } ";
GM_addStyle(Douban_PKUL_Styles); // 油猴脚本附加 CSS


function getDoc(url, meta, callback) { // XHR 回调函数模板——使用该函数可成功跨域请求 HTML
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
      'User-agent': window.navigator.userAgent,
      'Content-type': null
    },
    onload: function(responseDetail) {
      var doc = '';
      if (responseDetail.status == 200) {
        doc = new DOMParser().parseFromString(responseDetail.responseText, 'text/html');
        if (doc === undefined) {
          doc = document.implementation.createHTMLDocument("");
          doc.querySelector('html').innerHTML = responseText;
        }
      }
      callback(doc, responseDetail, meta);
    }
  });
}

function getJSON(url, meta, callback) { // XHR 回调函数模板——使用该函数可成功跨域请求 JSON
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
      'User-agent': window.navigator.userAgent,
      //'Content-type': 'application/json',
      'Accept': 'application/atom+xml,application/xml,text/xml'
    },
    onload: function(responseDetail) {
      var doc = {};
      if (responseDetail.status == 200) {
        doc = $.parseJSON(responseDetail.responseText);
      }
      callback(doc, responseDetail, meta);
    }
  });
}

function addCALIS(pageISBN) { // 根据图书页面提供的 ISBN 生成 CALIS 联合目录揭示界面
  if (!(window.location.hostname == "book.douban.com" && /^\/subject\/\d+\/$/.test(window.location.pathname)))
    return; // 只在图书页面生成
	var $searchingCALIS = $("<span id='searchingCALIS'>……检索中，请稍等</span>");
  var $CALIS = $("<span id='CALIS'>CALIS 高校图书馆</span>").append($searchingCALIS);
  var $CALISLI = $("<li id='CALISLI' style='border: none'></li>").append($CALIS);
  $("#PKULibLI").after($CALISLI);
  var urlSearchISBN = "http://opac.calis.edu.cn/opac/doSimpleQuery.do?actionType=doSimpleQuery&query=%28bath.isbn%3D%22" + pageISBN + "%22%29&maximumRecords=1";
  // 按 ISBN 查询 CALIS 联合目录 OPAC
  getDoc(urlSearchISBN, null, function(calisResult, resp, meta) { // 检索 CALIS 联合目录
    var oid4Holding = $("input[name='idxCheckBox']", calisResult).val(); // 联合目录馆藏 ID
    if (oid4Holding.length <= 0) {
      $("#CALISLI").remove(); // 本脚本不提供按题名检索 CALIS 联合目录
    	return;
    }
    var urlSearchHolding = "http://opac.calis.edu.cn/opac/showHolding.do?subact=enterpage&fromType4Holding=fromSimpleList&langBase4Holding=null&targetName=showHoldingWindow&oid4Holding=" + oid4Holding;
    getDoc(urlSearchHolding, null, function(holdingResult, resp, meta) { // 获取高校馆藏分布
			var $ul = $("<ul id='CALISholding' class='CALIStoggle'></ul>");
			var $CALISlibs = $("input[name='libcodeCheckBox']", holdingResult); // 其中包含高校图书馆名称
      $searchingCALIS.remove();
      $ul.prepend($("<li class='CALIStoggle' style='padding-left: 4px;'><a href='" + urlSearchHolding + "' target='_blank' title='申请 CALIS 馆际互借'>&gt; 从以下图书馆申请馆际互借</a></li>"));
      $CALIS.after($ul);
			$CALISlibs.each(function(){
				$ul.append($("<li>" + $(this).val().match(/\|(.+)/)[1] + "</li>")); // 逐个生成高校图书馆 ul
			});
	    $(".CALIStoggle").hide(); // 初始隐藏
      if ($CALISlibs.length > 0) {
        $CALIS.text($CALIS.text() + "(" + $CALISlibs.length + ")");
        $CALIS.wrap($("<a href='#' target='_blank' title='显示／隐藏 CALIS 高校馆藏分布'></a>"));
        $CALIS.on("click", function() {
          $(".CALIStoggle").toggle();
          return false;
        });
      } else {
        $CALIS.wrap($("<a href='" + urlSearchISBN + "00' target='_blank' title='CALIS 联合目录检索'></a>")); // 这里给 maximumRecords 增加到 100
      }
  	});
  });
}

function generatePurchaseForm(thisBook) { // 在 .PKULib 之后生成荐购界面
/*  if (!(window.location.hostname == "book.douban.com" && /^\/subject\/\d+\/$/.test(window.location.pathname)))
    return; // 只在图书页面生成荐购单
  var $form = $("<form id='formPKULPurchase' method='post' action='http://162.105.138.200/uhtbin/cgisirsi/0/0/0/65/PURCHASE' accept-charset='UTF-8' target='_blank'></form>");
  $form.append($("<p class='PKULibPurchaseTheme'>如果尚未收藏，打算推荐购买？</p>")).append($("<hr />"));
  $form.append($("<b>书目信息</b>")).append($("<span>（已自动填写，请核对订正）</span>")).append($("<br />"));
  $form.append($("<label for='paraTI'>书　名 </label>"));
  $form.append($("<input type='text' name='entry^1^TITLE^题名' id='paraTI' class='PKULib_MUST' size='30' value='" + thisBook.title + (thisBook.subtitle.length > 0 ? ". " + thisBook.subtitle : "") + "' placeholder='必填' required='required' />")).append($("<br />"));
  $form.append($("<label for='paraAU'>著　者 </label>"));
  $form.append($("<input type='text' name='entry^2^AUTHOR^著者' id='paraAU' class='PKULib_MUST' size='30' value='" + thisBook.author.join("、") + (thisBook.translator.length > 0 ? "；" + thisBook.translator.join("、") + " 译" : "") + "' placeholder='必填；包括作者、编者、译者等' required='required' />")).append($("<br />"));
  $form.append($("<label for='paraPUB'>出版社 </label>"));
  $form.append($("<input type='text' name='entry^3^PUBLISHER^出版者' id='paraPUB' size='17' value='" + thisBook.publisher + "' placeholder='出版社、出版商' />"));
  $form.append($("<label for='paraPD'> 年月 </label>"));
  $form.append($("<input type='text' name='entry^4^DATE^日期' id='paraPD' size='7' value='" + (/\d{2,4}[-\/\.]\d{1,2}/.test(thisBook.pubdate) ? thisBook.pubdate.match(/\d{2,4}[-\/\.]\d{1,2}/)[0] : thisBook.pubdate) + "' placeholder='出版年月' />")).append($("<br />"));
  $form.append($("<label for='paraPR'>定　价 </label>"));
  $form.append($("<input type='text' name='entry^7^PRICE^价格' id='paraPR' size='10' value='" + thisBook.price + "' placeholder='图书价格' />"));
  $form.append($("<label for='paraISBN'> ISBN </label>"));
  $form.append($("<input type='text' name='entry^5^ISBN/ISSN^ISBN/ISSN' id='paraISBN' size='14' value='" + (thisBook.isbn13 ? thisBook.isbn13 : (thisBook.isbn10 ? thisBook.isbn10.replace(/^SH/, "统一书号 ") :"（无）")) + "' placeholder='国际标准书号' />")).append($("<br />"));
  $form.append($("<hr />"));
  $form.append($("<label for='paraWHY' style='color: red;'><b>推荐理由<br /></b></label>"));
  $form.append($("<textarea name='entry^6^CITED_IN^推荐原因' id='paraWHY' class='PKULib_MUST' size='14' maxlength='140' placeholder='为何推荐这本书？——对专业的重要性、作者知名度、版本价值，等等' autofocus='autofocus' required='required' rows='3'></textarea>")).append($("<br />"));
  $form.append($("<span>如果是外文书 </span>"));
  $form.append($("<input type='radio' name='entry^8^NOTE^注释' id='paraNOTEhold' value='希望预约' />"));
  $form.append($("<label for='paraNOTEhold'>希望预约可借复本 </label>"));
  $form.append($("<input type='radio' name='entry^8^NOTE^注释' id='paraNOTEnohold' value='不必预约或非外文书' checked='checked' />"));
  $form.append($("<label for='paraNOTEnohold'>无所谓</label>")).append($("<br />"));
  $form.append($("<label for='paraID'><b>校园卡号</b> </label>"));
  $form.append($("<input type='text' name='alt_id' id='paraID' size='14' value='' placeholder='推荐人的校园卡号' />")).append($("<br />"));
  $form.append($("<span>【说明】建议正确填写校园卡号，有助于图书馆决定是否订购，并且用户还可在 e-Library 中跟踪订购状态（限同时最多 3 个）</span>")).append($("<br />"));
  $form.append($("<hr />"));
  $form.append($("<input type='submit' value='推荐给北大图书馆订购' id='buttSUBMIT' />"));
  $form.append($("<input type='hidden' name='entry^9^SOURCE^来源' size='10' value='" + thisBook.alt + "' />"));
  $form.hide(); // 初始隐藏
  $(".PKULib").after($form); // 生成表单；下面继续挂接事件函数
  $(".PKULib a").on("click", function(){ // 强制用户先用书名查询 OPAC 至少一次才能显示荐购界面
    $("#formPKULPurchase").show();
  });
  $form.on("submit", trySubmitRecomm); // 挂接事件：尝试提交（验证 + 提交）
  $(".PKULib_MUST").on("input", function() { // 必填字段如果空值，立刻用红色提醒
    var color = $(this).val().length > 0 ? "initial" : "red";
    $(this).prev("label").css("color", color); // 就是栏位提示文字 label
    $(this).css("border-color", color);
  }); */
}


function trySubmitRecomm() { // 验证并实际执行提交
  //document.charset='UTF-8';
  if ($("#paraTI").val().length <= 0 || $("#paraAU").val().length <= 0 || $("#paraWHY").val().length <= 0) {
    alert("书名、著者、推荐理由为必填项，请不要留空！\n\n谢谢合作！");
    return false;
  }
  if ($("#paraID").val().length < 10 && $("#paraNOTEhold").attr("checked") == "checked") {
    alert("您选择了希望预约外文图书的可借出复本，然则还须正确填写校园卡号。\n\n请重新填写并核实。谢谢合作！");
    $("#paraID").select();
    return false;
  }
  if (!confirm("只有正确填写校园卡号才能跟踪订购申请的状态（登录馆藏目录 -> 读者服务 -> 用户状态查询 -> 请求），图书馆也将优先考虑此类申请。\n\n现在" + (($("#paraID").val().length <= 0) ? "没有填写校园卡号" : "填写的卡号是【" + $("#paraID").val() + "】") + "，您确定要推荐吗？")) {
    $("#paraID").select();
    return false;
  }
  var urlPreLoad = "http://162.105.138.200/uhtbin/cgisirsi/0/0/0/64/PURCHASE";
  getDoc(urlPreLoad, null, function(doc, resp, meta) {
      document.getElementById("formPKULPurchase").submit(); // 必须预先请求上面的页面，才能正确提交荐购申请
  });
  $("#buttSUBMIT").val("荐购申请已提交！"); // 替换提交按钮的文字
  $("#buttSUBMIT").addClass("purchaseSubmitted"); // 按钮文字变灰
  $("#buttSUBMIT").attr("disabled", "disabled"); // 停用提交按钮
  $("#formPKULPurchase").append($("<p id='PKULibPurchaseRetry'>如果申请提交不成功，可以<a href='#'>重新填表</a>。</p>"));
  $("#PKULibPurchaseRetry").on("click", "a", function(){
    $("#buttSUBMIT").val("重新向北大图书馆推荐订购");
    $("#buttSUBMIT").removeClass("purchaseSubmitted");
    $("#buttSUBMIT").attr("disabled", false); // 恢复提交按钮
    $("#PKULibPurchaseRetry").remove();
    return false;
  });
  return false; // 直接的提交行为永远被阻止，因为无法成功
}


function addPKULib($rootSelector, subjectID, byAppend, pageTI, pageISBN) { // 两个 bak 参数为图书页面提供的备用数据
  var $PKULib = $("<span class='PKULib'><img class='PKULibLogo' src='http://lib.pku.edu.cn/portal/sites/default/files/favicon.ico' /></span>");
  var $PKULibText = $(byAppend ? "<span>北大图书馆</span>" : "<span>北京大学图书馆</span>"); // 部分情况显示简称
  var $searching = $("<span class='searchingPKULib'>……检索中，请稍等</span>");
  $PKULib = $PKULib.append($PKULibText).append($searching);
  if (byAppend) // 创建北大图书馆项目，根据参数区分插入的位置
    $($rootSelector).append($PKULib); // 容器末尾：适用于通用搜索结果、作品版本列表
  else
    $($rootSelector).prepend($PKULib); // 容器开头：适用于其他情况
  // 调用豆瓣图书 API 获得图书信息
  getJSON("https://api.douban.com/v2/book/" + subjectID, null, function(thisBook, resp, meta) {
    var urlSearchTI = "http://162.105.138.200/uhtbin/cgisirsi/x/北大中心馆/0/5?searchdata1=" + (thisBook.title ? thisBook.title : pageTI) + "&library=ALL&srchfield1=TI%5ETITLE%5E%5ETitle%25";
    if (thisBook.isbn13 || pageISBN) { // 豆瓣著录了 ISBN
      var urlSearchISBN = "http://162.105.138.200/uhtbin/isbn/" + (thisBook.isbn13 ? thisBook.isbn13 : pageISBN);
      // 按 ISBN 查询北大 OPAC
      getDoc(urlSearchISBN, null, function(opacResult, resp, meta) {
        var searchSumHits = $("div.searchsum_hits .content p", opacResult).text(); // 单个命中结果
        if (!searchSumHits.match(/\d+\D+of\D+\d+/)) { // 无论中英文版 OPAC 都是这个格式
          var hitListSearchSummary = $("#hitlist .hit_list .hitstop .searchsummary", opacResult).text(); // 多个命中结果
          if (!/检索到\D+\d+\D+题名/.test(hitListSearchSummary) && !/search found\D+\d+\D+titles/.test(hitListSearchSummary)) {
            $PKULib.append($("<a href='" + urlSearchTI + "' target='_blank' title='尝试检索书名'>（ISBN 查无结果）</a>"));
            $searching.remove(); // 删除等待检索提示（必须在 getDoc callback 函数中执行，否则可能还在等待时就删除了）
            generatePurchaseForm(thisBook); // 尝试生成荐购表单（仅图书页面有），初始隐藏，用户点击一次链接后触发显示
            return;
          }
        }
        $PKULib.wrap($("<a href='" + urlSearchISBN + "' target='_blank' title='馆藏目录检索''></a>")); // 生成按 ISBN 检索的链接
        $searching.remove();
      });
    } else { // 豆瓣没有著录 ISBN
      $PKULib.append($("<a href='" + urlSearchTI + "&sort_by=PBYR" + "' target='_blank' title='尝试检索书名'>（该书无 ISBN）</a>")); // 因为没有 ISBN 所以增加 sort_by 参数，按从旧到新排序搜索结果
      $searching.remove();
      generatePurchaseForm(thisBook); // 尝试生成荐购表单（仅图书页面有）
    }
  });
}


(function() {
  'use strict';
  console.log("豆瓣读书揭示北大馆藏+荐购--自执行函数已运行");
  var hostName = window.location.hostname; // 当前网址的域名
  var pathName = window.location.pathname; // 当前网址的路径
  var searchString = window.location.search; // 当前网址的 GET 参数串
  // 页面顶部创建一个复选框，用于设置是否在列表中检索馆藏——该功能不稳定，访问频繁了可能会受到限制
  $(".global-nav-items ul").append($("<li class='searchOPACinList'><input type='checkbox' id='searchOPACinList' /><label for='searchOPACinList' title='该功能受豆瓣 API 访问频率限制，可能不准确；勾选后，请刷新页面'>批量查馆藏</label></li>"));
  $("#searchOPACinList").attr("checked", GM_getValue("searchOPACinList") ? "checked" : undefined, undefined); // 获取初始值，默认不在列表中检索馆藏
  $("#searchOPACinList").change(function(){
    GM_setValue("searchOPACinList", $("#searchOPACinList").attr("checked") ? true : false); // 设置是否在列表中检索馆藏——注意，设置存储为 true/false
    $("#searchOPACinList").next("label").text("批量查馆藏（刷新后生效）");
  });
  // 以下开始：根据 URL 判断页面类型，分别添加 UI
  // 豆瓣读书的图书页面
  if (hostName == "book.douban.com" && /^\/subject\/\d+\/$/.test(pathName)) {
    if($("#borrowinfo").length <= 0) // 如果借阅信息面板不存在，模仿常例创建之
      $("#buyinfo").after($("<div class='gray_ad' id='borrowinfo'><h2><span>在哪儿借这本书</span>&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;</h2><ul class='bs more-after'></ul></div>"));
    $("#borrowinfo ul.more-after").prepend($("<li style='border: none' id='PKULibLI'></li>"));
    var pageTI = $("h1 span").text();
    var pageISBN = $("#info").text().match(/ISBN: (\d+X?)/, "i")[1];
    addPKULib("#PKULibLI", window.location.pathname.match(/\d+/)[0], false, pageTI, pageISBN); // 添加北大馆藏揭示界面
    addCALIS(pageISBN); // 添加 CALIS 联合目录揭示（仅图书页面有）
  }
  if (!$("#searchOPACinList").attr("checked")) // 如果不批量检索馆藏目录，中断
    return;
  // 豆瓣读书的搜索结果（两种 URL 格式）
  console.log("豆瓣读书揭示北大馆藏+荐购--批量查馆藏选项开启，程序继续");
  if (hostName == "book.douban.com" && (pathName == "/subject_search" || /search\/.+/.test(pathName)))
    if ($(".cart-actions .add2cart").length > 0)
      $(".cart-actions .add2cart").each(function() {
        // 在每个 .cart-actions 之内添加链接，其中 .add2cart[name] 为豆瓣图书 subject ID
        addPKULib($(this).parents(".cart-actions")[0], $(this).attr("name"));
      });
    else { // 豆瓣无搜索结果时，也提供图书馆的全面搜索链接
      if ($("#TryLibSearch").length <= 0) // 支持其他脚本也在此处扩展
        $($("h2")[1]).before($("<h2 id='TryLibSearch'><span>图书馆目录检索</span>&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;</h2>"));
      if (/search\/.+/.test(pathName)) // 格式 1：search/searchstring
        var currentSearch = pathName.match(/search\/(.+)/)[1];
      else // 格式 2：subject_search?search_text=stringstring&cat=1001
        var currentSearch = searchString.match(/\?search_text=(.+?)&cat=/)[1];
      var urlSearchANY = "http://162.105.138.200/uhtbin/cgisirsi/x/北大中心馆/0/5?searchdata1=" + currentSearch + "&library=ALL&srchfield1=GENERAL^SUBJECT^GENERAL^^全面检索";
      $("#TryLibSearch").after($("<p class='pl'>&gt; <a href='" + urlSearchANY + "' rel='nofollow' target='_blank' title='馆藏目录检索'><img class='PKULibLogo' src='http://lib.pku.edu.cn/portal/sites/default/files/favicon.ico' />北京大学图书馆</a></p>"));
    }
  // 豆瓣通用搜索结果
  if (hostName == "www.douban.com" && pathName == "/search")
    $("h3>span:contains('[书籍]')").each(function() {
      // 在每个 .doulist-subject 之内添加链接，其中 a[data-cate='1001'][data-id] 为豆瓣图书 subject ID
      addPKULib($(this).parents("h3")[0], $($(this).siblings("a")[0]).attr("href").match(/subject%2F(\d+?)%2F/)[1], true);
    });
  // 豆瓣读书的丛书页面、图书标签浏览页面
  if (hostName == "book.douban.com" && (/^\/series\/\d+$/.test(pathName) || /^\/tag\/.+$/.test(pathName))) // 路径末尾无 /
    $(".cart-actions .add2cart").each(function() {
      // 在每个 .cart-actions 之内添加链接，其中 .add2cart[name] 为豆瓣图书 subject ID
      addPKULib($(this).parents(".cart-actions")[0], $(this).attr("name"));
    });
  // 豆列页面（空豆列无需任何增强内容）
    if (hostName == "www.douban.com" && /^\/doulist\/\d+\/$/.test(pathName))
    $("a[data-cate='1001']").each(function() {
      // 在每个 .doulist-subject 之内添加链接，其中 a[data-cate='1001'][data-id] 为豆瓣图书 subject ID
      addPKULib($(this).parents(".doulist-add-btn")[0], $(this).attr("data-id"));
    });
  // 作者作品页面
  if (hostName == "book.douban.com" && /^\/author\/\d+\/books$/.test(pathName))
    $(".author-collect").each(function() {
      // 在每个 .author-collect 之内添加链接，其中包含豆瓣图书 subject ID
      addPKULib(this, $($(this).parents("dl")[0]).html().match(/subject\/(\d+?)\//)[1]);
    });
  // 图书版本页面
  if (hostName == "book.douban.com" && /^\/works\/\d+$/.test(pathName))
    $(".bkdesc .pl2").each(function() {
      // 在每个 .bkdesc .about 之内添加链接，其中 .bkdesc .pl2[href] 为豆瓣图书 subject ID
      addPKULib($(this).parents(".bkdesc").children(".about")[0], $(this).attr("href").match(/subject\/(\d+?)\//)[1], true);
    });
  // 广播：首页、翻页、个人状态等均包含
  if (hostName == "www.douban.com" && (searchString === "" || /^\?p=\d/.test(searchString)))
    $(".block-subject .pic a").each(function() {
      // 在每个 .block-subject 之内添加链接，其中 .block-subject .pic a[href] 可能包含豆瓣图书 subject ID
      if (/^https:\/\/book\./.test($(this).attr("href"))) // 判断确实是图书的广博
        addPKULib($(this).parents(".block-subject")[0], $(this).attr("href").match(/subject\/(\d+?)\//)[1], true);
    });
})();