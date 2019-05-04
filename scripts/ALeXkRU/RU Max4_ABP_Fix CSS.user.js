// ==UserScript==
// @name          RU Max4_ABP_Fix CSS
// @namespace     https://greasyfork.org
// @description	  Дополнение, исправляющее работу Adblock Plus для отдельных сайтов. Возвращаем функционал  Ad-Охотника в Maxthon4 и Maxthon5. Спасибо lainverse за идею.
// @author        lainverse & ALeXkRU
// @license       CC BY-SA
// @homepage      https://greasyfork.org/ru/scripts/8225-ru-max4-abp-fix-css
// @run-at        document-start
// @include       *://*/*
// @match         *://*/*
// @version       1.20190428232036
// @grant         unsafeWindow
// @grant         window.close
// @grant         GM_addStyle
// ==/UserScript==
/* jshint -W084, esnext: true */
(function(){
 (function(){var css = "";
 // !! 	 console.log("es");
if (false || (document.domain == "ru-board.com" || document.domain.substring(document.domain.indexOf(".ru-board.com") + 1) == "ru-board.com") || (document.domain == "latestnewsofusa.org" || document.domain.substring(document.domain.indexOf(".latestnewsofusa.org") + 1) == "latestnewsofusa.org"))
	css += [
		"span.dats{position: relative !important; top: 10px !important;}",
		" div[id*=\"banner\"], body>center{display: none !important;}",
	// !!    скрываем рекламные ссылки (СПАМ) в сообщениях
		" a[href^=\"http://forum.ru-board.com/\"][href$=\"/\"][target=\"_blank\"]{color: #333 !important; text-decoration: none !important; pointer-events: none !important;}",
		" a[href^=\"https://forum.ru-board.com/\"][href$=\"/\"][target=\"_blank\"]{color: #333 !important; text-decoration: none !important; pointer-events: none !important;}"
	// !! =======   ПРАВКА  СТРУКТУРЫ.  вынесено в отдельный скрипт. См. Ru-Board_Extrim_Max4_ABP_Fix-CSS =======
	].join("\n");
if (false || (document.domain == "forum.ru-board.com" || document.domain.substring(document.domain.indexOf(".forum.ru-board.com") + 1) == "forum.ru-board.com"))
	css += [
		".tpc > .post > a[href] {word-break: break-all !important;}"
	].join("\n");
if (false || (document.domain == "101.ru" || document.domain.substring(document.domain.indexOf(".101.ru") + 1) == "101.ru"))
	css += [
		"#layout {background: none !important;}"
	].join("\n");
if (false || (document.domain == "1plus1.ua" || document.domain.substring(document.domain.indexOf(".1plus1.ua") + 1) == "1plus1.ua") || (document.domain == "24video.guru" || document.domain.substring(document.domain.indexOf(".24video.guru") + 1) == "24video.guru") || (document.domain == "24video.sexy" || document.domain.substring(document.domain.indexOf(".24video.sexy") + 1) == "24video.sexy") || (document.domain == "4watching.club" || document.domain.substring(document.domain.indexOf(".4watching.club") + 1) == "4watching.club") || (document.domain == "aghdrezka.com" || document.domain.substring(document.domain.indexOf(".aghdrezka.com") + 1) == "aghdrezka.com") || (document.domain == "ahdrezka.com" || document.domain.substring(document.domain.indexOf(".ahdrezka.com") + 1) == "ahdrezka.com") || (document.domain == "all-episodes.tv" || document.domain.substring(document.domain.indexOf(".all-episodes.tv") + 1) == "all-episodes.tv") || (document.domain == "allfilmonline.co" || document.domain.substring(document.domain.indexOf(".allfilmonline.co") + 1) == "allfilmonline.co") || (document.domain == "amovies.cc" || document.domain.substring(document.domain.indexOf(".amovies.cc") + 1) == "amovies.cc") || (document.domain == "baskino.me" || document.domain.substring(document.domain.indexOf(".baskino.me") + 1) == "baskino.me") || (document.domain == "baskinonet.ru" || document.domain.substring(document.domain.indexOf(".baskinonet.ru") + 1) == "baskinonet.ru") || (document.domain == "besthdrezka.com" || document.domain.substring(document.domain.indexOf(".besthdrezka.com") + 1) == "besthdrezka.com") || (document.domain == "bigcinema-tv.club" || document.domain.substring(document.domain.indexOf(".bigcinema-tv.club") + 1) == "bigcinema-tv.club") || (document.domain == "bombardir.ru" || document.domain.substring(document.domain.indexOf(".bombardir.ru") + 1) == "bombardir.ru") || (document.domain == "comedy-portal.net" || document.domain.substring(document.domain.indexOf(".comedy-portal.net") + 1) == "comedy-portal.net") || (document.domain == "dnepr.info" || document.domain.substring(document.domain.indexOf(".dnepr.info") + 1) == "dnepr.info") || (document.domain == "dugtor.org" || document.domain.substring(document.domain.indexOf(".dugtor.org") + 1) == "dugtor.org") || (document.domain == "dugtor.ru" || document.domain.substring(document.domain.indexOf(".dugtor.ru") + 1) == "dugtor.ru") || (document.domain == "fast-torrent.club" || document.domain.substring(document.domain.indexOf(".fast-torrent.club") + 1) == "fast-torrent.club") || (document.domain == "fast-torrent.ru" || document.domain.substring(document.domain.indexOf(".fast-torrent.ru") + 1) == "fast-torrent.ru") || (document.domain == "fast-torrent.su" || document.domain.substring(document.domain.indexOf(".fast-torrent.su") + 1) == "fast-torrent.su") || (document.domain == "film-max.ru" || document.domain.substring(document.domain.indexOf(".film-max.ru") + 1) == "film-max.ru") || (document.domain == "film-ua.com" || document.domain.substring(document.domain.indexOf(".film-ua.com") + 1) == "film-ua.com") || (document.domain == "filmopotok.ru" || document.domain.substring(document.domain.indexOf(".filmopotok.ru") + 1) == "filmopotok.ru") || (document.domain == "filmpotok.ru" || document.domain.substring(document.domain.indexOf(".filmpotok.ru") + 1) == "filmpotok.ru") || (document.domain == "gameguru.ru" || document.domain.substring(document.domain.indexOf(".gameguru.ru") + 1) == "gameguru.ru") || (document.domain == "gethdrezka.com" || document.domain.substring(document.domain.indexOf(".gethdrezka.com") + 1) == "gethdrezka.com") || (document.domain == "gidonline.in" || document.domain.substring(document.domain.indexOf(".gidonline.in") + 1) == "gidonline.in") || (document.domain == "hd720.biz" || document.domain.substring(document.domain.indexOf(".hd720.biz") + 1) == "hd720.biz") || (document.domain == "hdkinozor.ru" || document.domain.substring(document.domain.indexOf(".hdkinozor.ru") + 1) == "hdkinozor.ru") || (document.domain == "hdrezka-ag.com" || document.domain.substring(document.domain.indexOf(".hdrezka-ag.com") + 1) == "hdrezka-ag.com") || (document.domain == "hdrezka-online.me" || document.domain.substring(document.domain.indexOf(".hdrezka-online.me") + 1) == "hdrezka-online.me") || (document.domain == "hdrezka.ag" || document.domain.substring(document.domain.indexOf(".hdrezka.ag") + 1) == "hdrezka.ag") || (document.domain == "hdrezka.asia" || document.domain.substring(document.domain.indexOf(".hdrezka.asia") + 1) == "hdrezka.asia") || (document.domain == "hdrezka.buzz" || document.domain.substring(document.domain.indexOf(".hdrezka.buzz") + 1) == "hdrezka.buzz") || (document.domain == "hdrezka.city" || document.domain.substring(document.domain.indexOf(".hdrezka.city") + 1) == "hdrezka.city") || (document.domain == "hdrezka.club" || document.domain.substring(document.domain.indexOf(".hdrezka.club") + 1) == "hdrezka.club") || (document.domain == "hdrezka.co" || document.domain.substring(document.domain.indexOf(".hdrezka.co") + 1) == "hdrezka.co") || (document.domain == "hdrezka.fail" || document.domain.substring(document.domain.indexOf(".hdrezka.fail") + 1) == "hdrezka.fail") || (document.domain == "hdrezka.gift" || document.domain.substring(document.domain.indexOf(".hdrezka.gift") + 1) == "hdrezka.gift") || (document.domain == "hdrezka.ink" || document.domain.substring(document.domain.indexOf(".hdrezka.ink") + 1) == "hdrezka.ink") || (document.domain == "hdrezka.link" || document.domain.substring(document.domain.indexOf(".hdrezka.link") + 1) == "hdrezka.link") || (document.domain == "hdrezka.live" || document.domain.substring(document.domain.indexOf(".hdrezka.live") + 1) == "hdrezka.live") || (document.domain == "hdrezka.loan" || document.domain.substring(document.domain.indexOf(".hdrezka.loan") + 1) == "hdrezka.loan") || (document.domain == "hdrezka.lol" || document.domain.substring(document.domain.indexOf(".hdrezka.lol") + 1) == "hdrezka.lol") || (document.domain == "hdrezka.mba" || document.domain.substring(document.domain.indexOf(".hdrezka.mba") + 1) == "hdrezka.mba") || (document.domain == "hdrezka.name" || document.domain.substring(document.domain.indexOf(".hdrezka.name") + 1) == "hdrezka.name") || (document.domain == "hdrezka.ooo" || document.domain.substring(document.domain.indexOf(".hdrezka.ooo") + 1) == "hdrezka.ooo") || (document.domain == "hdrezka.rest" || document.domain.substring(document.domain.indexOf(".hdrezka.rest") + 1) == "hdrezka.rest") || (document.domain == "hdrezka.run" || document.domain.substring(document.domain.indexOf(".hdrezka.run") + 1) == "hdrezka.run") || (document.domain == "hdrezka.su" || document.domain.substring(document.domain.indexOf(".hdrezka.su") + 1) == "hdrezka.su") || (document.domain == "hdrezka.today" || document.domain.substring(document.domain.indexOf(".hdrezka.today") + 1) == "hdrezka.today") || (document.domain == "hdrezka.top" || document.domain.substring(document.domain.indexOf(".hdrezka.top") + 1) == "hdrezka.top") || (document.domain == "hdrezka.tv" || document.domain.substring(document.domain.indexOf(".hdrezka.tv") + 1) == "hdrezka.tv") || (document.domain == "hdrezka.win" || document.domain.substring(document.domain.indexOf(".hdrezka.win") + 1) == "hdrezka.win") || (document.domain == "hdrezka.wtf" || document.domain.substring(document.domain.indexOf(".hdrezka.wtf") + 1) == "hdrezka.wtf") || (document.domain == "hdrezka.zone" || document.domain.substring(document.domain.indexOf(".hdrezka.zone") + 1) == "hdrezka.zone") || (document.domain == "hdrezka1.site" || document.domain.substring(document.domain.indexOf(".hdrezka1.site") + 1) == "hdrezka1.site") || (document.domain == "ihdrezka.com" || document.domain.substring(document.domain.indexOf(".ihdrezka.com") + 1) == "ihdrezka.com") || (document.domain == "ikinohd.club" || document.domain.substring(document.domain.indexOf(".ikinohd.club") + 1) == "ikinohd.club") || (document.domain == "ikinohd.com" || document.domain.substring(document.domain.indexOf(".ikinohd.com") + 1) == "ikinohd.com") || (document.domain == "investxp.ru" || document.domain.substring(document.domain.indexOf(".investxp.ru") + 1) == "investxp.ru") || (document.domain == "itop-gear.ru" || document.domain.substring(document.domain.indexOf(".itop-gear.ru") + 1) == "itop-gear.ru") || (document.domain == "ixbt.com" || document.domain.substring(document.domain.indexOf(".ixbt.com") + 1) == "ixbt.com") || (document.domain == "kinoaa.ru" || document.domain.substring(document.domain.indexOf(".kinoaa.ru") + 1) == "kinoaa.ru") || (document.domain == "kinobar.cc" || document.domain.substring(document.domain.indexOf(".kinobar.cc") + 1) == "kinobar.cc") || (document.domain == "kinobe.club" || document.domain.substring(document.domain.indexOf(".kinobe.club") + 1) == "kinobe.club") || (document.domain == "kinoplanet.biz" || document.domain.substring(document.domain.indexOf(".kinoplanet.biz") + 1) == "kinoplanet.biz") || (document.domain == "koshara.net" || document.domain.substring(document.domain.indexOf(".koshara.net") + 1) == "koshara.net") || (document.domain == "kronverkcinema.ua" || document.domain.substring(document.domain.indexOf(".kronverkcinema.ua") + 1) == "kronverkcinema.ua") || (document.domain == "krutor.org" || document.domain.substring(document.domain.indexOf(".krutor.org") + 1) == "krutor.org") || (document.domain == "live-rutor.org" || document.domain.substring(document.domain.indexOf(".live-rutor.org") + 1) == "live-rutor.org") || (document.domain == "liverutor.org" || document.domain.substring(document.domain.indexOf(".liverutor.org") + 1) == "liverutor.org") || (document.domain == "livehdrezka.com" || document.domain.substring(document.domain.indexOf(".livehdrezka.com") + 1) == "livehdrezka.com") || (document.domain == "lostfan.net" || document.domain.substring(document.domain.indexOf(".lostfan.net") + 1) == "lostfan.net") || (document.domain == "mehdrezka.com" || document.domain.substring(document.domain.indexOf(".mehdrezka.com") + 1) == "mehdrezka.com") || (document.domain == "metahdrezka.com" || document.domain.substring(document.domain.indexOf(".metahdrezka.com") + 1) == "metahdrezka.com") || (document.domain == "moskva.fm" || document.domain.substring(document.domain.indexOf(".moskva.fm") + 1) == "moskva.fm") || (document.domain == "mrutor.org" || document.domain.substring(document.domain.indexOf(".mrutor.org") + 1) == "mrutor.org") || (document.domain == "my-tfile.org" || document.domain.substring(document.domain.indexOf(".my-tfile.org") + 1) == "my-tfile.org") || (document.domain == "myhdrezka.com" || document.domain.substring(document.domain.indexOf(".myhdrezka.com") + 1) == "myhdrezka.com") || (document.domain == "new-rutor.org" || document.domain.substring(document.domain.indexOf(".new-rutor.org") + 1) == "new-rutor.org") || (document.domain == "newstudio.tv" || document.domain.substring(document.domain.indexOf(".newstudio.tv") + 1) == "newstudio.tv") || (document.domain == "nnm-club.me" || document.domain.substring(document.domain.indexOf(".nnm-club.me") + 1) == "nnm-club.me") || (document.domain == "nnmclub.to" || document.domain.substring(document.domain.indexOf(".nnmclub.to") + 1) == "nnmclub.to") || (document.domain == "ostfilm.tv" || document.domain.substring(document.domain.indexOf(".ostfilm.tv") + 1) == "ostfilm.tv") || (document.domain == "pickfilm.ru" || document.domain.substring(document.domain.indexOf(".pickfilm.ru") + 1) == "pickfilm.ru") || (document.domain == "pure-t.ru" || document.domain.substring(document.domain.indexOf(".pure-t.ru") + 1) == "pure-t.ru") || (document.domain == "roem.ru" || document.domain.substring(document.domain.indexOf(".roem.ru") + 1) == "roem.ru") || (document.domain == "rusporno.vip" || document.domain.substring(document.domain.indexOf(".rusporno.vip") + 1) == "rusporno.vip") || (document.domain == "russian-porn.online" || document.domain.substring(document.domain.indexOf(".russian-porn.online") + 1) == "russian-porn.online") || (document.domain == "serialbox.org" || document.domain.substring(document.domain.indexOf(".serialbox.org") + 1) == "serialbox.org") || (document.domain == "tfile-music.org" || document.domain.substring(document.domain.indexOf(".tfile-music.org") + 1) == "tfile-music.org") || (document.domain == "tfile.cc" || document.domain.substring(document.domain.indexOf(".tfile.cc") + 1) == "tfile.cc") || (document.domain == "tfile.co" || document.domain.substring(document.domain.indexOf(".tfile.co") + 1) == "tfile.co") || (document.domain == "tfilm.club" || document.domain.substring(document.domain.indexOf(".tfilm.club") + 1) == "tfilm.club") || (document.domain == "tfilm.me" || document.domain.substring(document.domain.indexOf(".tfilm.me") + 1) == "tfilm.me") || (document.domain == "tfilm.tv" || document.domain.substring(document.domain.indexOf(".tfilm.tv") + 1) == "tfilm.tv") || (document.domain == "the-rutor.org" || document.domain.substring(document.domain.indexOf(".the-rutor.org") + 1) == "the-rutor.org") || (document.domain == "thehdrezka.com" || document.domain.substring(document.domain.indexOf(".thehdrezka.com") + 1) == "thehdrezka.com") || (document.domain == "torentor.co" || document.domain.substring(document.domain.indexOf(".torentor.co") + 1) == "torentor.co") || (document.domain == "torrentum.me" || document.domain.substring(document.domain.indexOf(".torrentum.me") + 1) == "torrentum.me") || (document.domain == "tvhdrezka.com" || document.domain.substring(document.domain.indexOf(".tvhdrezka.com") + 1) == "tvhdrezka.com") || (document.domain == "uphdrezka.com" || document.domain.substring(document.domain.indexOf(".uphdrezka.com") + 1) == "uphdrezka.com") || (document.domain == "vc.ru" || document.domain.substring(document.domain.indexOf(".vc.ru") + 1) == "vc.ru") || (document.domain == "veleto.ru" || document.domain.substring(document.domain.indexOf(".veleto.ru") + 1) == "veleto.ru") || (document.domain == "videoclub.men" || document.domain.substring(document.domain.indexOf(".videoclub.men") + 1) == "videoclub.men") || (document.domain == "virusinfo.info" || document.domain.substring(document.domain.indexOf(".virusinfo.info") + 1) == "virusinfo.info") || (document.domain == "wehdrezka.com" || document.domain.substring(document.domain.indexOf(".wehdrezka.com") + 1) == "wehdrezka.com") || (document.domain == "wikianime.ru" || document.domain.substring(document.domain.indexOf(".wikianime.ru") + 1) == "wikianime.ru") || (document.domain == "zona-film.com" || document.domain.substring(document.domain.indexOf(".zona-film.com") + 1) == "zona-film.com"))
	css += [
		"body:not(#id), html:not(#id) {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "21forum.ru" || document.domain.substring(document.domain.indexOf(".21forum.ru") + 1) == "21forum.ru") || (document.domain == "forum.na-svyazi.ru" || document.domain.substring(document.domain.indexOf(".forum.na-svyazi.ru") + 1) == "forum.na-svyazi.ru") || (document.domain == "forum.zarulem.ws" || document.domain.substring(document.domain.indexOf(".forum.zarulem.ws") + 1) == "forum.zarulem.ws"))
	css += [
		"#user2s[height=\"71\"], #userlinks[height=\"70\"], td[height=\"70\"][style] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "24video.guru" || document.domain.substring(document.domain.indexOf(".24video.guru") + 1) == "24video.guru") || (document.domain == "24video.sexy" || document.domain.substring(document.domain.indexOf(".24video.sexy") + 1) == "24video.sexy") || (document.domain == "aghdrezka.com" || document.domain.substring(document.domain.indexOf(".aghdrezka.com") + 1) == "aghdrezka.com") || (document.domain == "ahdrezka.com" || document.domain.substring(document.domain.indexOf(".ahdrezka.com") + 1) == "ahdrezka.com") || (document.domain == "aif.ru" || document.domain.substring(document.domain.indexOf(".aif.ru") + 1) == "aif.ru") || (document.domain == "besthdrezka.com" || document.domain.substring(document.domain.indexOf(".besthdrezka.com") + 1) == "besthdrezka.com") || (document.domain == "epravda.com.ua" || document.domain.substring(document.domain.indexOf(".epravda.com.ua") + 1) == "epravda.com.ua") || (document.domain == "fast-torrent.club" || document.domain.substring(document.domain.indexOf(".fast-torrent.club") + 1) == "fast-torrent.club") || (document.domain == "fastpic.ru" || document.domain.substring(document.domain.indexOf(".fastpic.ru") + 1) == "fastpic.ru") || (document.domain == "film-max.ru" || document.domain.substring(document.domain.indexOf(".film-max.ru") + 1) == "film-max.ru") || (document.domain == "filmfullhd.net" || document.domain.substring(document.domain.indexOf(".filmfullhd.net") + 1) == "filmfullhd.net") || (document.domain == "gecid.com" || document.domain.substring(document.domain.indexOf(".gecid.com") + 1) == "gecid.com") || (document.domain == "gethdrezka.com" || document.domain.substring(document.domain.indexOf(".gethdrezka.com") + 1) == "gethdrezka.com") || (document.domain == "hd720.biz" || document.domain.substring(document.domain.indexOf(".hd720.biz") + 1) == "hd720.biz") || (document.domain == "hdrezka-ag.com" || document.domain.substring(document.domain.indexOf(".hdrezka-ag.com") + 1) == "hdrezka-ag.com") || (document.domain == "hdrezka-online.me" || document.domain.substring(document.domain.indexOf(".hdrezka-online.me") + 1) == "hdrezka-online.me") || (document.domain == "hdrezka.asia" || document.domain.substring(document.domain.indexOf(".hdrezka.asia") + 1) == "hdrezka.asia") || (document.domain == "hdrezka.buzz" || document.domain.substring(document.domain.indexOf(".hdrezka.buzz") + 1) == "hdrezka.buzz") || (document.domain == "hdrezka.city" || document.domain.substring(document.domain.indexOf(".hdrezka.city") + 1) == "hdrezka.city") || (document.domain == "hdrezka.club" || document.domain.substring(document.domain.indexOf(".hdrezka.club") + 1) == "hdrezka.club") || (document.domain == "hdrezka.fail" || document.domain.substring(document.domain.indexOf(".hdrezka.fail") + 1) == "hdrezka.fail") || (document.domain == "hdrezka.gift" || document.domain.substring(document.domain.indexOf(".hdrezka.gift") + 1) == "hdrezka.gift") || (document.domain == "hdrezka.ink" || document.domain.substring(document.domain.indexOf(".hdrezka.ink") + 1) == "hdrezka.ink") || (document.domain == "hdrezka.link" || document.domain.substring(document.domain.indexOf(".hdrezka.link") + 1) == "hdrezka.link") || (document.domain == "hdrezka.live" || document.domain.substring(document.domain.indexOf(".hdrezka.live") + 1) == "hdrezka.live") || (document.domain == "hdrezka.loan" || document.domain.substring(document.domain.indexOf(".hdrezka.loan") + 1) == "hdrezka.loan") || (document.domain == "hdrezka.lol" || document.domain.substring(document.domain.indexOf(".hdrezka.lol") + 1) == "hdrezka.lol") || (document.domain == "hdrezka.mba" || document.domain.substring(document.domain.indexOf(".hdrezka.mba") + 1) == "hdrezka.mba") || (document.domain == "hdrezka.name" || document.domain.substring(document.domain.indexOf(".hdrezka.name") + 1) == "hdrezka.name") || (document.domain == "hdrezka.ooo" || document.domain.substring(document.domain.indexOf(".hdrezka.ooo") + 1) == "hdrezka.ooo") || (document.domain == "hdrezka.rest" || document.domain.substring(document.domain.indexOf(".hdrezka.rest") + 1) == "hdrezka.rest") || (document.domain == "hdrezka.run" || document.domain.substring(document.domain.indexOf(".hdrezka.run") + 1) == "hdrezka.run") || (document.domain == "hdrezka.today" || document.domain.substring(document.domain.indexOf(".hdrezka.today") + 1) == "hdrezka.today") || (document.domain == "hdrezka.top" || document.domain.substring(document.domain.indexOf(".hdrezka.top") + 1) == "hdrezka.top") || (document.domain == "hdrezka.win" || document.domain.substring(document.domain.indexOf(".hdrezka.win") + 1) == "hdrezka.win") || (document.domain == "hdrezka.wtf" || document.domain.substring(document.domain.indexOf(".hdrezka.wtf") + 1) == "hdrezka.wtf") || (document.domain == "hdrezka.zone" || document.domain.substring(document.domain.indexOf(".hdrezka.zone") + 1) == "hdrezka.zone") || (document.domain == "ihdrezka.com" || document.domain.substring(document.domain.indexOf(".ihdrezka.com") + 1) == "ihdrezka.com") || (document.domain == "ixbt.com" || document.domain.substring(document.domain.indexOf(".ixbt.com") + 1) == "ixbt.com") || (document.domain == "kino-full.ru" || document.domain.substring(document.domain.indexOf(".kino-full.ru") + 1) == "kino-full.ru") || (document.domain == "kinobar.cc" || document.domain.substring(document.domain.indexOf(".kinobar.cc") + 1) == "kinobar.cc") || (document.domain == "kinokrad.su" || document.domain.substring(document.domain.indexOf(".kinokrad.su") + 1) == "kinokrad.su") || (document.domain == "kinotochka.club" || document.domain.substring(document.domain.indexOf(".kinotochka.club") + 1) == "kinotochka.club") || (document.domain == "kinotochka.me" || document.domain.substring(document.domain.indexOf(".kinotochka.me") + 1) == "kinotochka.me") || (document.domain == "kurkul.com" || document.domain.substring(document.domain.indexOf(".kurkul.com") + 1) == "kurkul.com") || (document.domain == "kv.by" || document.domain.substring(document.domain.indexOf(".kv.by") + 1) == "kv.by") || (document.domain == "livehdrezka.com" || document.domain.substring(document.domain.indexOf(".livehdrezka.com") + 1) == "livehdrezka.com") || (document.domain == "livejournal.com" || document.domain.substring(document.domain.indexOf(".livejournal.com") + 1) == "livejournal.com") || (document.domain == "lostfan.net" || document.domain.substring(document.domain.indexOf(".lostfan.net") + 1) == "lostfan.net") || (document.domain == "mehdrezka.com" || document.domain.substring(document.domain.indexOf(".mehdrezka.com") + 1) == "mehdrezka.com") || (document.domain == "metahdrezka.com" || document.domain.substring(document.domain.indexOf(".metahdrezka.com") + 1) == "metahdrezka.com") || (document.domain == "myhdrezka.com" || document.domain.substring(document.domain.indexOf(".myhdrezka.com") + 1) == "myhdrezka.com") || (document.domain == "myshows.me" || document.domain.substring(document.domain.indexOf(".myshows.me") + 1) == "myshows.me") || (document.domain == "newstudio.tv" || document.domain.substring(document.domain.indexOf(".newstudio.tv") + 1) == "newstudio.tv") || (document.domain == "nnm-club.me" || document.domain.substring(document.domain.indexOf(".nnm-club.me") + 1) == "nnm-club.me") || (document.domain == "nnmclub.to" || document.domain.substring(document.domain.indexOf(".nnmclub.to") + 1) == "nnmclub.to") || (document.domain == "technogies.ru" || document.domain.substring(document.domain.indexOf(".technogies.ru") + 1) == "technogies.ru") || (document.domain == "oblozhki.net" || document.domain.substring(document.domain.indexOf(".oblozhki.net") + 1) == "oblozhki.net") || (document.domain == "oper.ru" || document.domain.substring(document.domain.indexOf(".oper.ru") + 1) == "oper.ru") || (document.domain == "pure-t.ru" || document.domain.substring(document.domain.indexOf(".pure-t.ru") + 1) == "pure-t.ru") || (document.domain == "rufootballtv.org" || document.domain.substring(document.domain.indexOf(".rufootballtv.org") + 1) == "rufootballtv.org") || (document.domain == "rusporno.vip" || document.domain.substring(document.domain.indexOf(".rusporno.vip") + 1) == "rusporno.vip") || (document.domain == "russian-porn.online" || document.domain.substring(document.domain.indexOf(".russian-porn.online") + 1) == "russian-porn.online") || (document.domain == "sc2tv.ru" || document.domain.substring(document.domain.indexOf(".sc2tv.ru") + 1) == "sc2tv.ru") || (document.domain == "simhost.org" || document.domain.substring(document.domain.indexOf(".simhost.org") + 1) == "simhost.org") || (document.domain == "smotri.com" || document.domain.substring(document.domain.indexOf(".smotri.com") + 1) == "smotri.com") || (document.domain == "stopgame.ru" || document.domain.substring(document.domain.indexOf(".stopgame.ru") + 1) == "stopgame.ru") || (document.domain == "torrent-games.info" || document.domain.substring(document.domain.indexOf(".torrent-games.info") + 1) == "torrent-games.info") || (document.domain == "torrentom.com" || document.domain.substring(document.domain.indexOf(".torrentom.com") + 1) == "torrentom.com") || (document.domain == "torrentum.me" || document.domain.substring(document.domain.indexOf(".torrentum.me") + 1) == "torrentum.me") || (document.domain == "tvhdrezka.com" || document.domain.substring(document.domain.indexOf(".tvhdrezka.com") + 1) == "tvhdrezka.com") || (document.domain == "uphdrezka.com" || document.domain.substring(document.domain.indexOf(".uphdrezka.com") + 1) == "uphdrezka.com") || (document.domain == "userstyles.org" || document.domain.substring(document.domain.indexOf(".userstyles.org") + 1) == "userstyles.org") || (document.domain == "wehdrezka.com" || document.domain.substring(document.domain.indexOf(".wehdrezka.com") + 1) == "wehdrezka.com") || (document.domain == "xatab-repack.net" || document.domain.substring(document.domain.indexOf(".xatab-repack.net") + 1) == "xatab-repack.net") || (document.domain == "zakarpatpost.net" || document.domain.substring(document.domain.indexOf(".zakarpatpost.net") + 1) == "zakarpatpost.net") || (document.domain == "zakon.kz" || document.domain.substring(document.domain.indexOf(".zakon.kz") + 1) == "zakon.kz"))
	css += [
		"  body:not(#id), html:not(#id) {background-image: none !important;}"
	].join("\n");
if (false || (document.domain == "24video.guru" || document.domain.substring(document.domain.indexOf(".24video.guru") + 1) == "24video.guru") || (document.domain == "24video.sexy" || document.domain.substring(document.domain.indexOf(".24video.sexy") + 1) == "24video.sexy") || (document.domain == "biqle.ru" || document.domain.substring(document.domain.indexOf(".biqle.ru") + 1) == "biqle.ru") || (document.domain == "fainaidea.com" || document.domain.substring(document.domain.indexOf(".fainaidea.com") + 1) == "fainaidea.com") || (document.domain == "gecid.com" || document.domain.substring(document.domain.indexOf(".gecid.com") + 1) == "gecid.com") || (document.domain == "kurkul.com" || document.domain.substring(document.domain.indexOf(".kurkul.com") + 1) == "kurkul.com") || (document.domain == "russian-porn.online" || document.domain.substring(document.domain.indexOf(".russian-porn.online") + 1) == "russian-porn.online") || (document.domain == "valetudo.ru" || document.domain.substring(document.domain.indexOf(".valetudo.ru") + 1) == "valetudo.ru"))
	css += [
		"body > * {pointer-events: auto !important;}",
		"    body {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "26-2.ru" || document.domain.substring(document.domain.indexOf(".26-2.ru") + 1) == "26-2.ru") || (document.domain == "arbitr-praktika.ru" || document.domain.substring(document.domain.indexOf(".arbitr-praktika.ru") + 1) == "arbitr-praktika.ru") || (document.domain == "budgetnik.ru" || document.domain.substring(document.domain.indexOf(".budgetnik.ru") + 1) == "budgetnik.ru") || (document.domain == "budgetnyk.com.ua" || document.domain.substring(document.domain.indexOf(".budgetnyk.com.ua") + 1) == "budgetnyk.com.ua") || (document.domain == "business.ru" || document.domain.substring(document.domain.indexOf(".business.ru") + 1) == "business.ru") || (document.domain == "cxychet.ru" || document.domain.substring(document.domain.indexOf(".cxychet.ru") + 1) == "cxychet.ru") || (document.domain == "dirsalona.ru" || document.domain.substring(document.domain.indexOf(".dirsalona.ru") + 1) == "dirsalona.ru") || (document.domain == "fd.ru" || document.domain.substring(document.domain.indexOf(".fd.ru") + 1) == "fd.ru") || (document.domain == "gazeta-unp.ru" || document.domain.substring(document.domain.indexOf(".gazeta-unp.ru") + 1) == "gazeta-unp.ru") || (document.domain == "gd.ru" || document.domain.substring(document.domain.indexOf(".gd.ru") + 1) == "gd.ru") || (document.domain == "gkh.ru" || document.domain.substring(document.domain.indexOf(".gkh.ru") + 1) == "gkh.ru") || (document.domain == "glavbukh.ru" || document.domain.substring(document.domain.indexOf(".glavbukh.ru") + 1) == "glavbukh.ru") || (document.domain == "golovbukh.ua" || document.domain.substring(document.domain.indexOf(".golovbukh.ua") + 1) == "golovbukh.ua") || (document.domain == "hr-director.ru" || document.domain.substring(document.domain.indexOf(".hr-director.ru") + 1) == "hr-director.ru") || (document.domain == "kadrovik01.com.ua" || document.domain.substring(document.domain.indexOf(".kadrovik01.com.ua") + 1) == "kadrovik01.com.ua") || (document.domain == "kdelo.ru" || document.domain.substring(document.domain.indexOf(".kdelo.ru") + 1) == "kdelo.ru") || (document.domain == "kom-dir.ru" || document.domain.substring(document.domain.indexOf(".kom-dir.ru") + 1) == "kom-dir.ru") || (document.domain == "law.ru" || document.domain.substring(document.domain.indexOf(".law.ru") + 1) == "law.ru") || (document.domain == "lawyercom.ru" || document.domain.substring(document.domain.indexOf(".lawyercom.ru") + 1) == "lawyercom.ru") || (document.domain == "medsprava.com.ua" || document.domain.substring(document.domain.indexOf(".medsprava.com.ua") + 1) == "medsprava.com.ua") || (document.domain == "menobr.ru" || document.domain.substring(document.domain.indexOf(".menobr.ru") + 1) == "menobr.ru") || (document.domain == "nalogplan.ru" || document.domain.substring(document.domain.indexOf(".nalogplan.ru") + 1) == "nalogplan.ru") || (document.domain == "pro-goszakaz.ru" || document.domain.substring(document.domain.indexOf(".pro-goszakaz.ru") + 1) == "pro-goszakaz.ru") || (document.domain == "pro-personal.ru" || document.domain.substring(document.domain.indexOf(".pro-personal.ru") + 1) == "pro-personal.ru") || (document.domain == "resobr.ru" || document.domain.substring(document.domain.indexOf(".resobr.ru") + 1) == "resobr.ru") || (document.domain == "rnk.ru" || document.domain.substring(document.domain.indexOf(".rnk.ru") + 1) == "rnk.ru") || (document.domain == "sop.com.ua" || document.domain.substring(document.domain.indexOf(".sop.com.ua") + 1) == "sop.com.ua") || (document.domain == "stroychet.ru" || document.domain.substring(document.domain.indexOf(".stroychet.ru") + 1) == "stroychet.ru") || (document.domain == "trudohrana.ru" || document.domain.substring(document.domain.indexOf(".trudohrana.ru") + 1) == "trudohrana.ru") || (document.domain == "ugpr.ru" || document.domain.substring(document.domain.indexOf(".ugpr.ru") + 1) == "ugpr.ru") || (document.domain == "zarplata-online.ru" || document.domain.substring(document.domain.indexOf(".zarplata-online.ru") + 1) == "zarplata-online.ru") || (document.domain == "zdrav.ru" || document.domain.substring(document.domain.indexOf(".zdrav.ru") + 1) == "zdrav.ru"))
	css += [
		".megaShadow, .paywall-activated, .topAdvertize {display: none !important;}",
		"    .body * {opacity: 1 !important; filter: none !important; pointer-events: auto !important;}",
		"    body {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "3dnews.ru" || document.domain.substring(document.domain.indexOf(".3dnews.ru") + 1) == "3dnews.ru"))
	css += [
		"html[lang=\"ru\"] > body {background: radial-gradient(ellipse at center,#4e4e4e 0%,#1a1a1a 100%) !important;}",
		"    #global-wrapper[style*=\"pointer\"] {cursor: auto !important; padding-top: 0 !important; background: none !important; pointer-events: none !important;}",
		"    #global-wrapper[style*=\"pointer\"] > * {pointer-events: auto !important;}",
		"    #global-wrapper:not(#id) > #wrapper {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "4pda.ru" || document.domain.substring(document.domain.indexOf(".4pda.ru") + 1) == "4pda.ru") || (document.domain == "4pda.to" || document.domain.substring(document.domain.indexOf(".4pda.to") + 1) == "4pda.to"))
	css += [
		"body[itemscope] [id]:first-child > style ~ a[href][target=\"_blank\"], ",
		"    iframe[src*=\"utm_campaign\"] {display: none !important;}",
		" #main, main, div{background-image: none !important;}",
		" * {background-image: url(\"\") !important;}",
		" div{background-image: url(\"\") !important;}",
// !!		" #header + #ruBlbZq {background-image: url() !important;}",
// !!		" #header + * {background-image: url() !important;}",
// !!		" #header + #ruBlbZq {background-image: url(\"\") !important;}",
		" #main {padding: 0 !important;}",
		"  .brand-page {display: none !important;}",
		"  .brand-page {height: 0 !important;}",
		" body,#main,#rnd-replace-main {background: #E6E7E9!important;}",
		"  div#main > div.holder.no-hidden{padding: 0 !important;}",
		"  div#main > div.holder.no-hidden{width: inherit !important;}",
		"  html > body > div#wrapper > div:nth-of-type(1) > div:nth-of-type(1) > header+div {background-image: url(\"\") !important;}",
		"  article#content{width: 920px !important;}",
	// !	"  #header~div:not(#contacts):not(#body) {background-image: none !important;background-color: #E6E7E9!important;}",
	// !	"  link~div[class$=\" \"] {display: none!important;}",
		"  html {margin-top: 0px !important;}",
		"  div [class^=\"h-frame\"]{top: 0px !important;}",
		"  div#main > div.holder.no-hidden{padding: 0 !important;}",
		"  div#main > div.holder.no-hidden{width: inherit !important;}",
		"  iv#main > div.holder.no-hidden > a{display: none !important;}",
		"  div#main > div.holder.no-hidden > div.brand-page-counters{display: none !important;}",
		"  div#ipbwrapper > div.borderwrap-header{display: none !important;}",
		"  div.borderwrap-header > table{display: none !important;}",
		"  div#dw-wrapper{display: none !important;}",
		"  a.brand-page.main{display: none !important;}",
		"  div#wrapper > div:nth-of-type(1) > div:nth-of-type(1) > header+div > div:nth-of-type(4){display: none !important;}",
		"  div#wrapper > div:nth-of-type(1) > div:nth-of-type(1) > header+div > div:nth-of-type(3){display: none !important;}",
	// ! расширяем
	// ! проверить	"  header#header{ max-width: 1500px !important; width: 95% !important;}",
	// ! проверить	"  header+div > div:nth-of-type(1){ margin: 0px !important; max-width: 1500px !important;  width: 90% !important;}",
		"  header+div > div > div+section > article{max-width: 1500px !important; width: 79% !important;}",
	// !? проверить вариант	"  header+div > div > div+section > article{max-width: 1500px !important; width: auto !important;}",
		"  header+div > div > div+section > aside{max-width: 20% !important; width: 20% !important;}",
		" .holder, .holder-no-hidden {width: auto !important;}",
		" .selection .content {margin-left: 0px !important; margin-right: 0px !important;}",
		" header+div > div > div+section{margin-left: 0px !important; margin-right: 0px !important;}"
	].join("\n");
if (false || (document.domain == "aces.gg" || document.domain.substring(document.domain.indexOf(".aces.gg") + 1) == "aces.gg"))
	css += [
		"body {background: black !important; cursor: default !important;}",
		"    #alert > * {pointer-events: auto !important;}",
		"    #alert {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "adultmult.ru" || document.domain.substring(document.domain.indexOf(".adultmult.ru") + 1) == "adultmult.ru"))
	css += [
		"body {background: black !important;}",
		"    .allsearch, .menuposition {margin-top: 0 !important;}",
		"    .menusection {position: static !important;}"
	].join("\n");
if (false || (document.domain == "ag.ru" || document.domain.substring(document.domain.indexOf(".ag.ru") + 1) == "ag.ru"))
	css += [
		"#header-links {display: none !important;}",
		"    #new_logo_helper01 {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "aif.ru" || document.domain.substring(document.domain.indexOf(".aif.ru") + 1) == "aif.ru") || (document.domain == "onlinelife.club" || document.domain.substring(document.domain.indexOf(".onlinelife.club") + 1) == "onlinelife.club"))
	css += "#container:not(#id) {margin-top: 0!important;}";
if (false || (document.domain == "ain.ua" || document.domain.substring(document.domain.indexOf(".ain.ua") + 1) == "ain.ua"))
	css += [
		"body:not(#id) {background: white !important;}"
	].join("\n");
if (false || (document.domain == "ain.ua" || document.domain.substring(document.domain.indexOf(".ain.ua") + 1) == "ain.ua") || (document.domain == "filmfullhd.net" || document.domain.substring(document.domain.indexOf(".filmfullhd.net") + 1) == "filmfullhd.net") || (document.domain == "gametech.ru" || document.domain.substring(document.domain.indexOf(".gametech.ru") + 1) == "gametech.ru") || (document.domain == "gid-online.in" || document.domain.substring(document.domain.indexOf(".gid-online.in") + 1) == "gid-online.in") || (document.domain == "gidonline-hd.me" || document.domain.substring(document.domain.indexOf(".gidonline-hd.me") + 1) == "gidonline-hd.me") || (document.domain == "gidonline.in" || document.domain.substring(document.domain.indexOf(".gidonline.in") + 1) == "gidonline.in") || (document.domain == "gidonline.io" || document.domain.substring(document.domain.indexOf(".gidonline.io") + 1) == "gidonline.io") || (document.domain == "kino-hd720.net" || document.domain.substring(document.domain.indexOf(".kino-hd720.net") + 1) == "kino-hd720.net") || (document.domain == "kino-klub.org" || document.domain.substring(document.domain.indexOf(".kino-klub.org") + 1) == "kino-klub.org") || (document.domain == "kino720.online" || document.domain.substring(document.domain.indexOf(".kino720.online") + 1) == "kino720.online") || (document.domain == "kinohome.net" || document.domain.substring(document.domain.indexOf(".kinohome.net") + 1) == "kinohome.net") || (document.domain == "kinohome.org" || document.domain.substring(document.domain.indexOf(".kinohome.org") + 1) == "kinohome.org") || (document.domain == "oblozhki.net" || document.domain.substring(document.domain.indexOf(".oblozhki.net") + 1) == "oblozhki.net") || (document.domain == "sportarena.com" || document.domain.substring(document.domain.indexOf(".sportarena.com") + 1) == "sportarena.com") || (document.domain == "the-cinema.ru" || document.domain.substring(document.domain.indexOf(".the-cinema.ru") + 1) == "the-cinema.ru") || (document.domain == "torrentum.org" || document.domain.substring(document.domain.indexOf(".torrentum.org") + 1) == "torrentum.org") || (document.domain == "virusinfo.info" || document.domain.substring(document.domain.indexOf(".virusinfo.info") + 1) == "virusinfo.info"))
	css += [
		"body:not(#id), html:not(#id) {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "alau.kz" || document.domain.substring(document.domain.indexOf(".alau.kz") + 1) == "alau.kz"))
	css += [
		".td-ad-background-link .td-outer-container > * {pointer-events: auto !important;}",
		"    .td-ad-background-link #td-outer-wrap, ",
		"    .td-ad-background-link .td-outer-container {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "all-episodes.tv" || document.domain.substring(document.domain.indexOf(".all-episodes.tv") + 1) == "all-episodes.tv"))
	css += [
		"body {background-image: none !important;}",
		"    #advtss {position: fixed !important; top: -10000px !important; left: -10000px !important;}"
	].join("\n");
if (false || (document.domain == "allboxing.ru" || document.domain.substring(document.domain.indexOf(".allboxing.ru") + 1) == "allboxing.ru"))
	css += [
		".content-wrapper {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "allhockey.ru" || document.domain.substring(document.domain.indexOf(".allhockey.ru") + 1) == "allhockey.ru"))
	css += ".adr-top { height: 0 !important; min-height: 0!important;}";
if (false || (document.domain == "aliexpress.com" || document.domain.substring(document.domain.indexOf(".aliexpress.com") + 1) == "aliexpress.com"))
	css += [
		" dl.cl-item{display: inline-block !important;}",
	// !!	" div.categories-main{ display: inline-block !important; width: auto !important; } dl.cl-item{display: inline-block !important;}",
		" div.index-page > div.user-helper-footer{position: relative !important; top: 120px !important; padding: 0 !important;}",
		" div.index-page > div.site-footer{position: relative !important; top: 120px !important; margin: 0 !important; padding: 0 !important;}",
		" div.index-page > div.footer-copywrite{position: relative !important; top: 120px !important;}",
		" div.index-page{height: inherit !important;}"
	].join("\n");
if (false || (document.domain == "allmmorpg.ru" || document.domain.substring(document.domain.indexOf(".allmmorpg.ru") + 1) == "allmmorpg.ru"))
	css += [
		"body {background-image: none !important;}",
		"    .td-ad-background-link > * {pointer-events: auto !important;}",
		"    .td-ad-background-link {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "androidinsider.ru" || document.domain.substring(document.domain.indexOf(".androidinsider.ru") + 1) == "androidinsider.ru"))
	css += [
		"#wrapper {background: none !important;}",
		"    #trend {margin-bottom: 0 !important;}"
	].join("\n");
if (false || (document.domain == "anime-rus.ru" || document.domain.substring(document.domain.indexOf(".anime-rus.ru") + 1) == "anime-rus.ru"))
	css += [
		"#hide_show {display: none !important;}",
		"    .nav {position: relative !important;}"
	].join("\n");
if (false || (document.domain == "anime.anidub.com" || document.domain.substring(document.domain.indexOf(".anime.anidub.com") + 1) == "anime.anidub.com"))
	css += [
		"body > script[src^=\"/ads.js\"] ~ div:not([id]):not([class])[style^=\"position\"][style*=\"z-index\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "anime.anidub.com" || document.domain.substring(document.domain.indexOf(".anime.anidub.com") + 1) == "anime.anidub.com") || (document.domain == "online.anidub.com" || document.domain.substring(document.domain.indexOf(".online.anidub.com") + 1) == "online.anidub.com"))
	css += [
		"body > div[style^=\"background\"], html > body {background: none !important;}",
		"    .top_one ~ script ~ div[id]:not([class]):not([style]):not(#slideout), body > div[style^=\"background\"] > script ~ div[id]:not([class]) {display: none !important;}"
	].join("\n");
if (false || (document.domain == "animebest.org" || document.domain.substring(document.domain.indexOf(".animebest.org") + 1) == "animebest.org"))
	css += [
		"#menubar {padding-top: 40px !important;}"
	].join("\n");
if (false || (document.domain == "animedia.online" || document.domain.substring(document.domain.indexOf(".animedia.online") + 1) == "animedia.online"))
	css += [
		"header.top {margin-bottom: 0 !important;}"
	].join("\n");
if (false || (document.domain == "animemovie.ru" || document.domain.substring(document.domain.indexOf(".animemovie.ru") + 1) == "animemovie.ru"))
	css += [
		"body > .standard, header[role=\"banner\"] {height: 100px !important; background: transparent !important;}",
		"    .logo {margin-left: 0 !important; left: 0 !important;}",
		"    .htitle {margin-left: 0 !important; left: 150px !important;}",
		"    nav[role=\"navigation\"] > ul {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "animeonline.su" || document.domain.substring(document.domain.indexOf(".animeonline.su") + 1) == "animeonline.su"))
	css += [
		"#brandParallax {display: none !important;}",
		"    #wrapper {padding-top: 50px !important;}"
	].join("\n");
if (false || (document.domain == "animevost.in" || document.domain.substring(document.domain.indexOf(".animevost.in") + 1) == "animevost.in"))
	css += [
		"#Navigation {background-image: none !important; height: auto !important;}",
		"    #Navigation > nav ul {bottom: auto !important; top: 50px !important; z-index: 100 !important;}",
		"    #Navigation > nav {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "animevost.org" || document.domain.substring(document.domain.indexOf(".animevost.org") + 1) == "animevost.org"))
	css += [
		"div[class^=\"headbg\"] {background-image: none !important; height: auto !important;}",
		"    div[class^=\"headbg\"] > .menu .sar {bottom: auto !important; top: 50px !important; z-index: 100 !important;}",
		"    div[class^=\"headbg\"] > .menu {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "aniplay.tv" || document.domain.substring(document.domain.indexOf(".aniplay.tv") + 1) == "aniplay.tv"))
	css += [
		"body {cursor: auto !important;}",
		"    .ap2-main-header-banner {display: none !important;}",
		"    .ap2-main-header {height: 30px !important;}"
	].join("\n");
if (false || (document.domain == "anistar.me" || document.domain.substring(document.domain.indexOf(".anistar.me") + 1) == "anistar.me"))
	css += [
		"html > body:not(#id) {background-image: none !important;}",
		"    body > .main.wrapper {margin-top: 0 !important;}",
		"    body > header {top: 0 !important;}",
		"    .list-nav {z-index: 1 !important;}",
		"    .drowmenu {z-index: 1999999999 !important;}"
	].join("\n");
if (false || (document.domain == "anitokyo.tv" || document.domain.substring(document.domain.indexOf(".anitokyo.tv") + 1) == "anitokyo.tv"))
	css += [
		"#header_h, body {background-image: none !important;}",
		"    div[class^=\"header_bg\"], header > a:not(.rss_ico) {display: none !important;}",
		"    #wrapper, header {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "anti-malware.ru" || document.domain.substring(document.domain.indexOf(".anti-malware.ru") + 1) == "anti-malware.ru"))
	css += "#header-bg-enf {margin-top: 0 !important;}";
if (false || (document.domain == "app2top.ru" || document.domain.substring(document.domain.indexOf(".app2top.ru") + 1) == "app2top.ru"))
	css += [
		"body > .content, body > .content__full {margin-top: 50px !important;}"
	].join("\n");
if (false || (document.domain == "audioboo.info" || document.domain.substring(document.domain.indexOf(".audioboo.info") + 1) == "audioboo.info") || (document.domain == "audioboo.ru" || document.domain.substring(document.domain.indexOf(".audioboo.ru") + 1) == "audioboo.ru"))
	css += [
		".right-block-content > .slider {padding: 0 !important;}"
	].join("\n");
if (false || (document.domain == "autoua.net" || document.domain.substring(document.domain.indexOf(".autoua.net") + 1) == "autoua.net"))
	css += [
		".fader-social {display: none !important;}",
		"    .social-open {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "av.by" || document.domain.substring(document.domain.indexOf(".av.by") + 1) == "av.by"))
	css += [
		".av-branding {background: none !important;}",
		"    .av-branding .page {padding-top: 0 !important; padding-bottom: 0 !important;}"
	].join("\n");
if (false || (document.domain == "avito.ru" || document.domain.substring(document.domain.indexOf(".avito.ru") + 1) == "avito.ru"))
	css += [
		".avito-ads-container {margin: 0 !important; min-height: 0 !important; padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "axd.semestr.ru" || document.domain.substring(document.domain.indexOf(".axd.semestr.ru") + 1) == "axd.semestr.ru") || (document.domain == "math.semestr.ru" || document.domain.substring(document.domain.indexOf(".math.semestr.ru") + 1) == "math.semestr.ru"))
	css += [
		".adsbygoogle, .well-google, .well-span {max-height: 121px !important; opacity: 0 !important; pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "banki.ru" || document.domain.substring(document.domain.indexOf(".banki.ru") + 1) == "banki.ru"))
	css += [
		".header--short.header {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "bestpersons.ru" || document.domain.substring(document.domain.indexOf(".bestpersons.ru") + 1) == "bestpersons.ru"))
	css += [
		"#userTabs {float: none !important;}"
	].join("\n");
if (false || (document.domain == "binmovie.org" || document.domain.substring(document.domain.indexOf(".binmovie.org") + 1) == "binmovie.org"))
	css += " #content {top: 0 !important; left: 0 !important; width: 100% !important; margin-left: 0 !important;}";
if (false || (document.domain == "border-fan.ru" || document.domain.substring(document.domain.indexOf(".border-fan.ru") + 1) == "border-fan.ru") || (document.domain == "dad-fan.ru" || document.domain.substring(document.domain.indexOf(".dad-fan.ru") + 1) == "dad-fan.ru") || (document.domain == "freehat.cc" || document.domain.substring(document.domain.indexOf(".freehat.cc") + 1) == "freehat.cc") || (document.domain == "grif-fan.ru" || document.domain.substring(document.domain.indexOf(".grif-fan.ru") + 1) == "grif-fan.ru") || (document.domain == "lalapaluza.ru" || document.domain.substring(document.domain.indexOf(".lalapaluza.ru") + 1) == "lalapaluza.ru") || (document.domain == "moviebuster.tv" || document.domain.substring(document.domain.indexOf(".moviebuster.tv") + 1) == "moviebuster.tv") || (document.domain == "simp-fan.ru" || document.domain.substring(document.domain.indexOf(".simp-fan.ru") + 1) == "simp-fan.ru") || (document.domain == "sp-fan.ru" || document.domain.substring(document.domain.indexOf(".sp-fan.ru") + 1) == "sp-fan.ru"))
	css += [
		"body:not(#id) {background: whitesmoke !important;}"
	].join("\n");
if (false || (document.domain == "border-fan.ru" || document.domain.substring(document.domain.indexOf(".border-fan.ru") + 1) == "border-fan.ru") || (document.domain == "dad-fan.ru" || document.domain.substring(document.domain.indexOf(".dad-fan.ru") + 1) == "dad-fan.ru") || (document.domain == "freehat.cc" || document.domain.substring(document.domain.indexOf(".freehat.cc") + 1) == "freehat.cc") || (document.domain == "grif-fan.ru" || document.domain.substring(document.domain.indexOf(".grif-fan.ru") + 1) == "grif-fan.ru") || (document.domain == "lalapaluza.ru" || document.domain.substring(document.domain.indexOf(".lalapaluza.ru") + 1) == "lalapaluza.ru") || (document.domain == "moviebuster.tv" || document.domain.substring(document.domain.indexOf(".moviebuster.tv") + 1) == "moviebuster.tv") || (document.domain == "simp-fan.ru" || document.domain.substring(document.domain.indexOf(".simp-fan.ru") + 1) == "simp-fan.ru") || (document.domain == "sp-fan.ru" || document.domain.substring(document.domain.indexOf(".sp-fan.ru") + 1) == "sp-fan.ru") || (document.domain == "turkcinema.org" || document.domain.substring(document.domain.indexOf(".turkcinema.org") + 1) == "turkcinema.org"))
	css += [
		"#page {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "botanichka.ru" || document.domain.substring(document.domain.indexOf(".botanichka.ru") + 1) == "botanichka.ru"))
	css += [
		"html > body {background-image: none !important; pointer-events: none !important;}",
		"    .td-banner-wrap-full {display: none !important;}",
		"    html > body > * {pointer-events: auto !important;}"
	].join("\n");
if (false || (document.domain == "buh24.com.ua" || document.domain.substring(document.domain.indexOf(".buh24.com.ua") + 1) == "buh24.com.ua"))
	css += [
		"body > div[class^=\"mfp-\"] {display: none !important;}",
		"    html {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "bvedomosti.ru" || document.domain.substring(document.domain.indexOf(".bvedomosti.ru") + 1) == "bvedomosti.ru"))
	css += [
		"#art-main {background-image: none !important;}",
		"  .art-Header {display: none !important;}",
		"  .bg-top-menu {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "carambatv.ru" || document.domain.substring(document.domain.indexOf(".carambatv.ru") + 1) == "carambatv.ru"))
	css += " .content {background: none !important; padding: 0 !important;}";
if (false || (document.domain == "cars.ru" || document.domain.substring(document.domain.indexOf(".cars.ru") + 1) == "cars.ru"))
	css += [
		"a[href*=\"/adclick.php?bannerid=\"] {display: none !important;}",
		"    #main {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "casstudio.tv" || document.domain.substring(document.domain.indexOf(".casstudio.tv") + 1) == "casstudio.tv"))
	css += [
		".footer {margin-bottom: 0 !important;}"
	].join("\n");
if (false || (document.domain == "censor.net.ua" || document.domain.substring(document.domain.indexOf(".censor.net.ua") + 1) == "censor.net.ua"))
	css += [
		"body > .widget_header {padding-top: 60px !important;}",
		"    body > .widget_header .header_icons, body > .widget_header .lang_switcher, ",
		"    body > .widget_header .menu {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "cf.ua" || document.domain.substring(document.domain.indexOf(".cf.ua") + 1) == "cf.ua"))
	css += [
		".hamburger__overlay.no-close {display: none !important;}",
		"    .scroll-content.disable-scrolling, body.overflow--hidden {overflow:auto !important;}"
	].join("\n");
if (false || (document.domain == "champion.com.ua" || document.domain.substring(document.domain.indexOf(".champion.com.ua") + 1) == "champion.com.ua"))
	css += [
		"body > #app {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "championat.com" || document.domain.substring(document.domain.indexOf(".championat.com") + 1) == "championat.com"))
	css += [
		"html:not(#id) {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "chita.ru" || document.domain.substring(document.domain.indexOf(".chita.ru") + 1) == "chita.ru"))
	css += [
		"body {background: none !important; margin-top: 0 !important; padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "cinema-hd.ru" || document.domain.substring(document.domain.indexOf(".cinema-hd.ru") + 1) == "cinema-hd.ru") || (document.domain == "filmshd.club" || document.domain.substring(document.domain.indexOf(".filmshd.club") + 1) == "filmshd.club") || (document.domain == "hdlava.tv" || document.domain.substring(document.domain.indexOf(".hdlava.tv") + 1) == "hdlava.tv"))
	css += ".wrap {padding-top: 0 !important;}";
if (false || (document.domain == "comedyportal.net" || document.domain.substring(document.domain.indexOf(".comedyportal.net") + 1) == "comedyportal.net"))
	css += [
		"iframe[src*=\"cvid.kiev.ua\"] {",
		"        height: 415px !important",
		"    }"
	].join("\n");
if (false || (document.domain == "comments.ua" || document.domain.substring(document.domain.indexOf(".comments.ua") + 1) == "comments.ua"))
	css += [
		".back_bottom {cursor: auto !important;}",
		"    .back_bottom > * {pointer-events: auto !important;}",
		"    .back_bottom {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "creativportal.ru" || document.domain.substring(document.domain.indexOf(".creativportal.ru") + 1) == "creativportal.ru"))
	css += [
		" .pocaz {width: 10px !important; height: 10px !important; position: fixed !important; top: -100px !important;}"
	].join("\n");
if (false || (document.domain == "ctv7.ru" || document.domain.substring(document.domain.indexOf(".ctv7.ru") + 1) == "ctv7.ru"))
	css += [
		"body > .site {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "cyberforum.ru" || document.domain.substring(document.domain.indexOf(".cyberforum.ru") + 1) == "cyberforum.ru"))
	css += [
		"body > div[style*=\"width\"][style*=\"margin\"] {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "doramy.su" || document.domain.substring(document.domain.indexOf(".doramy.su") + 1) == "doramy.su"))
	css += [
		".wrapper > .main-menu {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "dostfilms.net" || document.domain.substring(document.domain.indexOf(".dostfilms.net") + 1) == "dostfilms.net"))
	css += [
		".header {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "dota2.ru" || document.domain.substring(document.domain.indexOf(".dota2.ru") + 1) == "dota2.ru"))
	css += [
		"html:not(#id) > body > [id]:not([style]) {background-image: none !important; padding-top: 0 !important;}",
		"    #adsincont, .main-b-right-c-right > .m-memes ~ *, .subline ~ :not([id=\"navigation\"]):not([class=\"page-width\"]), ",
		"    [class$=\"sidebar\"] > :not(section):not(.section), ",
		"    body > [id] > div[class] > div:not([id]):not([class]):not([style]) > a[href][target=\"_blank\"], ",
		"    div[class^=\"b\"][class*=\"anners\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "drahelas.ru" || document.domain.substring(document.domain.indexOf(".drahelas.ru") + 1) == "drahelas.ru"))
	css += [
		".forumAd {height: 1px !important;}",
		"    .adb, .navbar_notice {position: fixed !important; transform: scale(0) !important;}"
	].join("\n");
if (false || (document.domain == "draug.ru" || document.domain.substring(document.domain.indexOf(".draug.ru") + 1) == "draug.ru") || (document.domain == "vargr.ru" || document.domain.substring(document.domain.indexOf(".vargr.ru") + 1) == "vargr.ru"))
	css += [
		"#timer_2 {display: block !important;}",
		"    #timer_1 {display: none !important;}"
	].join("\n");
if (false || (document.domain == "drive.ru" || document.domain.substring(document.domain.indexOf(".drive.ru") + 1) == "drive.ru"))
	css += "body > div {background: none !important; padding-top: 0 !important;}";
if (false || (document.domain == "nnm.ru" || document.domain.substring(document.domain.indexOf(".nnm.ru") + 1) == "nnm.ru") || (document.domain == "dugtor.org" || document.domain.substring(document.domain.indexOf(".dugtor.org") + 1) == "dugtor.org") || (document.domain == "nnm2.com" || document.domain.substring(document.domain.indexOf(".nnm2.com") + 1) == "nnm2.com") || (document.domain == "mynnm.ru" || document.domain.substring(document.domain.indexOf(".mynnm.ru") + 1) == "mynnm.ru") || (document.domain == "txapela.ru" || document.domain.substring(document.domain.indexOf(".txapela.ru") + 1) == "txapela.ru") || (document.domain == "adderall.ru" || document.domain.substring(document.domain.indexOf(".adderall.ru") + 1) == "adderall.ru") || (document.domain == "rkna.xyz" || document.domain.substring(document.domain.indexOf(".rkna.xyz") + 1) == "rkna.xyz") || (document.domain == "investxp.ru" || document.domain.substring(document.domain.indexOf(".investxp.ru") + 1) == "investxp.ru"))
	css += [
		"body > #page {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "dugtor.org" || document.domain.substring(document.domain.indexOf(".dugtor.org") + 1) == "dugtor.org") || (document.domain == "dugtor.ru" || document.domain.substring(document.domain.indexOf(".dugtor.ru") + 1) == "dugtor.ru"))
	css += [
		"#left-block, #right-block {min-height: 100% !important;}"
	].join("\n");
if (false || (document.domain == "dynamo.kiev.ua" || document.domain.substring(document.domain.indexOf(".dynamo.kiev.ua") + 1) == "dynamo.kiev.ua") || (document.domain == "ringside24.com" || document.domain.substring(document.domain.indexOf(".ringside24.com") + 1) == "ringside24.com"))
	css += [
		".fader-social {display: none !important;}",
		"    .social-open {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "e.mail.ru" || document.domain.substring(document.domain.indexOf(".e.mail.ru") + 1) == "e.mail.ru"))
	css += [
		"#LEGO #leftcol-banners, #LEGO .b-rb, #LEGO div[id^=\"preload_banner\"] {display: none !important;}",
		"    #LEGO > .b-sticky:first-child {width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "e.mail.ru" || document.domain.substring(document.domain.indexOf(".e.mail.ru") + 1) == "e.mail.ru") || (document.domain == "octavius.mail.ru" || document.domain.substring(document.domain.indexOf(".octavius.mail.ru") + 1) == "octavius.mail.ru"))
	css += [
		"body.page .layout__column_right > :not(.feedback-banner) {display: none !important;}",
		"    .application-mail__wrap > .layout > .layout__main-frame {margin-right: 0 !important;}"
	].join("\n");
if (false || (document.domain == "economistua.com" || document.domain.substring(document.domain.indexOf(".economistua.com") + 1) == "economistua.com"))
	css += [
		".wdpu-container, .wpmui-overlay {display: none !important;}",
		"    body, html {padding-top: 0 !important; background: whitesmoke !important; overflow: auto !important; pointer-events: none !important;}",
		"    body > * {pointer-events: auto !important;}"
	].join("\n");
if (false || (document.domain == "eksmo.ru" || document.domain.substring(document.domain.indexOf(".eksmo.ru") + 1) == "eksmo.ru") || (document.domain == "lenta.ru" || document.domain.substring(document.domain.indexOf(".lenta.ru") + 1) == "lenta.ru") || (document.domain == "live-rutor.org" || document.domain.substring(document.domain.indexOf(".live-rutor.org") + 1) == "live-rutor.org") || (document.domain == "liverutor.org" || document.domain.substring(document.domain.indexOf(".liverutor.org") + 1) == "liverutor.org") || (document.domain == "new-rutor.org" || document.domain.substring(document.domain.indexOf(".new-rutor.org") + 1) == "new-rutor.org") || (document.domain == "the-rutor.org" || document.domain.substring(document.domain.indexOf(".the-rutor.org") + 1) == "the-rutor.org"))
	css += [
		"body {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "epravda.com.ua" || document.domain.substring(document.domain.indexOf(".epravda.com.ua") + 1) == "epravda.com.ua"))
	css += [
		" body {cursor: auto !important;}",
		"  body > div[align=\"center\"] {width: auto !important; margin: 0 !important;}"
	].join("\n");
if (false || (document.domain == "epravda.com.ua" || document.domain.substring(document.domain.indexOf(".epravda.com.ua") + 1) == "epravda.com.ua") || (document.domain == "fast-torrent.co" || document.domain.substring(document.domain.indexOf(".fast-torrent.co") + 1) == "fast-torrent.co") || (document.domain == "kino-dom.tv" || document.domain.substring(document.domain.indexOf(".kino-dom.tv") + 1) == "kino-dom.tv") || (document.domain == "online-freebee.club" || document.domain.substring(document.domain.indexOf(".online-freebee.club") + 1) == "online-freebee.club") || (document.domain == "seasonvar.be" || document.domain.substring(document.domain.indexOf(".seasonvar.be") + 1) == "seasonvar.be") || (document.domain == "seasonvar.re" || document.domain.substring(document.domain.indexOf(".seasonvar.re") + 1) == "seasonvar.re") || (document.domain == "seasonvar.ru" || document.domain.substring(document.domain.indexOf(".seasonvar.ru") + 1) == "seasonvar.ru") || (document.domain == "uniondht.org" || document.domain.substring(document.domain.indexOf(".uniondht.org") + 1) == "uniondht.org"))
	css += [
		"body:not(#id), html:not(#id) {padding: 0 !important;}"
	].join("\n");
if (false || (document.domain == "espreso.tv" || document.domain.substring(document.domain.indexOf(".espreso.tv") + 1) == "espreso.tv"))
	css += [
		"#disqus_thread {min-width: 700px !important;}"
	].join("\n");
if (false || (document.domain == "euro-football.ru" || document.domain.substring(document.domain.indexOf(".euro-football.ru") + 1) == "euro-football.ru") || (document.domain == "forums.rusmedserv.com" || document.domain.substring(document.domain.indexOf(".forums.rusmedserv.com") + 1) == "forums.rusmedserv.com") || (document.domain == "liveresult.ru" || document.domain.substring(document.domain.indexOf(".liveresult.ru") + 1) == "liveresult.ru"))
	css += [
		"body > div[id]:not([class])[style=\"display: block;\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "fainaidea.com" || document.domain.substring(document.domain.indexOf(".fainaidea.com") + 1) == "fainaidea.com"))
	css += [
		"body > .container-fluid > #td-outer-wrap > *, body > .container-fluid > * {pointer-events: auto !important;}",
		"    body > .container-fluid, body > .container-fluid > #td-outer-wrap {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "fast-film.ru" || document.domain.substring(document.domain.indexOf(".fast-film.ru") + 1) == "fast-film.ru") || (document.domain == "fast-torrent.club" || document.domain.substring(document.domain.indexOf(".fast-torrent.club") + 1) == "fast-torrent.club") || (document.domain == "fast-torrent.ru" || document.domain.substring(document.domain.indexOf(".fast-torrent.ru") + 1) == "fast-torrent.ru") || (document.domain == "fast-torrent.su" || document.domain.substring(document.domain.indexOf(".fast-torrent.su") + 1) == "fast-torrent.su") || (document.domain == "filmopotok.ru" || document.domain.substring(document.domain.indexOf(".filmopotok.ru") + 1) == "filmopotok.ru") || (document.domain == "filmpotok.ru" || document.domain.substring(document.domain.indexOf(".filmpotok.ru") + 1) == "filmpotok.ru") || (document.domain == "pickfilm.ru" || document.domain.substring(document.domain.indexOf(".pickfilm.ru") + 1) == "pickfilm.ru") || (document.domain == "veleto.ru" || document.domain.substring(document.domain.indexOf(".veleto.ru") + 1) == "veleto.ru"))
	css += [
		"body {background: white !important; padding-top: 0px !important;}",
		"  body{background: url(\'\') !important;}",
		" body{background-image: url(\" \") !important;}",
		" .traforet-br-logo, div[id^=\"b_pr_\"] {background-image: url(\" \") !important;}",
		" .traforet-br-logo, div[id^=\"b_pr_\"] {background-url: none !important;}",
		"    #container {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "fclmnews.ru" || document.domain.substring(document.domain.indexOf(".fclmnews.ru") + 1) == "fclmnews.ru"))
	css += [
		".site {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "filetor.org" || document.domain.substring(document.domain.indexOf(".filetor.org") + 1) == "filetor.org"))
	css += [
		"html > body {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "filmitorrent.net" || document.domain.substring(document.domain.indexOf(".filmitorrent.net") + 1) == "filmitorrent.net") || (document.domain == "filmitorrent.xyz" || document.domain.substring(document.domain.indexOf(".filmitorrent.xyz") + 1) == "filmitorrent.xyz"))
	css += [
		"a[href^=\"/a\"][href$=\"html\"][target=\"_blank\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "films-online.club" || document.domain.substring(document.domain.indexOf(".films-online.club") + 1) == "films-online.club"))
	css += [
		".body-wrap > #content {margin-top:42px !important;}"
	].join("\n");
if (false || (document.domain == "firepic.org" || document.domain.substring(document.domain.indexOf(".firepic.org") + 1) == "firepic.org"))
	css += [
		".span12 {clear: both !important;}",
		"    .container, .row {max-width: none !important;}",
		"    body {padding: 0 !important; background-image: none !important;}",
		"    .row {padding: 30px !important; margin: 0 !important;}",
		"    .container {width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "fishki.net" || document.domain.substring(document.domain.indexOf(".fishki.net") + 1) == "fishki.net"))
	css += "#container {cursor: auto !important;}";
if (false || (document.domain == "footballhd.ru" || document.domain.substring(document.domain.indexOf(".footballhd.ru") + 1) == "footballhd.ru"))
	css += [
		"body > #header {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "forum.ixbt.com" || document.domain.substring(document.domain.indexOf(".forum.ixbt.com") + 1) == "forum.ixbt.com"))
	css += [
		".left.column > #question.dialog_thanks {left: 67% !important;}",
		"    .body_content_table > .left.column {margin-right: 0 !important; width: 100% !important;}",
		"    .fullscreen_branding ~ .body_content_table {margin-top: 0 !important; z-index: 0 !important;}",
		"    .body_wrapper {max-width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "forums.overclockers.ru" || document.domain.substring(document.domain.indexOf(".forums.overclockers.ru") + 1) == "forums.overclockers.ru"))
	css += [
		"tr > td[nowrap=\"nowrap\"][style=\"color: red;  font-weight: bold\"] {color: #004488 !important; font-weight: 200 !important;}"
	].join("\n");
if (false || (document.domain == "fototips.ru" || document.domain.substring(document.domain.indexOf(".fototips.ru") + 1) == "fototips.ru"))
	css += [
		".ftips-branding .td-main-page-wrap, .ftips-branding-ad + div, .ftips-branding.td_category_template_1 .td-category-header {padding-top: 5px !important;}"
	].join("\n");
if (false || (document.domain == "freefotohelp.ru" || document.domain.substring(document.domain.indexOf(".freefotohelp.ru") + 1) == "freefotohelp.ru") || (document.domain == "freeopenvpn.org" || document.domain.substring(document.domain.indexOf(".freeopenvpn.org") + 1) == "freeopenvpn.org") || (document.domain == "leninsw.info" || document.domain.substring(document.domain.indexOf(".leninsw.info") + 1) == "leninsw.info"))
	css += [
		".adsbygoogle {max-height: 2px !important;}"
	].join("\n");
if (false || (document.domain == "fullfilmhd.space" || document.domain.substring(document.domain.indexOf(".fullfilmhd.space") + 1) == "fullfilmhd.space") || (document.domain == "torrentum.me" || document.domain.substring(document.domain.indexOf(".torrentum.me") + 1) == "torrentum.me"))
	css += [
		"#wrapper {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "gagadget.com" || document.domain.substring(document.domain.indexOf(".gagadget.com") + 1) == "gagadget.com"))
	css += [
		".fader-social {display: none !important;}"
	].join("\n");
if (false || (document.domain == "gagadget.com" || document.domain.substring(document.domain.indexOf(".gagadget.com") + 1) == "gagadget.com") || (document.domain == "gazeta.ru" || document.domain.substring(document.domain.indexOf(".gazeta.ru") + 1) == "gazeta.ru") || (document.domain == "msn.com" || document.domain.substring(document.domain.indexOf(".msn.com") + 1) == "msn.com") || (document.domain == "ngs.ru" || document.domain.substring(document.domain.indexOf(".ngs.ru") + 1) == "ngs.ru") || (document.domain == "rambler.ru" || document.domain.substring(document.domain.indexOf(".rambler.ru") + 1) == "rambler.ru") || (document.domain == "www.eg.ru" || document.domain.substring(document.domain.indexOf(".www.eg.ru") + 1) == "www.eg.ru"))
	css += [
		"body:not(#id), html:not(#id) {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "game-pool.ru" || document.domain.substring(document.domain.indexOf(".game-pool.ru") + 1) == "game-pool.ru"))
	css += [
		"body:not(#id) {background-image: none !important;}",
		"    div[class^=\"container-content\"] > div[class^=\"obolox\"] {margin-top: 52px !important;}"
	].join("\n");
if (false || (document.domain == "gamebomb.ru" || document.domain.substring(document.domain.indexOf(".gamebomb.ru") + 1) == "gamebomb.ru"))
	css += [
		"#ssdfsd {background-image: none !important;}",
		"    .dfgdjkfgh {display: none !important;}",
		"    #content {padding-top: 0 !important; margin-top: 0 !important; pointer-events: none !important;}",
		"    #basic-content-container > * {pointer-events: auto !important;}"
	].join("\n");
if (false || (document.domain == "gamemag.ru" || document.domain.substring(document.domain.indexOf(".gamemag.ru") + 1) == "gamemag.ru"))
	css += [
		"body:not([class]) {background: #121212 !important;}"
	].join("\n");
if (false || (document.domain == "gametech.ru" || document.domain.substring(document.domain.indexOf(".gametech.ru") + 1) == "gametech.ru"))
	css += [
		"body {background: #eee !important;}"
	].join("\n");
if (false || (document.domain == "gastronom.ru" || document.domain.substring(document.domain.indexOf(".gastronom.ru") + 1) == "gastronom.ru"))
	css += [
		"body { cursor: auto !important;}",
		"  #wrapper {max-width: none !important;}"
	].join("\n");
if (false || (document.domain == "gazeta.ru" || document.domain.substring(document.domain.indexOf(".gazeta.ru") + 1) == "gazeta.ru"))
	css += [
		"#article_main_video.m_frame_fixed {opacity: 0 !important; z-index: -10 !important;}",
		"    .sausage-list-maintheme.maintheme-flow .sausage-list-item:first-child {z-index: 1 !important;}"
	].join("\n");
if (false || (document.domain == "gazeta.ru" || document.domain.substring(document.domain.indexOf(".gazeta.ru") + 1) == "gazeta.ru") || (document.domain == "rambler.ru" || document.domain.substring(document.domain.indexOf(".rambler.ru") + 1) == "rambler.ru"))
	css += [
		".stopper > #boxbox, .stopper > #boxfade {display: none !important;}"
	].join("\n");
if (false || (document.domain == "gazeta.ua" || document.domain.substring(document.domain.indexOf(".gazeta.ua") + 1) == "gazeta.ua"))
	css += [
		"#header-wrapper > header > *, body > * {pointer-events: auto !important;}",
		"    #header-wrapper > header, body {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "gidonline.in" || document.domain.substring(document.domain.indexOf(".gidonline.in") + 1) == "gidonline.in"))
	css += [
		"#headerline {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "glavnoe.ua" || document.domain.substring(document.domain.indexOf(".glavnoe.ua") + 1) == "glavnoe.ua"))
	css += [
		"#main-block > .content-block {margin: auto !important;}"
	].join("\n");
if (false || (document.domain == "go.mail.ru" || document.domain.substring(document.domain.indexOf(".go.mail.ru") + 1) == "go.mail.ru"))
	css += [
		"[class^=\"response\"][class$=\"_wrapper\"] > [id^=\"js-\"][id$=\"Block\"] > :first-child {display: none !important;}"
	].join("\n");
if (false || (document.domain == "goclips.tv" || document.domain.substring(document.domain.indexOf(".goclips.tv") + 1) == "goclips.tv"))
	css += " .video_content {height: auto !important;}";
if (false || (document.domain == "goha.ru" || document.domain.substring(document.domain.indexOf(".goha.ru") + 1) == "goha.ru"))
	css += [
		"#stickybar > div[style^=\"margin-top\"], div[onclick^=\"truemedia_callback\"], header.header {display: none !important;}",
		"    #site {padding-top: 20px !important;}",
		"#full-brand {background-image: none !important;}",
		"    #full-brand-footer > div[style*=\"fixed\"], #head-tuppy > a {display: none !important;}",
		"    #head-tuppy {height: 7px !important;}",
		"    #banner {display: none !important;}"
	].join("\n");
if (false || (document.domain == "goodgame.ru" || document.domain.substring(document.domain.indexOf(".goodgame.ru") + 1) == "goodgame.ru"))
	css += [
		".main-block .main-inner-wrap {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "gotps3.ru" || document.domain.substring(document.domain.indexOf(".gotps3.ru") + 1) == "gotps3.ru"))
	css += "#Page {margin-top: 0 !important;}";
if (false || (document.domain == "gstv.ru" || document.domain.substring(document.domain.indexOf(".gstv.ru") + 1) == "gstv.ru"))
	css += ".page-content {margin-top: 0 !important;}";
if (false || (document.domain == "gtavicecity.ru" || document.domain.substring(document.domain.indexOf(".gtavicecity.ru") + 1) == "gtavicecity.ru"))
	css += [
		".wrapper-body {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "happy-hack.ru" || document.domain.substring(document.domain.indexOf(".happy-hack.ru") + 1) == "happy-hack.ru"))
	css += [
		"body:not(#id) > table[id^=\"blockblock\"] {display: none !important;}",
		"    body:not(#id) > [id^=\"blockblock\"] {visibility: visible !important; display: block !important;}"
	].join("\n");
if (false || (document.domain == "hd720kino.ru" || document.domain.substring(document.domain.indexOf(".hd720kino.ru") + 1) == "hd720kino.ru"))
	css += [
		".wrap {background: none !important;}",
		"    .main.center {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "hdfilms.tv" || document.domain.substring(document.domain.indexOf(".hdfilms.tv") + 1) == "hdfilms.tv"))
	css += " #subheader{padding-top: 1px !important;}";
if (false || (document.domain == "hdkinoclub.com" || document.domain.substring(document.domain.indexOf(".hdkinoclub.com") + 1) == "hdkinoclub.com"))
	css += [
		"#faac {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "hdlava.me" || document.domain.substring(document.domain.indexOf(".hdlava.me") + 1) == "hdlava.me"))
	css += [
		"body > header {margin-bottom: 0 !important;}"
	].join("\n");
if (false || (document.domain == "hdtochka.club" || document.domain.substring(document.domain.indexOf(".hdtochka.club") + 1) == "hdtochka.club"))
	css += [
		"body > .wrapp {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "hentaiz.org" || document.domain.substring(document.domain.indexOf(".hentaiz.org") + 1) == "hentaiz.org"))
	css += [
		"body {background: #4ba1ba !important;}",
		"    .toporg {height: 0 !important;}"
	].join("\n");
if (false || (document.domain == "hi-fi.ru" || document.domain.substring(document.domain.indexOf(".hi-fi.ru") + 1) == "hi-fi.ru"))
	css += [
		"body {background: none !important;}"
	].join("\n");
if (false || (document.domain == "hi-news.ru" || document.domain.substring(document.domain.indexOf(".hi-news.ru") + 1) == "hi-news.ru") || (document.domain == "kino-teatr.ua" || document.domain.substring(document.domain.indexOf(".kino-teatr.ua") + 1) == "kino-teatr.ua") || (document.domain == "serialbox.org" || document.domain.substring(document.domain.indexOf(".serialbox.org") + 1) == "serialbox.org"))
	css += [
		"body {background: none !important;}"
	].join("\n");
if (false || (document.domain == "hi-tech.mail.ru" || document.domain.substring(document.domain.indexOf(".hi-tech.mail.ru") + 1) == "hi-tech.mail.ru"))
	css += [
		".cols_margin .link-hdr {display: none !important;}",
		"    #portal-menu, .header-banner {margin: 0 !important;}"
	].join("\n");
if (false || (document.domain == "hosgeldi.com" || document.domain.substring(document.domain.indexOf(".hosgeldi.com") + 1) == "hosgeldi.com") || (document.domain == "list-org.com" || document.domain.substring(document.domain.indexOf(".list-org.com") + 1) == "list-org.com"))
	css += [
		".adsbygoogle {position: fixed !important; top: -10000px !important;}"
	].join("\n");
if (false || (document.domain == "hotline.ua" || document.domain.substring(document.domain.indexOf(".hotline.ua") + 1) == "hotline.ua"))
	css += [
		".reset-scroll:before, div[data-lightbox-id=\"product-fast-question\"] {display: none !important;}",
		"    .reset-scroll {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "houzz.ru" || document.domain.substring(document.domain.indexOf(".houzz.ru") + 1) == "houzz.ru"))
	css += [
		".modal.in.modal-vc {display: none !important;}",
		"   body.modal-open, html {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "hs-manacost.ru" || document.domain.substring(document.domain.indexOf(".hs-manacost.ru") + 1) == "hs-manacost.ru"))
	css += [
		"body {background-image: none !important; background-color: whitesmoke !important;}",
		"    #td-outer-wrap > *, body > * {pointer-events: auto !important;}",
		"    #td-outer-wrap, body {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "igromania.ru" || document.domain.substring(document.domain.indexOf(".igromania.ru") + 1) == "igromania.ru"))
	css += [
		"body > .outer_outer > .outer_inner {background: #dedede !important;}",
		"  .wrapper_outer > .wide_brand, .wrapper_outer > .wide_brand ~ div:not([id]):not([class]) + style + div[class] {display: none !important;}",
		"    .outer_inner > .wrapper_outer > div[class] {height: auto !important; min-height: auto !important;}"
	].join("\n");
if (false || (document.domain == "infocar.ua" || document.domain.substring(document.domain.indexOf(".infocar.ua") + 1) == "infocar.ua"))
	css += [
		"#totalbg {background-image: none !important;}"
	].join("\n");
if (false || (document.domain == "infomama.com.ua" || document.domain.substring(document.domain.indexOf(".infomama.com.ua") + 1) == "infomama.com.ua"))
	css += [
		"#logo {display: none !important;}",
		"    #headerMover #headerProxy {height: 50px !important;}"
	].join("\n");
if (false || (document.domain == "infpol.ru" || document.domain.substring(document.domain.indexOf(".infpol.ru") + 1) == "infpol.ru"))
	css += [
		" .header {height: 60px !important;}",
		"  .header__stick {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "investing.com" || document.domain.substring(document.domain.indexOf(".investing.com") + 1) == "investing.com"))
	css += [
		"#PromoteSignUpPopUp, #abPopup {display: none !important;}",
		"    body {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "iphones.ru" || document.domain.substring(document.domain.indexOf(".iphones.ru") + 1) == "iphones.ru"))
	css += "#contentShifter {height: 127px!important;}";
if (false || (document.domain == "www.ivi.ru" || document.domain.substring(document.domain.indexOf(".www.ivi.ru") + 1) == "www.ivi.ru"))
	css += [
		"body.watch > div[class]:not([id]):not([style]):nth-child(-n+2) {background: none !important;}",
		"    body.watch > div[class]:not([id]):not([style]):nth-child(-n+2) > style + .content {display: none !important;}",
		"    body.watch > header.ivi-top {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "izzylaif.com" || document.domain.substring(document.domain.indexOf(".izzylaif.com") + 1) == "izzylaif.com"))
	css += [
		".adsbygoogle {height: 1px !important; opacity: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kaluga-poisk.ru" || document.domain.substring(document.domain.indexOf(".kaluga-poisk.ru") + 1) == "kaluga-poisk.ru"))
	css += [
		"body:not(#id) {background: whitesmoke !important;}"
	].join("\n");
if (false || (document.domain == "kg-portal.ru" || document.domain.substring(document.domain.indexOf(".kg-portal.ru") + 1) == "kg-portal.ru"))
	css += [
		" body {background-image: none !important; background: #bdbdbd !important;}",
		"    .ten_topbar + div:not(.ten_ears_wrap), ",
		"    .ten_topbar ~ div[class]:not([id]):nth-child(-n+10):not(.ten_ears_wrap):not(.content_wrap):not(.footer_wrap) {display: none !important;}",
		"    .ten_ears_wrap {margin: 35px auto 0 auto !important;}"
	].join("\n");
if (false || (document.domain == "kino-dom.tv" || document.domain.substring(document.domain.indexOf(".kino-dom.tv") + 1) == "kino-dom.tv"))
	css += " #main {width: auto !important;}";
if (false || (document.domain == "kino-full.ru" || document.domain.substring(document.domain.indexOf(".kino-full.ru") + 1) == "kino-full.ru"))
	css += [
		"#wrapper {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kino-hdfilm.com" || document.domain.substring(document.domain.indexOf(".kino-hdfilm.com") + 1) == "kino-hdfilm.com"))
	css += [
		"#content-bar {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kino-v-online.tv" || document.domain.substring(document.domain.indexOf(".kino-v-online.tv") + 1) == "kino-v-online.tv"))
	css += [
		".header_l {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinoafisha.info" || document.domain.substring(document.domain.indexOf(".kinoafisha.info") + 1) == "kinoafisha.info"))
	css += [
		"body.main:not(#id) {background: #141414 !important; overflow: visible !important;}",
		"    .main_frame {background: none !important;}",
		"    .popup-illumination {display: none !important;}"
	].join("\n");
if (false || (document.domain == "kinoakter.net" || document.domain.substring(document.domain.indexOf(".kinoakter.net") + 1) == "kinoakter.net"))
	css += [
		"body > div[class^=\"wrapper\"] {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinobars.net" || document.domain.substring(document.domain.indexOf(".kinobars.net") + 1) == "kinobars.net"))
	css += [
		".wrapper > .header {padding: 30px !important;}"
	].join("\n");
if (false || (document.domain == "kinobos.org" || document.domain.substring(document.domain.indexOf(".kinobos.org") + 1) == "kinobos.org"))
	css += [
		".wrapper > .wrap {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinogb.mobi" || document.domain.substring(document.domain.indexOf(".kinogb.mobi") + 1) == "kinogb.mobi"))
	css += [
		"body {background: whitesmoke !important;}",
		"    .linheader {display: none !important;}",
		"    .header {height: 120px !important;}"
	].join("\n");
if (false || (document.domain == "kinogo-hit.com" || document.domain.substring(document.domain.indexOf(".kinogo-hit.com") + 1) == "kinogo-hit.com"))
	css += [
		".contener {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinokladovka.com" || document.domain.substring(document.domain.indexOf(".kinokladovka.com") + 1) == "kinokladovka.com"))
	css += [
		".b-background {background: none !important; padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinokrad.su" || document.domain.substring(document.domain.indexOf(".kinokrad.su") + 1) == "kinokrad.su"))
	css += [
		"#wrapper:not(#id) {margin-top: 46px !important;}"
	].join("\n");
if (false || (document.domain == "kinomania.ru" || document.domain.substring(document.domain.indexOf(".kinomania.ru") + 1) == "kinomania.ru"))
	css += [
		".outer {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinopoisk.ru" || document.domain.substring(document.domain.indexOf(".kinopoisk.ru") + 1) == "kinopoisk.ru"))
	css += [
		" body{background: none !important;}",
	// !!	" body{background: #C0C0C0 !important; overflow: auto !important;}",
		"    html:not(#id) > body:not(#id) {background-color: #d5d5d5 !important; overflow: auto !important;}",
		"    .randomMovie .movieBlock {background-color: white !important;}",
		"    body > .app-container, html:not(#id) {background: none !important;}",
	// !!	" body{background: url(\'\') !important;}",
		" html[style] {background-image: url(\'\') !important;}",
		" #top .png_block, #GoUpClickZone{background: url(\'\') !important;}",
		"  #top {height: 100px !important;}",
		"  .master {top: 1px !important;}",
		"  .menu {top: 1px !important;}",
		"  DIV[class=\"wrap_form\"] > DIV[id=\"external_header_wrapper\"] > DIV[id=\"partial_component__header\"] > DIV[class] > DIV > DIV[class*=\"_visible_show\"] {display: none !important;}",
// !! выравниваем секцию поиск:
	//	" #top_form {top: 2px !important;}",
	//	" #top .png_block {top: 2px !important;}",
		" #top_form, #top .menu, #top .png_block {top: 0 !important;}",
// !! расширяем полезную площадь
		" #content_block, .contentBlock1, .shadow, #top, #top .png_block, .block_left_padtop, #photoInfoTable{width: 100% !important;}",
		" div[id\*=\"div_review_\"]{width: 98% !important;}",
		" .brand_words, p[id\^=\"ext_text_\"], ._reachbanner_ {width: 100% !important;}",
		" .reviewItem, .userReview, p[id\^=\"ext_text_\"][data-find], span._reachbanner_ {width: 100% !important;}",
		" div#content_block.contentBlock0 > table {margin: 0 0 !important;}",
		" div#content_block.contentBlock1 > table {width: 95% !important;}",
		" div#content_block.contentBlock1 > table > tbody[data-find] > tr[data-find] {width: 95% !important;}",
		" div.contentBlock1 > table {width: 95% !important;}",
		" div.wrap_form > div#external_header_wrapper {position: relative !important; background-color: #424242 !important;}",
		" #photoBlock {padding-left: 20px !important;}",
		" #photoInfoTable {width:95% !important;}",
		" div#nav_express {padding-left: 40px !important;}",
		" body>div[id=\"t20B_\"]{height:125px!important}",
		" body[class*=\"svg-background_yes\"]{background-position: none !important; background-repeat: none !important;}",
		"    body > div.shadow.shadow-restyle {box-shadow: #333 0 0 15px !important}",
		"    #top > div[id][style^=\"height: 210px\"], .rightTeaser > *, ",
		"    [class*=\"adblock-warning\"], div[class^=\"aNL\"], div[data-type=\"teaserspec\"] {display: none !important;}",
		"    .rightTeaser {height: 2px !important; margin-top: 0 !important;}",
		"    .app_app-width_default .app__header_margin-bottom_brand, .underheader-superbanner-wrapper, ",
		"    body > div[id]:not([class]):not([style]):not([id*=\"_\"]):not(#popup) {margin-bottom: 0 !important;}",
		"    html:not(#id) > body:not(#id) > #top {margin-bottom: auto !important;}",
		"    div[id][style*=\"min-height: 600px\"] > table[style*=\"margin\"] {margin-top: 0 !important;}",
		"    #top_3banners {margin-top: 20px !important;}",
		"    .profileInserts ~ form, .profileInserts ~ table[style] {margin-top: 30px !important;}",
		"    table[style=\"background-color: #fff; width: 850px; margin: 24px auto 0\"] {margin-top: auto !important;}",
		"    .branding, .kp-direct-customize {position: fixed !important; top: -10000px !important; left: -10000px !important;}",
		"    .profileInserts, .profileInsertsMenu {top: auto !important; margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinopad.net" || document.domain.substring(document.domain.indexOf(".kinopad.net") + 1) == "kinopad.net"))
	css += [
		".nif-cont > div {display: none !important;}"
	].join("\n");
if (false || (document.domain == "kinoprofi.vip" || document.domain.substring(document.domain.indexOf(".kinoprofi.vip") + 1) == "kinoprofi.vip"))
	css += [
		"body .header {padding-top: 0 !important;}",
		"    body .header .header-fixed {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinorezka.net" || document.domain.substring(document.domain.indexOf(".kinorezka.net") + 1) == "kinorezka.net"))
	css += [
		"body > .container {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinoshack.net" || document.domain.substring(document.domain.indexOf(".kinoshack.net") + 1) == "kinoshack.net") || (document.domain == "tree.tv" || document.domain.substring(document.domain.indexOf(".tree.tv") + 1) == "tree.tv"))
	css += [
		"body > .wrapper {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinostark.com" || document.domain.substring(document.domain.indexOf(".kinostark.com") + 1) == "kinostark.com"))
	css += [
		"nofollow > .container {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinoteatr.ru" || document.domain.substring(document.domain.indexOf(".kinoteatr.ru") + 1) == "kinoteatr.ru"))
	css += [
		"html > body {background-image: none !important; background-color: black !important;}",
		"    .branding-wrapper {display: none !important;}",
		"    .header_container {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kinotochka.club" || document.domain.substring(document.domain.indexOf(".kinotochka.club") + 1) == "kinotochka.club") || (document.domain == "kinotochka.me" || document.domain.substring(document.domain.indexOf(".kinotochka.me") + 1) == "kinotochka.me"))
	css += ".center-box2 {margin-top: 0!important;}";
if (false || (document.domain == "kinoxa.net" || document.domain.substring(document.domain.indexOf(".kinoxa.net") + 1) == "kinoxa.net") || (document.domain == "lordfilms.tv" || document.domain.substring(document.domain.indexOf(".lordfilms.tv") + 1) == "lordfilms.tv"))
	css += [
		"body > .wrap {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kirovnet.ru" || document.domain.substring(document.domain.indexOf(".kirovnet.ru") + 1) == "kirovnet.ru"))
	css += [
		".subbody2 {margin-top: 0 !important;}",
		"    .bg_container {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "kredos.com.ua" || document.domain.substring(document.domain.indexOf(".kredos.com.ua") + 1) == "kredos.com.ua") || (document.domain == "smartphone.ua" || document.domain.substring(document.domain.indexOf(".smartphone.ua") + 1) == "smartphone.ua"))
	css += [
		"#header {height: auto !important;}"
	].join("\n");
if (false || (document.domain == "kv.by" || document.domain.substring(document.domain.indexOf(".kv.by") + 1) == "kv.by"))
	css += [
		"#page {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "lenta.ru" || document.domain.substring(document.domain.indexOf(".lenta.ru") + 1) == "lenta.ru") || (document.domain == "ngs.ru" || document.domain.substring(document.domain.indexOf(".ngs.ru") + 1) == "ngs.ru") || (document.domain == "rambler.ru" || document.domain.substring(document.domain.indexOf(".rambler.ru") + 1) == "rambler.ru"))
	css += [
		".subscribe-popup {display: none !important;}"
	].join("\n");
if (false || (document.domain == "life.ru" || document.domain.substring(document.domain.indexOf(".life.ru") + 1) == "life.ru"))
	css += [
		".banner-mylife, .banner-mylife-backdrop, .banner-mylife-visible > div[class^=\"arcticmodal-\"], .nagscreen, body > .arcticmodal-overlay[style*=\"opacity: 0.6\"] {display: none !important;}",
		"    body:not(#id) {overflow: auto !important; margin-right: auto !important;}"
	].join("\n");
if (false || (document.domain == "live-rutor.org" || document.domain.substring(document.domain.indexOf(".live-rutor.org") + 1) == "live-rutor.org") || (document.domain == "liverutor.org" || document.domain.substring(document.domain.indexOf(".liverutor.org") + 1) == "liverutor.org") || (document.domain == "new-rutor.org" || document.domain.substring(document.domain.indexOf(".new-rutor.org") + 1) == "new-rutor.org") || (document.domain == "the-rutor.org" || document.domain.substring(document.domain.indexOf(".the-rutor.org") + 1) == "the-rutor.org"))
	css += [
		"body {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "lostfilmhd.ru" || document.domain.substring(document.domain.indexOf(".lostfilmhd.ru") + 1) == "lostfilmhd.ru"))
	css += [
		"#wrap {background-image: none !important;}"
	].join("\n");
if (false || (document.domain == "mail.rambler.ru" || document.domain.substring(document.domain.indexOf(".mail.rambler.ru") + 1) == "mail.rambler.ru"))
	css += [
		"div[class*=\"WithRightBarWrapper\"] > div[class*=\"AutoAppContainer\"] ~ * {display: none !important;}",
		"    div[class*=\"WithRightBarWrapper\"] > div[class*=\"AutoAppContainer\"] {max-width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "maxpark.com" || document.domain.substring(document.domain.indexOf(".maxpark.com") + 1) == "maxpark.com") || (document.domain == "newsland.com" || document.domain.substring(document.domain.indexOf(".newsland.com") + 1) == "newsland.com"))
	css += " .b-branding__wrap {padding: 0 !important;}";
if (false || (document.domain == "mediananny.com" || document.domain.substring(document.domain.indexOf(".mediananny.com") + 1) == "mediananny.com"))
	css += [
		"body {background-image: none !important; background: none !important; padding-top: 0 !important; cursor: auto !important;}"
	].join("\n");
if (false || (document.domain == "mel.fm" || document.domain.substring(document.domain.indexOf(".mel.fm") + 1) == "mel.fm"))
	css += [
		".i-layout_branding {background-image: none !important;}",
		"    .i-layout__branding-content-wrapper {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "mirf.ru" || document.domain.substring(document.domain.indexOf(".mirf.ru") + 1) == "mirf.ru"))
	css += [
		"#cb-bg-to {display: none !important;}",
		"    #cb-outer-container {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "mk.ru" || document.domain.substring(document.domain.indexOf(".mk.ru") + 1) == "mk.ru"))
	css += [
		"div[class^=\"Banner_right\"] {margin-bottom: 0 !important; padding-bottom: 0 !important;}"
	].join("\n");
if (false || (document.domain == "mobiltelefon.ru" || document.domain.substring(document.domain.indexOf(".mobiltelefon.ru") + 1) == "mobiltelefon.ru"))
	css += [
		"#main_tb {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "movieshok.ru" || document.domain.substring(document.domain.indexOf(".movieshok.ru") + 1) == "movieshok.ru"))
	css += [
		".wrapp_content {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "msn.com" || document.domain.substring(document.domain.indexOf(".msn.com") + 1) == "msn.com"))
	css += [
		".promobanner {display: none !important;}"
	].join("\n");
if (false || (document.domain == "music.yandex.by" || document.domain.substring(document.domain.indexOf(".music.yandex.by") + 1) == "music.yandex.by") || (document.domain == "music.yandex.kz" || document.domain.substring(document.domain.indexOf(".music.yandex.kz") + 1) == "music.yandex.kz") || (document.domain == "music.yandex.ru" || document.domain.substring(document.domain.indexOf(".music.yandex.ru") + 1) == "music.yandex.ru") || (document.domain == "music.yandex.ua" || document.domain.substring(document.domain.indexOf(".music.yandex.ua") + 1) == "music.yandex.ua"))
	css += [
		".page-root > div[class]:nth-child(-n+2)[style=\"display: block;\"], ",
		"    div[class^=\"sidebar\"] .no-ads {display: none !important;}"
	].join("\n");
if (false || (document.domain == "muzland.ru" || document.domain.substring(document.domain.indexOf(".muzland.ru") + 1) == "muzland.ru"))
	css += [
		"body { filter: none !important;}",
		"    .googlefull {height: 1px !important;}"
	].join("\n");
if (false || (document.domain == "muzofond.org" || document.domain.substring(document.domain.indexOf(".muzofond.org") + 1) == "muzofond.org"))
	css += [
		"body.branding .container .content { margin-top: 100px !important;}"
	].join("\n");
if (false || (document.domain == "my-hit.org" || document.domain.substring(document.domain.indexOf(".my-hit.org") + 1) == "my-hit.org"))
	css += [
		".navbar-default {margin-bottom: 0 !important;}"
	].join("\n");
if (false || (document.domain == "my-tfile.org" || document.domain.substring(document.domain.indexOf(".my-tfile.org") + 1) == "my-tfile.org") || (document.domain == "tfile.cc" || document.domain.substring(document.domain.indexOf(".tfile.cc") + 1) == "tfile.cc") || (document.domain == "tfile.co" || document.domain.substring(document.domain.indexOf(".tfile.co") + 1) == "tfile.co"))
	css += [
		".full #top_tools {padding-left: 0 !important;}",
		"    #head, #table_reduser {width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "my.mail.ru" || document.domain.substring(document.domain.indexOf(".my.mail.ru") + 1) == "my.mail.ru"))
	css += [
		".l-app__left, .l-app__right, :not(.l-common__container) > div[style*=\"position\"][style*=\"display\"][style*=\"visible\"][style*=\"opacity\"][style*=\"background-color\"], div[class*=\"mimic\"], div[class^=\"app-adv-\"], ",
		"    html.window-loaded .b-video-backscreen {display: none !important;}",
		"    html.window-loaded .b-video-controls__inside-play-button {visibility: visible !important; opacity: 0 !important; width: 100% !important; height: 100% !important; top: 0 !important; left: 0 !important;}"
	].join("\n");
if (false || (document.domain == "namba.kg" || document.domain.substring(document.domain.indexOf(".namba.kg") + 1) == "namba.kg"))
	css += [
		"html > body:not(#id) {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "namba.kz" || document.domain.substring(document.domain.indexOf(".namba.kz") + 1) == "namba.kz"))
	css += [
		"body {background: #e8ecff !important;}"
	].join("\n");
if (false || (document.domain == "naruto-base.su" || document.domain.substring(document.domain.indexOf(".naruto-base.su") + 1) == "naruto-base.su"))
	css += [
		"[onclick=\"goTo(this)\"] {display: none !important;}",
		"    #all > div[id*=\"eader\"] {height: 1px !important; background: none !important;}",
		"    #all > div[id*=\"eader\"] > .right {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "naruto-brand.ru" || document.domain.substring(document.domain.indexOf(".naruto-brand.ru") + 1) == "naruto-brand.ru"))
	css += [
		"[style^=\"background:url(/img\"][style*=\"padding\"], ",
		"    a[href*=\"/test/\"][target=\"_blank\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "newdeaf-online.net" || document.domain.substring(document.domain.indexOf(".newdeaf-online.net") + 1) == "newdeaf-online.net"))
	css += [
		".player-drop, .player-section {display: block !important;}",
		"    .digit[style*=\"font-size\"], .player-section[style=\"background:none;\"] + .digit, .reklama.center.head {display: none !important;}"
	].join("\n");
if (false || (document.domain == "newkaliningrad.ru" || document.domain.substring(document.domain.indexOf(".newkaliningrad.ru") + 1) == "newkaliningrad.ru"))
	css += [
		"#page-wrapper {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "news.mail.ru" || document.domain.substring(document.domain.indexOf(".news.mail.ru") + 1) == "news.mail.ru") || (document.domain == "sportmail.ru" || document.domain.substring(document.domain.indexOf(".sportmail.ru") + 1) == "sportmail.ru"))
	css += [
		"div[data-module=\"LazyLoad.PromoPopup\"] .js-module.block {display: none !important;}"
	].join("\n");
if (false || (document.domain == "news.yandex.by" || document.domain.substring(document.domain.indexOf(".news.yandex.by") + 1) == "news.yandex.by") || (document.domain == "news.yandex.kz" || document.domain.substring(document.domain.indexOf(".news.yandex.kz") + 1) == "news.yandex.kz") || (document.domain == "news.yandex.ru" || document.domain.substring(document.domain.indexOf(".news.yandex.ru") + 1) == "news.yandex.ru") || (document.domain == "news.yandex.ua" || document.domain.substring(document.domain.indexOf(".news.yandex.ua") + 1) == "news.yandex.ua"))
	css += [
		".sticky_visible, .widget_for_rubrics-top[aria-labelledby] ~ *, ",
		"    [class*=\"_name_first\"], [class*=\"_name_footer\"], [class*=\"_name_main\"], ",
		"    [class*=\"_name_more\"], [class*=\"_name_top\"], [class*=\"_sticky_yes\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "newsone.ua" || document.domain.substring(document.domain.indexOf(".newsone.ua") + 1) == "newsone.ua"))
	css += [
		"body {background-image: none !important; background: none !important;}"
	].join("\n");
if (false || (document.domain == "nnm-club.me" || document.domain.substring(document.domain.indexOf(".nnm-club.me") + 1) == "nnm-club.me") || (document.domain == "nnmclub.to" || document.domain.substring(document.domain.indexOf(".nnmclub.to") + 1) == "nnmclub.to"))
	css += [
		"body > :first-child:not(div) {display: none !important;}",
		"    body > .wrap {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "noob-club.ru" || document.domain.substring(document.domain.indexOf(".noob-club.ru") + 1) == "noob-club.ru"))
	css += [
		"#header-b {margin-bottom: 11px !important;}"
	].join("\n");
if (false || (document.domain == "technogies.ru" || document.domain.substring(document.domain.indexOf(".technogies.ru") + 1) == "technogies.ru"))
	css += [
		"html > body:not(#id) {background: #abc4a1 !important;}",
		"    body > #page {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "obozrevatel.com" || document.domain.substring(document.domain.indexOf(".obozrevatel.com") + 1) == "obozrevatel.com"))
	css += [
		"body > .header {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "ok.ru" || document.domain.substring(document.domain.indexOf(".ok.ru") + 1) == "ok.ru"))
	css += [
		".dialogWrapperBanner {transform: scale(0) !important; opacity: 0 !important; pointer-events: none !important; position: fixed !important; top: -1000px !important;}"
	].join("\n");
if (false || (document.domain == "online.animedia.tv" || document.domain.substring(document.domain.indexOf(".online.animedia.tv") + 1) == "online.animedia.tv") || (document.domain == "tt.animedia.tv" || document.domain.substring(document.domain.indexOf(".tt.animedia.tv") + 1) == "tt.animedia.tv"))
	css += [
		".promo__wrapper {display: none !important;}",
		"    .main-container {margin-top: 80px !important;}"
	].join("\n");
if (false || (document.domain == "onlinelife.club" || document.domain.substring(document.domain.indexOf(".onlinelife.club") + 1) == "onlinelife.club"))
	css += [
		"iframe#iframe[src*=\"player\"] {height: 630px !important;}"
	].join("\n");
if (false || (document.domain == "oper.ru" || document.domain.substring(document.domain.indexOf(".oper.ru") + 1) == "oper.ru"))
	css += [
		"#wrapper {background-image: none !important; padding-bottom: 0 !important;}"
	].join("\n");
if (false || (document.domain == "optimakomp.ru" || document.domain.substring(document.domain.indexOf(".optimakomp.ru") + 1) == "optimakomp.ru"))
	css += [
		"#posts div[id^=\"ugolkrug\"] > div[style^=\"background-color\"] {background: none !important;}",
		"    #posts div[id^=\"ugolkrug\"] {box-shadow: none !important;}"
	].join("\n");
if (false || (document.domain == "otvet.mail.ru" || document.domain.substring(document.domain.indexOf(".otvet.mail.ru") + 1) == "otvet.mail.ru"))
	css += [
		"div[class][style=\"top: 56px;\"] > div > div ~ div {display: none !important;}"
	].join("\n");
if (false || (document.domain == "otzovik.com" || document.domain.substring(document.domain.indexOf(".otzovik.com") + 1) == "otzovik.com"))
	css += [
		"#ad_footer2, .adrev_block, .adsbygoogle, .product-contents #panel-right > *, ",
		"    .product-contents .review-contents ~ div[class] > *, ",
		"    .product-contents div[class*=\"bottom\"] > *, .product-header-right, ",
		"    .product-reviews-right > * {display: none !important;}"
	].join("\n");
if (false || (document.domain == "pb.wtf" || document.domain.substring(document.domain.indexOf(".pb.wtf") + 1) == "pb.wtf") || (document.domain == "piratbit.org" || document.domain.substring(document.domain.indexOf(".piratbit.org") + 1) == "piratbit.org") || (document.domain == "piratbit.ru" || document.domain.substring(document.domain.indexOf(".piratbit.ru") + 1) == "piratbit.ru"))
	css += [
		"div[id] > div[class][style^=\"width: 24\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "peka2.tv" || document.domain.substring(document.domain.indexOf(".peka2.tv") + 1) == "peka2.tv"))
	css += [
		".body--has-ad:before, advert-header-banner {display: none !important;}",
		"    .body--has-ad {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "penzainform.ru" || document.domain.substring(document.domain.indexOf(".penzainform.ru") + 1) == "penzainform.ru"))
	css += [
		"body {cursor: auto !important; pointer-events: none !important; background: whitesmoke !important;}",
		"    #divWrapper > * {pointer-events: auto !important;}",
		"    #divWrapper {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "playground.ru" || document.domain.substring(document.domain.indexOf(".playground.ru") + 1) == "playground.ru"))
	css += [
		"#foundationWrapper {background: #373737 !important;}"
	].join("\n");
if (false || (document.domain == "pluggedin.ru" || document.domain.substring(document.domain.indexOf(".pluggedin.ru") + 1) == "pluggedin.ru"))
	css += [
		".banner-advertise {margin-top: 0 !important;}",
		"    .open-main-container {margin-top: 60px !important;}"
	].join("\n");
if (false || (document.domain == "podrobno.uz" || document.domain.substring(document.domain.indexOf(".podrobno.uz") + 1) == "podrobno.uz"))
	css += [
		"#offerPopup {display: none !important;}",
		"    .main {margin-top: 0 !important;}",
		"    body {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "politobzor.net" || document.domain.substring(document.domain.indexOf(".politobzor.net") + 1) == "politobzor.net"))
	css += " .banner {height: 90px !important;}";
if (false || (document.domain == "pornreactor.cc" || document.domain.substring(document.domain.indexOf(".pornreactor.cc") + 1) == "pornreactor.cc"))
	css += [
		"#background, #container, body {background: #6d1700 !important; padding-top: 0 !important;}",
		"    #container > :not(#page) a[target^=\"_\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "povarenok.ru" || document.domain.substring(document.domain.indexOf(".povarenok.ru") + 1) == "povarenok.ru"))
	css += [
		"#header {background: #ffe168 !important;}",
		"    body {background: none !important;}",
		"    .lheader {display: none !important;}",
		"    #header {position: static !important;}"
	].join("\n");
if (false || (document.domain == "promodj.com" || document.domain.substring(document.domain.indexOf(".promodj.com") + 1) == "promodj.com"))
	css += " #topbrandingspot {padding-top: 0 !important;}";
if (false || (document.domain == "pronpic.org" || document.domain.substring(document.domain.indexOf(".pronpic.org") + 1) == "pronpic.org"))
	css += [
		".content > div[id][style=\"display: block;\"] {position: fixed !important; transform: scale(0) !important;}"
	].join("\n");
if (false || (document.domain == "prophotos.ru" || document.domain.substring(document.domain.indexOf(".prophotos.ru") + 1) == "prophotos.ru"))
	css += [
		"body:not(#id) {padding-top: 130px !important;}"
	].join("\n");
if (false || (document.domain == "prostoporno.vip" || document.domain.substring(document.domain.indexOf(".prostoporno.vip") + 1) == "prostoporno.vip"))
	css += [
		".has_adv .content_wrapper {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "pure-t.ru" || document.domain.substring(document.domain.indexOf(".pure-t.ru") + 1) == "pure-t.ru"))
	css += [
		".g1-header {top: 0 !important; position: relative !important;}"
	].join("\n");
if (false || (document.domain == "pvpru.com" || document.domain.substring(document.domain.indexOf(".pvpru.com") + 1) == "pvpru.com"))
	css += [
		".above_body > div[style] {height: auto !important;}",
		"    #ad_global_below_navbar, #header ~ * {position: fixed !important; transform: scale(0) !important; top: -10000px !important;}"
	].join("\n");
if (false || (document.domain == "radikal.ru" || document.domain.substring(document.domain.indexOf(".radikal.ru") + 1) == "radikal.ru"))
	css += [
		"body[style*=\"cursor\"] {background-image: none !important; pointer-events: none !important; position: relative !important;}",
		"    .render_body_main {margin-top: 0 !important;}",
		"    body[style*=\"cursor\"] .base-page_wrapper > * > * {pointer-events: auto !important;}"
	].join("\n");
if (false || (document.domain == "radiola.audio" || document.domain.substring(document.domain.indexOf(".radiola.audio") + 1) == "radiola.audio"))
	css += [
		".mh-container {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "razlozhi.ru" || document.domain.substring(document.domain.indexOf(".razlozhi.ru") + 1) == "razlozhi.ru"))
	css += [
		"body > span {display: none !important;}",
		"    body:not(#id) {margin-right: 0 !important;}",
		"    body > div[class][style^=\"background\"][style*=\"rgb\"][style*=\"width\"][style*=\"height\"] {width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "rbc.ru" || document.domain.substring(document.domain.indexOf(".rbc.ru") + 1) == "rbc.ru"))
	css += [
		".popup_push {display: none !important;}",
		"    .l-col-100h.half {height: auto !important; min-height: 0 !important;}"
	].join("\n");
if (false || (document.domain == "rbc.ru" || document.domain.substring(document.domain.indexOf(".rbc.ru") + 1) == "rbc.ru") || (document.domain == "sportrbc.ru" || document.domain.substring(document.domain.indexOf(".sportrbc.ru") + 1) == "sportrbc.ru"))
	css += [
		".g-banner__news-footer {min-height: 0 !important;}"
	].join("\n");
if (false || (document.domain == "ren.tv" || document.domain.substring(document.domain.indexOf(".ren.tv") + 1) == "ren.tv"))
	css += [
		"#container-main, #sidebar, .main-with-sidebar {min-height: 0 !important;}"
	].join("\n");
if (false || (document.domain == "rg-mechanics.org" || document.domain.substring(document.domain.indexOf(".rg-mechanics.org") + 1) == "rg-mechanics.org"))
	css += [
		".buttondown[href^=\"http\"]:not([href^=\"https://rg-mechanics.org/\"]):not([href^=\"http://rg-mechanics.org\"]) {display: none !important;}"
	].join("\n");
if (false || (document.domain == "ria.ru" || document.domain.substring(document.domain.indexOf(".ria.ru") + 1) == "ria.ru"))
	css += [
		".m-blur ~ #modalLayer {display: none !important;}",
		"    .m-blur {filter: none !important; position: relative !important;}"
	].join("\n");
if (false || (document.domain == "riotpixels.com" || document.domain.substring(document.domain.indexOf(".riotpixels.com") + 1) == "riotpixels.com"))
	css += [
		"body {background-image: none !important;}",
		"    body:not(#id) .all-wrapper, body:not(#id) .bottom-bar {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "root-nation.com" || document.domain.substring(document.domain.indexOf(".root-nation.com") + 1) == "root-nation.com"))
	css += [
		"body {cursor: auto !important;}",
		"    .backstretch {display: none !important;}",
		"    .td-header-wrap > *, body > #td-outer-wrap > :not(.td-header-wrap) {pointer-events: auto !important;}",
		"    body > #td-outer-wrap {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "rp5.by" || document.domain.substring(document.domain.indexOf(".rp5.by") + 1) == "rp5.by") || (document.domain == "rp5.kz" || document.domain.substring(document.domain.indexOf(".rp5.kz") + 1) == "rp5.kz") || (document.domain == "rp5.ru" || document.domain.substring(document.domain.indexOf(".rp5.ru") + 1) == "rp5.ru") || (document.domain == "rp5.ua" || document.domain.substring(document.domain.indexOf(".rp5.ua") + 1) == "rp5.ua"))
	css += [
		"#content > div[id]:nth-child(2) > div[id]:not([id*=\"-\"]):not([class]):nth-child(2) {min-height: 0 !important;}"
	].join("\n");
if (false || (document.domain == "rufilmtv.org" || document.domain.substring(document.domain.indexOf(".rufilmtv.org") + 1) == "rufilmtv.org"))
	css += [
		"#content:not(#id) {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "rufootballtv.org" || document.domain.substring(document.domain.indexOf(".rufootballtv.org") + 1) == "rufootballtv.org"))
	css += [
		"body > #branding {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "rusfootball.info" || document.domain.substring(document.domain.indexOf(".rusfootball.info") + 1) == "rusfootball.info"))
	css += [
		"#wrap {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "rusplt.ru" || document.domain.substring(document.domain.indexOf(".rusplt.ru") + 1) == "rusplt.ru"))
	css += [
		".popular > .item.hidden {display: block !important;}",
		"    #sidebar .moved_banners .moved_item {height: auto !important;}",
		"    .right_first_column, .sidebar > div[class] {min-height: 0 !important;}"
	].join("\n");
if (false || (document.domain == "sc2tv.ru" || document.domain.substring(document.domain.indexOf(".sc2tv.ru") + 1) == "sc2tv.ru"))
	css += [
		".main-frame {background:none !important; padding-top:0 !important; cursor:auto !important; pointer-events:none !important;}",
		"    #media {padding-bottom:0 !important;}",
		"    #wrapper > * {pointer-events:auto !important;}",
		"    #wrapper, .low-frame, .sub-frame {position: static !important; float: none !important; width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "season-var.net" || document.domain.substring(document.domain.indexOf(".season-var.net") + 1) == "season-var.net"))
	css += [
		"#main-wrapper {top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "semestr.ru" || document.domain.substring(document.domain.indexOf(".semestr.ru") + 1) == "semestr.ru"))
	css += [
		"body > .row {margin-left: 0 !important; margin-right: 0 !important;}"
	].join("\n");
if (false || (document.domain == "sergeistrelec.ru" || document.domain.substring(document.domain.indexOf(".sergeistrelec.ru") + 1) == "sergeistrelec.ru"))
	css += [
		"div[id][style^=\"background\"][style*=\"fixed\"][style*=\"z-index\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "simhost.org" || document.domain.substring(document.domain.indexOf(".simhost.org") + 1) == "simhost.org"))
	css += [
		".main {margin-top: 50px !important;}"
	].join("\n");
if (false || (document.domain == "sinoptik.ua" || document.domain.substring(document.domain.indexOf(".sinoptik.ua") + 1) == "sinoptik.ua"))
	css += [
		".informerTop, .rightAdvBox {position: fixed !important; top: -10000px !important;}"
	].join("\n");
if (false || (document.domain == "slushat-tekst-pesni.ru" || document.domain.substring(document.domain.indexOf(".slushat-tekst-pesni.ru") + 1) == "slushat-tekst-pesni.ru"))
	css += [
		".abp {transform: none !important; direction: ltr !important;}"
	].join("\n");
if (false || (document.domain == "smotri-filmi.cc" || document.domain.substring(document.domain.indexOf(".smotri-filmi.cc") + 1) == "smotri-filmi.cc"))
	css += [
		".broda {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "smotri.com" || document.domain.substring(document.domain.indexOf(".smotri.com") + 1) == "smotri.com"))
	css += [
		"#wrapper > #all {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "snob.ru" || document.domain.substring(document.domain.indexOf(".snob.ru") + 1) == "snob.ru"))
	css += [
		".promotion .h-layoutWide {cursor: auto !important;}"
	].join("\n");
if (false || (document.domain == "soccer.ru" || document.domain.substring(document.domain.indexOf(".soccer.ru") + 1) == "soccer.ru") || (document.domain == "soccer0010.com" || document.domain.substring(document.domain.indexOf(".soccer0010.com") + 1) == "soccer0010.com"))
	css += [
		"#site {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "softportal.com" || document.domain.substring(document.domain.indexOf(".softportal.com") + 1) == "softportal.com"))
	css += [
		"a[href^=\"prog\"][target=\"_blank\"], a[href^=\"prog\"][target=\"_blank\"] ~ *, ",
		"    td[style=\"width:341px; padding-right:15px;\"][valign=\"top\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "sovet.kidstaff.com.ua" || document.domain.substring(document.domain.indexOf(".sovet.kidstaff.com.ua") + 1) == "sovet.kidstaff.com.ua"))
	css += [
		"body {padding-top: 40px !important; background-image: none !important;}"
	].join("\n");
if (false || (document.domain == "sport-express.ru" || document.domain.substring(document.domain.indexOf(".sport-express.ru") + 1) == "sport-express.ru"))
	css += [
		"#show-popup {display: none !important;}",
		"    body.popup {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "spbvoditel.ru" || document.domain.substring(document.domain.indexOf(".spbvoditel.ru") + 1) == "spbvoditel.ru"))
	css += [
	//	!! расширяем
		" .main .content .right-col {width: 90% !important;}"
	].join("\n");
if (false || (document.domain == "sports.ru" || document.domain.substring(document.domain.indexOf(".sports.ru") + 1) == "sports.ru") || (document.domain == "tribuna.com" || document.domain.substring(document.domain.indexOf(".tribuna.com") + 1) == "tribuna.com"))
	css += [
		"html > body {background: #a7a7a7 !important;}",
		"    #branding-layout:not(#id), .page-layout {margin-top: 0 !important;}",
		"    #branding-layout:not(#id), body.img-bg {padding-top: 0 !important;}",
		"    [data-content-name=\"banner-static\"] {position: fixed !important; left: -10000px !important; transform: scale(0) !important; display: none !important;}",
		"    #branding-layout > a {width: 0 !important; height: 0 !important; left: -10000px !important;}",
		".kaspersky, .overall, #branding-layout {background: none !important;}",
	//	!!" body.img-bg, #branding-layout:not(#id) {background: #f5f8fa !important; padding-top: 0 !important;}",
		" #branding-layout {background: url(\'\') !important;}",
		".kaspersky, .pageLayout {top: 0px !important;}",
	// !! расширяем
		" .page-layout, .pageLayout{top: 0px !important; max-width: 2000px !important; }",
		" .content-wrapper, .columns-layout__main, .g-wrap-main, .layout-columns {width: 100% !important;}",
		" .main-wrap{width: 95% !important;}",
		" .box{width: 98% !important;}",
		" .mainPart{width: 80% !important;}",
		" .additional-block {width: 200px !important;}",
		" .rightPart {width: 20% !important;}",
		" .rightPart {margin-left: 80% !important;}",
		" .columns-layout__left + .columns-layout__main {max-width: 1100px !important;}",
		" #branding-layout{padding-top: 0px !important;}",
		" .tag-main-block .box {padding-right: 0px !important;}"
	].join("\n");
if (false || (document.domain == "spot.uz" || document.domain.substring(document.domain.indexOf(".spot.uz") + 1) == "spot.uz"))
	css += [
		"#header-dummy:not(#id) {min-height: 70px !important;}"
	].join("\n");
if (false || (document.domain == "stratege.ru" || document.domain.substring(document.domain.indexOf(".stratege.ru") + 1) == "stratege.ru"))
	css += [
		"html:not(#id) {background-image: none !important; background: #dbdbdb !important;}",
		"    .above_body {margin-bottom: auto !important;}",
		"    #globalcontent {padding-top: 0 !important;}",
		"    #wrapper > #content {padding-top: 40px !important;}"
	].join("\n");
if (false || (document.domain == "tarkov-wiki.ru" || document.domain.substring(document.domain.indexOf(".tarkov-wiki.ru") + 1) == "tarkov-wiki.ru"))
	css += [
		"html > div[class][style^=\"background-color: rgba\"] {display: none !important;}",
		"    html > body {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "technogies.ru" || document.domain.substring(document.domain.indexOf(".technogies.ru") + 1) == "technogies.ru"))
	css += [
		"html > body:not(#id) {background: #abc4a1 !important;}",
		"    body > #page {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "tehnot.com" || document.domain.substring(document.domain.indexOf(".tehnot.com") + 1) == "tehnot.com"))
	css += [
		"html > body {background-image: none !important; background-color: #e8e8e8 !important; cursor: auto !important;}",
		"    body > #td-outer-wrap > * {pointer-events: auto !important;}",
		"    body > #td-outer-wrap {pointer-events: none !important; cursor: auto !important;}"
	].join("\n");
if (false || (document.domain == "texterra.ru" || document.domain.substring(document.domain.indexOf(".texterra.ru") + 1) == "texterra.ru"))
	css += [
		"html {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "tricolor.tv" || document.domain.substring(document.domain.indexOf(".tricolor.tv") + 1) == "tricolor.tv"))
	css += [
		" {background-image: url(\" \") !important;}",
		" #allWrap {background: #dfdfdf !important;}",
		" .is-index-help, #allWrap {background: url(\" \") !important;}"
	].join("\n");
if (false || (document.domain == "torrentom.com" || document.domain.substring(document.domain.indexOf(".torrentom.com") + 1) == "torrentom.com"))
	css += [
		"#footer_reklama > *, body > :not(#footer_reklama) {pointer-events: auto !important;}",
		"    #footer_reklama, body {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "tort.fm" || document.domain.substring(document.domain.indexOf(".tort.fm") + 1) == "tort.fm"))
	css += "#topper_up {height: 88px !important;}";
if (false || (document.domain == "tnt-online.ru" || document.domain.substring(document.domain.indexOf(".tnt-online.ru") + 1) == "tnt-online.ru"))
	css += [
		"/*self-ads for bitblock*/",
		"  #contentShifter {display: none !important;}",
		"  #all {top: 15px !important;}"
    ].join("\n");
if (false || (document.domain == "tracktor.tv" || document.domain.substring(document.domain.indexOf(".tracktor.tv") + 1) == "tracktor.tv"))
	css += [
		".pagebg {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "turboserial.net" || document.domain.substring(document.domain.indexOf(".turboserial.net") + 1) == "turboserial.net"))
	css += [
		"body > div[class^=\"arcticmodal-\"] {",
		"        display: none !important",
		"    }",
		"    body:not(#id) {",
		"        overflow: auto !important",
		"    }"
	].join("\n");
if (false || (document.domain == "tv.yandex.by" || document.domain.substring(document.domain.indexOf(".tv.yandex.by") + 1) == "tv.yandex.by") || (document.domain == "tv.yandex.kz" || document.domain.substring(document.domain.indexOf(".tv.yandex.kz") + 1) == "tv.yandex.kz") || (document.domain == "tv.yandex.ru" || document.domain.substring(document.domain.indexOf(".tv.yandex.ru") + 1) == "tv.yandex.ru") || (document.domain == "tv.yandex.ua" || document.domain.substring(document.domain.indexOf(".tv.yandex.ua") + 1) == "tv.yandex.ua"))
	css += [
		".content_channel > .content__columns > .content__main ~ div[class*=\"content__\"] > *, ",
		"    .content_channel > .content__columns ~ :not(.content__columns):not(.bread-crumbs) > *, ",
		"    .content_channel > div[class]:not(.content__columns):not(.bread-crumbs) > :not(.content__header), ",
		"    .content_program > div[itemscope] > .content__columns > :not(.content__main) > *, ",
		"    .content_program > div[itemscope] > :not(.content__columns):not(.program-header) > *, ",
		"    .grid__item ~ .grid__item ~ div:not(.grid__item), ",
		"    .main-controller_grid-wrapper > .grid_period_now ~ * > *, ",
		"    body > #mount > div[class] > :not(header):not(main):not(footer) {display: none !important;}"
	].join("\n");
if (false || (document.domain == "tvzavr.ru" || document.domain.substring(document.domain.indexOf(".tvzavr.ru") + 1) == "tvzavr.ru"))
	css += [
		".page__inner_branding {background-image: none !important;}",
		"    .page__inner_branding > a {display: none !important;}",
		"    .page__inner_branding {padding-top: 100px !important;}"
	].join("\n");
if (false || (document.domain == "ua-cinema.com" || document.domain.substring(document.domain.indexOf(".ua-cinema.com") + 1) == "ua-cinema.com"))
	css += [
		"body {background: #091016 !important;}",
		"    .head-top {position: absolute !important;}"
	].join("\n");
if (false || (document.domain == "uniondht.org" || document.domain.substring(document.domain.indexOf(".uniondht.org") + 1) == "uniondht.org"))
	css += [
		".colorAdmin {color: black !important; font-weight: 100 !important; font-size: 8px !important;}"
	].join("\n");
if (false || (document.domain == "vgtimes.ru" || document.domain.substring(document.domain.indexOf(".vgtimes.ru") + 1) == "vgtimes.ru"))
	css += [
		"body {background-image: none !important;}",
		"    #bspromo, .adfshift, body > div[style^=\"position: absolute\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "videomore.ru" || document.domain.substring(document.domain.indexOf(".videomore.ru") + 1) == "videomore.ru"))
	css += [
		" .with-cookies-agreements .wrapper {margin-top: 120px !important;}",
		" body > .wrapper {padding-top: 0 !important;",
		" background-color: #ECEFF2 !important;}",
		" .wrapper.adfoxClickable {padding-top: 0 !important;",
		" background-image: none !important;",
		" pointer-events: none !important;",
		" background-color: #ECEFF2 !important;}",
		" .wrapper.adfoxClickable > div {pointer-events: auto !important;}",
		" .with-cookies-agreements .header {top: 0 !important;}",
		" .with-cookies-agreements .channels-line {top: calc(70px + 0px) !important;}"
	].join("\n");
if (false || (document.domain == "warfiles.ru" || document.domain.substring(document.domain.indexOf(".warfiles.ru") + 1) == "warfiles.ru"))
	css += "#header + .banner {height: 100px !important;}";
if (false || (document.domain == "vz.ru" || document.domain.substring(document.domain.indexOf(".vz.ru") + 1) == "vz.ru"))
	css += [
		" div.main-container{max-width: inherit !important;}",
		" div.main-menu > div.menu.sys_thumbs{overflow: inherit !important;}",
		" div.main-menu > div.menu.sys_thumbs > ul > li.thumb{margin-right: 0 !important;}",
		" div.menu{max-width: inherit !important;}"
    ].join("\n");
if (false || (document.domain == "webdesign-master.ru" || document.domain.substring(document.domain.indexOf(".webdesign-master.ru") + 1) == "webdesign-master.ru"))
	css += [
		"body > div[class] > p {display: none !important;}"
	].join("\n");
if (false || (document.domain == "webfile.ru" || document.domain.substring(document.domain.indexOf(".webfile.ru") + 1) == "webfile.ru"))
	css += ".p_wrap {margin-top: 0 !important;}";
if (false || (document.domain == "widgets.kinopoisk.ru" || document.domain.substring(document.domain.indexOf(".widgets.kinopoisk.ru") + 1) == "widgets.kinopoisk.ru"))
	css += [
		".app-container > [data-reactroot] > div[class], ",
		"    .app-container > [data-reactroot] > div[class] > div[class] {border-radius: 0 !important;}"
	].join("\n");
if (false || (document.domain == "wotspeak.ru" || document.domain.substring(document.domain.indexOf(".wotspeak.ru") + 1) == "wotspeak.ru"))
	css += [
		"#popup-1 {display: none !important;}",
		"    .wrap {transform: none !important; margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "www.anilibria.tv" || document.domain.substring(document.domain.indexOf(".www.anilibria.tv") + 1) == "www.anilibria.tv"))
	css += [
		"body > div[class]:not([id]):nth-child(-n+5) > div[class] {background-image: none !important;}",
		"    body > div[class]:not([id]):nth-child(-n+5) {background-image: none !important; height: auto !important;}",
		"    body > div[class]:not([id]):nth-child(-n+5) > a[href] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "www.drive2.ru" || document.domain.substring(document.domain.indexOf(".www.drive2.ru") + 1) == "www.drive2.ru"))
	css += [
		".dv-post-header, ",
		"    .g-column-mid > .js-entity ~ .js-entity ~ div:last-child:not([class*=\"js-entity\"]):not([class*=\"grid\"]):not([class*=\"c-pager\"]), ",
		"    .js-dvreveal + div, ",
		"    .js-page .c-car-info ~ [class*=\"content\"] ~ div:not([class*=\"content\"]):not([data-role]):not([class*=\"columns\"]), ",
		"    .js-page .g-full-size-post ~ div:not([class*=\"content\"]):not([data-role]):not([class*=\"columns\"]), ",
		"    .js-page .offer ~ div:not([class*=\"content\"]):not([data-role]):not([class*=\"columns\"]), ",
		"    .js-page > div[class*=\"-header\"] + div[class*=\" \"] > div[class]:not([class*=\"block\"]):not(.text):not([class*=\"slide\"]):not([class*=\"car\"]) ~ div:not([class*=\"slide\"]):not([class*=\"car\"]):not([class*=\"market\"]):not([class*=\"content\"]):not([class*=\"collapse\"]):not([data-role]):not([class*=\"columns\"]) > div:not([class*=\"grid\"]):not([class*=\"group\"]), ",
		"    div[id]:not([class]) > div[class]:not([id])[style=\"width: 970px;\"] {display: none !important;}"
	].join("\n");
if (false || (document.domain == "www.eg.ru" || document.domain.substring(document.domain.indexOf(".www.eg.ru") + 1) == "www.eg.ru"))
	css += [
		".facebook-bn_site-overlay {display: none !important;}"
	].join("\n");
if (false || (document.domain == "www.okino.ua" || document.domain.substring(document.domain.indexOf(".www.okino.ua") + 1) == "www.okino.ua"))
	css += [
		".fader-social {display: none !important;}",
		"    .social-open {overflow: auto !important;}"
	].join("\n");
if (false || (document.domain == "www.onlinelife.club" || document.domain.substring(document.domain.indexOf(".www.onlinelife.club") + 1) == "www.onlinelife.club"))
	css += [
		"html > body {color: #f1f1f1 !important;}"
	].join("\n");
if (false || (document.domain == "www.zoneofgames.ru" || document.domain.substring(document.domain.indexOf(".www.zoneofgames.ru") + 1) == "www.zoneofgames.ru"))
	css += [
		"html > body:not(#id) {background-color: #707070 !important;}",
		"    .blocks > table[width=\"360px\"] td[style=\"background-color:#ffffff\"] {background-color: unset !important;}",
		"    body > div[id][style*=\"margin-top\"] {margin-top: 0 !important;}",
		"    .ushki, div[class^=\"randshops\"] {width: unset !important; height: unset !important;}"
	].join("\n");
if (false || (document.domain == "xatab-repack.net" || document.domain.substring(document.domain.indexOf(".xatab-repack.net") + 1) == "xatab-repack.net"))
	css += [
		"#page {background: none !important;}",
		"    .btn-download[href^=\"http\"]:not([href^=\"https://xatab-repack.net/\"]):not([href^=\"http://xatab-repack.net/\"]) {display: none !important;}",
		"    #content {padding-top: 55px !important;}"
	].join("\n");
if (false || (document.domain == "zaycev.net" || document.domain.substring(document.domain.indexOf(".zaycev.net") + 1) == "zaycev.net"))
	css += " .body-branding {background: none !important; padding-top: 0 !important;}";
if (false || (document.domain == "zaycev.online" || document.domain.substring(document.domain.indexOf(".zaycev.online") + 1) == "zaycev.online"))
	css += [
		".content:not(#id) {margin-top: 80px !important;}"
	].join("\n");
if (false || (document.domain == "zen.yandex.by" || document.domain.substring(document.domain.indexOf(".zen.yandex.by") + 1) == "zen.yandex.by") || (document.domain == "zen.yandex.kz" || document.domain.substring(document.domain.indexOf(".zen.yandex.kz") + 1) == "zen.yandex.kz") || (document.domain == "zen.yandex.ru" || document.domain.substring(document.domain.indexOf(".zen.yandex.ru") + 1) == "zen.yandex.ru") || (document.domain == "zen.yandex.ua" || document.domain.substring(document.domain.indexOf(".zen.yandex.ua") + 1) == "zen.yandex.ua"))
	css += [
		".article__body > div[class*=\" \"] > div[class][id], ",
		"    .feed__row > .feed__item > div[class*=\" \"]:not([style]) {display: none !important;}"
	].join("\n");
if (false || (document.domain == "zerofilm.ru" || document.domain.substring(document.domain.indexOf(".zerofilm.ru") + 1) == "zerofilm.ru"))
	css += [
		".wrap-in {margin-top: 80px !important;}"
	].join("\n");
if (false || (document.domain == "zoneofgames.ru" || document.domain.substring(document.domain.indexOf(".zoneofgames.ru") + 1) == "zoneofgames.ru"))
	css += [
		".branding, .branding-bottom, .logo {background: none !important; height: auto !important;}",
		"    .branding-bottom > div[style*=\"padding: \"] {padding-top: 5px !important;}"
	].join("\n");
if (false || (document.domain == "zoomby.ru" || document.domain.substring(document.domain.indexOf(".zoomby.ru") + 1) == "zoomby.ru"))
	css += [
		".wrapper {margin-top: 60px !important;}",
		"    #global_wrapper_cont {padding: 0 !important;}"
	].join("\n");
if (false || (document.domain == "zr.ru" || document.domain.substring(document.domain.indexOf(".zr.ru") + 1) == "zr.ru"))
	css += [
		".rotate-block {display: table !important;}"
	].join("\n");
if (false || (document.domain == "torrent-games.info" || document.domain.substring(document.domain.indexOf(".torrent-games.info") + 1) == "torrent-games.info"))
	css += [
		"html {position:relative; top:-232px;}"
	].join("\n");
if (false || (document.domain == "ixbt.com" || document.domain.substring(document.domain.indexOf(".ixbt.com") + 1) == "ixbt.com"))
	css += [
		" body {background: white !important;}",
		" body {background-color: white !important;}",
		" body{background-image: url() !important;}",
		" body{background-image: none !important;}",
		" div{background-image: url() !important;}",
		" .branding {padding-top: 5px !important;}",
		" body {padding-top: 5px !important;}",
		"    body:not(#id) > .b-content.b-content__breadcrumbs, body:not(#id) > .b-content__pagecontent {margin-top: 0 !important;}",
		" .limiter{padding-top: 5px !important; margin-top: 0 !important;}",
		" .main_tm_search_tool,.searchline {background: white !important;}",
	 // !! для широкоформатных мониторов
		" .header_container, .bottom_container, #content, .content, .wrapper, .limiter {width: 100% !important;}",
		" div.limiter > div.wrapper > div.c_w > table > tbody > tr > td[align=\"center\"] > table[width=\"960\"] {width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "dugtor-deer.pw" || document.domain.substring(document.domain.indexOf(".dugtor-deer.pw") + 1) == "dugtor-deer.pw") || (document.domain == "nnm-club.me" || document.domain.substring(document.domain.indexOf(".nnm-club.me") + 1) == "nnm-club.me") || (document.domain == "nnmclub.to" || document.domain.substring(document.domain.indexOf(".nnmclub.to") + 1) == "nnmclub.to"))
 // ! console.log("es1");
	css += [
		"body{background: none !important;}",
		" body {padding-top: 0px !important;}",
		" body{background-image: none !important;}",
		" body{padding: 0 !important;}",
		" body > .wrap {top: 0 !important;}",
		" .skin-block{background-image: url(\" \") !important;}",
		" element.style{background-image: url(\"\") !important;}",
		" #brTop{background-image: url(\"\") !important;}",
		" html{prefix: \" \" !important;}",
     // !! --- широко
     // !! ".wrap{min-width: 1030px;max-width: 100% !important;}",
		" body > table[width=\"85%\"]{width: 100% !important;}",
		" body > div.wrap{max-width: 100% !important;}",
		" body > div.wrap{min-width: 1030px !important;}"
	].join("\n");
if (false || (new RegExp("^https?:\/\/(www|beta)\.gismeteo\.")).test(document.location.href))
	css += [
		" #canvas,.cleft{width: 988px !important;}#weather-maps,#map-view,#weather-old,#weather-busy{width: 986px !important;}#weather-cities,#weather-weekly,#weather-daily,#weather-hourly,#geomagnetic{width: 738px !important;}#weather-news{width: 362px !important;}.wtab{width: 228px !important;}.wtabs .wttr{left: 224px !important;}.wbfull tbody th{width: 85px !important;}.wdata thead th,.wdata tbody th{text-align: center !important;}.workday,tbody tr .weekend{width: 40px !important;}.wbshort .wbday{left: 450px !important;}.wbshort .wbnight{left: 70px !important;}.rframe{background-color: rgba(255,255,255,0.4) !important;}.wsection, .wbshort, .wbfull, .rfc{background: transparent !important;}.wbshort: hover{background-color: rgb(255,255,225) !important;}body,.content{background: url(http://www.refropkb.ru/Images/685414393.jpg) !important;background-attachment: fixed !important;}#weather-maps .fcontent{height: 280px !important;}#weather-maps li{width: 108px !important;} .wsection table{width: 690px !important;}",
				" #logo, .soft-promo, #soft-promo{display: none !important;}",
		// !!?		" #graph{float: none !important;}", //проверить
				" div#post-container,div#pre-container,.soft-promo{background: url(\"\") !important;}",
				" td.content.editor{background: url(\"\") !important;} ",
				" div.map.lazyload{background-image: url(\"\") !important;}",
		// !! оставим меню: снежинки вырезать, на бету сходить
				" #header{height:32px !important;}",
				" #header.fcontent{height:26px !important;}",
				" #menu{top: 0px !important;}",
				" .flakesnow{left: 0px !important;}",
				" #weather-top{height:0px !important; padding: 0px !important;}",
				" div.cright>div#information.rframe{display: none !important;}",
				" div.c-right>div#information.rframe{display: none !important;}",
				" div.c-right>div#weather-right.rframe{display: none !important;}",
				" div.c-right>div#weather-gis-news-alter{display: none !important;}",
				" div#informer.rframe{display: none !important;}",
				" div.newstape__feed{display: none !important;}",
				" #information, #informer, .instagramteaser, #weather-lb-content.fcontent, #weather-lb.rframe, .newsadvert{display: none !important;}",
				" #traffim-widget-169.section, #weather-rbkua .fcontent, #w-hor.rframe, .navteaser, #rbc .rframe, .rframe#weather-left {display: none !important;}",
		//	!!	" section.content>.wrap>[class]>[class]>o-9imj.column-wrap{display: none !important;}",
				" li#tourism_button{display: none !important;}",
				" #weather-rbkua, #weather-right, #weather-top > *, .rframe#w-hor, [id^=\"weather-gis-news\"] {position: fixed !important; top: -10000px !important;}"
 	].join("\n");
if (false || (document.domain == "nnm.ru" || document.domain.substring(document.domain.indexOf(".nnm.ru") + 1) == "nnm.ru") || (document.domain == "mynnm.ru" || document.domain.substring(document.domain.indexOf(".mynnm.ru") + 1) == "mynnm.ru") || (document.domain == "itog.info" || document.domain.substring(document.domain.indexOf(".itog.info") + 1) == "itog.info") || (document.domain == "txapela.ru" || document.domain.substring(document.domain.indexOf(".txapela.ru") + 1) == "txapela.ru") || (document.domain == "adderall.ru" || document.domain.substring(document.domain.indexOf(".adderall.ru") + 1) == "adderall.ru") || (document.domain == "technogies.ru" || document.domain.substring(document.domain.indexOf(".technogies.ru") + 1) == "technogies.ru") || (document.domain == "rkna.xyz" || document.domain.substring(document.domain.indexOf(".rkna.xyz") + 1) == "rkna.xyz") || (document.domain == "investxp.ru" || document.domain.substring(document.domain.indexOf(".investxp.ru") + 1) == "investxp.ru"))
	css += [
		" html:not(#id),body:not(#id) {background-image: none!important;}",
		" body{background: none !important;}",
		" body, #theme_8, #theme_2, #theme_3, #theme_4, #theme_5, #theme_6, #theme_7, #theme_1{background: url(\'\') !important;}",
// !!		" body {background-image: none !important;}",
		" body, div#page{background: gray !important; background-color: gray !important;}",
		" body, div#page, element.style, #brTop{background-image: url(\'\') !important;}",
		" body, div#page, .pirate-branding, .pb_button_play{background: none !important;}",
		" div#page, div#wrap, div#content-b{margin-top: 0px !important; top: 0px !important;}",
		" div#optionspanel{margin-top: 0px !important; margin-left: 0px !important;}",
		" div#page > div[style*=\"width: 990px;\"][style*=\"height: 206px; position: relative;\"]{height: 0px !important;}",
		" .pb_top_img, .pirate-branding, a.pb_link, .pb_logo_brand, .pb_left_banner, .pb_right_banner, #b-logo{height: 0px !important;}",
		" .pirate-branding, .pb_button_play_big{top: 0px !important;}",
		" body{padding-top: 0px !important;}",
		" body > #page {padding-top: 0 !important;}",
		" #mmmBanner{height: 0px !important;}",
		" .head_assn {height: 0px !important; width: 0px !important;}",
		" .head_assn .assn_logo {width: 0px !important; height: 0px !important; top: 0px !important; left: 0px !important; background: url(\" \") !important; }",
		" .head_assn .assn_slogan {width: 0px !important; height: 0px !important; top: 0px !important; left: 0px !important; background: url(\" \") !important; }",
		" html{height: 0px !important;}",
		" body{click=(\'\') !important;}",
// !! заполненяем всю ширину экрана
		" #wrap, htmlarea, text{width: 99% !important;}",
		" #scrollPanel{width: auto !important;}",
		" #wrapper {width: auto !important;}",
		" #content{width: auto !important;}",
        " #content-b, text{width: 100% !important;}",
		" #cntnt, #content-b{position: absolute !important; left: 0px !important; margin-top: 0px !important; margin-left: 0px !important;}",
// !! проверить замену		" .categories{margin: 0 100px 10px !important; float: left !important;}",
		" .categories{width: auto !important; margin: -60px 180px 10px !important; float: left !important;}",
	// !! убрать?	" body {text-align: center !important;}",
	// !! убрать?	" #page {display: inline-block !important; top: 0px !important; margin-top: 0 !important;}",
		" #wrap {text-align: initial !important;}"
	].join("\n");
if (false || (document.domain == "yandex.by" || document.domain.substring(document.domain.indexOf(".yandex.by") + 1) == "yandex.by") || (document.domain == "yandex.kz" || document.domain.substring(document.domain.indexOf(".yandex.kz") + 1) == "yandex.kz") || (document.domain == "yandex.ru" || document.domain.substring(document.domain.indexOf(".yandex.ru") + 1) == "yandex.ru") || (document.domain == "yandex.ua" || document.domain.substring(document.domain.indexOf(".yandex.ua") + 1) == "yandex.ua"))
	css += [
//  ! site yandex
// !!?		".adsrv {width: 0px !important;min-width: 0 !important;max-width: 0 !important;",
		".home-arrow__bottom, div[aria-label=\"Реклама\"] {display: none !important;}",
		"    .serp-header {margin-top: 0 !important;}",
		"    body[class*=\"b-page_infinity\"] .footer, body[class*=\"b-page_infinity\"] .rows__row_last > [role=\"complementary\"] {margin-top: auto !important;}",
		"    .b-page {padding-top: 0 !important;}",
		"    .head-stripe {position: fixed !important; transform: scale(0) !important;}",
		"    .map-container ~ #sidebar-container > .sidebar-view ~ .collapse-button {top: 0 !important;}",
		"    div:not([style^=\"padding: 0px\"]):not([style*=\"content-box\"])[style*=\"!important\"][style*=\"display\"][style*=\"visibility\"][style*=\"visible\"] {width: 0 !important; min-width: 0 !important; max-width: 0 !important; ",
		"    height: 0 !important; min-height: 0 !important; max-height: 0 !important;",
		"    overflow: hidden !important;}",
		" .b-top-wizard{width: 1000px !important;} .b-body-items.b-serp-list{width: 1000px !important;}",
		"    .forecast-brief__item-temp-day { width: auto !important;}",
		"    }",
		"    /* Пустое место от директа на tv.yandex */  ",
		"    .tv-grid__page > div[class^=\"tv-grid__item\"], .tv-grid__page > .tv-sortable-item { margin-right: auto !important;}",
//  ! !! чистим maps.yandex
		" .ymaps-map{background: none !important;}",
//		" .ymaps-2-1-23-map,.ymaps-2-1-28-map-ru,.ymaps-2-1-30-copyright__logo,.ymaps-2-1-30-copyright__logo_lang_en,.ymaps-2-1-30-copyright__content,.ymaps-2-1-30-copyright__content,.ymaps-2-1-30-copyright_fog_yes: after,.ymaps-2-1-30-copyright__fog,.ymaps-2-1-30-hint__x{background-image: url() !important;}",
		" .ymaps-2-1-23-map,.ymaps-2-1-28-map-ru,.ymaps-2-1-30-hint__x,[class*=\"-copyright__\"]{background-image: url() !important;}",
		" .ymaps-2-1-23-map,.ymaps-2-1-28-map-ru,.ymaps-2-1-30-hint__x,[class*=\"-copyright__\"]{background: url(\'\') !important;}",
//  ! !! убрать все фоновые рисунки в картах
//  ! 		" ymaps{background-image: url() !important;}",
		" tv.yandex.ru##td[width=\"24%\"]{width: 12% !important;}",
		" a{onmousedown='' !important;}",
		" a{onclick='' !important;}"
	].join("\n");
if (false || (document.domain == "soft-club.me" || document.domain.substring(document.domain.indexOf(".soft-club.me") + 1) == "soft-club.me"))
	css += [
//  ! !!  --- широко
		" .main,.main-wrap,.header,.header-main{width: 100% !important;}",
		" div.all,div.all-wrap,.pageWidth{max-width: 100% !important; width: 100% !important;}",
		" article,.header,.header-main{width: 100% !important;}",
		" div.content{width: 80% !important;}",
		" div.sidebar1{width: 18% !important;}"
].join("\n");
if (false || (document.domain == "4seasons-ltc.com" || document.domain.substring(document.domain.indexOf(".4seasons-ltc.com") + 1) == "4seasons-ltc.com"))
	css += [
		"body{background-image: none !important;}",
		" body{font-family: Tahoma !important;}"
	].join("\n");
if (false || (document.domain == "80-e.ru" || document.domain.substring(document.domain.indexOf(".80-e.ru") + 1) == "80-e.ru"))
	css += [
		" div#ipbwrapper{margin: 0 !important; width: inherit !important; max-width: inherit !important;}"
	].join("\n");
if (false || (document.domain == "china-review.com.ua" || document.domain.substring(document.domain.indexOf(".china-review.com.ua") + 1) == "china-review.com.ua"))
	css += [
		"body{background: url() !important;}",
		" body{background-image: none !important;}",
		" body{background: none !important;}",
		" body{margin-top: 0px !important;}"
	].join("\n");
if (false || (document.domain == "ag.ru" || document.domain.substring(document.domain.indexOf(".ag.ru") + 1) == "ag.ru"))
	css += [
		"body{background: none !important;} .layer_top {background: none !important;} .layer_bottom {background: none !important;} .cast_bg{background: none !important;}",
		" .contentbg {background-image: none !important;} #4iframe {background-image: none !important;} ",
		" #framescr{background-image: none !important;}"
	].join("\n");
if (false || (document.domain == "amovies.tv" || document.domain.substring(document.domain.indexOf(".amovies.tv") + 1) == "amovies.tv"))
	css += [
//		!! расширяем
		"article{width: 980px !important;}",
		" #vk_select {float: none !important; margin-left: 445px !important;}",
		" #vk_top,#vk_select {background: url() !important;}"
	].join("\n");
if (false || (document.domain == "apteka.ru" || document.domain.substring(document.domain.indexOf(".apteka.ru") + 1) == "apteka.ru"))
	css += [
		" div.wrapper_root > div.wrapper > section.middle{margin-bottom: 0 !important;}",
		" div.wrapper_root > div.wrapper > section.middle > div.container.clr{min-height: 180px !important;}",
		" div.wrapper_root > div.wrapper > section.middle > div.container.clr > div.content.bottom-content > section.items.items-tile.items-viewed{margin: 0 !important;}",
		" div.wrapper_root > div.wrapper > section.middle > div.tabs.top-tabs.clr{margin-bottom: 0 !important;}"
	].join("\n");
if (false || (document.domain == "avito.ru" || document.domain.substring(document.domain.indexOf(".avito.ru") + 1) == "avito.ru"))
	css += " .bonprix-1{background: none !important;} ";
if (false || (document.domain == "bash.im" || document.domain.substring(document.domain.indexOf(".bash.im") + 1) == "bash.im"))
	css += " span.csd{background: none !important;}";
if (false || (document.domain == "batzbatz.com" || document.domain.substring(document.domain.indexOf(".batzbatz.com") + 1) == "batzbatz.com"))
	css += [
	// !!	" !! расширяем
		" .wrap{width: 100% !important;}",
		" .left{width: 75% !important;}"
	].join("\n");
if (false || (document.domain == "best-cashback.ru" || document.domain.substring(document.domain.indexOf(".best-cashback.ru") + 1) == "best-cashback.ru"))
	css += [
		" [id=\"menu-osnovnoe-menyu\"] > [id^=\"menu-item-\"] > a.menu-item-link{color: black !important;}",
		" div#theme-page{top: 80px !important;}",
		" [class^=\"mk-header-\"]{background-color: lightgrey !important;}",
		" section#mk-footer{padding: 0 !important; top: 80px !important;}",
		" div#sub-footer{background-color: lightgrey !important;}"
	].join("\n");
if (false || (document.domain == "besplatnye-kupony.ru" || document.domain.substring(document.domain.indexOf(".besplatnye-kupony.ru") + 1) == "besplatnye-kupony.ru"))
	css += [
		" body{background: none !important; background-color: lightgrey !important;}",
		" div{width: inherit !important; margin: 0 !important;}",
		" div#site-container{border: none !important;}"
	].join("\n");
if (false || (document.domain == "bestrepack.net" || document.domain.substring(document.domain.indexOf(".bestrepack.net") + 1) == "bestrepack.net"))
	css += " div#body_container{padding: 0 !important;}";
if (false || (document.domain == "bigpicture.ru" || document.domain.substring(document.domain.indexOf(".bigpicture.ru") + 1) == "bigpicture.ru"))
	css += [
		" div.content{padding: 0 !important;}",
		" div.podheader{width: 240px !important; float: right !important;}",
		" div.podheader-right{float: right !important;}"
	].join("\n");
if (false || (document.domain == "blogspot.ru" || document.domain.substring(document.domain.indexOf(".blogspot.ru") + 1) == "blogspot.ru") || (document.domain == "blogspot.com" || document.domain.substring(document.domain.indexOf(".blogspot.com") + 1) == "blogspot.com") || (document.domain == "blogspot.sk" || document.domain.substring(document.domain.indexOf(".blogspot.sk") + 1) == "blogspot.sk"))
	css += [
		" body{background-image: none !important;}",
		" body{background-image: url(\" \") !important;}",
//  !! --- расширим ---
		"  .content-outer, .content-fauxcolumn-outer, .region-inner {max-width: none !important;}",
		" div#header-inner > div.descriptionwrapper{margin-bottom: 5px !important;}",
		"  #outer-wrapper {width: 95% !important;}",
		"  #main-wrapper {width: 95% !important;}"
	].join("\n");
if (false || (document.domain == "bookvoed.ru" || document.domain.substring(document.domain.indexOf(".bookvoed.ru") + 1) == "bookvoed.ru"))
	css += " .Fh{margin-top: 79px !important;}";
if (false || (document.domain == "calend.ru" || document.domain.substring(document.domain.indexOf(".calend.ru") + 1) == "calend.ru"))
	css += " .pad, .main-l{width: 95% !important;}";
if (false || (document.domain == "clubupravdom.ru" || document.domain.substring(document.domain.indexOf(".clubupravdom.ru") + 1) == "clubupravdom.ru"))
	css += " *{background-image: none !important;}";
if (false || (document.domain == "computerra.ru" || document.domain.substring(document.domain.indexOf(".computerra.ru") + 1) == "computerra.ru"))
	css += [
		" body{background: none!important;}",
		" div > p{text-align: justify !important;}",
		" div.top {top: 0px !important; width: auto !important;}",
		" div.top-submenu {width: 100% !important;}",
		" div.main {margin-top: 0px !important;}",
		" div.column{max-width: 80% !important;}",
		" div.main-column.main-column-article{width: 100% !important;}"
].join("\n");
if (false || (document.domain == "cont.ws" || document.domain.substring(document.domain.indexOf(".cont.ws") + 1) == "cont.ws"))
	css += [
		" body > div.content{width: 100% !important;}",
		" body > div.content > div{margin: 0 !important;}",
		" body > div.content{margin-left: 5px !important;}",
		" body > div.content{margin-right: 5px !important;}",
		" div.sidebar{width: 14% !important;}",
		" [class^=\"post\"]{width: 85% !important;}",
		" [class^=\"post\"]{max-width: 1880px !important; margin: 0 !important; padding: 0 !important;}",
		" div.post > [class^=\"article\"]{padding: 0 !important;}",
		" div#wp.author-bar2.wallpaper.plus{background-image: url() !important; padding: 0 !important;}",
		" div.author-bar2-inside{padding: 0 !important;}",
		" a.m_author{display: inline-block !important;}",
		"  .plus .author-bar2-inside{color: #666 !important;}",
		" div.dark{background: url() !important;}",
		"  .wallpaper .author-bar2-inside, .wallpaper .author-bar2-inside a, .wallpaper .author-bar2-inside textarea {color: inherit !important;}"
].join("\n");
if (false || (document.domain == "crowdin.com" || document.domain.substring(document.domain.indexOf(".crowdin.com") + 1) == "crowdin.com"))
	css += " #user-cover-picture,#user-cover-picture-blurred{background: url() !important;}";
if (false || (document.domain == "cyberry.ru" || document.domain.substring(document.domain.indexOf(".cyberry.ru") + 1) == "cyberry.ru") || (document.domain == "f1-world.ru" || document.domain.substring(document.domain.indexOf(".f1-world.ru") + 1) == "f1-world.ru"))
	css += [
		"body{background: none !important;}",
		" td{background-image: none !important;}"
].join("\n");
if (false || (document.domain == "ebay-forum.ru" || document.domain.substring(document.domain.indexOf(".ebay-forum.ru") + 1) == "ebay-forum.ru"))
	css += " .banner_ap{height: 30px !important;} #search{margin: 0 0 7px !important;} .header_effects{height: 66px !important;} #branding{height: 66px !important; min-height: 66px !important;}";
if (false || (document.domain == "f-page.ru" || document.domain.substring(document.domain.indexOf(".f-page.ru") + 1) == "f-page.ru") || (document.domain == "f-picture.net" || document.domain.substring(document.domain.indexOf(".f-picture.net") + 1) == "f-picture.net") || (document.domain == "radikal-foto.ru" || document.domain.substring(document.domain.indexOf(".radikal-foto.ru") + 1) == "radikal-foto.ru") || (document.domain == "letitbit.net" || document.domain.substring(document.domain.indexOf(".letitbit.net") + 1) == "letitbit.net") || (document.domain == "novafilm.tv" || document.domain.substring(document.domain.indexOf(".novafilm.tv") + 1) == "novafilm.tv") || (document.domain == "nowa.cc" || document.domain.substring(document.domain.indexOf(".nowa.cc") + 1) == "nowa.cc") || (document.domain == "radical-foto.ru" || document.domain.substring(document.domain.indexOf(".radical-foto.ru") + 1) == "radical-foto.ru") || (document.domain == "radikal.ru" || document.domain.substring(document.domain.indexOf(".radikal.ru") + 1) == "radikal.ru") || (document.domain == "radikal.cc" || document.domain.substring(document.domain.indexOf(".radikal.cc") + 1) == "radikal.cc") || (document.domain == "radical.cc" || document.domain.substring(document.domain.indexOf(".radical.cc") + 1) == "radical.cc") || (document.domain == "rghost.ru" || document.domain.substring(document.domain.indexOf(".rghost.ru") + 1) == "rghost.ru") || (document.domain == "voffka.com" || document.domain.substring(document.domain.indexOf(".voffka.com") + 1) == "voffka.com"))
	css += [
		"body{background: none !important;}",
		" body{background-image: none !important;}"
].join("\n");
if (false || (document.domain == "ddlmkvhd.com" || document.domain.substring(document.domain.indexOf(".ddlmkvhd.com") + 1) == "ddlmkvhd.com"))
	css += [
		" body{background: none !important;}",
		" div.page-body-t{position: relative !important;}"
	].join("\n");
if (false || (document.domain == "ddlvillage.org" || document.domain.substring(document.domain.indexOf(".ddlvillage.org") + 1) == "ddlvillage.org"))
	css += [
		" div{background: none !important;}"
	].join("\n");
if (false || (document.domain == "f1news.ru" || document.domain.substring(document.domain.indexOf(".f1news.ru") + 1) == "f1news.ru"))
	css += [
		" div[id=\"bannerText\"]{border: 0px !important; margin-left: 10px !important;}",
		" body{background: url() top center no-repeat #000000 !important;}",
// !! расширяем текстовое поле
		" div#textBlock{width: 900px !important;}"
].join("\n");
if (false || (document.domain == "facebook.com" || document.domain.substring(document.domain.indexOf(".facebook.com") + 1) == "facebook.com"))
	css += [
// !!		!! расширение, но текст подползает под боковую панель
// !!		" #contentArea {width: 750px !important;}",
// !!		" .uiUfi {width: 650px !important;}",
// !!		" body {background: url(http://www.maxthon-fr.com/10ours/facebook/wb.jpg) fixed !important;}",
// !!		" #contentCol {background: url(http://www.maxthon-fr.com/10ours/facebook/wb.jpg) fixed !important;}",
		" div#profile_stream_composer {background-color: #C1D5F6  !important;}",
		" #blueBar {background-color: transparent !important;}",
		" #headNav {background-color: #transparent !important;}",
		" .jewelButton {background-color: transparent !important;}",
		" #fbNotificationsFlyout {left: 50px !important;}",
		" .fbJewelFlyout {background-color: white !important; border-bottom: 1px solid #293E6A !important; border: solid !important; left: 0px !important; overflow: visible !important; position: absolute !important; top: 30px !important; width: 350px !important; z-index: -1 !important;}",
// !!		" #pageNav a {color: #00ffff !important;display: inline-block;font-weight: bold;height: 22px;padding: 8px 10px 0px;text-decoration: none;}",
		" .UIImageBlock {color: #000000 !important;}",
		" .fcg {color: darkgreen !important;}",
		" .mts.uiAttachmentDesc.translationEligibleUserAttachmentMessage {color: black !important;}"
].join("\n");
if (false || (document.location.href.indexOf("http://fastpic.ru/") === 0) || (document.location.href.indexOf("https://fastpic.ru/") === 0) || (document.domain == "fastpic.ru" || document.domain.substring(document.domain.indexOf(".fastpic.ru") + 1) == "fastpic.ru"))
	css += [
		"    html, html > body {cursor: auto !important;}",
		"    #foot-area, #footer {margin-top: 0 !important;}",
		"    #bcontent > div[style^=\"float\"], #picContainer > img {display: none !important;}",
		"    #picContainer {margin: auto !important; margin-top: 0 !important; width: 600px !important;}",
	// !?	"  #picContainer {float: none !important; margin: auto !important;}",
		"    #bcontent {margin: auto !important; margin-top: 0 !important; width: 600px !important; pointer-events: none !important;}",
		"    #bfooter-container {padding-top: 0 !important;}",
		"    #bcontent > *, body > * {pointer-events: auto !important;}",
		"    body {pointer-events: none !important;}",
		" html, body {pointer-events: none !important; height: 110% !important;}",
//??
		" html,body,#mainContainer,#footerContainer,#content,#footer {margin: 0 !important; width: 100% !important; border-radius: 0 !important;}",
		"  #mainContainer > table {width: 850px !important; margin: auto !important;}",
		" html,body {display: flex !important; flex-direction: column !important;}",
		"  #mainContainer {flex-grow: 1 !important;}",
		"  #mainContainer,#footerContainer {overflow: visible !important;}",
		"  #content,#footer {background-color: transparent !important;}",
		"  #content {display: flex !important; flex-grow: 1 !important; min-height: inherit !important;}",
//??
		"  #logo-area{padding-top: 0px !important;}",
		" *{background: none !important;}",
		" *{background-image: none !important;}",
		" #footer-container {background-image: none !important; height: auto !important;}",
		" body > a {display: none !important;}",
		" div#show-code-content.rounded-corners{position: inherit !important;}",
		" div#foot-area.center.rounded-corners{position: inherit !important;}",
		" div#footer.center.rounded-corners{position: inherit !important;}",
		"  .center {padding: 0 !important;}",
		" div#right-bottom.rounded-corners{position: relative !important; margin-top: 0px !important; height: 0px !important; padding-top: 5px !important;}",
		" .traforet-br-logo, div[id^=\"b_pr_\"]  {background-image: url(\" \") !important;}",
		" .traforet-br-logo, div[id^=\"b_pr_\"]  {background-url: none !important;}",
		" body{padding-top: 0px !important;}",
// !! всё - чёрным
		"  *{color: black !important;}",
		" body{background: none !important;}"
//		" html {background-color: #171616 !important;}"
	].join("\n");
if (false || (document.domain == "fapl.ru" || document.domain.substring(document.domain.indexOf(".fapl.ru") + 1) == "fapl.ru"))
	css += [
		" noindex > div[id]{background-image: none !important;}",
		" noindex > div[id]{background-image: url(\"\") !important;}",
	// ! --- широко
		" body > div#wrapper{width: 98% !important;}",
		" body > div#wrapper > div#container{width: 84% !important; padding: 1px !important;}",
		" body > div#wrapper > div#container > div#content{width: 75% !important;}",
		" body > div#wrapper > div#container > div#content > div.block{width: 99% !important;}"
	].join("\n");
if (false || (document.domain == "filmix.net" || document.domain.substring(document.domain.indexOf(".filmix.net") + 1) == "filmix.net"))
	css += " body{padding: 0px 0 0 0 !important;}";
if (false || (document.domain == "formulakino.ru" || document.domain.substring(document.domain.indexOf(".formulakino.ru") + 1) == "formulakino.ru"))
	css += [
		" div.backF > a > span{background-image: none !important; background: #fff !important;}",
		" div.vjs-poster{background: url() !important;}",
		" div.pagecontent{margin-top: 0px !important;}",
		" div#wrapper{background: #fff !important;}"
	].join("\n");
if (false || (document.domain == "google.ru" || document.domain.substring(document.domain.indexOf(".google.ru") + 1) == "google.ru"))
	css += [
		" body[class=\"cP\"] tr td.Bu:last-child div.nH div.nH div.nH:first-child {position: fixed !important; right: 16px !important; top: 200px !important; padding: 5px 0px 10px 8px !important; border: 1px solid lightblue !important; width: 150px !important; background-color: #fff !important; opacity: 0.5 !important; border-bottom-left-radius: 10px !important; border-top-left-radius: 10px !important;}",
		" body[class=\"cP\"] tr td.Bu:last-child div.nH div.nH div.nH:first-child:hover {opacity: 1 !important;}",
		" body[class=\"cP\"] tr td.Bu:last-child div.nH  {width: 0px !important;}",
	// ! расширяем выдачу в поиске
		" .center_col,#center_col  {width: 1000px !important; margin-left: 10px !important; margin-right: 10px !important;} .s {max-width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "ifmo.ru" || document.domain.substring(document.domain.indexOf(".ifmo.ru") + 1) == "ifmo.ru"))
	css += [
		" header.h-header, .b-header-pad{height: 100px !important;}"
	].join("\n");
if (false || (document.domain == "inosmi.ru" || document.domain.substring(document.domain.indexOf(".inosmi.ru") + 1) == "inosmi.ru"))
	css += [
		" body{background-image: none !important;}",
		" body{background: url() !important;}",
	// !! поаккуратнее
		" .header{padding-top: 0px !important;}",
		"  #addbwr{margin-top: 0px !important;}",
	// !! расширяем (если не надо - закомментировать (поставить воскл.знаки // ! перед след. строками )
		" .main{width: 95% !important;}",
		" .comments .comments-list ul li {max-width: 95% !important; }",
		" button.layout__scroll-to-top {left: 2% !important; }"
	].join("\n");
if (false || (document.domain == "keeplinks.eu" || document.domain.substring(document.domain.indexOf(".keeplinks.eu") + 1) == "keeplinks.eu"))
	css += " div#header{background: none !important;}";
if (false || (document.domain == "kino-tor.net" || document.domain.substring(document.domain.indexOf(".kino-tor.net") + 1) == "kino-tor.net"))
	css += [
		" .traforet-br-logo, div[id^=\"b_pr_\"]  {background-image: url(\" \") !important;}",
		" .traforet-br-logo, div[id^=\"b_pr_\"]  {background: url(\" \") !important;}",
		" .traforet-br-logo, div[id^=\"b_pr_\"]  {background-url: none !important;}",
		" body{padding-top: 0px !important;}"
	].join("\n");
if (false || (document.domain == "letitfilms.com" || document.domain.substring(document.domain.indexOf(".letitfilms.com") + 1) == "letitfilms.com"))
	css += [
		" body{background: url() !important; background-color: black !important;}",
		" div#container{width: inherit !important; margin: 0 !important;}",
		" div#container > div#main > *{padding: 0 !important;}",
		" div#container > div#main > aside{width: 20% !important;}",
		" div#container > div#main > div#content{width: 79% !important;}"
	].join("\n");
if (false || (document.domain == "livesport.ws" || document.domain.substring(document.domain.indexOf(".livesport.ws") + 1) == "livesport.ws"))
	css += [
// !! убираем фон и баннер
		" body {background: none !important; color: #333 !important;}",
		" body{background: url() !important; background-color: #000002 !important;}",
		" body,.top-panel-wrap.fixed {background-image: url() !important;}",
		" body{background-image: none !important;}",
		" div[id=\"flash\"]{height: 0px !important;}"
	].join("\n");
if (false || (document.domain == "livecars.ru" || document.domain.substring(document.domain.indexOf(".livecars.ru") + 1) == "livecars.ru") || (document.domain == "livesport.ru" || document.domain.substring(document.domain.indexOf(".livesport.ru") + 1) == "livesport.ru"))
	css += [
		".content {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "livesport.ws" || document.domain.substring(document.domain.indexOf(".livesport.ws") + 1) == "livesport.ws"))
	css += [
		"body > div:not([id]):not([class]) + div:not([id]):not([class]) + div:not([id]):not([class]) + div:not([id]):not([class]) ~ div[id]:not([class]) {display: none !important;}",
		"    body {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "lolzteam.net" || document.domain.substring(document.domain.indexOf(".lolzteam.net") + 1) == "lolzteam.net"))
	css += [
		"#adblock_dont_block_please, #backgroundRek {display: none !important;}",
		"    .breadBoxTop {margin-top: 3.5em !important;}"
	].join("\n");
if (false || (document.domain == "lostfilm.info" || document.domain.substring(document.domain.indexOf(".lostfilm.info") + 1) == "lostfilm.info") || (document.domain == "lostfilm-online.ru" || document.domain.substring(document.domain.indexOf(".lostfilm-online.ru") + 1) == "lostfilm-online.ru") || (document.domain == "lostfilm.tv" || document.domain.substring(document.domain.indexOf(".lostfilm.tv") + 1) == "lostfilm.tv"))
	css += [
	//	" body{background: #c0c0c0 !important;}",
		"    body {background-image: none !important; background-color: #1c1e1f !important;}",
		" body{background: none !important;}",
		" body{background-image: none !important;}",
		" body{background: gray !important;}",
		".footer {background: #1c1e1f !important; color: #fff !important;}",
		"    body > a[onclick], body > div > div[style^=\"padding-top\"], ",
		"    body > div:not([id]):not([class]), body > span, ",
		"    script + a[href][target] + div[style*=\"absolute\"][style*=\"margin-left\"] {display: none !important;}",
		" div[class=\"mid\"]{background: LightGrey !important;}",
// !! ==== и меняем на читаемый цвет
		" div[class=\"user_avatar\"]{color: black !important;}",
		" span[class=\"wh\"]{color: black !important;}",
		" a[href*=\"\/my.php\"]{color: black !important;}",
		" a[href*=\"\/messages.php\"]{color: black !important;}",
		" a[href*=\"bogi.ru\/logout.php\"]{color: black !important;}",
// !! расширяем полезную площадь
		" .lstfml .wrapper{margin-bottom: 15px !important; width: 100% !important; }",
		" .lstfml #main-center-side{width: 70% !important;}",
		" .lstfml #main-left-side{width: 12% !important;}",
		" .lstfml #main-right-side{width: 14% !important;}",
		" a.new-movie, a.new-movie > img{width: 95% !important;}",
		" a.new-movie > div.title{width: 100% !important;}",
		" a.new-movie > div.date{width: 30% !important;}",
		" .lstfml .left-pane{width: 75% !important;}"
	].join("\n");
if (false || (document.domain == "mail.ru" || document.domain.substring(document.domain.indexOf(".mail.ru") + 1) == "mail.ru"))
	css += [
		"body > .grid > div[class^=\"grid\"][class*=\"__header\"] > .toolbar, ",
		"    body > .zeropixel ~ div .well.notify {display: none !important;}"
	].join("\n");
if (false || (document.domain == "meduza.io" || document.domain.substring(document.domain.indexOf(".meduza.io") + 1) == "meduza.io"))
	css += [
	// !!	"!!    <--- Выравнивание шрифта --- > ",
		" div.Material-container {text-align: justify !important;}",
		" div.Page-section {text-align: center !important;}",
	// !!	"!!    <--- Форматируем заголовки --- > ",
		" *[class*=\"MaterialHeader\"] {max-width: 100% !important; text-align: center !important;}",
	// !!	"!!    <--- Размеры блоков --- > ",
		" div.Lead {max-width: 100% !important;}",
		" div[class*=\"Content\"] {max-width: 120% !important;}",
		" div.Body > p{max-width: 100% !important;}",
		" div[class=\"Context\"] {max-width: 95% !important;}",
		" div.Figure-title{max-width: 100% !important;}",
		" blockquote {max-width: 100% !important;}",
		" div.Related{max-width: 100% !important;}",
		" div.Body > div{max-width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "megashara.com" || document.domain.substring(document.domain.indexOf(".megashara.com") + 1) == "megashara.com"))
	css += [
// !! 	расширяем
		" .all, #content{width: 100% !important;}",
		" #center-block {width: 65% !important;}"
	].join("\n");
if (false || (document.domain == "ncrypt.in" || document.domain.substring(document.domain.indexOf(".ncrypt.in") + 1) == "ncrypt.in"))
	css += [
		" body{background: none !important;}",
		" div#wrapper{margin: 0 0 0 0 !important;}"
	].join("\n");
if (false || (document.domain == "nn.ru" || document.domain.substring(document.domain.indexOf(".nn.ru") + 1) == "nn.ru"))
	css += [
		" .body-cont {background-image: url(\' \') !important;}",
	// !!  расширяем
		" .rn-global-container__inner {padding-right: 0px !important;}",
		" .body-cont {margin-right: 0px !important;}"
	].join("\n");
if (false || (document.domain == "picclick.ru" || document.domain.substring(document.domain.indexOf(".picclick.ru") + 1) == "picclick.ru") || (document.domain == "picclock.ru" || document.domain.substring(document.domain.indexOf(".picclock.ru") + 1) == "picclock.ru") || (document.domain == "picforall.ru" || document.domain.substring(document.domain.indexOf(".picforall.ru") + 1) == "picforall.ru"))
	css += [
		"div[id^=\"pai_thumbz_\"][id$=\"_side\"] {background: #363636 !important;}"
	].join("\n");
if (false || (document.domain == "pikabu.ru" || document.domain.substring(document.domain.indexOf(".pikabu.ru") + 1) == "pikabu.ru"))
	css += [
		"header > .header__main {background-color: #8ac858 !important;}",
		"    .footer {height: auto !important;}",
		"    .app > .app__inner[style*=\"padding-top\"] {padding-top: 64px !important;}"
	].join("\n");
if (false || (document.domain == "playground.ru" || document.domain.substring(document.domain.indexOf(".playground.ru") + 1) == "playground.ru"))
	css += "#foundationWrapper {background: #373737 !important;}";
if (false || (document.domain == "pikabu.ru" || document.domain.substring(document.domain.indexOf(".pikabu.ru") + 1) == "pikabu.ru"))
	css += [
		" div.paral > a > div{background: url() !important;}",
		" div.paral > a > div{height: 64px !important;}",
		" table#header_t {margin-top: 0px !important;}",
		" \\!! расширяем полезную площадь",
		"  .b-story__content, .b-story__content_type_text {margin-left: 5px !important; width: 800px !important; max-width: 800px !important;}"
	].join("\n");
if (false || (document.domain == "piter.tv" || document.domain.substring(document.domain.indexOf(".piter.tv") + 1) == "piter.tv"))
	css += [
		" body{background-image: none !important;}"
	].join("\n");
if (false || (document.domain == "politikus.ru" || document.domain.substring(document.domain.indexOf(".politikus.ru") + 1) == "politikus.ru"))
	css += [
		" body{background-image: none !important;}",
		" body{background: url() !important;}",
// !!  расширяем (если не надо - закомментировать (поставить воскл.знаки // ! перед след.четырьмя строками )
//		"  #main_content_holder{width: 100% !important; }",
//		"  #left{width: 80% !important; }",
//		"  .holder, div.block, .content, #dle-content{width: 100% !important; }",
//		" .fullstory{width: 95% !important; }"
// !! доработанный вариант от Buba5473
		"  div#header{width: inherit !important; margin: 0 !important;}",
		"  div#header > div.holder{width: inherit !important; margin: 0 !important;}",
		"  div#main_content_holder{width: inherit !important; margin: 0 !important;}",
		"  div#main_content_holder > div#maintpl > div.holder{width: inherit !important; margin: 0 !important;}",
		"  div#main_footer_holder{width: inherit !important; margin: 0 !important;}",
		"  div#main_footer_holder > div.holder{width: inherit !important; margin: 0 !important;}",
		"  div#main_content{margin: 0 !important;}",
		"  div#right{margin: 0 !important; float: none !important; width: inherit !important;}",
		"  div#left{width: 80% !important;}"
	].join("\n");
if (false || (document.domain == "pleer.com" || document.domain.substring(document.domain.indexOf(".pleer.com") + 1) == "pleer.com"))
	css += [
		" div#main.clearfix > div#container > div#content{margin: 0 !important;}",
		" div#container > div#content > div.clearfix:nth-child(3) > div.results > div.clearfix:nth-child(2) > div.results > div.index-cols.clearfix > div.index-col1{width: 68% !important;}",
		" div#container > div#content > div.clearfix:nth-child(3) > div.results > div.clearfix:nth-child(2) > div.results > div.index-cols.clearfix > div.index-col2{width: 32% !important;}"
	].join("\n");
if (false || (document.domain == "f-page.ru" || document.domain.substring(document.domain.indexOf(".f-page.ru") + 1) == "f-page.ru") || (document.domain == "f-picture.net" || document.domain.substring(document.domain.indexOf(".f-picture.net") + 1) == "f-picture.net") || (document.domain == "radikal-foto.ru" || document.domain.substring(document.domain.indexOf(".radikal-foto.ru") + 1) == "radikal-foto.ru") || (document.domain == "radical-foto.ru" || document.domain.substring(document.domain.indexOf(".radical-foto.ru") + 1) == "radical-foto.ru") || (document.domain == "radikal.ru" || document.domain.substring(document.domain.indexOf(".radikal.ru") + 1) == "radikal.ru") || (document.domain == "radikal.cc" || document.domain.substring(document.domain.indexOf(".radikal.cc") + 1) == "radikal.cc"))
	css += [
		" .brand_bg{background-image: none !important;}",
	//	" .base-page_wrapper {width: auto !important; padding: 0 !important; background-position: center !important;}",
		".base-page_wrapper, .render_body_main {width: auto !important; padding: 0 !important; margin: 0 !important; background-position: center !important;}",
		" .no-advert_wrapper_top, .no-advert_wrapper_bottom {width: 830px !important; margin: auto !important;}",
		" .content{padding-top: 0px !important;}",
		" .brand_bg{top: 0px !important;}",
		" div.render_body_main {padding-top: 0px !important;}",
		" div.ComplainAdminControl{left: 70px !important;}"
].join("\n");
if (false || (document.domain == "ngs.ru" || document.domain.substring(document.domain.indexOf(".ngs.ru") + 1) == "ngs.ru") || (document.domain == "rambler.ru" || document.domain.substring(document.domain.indexOf(".rambler.ru") + 1) == "rambler.ru"))
	css += [
		".social-popup, .subscribe-popup-cover, .subscribe-popup__wrapper {display: none !important;}"
	].join("\n");
if (false || (document.domain == "rambler.ru" || document.domain.substring(document.domain.indexOf(".rambler.ru") + 1) == "rambler.ru") || (document.domain == "autorambler.ru" || document.domain.substring(document.domain.indexOf(".autorambler.ru") + 1) == "autorambler.ru"))
	css += [
// !! из старого, режет почту		".b-left-column .b-left-column__wrapper{margin: 0 !important;}",
		" div[class=\"appWindow\"]{right: 0px !important;}",
//  !! --- чистим фон
		" body, html {background-image: url(\' \') !important; background: #f7f7f7 !important; }",
		" div.b-header, element.style, .topcover{background-image: url(\' \') !important; background: #bdbdbd !important; }",
		" header.header{background-image: url(\' \') !important; background: #bdbdbd !important; }",
		" .region-back, .main-page__background-wrap {background: none !important; background-image: url(\' \') !important; background: url(\' \') !important;}",
		" .sl, .sl_holder, .width.p16.tnav, .promo_def{background-image: url(\' \') !important; background: #bdbdbd !important; }",
//  !?##.b-informers__link{color: #030303 !important; }
//  !! --- расширяем полезную площадь страницы
		" .footer__wrap, .grid, .article, .nav__wrap, .j-metrics__views-out, .j-article__bounding, .j-statistics__cluster, .popup__wrap {width: 95% !important;}",
		" .grid, .article__inner.wide {margin-left: 50px !important; margin-right: 50px !important;}",
		" body, .body, .l-nav, .article-slide, .article__head, .main-wrapper, .main-wrapper main.root, .main-wrapper main.root section.content {max-width: 100% !important; width: 100% !important;}",
		" .l-columns, .l-column-15, .l-column-16-5, .b-topic-body {width: 100% !important;}",
		" .l-container, .b-topic-show__main, .mixednews__inner, .sizefix  {width: 95% !important;}",
		" .article__inner.narrow {margin-right: 3% !important;}",
		" .action-panel, .content {margin-right: 3% !important; margin-left: 3% !important;}",
		" section.standalone-news section.main{padding: 0 !important;}",
		" .l-right-column-wrapper, .description-serial__container, .column, .card-full {padding-right: 0 !important;}",
		" table.r--main, .article-item, .b-root-layout__inner, .news-item-layout, .page-base, .card-full {max-width: 100% !important; width: 100% !important;}",
		" .appWindowWithBanner, .appSearchBar{right: 0px !important;}",
		" .appWindow {width: 100% !important;}",
		" .grid_18{width: 70% !important;}",
		" .container, .seasons-links, .l-content{margin-right: 20px !important; margin-left: 20px !important; width: 100% !important;}",
		" .tvguide-wrapper, .article-layout-wrapper {width: 95% !important;}",
		" .left-side, .left-column, .left-column.js-main-column, .main-content {width: 100% !important;}",
		" .seasons-links__slider-container._with-all-link{width: 85% !important;}",
		" .b-topic-show__content iframe, .b-topic-show__text img, .b-topic-show__image img {width: auto !important;}",
		" .preview {width: 70% !important;  background: #fdfdfd !important;}",
		" .preview img, .preview > img {width: auto !important; hight: auto !important;}"
	].join("\n");
if (false || (document.domain == "rgho.st" || document.domain.substring(document.domain.indexOf(".rgho.st") + 1) == "rgho.st") || (document.domain == "rghost.ru" || document.domain.substring(document.domain.indexOf(".rghost.ru") + 1) == "rghost.ru"))
	css += [
		"body{background: none !important;}",
		" body {background-image: none !important;}",
		" .with-bg{background-image: url(\" \") !important;}",
		" .with-bg{background: url(\" \") !important;}",
		" .with-bg{background: none !important;}",
		" .with-bg{background: #c0c0c0 !important;}"
	].join("\n");
if (false || (document.domain == "riperam.org" || document.domain.substring(document.domain.indexOf(".riperam.org") + 1) == "riperam.org") || (document.domain == "riper.am" || document.domain.substring(document.domain.indexOf(".riper.am") + 1) == "riper.am"))
	css += [
		"#octo-set{background-image: none !important; padding-top: 0 !important;}",
		"  #main-wrapper{width: auto !important;}",
		" body{background-image: none !important;} ",
		" body{background: none !important;}",
		"  #main-wrapper{top: 10px !important;}",
		"  #main-wrapper > #wrap {padding: 0 10px !important;}",
	// !! cкрыть заголовок
		"  #logo {padding: 0px 0px 0 0px !important;} #search-box {margin-top: 0px !important; height: 20px !important; top: -15px !important; padding-right: 120px !important;} div.headerbar{background-color: rgb(255, 255, 255) !important; height: 0px !important;}"
	].join("\n");
if (false || (document.domain == "rusfolder.com" || document.domain.substring(document.domain.indexOf(".rusfolder.com") + 1) == "rusfolder.com") || (document.domain == "rusfolder.net" || document.domain.substring(document.domain.indexOf(".rusfolder.net") + 1) == "rusfolder.net") || (document.domain == "rusfolder.ru" || document.domain.substring(document.domain.indexOf(".rusfolder.ru") + 1) == "rusfolder.ru"))
	css += [
		"*{background: none !important;}",
		" *{background: url(\' \') !important;}",
		" *{background: silver !important; color: black !important;}",
		" div#header{height: 60px !important;} span{color: black !important; background: silver !important; border: 1px solid gray !important;} input[type=\"checkbox\"]{color: black !important; visibility: visible !important; }"
	].join("\n");
if (false || (document.domain == "rusnext.ru" || document.domain.substring(document.domain.indexOf(".rusnext.ru") + 1) == "rusnext.ru"))
	css += [
// !! расширяем
		" body{line-height: 1.0 !important;}",
		".top-div{min-height: 30px !important;}",
		" #page-wrapper {padding-top: 30px !important;}",
		" .container {max-width: 1850px !important;}"
	].join("\n");
if (false || (document.domain == "ruspravda.info" || document.domain.substring(document.domain.indexOf(".ruspravda.info") + 1) == "ruspravda.info"))
	css += [
		"body{background: white !important;}",
		" table#header_t {margin-top: 0px !important;}"
	].join("\n");
if (false || (document.domain == "rustorka.com" || document.domain.substring(document.domain.indexOf(".rustorka.com") + 1) == "rustorka.com"))
	css += " .topmenu{margin-top: 25px !important;}";
if (false || (document.domain == "rutor.org" || document.domain.substring(document.domain.indexOf(".rutor.org") + 1) == "rutor.org") || (document.domain == "new-rutor.org" || document.domain.substring(document.domain.indexOf(".new-rutor.org") + 1) == "new-rutor.org") || (document.domain == "live-rutor.org" || document.domain.substring(document.domain.indexOf(".live-rutor.org") + 1) == "live-rutor.org") || (document.domain == "free-rutor.org" || document.domain.substring(document.domain.indexOf(".free-rutor.org") + 1) == "free-rutor.org") || (document.domain == "rutor.info" || document.domain.substring(document.domain.indexOf(".rutor.info") + 1) == "rutor.info") || (document.domain == "rutor.is" || document.domain.substring(document.domain.indexOf(".rutor.is") + 1) == "rutor.is") || (document.domain == "krutor.org" || document.domain.substring(document.domain.indexOf(".krutor.org") + 1) == "krutor.org") || (document.domain == "mrutor.org" || document.domain.substring(document.domain.indexOf(".mrutor.org") + 1) == "mrutor.org") || (document.domain == "newrutor.org" || document.domain.substring(document.domain.indexOf(".newrutor.org") + 1) == "newrutor.org") || (document.domain == "rutor.in" || document.domain.substring(document.domain.indexOf(".rutor.in") + 1) == "rutor.in") || (document.domain == "ru-tor.net" || document.domain.substring(document.domain.indexOf(".ru-tor.net") + 1) == "ru-tor.net") || (document.domain == "freerutor.com" || document.domain.substring(document.domain.indexOf(".freerutor.com") + 1) == "freerutor.com") || (document.domain == "176.114.0.131" || document.domain.substring(document.domain.indexOf(".176.114.0.131") + 1) == "176.114.0.131"))
	css += [
// !! оформление от  zuefhrf
		" body{padding-top: 5px !important;}",
		" div#brTop {background-image: url(\" \") !important;}",
		" div#ws div#sidebar{top: 0px !important;}",
		" div#ws div#sidebar{right: 8px !important;}",
		" div#ws div#sidebar div.sideblock{margin-top: 0px !important;}",
		" div#ws div#content{right: 6px !important;}",
		" body, .traforet-br-logo, div[id^=\"b_pr_\"]  {background-image: url(\" \") !important;}",
		" body, .traforet-br-logo, div[id^=\"b_pr_\"]  {background: url(\" \") !important;}",
	// !??	" body, .traforet-br-logo, div[id^=\"b_pr_\"]  {background-url: none !important;}",
		" h3{text-align: left !important;}",
		" body{font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif !important;}",
		" s, strike, del {color: #C0C0C0 !important;}",
		" .fr_wrapper { width: auto !important;}",
		" .__tw{position: relative !important;}"
	].join("\n");
if (false || (document.domain == "rutracker.org" || document.domain.substring(document.domain.indexOf(".rutracker.org") + 1) == "rutracker.org") || (document.domain == "rutracker.net" || document.domain.substring(document.domain.indexOf(".rutracker.net") + 1) == "rutracker.net") || (document.domain == "rutracker.cr" || document.domain.substring(document.domain.indexOf(".rutracker.cr") + 1) == "rutracker.cr") || (document.domain == "rutracker.club" || document.domain.substring(document.domain.indexOf(".rutracker.club") + 1) == "rutracker.club") || (document.domain == "rutracker-pro.ru" || document.domain.substring(document.domain.indexOf(".rutracker-pro.ru") + 1) == "rutracker-pro.ru") || (document.domain == "rutracker.in" || document.domain.substring(document.domain.indexOf(".rutracker.in") + 1) == "rutracker.in") || (document.domain == "rutracker.nl" || document.domain.substring(document.domain.indexOf(".rutracker.nl") + 1) == "rutracker.nl") || (document.domain == "sssr-rutracker.org" || document.domain.substring(document.domain.indexOf(".sssr-rutracker.org") + 1) == "sssr-rutracker.org"))
	css += [
		" .branding #page_container {background-image: url(\" \") !important;}",
		" .nav {background: url(\" \") !important;}",
	// !	" !!##body.branding{-webkit-transform: scaleX(1) !important;}
		" body{-webkit-transform: none !important;}",
		" div#logo{min-height: 23px !important;}"
//	!	" div.topmenu{padding-top: 24px !important;}"
	].join("\n");
if (false || (document.domain == "safety-gate.me" || document.domain.substring(document.domain.indexOf(".safety-gate.me") + 1) == "safety-gate.me"))
	css += [
//  ! !!  --- широко
		" .main,.main-wrap,.header,.header-main{width: 100% !important;}",
		" div.all,div.all-wrap,.pageWidth{max-width: 100% !important; width: 100% !important;}",
		" article,.header,.header-main{width: 100% !important;}",
		" .xbBoxed,.pageContent{max-width: 100% !important;}",
		" div.content{width: 80% !important;}",
		" div.sidebar1{width: 18% !important;}"
].join("\n");
if (false || (document.domain == "samlab.ws" || document.domain.substring(document.domain.indexOf(".samlab.ws") + 1) == "samlab.ws"))
	css += [
		"div.box.main {width: auto; !important;}",
		" div#right {width: 2px; !important;}"
	].join("\n");
if (false || (document.domain == "samlib.ru" || document.domain.substring(document.domain.indexOf(".samlib.ru") + 1) == "samlib.ru"))
	css += [
		"body {font-family: sans-serif !important; line-height: 140% !important; color: #B2B2B2 !important; background: #3A3E46 !important;}",
		" font {color: #B2B2B2 !important;}",
		" table, td, td font {color: #BEBEBE !important; background-color: #555C66 !important;}",
		" a:link {color: #9DD7FF !important;}",
		" a:visited {color: #EAB6FF !important;}",
		" a:hover {color: #F0B2B2 !important;}",
		" dl {margin-top: 1em !important;}"
	].join("\n");
if (false || (document.domain == "securitylab.ru" || document.domain.substring(document.domain.indexOf(".securitylab.ru") + 1) == "securitylab.ru"))
	css += [
		" #content #left{margin-left: 0px !important; max-width: 1000px !important;}",
// !! логотип
		" div#header{height: 00px !important; background-color: white !important;} div#MAIN_MENU{top: 0px !important;}"
	].join("\n");
if (false || (document.domain == "sportbox.ru" || document.domain.substring(document.domain.indexOf(".sportbox.ru") + 1) == "sportbox.ru"))
	css += [
		" body{background: none !important; padding-top: 0px !important;}",
		" .sb_c_topmed_olymp, .gold, .silver, .bronze {background: none !important;}",
		" [class*=\"AnnounceBlock\"]{display: none !important;}"
	].join("\n");
if (false || (document.domain == "sports.ru" || document.domain.substring(document.domain.indexOf(".sports.ru") + 1) == "sports.ru") || (document.domain == "tribuna.com" || document.domain.substring(document.domain.indexOf(".tribuna.com") + 1) == "tribuna.com"))
	css += [
		"  html > body {background-color: #a7a7a7 !important;}",
		"    #branding-layout:not(#id), body.img-bg {padding-top: 0 !important;}",
		"    #branding-layout:not(#id), .page-layout {margin-top: 0 !important;}",
		"    #branding-layout > a {width: 0 !important; height: 0 !important; left: -10000px !important;}",
		"    [data-content-name=\"banner-static\"] {pointer-events: none !important;}"
	].join("\n");
if (false || (document.domain == "tfile.me" || document.domain.substring(document.domain.indexOf(".tfile.me") + 1) == "tfile.me") || (document.domain == "my-tfile.org" || document.domain.substring(document.domain.indexOf(".my-tfile.org") + 1) == "my-tfile.org") || (document.domain == "tfile.cc" || document.domain.substring(document.domain.indexOf(".tfile.cc") + 1) == "tfile.cc") || (document.domain == "tfile.co" || document.domain.substring(document.domain.indexOf(".tfile.co") + 1) == "tfile.co") || (document.domain == "tfile-music.org" || document.domain.substring(document.domain.indexOf(".tfile-music.org") + 1) == "tfile-music.org"))
	css += [
		" body{background: url() !important;}",
		" body{background-image: none !important;}",
		" body{background-attachment: none !important;}",
		" div#brTop{background-image: url(\'\') !important;}",
		" element.style{background: url() !important;}",
		" element.style, #skin_crown{background-image: url() !important;}",
		" body{background: #D4D4D4 !important;}",
		" body{padding: 0 !important;}",
		" table#home_c{width: inherit !important;}",
		" [id^=\"top_\"]{width: inherit !important;}",
		" body{padding-top: 0px !important;}",
		" body, .traforet-br-logo, div[id^=\"b_pr_\"]  {background-image: url(\" \") !important;}",
		" body, .traforet-br-logo, div[id^=\"b_pr_\"]  {background: url(\" \") !important;}",
		" body, .traforet-br-logo, div[id^=\"b_pr_\"]  {background-url: none !important;}",
		// !! расширяем
		" body, #foot_links{width: 100% !important;}",
		" #foot_links{margin: 0px !important; padding: 0px !important;}",
		" table#home_c{width: inherit !important;}",
		" [id^=\"top_\"]{width: inherit !important;}"
	].join("\n");
if (false || (document.domain == "tfile-music.org" || document.domain.substring(document.domain.indexOf(".tfile-music.org") + 1) == "tfile-music.org"))
	css += [
		"body {width: 100% !important; }"
	].join("\n");
if (false || (document.domain == "the-village.com.ua" || document.domain.substring(document.domain.indexOf(".the-village.com.ua") + 1) == "the-village.com.ua") || (document.domain == "the-village.ru" || document.domain.substring(document.domain.indexOf(".the-village.ru") + 1) == "the-village.ru"))
	css += [
		".page-content {background-color: inherit !important;}",
		"    .page-content {padding-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "thg.ru" || document.domain.substring(document.domain.indexOf(".thg.ru") + 1) == "thg.ru"))
	css += [
		"body {background: whitesmoke !important;}",
		"    body > div[style*=\'1010\'] {width: auto !important; margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "tjournal.ru" || document.domain.substring(document.domain.indexOf(".tjournal.ru") + 1) == "tjournal.ru") || (document.domain == "vc.ru" || document.domain.substring(document.domain.indexOf(".vc.ru") + 1) == "vc.ru"))
	css += [
		"body:not(#id) {background-color: #f0f0f0 !important;}"
	].join("\n");
if (false || (document.domain == "tnt-online.ru" || document.domain.substring(document.domain.indexOf(".tnt-online.ru") + 1) == "tnt-online.ru"))
	css += [
		"body {background-color: #fff !important;}",
		"    #all:not(#id) {top:14px !important;}"
	].join("\n");
if (false || (document.domain == "torrent-tv.ru" || document.domain.substring(document.domain.indexOf(".torrent-tv.ru") + 1) == "torrent-tv.ru"))
	css += [
		" body {background-image: none !important; padding-top: 0px !important;}",
		" div#main-wrapper {top: auto !important;}",
		" div.news-text {width: auto !important;}",
		" div[class^=\"usual-header\"] {width: 126% !important;}",
		" div[class=\"usual\"] {width: 132% !important;}",
		" div[class^=\"usual-content\"] {width: 99% !important;}"
// !!
// !!		" body > div:nth-of-type(1) {background: url() !important;}",
// !!		" body {background: gray !important;}",
].join("\n");
if (false || (document.domain == "torrentino.com" || document.domain.substring(document.domain.indexOf(".torrentino.com") + 1) == "torrentino.com") || (document.domain == "torrentino.ru" || document.domain.substring(document.domain.indexOf(".torrentino.ru") + 1) == "torrentino.ru"))
	css += [
		// !! расширяем
		" .container {width: 100% !important;}",
		" .span9 {width: 95% !important;}",
].join("\n");
if (false || (document.domain == "turbobit.net" || document.domain.substring(document.domain.indexOf(".turbobit.net") + 1) == "turbobit.net"))
	css += " html {background: none !important;}";
if (false || (document.domain == "velolive.com" || document.domain.substring(document.domain.indexOf(".velolive.com") + 1) == "velolive.com"))
	css += " body {background: url() !important;}";
if (false || (document.domain == "vesti.ru" || document.domain.substring(document.domain.indexOf(".vesti.ru") + 1) == "vesti.ru"))
	css += [
		" .bottom_bg {background: none !important;}",
		" body, .head, .all_wrap {background: url(\" \") !important;}"
	].join("\n");
if (false || (document.domain == "vipfiles.nu" || document.domain.substring(document.domain.indexOf(".vipfiles.nu") + 1) == "vipfiles.nu"))
	css += [
		" div.loginformbox{background: none !important;}",
		" div.tophhhhheader{background: none !important; padding: 0 !important; height: 75px !important;}",
		" div.tophhhhheader > div.item1{height: 10px !important;}",
		" div.tophhhhheader > div.item2{float: left !important; width: 500px !important;}",
		" div.wrapper{margin: 0 !important; width: inherit !important;}",
		" div.wrapwide.topheadwide{background: none !important;}"
	].join("\n");
if (false || (document.domain == "dns-shop.ru" || document.domain.substring(document.domain.indexOf(".dns-shop.ru") + 1) == "dns-shop.ru"))
	css += " div.wrapper{width: auto !important;}";
if (false || (document.domain == "yap.ru" || document.domain.substring(document.domain.indexOf(".yap.ru") + 1) == "yap.ru") || (document.domain == "yaplakal.com" || document.domain.substring(document.domain.indexOf(".yaplakal.com") + 1) == "yaplakal.com"))
	css += [
		"html > body:not(#id) {background-color: #9ab9a7 !important;}",
		"    #footer {background: none !important; padding: 0 !important;}",
		"    #top-line {background: none !important; padding: 0 !important; height: auto !important;}",
		" body{background: none !important;}",
		" #footer{background: url() !important;}",
		" #footer{background-image: none !important;}",
		" #content{max-width: none !important;}"
].join("\n");
if (false || (document.domain == "zagonka.tv" || document.domain.substring(document.domain.indexOf(".zagonka.tv") + 1) == "zagonka.tv"))
	css += [
		".sitebox:not(#id) {margin-top: 0 !important;}"
	].join("\n");
if (false || (document.domain == "zaycev.net" || document.domain.substring(document.domain.indexOf(".zaycev.net") + 1) == "zaycev.net"))
	css += [
		// !! --- расширяем ---
		"  .page-head-bg {width: 99% !important; margin-left: auto !important;}",
		"  #page-head.stick {width: 98% !important; margin-left: auto !important;}",
		"  .body-gaps {max-width: 100% !important; left: 5px !important; margin-left: auto !important; width: 99% !important;}",
		"  body{ padding-top: 0px !important; padding: 5px !important; max-width: 100% !important;}",
		"  div[class=\"body-branding\"]{background: grey !important; padding-top: 0px !important; padding: 5px !important; max-width: 100% !important;}"
	].join("\n");
if (false || (document.domain == "zalil.su" || document.domain.substring(document.domain.indexOf(".zalil.su") + 1) == "zalil.su"))
	css += [
		" body{background: none !important;}",
		" body{background-color: gray !important;}",
		" body{background-image: none !important;}"
	].join("\n");
if (false || (document.domain == "taker.im" || document.domain.substring(document.domain.indexOf(".taker.im") + 1) == "taker.im"))
	css += [
// !!    скрываем рекламные ссылки (СПАМ) в тексте
		" a[href^=\"/phpBB2/goto/http://www.ebay.com/sch/\"][rel=\"nofollow\"]{color: #333 !important; text-decoration: none !important; pointer-events: none !important;}"
	].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
}());
//  позаимствовано у lainverse (https://greasyfork.org/ru/scripts/809-no-yandex-ads)
//  Удаляет рекламу из поиска Яндекс
(function(){
    'use strict';
    var win = (unsafeWindow || window),
        // http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
        isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        isChrome = !!window.chrome && !!window.chrome.webstore,
        isSafari = (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ||
                    (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || safari.pushNotification)),
        isFirefox = typeof InstallTrigger !== 'undefined',
        inIFrame = (win.self !== win.top),
        _getAttribute = Element.prototype.getAttribute,
        _setAttribute = Element.prototype.setAttribute,
        _de = document.documentElement,
        _appendChild = Document.prototype.appendChild.bind(_de),
        _removeChild = Document.prototype.removeChild.bind(_de);
 // console.log('01');
    if (/^https?:\/\/(mail\.yandex\.|music\.yandex\.|news\.yandex\.|(www\.)?yandex\.[^\/]+\/(yand)?search[\/?])/i.test(win.location.href)) {
        // https://greasyfork.org/en/scripts/809-no-yandex-ads
        (function(){
            var adWords = ['Яндекс.Директ','Реклама','Ad'],
                genericAdSelectors = (
                    '.serp-adv__head + .serp-item,'+
                    '#adbanner,'+
                    '.serp-adv,'+
                    '.b-spec-adv,'+
                    'div[class*="serp-adv__"]:not(.serp-adv__found):not(.serp-adv__displayed)'+
					'._type_smart-banner'+
					'.stripe_type_promo'+
					'.footer_distro_yes'
                );
            function remove(node) {
                node.parentNode.removeChild(node);
            }
            // Generic ads removal and fixes
            function removeGenericAds() {
            //    var ss;
            //    ss = document.querySelector('.serp-header');
            //    if (ss) {
            //        ss.style.marginTop='0';
            //    }
                var s = document.querySelector('.serp-header');
                if (s) {
                    s.style.marginTop='0';
                }
        //         for (s of document.querySelectorAll(genericAdSelectors)) {
        //            remove(s);
        //        }
		// !! Правим ошибку синтаксиса (s of arr) не работает -> старый вариант
			(function(s, i){
				i = s.length;
				while(i--){
					remove(s[i]);}
			})(document.querySelectorAll(genericAdSelectors), 0);
		//	})(document.querySelectorAll('.serp-adv__head + .serp-item'), 0);
			(function(s){
				for (var l = 0; l < s.length; l++) remove(s[l]);
			})(document.querySelectorAll(genericAdSelectors));
			//})(document.querySelectorAll(['#adbanner',
			//							  '.serp-adv',
			//							  '.b-spec-adv',
			//							  'div[class*="serp-adv__"]:not(.serp-adv__found):not(.serp-adv__displayed)',
			//							  '._type_smart-banner',
			//							  '.stripe_type_promo',
			//							  '.footer_distro_yes'].join(',')));
        //    }
            }
            // Search ads
            function removeSearchAds() {
				  var ll;
            /*    var s, item, l;
                for (s of document.querySelectorAll('.t-construct-adapter__legacy')) {
                    item = s.querySelector('.organic__subtitle');
                    l = window.getComputedStyle(item, ':after').content;
                    if (item && adWords.indexOf(l.replace(/"/g,'')) > -1) {
                        remove(s);
                        console.log('Ads removed.');
                    }
                }
                } */
				var s = document.querySelectorAll('.t-construct-adapter__legacy');
				for (var l = 0; l < s.length; l++) {
					var item = s[l].querySelector('.organic__subtitle');
					ll = window.getComputedStyle(item, ':after').content;
				//	if (!item) continue;
				//	if (item && adWords.indexOf(item.textContent) > -1){
				//		remove(s[l]);
				//		console.log('Ads removed.');
				//	}
                    if (item && adWords.indexOf(ll.replace(/"/g,'')) > -1) {
                        remove(s);
                        console.log('Ads removed.');
                    }
				}
            }
            // News ads
            function removeNewsAds() {
              /*
                for (var s of document.querySelectorAll(
                    '.page-content__left > *,'+
                    '.page-content__right > *:not(.page-content__col),'+
                    '.page-content__right > .page-content__col > *'
                )) {
                    if (s.textContent.indexOf(adWords[0]) > -1 ||
                        (s.clientHeight < 15 && s.classList.contains('rubric'))) {
                        remove(s);
                        console.log('Ads removed.');
                    }
                }
                  */
                var s = document.querySelectorAll(['.page-content__left > *',
                    '.page-content__right > *:not(.page-content__col)',
                    '.page-content__right > .page-content__col > *'].join(','));
				for (var l = 0; l < s.length; l++) {
                    if (s[l].textContent.indexOf(adWords[0]) > -1 ||
                        (s[l].clientHeight < 15 && s[l].classList.contains('rubric'))) {
                        remove(s[l]);
                        console.log('Ads removed.');
                    }
                }
            }
            // Music ads
            function removeMusicAds() {
              /*  for (var s of document.querySelectorAll('.ads-block')) {
                    remove(s);
                } */
				var s = document.querySelectorAll('.ads-block');
				for (var l = 0; l < s.length; l++) {
					remove(s[l]);
                        console.log('Ads removed.');
			    }
            }
            // Mail ads
            function removeMailAds() {
                var slice = Array.prototype.slice,
                    nodes = slice.call(document.querySelectorAll('.ns-view-folders')),
                    node, len, cls;
               /* for (node of nodes) {
                    if (!len || len > node.classList.length) {
                        len = node.classList.length;
                    }
                } */
				for (var l = 0; l < nodes.length; l++) {
					node = nodes[l];
                    if (!len || len > node.classList.length) {
                        len = node.classList.length;
                    }
			    }
                node = nodes.pop();
                while (node) {
                    if (node.classList.length > len) {
                      /*  for (cls of slice.call(node.classList)) {
                            if (cls.indexOf('-') === -1) {
                                remove(node);
                                break;
                            }
                        } */
						for (var l7 = 0; l7 < node.classList.length; l7++) {
							cls = slice.call(node.classList[l7]);
                            if (cls.indexOf('-') === -1) {
                                remove(node);
                                break;
                            }
					    }
                    }
                    node = nodes.pop();
                }
            }
            // News fixes
            function removePageAdsClass() {
                if (document.body.classList.contains("b-page_ads_yes")){
                    document.body.classList.remove("b-page_ads_yes");
                    console.log('Page ads class removed.');
                }
            }
			// myAdd
			function removePageAdsClass2() {
				if (document.body.classList.contains("stripe_type_promo")){
					document.body.classList.remove("stripe_type_promo");
					console.log('Page ads2 class removed.');
				}
				if (document.body.classList.contains("dist-popup_product_browser")){
					document.body.classList.remove("dist-popup_product_browser");
					console.log('Page ads2 class removed.');
				}
				if (document.body.classList.contains('[data-bem*="bannerid"]')){
					document.body.classList.remove('[data-bem*="bannerid"]');
					console.log('Page ads3 class removed.');
				}
			}
            // Function to attach an observer to monitor dynamic changes on the page
            function pageUpdateObserver(func, obj, params) {
                if (obj) {
                    var o = new MutationObserver(func);
                    o.observe(obj,(params || {childList:true, subtree:true}));
                }
            }
            // Cleaner
			// не работает частично (со слушателем)
        //    document.addEventListener ('DOMContentLoaded', function() {
                removeGenericAds();
                if (win.location.hostname.search(/^mail\./i) === 0) {
                removeGenericAds();
                    pageUpdateObserver(function(ms, o){
                        var aside = document.querySelector('.mail-Layout-Aside');
                        if (aside) {
                            o.disconnect();
                            pageUpdateObserver(removeMailAds, aside);
                        }
                    }, document.querySelector('BODY'));
                    removeMailAds();
                } else if (win.location.hostname.search(/^music\./i) === 0) {
                removeGenericAds();
                    pageUpdateObserver(removeMusicAds, document.querySelector('.sidebar'));
                    removeMusicAds();
                } else if (win.location.hostname.search(/^news\./i) === 0) {
                removeGenericAds();
                    pageUpdateObserver(removeNewsAds, document.querySelector('BODY'));
                    pageUpdateObserver(removePageAdsClass, document.body, {attributes:true, attributesFilter:['class']});
                    removeNewsAds();
                    removePageAdsClass();
                    removePageAdsClass2();
                } else {
                removeGenericAds();
                    pageUpdateObserver(removeSearchAds, document.querySelector('.main__content'));
                    pageUpdateObserver(removePageAdsClass2, document.body, {attributes:true, attributesFilter:['class']});
                    removeSearchAds();
                    removePageAdsClass2();
                }
        //    });
        })();
     //   return; //skip fixes for other sites
    }
    // Yandex Link Tracking
    if (/^https?:\/\/([^.]+\.)*yandex\.[^\/]+/i.test(win.location.href)) {
        // Partially based on https://greasyfork.org/en/scripts/22737-remove-yandex-redirect
        (function(){
            var link, selectors = (
                'A[onmousedown*="/jsredir"],'+
                'A[data-vdir-href],'+
                'A[data-counter]'
            );
            function removeTrackingAttributes(link) {
                link.removeAttribute('onmousedown');
                if (link.hasAttribute('data-vdir-href')) {
                    link.removeAttribute('data-vdir-href');
                    link.removeAttribute('data-orig-href');
                }
                if (link.hasAttribute('data-counter')) {
                    link.removeAttribute('data-counter');
                    link.removeAttribute('data-bem');
                }
            }
            function removeTracking(scope) {
                for (link of scope.querySelectorAll(selectors)) {
                    removeTrackingAttributes(link);
                }
            }
            document.addEventListener('DOMContentLoaded', function(e) {
                removeTracking(e.target);
            });
            (new MutationObserver(function(ms) {
                var m, node;
                for (m of ms) {
                    for (node of m.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.tagName === 'A' && node.matches(selectors)) {
                                removeTrackingAttributes(node);
                            } else {
                                removeTracking(node);
                            }
                        }
                    }
                }
            })).observe(_de, {childList:true, subtree:true});
        })();
        return; //skip fixes for other sites
    }
}());
//  Удаляет рекламу из вконтакта
	(function(){
		var lct = location.href;
		if(lct.match(/^https?:\/\/(.*\.)?(vkontakte\.ru|vk\.com)\/.*/)) {
			// Generic ads removal
			(function(s){
				for (var l = 0; l < s.length; l++) s[l].parentNode.removeChild(s[l]);
			})(document.querySelectorAll('#left_ads,.ads_ads_box,.ads_ads_all_ads,.ads_ad_box2,.ads_ad_box3,.ads_ad_box4,.ads_ad_box5,.ads_ad_box6,.ads_ad_box7,.ads_ad_box8,.ads_ad_text_box'));
			console.log('Page ads class removed.');
		}
	}());
//  Удаляет рекламу из gismeteo
	(function(){
		var lct = location.href;
		if(lct.match(/^https?:\/\/(.*\.)?gismeteo\./)) {
			var removeA = function() {
				var s = document.querySelectorAll('yatag,#yandex_ad_horiz,#ad-left,#ad-lb-content,#ad-right.rframe,#rbc,.cright,.media_top,#soft-promo,.soft-promo,.soft-promo-wrap,#yandex_ad,div#informer.rframe,.rframe.awad,#ad-lb.rframe,[id*=yandex],#weather-news,#bottom_shadow,a#logo,#smi2,[id*=MarketGid],.news_frame,.media_left,.media_content,.media_frame,#counter,#adfox_catfish,[id*=banner],iframe,#soft-promo.soft-promo,div.media_middle,div.media-frame,#ad-top,#rek-top,[id*=AdFox],[id^=rek-],#weather-lb.rframe,#weather-left.rframe,#weather-top,[class^=text_ad],[class^=textAd],[class^=text-ad],[class^=ad-],[class*=pub_300x250],[class^=soc2],[class^=social-],div[class*=side___i],div.ad.ad_240x400,.itemAd,div[class=box__i],[class^=plista],div.side,div.side>noindex>div.extra,div[class=right_col_1]>div[class*=__frame]>div[id^=y],div[class=__frame]>div[id^=y],[id^=adfox],[id^=google_],a#aw0,[id^=yandex_],div.cright>div#information.rframe,div.c-right>div#information.rframe,div.c-right>div#weather-right.rframe,div.c-right>div#weather-gis-news-alter,.newstape__feed,#information,#informer,.instagramteaser,[data-type=rbc],[href*=\"type=news_type\"]');
				for (var l = 0; l < s.length; l++) {
					if(s[l].parentNode) s[l].parentNode.removeChild(s[l]);
				}
			}
			(function(s){
				var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
				if (s) (new MutationObserver(removeA)).observe(s,{childList:true});
			})(document.querySelector('.measure'));
			// Google Chrome trick: sometimes the script is executed after that DOMContentLoaded was triggered, in this case we directly run our code
			if (document.readyState == "complete") {
				removeA();
				console.log('Page ads class removed.');
			} else {
				window.addEventListener('DOMContentLoaded', removeA);
				console.log('Page ads class removed.');
			}
		}
	}());
//  Удаляет рекламу из 4pda
	(function(){
// пока убрано, поломалось
	}());
}());