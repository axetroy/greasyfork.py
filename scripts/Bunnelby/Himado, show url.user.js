// ==UserScript==
// @name        Himado, show url
// @description ひまわり動画のソースURLを表示
// @namespace   org.userscript.bunnelby
// @match       http://himado.in/*
// @match       https://web.archive.org/web/*/http://himado.in/*
// @version     1.3
// @runat       document-end
// @nowrap
// ==/UserScript==
(function () {
	var $ = jQuery;
	// var log = console.log;
	var log = function () {};
    var isArchiveOrg = (location.host == "web.archive.org");
    var isNosub = location.host == "www.nosub.tv";

    function InHimado() {
		var sources = ary_spare_sources.spare;
		if (!sources) { return; }

		var $links = $("a[href*='javascript:showMovieUrl()']").parent();
		$links.text("");

		var $options = $("#select_othersource option");
		log($options);

		function appendSrc (url, label, target) {
			console.log(url);
            if (isArchiveOrg) {
                url = url.replace(new RegExp("https://web\\.archive\\.org/web/\\d+/", "gm"), "");
            }
			$(target)
			.append(
				$('<a />')
				.attr({
					href: url,
					download: "video.mp4"
				})
				.append(label + "<br />" + url)
			)
			.append("<br />");
		}

		// ソースが一つの場合、SELECT要素がない
		if ($options.length == 0) {
			var url = decodeURIComponent(movie_url || display_movie_url);
			var label = "★ ";
			appendSrc(url, label, $links);
			return;
		}

		$options.each(function (i) {
			var source = sources.find(function (element, index, array) {
				return i == element.lid;
			});

			// ソースがデフォルトの場合、OPTIONが選択されてない、スペアソースにもない
			if ($(this).is("[selected]") || !source) {
				var url = decodeURIComponent(movie_url || display_movie_url);
				var label = "★" + this.label;
				appendSrc(url, label, $links);
			} else {
				var url = decodeURIComponent(source.src);
				var label = this.label;
				appendSrc(url, label, $links);
			}
		});
    }

    function InNosub() {
        $ = jQuery;
        function makeLink(title, value, file) {
            console.log(title, value, file);
            return $("<p />")
                .append(p.title)
                .append($("<a />").text(value).attr({ href: value, download: "video.mp4" }))
                .append(" ")
                .append($("<a />").text("nosub").attr({ href: file, download: "video.mp4" }));
        }

        if (!window.PLAYER) return;
        var $container = $("<div />").insertAfter(".entry-content");
        for (var i = 0; i < PLAYER.length; i++ ) {
            var p = PLAYER[i];
            $container.append(makeLink(p.title, p.value, p.links.file));
        }
    }

	jQuery(function () {
		log("ready");
        if (isNosub) {
            InNosub();
        } else {
            InHimado();
        }
	});
})();