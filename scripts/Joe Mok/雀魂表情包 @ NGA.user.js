// ==UserScript==
// @name         雀魂表情包 @ NGA
// @version      1.0.2
// @icon         http://bbs.nga.cn/favicon.ico
// @description  雀魂表情包(NGA)
// @author       GM0101@NGA
// @include      /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn)/.+/
// @grant        none
// @require      https://greasyfork.org/scripts/39014-nga-user-script-loader/code/NGA%20User%20Script%20Loader.js
// @namespace
// @namespace https://greasyfork.org/users/224619
// ==/UserScript==


(function() {
  function init($) {
    let a = (commonui.雀魂NGA = {
      data: [
          "./mon_201902/03/-4kkseQ5-4czrKoToS4q-4q.jpg
          "./mon_201902/03/-4kkseQ5-9j5mK9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-ed8uK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-j5v7K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-2m51KaT8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-7gvqK9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-cdzwK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-h7m3K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-n3rK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-5gmyK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-aaejK9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-f5evK9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-jxzkK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-atrwZxT1kS4q-4q.jpg
          "./mon_201902/03/-4kkseQ5-fvlfK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-krxmK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-4du0K7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-98z0K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-e1umK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-ivbsK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-28omK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-7ie2K9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-chn4K9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-hb4vK8T8S3b-3b.png",
          "./mon_201902/03/-4kkseQ5-oqeK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-5ia8K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-bcnrKmToS4q-4q.jpg
          "./mon_201902/03/-4kkseQ5-gjalK9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-lf97K9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-4sivK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6locK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6d61K9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6cl9K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6wv8K9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6c44K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-77ibKxToS4q-4q.jpg
          "./mon_201902/03/-4kkseQ5-6bzmK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6l2cK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6ey8K7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-72pyK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6bngK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6d7uK9T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6clfK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6jpkK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-biqlK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-gbzoK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-57m7K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-aiv2K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-l0s8ZyT1kS4q-4q.jpg
          "./mon_201902/03/-4kkseQ5-4mb9K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-9gnkK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-e8p6K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-kxssK6T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-859bK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-cxnjK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-hstrK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-178dK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-618uK6T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-co1dK1uT1kS4q-4q.jpg
          "./mon_201902/03/-4kkseQ5-i0xxK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-1e69K8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6a3kK6T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-b546K7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-fyv2K8T8S3c-3b.png",
          "./mon_201902/03/-4kkseQ5-kt8qK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-46tyK8T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-90yqK7T8S3c-3c.png",
          "./mon_201902/03/-4kkseQ5-6sq1K7T8S3c-3c.png"


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
        $('[title="插入表情"]:not([雀魂-NGA])')
          .attr("雀魂-NGA", 1)
          .bind("click.雀魂NGAAddBtn", function() {
            setTimeout(function() {
              $(
                '.single_ttip2 div.div3:has(button[name="0"]):not(:has(button[name="雀魂NGA"]))'
              )
                .append('<button name="雀魂NGA">雀魂(NGA)</button><div></div>')
                .find('[name="雀魂NGA"]')
                .bind("click.雀魂NGABtn", a.f);
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