// ==UserScript==
// @name         SteamTrades.com, Compare to Barter
// @namespace    http://tampermonkey.net/
// @version      0.31
// @description  Compare to list of Barter.vg
// @author       You
// @match        https://www.steamtrades.com/trade/*
// @grant        GM.xmlHttpRequest
// @runat        document-end
// @nowrap
// ==/UserScript==

(function() {
    'use strict';
    var STORAGE_KEY = "compareUser";
    var STORAGE_KEY_WISHLIST = "wishlist";
    var STORAGE_KEY_TRADABLE = "tradable";
    var $ = jQuery;

    function getTextNodesIn(el) {
        return $(el).find(":not(iframe)").addBack().contents().filter(function() {
            return this.nodeType == 3;
        });
    };

    $(function () {
        $((function () {/*
    <div id="compare-wrapper">
    <input type="text" id="compare-user" />
    <div id="compare-barter" class="btn_action green">Compare</div><br>
    <a id="breakline-comma" href="javascript:void()">breakline by comma</a> |
    <a id="remove-list-cache" href="javascript:void()">remove cache</a>
    </div>
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1]).appendTo($(".comments").first());

        $("<style />").text((function () {/*
    .comments {
        position: relative;
    }
    .pagination {
        z-index: 20;
        position: relative;
    }
    #compare-wrapper {
        position: absolute;
        right: 0;
        top: 3px;
        text-align: right;
    }
    #compare-user { width: 100px }
    #compare-barter { display: inline-block; width: 100px; text-align: left; }
    #matched-index {
        position: absolute;
        margin-top: 60px;
        top: 0;
        right: 0;
        border: solid 1px #acacac;
        background: #fcfcfc;
        padding: 5px 8px;
        margin-left: 800px;
        overflow-y: auto;
        opacity: 0.5;
        transition: opacity 0.1s ease;
        z-index: 10;
    }
    #matched-index.hidden { display: none; }
    #matched-index.no-active { opacity: 0.1; }
    #matched-index:hover { opacity: 1; }
    #matched-index .have-index { border-left: 3px solid #e1868c; }
    #matched-index .want-index { border-left: 3px solid #6bbfdb; }
    #matched-index span { display: block; cursor: pointer; padding: 2px 8px; }
    #matched-index span.highest { color: #ff0000; }
    #matched-index span.high { color: #ffa500; }
    #matched-index span.mid { color: limegreen; }
    #matched-index span.low { color: #4682b4; }
    #matched-index span.lowest { color: #808080; }
    #matched-index span:hover { background: #fcfcac; }
    #matched-index span:after {
        display: inline-block;
        margin-left: 8px;
        font-size: 90%;
    }
    #matched-index span.highest:after { content: "⇧"; }
    #matched-index span.high:after { content: "△"; }
    #matched-index span.mid:after { content: "□"; }
    #matched-index span.low:after { content: "▽";  }
    #matched-index span.lowest:after { content: "⇩"; }
    #matched-index:after { display: block; position: absolute; left: 1px; top: -2px; content: "x"; }
    .matched { background: #ffff0080; text-weight: bold; margin-left: 3px; }
    .matched.highest { background: #ff000080; }
    .matched.high { background: #ffa50080; }
    .matched.low { background: #4682b480; }
    .matched.lowest { background: #80808080; }
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1]).appendTo("head")

        var storage = localStorage[STORAGE_KEY];
        if (storage) {
            storage = JSON.parse(storage);
            $("#compare-user").val(storage.user);
            if (storage.user) {
                compare();
            }
        }

        var fitTimer = 0;
        $(window).scroll(function (ev) {

            var $index = $("#matched-index");
            // console.log($("#matched-index").offset().top, $(window).scrollTop());
            $index.stop().animate({
                top: Math.max($(window).scrollTop(), $index.parent().offset().top) - $index.parent().offset().top + "px",
            }, "fast");

            var $offer = $(".comments").first();
            $index.css({ maxHeight: $(window).height() * 0.8 + "px" });
            if ($(window).scrollTop() > $offer.offset().top + $offer.height()) {
                $index.addClass("no-active");
            } else {
                $index.removeClass("no-active");
            }
        });

        $("#remove-list-cache").click(function () {
            console.log("clear cache");
           delete localStorage[STORAGE_KEY_WISHLIST];
           delete localStorage[STORAGE_KEY_TRADABLE];
        });

        $("#breakline-comma").click(function () {
            $().add(getTextNodesIn($(".have,.want").find("li"))).add(getTextNodesIn($(".have,.want").find("p")))
                .each(function () {
                var games = $(this).text().split(",");
                if (games.length > 1) {
                    $(this).after($("<span>" + games.join("</span><br /><span>") + "</span>"));
                    $(this).remove();
                }
                compare();
            });
        });

        function compare() {
            var user = $("#compare-user").val().replace(/[\/\#\?\.\:]/g, "");

            localStorage[STORAGE_KEY] = JSON.stringify({
                user: user,
            });

            $(".matched, #matched-index").remove();

            var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
            var $index = $("<div/>").attr({
                id: "matched-index"
            })
            .click(function (ev) {
                if (ev.target.id == "matched-index") {
                    $index.remove();
                }
            })
            .on(mousewheelevent, function (ev) {
                // console.log($(this).scrollTop(), $(this).find(":last").offset().top, $(this).outerHeight());

                var delta = ev.originalEvent.deltaY ? -(ev.originalEvent.deltaY) : ev.originalEvent.wheelDelta ? ev.originalEvent.wheelDelta : -(ev.originalEvent.detail);
                if (($(this).scrollTop() == 0 && delta > 0)) {
                    ev.stopPropagation();
                    ev.preventDefault();
                }
            })
            .append($('<div id="matched-index-close" />').click(() => $index.remove()))
            .appendTo($(".comments").first());


            var ignoreGames = ["gems", "sackofgems", "tradingcards"];
            $(".have, .want").each(function () {
                var isHave = $(this).hasClass("have");
                var url = isHave ? "https://barter.vg/u/{u}/w/" : "https://barter.vg/u/{u}/t/";
                url = url.replace("{u}", user);

                var $words = $().add(getTextNodesIn($(this).find("td,li"))).add(getTextNodesIn($(this).find("p")));
                console.log("words", $words);

                function matching(list) {
                    $words.each(function () {
                        var word = $(this).text().toLowerCase()
                        .replace(/\([^\)]+\)/g, "")
                        .trim()
                        .replace(/\d+( )?(gem|key|card)(s)?$/, "")
                        .replace(/(steam|hb|ig|indiegala|humble( bundle)?)?( )?(key|gift|gem)?(s)?( link)?( )?$/, "")
                        .replace(/[^a-z0-9\+]/gm, "");

                        for(var id in list) {
                            var game = list[id];
                            // Ignore steam items are trade often
                            if (ignoreGames.indexOf(game.search) != -1) { continue; }
                            if (word.indexOf(game.search) == -1) { continue; }
                            console.log("match", word, game.search);


                            var $arrow = $("<a>↗</a>").attr({
                                href: "https://barter.vg/i/" + id,
                                title: game.title,
                                target: "_blank"
                            })
                            .addClass("matched")
                            .addClass(game.tier);

                            var alert = null;
                            if (game.search.length / word.length < 0.5) {
                                $arrow
                                    .text($arrow.text() + "?")
                                    .attr("title", $arrow.attr("title") + " (Not match Title?)");
                                alert = "Not match Title?";
                            } else if (game.search[game.search.length - 1]  != word[word.length - 1]
                                       && word[word.length - 1].match(/\d/)) {
                                $arrow
                                    .text($arrow.text() + "?")
                                    .attr("title", $arrow.attr("title") + " (Different Edition?)");
                                alert = "Different Edition?";
                            }

                            if ($(this).is("li,td")) {
                                $(this).append($arrow);
                            } else {
                                $(this).after($arrow);
                            }

                            var $i = $("<span />")
                                .addClass(isHave ? "have-index" : "want-index")
                                .addClass(game.tier)
                                .text(game.title + (alert ? " ?" : ""))
                                .attr({ title: alert || "" })
                            .click(function () {
                                var $target = this.jumpElement;
                                $('html,body').animate({ scrollTop: $target.offset().top - 40 });
                            })
                                .appendTo($index);
                            $i[0].jumpElement = $arrow;
                        }
                    });

                }

                var KEY = isHave ? STORAGE_KEY_WISHLIST : STORAGE_KEY_TRADABLE;
                if (localStorage[KEY]) {
                    console.log("use cache");
                    matching(JSON.parse(localStorage[KEY]));
                } else {
                    GM.xmlHttpRequest({
                        url: url,
                        onload: function (xhr) {
                            var $res = $(xhr.responseText);
                            var list = {};
                            $res.find(".collection td a[href*='/i/']").each(function () {
                                var id = $(this).attr("href").match(/\d+/)[0];
                                var title = $(this).text();
                                // If less than 3 charactors, match with case sensitive
                                if (title.length > 3) {
                                    list[id] = {
                                        title: title,
                                        search: title.toLowerCase().replace(/[^a-z0-9\+]/gm, ""),
                                    };
                                } else {
                                    list[id] = {
                                         title: title,
                                         title: title.replace(/[^a-z0-9\+]/gm, "")
                                    };
                                }

                                var $tier = $(this).parents("td").find(".tag[title*='tier']");
                                if ($tier.length == 1) {
                                    list[id].tier = $tier.attr("title").replace(" tier", "");
                                }
                            });
                            localStorage[KEY] = JSON.stringify(list);
                            matching(list);
                        }
                    });
                }
            });
        }

        $("#compare-barter").click(compare);
    });

    // Your code here...
})();