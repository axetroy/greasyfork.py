﻿// ==UserScript==
// @name Kinozal.tv script for Magic Player
// @description Kinozal.tv working script for Ace Magic Player firefox addon: http://dl.torrentstream.org/extensions/magicplayer/firefox/1.1.25/magicplayer.xpi . To replace old kinozal.js script inside addon. Example firefox 23 addons: https://cloud.mail.ru/public/Fp6n/ppwc5EcRh https://yadi.sk/d/rHtLr6rynxQMp
// @version 0.0.1.20160131113430
// @namespace https://greasyfork.org/users/28955
// ==/UserScript==
magicplayer.log("kinozal.js loaded");
magicplayer.runInSandbox(true);
magicplayer.loadPackage("ts-white-screen");

magicplayer.addScript(function() {
        var $ = TorrentStream.jQuery;
        
        function canEmbed() {
            var body = document.body;
            return true;
        }
        
        if(canEmbed()) {
            var d = document;
			$('a[href^="http://dl.kinozal.tv/download.php?id="]', d).each(function(e) {
				var url = $(this).attr('href');
				$tr = $('<tr><td>Воспроизвести онлайн содержимое торрента в оригинальном качестве</td></tr>', d);
				$td = $('<td width="210" nowrap=""></td>', d);
				$a = $('<a href="#" class="watch_online_kinozal"><span class="kinozal"><span id="ts-button-icon16"></span></span></a>', d).click(function(e) {
					e.preventDefault();
					TorrentStream.Utils.showPopupPlayer({
                            dataType: 'torrentUrl',
                            data: url,
							downloadTorrent: true
                    });
				});
				$td.append($a);
				$tr.prepend($td);
				$(this).parent().parent().after($tr);
			});
        }
});
