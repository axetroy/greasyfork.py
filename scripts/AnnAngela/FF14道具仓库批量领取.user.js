// ==UserScript==
// @name         FF14道具仓库批量领取
// @description  最终幻想14道具仓库批量领取
// @namespace    https://greasyfork.org/users/129402
// @match        http://act.ff.sdo.com/20170918Shop/index.html
// @grant        none
// @version      1.1.2
// @license      GNU General Public License v3.0 or later
// @compatible   chrome
// @compatible   firefox
// @compatible   opera
// @compatible   safari
// @run-at       document-end
// ==/UserScript==
(function() {
    var flag = false,
        data = [];
    setInterval(() => {
        $('.lqspan[dataid][datatype][dataname]:not(.batch)').each(function() {
            var self = $(this);
            self.addClass("batch").attr("title", "只有勾选的才会批量领取");
            var input = $("<input/>");
            input.height(25);
            input.attr({
                class: 'lqcheckbox',
                type: "checkbox",
                title: "只有勾选的才会批量领取"
            });
            self.before(input);
        });
        if (flag) {
            flag = false;
            var item = data.shift();
            $.post('http://act.ff.sdo.com/20170918Shop/Server/Warehouse.ashx', { method: 'getItem', id: item.id, type: +item.type }, (_) => {
                var d = JSON.parse(_);
                if (d.Success) {
                    console.info(item.name, item.id, "领取成功~");
                    item.self.find('.prize').text("领取成功~");
                } else data.push(item);
                if (data.length > 0) flag = true;
                else setTimeout(() => alert("全部领取完成~"), 10);
            });
        }
    }, 100);
    var button = $("<a/>");
    button.addClass("back-btn").css({
        cursor: "pointer",
        "margin-right": "15px",
        background: "rgb(82, 150, 235)",
        "border-radius": "5px"
    }).attr("title", "只有勾选的才会批量领取");
    button.text("批量领取道具");
    var allButton = $("<a/>");
    allButton.css({
        cursor: "pointer",
        "margin-right": "15px",
        background: "rgb(114, 179, 66)",
        "border-radius": "5px"
    }).attr("title", "只有勾选的才会批量领取");
    allButton.text("全选");
    var noneButton = $("<a/>");
    noneButton.css({
        cursor: "pointer",
        "margin-right": "15px",
        background: "rgb(144, 144, 144)",
        "border-radius": "5px"
    });
    noneButton.text("全不选").attr("title", "只有勾选的才会批量领取");
    $(".rtbox").append(button).append(allButton).append(noneButton);
    button.on("click", function() {
        $('.lqcheckbox').each(function() {
            $(this).add($(this).next())[this.checked ? 'addClass' : 'removeClass']('checked');
        });
        var target = $('.lqspan.checked[dataid][datatype][dataname]');
        if (target.length) {
            target.each(function() {
                data.push({
                    id: $(this).attr("dataid"),
                    type: $(this).attr("datatype"),
                    name: $(this).attr("dataname"),
                    self: $(this).closest("li"),
                });
            });
            alert("开始批量领取，请注意由于系统限制，领取速度可能稍慢~");
            flag = true;
        } else alert("无物品可领取，请检查是否没有勾选物品~");
    });
    allButton.on('click', function() {
        $('.lqcheckbox').attr('checked', 'checked');
    });
    noneButton.on('click', function() {
        $('.lqcheckbox').removeAttr('checked');
    });
})();