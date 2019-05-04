// ==UserScript==
// @name         FGO 表情包 @ NGA
// @version      1.0.2
// @icon         http://bbs.nga.cn/favicon.ico
// @description  FGO表情包(NGA)
// @author       GM0101@NGA
// @include      /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn)/.+/
// @grant        none
// @require      https://greasyfork.org/scripts/39014-nga-user-script-loader/code/NGA%20User%20Script%20Loader.js
// @namespace
// @namespace https://greasyfork.org/users/224619
// ==/UserScript==


(function() {
  function init($) {
    let a = (commonui.fgoNGA = {
      data: [
            "./mon_201811/09/frQ5-lb8uK1bToS8c-8c.jpg",
            "./mon_201811/09/frQ5-6m11K1zT1kS8c-8c.jpg",
            "./mon_201811/09/frQ5-cgclK17ToS8c-8c.jpg",
            "./mon_201811/09/frQ5-hqwwKzToS8c-8c.jpg",
            "./mon_201811/09/frQ5-2n5yK1fToS8c-8c.jpg",
            "./mon_201811/09/frQ5-90bmK17ToS8c-8c.jpg",
            "./mon_201811/09/frQ5-emsvK10ToS8c-8c.jpg",
            "./mon_201811/09/frQ5-kp25K1kT1kS8c-8c.jpg",
            "./mon_201811/09/frQ5-5dssK1kToS8c-8c.jpg",
            "./mon_201811/09/frQ5-di5gK13ToS8c-8c.jpg",
            "./mon_201811/09/frQ5-10rrK1bToS8c-8c.jpg",
            "./mon_201811/09/frQ5-9j8cK12ToS8c-8c.jpg",
            "./mon_201811/09/frQ5-ghxlK1bToS8c-8c.jpg",
            "./mon_201811/09/frQ5-o0cK14ToS8c-8c.jpg",
            "./mon_201811/09/frQ5-67kiK16ToS8c-8c.jpg",
            "./mon_201811/09/frQ5-cbuiK1kT1kS8c-8c.jpg",
            "./mon_201811/09/frQ5-hy1pKpToS8c-8c.jpg",
            "./mon_201811/09/frQ5-31g2K1aToS8c-8c.jpg",
            "./mon_201901/02/-7Q5-l5eoK1fToS2s-2o.gif"

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
        $('[title="插入表情"]:not([fgo-NGA])')
          .attr("fgo-NGA", 1)
          .bind("click.fgoNGAAddBtn", function() {
            setTimeout(function() {
              $(
                '.single_ttip2 div.div3:has(button[name="0"]):not(:has(button[name="fgoNGA"]))'
              )
                .append('<button name="fgoNGA">FGO表情包(NGA)</button><div></div>')
                .find('[name="fgoNGA"]')
                .bind("click.fgoNGABtn", a.f);
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