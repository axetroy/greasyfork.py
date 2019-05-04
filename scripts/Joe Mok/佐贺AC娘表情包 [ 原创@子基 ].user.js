// ==UserScript==
// @name         佐贺AC娘表情包 [ 原创@子基 ]
// @version      1.0
// @icon         http://bbs.nga.cn/favicon.ico
// @description  佐贺AC娘表情包 [ 原创@子基 ](NGA用)
// @author       原创@子基
// @include      /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn)/.+/
// @grant        none
// @require      https://greasyfork.org/scripts/39014-nga-user-script-loader/code/NGA%20User%20Script%20Loader.js
// @namespace
// @namespace https://greasyfork.org/users/224619
// ==/UserScript==


(function() {
  function init($) {
    let a = (commonui.佐贺NGA = {
      data: [
          "./mon_201901/26/-9lddQ5-l3otZmT3cSdw-dw.gif",
          "./mon_201901/26/-9lddQ5-aaeiK1pT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-28utK1jT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-fcv4K1eT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-czamZnT3cSdw-dw.gif",
          "./mon_201901/26/-9lddQ5-2mofZ1gT3cSdw-dw.gif",
          "./mon_201901/26/-9lddQ5-53wlK1dT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-8ikfK1nT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-kqwlK1gT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-5fosK1eT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-iz0lK1jT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-hc21K18T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-1fc5K1qT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-f0wgK1dT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-2gvhK10T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-cx3bKqT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-hhltK1kT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-j025K1nT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-gyrsK1qT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-fg2zK1eT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-kwecK1xT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-et8sK19T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-1adaK1eT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-2hobK15T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-flugK1dT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-ktnsK1kT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-ito3K1iT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-iu4uK1wT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-fc0zK10T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-lcglK18T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-fkf7KuT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-f2m8K10T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-j19jK1jT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-ey7mK11T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-gxf9K1iT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-evyrK14T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-l845K16T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-j7rlK1nT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-h3qjK13T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-ks3uK1nT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-f2kuKuT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-gzadK1aT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-9s0tK1sT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-iqibK13T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-b7qiKqT1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-f0xpK13T1kSgo-go.gif.medium.jpg",
          "./mon_201901/26/-9lddQ5-3rvsKzT1kSgo-go.gif.medium.jpg"


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
        $('[title="插入表情"]:not([佐贺-NGA])')
          .attr("佐贺-NGA", 1)
          .bind("click.佐贺NGAAddBtn", function() {
            setTimeout(function() {
              $(
                '.single_ttip2 div.div3:has(button[name="0"]):not(:has(button[name="佐贺NGA"]))'
              )
                .append('<button name="佐贺NGA">佐贺(NGA)</button><div></div>')
                .find('[name="佐贺NGA"]')
                .bind("click.佐贺NGABtn", a.f);
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