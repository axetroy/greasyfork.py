// ==UserScript==
// @name         FGO Line 表情包 @ NGA
// @version      1.0.4
// @icon         http://bbs.nga.cn/favicon.ico
// @description  FGO Line 表情包
// @author       GM0101@NGA
// @include      /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn)/.+/
// @grant        none
// @require      https://greasyfork.org/scripts/39014-nga-user-script-loader/code/NGA%20User%20Script%20Loader.js
// @namespace
// @namespace https://greasyfork.org/users/224619
// ==/UserScript==


(function() {
  function init($) {
    let a = (commonui.fgoLP = {
      data: [
          "./mon_201811/09/f0Q5-7ehoKrToS7q-7b.png",
          "./mon_201811/09/f0Q5-d1a7KsToS7q-7b.png",
          "./mon_201811/09/f0Q5-iaiqKsToS7q-7b.png",
          "./mon_201811/09/f0Q5-2ccrKoToS7q-79.png",
          "./mon_201811/09/f0Q5-7me4KwToS7q-7b.png",
          "./mon_201811/09/f0Q5-d5grKrToS7q-7b.png",
          "./mon_201811/09/f0Q5-igpoKrToS7l-7b.png",
          "./mon_201811/09/f0Q5-2bnvKvToS7q-7b.png",
          "./mon_201811/09/f0Q5-7n27KsToS7q-7b.png",
          "./mon_201811/09/f0Q5-d18mKmToS7q-7b.png",
          "./mon_201811/09/f0Q5-iex3KqToS7o-7b.png",
          "./mon_201811/09/f0Q5-28heKrToS7u-7b.png",
          "./mon_201811/09/f0Q5-9zjsKoToS7o-7b.png",
          "./mon_201811/09/f0Q5-hp9mKqToS7r-7b.png",
          "./mon_201811/09/f0Q5-4a5zKxToS7r-7b.png",
          "./mon_201811/09/f0Q5-cb4kKwToS7q-7b.png",
          "./mon_201811/09/f0Q5-i78gKvToS7q-7b.png",
          "./mon_201811/09/f0Q5-k1cgKvToS7q-7b.png",
          "./mon_201811/09/f0Q5-jms7KuToS7q-7b.png",
          "./mon_201811/09/f0Q5-jnc8KtToS7t-7b.png",
          "./mon_201811/09/f0Q5-amp3KqToS7q-7b.png",
          "./mon_201811/09/f0Q5-fphcKsToS7o-7b.png",
          "./mon_201811/09/f0Q5-jms2KsToS7u-7b.png",
          "./mon_201811/09/f0Q5-jn1vKnToS7i-7b.png",
          "./mon_201811/09/f0Q5-k1sqKrToS7u-7b.png",
          "./mon_201811/09/f0Q5-jmndKvToS7r-7b.png",
          "./mon_201811/09/f0Q5-jmlkKuToS7q-7b.png",
          "./mon_201811/09/f0Q5-jmnnKtToS7q-7b.png",
          "./mon_201811/09/f0Q5-k1ofKtToS7q-7b.png",
          "./mon_201811/09/f0Q5-jncqKqToS7t-7b.png",
          "./mon_201811/09/f0Q5-k07eKwToS7w-7b.png",
          "./mon_201811/09/f0Q5-joo1KmToS7o-7b.png",
          "./mon_201811/09/f0Q5-jmybKnToS7u-7b.png",
          "./mon_201811/09/f0Q5-jn2hKwToS7q-7b.png",
          "./mon_201811/09/f0Q5-jnevKtToS7x-7b.png",
          "./mon_201811/09/f0Q5-jndrKpToS7l-7b.png",
          "./mon_201811/09/f0Q5-k1x7KlToS7r-7b.png",
          "./mon_201811/09/f0Q5-jnbgKrToS7t-7b.png",
          "./mon_201811/09/f0Q5-jmcbKtToS7q-7b.png",
          "./mon_201811/09/f0Q5-jn2fKpToS7r-7b.png",
          "./mon_201811/09/f0Q5-97acKsToS7r-79.png",
          "./mon_201811/09/f0Q5-e724K3ToS7q-7b.png",
          "./mon_201811/09/f0Q5-j7b7K10ToS7q-7b.png",
          "./mon_201811/09/f0Q5-2susKqToS7k-73.png",
          "./mon_201811/09/f0Q5-7sr2KuToS7i-73.png",
          "./mon_201811/09/f0Q5-csp8KqToS7q-7b.png",
          "./mon_201811/09/f0Q5-hv7vKlToS76-7b.png",
          "./mon_201811/09/f0Q5-1doiKwToS7q-7b.png",
          "./mon_201811/09/f0Q5-6e35KsToS7o-7b.png",
          "./mon_201811/09/f0Q5-blcjKqToS7o-7b.png",
          "./mon_201811/09/f0Q5-glkaKmToS73-7b.png",
          "./mon_201811/09/f0Q5-5riKpToS7i-7b.png",
          "./mon_201811/09/f0Q5-5571KoToS7b-79.png",
          "./mon_201811/09/f0Q5-a6v8KqToS7n-7b.png",
          "./mon_201811/09/f0Q5-f6n8KrToS7r-7b.png",
          "./mon_201811/09/f0Q5-khw3KwToS7o-7b.png",
          "./mon_201811/09/f0Q5-42ooKsToS7l-73.png",
          "./mon_201811/09/f0Q5-937aKsToS7n-7b.png",
          "./mon_201811/09/f0Q5-e49mKpToS7t-73.png",
          "./mon_201811/09/f0Q5-jaufKoToS7r-7b.png",
          "./mon_201811/09/f0Q5-2wgrKpToS7q-7b.png",
          "./mon_201811/09/f0Q5-841rKsToS7q-7b.png",
          "./mon_201811/09/f0Q5-dk1gKnToS7o-7b.png",
          "./mon_201811/09/f0Q5-itbsKpToS7t-7b.png",
          "./mon_201811/09/f0Q5-2jtxKsToS7o-7b.png",
          "./mon_201811/09/f0Q5-7l23KoToS7i-7b.png",
          "./mon_201811/09/f0Q5-cjr3KjToS7n-7b.png",
          "./mon_201811/09/f0Q5-hiveKtToS7e-73.png",
          "./mon_201811/09/f0Q5-1a7yKwToS7q-7b.png",
          "./mon_201811/09/f0Q5-6bdbKuToS7r-7b.png",
          "./mon_201811/09/f0Q5-bbvoKmToS7f-73.png",
          "./mon_201811/09/f0Q5-gaysKlToS7n-7b.png",
          "./mon_201811/09/f0Q5-l9w5KsToS7q-7b.png",
          "./mon_201811/09/f0Q5-4v38KrToS7q-7b.png",
          "./mon_201811/09/f0Q5-9w8fKpToS7i-73.png",
          "./mon_201811/09/f0Q5-ewc9KrToS7n-79.png",
          "./mon_201811/09/f0Q5-jvwbKoToS82-7b.png",
          "./mon_201811/09/f0Q5-3j4dKuToS7r-7b.png",
          "./mon_201811/09/f0Q5-8lp8KsToS7q-7b.png",
          "./mon_201811/09/f0Q5-dmcdKiToS6o-6o.png",
          "./mon_201811/09/f0Q5-k4ehKkToS7l-79.png",
          "./mon_201811/09/f0Q5-ccpxKnToS7t-7b.png",
          "./mon_201811/09/f0Q5-ipgqKlToS72-7b.png",
          "./mon_201811/09/f0Q5-5g3lKqToS78-72.png",
          "./mon_201811/09/f0Q5-85bKrToS7x-73.png",
          "./mon_201811/09/f0Q5-6yr7KvToS7i-73.png",
          "./mon_201811/09/f0Q5-cccuKtToS7h-73.png",
          "./mon_201811/09/f0Q5-hq1gKpToS7r-7b.png",
          "./mon_201811/09/f0Q5-1oqnKoToS7q-73.png",
          "./mon_201811/09/f0Q5-72voKkToS78-7b.png",
          "./mon_201811/09/f0Q5-d0pgKqToS7q-7b.png",
          "./mon_201811/09/f0Q5-it2sKnToS78-7b.png",
          "./mon_201811/09/f0Q5-2nz8KmToS8r-5n.png",
          "./mon_201811/09/f0Q5-84ywKqToS80-7b.png",
          "./mon_201811/09/f0Q5-dvi1KqToS7h-73.png",
          "./mon_201811/09/f0Q5-jcdzKqToS8f-6w.png",
          "./mon_201811/09/f0Q5-3jrnKrToS7h-73.png",
          "./mon_201811/09/f0Q5-8yedKsToS7w-6w.png",
          "./mon_201811/09/f0Q5-gcp3KoToS82-7b.png",
          "./mon_201811/09/f0Q5-4wlyKqToS7h-7b.png",
          "./mon_201811/09/f0Q5-ac8vKpToS7q-73.png",
          "./mon_201811/09/f0Q5-g9kaKsToS6r-7b.png",
          "./mon_201811/09/f0Q5-145uKoToS86-7b.png",
          "./mon_201811/09/f0Q5-6k2zKpToS7c-7b.png",
          "./mon_201811/09/f0Q5-c72hKnToS7n-7b.png",
          "./mon_201811/09/f0Q5-hwlcKrToS8r-6x.png",
          "./mon_201811/09/f0Q5-2zegKnToS6q-7b.png",
          "./mon_201811/09/f0Q5-b4vsKoToS7q-7b.png",
          "./mon_201811/09/f0Q5-kaf5KlToS5x-7b.png",
          "./mon_201811/09/f0Q5-6yfrKmToS6l-7b.png",
          "./mon_201811/09/f0Q5-ejodKpToS79-6w.png",
          "./mon_201811/09/f0Q5-k6rlKrToS7t-73.png",
          "./mon_201811/09/f0Q5-3vgtKmToS6t-7b.png",
          "./mon_201811/09/f0Q5-9jgbKqToS7r-73.png",
          "./mon_201811/09/f0Q5-fh3kKmToS7q-7b.png",
          "./mon_201811/09/f0Q5-17yyKoToS8q-6q.png",
          "./mon_201811/09/f0Q5-69r3KrToS7q-73.png",
          "./mon_201811/09/f0Q5-euniKnToS8r-60.png",
          "./mon_201811/09/f0Q5-jyxeKhToS5l-7b.png",
          "./mon_201811/09/f0Q5-3m26KqToS7u-73.png"

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
        $('[title="插入表情"]:not([fgo-LP])')
          .attr("fgo-LP", 1)
          .bind("click.fgoLPAddBtn", function() {
            setTimeout(function() {
              $(
                '.single_ttip2 div.div3:has(button[name="0"]):not(:has(button[name="fgoLP"]))'
              )
                .append('<button name="fgoLP">FGOm</button><div></div>')
                .find('[name="fgoLP"]')
                .bind("click.fgoLPBtn", a.f);
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