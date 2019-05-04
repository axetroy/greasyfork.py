// ==UserScript==
// @name         NGA 蛆音娘表情包
// @version      1.0.0
// @icon         http://bbs.nga.cn/favicon.ico
// @description  将 aiyom 扒出来的蛆音娘表情加入到表情列表中
// @author       
// @include      /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn)/.+/
// @grant        none
// @require      https://greasyfork.org/scripts/39014-nga-user-script-loader/code/NGA%20User%20Script%20Loader.js
// @namespace https://greasyfork.org/users/219179
// ==/UserScript==

// 图源： http://nga.178.com/read.php?tid=14279841

(function() {
  function init($) {
    let a = (commonui.biliJYN = {
      data: [
        "./mon_201806/12/-9lddQ5-953rKcT8S33-30.png",
        "./mon_201806/12/-9lddQ5-elclKiT8S2u-31.png",
        "./mon_201806/12/-9lddQ5-jzzsKhT8S33-2x.png",
        "./mon_201806/12/-9lddQ5-9n2bKgT8S33-31.png",
        "./mon_201806/12/-9lddQ5-4885KmT8S33-33.png",
        "./mon_201806/12/-9lddQ5-f0a4KhT8S2x-31.png",
        "./mon_201806/12/-9lddQ5-kjufKeT8S2t-31.png",
        "./mon_201806/12/-9lddQ5-4hbnKgT8S36-31.png",
        "./mon_201806/12/-9lddQ5-kqy0KdT8S33-33.png",
        "./mon_201806/12/-9lddQ5-fbjxKkT8S32-31.png",
        "./mon_201806/12/-9lddQ5-9vjjKfT8S30-2x.png",
        "./mon_201806/12/-9lddQ5-a5l3KgT8S32-2u.png",
        "./mon_201806/12/-9lddQ5-7jazKaT8S2t-2n.png",
        "./mon_201806/12/-9lddQ5-fl4fKhT8S2u-31.png",
        "./mon_201806/12/-9lddQ5-kxqzKiT8S33-2y.png",
        "./mon_201806/12/-9lddQ5-4s2jKiT8S33-2s.png",
        "./mon_201806/12/-9lddQ5-3m0fKiT8S33-31.png",
        "./mon_201806/12/-9lddQ5-jl4yKjT8S30-30.png",
        "./mon_201806/12/-9lddQ5-e3i4KiT8S38-31.png",
        "./mon_201806/12/-9lddQ5-8mwxKiT8S33-33.png"
      ],
      f: function(e) {
        let n = $(e.target).next();
        if (n.children()[0]) return;
        $.each(a.data, function(i, v) {
          n.append(
            '<img height="60px" src="http://img.ngacn.cc/attachments/' +
              v +
              '" onclick="postfunc.addText(\'[img]' +
              v +
              "[/img]');postfunc.dialog.w._.hide()\" />"
          );
        });
      },
      r: function() {
        $('[title="插入表情"]:not([bili-JYN])')
          .attr("bili-JYN", 1)
          .bind("click.biliJYNAddBtn", function() {
            setTimeout(function() {
              $(
                '.single_ttip2 div.div3:has(button[name="0"]):not(:has(button[name="biliJYN"]))'
              )
                .append('<button name="biliJYN">蛆音娘</button><div></div>')
                .find('[name="biliJYN"]')
                .bind("click.biliJYNBtn", a.f);
            }, 100);
          });
      },
      mo: new MutationObserver(function() {
        a.r();
      })
    });

    a.r();

    a.mo.observe($("body")[0], {
      childList: true,
      subtree: true
    });
  }

  (function check() {
    try {
      init(commonui.userScriptLoader.$);
    } catch (e) {
      setTimeout(check, 50);
    }
  })();
})();
