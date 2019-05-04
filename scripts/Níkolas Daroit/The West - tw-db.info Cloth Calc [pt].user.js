// ==UserScript==
// @name The West - tw-db.info Cloth Calc [pt]
// @version 0.48 Rev. 2
// @description The West Script: Cloth Calculation for game version 1.34 or higher
// @author Bluep, scoobydoo, Dun, Petee [tw-db.info]
// @namespace http://tw-db.info
// @grant none
// @website http://tw-db.info
// @include http://*.the-west.*/game.php*
// @include https://*.the-west.*/game.php*
// @include http://*.tw.innogames.*/game.php*
// @include https://*.tw.innogames.*/game.php*
// ==/UserScript==
(function(f) {
    var d = document,
        s = d.createElement('script');
    s.setAttribute('type', 'application/javascript');
    s.textContent = '(' + f.toString() + ')()';
    (d.body || d.head || d.documentElement).appendChild(s);
    s.parentNode.removeChild(s)
})(function() {
    if (isDefined(window.TWDB)) {
        new west.gui.Dialog(TWDB.script.name, '<div class="txcenter"><b><br>O UserScript &#38;quot;ClothCalc&#38;quot; está instalado duas vezes com duas versões linguísticas diferentes. Terás de desinstalar uma delas para o script funcionar correctamente!</br></b></div>', west.gui.Dialog.SYS_WARNING).addButton("OK").show();
    } else {
        TWDB = {};
        TWDB.script = new Object({
            version: 48,
            revision: 2,
            name: "The West - tw-db.info Cloth Calc",
            update: "tw-db.info/cache/userscripts/clothcalc/clothcalc_pt.user.js",
            check: "tw-db.info/cache/userscripts/clothcalc/version",
            url: "tw-db.info",
            protocol: location.protocol.match(/^(.+):$/)[1],
            gameversion: 2.7,
            lang: "pt"
        });
        try {
            TWDB.script.notes = jQuery.parseJSON('[{\"version\":\"48\",\"notes\":\"[main] Updater fixed <br>\\n[chestAnalyser] Compatibility with TWToolkit <br>\\n[bugfix] Silver jobs reset fixed <br>\\n[bugfix] Bonusjob checkboxes at minimap fixed <br>\\n[bugifx] Experience bar fixed <br>\\n[bugifx] Forum last post fixed <br>\\n[misc] Only link quest, which are on tw-db.info <br>\\n[misc] Ready for jQuery v3 <br>\"},{\"version\":\"47\",\"notes\":\"[directsleep] Hotel-shortlink support for players with a town but no alliance <br\\\/>\\n[misc] Silver jobs reset time set to server time at 2 or 3am (depends on DST)\"},{\"version\":\"46\",\"notes\":\"[buyTip] If you have learned a recipe, it won\\u0027t be shown as new anymore. <br\\\/>\\n[marketselldialog] If there is no selling price at the market, it takes the half of the buying price <br\\\/>\\n[directsleep] Hotel-shortlink for townless players added <br\\\/>\\n[nowofnuggets] Re-added and fixed for future events <br\\\/>\\n[chestAnalyser] Layout fixed\"},{\"version\":\"45\",\"notes\":\"[misc] Updated fort ranks to include sergeant <br \\\/>\\n[misc] Function bonds instead of nuggets removed, no more needed <br \\\/>\\n[misc] Jobanalyser for RU server fixed <br \\\/>\\n[misc] MarketMap for beta fixed <br \\\/>\"},{\"version\":\"44\",\"notes\":\"Great news! <b>Tom Robert<\\\/b> has generously offered to take over ClothCalc development! We owe him a lot of thanks for the following features and fixes: <br>\\n[questbook] Toggle between start and end text of completed quests in the questbook is fixed. <br>\\n[calculator] Battle formula updated. <br>\\n[inventory] If you have an upgraded item, the base item won\\u0027t be shown as new anymore. <br>\\n[inventory] If you placed a bid on an item, it won\\u0027t be shown as new anymore. <br>\\n[market] Item count in market map fixed <br>\\n[selltip] High level weapons fixed\"},{\"version\":\"43\",\"notes\":\"[main *new*] Equip items button in ClothCalc window<br>\\n[tasklist] labor point hints have a star background now when you\\u0027ve equipped your best cloth<br>\\n[bugfix] job list in ClothCalc window is sorted again on startup<br>\\n[bugfix] bonus job import is working again<br>\\n[bugfix] alternative currency in tombolas working again\\n\"},{\"version\":\"42\",\"notes\":\"[misc] changing the amount in Crafting works the same way now as in Skills window, plus mouse wheel support in both<br \\\/>\\n[misc] labor point info on Task List switchable now and new hints there<br \\\/>\\n[misc *new*] option to sell all but one of the selected item to the Wandering Trader<br \\\/>\\n[misc *new*] option to disable scrollbars on small screens or when moving windows too far<br \\\/>\\n[misc *new*] option to reposition event counters (event currency, Hiro\\u0027s script) on wide screens\"},{\"version\":\"41\",\"notes\":\"[main] support for the upcoming new item IDs<br>\\n[main] automatic conversion of CC data (most of all statistics) for the ID update<br>\\n[main] job search automatically selects the job when search is narrowed down to only one<br>\\n[main bugfix] using cursor keys in job search works again<br>\\n[settings] rearranged the options and added captions for more clarity<br>\\n[jobs *new*] ClothCalc button in job windows<br>\\n[jobs *new*] display of labor points in job window title<br>\\n[jobs *new*] display of labor points in the task queue<br>\\n[misc *new*] instant hotel button on town signs<br>\\n[misc *new*] show BBCodes in received telegrams<br>\\n[misc *new*] show values on experience bar - thanks to <a href=\\\"https:\\\/\\\/greasyfork.org\\\/scripts\\\/3935-the-west-script-suite\\\">Leones\\\/Slygoxx<\\\/a><br>\\n[misc *new*] option to disable the Shop SALE sign below the saloon<br>\\n[misc *new*] you can assign a hotkey to ClothCalc in the <u>game<\\\/u> settings -&gt; Keyboard shortcuts<br>\\n[misc *new*] option to minimize the Chat rooms GUI element bottom left (compatible with Diggo\\u0027s Friends Script)<br>\\n[pin items] redesigned to fit the new inventory layout<br>\\n[main] option to open the Wear window minimized\"},{\"version\":\"39\",\"notes\":\"Support for HTTPS <br \\\/>\\r\\nKO timer ready for beta protection system\"},{\"version\":\"38\",\"notes\":\"[pin items] feature to pin items in the recently used section of Inventory <br\\\/>\\n[analyser] job analyser can now switch to display all found products and items <br\\\/>\\n[bugfixes] selltip unequip <br\\\/>\"},{\"version\":\"37\",\"notes\":\"[bugfix] fix for self opening chat when chat extension was enabled <br>\\n[bugfix] fix for buy tip in the new shop <br>\\n[market] option to save your preferences in the market sell dialog <br>\\n[crafting] reminder for the level 600 crafting recipe waiting periods <br>\\n[settings] tiny improvements to the TW-DB settings dialog <br>\\n[misc] duel motivation bar is replaced by a K.O. timer when you died <br>\\n[misc] added option to avoid nuggets as default payment in event games (must be explicitly enabled) <br>\\n[misc] added option to skip the Premium dialog when using fetch all in the market (must be explicitly enabled)\"},{\"version\":\"36\",\"notes\":\"[main] ready for the new calculator engine (comming soon) <br \\\/>\\r\\n[main] actual bonus level shown in clothcalc window <br \\\/>\\r\\n[main] bugfixes (attribute images in customs, level based attributes NaN, ...)\"},{\"version\":\"35\",\"notes\":\"[main] Black Friday items work with the calculator now <br \\\/>\\r\\n[main] calculation data update is necessary less often (more work done on the client) <br \\\/>\\r\\n[main] ready for adding fair construction job\"},{\"version\":\"34\",\"notes\":\"[*NEW*] [buytip] fixed major bug, data update necessary!<br \\\/>\\r\\n[main] job list displays rewards for the best equipment, current reward for the selected job displayed separately <br \\\/>\\r\\n[main] various bugfixes, some performance issues addressed, more precise reward calculation <br \\\/>\\r\\n[main] fixed job reward calculation (+-1 precision formulas), data update needed! <br \\\/>\\r\\n[main] added sorting jobs by danger <br \\\/>\\r\\n[main] now checks for duplicit clothcalc installation <br \\\/>\\r\\n[sleep] added vertical scrollbar\"},{\"version\":\"33\",\"notes\":\"[main] ready for 2.08.1 <br \\\/>\\r\\n[questwiki] added option to switch between introduction \\\/ completion texts in the quest book (already last version) <br \\\/>\\r\\n[questwiki] added option to always show full quest texts (default OFF!) <br \\\/>\\r\\n[jobs] motivation calculation adjusted for 25% steps <br \\\/>\\r\\n[main] BUGFIXes: server data loading sometimes got stuck; CC not working for players below level 10 <br \\\/>\\r\\n[buytip] fix for the new Mobile Trader window\"},{\"version\":\"32\",\"notes\":\"small update for game version 2.06; hotfix for beta worlds\"},{\"version\":\"31\",\"notes\":\"tiny update for game version 2.05\"},{\"version\":\"30\",\"notes\":\"script is now ready for gameversion 2.04\\r\\nthere are still some fields to fix, but the most parts should work \"},{\"version\":\"25\",\"notes\":\"[bonusjobs] security query before reset<br \\\/>\\r\\n[bonusjobs] sorting of the export<br \\\/>\\r\\n[chestanalyser] some stats for future drops of chests, bags & collector cards<br \\\/>\\r\\n[marketreminder] add reminder for market offers<br \\\/>\\r\\n[other] button for deposit money<br \\\/>\"},{\"version\":\"24\",\"notes\":\"[ClothCalc] Bugfix, Motivation was not included at Wages<br \\\/>\\r\\nFeatures listed below comes from an other Userscript \\\"stewues The West Tools\\\"<br \\\/>\\r\\nAs he decided to stop Offering his tool, he has asked me to include this Features into our Script.<br \\\/>\\r\\nFirst at this Point <b>Thanks a lot!<\\\/b> Stewue for your hard Work and your Decision to Offer this Features now through this Script.<br \\\/>\\r\\n- button for sleeping into best hotel room or fort barrack<br \\\/>\\r\\n- confirmation prompt before quest cancel<br \\\/>\\r\\n- hint to deposit cash<br \\\/>\\r\\n- button for last post on ingameforum threads<br \\\/>\\r\\n- moved button for new post on ingameforum to upper menu<br \\\/>\\r\\n- add duelmotivation into userinterface<br \\\/>\\r\\n- remove automation pa hints, like the nugget picture on work queue<br \\\/>\\r\\n- activate Fortrecruitment also for non generals and captains<br \\\/>\\r\\n- enhance the Fortrecruitment through some more Features<br \\\/>\\r\\n- the market map<br \\\/>\"},{\"version\":\"23\",\"notes\":\"[general] script is ready for version 2.03, all features should be working<br \\\/>\\r\\n[clothcalc] added the wages values, honour to petee for his great work to find out the wage formula<br \\\/>\"},{\"version\":\"22\",\"notes\":\"[clothcalc] fixed Bug with faulty Detection of corrupted Cache<br \\\/>\\r\\n[questwiki] Show tw-db Link on Questwindow<br \\\/>\\r\\n[questswiki] Show total Amount of Items at Inventory<br \\\/>\\r\\n[questswiki] Button for Open the ClothCalc Window<br \\\/>\\r\\n[buytip] added new sets<br \\\/>\\r\\n[buytip] fort boni of natty where wrong<br \\\/>\"},{\"version\":\"21\",\"notes\":\"[general] fixed failed script start at gameversion 2.02<br \\\/>\\r\\n[errorlog] fixed Error through new Notification-Bar Object at gameversion 2.02<br \\\/>\\r\\n[settings] added Group for the SellTip Settings<br \\\/>\\r\\n[SellTip] add Option for never sell Set-Items<br \\\/>\\r\\n[bonusjobs] discovered Bonus Jobs are now cached<br \\\/>\\r\\n[bonusjobs] add Export and Import for discovered Bonus Jobs<br \\\/>\\r\\n[other] Option to remove the Game-Hints on Notification Bar, which could not be disabled through Game-Settings<br \\\/>\\r\\n[other] Option for a Scroll-To Inpute Field on Minimap<br \\\/>\\r\\n[ClothCalc] fixed the Bug, that Joblist is sometime not clickable<br \\\/>\\r\\n[ClothCalc] fixed the Bug, missing fastes animal on bestwears without animal<br \\\/>\\r\\n[chat] fixed bug for missing smiley and color inject on chat windows, which are already opend on gameloading<br \\\/>\\r\\n[general] removed script parts for gameversion 1.36\"},{\"version\":\"20\",\"notes\":\"[general] reworked the Script for the-west Version 2.0 <br \\\/>\\r\\n[general] Release Notes for Script is added ingame <br \\\/>\\r\\n[Importer] the Import Userscript is now included in ClothCalc Userscript (for Gameversion 1.36 you will still need it) <br \\\/>\\r\\n[Importer] the Alliance Import Script is now directly available through the script <br \\\/>\\r\\n[ClothCalc] Basic Function is working (showing best cloth) <br \\\/>\\r\\n[ClothCalc] <b>Values for Wages and Danger when sorting the Joblist are wrong!<\\\/b> , so temporarly this feature this sorting is removed until our date is up2date<br \\\/>\\r\\n[ClothCalc] preselecting the selected Job on Minimap is ready for Version 2.0 <br \\\/>\\r\\n[ClothCalc] the sorted job List (experience, wages) could be changed from normal mode to value per minute to value per energy point <br \\\/>\\r\\n[ClothCalc] Joblist is reworked, jobs could now be searched and jobs have little popup with complete job data <br \\\/>\\r\\n[FavoriteJob] this Feature has been removed because it now emulates a premium feature <br \\\/>\\r\\n[SearchJob]the jobsearch is Version 2.0 ready, the direct start of one of the four shown job is a pa automation only feature (innos decision]<br \\\/>\\r\\n[ReportAnalyser] the basic function is reworked for game version 2.0 <br \\\/>\\r\\n[ReportAnalyser] detailed job report and detailed item report will be added later <br \\\/>\\r\\n[Chat] is ready for Version 2.0 <br \\\/>\\r\\n[BuyTip] is ready for Version 2.0<br \\\/>\\r\\n[BuyTip] set bonus is now also included here<br \\\/>\\r\\n[BuyTip] also shown on market now<br \\\/>\\r\\n[Collector] is ready for Version 2.0<br \\\/>\\r\\n[Collector] also shown on market now<br \\\/>\\r\\n[SellTip] is ready for Version 2.0<br \\\/>\\r\\n[BonusJobs]Bonus Jobs you\\u2019ve found are now shown on minimap<br \\\/>\"},{\"version\":\"10\",\"notes\":\"[ClothCalc] added Favorite Job Feature (petee)<br \\\/>disabled script for TW2.0\"},{\"version\":\"9\",\"notes\":\"[Chat] added popup on permanent whisper icon<br \\\/>\\r\\n[Chat] history ist now saved on localStorage (color, whisper)<br \\\/>\\r\\n[Chat] added permanent whisper to player menu<br \\\/>\\r\\n[Chat] added inputfield to direct input color number<br \\\/>\\r\\n[Chat] added bold and captialize options<br \\\/>\\r\\n[analyser] added table footer with overall values<br \\\/>\\r\\n[analyser] added statistics reset function<br \\\/>\\r\\n[analyser] exclude questitems from item statistic<br \\\/>\\r\\n[analyser] granular report for items (Item-Report), click on items at new table footer<br \\\/>\\r\\n[calc] added option to switch position of cloth calc window between left and right<br \\\/>\\r\\n[enhancements] added feature so you can hold the +\\\/- buttons in the skills window to change the value faster<br \\\/>\\r\\n\"},{\"version\":\"8\",\"notes\":\"added settings window<br \\\/>\\r\\nadded chat features (permanent wisper, color, smilies)<br \\\/>\\r\\nadded Report Analyser<br \\\/>\\r\\nadded second Buytip Icon if item gives bonus for current selected job<br \\\/>\\r\\nfixed with * marker for new items on market<br \\\/>\\r\\nfixed several small bugs on job search feature<br \\\/>\\r\\nfixed buyTip was not shown without calcdata update<br \\\/>\"},{\"version\":\"7\",\"notes\":\"add new feature jobsearch (petee)<br \\\/>\\r\\n\\\"new\\\" Icon will now also look at Wear Items (thx Inno optimizing your Wear Object)<br \\\/>\\r\\nchanged max gameversion to 1.36 for coming new gameversion (no problems found with new gameversion)<br \\\/>\\r\\nadded new Script Loader with Info on footer (next to servertime)<br \\\/>\"},{\"version\":\"6\",\"notes\":\"code cleaning and optimising<br \\\/>\\r\\nupdate minimap on jobchange if minimap is opend<br \\\/>\\r\\nset limit for custom jobs from 10 to 15<br \\\/>\\r\\nfixed several problems with attributes on customs<br \\\/>\\r\\nadded images for fort-customs and for attributes on customs<br \\\/>\\r\\nadded icon on Traders with tooltip for which jobs this item would give a better bonus<br \\\/>\\r\\nadded icon on Inventory with tooltip of bonus on selected job<br \\\/>\\r\\non rev. 59 added colored tooltip for better visibility<br \\\/>\\r\\non rev. 59 added icon for unused items on inventory<br \\\/>\"},{\"version\":\"5\",\"notes\":\"eleminating browser freezes<br \\\/>\\r\\nmaking custom section customisable<br \\\/>\\r\\nshowing best and current \\\"job\\\" values on custom section<br \\\/>\\r\\nchanges on cache system<br \\\/>\\r\\ncorrected code verification on rev. 34<br \\\/>\"},{\"version\":\"4\",\"notes\":\"fixed removed indexedDB.setVersion on Mozilla<br \\\/>\\r\\nbetter error handling of indexedDB, click on \\\"cache error\\\" icon will initiate a reset of indexedDB<br \\\/>\\r\\nsolution for Cache Problem on Scriptupdate with Chrome (not working on this update :( )<br \\\/>\\r\\nearlier button add, opacity to 50% until initializing isn\\u0027t finished<br \\\/>\\r\\nten second sleeper on initializing to handle chrome freezes<br \\\/>\\r\\nadded marker for items on traders which are not at own inventory<br \\\/>\\r\\nadded \\\"*\\\" prefix on market for all items which are not at own inveontory<br \\\/>\\r\\nfixed wrong levelbonus for soldiers<br \\\/>\\r\\nprevent script from be active in more than one language<br \\\/>\"},{\"version\":\"3\",\"notes\":\"fixed problem with need of cache update<br \\\/>\\r\\nfixed problem that inventory window was closed<br \\\/>\\r\\nadded best animal to every job<br \\\/>\\r\\nadded mark of weared items\"},{\"version\":\"0\",\"notes\":\"** please enter some notes for this version **\"}]');
        } catch (e) {};
        TheWestApi.version = Game.version = parseInt(Game.version, 10) ? Game.version : TWDB.script.gameversion;
        TWDB.script.gameversion = Game.version;
        TWDB.script.isDev = function() {
            return this.check.search("dev_version") !== -1
        };
        Number.prototype.round = function(e) {
            var t = Math.pow(10, e);
            return Math.round(this * t) / t
        };
        String.prototype.twdb_twiceHTMLUnescape = function() {
            return $($.parseHTML($($.parseHTML(String(this))).text())).text()
        };
        window.debLog = TWDB.script.isDev() && console.info ? function(e) {
            console.info.apply(console, ["CC:"].concat(Array.prototype.slice.call(arguments)))
        } : function(e) {};
        TWDB.images = {
            iconName: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqBJREFUeNqslEtvElEUxy90gOHRDhQpDBIEaysKNQZpYpqiLroxaUjUrV/Bpd/BD6IrdySGmK5cVzf1sSgNgrzDAB0QBpgZxnPonYZSSLvwJj/unXMP/3vOfRyDpmnkfzUGf1Kp1Lw5A7BEwTYGVNpfaul0+kxsQbMAHOCmi/aBFtAF5IWRLbC7gLtPGOalPBpZG7J8cmKxHIDtN3AKaNcVw6gCYZNp/4XV+kaRJNKs16V3wSBG9pdyKTrjgr1aBsK7LPtqPBwStdsl1mbTGiuX98HuB6zzIpgnZgJuAHfWNc2ndjpEabcn3KtUtnERupfG64jZAH7XbN5bHg5ZVRTJT0Kq416PhATBsyJJUZj3AOarxPB7BQhuGo2Rcb9PTiVpcMDzuOnErCjMVqmUpKnarxLD1TxOgyF2X1F4TPHQbC4KNtug4HY30CFSrW5AFwKcswc4K4ar3YwbjU8xLQVSPOK4iUjW5xOw94miixfFBAy9s6kyc+5WOCHLG0qrRfqtlhLv93mcZGX53PdBsZisclwGhjlA0u8cM3O3vAFNiztrNccwlyOGdpvZPju9Cw1S9X+OxdZh+IO+itG0mH63go+bzWeD4+PJ3apxXPvChiqKabXXczgGAzaRz+99DYUOwVyeFdNTDNzK5dZQCDf8/c4OPp/vgAisAY/eZjLP8VTDjUYExHALHHRe08WwMrDJQuEhW6+zaMh7PFnoPgFH9Pngg69mvd5otFy+vVmr8RClq2W3W+hBqtNpDj2CsCQ4HGX40H75/R/A9g11cQ7A0xyD2EevKL4GH3WrWFz5Eoko9P/EgMUR6hk+oVVMkz4lrFsVSofWMIberQBNGX1qug/Us/PIVFpWMII/9Kgl+j2e8hGpraRnAwx0n38CDAD3lwpCS51YdAAAAABJRU5ErkJggg==",
            iconExperience: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAz9JREFUeNqsVNlPE0Ecntltt3u00FqK2KIQQCKERAQxKqCJB8YjMdEXH1Bjor6YoNEYH/wDJP4HJvpkYkxMCB7REOIRPDAicgkVa1sKEtqypff22u06g9Nkg6I+OMmXmZ3j+32/a6GqquB/DfiXfUqzxlbzmvUvQ/cHMhpBT2Y8FASZ4Ldk1CpEeN+AICAUjzy6cn/iyYUXaM0SAfBfyQBRwyGYL3edbeMpsSUbm9t07+7tM9VVFcxqZLrfqILEPR7BEgp4LTxtsohL0/RSdr7U7fHpiQitq6o2wBQh1hNXjNg9BKvXOytAOUwp0ncgBn3lgsCbyTlWzhAvlnloTaDZqxdPrp+ccjFbN9dsSKeltWYTV9F97dgph8HlUJLfYUK2Whw1LQEIQbSlqU64fulE9dGDbUzv0zcxnGlIFGE1wp2bnR121tdiNfNNlmJzA6QZvUFdZNW4k1LisyANLUqGqQrTFOXPpqJyOBoxS2XnHwTStlvnznfN6IgyPAvxDGeji8ytptzHLVwsA1XaCPJyFuRzyDBFIb+idD4+WuILyCWukDGt2I442SgvSlIIZx5CTQmUINgPHti78/j+2tP1hsdV63hRB/KoTtUcwJ0STQIw6gFgLGDPxbltz98PT9+YnHS60DvsZqYQPJqQmr65vfTgyIzY0NpZazfFjBwMA0XOAQVxRhIAfAmaQJDZtzAwON7tdE4jahDHRLiYKdIiuKrTCMg2SC0uivGXAyPjRpNZTUpZMBsEIJz4mfciTgZqPjPn8czMkfuZQlcUyLKYhBzGjAIvHd5dWaYkpuHQVxkMeO3qRNC2rM7KpcAaQ0TP8xy+KxEyBWiKD3/kiDppe3MN214jNnx2LoDRcGNiItLkGhLbfe7kRglnysr4K/fu2WUhbwq9qupWVDE+SDXWOdhXrz+8D4JDtm9LYKyvv38C+Sj7O3Y7jjSXH2czn6311W2NPQAMr9ZOeWIp6ZuPON8Nmzwy9DOfRsZEWVaW26z3Ud9UKLT97UZHLbo4617594CaudCPxuIioYjneXbBv5gjRqCmbXJrS22p1h1blZ6HzxZIvNWVZIXiNZC5kBx1BZmqiW+WxHuZ7IcAAwAW9VeYOecN4AAAAABJRU5ErkJggg==",
            iconDollar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwZJREFUeNqsk91P01AYxk+3buyj6+gGZXOTrwCSiRB0gkYiGXilYDSAqHjh56XXmhAT77nUS+/8AwhqTIQQE8CIfGNAkskE5thGYWPr1lk6unpqTkkz4M6T/HJOz2mfvu/7nBeTJAn8r6EB/3Fgxzxr0Fr5WQ4ioRmg9cFQssPzhDRoT4/QojMRIiBExKH64HlCsoAJQnTc7D11rulCcwZ3dWd4PkdpY2+jkfD4m1cDyypR6ai0MCRkhthaWttO17Y+HIiksOqNaBpsxdKgxKYHbgpnLpWxj148fzYK39tT0s5PU06nAGKB0Fr6bMfgxEZ5NS2BzTD8RkiCXUEHlqZztL9U6CMI83g6zWVVNTxUaFmMdLrLSn8mSJ8JY3UV0swsZRT5YkICd8/nQOWJFMCz8Wqv12s9wryDyJR6GWs89TWTnOTOpgGImq2UjSrUJpNaMD05/BqPbE12XL1CbEYKTapApPx7plGcDK4u7XR79WmDRgCfwxWVfgbThaAYV+zrLCAd5Ip/PfDu/afEUZFhCCPEDnFBqnq6rrfZikoaAoxo/7btLuM4DuA6A9AYrMDjEMNdDXtP+/tfjsB3M7KrigHqDpB3xJ7e2+U8ZsUX5ueXSi1ssMppEFykAO43ZQBN5MDcIkMvBFKPnzy4U4KMw45rJ2nZH0xsW3x9VOO9Gziul2zG7I7OVAgiv76P1jrxFBB5PBTeavZ4atpUl/pQB/yLlbJaDD/Wfmd241nyVnvLZc0fPchpdwBrbPTMrCSNesCAKgfJr60FI/l1w9UpQrJfx0ZWO7uKhhb3yWuDE1krhpswgYuDkJhyOghBavcVCzQBJoY+DK8cZ4B8LQiVCa4mb2O93eGqm2OKmrk0a+25SO1RZm0gFot/HPsyNRiJMus8z8uuChJyQBGTczegDpAF5eLaDYYCm6fuTAVlp08CgV2fnl2cYtlUCJ4xkITKTSm/N3HUBXKEJIJAUefQh0lECsLLZZHPlKuB5aUsR6hDokY040hMQAI8Wu+jWiuBgb8CDAAXATNfWNNYlgAAAABJRU5ErkJggg==",
            iconLuck: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39JREFUeNqsVEtvG1UUPvO2x+OxnTp+xY7T2iRUlEcKqFCVV1cVEiD1HxQWSLACJCSoxAL27Nixh58AGxYQlJaXILIT0zhOnNiJY8f2vD32vLhj3UHTUnXFSJ/uvZp7vvude893CM/z4P/6iIesyRCo0D8XwcGjD+9RZAQOZhA4hAieUzhwhjBFMPHceZCQfoDcD4wKQiz5yecfvOWsMLeHxkgo8ZnpzrBFuDOLfnXhuU+/uP3l183WwQQT3hdMhFT5ahI0Q2effW39zSOif2V3sE/vjg+41qDN1RrbTJZOly8VV7/buPOLhNO9T1lwT35qMUSUtGb2ufqv26PpOmht5TBOovPlgQLE0IPR0SguHUminwFO8987pLCiOdG7H9164fK1p68uV4sXO80OJZA8p4pGUZIVxObBWuQ8PJZdcQaG9LvlWvKNN67zU9WcjUbSnIzEl8wjpP6o1fhplfxMfnz63oXXqzflfUkpTwtj/9yVWB5Wl6ugZx1Cyc5eghuRTbvgfv/xh++/EmRI40kMIZ09n7nalY+jh0oX9l07VngmHWU5OrpKlEGgYqBmTDA5LalljHcGWwPo0SmRWCLeFuPChqJqFh1WtryYv7BHnqA3csFQdGhYSrpMLkE5XgCdmsCutgcz2YGJoUOc4kEgYkT/9Ey3bIcJlJFYHXdGSNnjcQ/GPRkIA6AiLMECswB9QoKcmwJ34sC21gLbtkFVVejTQ+9sNNqaTCbz1yRDL2IPm/2meaJ63JByn2Ar3pO5iyDmU6DSBrT1Y6iwJXiRfwp4mXM5jXFFMq799POdzaBEaFx4flUrSlP5czEimizDVMq5pWqkFM8MiB4Jkgcd8xQ4k4G/v218lStk7UuVy7lERDz8Zmvz2BfiE1JY3dxWiqSY3U5P3mu2z1DRuLDGlA9GR4ykyOCYLpyeDLwSm7/712/1Hxv15g/bO/c2LMuWUejcDb4yC0H3CTXdALx2FFlJ1Xd3JqfDfjRJiWBODL/WPJ6PGa7rttGeISJS0WgEtgqnGe4EZK/TZ192rrXWxHKC0qA7sMfDc8WF1TQpmndZtj+bzWRsfDswPRHqHIGlEgiLCPliqVC2pxaXTCZoZDO5Vm/Urjy/rtd37nU1TdcxEQQiHtaCfM8JCEkE34MsPtlPxze3gufTR7WgoESCTRYOpEJrM5Taf75/BBgAw3Si4MpJ570AAAAASUVORK5CYII=",
            iconDanger: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuNJREFUeNqsVE1rE1EUvfMy08xUbc0kU6U2H6WYSWwpRQgU6cZFV9KV4E/wBwiCP8Cf4dJuRARXVZCqYDbagk1tYwshhKZpmkzitJOkaZKZ8b72ThkL7vrgwPu65553z3tPWFpagqtqDK6wib6+QOQBAh+7CIfgJReo783btO+CTKC+jLhGEGnzKaJPRJIvpovoIE4QPU7qLQSIIIy4jbiFUChrmwIYzck0byKqiDrimCcVSVUQEUIkRiTp/tN0+smUZU2Wt7YarxnLlmSZBwUWJybSDxQlJRWLsFKvf86GQqs4/xsx4BBJ1TBiTGLs3suFhecJ29Zgbw/uVKth3bJiz+bmfjxOJiceRaOTgETQbIKezU51Z2dH1mOxZYy1uHrRJ19b1LSHiU5Hg40NgLU1AMOAm5Ikv7Dt6buuG4L1dYBcDniiouuyYLG4CLHYF4wtIwyPjB/zhu44OhQKAJubAKUSlh/rL8uQzOdV2N8/I4fDQ3D6fWhyBstSBccJu4xxMaLfTUFqNETooEGmeU7E2ymaWcbEAm4ZYGls+8wNpObqBNFGExkTvHvjkvXtg3p9H3Z30Zvji4sFLi73emekLhLxu7CN4Gc7UZS2K0kGXRObkc18j/F2dPRj3jBaJVTXoAwucfJN/GjfEbzi24LgBFOpD9it0NXoB3Rd944JA8YgF4mYjmnq3W5X8Zzh7RDxlYgKktSTZ2ZWpWj0PQ53EDUuiJO5vufRaweDVj4eL6HUMcU0VRFdO8KFT0RkqWpDmZ9/J0YiKzjcovJZfmXeG+vTkdu1SKRSCYdttVaL5rDIb/iRx8crw5nMsjA09I2I+JU4oifneGQeYZ+KyZ9Qu6UoRjUUqh8fHEzXNG1HyWReoas/cS1Pii6ILv8anqsOPQ/eb1VUtZxMJJrX4/Ff9rkS7z22Lnn0Dxn4jOPq/lDWxm46XaD5EyLpUEL3f/+Zv3lfz4ACAz7Ftv8P87e/AgwA2Gk+sVBbJGIAAAAASUVORK5CYII=",
            iconLaborpoints: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeVJREFUeNqclM1OwkAUhVtaKMViA2K7cOfOV/JF2LLyFVjwEkRehK0rUxISBUUrP/2xP95LzjRjaSNxki80LXPmzLl3RlVOhwoahCa9T4mMyMGvkee5oteINYkWYUCQRSKQQPiswQt0iRvizvf92W63mwVBMJtMJrdYSD3XGTsxiT7hRlGk6LquaJqmLBaLCyyW1LmoEjPgbhCGodJsNo+Cq9WqVcrxRKwhhc1YxCXRI65YLE1TIWbhey5lVxRFl8I24YiFHBZiQSHG7ubzuYVv/P+QCIiY+GYxFdthgf50On3gSX/BLsWv4zj3LEoFSHTJjUsVU5IkqYTdiWcWElvHfHZ3FNOw1TZvqU5IbFU8S2KaXIAMYcaj0egxy7Ie/dEm21167o7H44FwNRwOn9Y0DMP4sCzr3XXdF8wvxLirt8Ta87xIVJG45rDJbSG2XC496rUlvd8QPvGG+aks9gV3n2CPFVtyjrZts5NnCHElD5ifKVI3HxCihpKr6Kc+nwCRkWma7GgNsQSIPjuKpVJu4qCb2PqOi8JBs1in0wnwfi/dHHn5OOWlq+Ybbv04jgtnJLzH98prSK04Ytw3NvcdaCOCFfGKTMOyWN2tkSLcDRy2EMEWbpO6g17lrPGfy5Gd/QgwADbFOC1FlFuVAAAAAElFTkSuQmCC",
            iconData: "data:image/png;base64,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",
            iconCache: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABTFJREFUeNqslslvHEUUxr+qrtk8i3Hs2M5GnDhOEBI4JBISiYBIIJYTBxBSDkjkHwAJceCfgAvc4Q4SBzhEQRFiEZdI2EoQkE1JnEw8GXuWnp6t1+KrnklwPDPxZSK9dLu76tev3vK9ES+/9gZWLl7Ae2fff3O6MPEcolBLpQCNHf+ZJVJa4n65cnvmj++/+3P6CPTs4bHyVP/dsZe8G1+LlVu5e5UQ6ZSC1k8mCpoXAQuzCrvqtagEbPDRL+PmGQfV68uHPl9yruf+ueXgaLu/Wux8YhDoO8DxpyF/cvAFn7xK646Tp/zN4kcfLu99pV7WOP7iNKYtjTCK4hPHp35o/SRsDYSktQhd58dPqs7ShWvlz7IyVR0nT6nqvTPphVNYPPMWEkELrlNHaNcQNGntBoJOG5HfhQ4C6CjsfYgQIfQj6EQ3gjN3BItBcHqzeNsZJ09luo1UuHIe316aR6ftQvkdJNFGx+nAbbmwIg+uG0BGPYCVZE2wMFrtXlH7Bl7I49wn5/D7jz+r1s0deNpD1/BCHWd9J57SiVSuIDz8fWkV65s+9nPx0gLQLAN2A5jMAGsdnoqbc7SpOSDPP4p3gMACyj6QndqNvVNZ+J6XJU9u5x0lz34A1FhfM1mg0uKeflnm5nn/BJ5S6YzMHFhC4anr8DcfYI4O7efudJpGB+dOCCy+K2KY/Y1GvqQxxXc1ftgjMDTHjgJ4TJ2OIjmMt5cO5LIplFs+I6rhM1aT3BZIgYytkdEpzCmPPD3IUxN55BeeRSpbouY8QIqeZPhhczUtPrcHOHFWxPH/7bxGcJ+O832yrw0Jmh8G8Jt11panh/GSLKzZXBKn/QJkZQMrUuIma+9tMgtBGvauKVy0S8N5KpNFemYPZCI1oEvGNNPrNnsO6rYR0m2KIcyBfbj1DYReB8N4invWGw6kyuFoJoNnul0sCEaPTob7dqGerUKYGpeDPCksBZlMj5Qmb5MbPB2buYc1ZAIYYLWM0O1iFM9su1GvwkkqJHifp4UygVK6ycbojuRJ0+Om3Uepu1/TsGQ6NnMv5LY1/RN79iYiAkfxWG6ouS7qThNGUSJqY8RU3t1oxAwxgqeMl55dgQ7Dx4dif3FQB/76chEJkw77CsTstuFpgKZmHFMzLobx4jHG/ygAmDepLBSg8nlYxSLmq+zcqV7pDOMpv+WgtXaNAtp8zLlHPjA39xJXwMwhSvXG0UCK6UzQbvLkBA/hmWmRlEm8UJjAhCWxls+hygguz89jodlBvcp9uvUojFt5yoCctasEN3pNscWML4K5OXF4GcmEhUtyJU5NPK22Osi0Rh6nA+VhGM8Ec2Z6N2oH9sGj7FxeuYrItpE7/jwKs2kcopDf+fVfyk8wwFNsZXiVEnx2FjUSLr3qhL2rSUu7pfHDx6uxSKeYBpXtvWfPxGb2RGZchb7RLZ56kOfyunG/iHKliN0EbTR7TbK6ehmTFGr63mNagzxlijpkOBuksBw4Pzk1KCd1rrQJ74Yi/t3TYjwsWsM859oSC9Sc1+zhRKVMhA/DOZzH17ZZKwxPwDGdzey0eciWN5qntB+JWuEgPvj0HQjmQjCxSrAGXAacXcdQUNU70C6HvOcazWEXBjh4LIpToVnddr2GYmPdSILQvh4rT1WsPNylU5js1OP2NmENeA1ZA2G3zWJtsa6cuLbCbofP3VinHv4SMRFL8/S3ugp32yFca2KsPJFQ6qukJU+GYWQJIf7Xjy2NsP3XsMD2JjHpgvYifVlK6Y6T958AAwBjoD0Kglj//QAAAABJRU5ErkJggg==",
            iconCount: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAv1JREFUeNqElMtPE1EUxs9MH0zfL2iAlkCLQkkBRR4hBk1oYkiMduUCNi5cuPZvcGPiyhjXGHGlMTFBXBAlEQUkkUBTWmyaYm1REAq0A9On045nmlszYIs3+WUyc+795rvnnHspQRBAHF6vFySDRuQEJSKDk6OI/CbwSAnI5GpDXKxGNIgWYRCKxMSFeeQYSRNqilHEjQGxeocsw+pCvGExqohvscrMxIipQ8UFuEmf7R2ZnyfuTohRxJEoVI84kLbb11ofKgMvmZXvQ1P97WblxGXteGBu/RDAFiLbFB3mKrmRbk2FWEQRxH2uWTuqLOwxvliBj6R09haL7AKkQjCzoWExbkP05Of0WWKiq662ZlNfOR11hqQ4oa1JrwU+Bxxdn8FXM5kvr+jIq4jVT98feQqAVc7jbnYW4KKVbZi+k/CADusR84Od5tw5OjMWLvWvkHVUrZypYO0BGsJ08GmYWQfYTgF4XMugUS7Ds88AsxtYZhOUaGs5Z6WKgFRMIAHB+/rKI3z2To2+8azGAXww9jEeOdSNt37p8+1qOF2n5wPG50kli9LmhCru5O4Wldboug5XXUyOByXf02HXdrvd0N+uOyYCvNRVtT4TxRX3brmHNXW0DRSb0Is1u6tPOrpcbiPIEjBg/8FoVP7zaUEb+7TrXDxLrHx8PM6jgXLyIy8glgDmhtPnAD4JP8JBCG+BKcWxpjRt3QRwFv/nTPZ+Kbg2Ygn1TM6DPHzcuBNg5fywNdjyBDMVSjuiQrHwy2zQrOKBy5EtC6dzViIdnX28oJ9j6Jw8ug/wjRr8Gs007RcxGkkZknXW7lmm6dLzjLpTPE5i8xZqiYkB9qY7yxwmWTjIlzudG2w8UO9h2gUZE8V3PxJGtpEjsuafgy5+yCIJOxVmX/lV4SPBLC5a2ktm1dEdtUyhNr5FC0H89hNB35CptFO5FST3GU2uHfG2MBIYSQ8WyKFOke1xlduiVtMWJNbZU3GeNGn+dLPWEuMluaOq5LTC3wpKxx8BBgAeuiDOQ7ICHgAAAABJRU5ErkJggg==",
            iconKilled: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAx9JREFUeNpslE1v20YQhmeXXxIlUYodObArNDXSHoIgSJt7Pg4OmpOBBOhP6M/rsafeCvTcOBc7iBPHlmQ7shSJkknxY7nsu8IoUBUTeEACu/vOvDOzFGVZ0v7+PvEjgAVc4DE2KEEOEpACBQpae+yVbyPkAB80wSZogSrQYAa+MFOQseg3YkuhOmiDu67r3tvd3X2wvb39gxBCHh0eHgyurt4WRfER6z0w5iB6XUyCCrgNfoLAk70Xe791Ot930jS2puGUajX/Wb/X/+fNwcEfKI1k62O2rVfFzLsBdhqN+uPXr1/97lUqt05PP9JoNCLHtmg8GftRFD2/s3XHu/x8qdiiYiFjuVwVC8B3v758+cr17FunZyd0dHREURRTM/CpWvFpOLpyRsPJz41G7SSezyOt9TVnZpqhlmLLem1tbGw87Pa69OnkA2XpHMWUlKaKhJxTI6jjOwmCVrDn16rzwWB4gTMT7rKSLGbxGNTDcFoOh0OK4xlJKVEYSddRZGyS40ra7mzR8fH7rX/fHLzgGtf4/P9GwwjbUXydqyy3pbCpUvUJ5aJZnCwyJNS93+9R96ynSxNlZ+HG5WkguSJmuqPTNFOW5VLFDRb7HBsV0JrMcDuOC+uKlCoKjI7ijMS6mOYi5lKKXFjIqlKlqushsxLfNUIMkFKWK0QttW3bOZ8pma9iy+uSCRK5DyEhrUXnVZGRDa/Skovs8jRHGkJblhVxJ/N1sYJnZWbELAgJKSjJMjTBeNAQtEljV5amRhSlsML1e2qviM3BKJyEkziad5I0hkVBzUawyKzQkpIkhdWMcL0Uajbkkfia2aqYGcDL4w/Hf+V5XptOZzvI0Gvf3qTNjRY5lkNJmUF0cU5jbEZ4xyymbxK7GAwGf8JCVyn1NC3SR59Or9v98/O679cIQWgynlBRqATZfeYz2U2ZGf8mmsafIcLmM9j7G93/BSL3Ly7P7w4GV+0wnFCr1Tr0PO8d9oY3ZVZyBM2LJqKpSRe8cxyn3Ww2A4B2/GjWznltKfbNz3E5HoqzjPhHeMH3tspDmvFayG+1tPmfAAMAqEx/WbBWiOIAAAAASUVORK5CYII=",
            iconNew: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAC/tJREFUeNp0WAlUFFcWvVXdTTc0NIuogLiAgsYtJm4kGk3UqMkYM3GiUXN0TDJGj6NRo7gko+JuTGLiEhN3x2VwGz1x1MQxQeNKiGCjAm4IAooI0ghN02vVvP+7quk2mTqnqKLr1//vv3vfe/eV8GKfvmgeHY7pk8bC6XRDEABRFMEOj0fiV1EUINNVliR+L7BBfocke5+x3/XBRpjzC6MijdrquJhm3uc0QJYbT7aISGdQkA6bdh5Cwa27SE1NhTYrKwvduyShT/f2qLPWQ6MRodVqwFZ3ujzMBPpNQxNKcHs8CNJq+RhmHP8jyHC7ZXru4b+bYhJ6lRYVr/ktJ/u1d5fMqrPZHXxT7GSGqBthl5BgA1asfgCz2YyKigqIQUFBfDEPLcZ2wE6Ph071XmKLecgQ5TlN6FYmV99hV5fLBV14tFCVlbs66UxGn7KHjyf9mpMHnU7Hx7B32OmiudR1yDSItLbX+yI4HmwyWfK6j/7wh95dKDgI4Dt6Gh7vOO8bQYZgmtg45dbqL/pbfsjA8NimqVsOHG/BFlHnYie7lxS4JAVa9RDZVBxLzglZ8b2ykDpI8E7o98g7XhaUCcnlMW2SS3fsXll15izcBGXSjZvNtA5H2uETpxFqDPHuXFC4SO+oG+fz+tYRoLhNUrAUfGawe3WsAK9nBHh/Y6ckk+sJHkOTWK01t2Bb4RdrwrTBIRAMelhy8/F2SNB7h06eHVhR+RgaMoaNVwNEUHjjf4jqjepCQXG9vw/UKGCTyWj0osxIGxJGTBdXXJ01p6+rzgrotDyyJOKKmHFe81p88/VfbT8YrqfI8QIqQKsROVSM8P7uFhvvGZn8/mUekPwGiizKtD6icPppdAiNbjXqxpLlqTXmqxBDCA56R2TQkVG1VdXompP7THSQbuPOf/8IU5gxcLMyfBz1GiP4k1H2EpLBo5ilhiPPNbLkcyMbERLT6tniLdu3lO1JhyY0lBtRTc/qTCYIzKBQIx5mX8Wrt26NleobtqUfzwhmaYNTQQ6wIxAm1VxfYvJ5RCB3ChxGrcY7ETkZwdHNYh+f+uVQwbKVJjEkGAKNk5wu2N9+A1Gj34RktUGgvMSelf98Ds+fPvt+eFVNxr6T57uXlj/iCc8boX7GyAp2Ag9B+IGkklkI5BB5RxceabLmFR/OnZHaTqK8IRB8DJ46um97PR9RKd1Rn9gKMiU8vghF06Mr12DauiulS+Hd8zlXbiw5ffm6yU7Gq9ne5xlRsVA9/agb6ElmiCki2FHy+IB58kcpbksN5Rc9NA4nbDRp2fhRyHVLKN99CM3nT4ccF0vkdnKva4KDYautQ83OdEPbo8cWGG4XZf18wTyu+olVCDDGW1vkgFCGIASkb58h5bUHciZ9NKS+pARagsBCu8t7rgtE4sKA5ASMSN+I+1GRqKeFwwf15d4ReZQSsSnCZCK55VoBsPbb9oknTu565/WBmSHG4I4eBqkvrP2znBJJ3BBOfw90EVEme0nVkZzxE4dZ7xYhyGgE7HbYB7yMQWuWoG7YYFz+8juguAwjp05El5d6o8WYt1AbHweJFlIjUKb7UKKFnbz2ZW6Ba+naLQ8abHZekjQ6qk0xzZpg3DvDeGYU0Fi1eXalSQzRzeOs+fe+z54w6RVbcTH0pjBYyRCLqEECXQ1lD9B1ynuoahmH/MxsSJWVEC5mo+Xg/vB06gTb6fNMAkCgBGkk/uQnJmD5I0veuZLy2TpRXNxgdzwcOnQotP6JjS0uKt6QPG5otEEIaR7/XNWps/tyZ8xJdlZXI5iwryFoyocMRnSXDniycy/qdu/Ho6t5eGHxfGDIK5Cp9p15byYsldWIpIyMmhpoqXZ5SFIciGzi2pR5dXeXdq1XXPjP1sLln2/G9z+ceSq0fdFDhrjJkOAwhMUljb6/Y3+GeeKUZHftE+gJmidkSPHgAejVNgEdb99Bsxd6UxYOhvNuMbJHf4Cyucugr65FyjdfwnLZjMJN20DJBXVJiVgqaR58dyFn2sz3R07+5ejWwp49usJO5FcPLfxCmMNCXjLGttHBISwzT5895/7edIikO0hrQCJIPB2S8caH76LmTiFOfLMZho4d0Ilgc9RayZNalP9wCvW2BkTGtwTu36cMHYWCpLZYfrv0V4Ijdf/mFedGDBsEG41x1Nt+n/Q4RyU3gvQGmFo907HhZsnPmSNGzrm391/QUhbV0SK1lEMamkUj6l4JKmenIS6xNVJ2rUffMSMhmyJQOqg/ZOJeUFgobJevoCx9P4zhJmQkt8P0y3n745pHjzp3dOu5P78+AI+ra7j+eVqS8KTnoFxgiIqBsWnC1HubdlwkQ16yXL0ObXg4tLLMhZT1r6M5H2yWJ7AW3Ebe/JVI6dwBTqMWDym6WuiDEEnweRrs3N2hFEVH4uI8y8/lrHl7cL+J/z30bUlC6xZcTQZSw88Yg0Gv7dk75QX3nYqffhszbv21BYvCOWfII7zWEEcK9Xq0KbqHzn8ahOqhA9FAiU7Ov4lLw8chqX0iolYvREP7jhBLyqkmURogD+1s0tSx4dzlRbMnjZ2357sVdSxCbWSoSgv/zOszJqFNq+iE5lEbz3w6b2D9+QvQEVSSluoGhS2TifXvjEDn7V+htE1LXNyyF8l/GwPt2BEkH92wF5Xg2tRP0KPbc+hAxlp+yoChVTy2RzZp+OeF7PlL5k5e8VnadJfd4SDp6g6AxSPJT0kVQGO3O63HTp0+ni1qPRFdO3Zua9AbBIJCUopBC8K2U9+eSJkwCrr4eOiowLXu1wt5+behvVcKkRapOHYSTy5dQmiLWOyJbmbfdT77k1WLpn89Z9oE1FLBZBleoo0xgcUMYoHC9IyBoN13+EfcKSoFyzOikxbr06tb2aqF0+ccs9T1/4fdc+hR7+4IJfIJxKW66wXImjwXxZlXEErG6c0FaBlmwisbVgDTJvPMKVOSM1EOIY64d5zPXrJywbS1c2d+4OWHKgsFf3EgeA2DEKhnZKWnGTa4H35KX5c7/M1XRy6+UTzm+8TEYmNyIpcNblJwxbMXw1lVCXNhIY6O+hC6i2Z0cLhJKlhhJH5ltGqFdWey1qb+ffzn82ZNlOsp1NWFmbzwCX14xbkkyb+PJtUwK+2C3c6eMg5HtqzcZ7bZ+39jNB0P6dkNVN7QUFiE4rlL0WnAS4gYPRLmGfNQtHUbDBT2+RS+yzNz08e+NSSNOOJmhkgKIRgkslr4BPjE2x8SWC2OTM+wELZYapHYJh6HN68qiW3b+i+7TBGHTBTCAhU3J3GpcsN26I6egExV2kBRVkOZdVlB0aUenZJSN3+90Npgd/LeCIGK0gcL106Bzc4fyE5FLjCXOihFs+7x67SZDmNM0w8uJbW7ZmoSBYGysD3HjCfXqTmjaJPjYvBFje0+jf94z7fL7+tI97J3GQ5q06fKV05apQNhB5uftywBGlj1IFN6ijDljCfjbJT+F06bUHvdLU229unlElxuUv86LkUNVH0PmyJcl/JuL9y5YXEm8ybLI4KiuEW16ZPh68vYe0y3qJ5SZW6gMbxQy0pP5GW/RvDuhin68W8NuXhSp18f/mxHqk8OBNOObya0xqZM845PZry/642hL6O2rt77/lPwcMEmeY3jHQhr5vwMeaqjVHbCc0Bjjva+IMBa34B+vbqhaXzcssIOSSVGgsIZH4t1RQ+uPd8pedmnsya6a0nVqS2wr0NVvONROk4Z/kJfaXGV6HrKM4KiZ1TpqQzkTRt4mR87fJDlioRF4a/2x0GIjpslD5ZsXD2/lLUeqijjHaOfY9iGJCXT8tZWUGHxNnIaMZDMWrU7MFK1lSmbuogXPJH5tbhu+i0xuQ1efrHHnoMXsj7eX3Dmxmf/mHqkd//ekAmeCJIQXqi9XFM9zaKTkZp9iWCphvNSUvIMjWEaWqN8heDGuFxOFNy4gwVL13KtqhjOB6vtCjNQr9fR1eNet/PgBHuD01lRUelZMH+Vb5xiTSMUsncOxju2oOD7WOCFj5UInU6D3Gs3+HAuKdLS0kgVkixQhM4ffPXw8YBFg5F2w3bNxqtftv7f4Z1LaGSG3Cj+1TaXzce8N3z4cPxPgAEA6JcjmcJQzpoAAAAASUVORK5CYII=",
            iconSetting: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABGNJREFUeNqsVFtsFFUY/s7MbGfvpfcWSyvVUKhFtFHCEzZNVR54IJKIjRhr1BjjOwmP+oBv+m5MDDGSGKMPQpoYBRM1Sg2JQCllWwqUtnbb7rK7szv3c/GfAY0EjS+eZCaTOef/zv9dzmFKKfyfw/i3iZuXziV13RiRgg97XrhdQTUnmvQKFBYD35vx/PDiyOgL4X8Czv38NQLfedazipMa054JPbe9atmmVALpTBLEyLWtWsmqN76tbix/0tbd+9Oe/Yf/qmd/p7wwfbpp9caVN5hmvJvN59qhJALXRb3ugEuBVMaECAN4tgPH9VQQ+qtJM3l8YHjfZyNjL6n7Orw+fZqVb1973dCN9xVjeR74UIIj8ByEgQtBG/uuAAhYSgkhJAP0XqaxD+YufCe5VKf2jk/cBRQ8QOg1xkmn96RQeUH0mPRRuDaP6V8vYmB7H3q2duHKbAGSgIeHHgVjGjQjAT9gHa4XnLDrlRs89M/HgMtXfzBrm7cmdd1s83wbIdFSuoLjuKhZFq7OL2Jp+XeUShVsaW1GEHAkEgnomkGqSEAz+y6dP3s0leu88CflEUCNKUgW7Xx98SZR4qjUqkiYBjzXhl23wDkDDwVK5SoEAWWyGbS0tsFyXFatOQds1995F1DJ3aRLC6GQXh4uz8yiSp0Zmh5Pd3V2IplMYn39DoHVaKNZmlP0vwM7d2dh2x4xsXsCLge1u3gYUFKZkQmhZ2NgoB9t7S0EHqCtdQv2PL4Le596AruHB2EmDHI+RP+2bdhO61LEQNc06l6kyea+GFBKkY86k4rHHbW2tCCdTENFPhoGfSeRSplEMQVylbItkW/OIpvLwNB1elgsAWUwe09DVYnjQICRxjMzc9golalMYWOzjMvkbj6Xx/LKGnwvoPUaCoXrqFRrGBwaQt3x0aCHQK17GqpFenlEMcnDEBrt2tPdAS5CFIubWFhYopgYsVHptInm5hyVSGha9E8gSnTIRcMPxVIMaLvOTLlqlcxEslfTtVizXD6D4loR5c07oNRSMaO4CNK2EyN7HkME0yAzihSltY0qbMdbIR8KsYac46LjeN84rq/8IESa9GqinAku4iM3uKMfo/ufRisZFFIGSSx4Psd6pY7VYgTmk4DaGU3TCnGHT44eDjdWbp5cXrj8fMBZLzM0tFMeo6h0d1FkMlmYqSS29naBTgXK1QZWNmpYXa/Epjl2fX7swKFTh45MyhgwCrOeav6x1nCPU1MfKl1rJ2+QNtPYtXMoooM60Wvr6oBlOQTo4E61HjtLZi4bhnGsq3vrb9Th/bfNua8+ZmfPfDFRshonUplcv9lkIGs2UY2AR7o0qLuaFd00PoKQS7tRn89kMseOvPrW6Zdfe+fB6ysaU59/hBu3lvb98v3UK6bZNM4D/lDDcTMRGDMYDKbXBecrARdTzx08/Gn/w49cmph8+5/vw/uAvzypkxRDruvvoEj0UaCzlIAaZf02HdOCApt78eibD9T9IcAAnaJ+kwOqUbEAAAAASUVORK5CYII=",
            iconSupport: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABAtJREFUeNpMlFtPG0cUx89eWN921/h+aWyC4wUbohQRKTSqqjQoUtMH2j7x1Le+5CXqQ16jfId8ikSqlLa0apWH5KFUgMsllUkxYDA1dsAG1tjGFxbvpWfQuGKkn3ZnZ+a/M+f8zzAzMzNwpTEIj9gRB+KizwE63kO6SIdyQb+ZQBf2G0sXiYgXCVIGqaCFnCMN5IRSQ5pUVOev7IgIyUgYSbhEcezu1NR01GYbaWSznB6NmlYweP6hVCrm8/mlTqeTw3kF5AA5JTvmrwhJSBRJXR8amv4snZ4ZLZUi9o0N4Ox2iDx7BpzPB/VaTVlaWrr9x+JiZndz8zfTNLN0QyY3OjrK0diEiFBiaOjhN4oym1xY8PtKJWBPTqDudoPtwQOQ8ClJEqRSKUc0Hk+UstlgvdOpWpZFjtomYjYao4TH4/n06xs3vk2urw+KrRasVKvwFsUWj497mcLuRXG/yIqyzIqNBggvXzLs6mq4KIrOjmFs4fp6P3NejuOG7yYSD9PlstdlWTC3uQWL7ZauDroPwCWewn6pV6ydOg42NmJfnahyaGUFrmHSor3e5InHQ+Jc4Gmm/NjGbodCaefeHizMz8Of3e6FGovtMOHwWxwvktjiDuL/7O9/MlEu34rHYsKlf1otETwecjIXT+PlSyrKrdTsrL3jdMLS/Lyl+v0lFPodx5aREiIQW+j8gE9NKjG90wnxF+gIyyKWcpJxlh5T/igajUteL3Tu34fqxETbDIe38Tshj+whh8RbPMu2BJ9P5xwOYFgWTJ7vW4shYiSbNomkibhP04ARBjS0wxF2W9SQ//+U4TifgnN17JzpOmgsGQLSNVjqEUvTNOJw8IgSBDxeFn/lJ3ZBH8UNw1DwPY2MhSOR1MePH8uOp0+hevMmqKapEVsgGt+vt0qlctrI5cLw4gVMZrNSRdeHa37/JIoFWZbVGYYJBYLBqe+fPEnah4fBDIWgoiigvn9Pykolgjwt3EZha2t389WrdKxchnuyzNt0PflTs+loyXLdYbPB+MSE57tHj64FAoHLIK2urUEml9O7LtdfeIoKqVGeVv/x4dHRu2VVnXapqtMtivB5ICDcczqHa2637nI4WFlRWGcgcBmTTCYDv8zNQbFY3BIGBt7Q+jzrix11Ne3vlZGRX7vV6pdKPi+F63Vw+/3gbjZ5Bk1c2MbERiKwc3YGb16/hu3t7YIgCD/gWuL+KtHhabbIVVKo9Xo/ro2Pn+7kcl+4K5XrfLcLPPqOwfRrhgFnz5/DIcu2W83mut1u/xnXvEP+JaVEdPoJaFEfGW1Jqrfv3FnGToDeJAL1kQG6TuJbRyEy9wM9Xo3G3eDpLan11enl94EK2a7csiYd79ILsUEtcU59Zv0nwACopqbnHDzSLQAAAABJRU5ErkJggg==",
            attacker: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAeJJREFUeNrsVk1LAlEUfTM6qYy6TVcG7lwIEghBiC3bRJt+gbs2Cq37F9p/CNE2irgJkhZGLUQGMYNa6IC6MciJdNDXufEEVzUjQQRz4TCX+3HO9c6bhxLnnP2FyeyPzBF2hB3hXzO3lSJJkq7xMIEj8VRw8cxEbjW8AtQBpPjBj6R0c/0EmEalbrf7zuVy6fC313Iq4jrlqAZ4sMIpW/i1e36/f+j1elk8Hk96PB4VjaO1wY3FYhFOp9OUY6h9pZ6N3zGaM8Fg8CkcDtdzudxBrVZjqVSKQURFLrpWF4XgMpFIsEqlwqg2FArVqZc4bK8ak7+AhPd6Pd5sNnm1WuXJZNJcrRPYEiCfRyKRebFY5I1Gg3e7XZ7NZjlx2F71dDo9LZVKxnA4ZKPRiI3HY6Zp2hypZ2AXuBAg/1HX9Y92u80GgwHr9/usXC4bxGF71ZiqNplMtHw+vyThTqfDTNP8QOqY5gIyAuSfyLJ802q1voQLhcKSeoljo1MN2/H5fPeqqhqBQGCqKMolvVbgSqycC1+CcB61BgEH8Z56v+W2+DnFADqpEbFeCr4LcBGLipqYJU4rRWsDnAmhN2Bf4E3Ezu1wyRvcdAPgEM23BPJFbGaHSHL+cznCjrAj/O+EPwUYAEvcy6pPo+pUAAAAAElFTkSuQmCC",
            defender: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYhJREFUeNrslr9rwlAQx9+LVpNMnfsnCOLSWQjZnPoHFNo/wL+hf4OjLl0zWulS2qFuLk4WyVCok5RUESEm5Mcz6fekllIpGEkQSg6OvFwe97l7dzkej+OYHUMkdiTJwTn4/4GL+25UVfWlVCoVbNu+jaLoHib/65MsSdJFuVy+FkKsgiA438cf33eAcM7jbrfLDMNw+/1+tF6vGQIgO6tWq4VKpaJ0Oh0B+0mqGRNY0zSu67pK74vFgs3n82+1LIshCZ56jQlMGZJQtmEY7ihtyxT8E4aabhT1zSZjNJY9nU53wASkp+u6DE0mUgfD6V2v14t+g7c6m80ouPfUwY7joKGN1V/1NU1ToBQPWQyQ58lkUoTu1JeOeTgcYhm0UgejcUIcd6vZbDq+72+A2wBQAh/fH6FmJiMTmd2MRqPXdrstttDBYMDG4/ESwVwlmpk0uZIo5ExRlLdGo+HV63UPDfUBWy2pH37InQv/9Kksy09YWp7nXcLHMrGP/LKXg3NwDj5UPgUYAFHjaDUOHPhzAAAAAElFTkSuQmCC",
            iconStar: "data:image/png;base64,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",
            iconStar2: "data:image/png;base64,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",
            iconStar3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABU5JREFUeNqkln1oVWUcx3/3nHPPfd29e3HTvTpn6lzldFPDfInECJXMVCLTESYEGmkgqQX+U1BhFkUJkWFYRkiynCGIomtixdJMU7fMl23KdXN3d9vd3X09L7fvc/Yb3K0JUgc+PPfc53l+v9/ze3sO0cjHNorM/10gF6wFecAt/k+n0yQYvXf4f54b8UhABU7gADJvkllBFfgZ1LCizPnhfWKUMpVIo6xVwDjwMMgBPt4k8IIlr9Y9LZQ/xe8Onsvi9dNAgZBjw5Np+fCT5ncT7AIvgWJWms0sWDhX6KfHWGg2zxexG98BOp/k337ix8GC392xafV5jM3gCrjA4+01S+d1sqA00wbOb3phkVi/m/c7M92ljFJisoDzzRevr5w2uXT6tldW0e0LF0k309SeMMnrcdCJAzsp8EcrpZNxMosKy480Xi4/2ngphH2DLMOgMeIgZbhPxKEcfD67euqsfbu3kp6KUyIWQcoM7TVNgwxNIy0RJkV1kery0fc/nKRPDjUfw/RGEGZl1nKFU3M4K2ROTfEeSJvmrFQsTFoyRnoySqahc/TSUKRTMh7BT5MkWaEZ+W6alONe3tYXm8fuFRZpIC6UPAFKWZmIiZ1/q2lYnIwPUCo2AEVRglJqaLpGRxpb6NPty7AwTpIkk6w4KKFrZFeFjbQCTAcpoQB0CiUtYuK1uiU1bo+HHKqDXE6VPC67/NYH39GWtw/iBJrlou7eGBXkemhxbSmpUoqSiSROAUWKnQpK4ACHjLni+fk5rhmaZlJ90y2RLO+JmPg5DVeC1Qc/3KxWlBWQActCoZB8ubXN/f7+01M3LKuk2sp8ynKrZJUAiMWTMMaJmGRRX2+Qtn58lp5dOOnyV8f+ikFWAzgMemROQxGkO6C9/sS5qU/OqfC41TQCpKVP/dqaXZjn9C9/vIwUWSKJSyyNbEtpBtkVyUqf+sbrFEsYwZPn7lzD9BfgFBAZF1U4OFGOhcj5b9dv3//yod1r/V6njVwqGYFYkkzRHmC9zSZBmE7NLV10/U6YAsEotXdGaEqpL9jS3iv2HwI3QQSIE+kKC/dw6k4C6/btesbvVk3SNZ2qH8qLNDTdGNEYPjv8p3BXaEKeK7Z0Xlm8osgXC/bHjTlV4+V9DS3PY9E3oB8khZdk7jui+T0HNuzducxXmOtATFJWynqdknEjELZ3dA0KQ6i7P06BnihNLvZ3L5pZ1DMh150yccx7vShMuLCi2Oe5eqt3LtefOJlu46a2beOKR2sUqFRkG9kx5vmcEOQTJUF766+UhcKJfKt6ue9le9Uggnzb5VQolTLgvnsU7E+QbpjWHjvknLnUKbJrj43zumS4NjLqpPjNupqq0vFe2rznTO1HW+aLhCIZkRdCRCa9sW7m726nnQLdg/Tlj61/Y08H14aWUSdd4kiNY1S8aNfrowmNIjHNsrxvIGmNimIjwxxqsD2w3OcxsUbIswQeB/c44CMqPs4Byuxdgsl+NMPwoCWAQuG45SoFKavrQ23palsvVU7MIa9b2EcVLKtvrN6lZ6SOnZtmydyqAn9HV4S+Pn7NOopjQKceO9IY7kqmhhrlby3dp8HCFQvK7Yhf1s3AwBSuNwMtXhsWqoxx/Yr/Zuci8FDQwelYd7Wjb9Vdc8gezbCMPAnqwS9Hz7a/WD1lnDhJNfiJ3a7d79ISsZkAjoAd4BG+hCbyhXSlvDDrLsZWsJhvxGK++18HR3m/834fEjYOvthYy4tzuDOLbCsDW2ZX5osbcDu/u3leXMPj+SQlLMf2f75WmsAsfn+grxX6D99da3h84O+ufwQYALcjQ3kgubxiAAAAAElFTkSuQmCC",
            iconSell: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8JJREFUeNq8VltIVEEY3nO2E6adNdM0DArWaqtVW0MizSS6vEQFXcQeBCPouTITJCLCegmLpLeIoKjoQhFLV7rIqll0MbK7Ursdz+66tnn0uBfXPbunb7bZWgK3zhYNfMzMmTnzz/z/938zjKqquv9RJow3wDBMrMZGOFTTACOQDbBAAOgHREAGFMxX6XxthhKKHjAEg06jIJxdbzAU2WX59agsvwmLovvMxo13R/7qRHR3DDWkE4TzpkBAyPJ6H5bjvM7WVmezoqhlGHoADALhZGsxSWJEjEwGZgHzgKkul3Wm3X5yWzSqPq6svL4D34apGxWyKeK+8dZLZigDmA+Ujo0NFvT0HCkdHn5l+hlD1pWePqvZYmm5ju4YEIGhSCqGyEkqJelZWW/vsVXhsExOpxNFfx/Pc3Jm5kQz6bvdgX1VVfevoTlEjI23HpvErVkA19NzdEXcyL17TseWLQ+eNDd3n8R6hG26nJy0vajK6fxxSzJDitt9g1MUnyH+4flzbxeqW0uW5Epgf+z7p08jxG1mGs+UWPfF7/9oT/xQXV3gs1o/t5G82rp17m5B8G9qbXX50XcBwVRZxyK4+ra2tY9Ylsn/4c+sRcd5fn40GBSfmUz1X+lJBJrAY5rJACPktDk1NbNXYfcNaWn6nF9mjFRUWBfg/yiJJcmjlOhNToOKBwrKy/MW7txZuDk/P91CR2Wa0reWLrXuQSONUpwkraqJDOr3EgLed3Z6Lp048f5UwqjhO3TVNtvao9gUMRChSa6ZDJmUTXNhTCHsxoK7UBfv378ob/XqGWtiC0xgN7e0lPVh7By6nlRENZdID2RnudN5tVBVI5XoHwLeHjjQJa1cme8HSarIRLh0A6puKkdDWvOIkaQuFtq2AhKUGw4Pr2loKF6OHQ8ABQbDnGh8otc7OpFeI5NTSViX19v2ON7x+cKOw4e7b6JJFHsZMCc+ZrO5AzQ+Ec15ROk9vampdHtFRV4Nx7GTOG7KBZ43TQ+FPDP8fkfMUHt7/0Bj49OXaF4EOrCerNUQR29Us8WSXVJXV1RmNPJmqDYbRSESdPu26D548AVRjzsULkocTYYYmog89f1oR8e6EtSnBgdDntpaW68khUjgOwEiS30kj1JRb5VKig+IiOKVeRkZxphCBwJKCK58h+ZlIrJxI6mqd7wQdskOx2mTx/OhFveRoNczmfX1RYspleXfGfmjxwk8qFA2EReNAiYqOZ8p0/R/8jhJFqPEtwOJFZGcKQm5Qq4Hib4bwgnSpfma+KflmwADAByiwbZmDJRuAAAAAElFTkSuQmCC",
            iconSearch: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAKXRFWHRDcmVhdGlvbiBUaW1lAG5lIDIyIDQgMjAxMiAxMjo0Nzo0OCArMDEwMJeg7h0AAAAHdElNRQfcBBcTBzGRmTTGAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAABAVJREFUeNodVMmLHUUcrq27q/e3zJKX5b1JJpPBN4oxBGMCCYp4CMaDIEJOHgQV/D/8GxQ8efDmzYgKXkRMJgQMQozzYiaTyThvmbf1+nqp6vI39qmpqq/6+31L4++/+PhoNJpEC9fUwzSnhHCdIYSm0QIWzyx54zAN0ryz4seLAs7AgZrDHa7JSrE7vz3sz2JYZZTABkYIXqJFgTGaxdlgFu8O5oWQo3mSlXIeZ62GY2gUkARj+vm7l4WssOH1D2NrnLizopwLMcv0Qj9RsZVY1CW1LCdUWqS0pKKRoIOoZFX5ytoKg88CyXAYnE6LHaQdKtw91W56fi6KP4ZD7PNGGHRFGUj8hJrEXx7PR8E82bpQh+kY8BwFyZrEjyz3jc3uB9evGZZFKEUYA7Egju7cu//dvbvvNVavcn3XdinDWRobGlNK0U9uXsIIN4dR0Vn/6MZ1zTSxYWCNYYYJY9wwLnU618+f//L+gy7XBK0SpJVFYlNRd0xyCJoWwqjU8vIKXGZwQ/dc6rqlxlOEMoUjIXzHvX319QDhs43m5rmOZWjgAohPDqcxwHOCp4v82+1tIQVRqihEKQWirKiE0jXiWJrrrfk+Ysz2fRAcIL3DKWvVHYKTmFerT3vfBNHdvf03t17a6qw1GzXXr/V2epPp7J/hYBzM33adF4gYhg4+ZYU4drdSKs3LEJNWkty2zR+zxdc//Qz6X7t6LY/jJI0PhqNzvv++Zx9ZNq4tCYQmYdq2yammy2BguEa6zj5WW4bxmZTPfXcnyz0lK8v0G/Xdvee41dIc1wEXLLMyTZvrOlMwM4OEUIhUhXPLfO55qVJtzjfKMovntmnKKNVfffmr7QfswsY7GFmuKzwnyYpKV9328rFdjOBSKGTxhedNGAuEEFKuntsYI6UrsSXllY3133d6ttZ9azoJRUGVcrgOdNlxqCnRNRoLSXVDaJrVtHWFwwoeSWVehMGtzum/B6NfHj02Mbm81l5i9H8QJgmoleYYY4UMnbs653bNsZomNTW3WVsQFliu4OatC+tSyh/+erw3mbRUBVZBi+il9RMI4VEiCXdNiBdSnBtFnmlML/I8y3IbhMjy5SIvOX/WHzydh2sa5XXdMw3WcE1Qu59VSRpJmSeLrOznpmW5Ng3DkFKtqKpS12snWx82G4M0f22pqQ6eEGxAfRl4DSHzTPvRzt501Pfs47bABgh5bAQhMJSlkQOdLmX5RYXy8f4uwjd962AcMqj+cdGL4NMbnY32if3++Mxqw7C9aHY0CRcaI3WbE6YRyo6m0HUJvxGD0aMw7f07ZXkpAd9tL0E/HvZeeJbx65+7ICY48Ww4v3h2teFa/fF8GmcgL1TixVEIpCChVzZP/geRJSzu2YducgAAAABJRU5ErkJggg==",
            iconChat: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAPCAYAAAC4EqxxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA41JREFUeNrkl39oTWEYx7/n3t1rY8yw0a6xe8eda1lMkqaw/OF3mZQUkT/Ijz9WU6SU7A9lbMUf8o+lKBSh/NhClmnNlmVk0YhZ2MXYZjP33h3f9+6913GcO+eMojz16bzvOe/znPO87/M+73MUVVUxWJnpdg1auf55q4K/IHGRxt5CBfNHAa+q4MjuwYjWOmSO70ViCBnNCcjyn0GguxEBCA8vqlWx7J0nV0g1aSaZJI8sIQX4ByRO21FUpA5NwFaPig0zRmCizW9HD5xfnsFxKxmOYgUfa0Lo6zOw85aUkFKuXEhzv0nASCjntZAUkbExvsVOFhEXmUYaiZ9Ukq5f+GFaN+pwIIDRLheOLRiFlajhjaf9dhKQFJ8N32IvfHM6ULXxAVov8oE+lEvoaMkA4SsmoYSOi+5BgyHbyR4yzuDZJ3Kc7Cah39W1RZ5keFHoXU5n3eykk0Rx1yHtpLOVO3IzdpR5MdtrEMalJiOqVI7XyiFyJMYHC0kiOw30BqcrkpagqQv+z6LZRq6RZQTjyH7yUA2gUw3y1mGU74ro5GakqWRTpG8GMV7oyb5blSKjxhCN5GtsuVVrEtaNhvSTYRjdwmtKCpA2D4hvQZtakfPB/nXtlPfwhDdpNxmDhbm6Way2mDeqdSsQnXgTkmika1ISf9jD3LahIPsBtj/HA+2r0joDFdvaUs95smhZiZeDQ0gaojPUbPHF2vENYouLEy6cNJWfTyrNRLyUSchQ9xcS1Y06XMf9/IHXN+Q1UhFK3pSBrUvTmWeVMY392zqNfEXLO8CnNZYps7FZydT1l5ETIssOsMrCsTWkJ5buQEe+Vjfq8L3HqO/2OWf1ht0SR+c8u+K229UVAD1EO9flVbdY4VOXgWKtwTyLDufp+mKOF5PpZB2ZQETqbJUrc4bciWHLsm7U4fYyxz4cnXweDp9TQU54t0IE7yQyi44m8GB7fPWso/P+Dd1Ll4hzVnf+xqrM7LII0UuWzLhTyQWy2sIEWtK1fd9Z6nUcCG5ROlz+/kkaDjhlHHtEt/YsbA07bYjr1NkokEWFGSmMUXGJfZgvjxfGVPjNpitcK7rfK604JYjmnpNq+dO7ylzPekwOTkFfwIn2F+/QVH0JHcFKKA5WLYYlcJEsKkqNVlqubKTSMpLTpFZWSbfDqcK8WNJV/vDPg+laWvPzIMLpkUxANy1+gmVd5X/7W/omwACxMr4C5yIs3wAAAABJRU5ErkJggg==",
            iconClock: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+1JREFUeNpclFlvG1UUx/+zeWa8xGOPndiJE9dxGxcUtWoKJA2q8sDSp4DYHgAhBHwUPggfgCdeKlQWARISBVpSitIqOHGSxvFuT7zMvnDH3EhRLf00M9Y9//s/5557mO3tbTz3YwgyIUXIE+YJMYJN6BDqhC5hQnAvBvLPiXCECEElFAkvfP7pR1/KIjtzWv3Tvf+4/tVpZ/QtXdci6FQwuCgWCgkXHIVCq4SbHBNkWs0WV3vWxWSib1ARlsaEDscEh+Dz9E+eppIlXOJ5/vpiYeHNzfW1im2MrH7zUOr1B57MuyU+Kb+tja2o5wVhBlVCkzAiWDy1HKVCKyklufH+u299XJjPLTKBx83EJaSTCSxfrrDpVCL78MHD7OHxSXEw8XO9M+N76jKso89VKhWJvGQI5WhU3vjskw+/uFxaWJREjjVNA8WFHPr9DmLxGF5ZW0ViRkFU4uPHRwcVlouYluP1aaoGS9ObE0Xx2tbtzfcKC/n5CC9geSkP1tJxclRDPjuDQjaJk9o+VCWOrVfXUS4txXy9/Y4sCi+R+BwhHqaZCFtgc/3m66tXl0uOZcCcGHhWfYxcjqxhWDBE3LQtmFYAhhh5Wm8ik8mA5zjFMEevgZH+JhqNc2fZUrFwnQ08WYxwyGUUyJKM+nGVCHdBdgdDNhFggYtEsHKljDtbt5BOpzDotsq0TLHQWVizuOfayb6mMdrZGfjAnaYpSCKe7u7g0e/3UVoso3h1BYLAo9ft45+9AwwnJrThOJ7ITg9QZM87tt9t+6NBFwLHQE3NwHFcyHIUi8UyLEaElJ0j58bCs02wpJksQ8doNIFlOz6VCEJnZnga7W5HU6JCdHYuz+zuHyEtEtHZWXgshxev3YBuOzg5rUP2A2g+CzWTxmisgxciY3q1bJ6+tHXdfGIO20qz2Yr5nIQ3bt9Cr91DXFXAMwIC0iaDoQY2peLrb+6i3uygdlxHUs0dnN9VlnZv4+i0d6+t2VVdnwQbL6+hfTZEXxvAtSw0221Y5Dk2bLI9h5XlJfxbPUTACloqnfkxjA91zp21hiN9x+C5aMcZKewvPy05iDAZNYVYyiCl4jDQHTQGI/z61z389scOTNOc5AuXvouI0gN6X8c8HS0a4dBxPfIteY92ax/IIndlPMzKjUYDju3CdYlYq4O96qEvilKXCP2gpNS7JG6fpjm9mx4dJZ3pKGFYW0qofdMYbz3ZO7hhmFbG0HWJ1N0ThMhISWdrqpr5WZKjoaMDmuJ0cvB0Frk0Xf9/p4wmyokjQji7FDrjfBrUo5MiTK1Pa26fjyBcENQvCHfoVZPpiApoG02oaPi06Pppr/0nwABCMa7R/XpFcQAAAABJRU5ErkJggg==",
            iconUpb: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6BJREFUeNpcVN9v22QUPbEdx47TplnSNnaSdm1hDMZDN2CAoLww9oBE33jiCal/0SZN/BlIqHvhAU0CJgQriA5o0q5DbZw0bRonTWI7/sn9oi+Sh6WjOPp0j++553w3Fccxtre3QU+KIBIEgsSRJmQ5FH7uE4YcI4JHiMELwAlYoUrQEsgR8oQF9v7J1sc3Hcee/Prb3vf03+QkISFIkkm8sEAwCMuERULx7t333lIUVbftcW5r66MN3/Oig/phMBwOn9C5y8EI4xkZ62qesLqzs/N1GIa1ZrNZWlmp5u7c3tQLhVLasizsPt7FarUKvbz8peM4rSAIulRjccJXyJiU6+9/eOcrMSWiVNJxdtbE/v5zeu/iuHGEBw8f4YvPP4OmaWue590SBOGAz5LNLhL+J3OpfvgcPz19gmG3B9sewXXGEMmaSlXHu7ffhigJiONQIpk1PpYsNwYzMuakzAg9P8ThcR394SUWcvlpsWM7UFUFN99cB8lDLqch8H0jQSYlycCdEfxggotBG/3RFfLaPDIZGa47gSCIWNINpOi3eK0EURSKURSVuCLWSGpGFvH8uKlICsh9mDQvKAqMcgVKVsXloIe12nXcv/fp9Ls3brxejqKwzCPEyIQZWcjDZ4dh0F1cLKBlniIKQ3hhgPNuhySIoDNsbt5iEjHxvAyZoPPOMsnOQm7vqN8bDUvzRnR+1oXvezS3HDySyRwWRCL0KJ9SBJEqSb7BI8XCLs3IAk52dd7ptjY2NsJYdtBuNVFYKGJ9dQ2yLIFdvZ41wPJSmdyt0NzEWdCn3SVn5jCyWm0llFVRPG2/RP3oH6jaHMI4gmX16dMSHOp2xahgXsuxiCxGcbTEu1OSMhlZ73d6mqedztgdx/XG39OxRnTsxyFSpM267CEtp6ed1iqGQXNb5TIzUqIzJtPap2fi2X+uV98oXlp9mVKOuayGg4sGWhMPbbNDOVPQeHEM23Xjq751f6Jkd/P5vCglMjYhDAjto8OXz+699sE7Deuv0mBwBbN9gb29P/CCCFqtNtJpyRal9MCduGoUxo8L17JnLA1JMmbCmNChMB5l0rmTbFYtfvPoYernp7/ANE0/Lcvd+Xy+oWW1OjlrjsdjT1XVZ9R9mymTEjcg4t2xLXBSXNAvDvYb5rc/flfy/OBc140fyL1/qfCEztm2GNCFZwuyz4xjM08lNu3sws8R2DWp8r2mcYP6nMTiW9blQfe4qvA/AQYA7z2lEDB0G6EAAAAASUVORK5CYII=",
            iconMoti: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0VJREFUeNqUlMtvG0Ucx+e16117/U5ixzhxQo1MGypHFBOCOJJjkLj0VAmhihy5cOKf6aVHOHBqORYpAqHSoBYk0kei5qEm2LHX3oe9j9mZztCxFIkghZU+0mpW+53vfH+/38DNzU0CANAVGnjzRIJQEAsScMlHCqUFBUFekFE/jwS2wBUwAb+MGFJCDcH1rz7sfHMT42/F+zuCObUR/j/Oyhih5pcbG7c/YMnHDx498lKr7d0QQOnQF0wuOCr/L2f5rfWPbnUK+fXe74/h2Pet1KD/mVi/IpgVZJVDU6ErE/AiZ6Tre4H74CfA9/cAiyLIu90GKpXfZwD2lCtHuZHvY+VWQs+L4VarVTsZjczGycmq5TpG1OsDD2PNrczmKcRSLCVzbVTmlq7krCV7PAkp51RV+l9i+YjSLEqnF5quVw8nYwiDEIZWhgS5nEEZLzTn51e21ta2Mvd+bD/W9WcUIU85C8/nJzOzRe2PHibJ9kDXfZzJgCJjoLV/kF3p9iorpdK1rzc+/dza258/2N1diTlvi3/mBZZyTRSIqF46pYy9+M0w/moC0HmBETDDAF6fjJdri3UEn/yBD+/dB39HEeGusw5K5X2VI1AZyuNG8phTh/oAIUDH7o1BLqs9zVpgZ/Et/CuNEN3eBumXh2DIORho2IzKM6dKSE6MgRHUxScmxbgqM0owBua7zeJe2lx6bo/8oeM6vuOduSnj7O04tnJhiEPGDLtajRmEZqdeb31SLq2VxuPyQZIcEzUuMsyzhPOnXS+4Syg/qs5VhYbhQAjTIu3KcZyg9nC0vO64eNZ1Fmbaq/VOsVg5/v675OeUfh/UF38hyi6d9pLrjUUG8LlhmpoaJTmvtYeF/JDo2hcsDHLpnZ1GE2HU73bBDzS2XyLMhZA5FWOqzEwF2lU5AtX1PV/T/CdXW5W+Pbj5iiawFk3c5aGtnTLOWdX6p0XIuVmjqsNDleE0S02tRT0rN4GWdVAI42JMSHpQi696h0cLXNf6co7JBQPML1iT7SMKBgIOUC+VSs3ImdaXG7Zp2zcCQp7JfiWXuFmmESSqUPKeeyWH/zSgf4Jr793R3mzmkEteVYkSjZSgc+5mRmpO49cCDABebWpp4n76+wAAAABJRU5ErkJggg==",
            iconYield: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABBJJREFUeNpclFtv22QYxx87tuP4kJOTdG0X2qrQoiE2DlpXJgaTAAk0VdoNF1z1km/AFR8IkJC4Aa4QIHUCVrYO2q1dD2mbpkmd2Ens+GzH5nH1RqqI9JPt2O//fQ7/96HW1tbKAJBHZERAMkiIuMgIcchzSoyMCel9Ald+DFJF6sgsoiBZxEMGiEauqaBPNkixyXN4VTAVq99/f+XLaim/kqHGlRwTU549gu2d59Zf+/pPoijtkQgtxER0pEuu6X8BifRS7Pp8febTLJuRXFPFHCOwbAu8KMn5rvWRLOcX1r94+HpXVcfNk4a2fdj5BtccIQ2kTTZIox2nYqXE7oBSysKfh1uwf6xCo6VDGIVQlQvlxbnpzNAY1Xq9LsSxrwhsvJ7juTN14P3AMMwOrm+ScripWPa8a8YyjXX3R8AmPmSoBJwgBNuPhPN2R5AEDox+F16rK9zy/NRSs6XOn7b1RJILPK7nSMm0zPLy8qpS4O+ZTsg/edmB064F3aEDxsgDrT8E1zJA5sZwoRvw/c+PYDTswddfrdOfP7w/t/ficKk3cC5omk5r56Zit0QuXl2eyuQ9U4fYt0AbWuA4Lry1UIaP356FBYWDeonDesZQnyrCTE2mJEGi77zzZun3R5v1KMm8RLFhmubguD1sLFaYWZqigErGsDRbhLuf3IBaUQDXD2EOBWqFHDy4vQAjN4TG3i609hsQixW4++7Sq9/+uPlepVo9ScV6jj/e/Hu3teqYfdbBjx/cngY2mwVJFOHezWuX/ozRotE4dUAElaIMh+c6bD09gESq0a5j3UC7SqlYl+Oyz3ZPOk9FMO/YXgR72NGYosGq1yCJQ1icLkM5L0EYJxBQLJz0NOhbATzeV6FQDMB2HM73fTatWSqYZHOS3tEdxfGj7HSBybGYc+B50LrQ4aCpQlsfAsuwYGDkLJr+u99ewGlnEHcH9iDLi08kSdpkiOla6JnMK/MLsW3bH/Ssi88UKZJ4LgMCy2CKMewed2D76AJoloMgZuFcM8ENktHM9WvPZFn+g+f5NkPOYT8tDLY4xhfuhWrx7YH2YUX0pPmqQOdz2En0oRuOod3tg+7EoBvuOF8oa/l8/jHyz8Rnk0kwmRSWIEptP2Z0zQHqrGfxYRDwNDbaxBRNx4f2wMc2cF3s4EaxWPwVgzhIzypD3DsmEaYTIKIoylMURSuVSjuO49xsDvSVpmEslrKRMrR8GNrxqDpV2yoUChtYniNy6F3myjiKyViJSZQm7tjDwp6JorhjmuYbak+9ZbnRHC+IDUztF0EQ/sXvVDKSoqtiE8Hg0kwk5bSeGGkHozjCxRuGYShBEIS4yXN8d04aeDk4/y8GJNXJJI2uTFyNZVm+UqkwZLFDIvIm8+w/AQYAA2L5OdadVygAAAAASUVORK5CYII=",
            iconRate: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA85JREFUeNpsVNtOG1cUPXOzPeMxvoHHJnY8JnZtrECISKpQVEVFPKSRaB/6nk+I+pLP6BdEkapGVaVWEelD27QPBSyVqA1CDUGQggW48f0CnvHYnrHHnu6DjiuKamlJs/eeWd5n7bUPtbKyQiOEOIAdIABsAJzrA3RAFzAAUOQ9DETqI+A6YklRBPgA44AxQoaJTgEN8oxzDgBPyDRAmxD9S+YETACuirw/PSXdXW6dWUKperSv219nIJ8DtEhnYnz803u7mWHUCmw+5scbx6RzNCLDnUxGgzeXUqFPPn/zUrF3NOi8I31ULoiLwYXfvoD6GWAoOgKS1Zx6lC+9OImnG4/JqajLZFLEt/DZ8yc5e2n4Xckn2ert/aXpttm/IZT5xbFgdw9rI4nzH659dSzw7+18Dzz42EOANSKjiejuTt0TPyltocisduiJnNUCqWoJl8+qw/ehHgWEjYr8scavH12Jc7sQGwSDi2T4RzXKOmJAW85GmTgxdZ03GYpHFH0u+ETEc3fh5c91j1euviAaqmQw/yHD7FohX67xlIzUg5kIRwusw4yHdCuPRDeDJyb0SsnbCruuhGK23QskI7sw+Jkl/1JrGNs/9VDwQT0rJZRsMrFjbSBTeKv6IkzeNbgtv1qri2NTReiKwz50ERvR5HtsEwOTKYCiO/F21eSK7fK71nJz0BBEL1VJp/wHoLFFK9enu9xGO5nissSPFrFUEzcCqOCJs8R4VTwZv6y2/DJag/c9EPsh5QvYF++82TYEX6zxCnKeoHsmLksfpNQ6YnO5k6zKbD5jhNbOyBoGEbNPWnYTE+OYc/RuzKnWRjsRVwp+x9z0pP3+/No3RdQzhkhwXQmXazfTkaXMI2xemgjZJcetkS5x+91rE/dmN39ouFyxLBadCjrvJJ9/uYfq4pND562vM7VqRe90O4HyIb8Mde/IGlgDk3SDyNLz5ml4XuEyajBunE+wp4qiZv2FIknmHWsbmPItpcTAumotTcYajsgQGbONLP0YbMTc9q96TAzn1iGu465bzT6yUwE06LFYHhS95mctWAITtfEmDC+TceRm4JjWzP2qvnkanbb9AvHfeOHzpeMjGwogdW8h4bXNTtQOgiEV/Yl8QWYL24O9RHZO7tQX0xs/FhOWf38VTpyHVA8f2xC2nnVp6aFW6IUqq1yojZ4iynvwOjAZ/gN3f5EMkcXVc3t9q+/+/enVJPctxAUycc45WdRkd62Yz/aWDbMpSD5qPxwL42vqBJNRcNNeXC0H0cxJnnFHHTIYmtjm/y5QrKn6jwADAOdNghDsOz2+AAAAAElFTkSuQmCC",
            iconItem: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA1BJREFUeNp0VE1vGzcUJJek90O25A9JVpQYdZLC7sUoArTJJe2tKBrAKJD+xl576KE99VQ0xwBBkIuLtqitRLEcWdZqP8TdJbfzNlRhuCmBAUjucjjz3uPjx8fH7MbggHcDtYMBrMN/hryxpoMKCIAICN2aiDSQAbmbV27/g2QC8IENYAfoA9uOlJTEwDtgAlwBKVBcJ5TOlnQqtoBhXdf3ksXi8yxLHuZLva2kLDbbG6cbnc4zW/NX+OfUkcbXVFpxeHhIJG1gANwHPr2cTr+dXl48TdL0bpZlO4sk7Z9PLj5eD+WDqNXSdc2Fc8KdMrsi62JyGzjUevl4djX75u3b88+MsWSXC+FxKSW3kBQneRD6qg+yrrGmjX3jyEhZSfZ6wMFsdnl8cT752jDbLcuKpUnCOOdM+YqtKcU8z2MCzKPxZH86nX3Uaa9/cXs4/HVre+cH+o8IpTFm982b10/iOP6urExgqopZaxn3OKswL9KSZbg7jELWaoVMreH+2vLJZLq+iNOvDg5q2+31KBmpt1gsekk8fwzJgbWGlWXBqqJkNQjoRo97731A7VLrJkxRFBAh07qQo9HoS8T1AWXfA0nOhTwBiY7CoElxrvNGFbLagMKMWUNYFBVTEraFADi7mi823k2nj3CsK46OjtphGFVZlt8CwXYURbIsS7bMQWgMex8O3sSMUJaaFVBIhKR8hX6//xtlcw2jBEmWptluVRaddrst4Y9ZY6GkwLPgzFiaa2xzqOXMD/wmBEQUBH7c6/V+oWxeUs2EYejt7e3Zs7PTp1rrTzY3O0EYhGy5zBt7FjGig3JNMSlkU2BKSawlYhj9QQUs3bOgUQdBYO7c2dPj8fgJSuNISrHVarU42aYMX28FpIpsS6n+HAwGP2P3nGz+W3TAUil1BZuvhZQpsufDpkIOpIfTFJ4mftyzyIfGa3i5v7//ve/7z3H2TJycnDBHaNzDzXHjHIpGIP3L94MLrDMoq5sqF2IOW78Pbg1/Gg6HP6KQX2D/bwoXv95C0NuEazmr90pdowebu2maDpHtCMqXuGiMkhqTNddJ5uSK/09zXJFSS2o5hK67WNfTKNaJm1OIrPxAw1zFcGWbGuLMXeDd+F458qan/SPAADZkjTT769JCAAAAAElFTkSuQmCC",
            tableBorder: "data:image/png;base64,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",
            iconReset: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABB5JREFUeNpMlM9vG0UUx2dm1/Z6vY7txE5cE5yQQOymMSERJGmjSFBVSqUgAVJVoR44IA4cOJdzVfE3IBAnJISK4FQOICSKhNS0KCQqpGnaJnZ+NI7t+Nfau17vr1nelHGVkT7aGdnzfW++8+bhvwhBRBTRjeVljBDyAUEgDEQBBQgAFNCBFofNTcAFPMSHeHNl5cUckIE4MAy8DAwNG0byWTBYhXkTqABF/m0AHcDmwZ4LsEEACRgAxmVKZ6+Uyx+NVasTgmUR2u2iI0KO1lKp39dHRu7woOwULIgGWCxDIZPJ9EQjQFr0vJlPi8Xr6Wo17bXb2G21kK3riBhG30ilMg0BXqmGw0VNkjSeld07LhMTuTdJYHJJVT/MFYuTLghQTUNFUdS3EolqJRyuEUq9uKaNnj0+nq9EIhtNWa7Dnm5PkAn5gT4gBbyaabdzHgULXBcVIpHqdwsLmxTjPULIMfxujJbL0fM7Owvvra/fuD0z80k+kWCCArOKnBJjmaXPqGrUsyzkQlY/53JPPEIOBEHYBrE89pHKYSq1fWtp6cut0dGvLm1tXePmk55Xvvf3999+yTA+LoliBJ+cCFang6qC4E7t7qZlx4k8ymTyx7EY+XdOvTL2UP5NafuMP86du+8gtNlnmrQVCDDPEPMstB2NGgbG4oVCYZnoutj+v5iIIwjm3fn575uK0mor9sTBlHFVlbrJocPArud57b14PG+KoooxZjXnCNlsVoZF6ESWcSMQQK+VSmfBUdxQFO3O4uItOxhsOIQmd8+b18wgDdX8+iDuUhRt+gu8NFQQZpfgsrMSEHPAE/VRKnV3I51epWDlxuTkT6YkFVzBE/YW7Q86MRq3XBsZrokfjtUuFVLqmyAiAYS/Ao/AAuenO1mWKhhd+TOX++FocHAVjF41BjzhYMF5FxRErDuG4UICDkWDZamyn2gu/Z0tvQMimF8AZhcQKMX0i+asq09tRB9Yomj8Ojf3Lbslf4XaqRLdgLS1wxXrgmGBGBwx9zR+T7LEX+A/a7z66fPM2C1MrUV+rA9ZV+9drH1eTHVetzwv4bruKKV0AjIf355ujVXtpg8ZFIVUQQOhJ/yNNnnRur3SsJSW2MzeV24+mmt98c8b9c+CWbHZr0kqcbGvJneUE7HVh3QIblKUaCg7sOcpF1N596CnnxMO6oLdf+TfbMidwWbEHNdDTrQeMsIt3AkgC/x1PSR1RW12N/mNSMkD2HPAM7N7bYiJeXzh+m1iDh8pj8OqeNzx2zETOZJLXR+LO1CX9t7aPvN10PIxn/aBGs/KO93DLN5G2Lkd1qOSJbkJrMM8pslWv9Lx13lNPQMO+bzb62O9IRxcj6DxxwrlQl3e8FQeuey3hTx8Czwb5lO91xRvX97zMjvRF2L/CTAAXkAASAqjjOQAAAAASUVORK5CYII=",
            button: "data:image/png;base64,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",
            arrow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzxJREFUeNrsV9tOE0EY/vfQA1CsUqCcJAZDQkzAoARNiFdKNCbeeqEXmpgYE1/AK9/ASx7AV+AFNF6YoKGAjYC1FLFVeqTtbts9zoz/lilsGk2qCCTK33yZ7s50vu8/zL9bgTEGx2EiHJP9f8QndmQmcIgcznfKwTgOxWRO5kG0I/z82kKYfLQ56N8U0iD2Ppq9+kTwePuyFePz/JuFD3hPQ1T5qHEhbjHkIEIaYQ6M9ofG7lyZmA8PDoWDoV5SVCubmXxh/ev3dHRxNba4tZ3d5kJqXIjhEmK5hLDfybET4t7Jc+FbN6cvznX3D0ltHR04g1PYUimloFaquXSusL6dL0Q3UulI5FMixkU0oqJzMS2lR+CjhOhEDM+OjzydHh973NF5CmSPF0RJRn4BiG2BjaCEgIT3mCSrZbWWyJXKa5vJ1MqrpbUFLqKl9AguAU6+TyNG7l2bfDHc3zPj9flBkmUQRRFMXQdD19B7Ah6vD5w5x5xoVJUyBLt7iE5hcyMej6XSuZV4priYVbVvuERFKHzUuAgqNHnvQwz4PfLkg+tTcwG/L8woA9syoVZRECoQy8IoSPVoMCSlDInLJegKD4C/vR0yya36esctg7B0zabLJmFvqxZ9/XHHXObkRG4KvbOe6Jatl9RahmmVsFLcgYqigIkCcAMgmHPB+XDJzlPVwjklmQQZbyLRflIZ9GGSJ3G1GPCIZDzky0cLRrxxnMCV5zZE1+3LY3fPeIWJTDIFqmGCZjPQyS6xTXe35XVXJ0EuaJMFkEUBVJN8wWUxFLqimvS9YtIELinxcFd5we0Ri43Knjo/eGMo4LlfymehYliAP4SqxZyw1b0mCLYfHg2vE7hkHTdYKZv0HUakxKu9xitdbyqweqXvNRCnsM6GghdGg55nmdSWZFgECSlUEDV711tEAT2OY2lG0cuIZtNV19muNR2pxtn+aaPZa5k+Weq81Ot/XsznuhwiJ29FgyTQixgSRDHcEfQ6+YsmYrrObktNpEEszvT5HiqKqud18rKgk/WsRpbQu1LTuTRcJA2P4E9ap+DKbweHxDc2Wg3bQR6LkguME9iH/Wg8sX/8nevkL8xR2Q8BBgA2hPFRtbbr5wAAAABJRU5ErkJggg==",
            iconChatSM: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AoMDB4YZ3mPAAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABeklEQVQoz3WTvW4TURCFv2+DiFIipXbWCgqiySP4Idy6oEJyCV1eIR1FXoDCUqrU1JFQHiEikrVri9KioOAnEhwK3zU3KNxm9/6cM2fOzEi1ulW3Bxyr0yQz4AS4AxbAlbpsR+2v4b0V8FB9V0DbS7fXSYb/BfCmHbWbHbgAr4GXBZeaeIuPKklugcn4aLyxW3V76ntgNoCqSI/ugUWSVw1wXEk1yQo4B26SCNyo50lWZU+SmXrcqNNKGsDl+Gh8lmRezuftqD0DLofo5TttCkvxR9RJv+5P1XnJcd6v+1NgUsj/Ru9W3U/1aW3UkGOS32rzmAfAfVPqOOi2IkFteGh5XcK7pjg3AL4m+QD8GB4nuVc74GORnMK1sFt1J+qnQvBdvQA+D3Utaz/Ja/V5JeTFE2AJLNRZkgPgLfAF+Fbs31efAQd1nYGlAP26P0xyrf63wyqXb9VJO2o3DUDp1UmVv7VBFdFiAPIP+26qgGlp191UqVfAg6n6A0q42/cMWcqjAAAAAElFTkSuQmCC",
            iconChatNoColor: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWFJREFUeNqMUz1LA0EU3N1gY2OQs7HwI8L9gUAqG5VYWqS1EIOQIv4OtUxjKwS8NoWI+APyG0RCzrtLaWKwVPFYZ46nRLmNtzDs2903c7v35mmrslEC0jiJOG9prRvW2kPEPjAAAqCH/XB9bSNVMgywBDy+V6v7OOwi7oA4xFzHehGoIx5i7mDuJqPY+yYrfvmjsnmUlsufk4uzcyt7eYhHcStKogfAy26MoITN69fT9iU2noHafwLMJ49kH7iTw4MiAsyHgG/4c7C+klfcACfALVBTjgEO8xuGfxWL/sxZEYE+eUbKMf5zOFcAROb7Ruq4kqPuFMBNmT8gOYDStuN6LgHmB0ac01TukSfQBKdHcghM4ZxWEYEXGIn5GU8K79E5NMC8+tJIdOIbrMy1lsZQaAqP/sX7l6WOLMdYfg7fyKdNV3d27xfCp2PEez9kEci6igYAfnUV38irznbVlwADABPWyIVOu15aAAAAAElFTkSuQmCC",
            iconSave: "data:image/png;base64,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",
            iconPlus: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOJJREFUeNpckTsKwkAQhvPYaFTUQhAEQbAVcyM7L+E5rLyF5BamMpAiRQKCVSBNECRqkvWfOCurAx/7w7xnTeNjJmNprwSN9v4ECWBrkNWgYmrBweTsMF3gcLUXeDBStRUcOAAjKeUljuMd9BD02Wdbf5V7nGCUZamSVad2NBJjMC+KIpB/liTJHr4ZJQpehDaWaH10XTf0PG+b5/k5y7IgTdOTdpV2Xmo3BUuwpopRFB2gV2ABJsAVnEEneoI7ad/3N2EYXqFvND77GlNb0NFQd674fESlgg0OsDTUz315CzAAWshhdQv5QQQAAAAASUVORK5CYII=",
            iconExport: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAr5JREFUeNqkU0tME1EUve/Np62hUyhBIfYTFI2u3Bj5LIplw8KthhgTTDRgDCvZoMQgbghrNkSWagyEhW4kAg3GaIsKwbYKjYQmiggBOrTQMv1M5413akoCRGPiTc7kZd57555z731E13X4n+CNz9DQEPj9/v07SMzxPEmnMzpjGvA8DxzHASHkMMGrqSl4PjKyb8PldDZ3dNzuWt/YCGK8DoXCn2R5a+WgAvLR4YB4IgFpRQGKP9YZgzaTaO+9e+9Re/uty/JWjOU1TUklkzuyLEcXFxcDszMz06Hw5/DS0tIyeYuXOJRlSONw/YMxa2dNTd3I8PBoqc1m293dBYp2jFLxPAcmkwnQkpZXVW1wcPA+TygF9lsNh2c8ZoDOFrc7elSSbPLaGmj5PFBRBBAEyGYZJFMpMJtMnNls1rfi8Q2jBkZVTiKuY0e6SyilntXVlURPD6hoC5AA6uuBNDUBRRJd0woq5ue/hH0+34RBYEf0Iq7paINHrfZIxJGKRArMxZrzXi8wSkAoGGVaIBCYjMXkNYMgh3iMKEWhl1S0RE9UA2XGfCByKhCXG1ekQMajis3N2Lpv0ves2MYkYgI35yKM3XCVVzys6OszZwWxcEFTc8CsEp7EGcAOEYFCKBh6P7+wEN6bAyMsjMVenKoOdff3U3b2HCZnwHQjL6rIKAXvhgY1m1HGxl4+KU4wNSpsQe8dnFDecPNqV6VLES3ZFShhChzRksDlYiByBETRVCje9+/LX9/5/ePFxLRuexsGWlpgWtedyk5K870JRj7MzkV/RoMJgeaY1XYMJMkONkmCsrIywOxPFSWd3htlggp0nHNg+W8P+gbasOEWHElLVVXlGW+jx1tbe+G82+2schx3WDOZTHx8fGL0wJvRobW19U8PzYY4LUlSc0ND/Z2LjZ4rh079heCf4pcAAwAOSzJPzSWG8AAAAABJRU5ErkJggg==",
            iconImport: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtBJREFUeNqkU1tIFGEU/uayt2xm3UxX000RLKVeBFES0awHKYIgKn1p8cWwNYqeRCiJXnoUwhDsoQdFkehJErxgEO4WKOqaGq4KZWFednZWV2fHnVv/iAYqRdA/fPMwZ853zne+81OGYeB/Dmu+2tvb4ff7D0YIMcOyVDwuG7qugWVZMAwDiqKOEgwPDKPnbc+BwGmPp6qh4V7j6traJDnvg8GpCUGI/DjcAZXZkglRFCFJEkCTLxuA/ZXN1dTc1F5Xd/emEAnrqqZJW7HYpiAIi6FQKDA2OvoxOPV5amFhYYnCU5LEmFR7WARyPuRc7e7o7kpLSXNGY1HQpG1zUqYMm80GIklTFUVra2t7TJOqNhI9Bh3HsYMkaojKSNxIPOyN9DpXoitgdRaaqkFVFWxvbyMsCKTbOEMzLB0RxTUKz1BPyPMIUgg02kIn2eP2KxIl8WXpZajNrcW55POwUAw0Q4OmG+A5DrOzM+M+n++aOcTrBJcIrOZQdFWHxEi7ckaWRjAuTuBlUSsKUwqhKRosjKlX1wKBwGA4LPw0Cab3kk8RISobZVI5nnOLm1GkJ7tRnVONVHsqEloCFE2BtViwvh5eHRoc6tq3sYXAQQZpRSf4+94Hrcvu7+5o8gbqC+qRz+WTZAWyIoMmBBRNIzgZ/DQzOzu1T7C8ayjprEDNvewtvn02Yldg0SictKUirkpQVJlIondtUnZkqa/vXcf+BrNWxkr6VoHXTIrvTs0TNzPNJbN5MBwuyOoGqSoT65KIUQwYUn0+FJob8fv79xeJjjXGUDNTA2PO8IhbW8qAf/pLYHR08dv8WNRKJ3TO6QbPn4CT5+FyuUCqdxIb479X2eyAJY9hqF+bn7+oAywOshuOjIz0/MqK8sqSkuKi7GxPRlZmFifLstjfP/Dm0J0x4PV6/3TRnARneJ6vKi298OhiRfmtI3/9heCfzi8BBgASRjBF6Hz+5AAAAABJRU5ErkJggg==",
            iconReset2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtFJREFUeNqsVEtME1EUvfPrtCVRoNQfJEXjgoQJxJDACuOPhdEFRRYkJqzcGAILE3ThJ2FpIolujGyMIoSFWlQGIcYVIMVgEVrAFtLaUiJ105IWOh3m550pEJBqMPEmb8578947c++59w6haRr8F/sbka2w8Kjdbj+4Hx5CJyIIYs+G1Wp1dD15/A5RjSwtjU1Ofhnxer3T0Wj0ezKZkvdLRDmd9bc7H3R2JFMpYFkT6H5viKKQSCSCaOMTbvfo3Py8b3p65psgCBs5iUiSdPT19fGVlZXc+npaF0DXAFQEk4kBi8ViSCJLkhoMLvra22856VzhOhyOUxzHlWUyGZBlKfvSeBCQTqdhHQeJcwybZBiTthKL/SBzEJlqa2vPmM0sLcuy7p3hDYGoqWp2vWk0TUFPb+/TZDIp5iAiDl+oqzstiqLhviShR0T2mEGmqbqwGKIJlpejP4eGhl8ZpFvXq6uq6hH68XKooqKsWEjHoftZL3yemISz58+Bs6ERKIo09CQRGYYGt9v9Mh6Pr+wiQnuDJN14sPmti4fikhKDpASx4UqjQaAoCnpFoFcEiBlRdL12Pd8Oc2dQ4UjkPlfONQ3yvAmF1MWEltZWwwNVUbPZxbBYloWvU55x3+ycZzvTO4lOlBbXtLVcY/S5np2Lly7DgfxCQ2TQFKOWUCKgUCtXv6tLVVVtD5HPHzh+43rzTd/E8HZRhYMBYKk1oKkMsOY81IVBZCEWWwmPjX76sKv2trAgv+Dk3ELYzI/44VBRgXTsSJHqmZoBfyAIFqsdi9AMeRiqzWaDAX6gJ7G6mshFRMiiEB36OG7TF975xZbZQKgDNdl49LBL8fv9KK1gtMpaKpkZ5N+/+L1otsRWSh2OJkSPnrmlaEQ/aLGWl6/RDHP13p27IbPVMlNTXc1h5haDodDCvrt/ZwPj0BNg2fzwKg7pn/5HufrwTxu/BBgArZRH3O1yru8AAAAASUVORK5CYII=",
            questwiki: "data:image/png;base64,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",
            iconLight: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVlJREFUeNqMUj1LxEAQ3WyC4SBVKrsQm/sBBwdWtv4Df4UgVtZWVvZWdsJVNhbiP7CzFUKKoCBKCEnM98f6Bowsl128gZfJ7s68nXmzhhCCKWwBrIHl7zoF7oF2FkkEEkzgHPgUc6O9C2BPztkmuKHIcRxF27ZCYw86ghWdhmFIjhGJysqyFGmaHk95XOpmRR/f9w3yhmGotGFd1zGQHE5rSzp7n2RhGkNVlMyapommPS4dPsK99H2vy2d5nhMBXbSZEXDOB5Cc4pf8LBmisizL2DAMZ57nfevGSLhFFTPx4jgWQRA8bcdzRaVXpmky+YFRRVVVkbCX/z2kCc/yGCGaiKLoTRVrafQKiqJYT4LWdU3je1UF6giuHcf5EypJEhJvo4zUtLCUBUT/JOLRzi3gtgFlf+DJ7tPLgwZftm1Xruvu1gKmEIDgADefYP4Ly7LuMPtUFfsjwABKB8AI2XbIaQAAAABJRU5ErkJggg==",
            buttonSleep: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAZCAYAAABzVH1EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFRkU1NkIxNzg1N0VFMjExQTJEQUMwQTIxNTUxREQyOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RTMwNEJCRTdFOEMxMUUyQjBDRURFM0I5NkY5QkY5NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RTMwNEJCRDdFOEMxMUUyQjBDRURFM0I5NkY5QkY5NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY0RTU2QjE3ODU3RUUyMTFBMkRBQzBBMjE1NTFERDI5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVGRTU2QjE3ODU3RUUyMTFBMkRBQzBBMjE1NTFERDI5Ii8+IDwvcmRmOkRlc2NyaXB0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",
            buttonBank: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAZCAIAAAD8NuoTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFRkU1NkIxNzg1N0VFMjExQTJEQUMwQTIxNTUxREQyOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEZCQUJBMDg5QkUxMUUyODZDMkNGRjA0OThCNDIwNiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEZCQUI5Rjg5QkUxMUUyODZDMkNGRjA0OThCNDIwNiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBGMDUxMUFGQkQ4OUUyMTE5MTMyRjkyRDBERDlFNjRDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVGRTU2QjE3ODU3RUUyMTFBMkRBQzBBMjE1NTFERDI5Ii8+IDwvcmRmOkRlc2NyaXB0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",
            iconAlarm: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5Q0JGRTU5MDhBOEFFMjExQkM0RkRGRTM4QUMzODJBMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMjVGQjlCMDhBOEExMUUyODFBMTg4RUE2RTEwNTY4QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMjVGQjlBRjhBOEExMUUyODFBMTg4RUE2RTEwNTY4QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlEQkZFNTkwOEE4QUUyMTFCQzRGREZFMzhBQzM4MkEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlDQkZFNTkwOEE4QUUyMTFCQzRGREZFMzhBQzM4MkEwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bLqFjQAAA3tJREFUeNqsVVlIm0EQ3kRr1UgVTY23tR5oQKFFBKGKBwoKSl+qb0JREEQJ0vqgqFh8yYOFgDRajQ+tF6KgjXhGqxRCFashFCvxQoxgDPFITRRzTWd/+H+iEfriwPLvZme+neObCQ8AyEMKnzyweN/9YWhoqGJpaSk7KirKWF5e/iU5OVnnfq9Wq1+OjIxU2Gw2QWlp6WRxcbHyFgANmV39/f3SlJQUiIuLg/DwcOjs7FSwd5eXl8RkMpH29vYfERERkJCQAOnp6TA7O1vnjsFjc7i1tfW8trZ2b39/n+Tk5OgrKyvfnZ6eRi0sLBQg0AtUcQqFwl9FRUVKLy8vS1dXl3x1dTUkKyvLOjAwIPLx8bHe8hANX8XGxgICaYxGo7ijo0MRFhYGYrEYJBKJq6amxpWUlASYCujp6fmAD+cVFBQYMjIy4Pr6OoTF4QBdLpdfU1PT8tra2puGhobFgIAAmJ6ehpubG1hfXwetVgsWiwW6u7sBvQGFQvENPZQ0Nzer0J7nAcguzNsEhgQajQZYqa+vh8bGRu48NTUFAoEAlErlR2pjNpvJvYB2u12YmpoKUqmUMRweHobx8XEOyGAwwMXFBbPPz8+HkpISx8nJCf/8/NwTcHd3lwwODlZFR0fDwcEBIC0AQwJ61ul0cHV1xVSfeudwOGBsbAwSExNhY2Mj290pjtiYWIJVfRoaGkrQgFaaiEQisrOzQ5BvJD4+nszNzZGYmBhSVlZGsDjE29ubhht8dnbmSWyqEBkZacKwCJ/PJzMzM8TX15dgAcj8/DxNBwNKv729vZTgjB6uc+rMvcRGujyj1Ghra4P/CfIRCgsLAdnxxB3DnTbMt6+v709gYCCsrKxwxq2trdDS0sKdVSoV+Pv7w/Ly8ve7LOE2TqeT3T9G4ytqMDo6yvBwcXGRAaGFwQdZHpqprrszt1qPFazwI71e/xYHhEwul/vRIiBFmKLRXFKKYANYc3Nz32NP9wUHB9vvHQ57e3uMMoanplQ5PDx8jUuB57/Yjq7q6mqXTCa7QJ1Pm5ubdTQt+OBXaosU43C4KqMxsVqtBDtAhfyKRgL/RpJPYGWrsI+ZiiMQCQoKItvb23lpaWl6nEw/maHK53vSho4nmkfs4UkEwkdt+uPjY4YmOGUItiPjydHREfVEm5mZ+RnTsURt6R0rvIf+C/gnwABBPec5UzOlgQAAAABJRU5ErkJggg==",
            notiBell: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDMjhFNDI0QzYyOURFMjExOEQwMUUwQkVBMzJBREI2MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4N0EzMEJDMDlENjIxMUUyODhFNUM1MTdFQzA2NTAwQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4N0EzMEJCRjlENjIxMUUyODhFNUM1MTdFQzA2NTAwQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMzOEU0MjRDNjI5REUyMTE4RDAxRTBCRUEzMkFEQjYyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMyOEU0MjRDNjI5REUyMTE4RDAxRTBCRUEzMkFEQjYyIi8+IDwvcmRmOkRlc2NyaXB0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",
            jobTime: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAUCAYAAADRA14pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABqNJREFUeNrsmGtsFNcVx/93nrv2Ln4GXOOmwUKEYIOTWMRpUyCljc1DASmOSKhE2qgljaJ+6OMD0MenqEoLgUpNqhI1JWqDErUpEaXBFapoGlUQIJBAnRbZSTDY2MbeXe88dnbec3vWNJtd40gu+EPV9EqjGWl2f/qf8z/n3KthnHN8kpaAT9iSPnx488DTEEQBgiSDR7xGENiXWRSuiwL/dtfzG30/gMjYuMD52SgMjjiev59LbFySJRSq5EuPPFkGnm1e6Tp16GfXzZPKSIyBgy0VEO2yTL0rq2cQRjk4nsVd16NyEOdWysnO+qqGTklSNkZCuMP1/ePs49pitnmFYF97lnj8unlSmTjOl0g8+oOmpxdcHO6PdHss5MyWJTEsvARlEoHre7p1M5rqW1cqavyAYRobFEl+a9pgZ5NH68TBPUtkUbohXqnDtSyK9mpGasH7l/8eOcE4i8eYHFCp2JZGTglggogg1JXhCQ22a/p1yZYGyLEXJFXspP+PTNE3hZdiqhzIYRjAsy34gQdRUmfMe/PV3bXk7FXecG+Ud0dYTBXlMCjRR0n2/KwyMqF/LE8oMeQhz3NWXB7riyx3kDHuMMvUkDNSKNwNfRieY0KRKqAqFUgZfdJIpjeMqXKLIsuPTmNwGQ88z+x8DkZ2GIY2DsfWkc+l/s2r/A94/VHOvshEwWdGdgymdgVW7qo+181BEeMQmIC02T8t76OAOb9/goRouREmsZAVXHDzWeoRAZu2/ga3tnSRGy58j9zx8rDyLhsaGxC8wCQx4rprBJbwRO4zS09hbfeP0Nr+MOKJBmzeuh+NN99BgWvwXWvGvKw5yAJ7gn1h3ffRce9WBKTvwUd/heZFK/Hp5uXY/NiLiFdUIZudmJZXDNjzvDY9l6HScCh7UiGjEMXChHXR19uDz9/3LXym+W6EoU8ibYSBgIxusPTEWBRx3jZVYBmPOJKo4Nyp32LZXd1Y1Loalwfewup123HTpxbDcWwEPpsRj55YLJbEuRMvofnWVWj/3GYM9L2BlZ3fhSzFMD56Hmu6n0JVTTPGJzIslblSxisGTD3VGIR5+L5OpUECqMciHk7ej/9lL06+8UvcveobUNUElQyHKAjkigPNMHkQhpVTBZbyPN8hi4DzZw+h5/c7sHhpF3rffhXvvnMQq9YUhEqTzBnxAoN0cbx//igOvvgEFt62Ghc/OIlTf9uH1jsfwOHfbYeWuYDO+7chZ4aY0LJlvGLAqqzQPuZzXR+d7AWOiMARwBlabl+P9nsewet/2gmPklEYXoUIPLcghCDCteeXUp5jm5OJm9fUivs2/BBnju1D0y3tFPh69LzyPWqbkBjyzHjaKPVsBrX1C7B+0068c+JlJJI15PQWHDv6DCXwO0hWNeLgS9uoBYGQS2W84pMkq2MxNcEQMSpXj5wJqbd8SEocHasew+uHf4zhwXdhewGlQoAXRLT/CaisSMJxPfuaE00Zz4Vt57CiaztOH9uPsZE+tNzxAF4jN9LpUcrpzHl0iEGeZsuKNdvwz7NH6OrBXSu34s+HnoQaq8VNTXfilV8/AZvaxAsYEhVzynhSyRTsramePy+m1ERZbVzwwxgJpT6WDPxi10bQnkauS+QUCBbgwpBJfVkdNc2dJ+byTu80U/Ujnp4SAuI989QmEiUjFpexd/dGmhGV5K6IrB7OmBdX6yLNSAvP7dlCFSgRS8Vzu7uJW0HVEeHk8cOU4wQGhrxpeUWH7bzZUxmrQV3NEp7RPJiWSyXBKEABklRFl0p7O4NuRvjgkoVMlmP5sraovqaeEuAcmSqwnOfCsByIcpKSFkMUSojHqykK8bp46awDN5SpteJFfSINRUFQ4AYJXLiUJ140La8YcN6299uOd+a2RR3iwgUdLgXMTStHmY1QOJhZeY6hUR/9AwbSeoB7O9rtLy7vkC4Npy5kNPP5qQL/W3nFkq6Iqam0Zj4uSMof71ne1TAnUWefPHsGw2PZuGW7yFmY7LW5dfPsDW1t4dLmxYl/9F82+gavfK2xsX5wqsDZ5q39+k9SB5799g3zigFfHEkjl3dPu0HQvfCWxqeXtXR8dn7DQqSzqSCjZSPazFCdTLA5Fcl4baIa7w2MnDv33tD2RCL+V13PXTNVZ5tXWN3f/OnpPT/4yg3x2IcfAHbt2HLVmbiCeEye73rRV1VZWqvKchv9JhGGIR06Qnsia/RqWu6IblovBBEfUBQ6X9Ow+PnLR8vEzTavdO3b+fh189j/v3j8j69/CTAAlYLV+GHDmPYAAAAASUVORK5CYII=",
            pinMini: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtpJREFUeNqsU0trE1EYPTOT9+TRpE1qYmlibAQ1BcGCVKStC0EQQdzoTvoDLIhLdwrdKC5c6Mqdr7pRqNCFILgQRVSsQhdqK5WURpvapOk0mcxMxnNtYlGpqdALh+/O/e537vkeI9m2ja1aMrZwOZqbcUlCQHHtjybjo/Ln2b4VG/m3wOgccHsn/QHiGHGBuNyKzBHfnu0+M/zKejoGQwG6yojU87j1DZin/Cf1/0mzs3/wulubgTb9EXYUKMWAoAfoAe5S1fkasEPaLJky8bB/dfwOnIyGRTQiDSDmBK4QM0zjXGkzZFpl1VBXAZsSbJOqFoHlKlCgL0/wGJ+Aq32qesIfi/2b7DlwM88CRRgRmSZJDpjkORWBx5glJoh+07xxMpmU5ERi4wa4gREG750q4jDrj3JDTfM1sRdNKOr6tmgud9DV1vbMW6mgWq2iQvubskFm1wvcT3HvaYxCGyFGWl977KdKQbii6/uMQsHn9Xp9mUxGymazcDqd68p610yVpUKGeEd8EIENYvGA3t4ONRisv5+bUyxFObIELFiWNZtOpwsDAwP6L2VHibPAAz+tEL2b2EN0cZhjRM3hwIGhIczE469f1GoLzG8X3QLZXC6X0jQtIDX/TUlam4VrwCmS3psSMkWNZBnz9CU9HiQDgfLxfP7SpLhr2xJTW1FVtRQOh78Gg8Gc48+OjABjIrVh4KKLL+v1OtKSVPuiaS9Pa9qjSVFG247wylKdPsMwJNM03bIsh/5S1lzdgOsQs2dnM5wz8zGDeRxt9EVjcFVRlIrP5yuHQqFiR0fH4oZk65Mod9LZRzU9vCzznkUim6gxTY1paiRbjkQiRUern9epKIscgTe6rheopJPwkUgmkelyuYQyze/3l4VtScZ6mFQzn0gkvnNAw/xsZ7Dq8Xhkklkk0amuKhS2JBNlKJVKoDo9lUrlaQucLQ8L7yaZ4na7bRLVaY0fAgwAsOEOz+nRA24AAAAASUVORK5CYII=",
            pinItems: "data:image/png;base64,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",
            duelMotBar: "data:image/png;base64,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",
            instanthotel: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABOFJREFUeNp0VFlsVGUU/u46c2eflm4UmBFL2UVRo7IlQiwKGJYAUYghKgkYE014wfBoYgxPPmN4MBKiJMYABqSWBMHQiFLsQktpgDLTzkzbWe5sd+bu1zNjSwwJZ/LnnvmX7z//Od93mLDPh5o5joNQ0IuPtm2GyXHMgkjL0thEZp08nV3DcFxDVpanhx/G/5HLSq9uGuOFkoJVnVH0338Ey7LBEEZt8DUwuVyug+YVBT6fe9XCaNvRZStW7+uIlptHRu7CqDroaI+gY/4iVHQj/tfg4A93tfi3fSMPHmHWnNnBNPj8yJVL9cn3uza99/GBnV/7w1L06s0+3Bl8gMeJBDRVg9fjgdvtQWu4AVF/EEW1OnI7Pn7s74HRbvzPGJfAQzNM7O/asOPA9q6zkzMzgSu37uAhXc5aVahVFZLLDZfIwbQB1WGxoK0db6zshCcgpE+d6z4YS2V75gA5y7bRFPK3fHpo1+lSRY2eudiD9FQCIZeNaFsjli6JYM/uHehYvAjlQhYC40AuFpDMK1jYGPJ2RtpX990f76E8ynXApnAQ619eerhzcduHZ365hmQiBS/ngGNZ5EoaXl2/EZ8cPYy1L63E6INJumwKtuUgNZ0FFQuLmuc1T8ul4kyu8EctjVzHgpbA1o2vfRlL5qLXe/tQqVRg0ttqaTj4wQEc++wIHEuHrml48YUVmEwXceNmPwzTRLqgICgFGEO3QvFM5joxJc01+Hyrd+/YduLPgWExEY+hrSmAoM+N418cw6GD++GYKhzbBE/RcByLtQQabghgaPgeVE2nQkmY5w/445n0kKYb/bzIccuGB+96JyYnYVommhsbcOTIYWztevMJ2JyJglD/7t35NgTRhZPfnEJGzqHZL3lZhnmeljwsz/B8diaHdFYmHjnYt283ujavqxfAcSzk8kVMzWTpMqtO3YnENBJTM+jsiGLvrndo3oCLtcA5Vk0hEp8pFeOlSkUTed4luUScOv0d4hNJnP/1Gnp7zmFweAw9N25hOQHsefctJKcz+PzESWzfsg6Xu69B4AXkq6pumHalFj1frCgj5Wp1tKUxvGba1uiZOs5fuISyboHhXYhTRD/+dAkc6WrLm5tQJZIrpKyfL1yheB24gy7cjyUyZdV4TFsM1nacqdjU1NVadEQWeiYHygfFztefqBsGadWCJApgqTAMrTmzOhM4AX6JQVlThwhnjAArbKGi4l48dVZRtKRX8qJU1RHwCIi0eGHrCmwivkDV5YmbjqFCpQgZ+gmknNamEAKik86UtF4Ce0xCMpi5CkaaGo4vibR9lZJlTlVKCHtEcAKLbFknztkIed0wDAsFRUWtt8wn6oT8onJ7LHWxoOjfs8DvNWXS3f91iWKlOkLq8Efmt77CsQJTVDQCMCl3DAIE5pdEiC6OtMUj4Bbh9wjl0Qn5t2yxeokwegksX5ceMwtIpuaKykC+pBQDkvRcU6gxIEoexmZYioentuXANIhoAq+XytXxsWTuslzWugnsOp1NOHPdphahPfuHfIb8MLmvNwZ821rDwQ0eydPOMJyYzcuGrlcmi6o+VFC0IdozQPv76TtjP4npKcAnk0Qn2tFM7jKOZZazLNtI3cSiSqZo7iGtx2ik6JyGp8+yeLYRKEvDS66bACib0MmvtXfzWWf+FWAAEgZP3u0LJukAAAAASUVORK5CYII=",
            bestwear: "data:image/png;base64,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",
            lastpost: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMkMEa+wAAAEASURBVChTY2hIjqlLiIy1NgKiZHuTJHuTBFsTHx3lAAM1oEictXGwqS5Dgb/9758/Pr17iRXtXTcj1MaAIcPD+uyBNX7GOk7aqkAyzs4UGa1b0O1jqs2Q4GgCVARU8f///4nNtQ5aKj6GWqlOFnBFbgZqDNk+IJMgiiCgp74GqNTPUAuiyN9CG6jIFk0RBACVBpvpgxXpMmR5oZsEAXBFfubaUIejWeekreKlr4Hd4X0NNS7aqkHGOjFW+qGm2giHp3pYAhXhCQIvUy2GJFeLtfO7l05vwYqmd1d6GGsyuOuq2aopminJApGVqpylqpyFspypooyFMkjEXFnOXFkOAHW5yBE3A5XXAAAAAElFTkSuQmCC"
        };
        TWDB.Util = function(e) {
            var t = {};
            var n = function(t, n) {
                var r = "twdb_css";
                if (typeof n !== "undefined" && typeof n === "string") {
                    r += "_" + n.replace(/\W+/g, "")
                }
                if (e("head style#" + r).append("\n" + t).length === 1) {
                    return
                } else {
                    e("head").append(e('<style type="text/css" id="' + r + '">').text(t))
                }
            };
            t.addCss = function(e, t) {
                return n(e, t)
            };
            var r = null,
                i = function() {
                    if (r === null) {
                        r = isDefined(ItemManager.getByBaseId)
                    }
                    return r
                };
            t.isNewIDsystem = function() {
                return i()
            };
            var s = function() {
                var e = [],
                    t, n, r = "twdb_" + Character.playerId + "_",
                    i;
                if (localStorage.getItem(r + "embackup") === true) {
                    return
                }
                for (i = 0; i < localStorage.length; i++) {
                    t = localStorage.key(i);
                    if (t.search(r) === 0 && t.search(/(marketreminder|notes|settings|statistic)$/i) !== -1) {
                        e.push({
                            key: t,
                            newkey: "backup_" + t,
                            val: localStorage.getItem(t)
                        })
                    }
                }
                for (i = 0; i < e.length; i++) {
                    localStorage.setItem(e[i].newkey, e[i].val);
                    console.log("key " + e[i].key.substr(r.length) + " saved.")
                }
                localStorage.setItem(r + "embackup", true)
            };
            t.backupData = function() {
                return s()
            };
            t.idMigrationDone = function() {
                var e = TWDB.Cache.load("migration") || {};
                e.itemid = e.itemid || {};
                return e.itemid.migcomplete === true
            };
            var o = function() {
                if (!TWDB.Util.isNewIDsystem()) {
                    return
                }
                var t = ["barracks", "bonusdisplay", "bonusjobs", "chathistory", "embackup", "marketreminder", "migration", "msdsettings", "notes", "settings", "statistic"],
                    n = {
                        keys: true
                    },
                    r = [],
                    i, s, o, u, a, f, l = "twdb_" + Character.playerId + "_",
                    c = TWDB.Cache.load("migration") || {};
                c.itemid = c.itemid || {};
                if (c.itemid.migcomplete === true) {
                    return
                }
                var h = function(e) {
                    return JSON.parse(JSON.stringify(e))
                };
                var p = function(e) {
                    return parseInt(e, 10) * 1e3
                };
                for (u = 0; u < localStorage.length; u++) {
                    i = localStorage.key(u);
                    if (i.search(l) === 0) {
                        r.push(i.substr(l.length))
                    }
                }
                for (u = 0; u < r.length; u++) {
                    i = r[u];
                    if (t.indexOf(i) === -1) {
                        localStorage.removeItem(l + i)
                    } else {
                        if (c.itemid[i] === true) {
                            n[i] = true;
                            continue
                        }
                        switch (i) {
                            case "marketreminder":
                                s = TWDB.Cache.load(i) || {};
                                for (a in s) {
                                    if (s[a].item) {
                                        s[a].item = p(s[a].item)
                                    }
                                }
                                TWDB.Cache.save(i, s);
                                c.itemid[i] = true;
                                TWDB.Cache.save("migration", c);
                                break;
                            case "notes":
                                s = TWDB.Cache.load(i) || "";
                                o = s.replace(/\[item=(\d+)\]/gi, function(e, t) {
                                    return "[item=" + p(t) + "]"
                                });
                                if (o !== s) {
                                    TWDB.Cache.save(i, o)
                                }
                                c.itemid[i] = true;
                                TWDB.Cache.save("migration", c);
                                break;
                            case "settings":
                                s = TWDB.Cache.load(i);
                                if (isDefined(s.pinnedItems) && isDefined(s.pinnedItems.length)) {
                                    for (a = 0; a < s.pinnedItems.length; a++) {
                                        s.pinnedItems[a] = p(s.pinnedItems[a])
                                    }
                                    TWDB.Cache.save(i, s)
                                }
                                c.itemid[i] = true;
                                TWDB.Cache.save("migration", c);
                                break;
                            case "statistic":
                                s = TWDB.Cache.load(i);
                                o = {};
                                var d, v, m, g, y, b;
                                for (d in s.chest) {
                                    f = p(d);
                                    o[f] = h(s.chest[d]);
                                    o[f].items = {};
                                    for (v in s.chest[d].items) {
                                        o[f].items[p(v)] = s.chest[d].items[v]
                                    }
                                }
                                s.chest = h(o);
                                for (m in s.job) {
                                    if (!JobList.getJobById(m)) {
                                        continue
                                    }
                                    o = {};
                                    for (g in s.job[m]) {
                                        o[g] = {};
                                        if (g === "products") {
                                            for (y in s.job[m][g]) {
                                                o[g][p(y)] = h(s.job[m][g][y])
                                            }
                                        } else if (e.isNumeric(g)) {
                                            for (b in s.job[m][g]) {
                                                if (b === "items" || b === "extraitems") {
                                                    o[g][b] = {};
                                                    for (v in s.job[m][g][b]) {
                                                        o[g][b][p(v)] = s.job[m][g][b][v]
                                                    }
                                                } else {
                                                    o[g][b] = h(s.job[m][g][b])
                                                }
                                            }
                                            if (!isDefined(o[g].duration) || !e.isNumeric(o[g].duration)) {
                                                o[g].duration = 0
                                            }
                                        } else {
                                            o[g] = h(s.job[m][g])
                                        }
                                    }
                                    s.job[m] = h(o)
                                }
                                TWDB.Cache.save(i, s);
                                c.itemid[i] = true;
                                TWDB.Cache.save("migration", c);
                                break;
                            default:
                                break
                        }
                        n[i] = true
                    }
                }
                TWDB.Cache.save("keys", n);
                c.itemid.migcomplete = true;
                TWDB.Cache.save("migration", c)
            };
            t.idMigrator = function() {
                return o()
            };
            var u = function(e) {
                if (localStorage.getItem("twdb_" + Character.playerId + "_embackup") !== "TRUE") {
                    return
                }
                var t = [],
                    n, r, i = "backup_twdb_" + Character.playerId + "_",
                    s;
                for (s = 0; s < localStorage.length; s++) {
                    n = localStorage.key(s);
                    if (n.search(i) === 0) {
                        t.push(n)
                    }
                }
                if (e === true) {
                    for (s = 0; s < t.length; s++) {
                        localStorage.removeItem(t[s])
                    }
                    localStorage.removeItem("twdb_" + Character.playerId + "_embackup")
                } else {
                    for (s = 0; s < t.length; s++) {
                        localStorage.setItem(t[s].substr(7), localStorage.getItem(t[s]))
                    }
                }
            };
            t.simpleRestore = function(e) {
                return u(e)
            };
            t.wrapBetaGetItem = function() {
                ItemManager.__twdb__get = ItemManager.__twdb__get || ItemManager.get;
                ItemManager.get = function(e) {
                    try {
                        return ItemManager.__twdb__get(e)
                    } catch (t) {
                        console.log(t);
                        TWDB.script.isDev() && console.trace && console.trace();
                        return undefined
                    }
                }
            };
            return t
        }(jQuery);
        TWDB.ClothCalc = {
            uid: "twdb_clothcalc",
            _sk4attr: {
                strength: [5, 6, 7, 8, 9],
                flexibility: [10, 11, 12, 13, 14],
                dexterity: [15, 16, 17, 18, 19],
                charisma: [20, 21, 22, 23, 24]
            },
            _type2id: {
                animal: 1,
                body: 2,
                foot: 3,
                head: 4,
                left_arm: 5,
                neck: 6,
                right_arm: 7,
                yield: 8,
                pants: 9,
                belt: 10
            },
            _id2type: {
                1: "animal",
                2: "body",
                3: "foot",
                4: "head",
                5: "left_arm",
                6: "neck",
                7: "right_arm",
                8: "yield",
                9: "pants",
                10: "belt"
            },
            _skill2id: {
                strength: 1,
                flexibility: 2,
                dexterity: 3,
                charisma: 4,
                build: 5,
                punch: 6,
                tough: 7,
                endurance: 8,
                health: 9,
                ride: 10,
                reflex: 11,
                dodge: 12,
                hide: 13,
                swim: 14,
                aim: 15,
                shot: 16,
                pitfall: 17,
                finger_dexterity: 18,
                repair: 19,
                leadership: 20,
                tactic: 21,
                trade: 22,
                animal: 23,
                appearance: 24
            },
            _id2skill: {
                1: "strength",
                2: "flexibility",
                3: "dexterity",
                4: "charisma",
                5: "build",
                6: "punch",
                7: "tough",
                8: "endurance",
                9: "health",
                10: "ride",
                11: "reflex",
                12: "dodge",
                13: "hide",
                14: "swim",
                15: "aim",
                16: "shot",
                17: "pitfall",
                18: "finger_dexterity",
                19: "repair",
                20: "leadership",
                21: "tactic",
                22: "trade",
                23: "animal",
                24: "appearance"
            },
            _class2id: {
                greenhorn: 1,
                adventurer: 2,
                duelist: 3,
                worker: 4,
                soldier: 5
            },
            data: {
                skills: {},
                items: {},
                jobs: {},
                custom: {}
            },
            calcdata: {
                skills: {},
                items: {},
                jobs: {},
                custom: {},
                animals: [],
                buyTip: {},
                jobBoni: {},
                used: {},
                loaded: false
            },
            ready: false,
            loaded: false,
            up2date: true,
            gui: {
                job: {},
                custom: {}
            },
            bidsLoading: false,
            bids: {},
            getBids: function() {
                if (this.bidsLoading) return;
                this.bidsLoading = true;
                var e = this;
                Ajax.remoteCall("building_market", "fetch_bids", {}, function(t) {
                    if (t.error) return (new UserMessage(t.msg, UserMessage.TYPE_ERROR)).show();
                    var n = t.msg.search_result;
                    for (var r = 0; r < n.length; r++) {
                        e.bids[n[r].item_id] = 1
                    }
                    e.bidsLoading = false
                })
            },
            recLoading: false,
            recipes: {},
            getLearned: function() {
                if (this.recLoading) return;
                this.recLoading = true;
                var e = this;
                Ajax.remoteCall("crafting", "", {}, function(t) {
                    var n = t.recipes_content;
                    if (n)
                        for (var r = 0; r < n.length; r++) e.recipes[n[r].item_id] = 1;
                    e.recLoading = false
                })
            },
            init: function() {
                if (this.ready) {
                    return
                }
                var e = this;
                this.jobs.setParent(this);
                this.joblist.parent = this;
                this.customs.setParent(this);
                this.bag.setParent(this);
                this.getBids();
                this.getLearned();
                TWDB.Eventer.set("TWDBdataLoaded", function() {
                    e.handleTWDBData()
                });
                this.gui.copyright = jQuery('<div style="position:absolute;bottom:0px;left:0px;height:15px;display:block;font-size:10px;color:#000000;">.:powered by tw-db team:. | <a href="https://tw-db.info" style="font-weight:normal;color:#000000;" target="_blank">.:tw-db.info:.</a> | ' + TWDB.script.version / 100 + " rev. " + TWDB.script.revision + "</div>");
                this.gui.cache = jQuery('<div style="position:absolute;top:10px;right:8px;width:20px;height:20px;cursor:pointer;" />');
                this.gui.bag = jQuery('<div style="position:absolute;top:95px;left:1px;width:252px;height:186px;" />');
                this.BagInt = window.setInterval(function() {
                    e.finishInit()
                }, 100);
                this.data.custom = TWDB.Settings.get("custom", {
                    1: {
                        id: 1,
                        type: "speed",
                        para: {},
                        name: "Speed"
                    },
                    2: {
                        id: 2,
                        type: "custom",
                        para: {
                            9: 1
                        },
                        name: "max Health"
                    },
                    3: {
                        id: 3,
                        type: "regen",
                        para: {},
                        name: "Health Regeneration"
                    },
                    4: {
                        id: 4,
                        type: "fort",
                        para: {
                            att: 200,
                            def: 20,
                            health: 100,
                            type: 0
                        },
                        name: "Fortbattle Attacker (Att)"
                    },
                    5: {
                        id: 5,
                        type: "fort",
                        para: {
                            att: 20,
                            def: 200,
                            health: 100,
                            type: 0
                        },
                        name: "Fortbattle Attacker (Def)"
                    },
                    6: {
                        id: 6,
                        type: "fort",
                        para: {
                            att: 200,
                            def: 20,
                            health: 100,
                            type: 1
                        },
                        name: "Fortbattle Defender (Att)"
                    },
                    7: {
                        id: 7,
                        type: "fort",
                        para: {
                            att: 20,
                            def: 200,
                            health: 100,
                            type: 1
                        },
                        name: "Fortbattle Defender (Def)"
                    },
                    8: {
                        id: 8,
                        type: "duel",
                        para: {
                            12: 1,
                            15: 1,
                            16: 1,
                            24: 1
                        },
                        name: "Range Dueler (Att)"
                    },
                    9: {
                        id: 9,
                        type: "duel",
                        para: {
                            12: 1,
                            15: 1,
                            16: 1,
                            21: 1
                        },
                        name: "Range Dueler (Def)"
                    },
                    10: {
                        id: 10,
                        type: "duel",
                        para: {
                            6: 1,
                            7: 1,
                            11: 1,
                            15: 1
                        },
                        name: "Melee Dueler"
                    }
                });
                if (!TWDB.Updater.wasUpdated()) {
                    var t = TWDB.Cache.load("calcdata");
                    if (typeof t === "object" && t !== null && isDefined(t.loaded)) {
                        this.calcdata = t
                    }
                }
            },
            finishInit: function() {
                if (typeof this.BagInt === "undefined") {
                    return
                }
                if (Bag.loaded) {
                    window.clearInterval(this.BagInt);
                    delete this.BagInt;
                    this.loaded = true;
                    this.ready = true;
                    this.addButton();
                    var e = this;
                    HotkeyManager.register(new Hotkey("twdbcc", "", "tw-db ClothCalc", function() {
                        e.open()
                    }));
                    if (isDefined(this.open_param)) {
                        this.open(this.open_param[0], this.open_param[1]);
                        delete this.open_param
                    }
                }
            },
            addButton: function() {
                if (this.ready === false) {
                    return
                }
                var e = this;
                var t = jQuery('<div title="tw-db.info ClothCalc " class="menulink" />').css("background-image", "url(" + TWDB.images.button + ")").css("background-position", "0px -25px").mouseenter(function() {
                    jQuery(this).css("background-position", "-25px -25px")
                }).mouseleave(function() {
                    jQuery(this).css("background-position", "0px -25px")
                }).click(function() {
                    e.open()
                });
                jQuery("#TWDB_ClothCalc_menubuttons .menucontainer_bottom").before(t)
            },
            isBetterItem: function(e) {
                var t = ItemManager.get(e);
                if (isDefined(t) && isDefined(t.set)) {
                    debLog("isBetterItem - ID", e, t, "is seen as new set item");
                    return true
                }
                var n, r, i, s;
                for (n in this.calcdata.jobs) {
                    var o = this.getClothForJob(n);
                    if (!isDefined(o)) {
                        debLog("isBetterItem - job ID", n, "has no Calc data");
                        return true
                    }
                    r = 0;
                    i = TWDB.Calc.getItemBonusForJob(e, n);
                    if (isDefined(o[TWDB.ClothCalc._type2id[t.type]])) {
                        s = ItemManager.get(o[TWDB.ClothCalc._type2id[t.type]].id);
                        if (isDefined(s) && isDefined(s.set)) {
                            continue
                        }
                        r = TWDB.Calc.getItemBonusForJob(s.item_id, n)
                    }
                    if (i > r) {
                        debLog("isBetterItem - ID", e, t, "is seen as better than ID", s.item_id, ItemManager.get(s.item_id), "for job ID", n);
                        return true
                    }
                }
                return false
            },
            checkSkill: function() {
                var e;
                for (e in this.data.skills) {
                    if (typeof this.calcdata.skills[e] === "undefined") {
                        return true
                    }
                    if (this.data.skills[e].val !== this.calcdata.skills[e].val) {
                        return true
                    }
                }
                return false
            },
            checkItems: function() {
                var e;
                for (e in this.data.items) {
                    if (typeof this.calcdata.items[e] === "undefined") {
                        if (this.isBetterItem(this.data.items[e].id)) {
                            debLog("checkItems -", this.data.items[e].id, "causes update");
                            return true
                        }
                    }
                }
                for (e in this.calcdata.items) {
                    if (typeof this.data.items[e] === "undefined") {
                        if (!isDefined(ItemManager.get(e))) {
                            console.log("Item ID=" + e + " seems to be no more defined...")
                        }
                        return true
                    }
                }
                return false
            },
            checkCustom: function() {
                var e, t;
                for (e in this.data.custom) {
                    if (typeof this.calcdata.custom[e] === "undefined") {
                        return true
                    }
                    if (this.calcdata.custom[e].name !== this.data.custom[e].name) {
                        return true
                    }
                    for (t in this.data.custom[e].para) {
                        if (typeof this.calcdata.custom[e].para[t] === "undefined") {
                            return true
                        }
                        if (this.calcdata.custom[e].para[t] !== this.data.custom[e].para[t]) {
                            return true
                        }
                    }
                }
                if (typeof this.calcdata.custom[Number(e) + 1] !== "undefined") {
                    return true
                }
                return false
            },
            checkCache: function() {
                var e = this.checkItems(),
                    t = false,
                    n = this.checkCustom(),
                    r;
                this.gui.cache.children().remove();
                if (e || t || n) {
                    var i = "A informação está desactualizada, clique para actualizar";
                    if (e) {
                        i += " [Inventário]"
                    }
                    if (t) {
                        i += " [Habilidade]"
                    }
                    if (n) {
                        i += " [Personalizado]"
                    }
                    r = jQuery('<div title="' + i + '" style="position:absolute;top:0px;right:0px;width:20px;height:20px;background: url(' + TWDB.images.iconData + ')no-repeat 0px 0px;" />');
                    this.up2date = false
                } else {
                    r = jQuery('<div title="A Informação está actualizada" style="position:absolute;top:0px;right:0px;width:20px;height:20px;background: url(' + TWDB.images.iconData + ')no-repeat -20px 0px;" /></div>');
                    this.up2date = true
                }
                this.gui.cache.append(r);
                r.click(function() {
                    TWDB.DataManager.loadData(true)
                })
            },
            openWear: function() {
                var e, t = wman.getById(Inventory.uid);
                if (TWDB.Settings.get("wear_openmin", false)) {
                    if (!isDefined(wman.getById(Wear.uid))) {
                        Wear.open();
                        wman.minimize(Wear.uid, true)
                    }
                } else {
                    if (!isDefined(wman.getById(Wear.uid))) {
                        Wear.open()
                    } else {
                        wman.reopen(Wear.uid)
                    }
                }
                e = wman.getById(Inventory.uid);
                if (typeof t === "undefined" && typeof e !== "undefined") {
                    e.fireEvent(TWE("WINDOW_CLOSE"), e)
                }
            },
            open: function(e, t) {
                var n = this;
                if (this.ready === false) {
                    if (isDefined(e) && isDefined(t)) {
                        this.open_param = [e, t]
                    }
                    return
                }
                if (wman.getById(this.uid)) {
                    wman.reopen(this.uid);
                    this.openWear();
                    if (isDefined(e) && isDefined(t)) {
                        var r;
                        switch (t) {
                            case "job":
                                r = TWDB.Jobs.getJobById(e);
                                r = isDefined(r) ? r.name : null;
                                break;
                            case "item":
                                r = e;
                                break;
                            case "default":
                                r = null;
                                break
                        }
                        if (r !== null) {
                            n.showTab(e, "Jobs");
                            n.joblist.open(r)
                        }
                    }
                    return
                }
                if (typeof this.eventOpen !== "undefined") {
                    TWDB.Eventer.remove("getGameData", this.eventOpen)
                }
                var i = 0,
                    s;
                for (s in this.calcdata.jobs) {
                    i++;
                    break
                }
                if (i === 0) {
                    this.eventOpen = TWDB.Eventer.set("getGameData", function() {
                        TWDB.DataManager.loadData(true)
                    }, 1);
                    this.up2date = false;
                    this.getGameData()
                } else {
                    this.eventOpen = TWDB.Eventer.set("getGameData", function() {
                        n.finishOpening()
                    }, 1);
                    this.getGameData()
                }
                this.openWear();
                this.jobs.selected = 0;
                this.gui.job.sort = jQuery('<div style="position:absolute;top:10px;left:0px;height:20px;" />').append('<img src="' + TWDB.images.iconName + '" title=" Ordenar por nome " alt=" Ordenar por nome " onclick="javascript:TWDB.ClothCalc.joblist.order(\'name\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />').append('<img src="' + TWDB.images.iconExperience + '" title=" Ordenar por experiência " alt=" Ordenar por experiência " onclick="javascript:TWDB.ClothCalc.joblist.order(\'experience\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />').append('<img src="' + TWDB.images.iconDollar + '" title=" Ordenar por salário " alt=" Ordenar por salário " onclick="javascript:TWDB.ClothCalc.joblist.order(\'wages\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />').append('<img src="' + TWDB.images.iconLuck + '" title=" Ordenar por sorte " alt=" Ordenar por sorte " onclick="javascript:TWDB.ClothCalc.joblist.order(\'luck1\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />').append('<img src="' + TWDB.images.iconLaborpoints + '" title=" Ordenar por pontos de trabalho " alt=" Ordenar por pontos de trabalho " onclick="javascript:TWDB.ClothCalc.joblist.order(\'laborpoints\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />').append('<img src="' + TWDB.images.iconMoti + '" title=" Ordenar por motivação " alt=" Ordenar por motivação " onclick="javascript:TWDB.ClothCalc.joblist.order(\'motivation\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />').append('<img src="' + TWDB.images.iconDanger + '" title=" Ordenar por perigo " alt=" Ordenar por perigo " onclick="javascript:TWDB.ClothCalc.joblist.order(\'danger\')" style="margin:0px 2px 0px 2px;cursor:pointer;" />');
                this.gui.job.title = jQuery('<div style="position:absolute;top:37px;left:0px;width:187px;height:19px;font-weight:bold;text-align:center;white-space: nowrap;">Seleccione o trabalho aqui >></div>');
                this.gui.job.mode = jQuery("<div style=\"position:absolute;top:10px;right:30px;width:20px;height:20px;background:url('" + TWDB.images.jobTime + '\') no-repeat scroll 0 0 transparent;cursor:pointer;display:block;" title=" Tempo do trabalho " />');
                this.gui.job.search = jQuery("<div style=\"position:absolute;top:35px;right:50px;width:20px;height:20px;background:url('" + TWDB.images.iconSearch + '\') no-repeat scroll 0 0 transparent;cursor:pointer;display:none;" title=" Encontra este trabalho no mapa " />');
                this.gui.job.checkbox = new west.gui.Checkbox("", this.joblist.all ? "" : "tw2gui_checkbox_checked", function() {
                    n.joblist.all = !this.isSelected();
                    n.joblist.update()
                });
                this.gui.job.checkbox.setTooltip("Esconder trabalhos que não consegues fazer");
                this.gui.job.checkbox.getMainDiv().css({
                    position: "absolute",
                    top: "35px",
                    right: "30px"
                });
                this.gui.job.button = jQuery('<div style="position:absolute;top:35px;right:4px;width:26px;height:20px;background:url(\'/images/window/character/title_editbtn.jpg\') no-repeat scroll 0 0 transparent;cursor:pointer;" title=" Seleccione o trabalho aqui " />');
                this.gui.job.skills = jQuery('<div style="position:absolute;top:60px;left:1px;width:170px;height:30px;display:block;" />');
                this.gui.job.mainDiv = jQuery('<div style="position:absolute;top:0px;left:0px;height:100%;width:100%;" />');
                this.gui.job.mainDiv.append(this.gui.job.sort);
                this.gui.job.mainDiv.append(this.gui.job.title);
                this.gui.job.mainDiv.append(this.gui.job.mode);
                this.gui.job.mainDiv.append(this.gui.job.search);
                this.gui.job.mainDiv.append(this.gui.job.checkbox.getMainDiv());
                this.gui.job.mainDiv.append(this.gui.job.button);
                this.gui.job.mainDiv.append(this.joblist.getMainDiv());
                this.gui.job.mainDiv.append(this.gui.job.skills);
                this.gui.job.calc = $('<div title=" Recompensas actuais " style="position:absolute;top:60px;width:100px;right:1px;height:30px;display:block;;font-weight:bold;text-align:center;" />');
                this.gui.job.mainDiv.append(this.gui.job.calc);
                this.gui.job.button.click(function() {
                    if (n.joblist.getMainDiv().is(":visible")) {
                        n.joblist.close()
                    } else {
                        n.joblist.open();
                        n.joblist.gui.input.focus()
                    }
                }.bind(this));
                this.gui.job.search.click(function() {
                    n.jobSearch()
                }.bind(this));
                this.gui.job.searchDiv = jQuery("<div />");
                if (n.joblist.getMainDiv().is(":visible")) {
                    n.joblist.close()
                }
                n.joblist.name = null;
                if (isDefined(e) && isDefined(t)) {
                    var r;
                    switch (t) {
                        case "job":
                            r = TWDB.Jobs.getJobById(e);
                            r = isDefined(r) ? r.name : null;
                            break;
                        case "item":
                            r = e;
                            break;
                        case "default":
                            r = null;
                            break
                    }
                    if (r !== null) {
                        n.joblist.name = r
                    }
                }
                this.customs.selected = 0;
                this.gui.custom.title = jQuery('<div style="position:absolute;top:36px;left:0px;width:210px;height:19px;font-weight:bold;text-align:center;">Seleccione o trabalho aqui >></div>');
                this.gui.custom.settings = jQuery('<div title="Definições" style="position:absolute;top:35px;right:30px;width:20px;height:20px;background:url(' + TWDB.images.iconSetting + ');cursor:pointer;" />');
                this.gui.custom.settings.click(function() {
                    n.customs.showConfig()
                });
                this.gui.custom.button = jQuery('<div style="position:absolute;top:35px;right:4px;width:26px;height:20px;background:url(\'/images/window/character/title_editbtn.jpg\') no-repeat scroll 0 0 transparent;cursor:pointer;" title=" Seleccione o trabalho aqui " />');
                this.gui.custom.selectbox = new west.gui.Selectbox;
                this.gui.custom.selectbox.elContent.css("max-height", "660px");
                this.gui.custom.selectbox.setWidth(300).addListener(function(e) {
                    n.customs.switchCustomJob(e)
                });
                this.gui.custom.skills = jQuery('<div style="position:absolute;top:60px;left:1px;width:252px;height:30px;display:block;" />');
                this.gui.custom.mainDiv = jQuery('<div style="position:absolute;top:0px;left:0px;height:100%;width:100%;" />').hide();
                this.gui.custom.mainDiv.append(this.gui.custom.title);
                this.gui.custom.mainDiv.append(this.gui.custom.settings);
                this.gui.custom.mainDiv.append(this.gui.custom.button);
                this.gui.custom.mainDiv.append(this.gui.custom.skills);
                this.gui.custom.mainDiv.append(this.gui.custom.calc);
                this.gui.custom.button.click(function(e) {
                    n.gui.custom.selectbox.show(e)
                });
                this.gui.bag.children().remove();
                var o = function(e, t) {
                    n.showTab(e, t)
                };
                this.gui.window = wman.open(this.uid, null, "noreload").setMiniTitle("TWDB Cloth Calc").setTitle("tw-db.info Cloth Calc").addTab("Trabalho", "Jobs", o).addTab("Personalizado", "Custom", o).appendToContentPane(this.gui.job.mainDiv).appendToContentPane(this.gui.custom.mainDiv).appendToContentPane(this.gui.cache).appendToContentPane(this.gui.bag).appendToContentPane(this.gui.copyright);
                this.gui.window.showLoader();
                var u = $('<div title="Guardar posição" style="width:20px;height:20px;position:absolute;left:0px;top:0px;background:url(\'' + TWDB.images.iconSave + "') no-repeat scroll 0px -20px transparent;cursor:pointer;display:block;\" />").hover(function() {
                    $(this).css("background-position", "0px 0px")
                }, function() {
                    $(this).css("background-position", "0px -20px")
                }).click(function() {
                    TWDB.Settings.set("clothPos", "custom");
                    var e = n.gui.window.saveAppearance();
                    TWDB.Settings.set("clothPosition", {
                        x: e.x,
                        y: e.y
                    });
                    (new UserMessage("Guardado com sucesso", UserMessage.TYPE_SUCCESS)).show()
                });
                $(this.gui.window.divMain).find(".tw2gui_window_buttons").append(u);
                $(this.gui.window.divMain).children(".tw2gui_window_tabbar").css("right", "22px");
                var a = this.gui.window.saveAppearance();
                switch (TWDB.Settings.get("clothPos", "left")) {
                    case "left":
                        a.x = Wear.window.divMain.offsetLeft - 295;
                        break;
                    case "custom":
                        a = TWDB.Settings.get("clothPosition", {
                            x: 0,
                            y: 0
                        });
                        break;
                    case "default":
                        a.x = Wear.window.divMain.offsetLeft + Wear.window.divMain.offsetWidth - 15;
                        break
                }
                if (a.x < -20) {
                    a.x = 0
                } else if (a.x > $("body").width() - 150) {
                    a.x = $("body").width() - 150
                }
                this.gui.window.restoreAppearance({
                    h: 410,
                    w: 310,
                    x: a.x,
                    y: a.y
                });
                return
            },
            finishOpening: function() {
                this.jobs.mode(2);
                this.joblist.init(this);
                this.customs.createSelectbox();
                if (typeof this.gui.window !== "undefined") {
                    this.checkCache();
                    delete this.eventOpen;
                    var e = function(e) {
                        TWDB.ClothCalc.jobs.update()
                    };
                    EventHandler.unlisten("wear_changed", e);
                    EventHandler.listen("wear_changed", e);
                    this.gui.window.hideLoader()
                }
            },
            showTab: function(e, t) {
                this.gui.window.activateTab(t);
                this.gui.window.showLoader();
                this.gui.bag.children().remove();
                switch (t) {
                    case "Jobs":
                        this.gui.custom.mainDiv.hide();
                        if (this.jobs.selected !== 0) {
                            this.jobs.switchJob(this.jobs.selected)
                        }
                        this.gui.job.mainDiv.show();
                        break;
                    case "Custom":
                        this.gui.job.mainDiv.hide();
                        if (this.customs.selected !== 0) {
                            this.customs.switchCustomJob(this.customs.selected)
                        }
                        this.gui.custom.mainDiv.show();
                        break
                }
                this.gui.window.hideLoader()
            },
            getGameData: function(e) {
                var t = this;
                if (typeof e === "undefined") {
                    this.getState = {
                        skill: false,
                        items: false,
                        jobs: false
                    };
                    TWDB.Eventer.set("getSkill", function() {
                        t.getGameData("skill")
                    }, 1);
                    TWDB.Eventer.set("getItems", function() {
                        t.getGameData("items")
                    }, 1);
                    TWDB.Eventer.set("getJobs", function() {
                        t.getGameData("jobs")
                    }, 1);
                    TWDB.DataManager.loadData();
                    this.getSkill();
                    this.getJobs();
                    this.getItems()
                } else {
                    this.getState[e] = true;
                    var n = true,
                        r;
                    for (r in this.getState) {
                        if (!this.getState[r]) {
                            n = false;
                            break
                        }
                    }
                    if (n) {
                        delete this.getState;
                        TWDB.Eventer.trigger("getGameData")
                    }
                }
            },
            getSkill: function(e) {
                if (typeof e === "undefined") {
                    var t = this;
                    setTimeout(function() {
                        t.getSkill(CharacterSkills.skills)
                    }, 10);
                    return
                } else {
                    this.data.skills = {};
                    var n, r;
                    for (n in e) {
                        r = TWDB.ClothCalc._skill2id[n];
                        this.data.skills[r] = {
                            id: r,
                            val: e[n].points
                        }
                    }
                    TWDB.Eventer.trigger("getSkill")
                }
            },
            getItems: function(e) {
                if (typeof e === "undefined") {
                    var t = this;
                    jQuery.post("game.php?window=inventory", {}, function(e) {
                        t.getItems(e)
                    }, "json");
                    return
                } else {
                    this.data.items = {};
                    var n, r;
                    for (n = 0; n < e.wear.length; n++) {
                        r = ItemManager.get(e.wear[n]);
                        if (!this.isItemUsable(r.item_id)) {
                            continue
                        }
                        this.data.items[r.item_id] = {
                            id: r.item_id
                        }
                    }
                    for (n in Bag.items_by_id) {
                        r = Bag.items_by_id[n].obj;
                        if (!this.isItemUsable(r.item_id)) {
                            continue
                        }
                        this.data.items[r.item_id] = {
                            id: r.item_id
                        }
                    }
                    TWDB.Eventer.trigger("getItems")
                }
            },
            getJobs: function(e) {
                if (typeof e === "undefined") {
                    var t = this;
                    jQuery.post("game.php?window=work&mode=index", {}, function(e) {
                        t.getJobs(e)
                    }, "json");
                    return
                } else {
                    this.data.jobs = e;
                    TWDB.Eventer.trigger("getJobs")
                }
            },
            isItemUsable: function(e, t) {
                var n = ItemManager.get(e);
                if (typeof n === "undefined") {
                    return false
                }
                var r = false;
                if (!this.itemHasBonus(n)) {
                    return false
                }
                if (n.characterClass !== null && n.characterClass !== Character.charClass) {
                    return false
                }
                if (n.characterSex !== null && n.characterSex !== Character.charSex) {
                    return false
                }
                if (n.level !== null && n.level > Character.level + Character.itemLevelRequirementDecrease.all + (typeof Character.itemLevelRequirementDecrease[n.type] !== "undefined" ? Character.itemLevelRequirementDecrease[n.type] : 0)) {
                    return isDefined(t) && t
                }
                return true
            },
            itemHasBonus: function(e) {
                if (e.type === "left_arm" || e.type === "right_arm") {
                    return true
                }
                if (typeof e.set !== "undefined" && e.set !== null) {
                    return true
                }
                if (typeof e.speed !== "undefined" && e.speed !== null) {
                    return true
                }
                if (typeof e.bonus === "undefined") {
                    return false
                }
                var t;
                if (typeof e.bonus.skills !== "undefined") {
                    for (t in e.bonus.skills) {
                        if (!jQuery.isFunction(e.bonus.skills[t])) {
                            return true
                        }
                    }
                }
                if (typeof e.bonus.attributes !== "undefined") {
                    for (t in e.bonus.attributes) {
                        if (!jQuery.isFunction(e.bonus.attributes[t])) {
                            return true
                        }
                    }
                }
                if (typeof e.bonus.item !== "undefined") {
                    for (t in e.bonus.item) {
                        if (!jQuery.isFunction(e.bonus.item[t])) {
                            return true
                        }
                    }
                }
                if (typeof e.bonus.fortbattle !== "undefined") {
                    for (t in e.bonus.fortbattle) {
                        if (e.bonus.fortbattle[t] > 0) {
                            return true
                        }
                    }
                }
                if (typeof e.bonus.fortbattlesector !== "undefined") {
                    for (t in e.bonus.fortbattlesector) {
                        if (e.bonus.fortbattle[t] > 0) {
                            return true
                        }
                    }
                }
                return false
            },
            handleTWDBData: function() {
                var e = TWDB.DataManager.getData("twdb");
                var t = this;
                this.calcdata.items = jQuery.extend(true, {}, t.data.items);
                this.calcdata.skills = jQuery.extend(true, {}, t.data.skills);
                this.calcdata.time = e.time;
                this.calcdata.jobs = e.jobs;
                this.calcdata.custom = e.custom;
                this.calcdata.loaded = true;
                this.calcdata.used = {};
                try {
                    this.jobs.init()
                } catch (n) {
                    TWDB.Error.report(n, "GENERICERROR#; handle Jobs")
                }
                try {
                    this.joblist.reset()
                } catch (n) {
                    TWDB.Error.report(n, "GENERICERROR#; handle Jobslist")
                }
                try {
                    this.customs.init()
                } catch (n) {
                    TWDB.Error.report(n, "GENERICERROR#; handle Customs")
                }
                try {
                    this.setUsedItems()
                } catch (n) {
                    TWDB.Error.report(n, "GENERICERROR#; setUsedItems")
                }
                TWDB.Cache.save("calcdata", this.calcdata);
                this.finishOpening()
            },
            jobs: {
                selected: 0,
                base: 1,
                basetime: 1,
                sort: {
                    list: [],
                    type: "name",
                    order: 1
                },
                setParent: function(e) {
                    this.parent = e
                },
                init: function() {
                    var e = [],
                        t = 0,
                        n = 0,
                        r, i, s;
                    while (true) {
                        t++;
                        i = JobList.getJobById(t);
                        if (!i) {
                            n++;
                            if (n > 5) {
                                break
                            }
                            continue
                        }
                        n = 0;
                        e[i.shortname] = i.id
                    }
                    for (r in this.parent.calcdata.jobs) {
                        i = this.parent.calcdata.jobs[r];
                        if (typeof e[i.short_name] === "undefined") {
                            if (i.short_name === "construction") {
                                i.name = "Construção";
                                i.skills = {};
                                i.gameid = 0;
                                i.laborpoints.current = 0;
                                i.duration = 7200 * Number(this.parent.data.jobs.workspeed);
                                i.energy = 24
                            } else {
                                i.name = "!!".job.short_name;
                                i.skills = {};
                                i.gameid = 0;
                                i.laborpoints.current = 0;
                                i.duration = 0;
                                i.energy = 0
                            }
                            continue
                        }
                        s = JobList.getJobById(e[i.short_name]);
                        i.name = s.name;
                        i.skills = s.skills;
                        i.gameid = s.id;
                        i.difficulty = s.malus;
                        i.duration = 0;
                        i.energy = s.energy;
                        i.laborpoints.current = 0
                    }
                },
                update: function() {
                    if (isDefined(this.parent.calcdata.jobs[this.selected])) {
                        var e = this.calcJob(this.selected);
                        var t = e.name.substring(0, 18) + " [" + e.laborpoints.current + "/" + e.laborpoints.sum + "]";
                        this.parent.gui.job.title.html(t);
                        this.parent.jobs.showCur()
                    }
                },
                showCur: function() {
                    if (isDefined(this.selected)) {
                        var e = this.parent.calcdata.jobs[this.selected];
                        if (isDefined(e)) {
                            var t = "";
                            switch (this.parent.joblist.sort.type) {
                                case "luck1":
                                    t += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconLuck + '"/> ';
                                    t += " $" + e.values.cur_luck1 + "-" + "$" + e.values.cur_luck2;
                                    break;
                                case "laborpoints":
                                    t += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconLaborpoints + '"/> ';
                                    t += e.laborpoints.current;
                                    break;
                                case "experience":
                                    t += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconExperience + '"/> ';
                                    t += e.values.cur_experience + "exp";
                                    break;
                                case "wages":
                                    t += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconDollar + '"/> ';
                                    t += " $" + e.values.cur_wages;
                                    break;
                                case "danger":
                                    t += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconDanger + '"/> ';
                                    t += e.values.cur_danger + "%";
                                    break;
                                case "motivation":
                                    t += '<img style="vertical-align: bottom;" src="' + TWDB.images.iconMoti + '"/> ';
                                    t += e.values.resmotivation * 100 + " (" + Math.round(e.values.motivation * 100) + ")%";
                                    break
                            }
                            this.parent.gui.job.calc.html(t)
                        }
                    }
                },
                switchJob: function(e) {
                    if (typeof this.parent.calcdata.jobs[e] === "undefined" || typeof this.parent.calcdata.jobs[e].cloth === "undefined") {
                        return
                    }
                    var t = this.parent,
                        n = t.calcdata.jobs[e];
                    if (n.gameid !== 0) {
                        TWDB.Map.setMinimapJob(n.name);
                        t.gui.job.search.show()
                    } else {
                        t.gui.job.search.hide()
                    }
                    this.selected = e;
                    var r = n.name.substring(0, 18) + " [" + n.laborpoints.current + "/" + n.laborpoints.sum + "]";
                    t.gui.job.title.html(r);
                    t.bag.showItems(n.cloth, "jobs");
                    t.gui.job.skills.children().remove();
                    var i, s, o;
                    for (i in n.skills) {
                        for (s = 0; s < n.skills[i]; s++) {
                            o = jQuery('<div style="float:left;width;30px;height:30px;" />');
                            t.gui.job.skills.append(o.append(t.getSkillImg(i, 30)))
                        }
                    }
                    this.showCur()
                },
                mode: function(e) {
                    var t = this,
                        n = 2,
                        r = t.parent.data.jobs.jobs,
                        i;
                    for (i in t.parent.data.jobs.jobs) {
                        n = Math.min(r[i].durations.length - 1, n)
                    }
                    if (n < e) {
                        return t.mode(0)
                    }
                    t.parent.gui.job.mode.off("click");
                    switch (e) {
                        case 1:
                            t.base = 1;
                            t.basetime = 600;
                            t.parent.gui.job.mode.css("background-position", "-20px 0px").click(function() {
                                t.mode(2);
                                t.parent.joblist.update()
                            });
                            break;
                        case 2:
                            t.base = 2;
                            t.basetime = 3600;
                            t.parent.gui.job.mode.css("background-position", "-40px 0px").click(function() {
                                t.mode(0);
                                t.parent.joblist.update()
                            });
                            break;
                        default:
                            t.base = 0;
                            t.basetime = 15;
                            t.parent.gui.job.mode.css("background-position", "0px 0px").click(function() {
                                t.mode(1);
                                t.parent.joblist.update()
                            });
                            break
                    }
                },
                _calcStepFormula: function(e, t, n, r, i, s, o, u, a) {
                    var f = Math.ceil((i + 1) / 5),
                        l = Math.min(Math.floor(r / f), 15),
                        c = Math.ceil(o / 25) * .25;
                    return r < 5 * f || r <= i ? Math[e]({
                        0: 1,
                        1: 2,
                        2: 3,
                        3: 4,
                        4: 5,
                        5: 6.25
                    }[a ? 0 : l] * s * c * u) : Math[t](n(r - i, l) * s * c * u)
                },
                calcWage: function(e, t, n, r, i) {
                    return this._calcStepFormula("ceil", "round", function(e) {
                        return 6.25 * Math.pow(e, .05)
                    }, e, t, n, r, i)
                },
                calcExp: function(e, t, n, r, i) {
                    return this._calcStepFormula("ceil", "ceil", function(e) {
                        return 6.25
                    }, e, t, n, r, i)
                },
                calcLuck: function(e, t, n, r, i) {
                    return this._calcStepFormula("floor", "floor", function(e) {
                        return 6.25 * Math.pow(e, .2)
                    }, e, t, (.9 * n + 5) / 1.25, 100, i)
                },
                calcProductRate: function(e, t, n, r, i) {
                    return this._calcStepFormula("round", "round", function(e, t) {
                        return t < 15 ? 6.25 : 9.375
                    }, e, t, n, 100, i)
                },
                calcDanger: function(e, t, n, r, i) {
                    return this._calcStepFormula("floor", "floor", function(e) {
                        return Math.pow(e, -.2)
                    }, e, t, n, 100, i, true)
                },
                addPremium: function(e) {
                    var t = Number(Premium.hasBonus("character")),
                        n = Number(Premium.hasBonus("money")),
                        r = 1,
                        i = 1,
                        s = 1;
                    if (n) {
                        r *= 1.5
                    }
                    if (Character.charClass === "worker") {
                        i = t ? 1.1 : 1.05
                    }
                    if (Character.charClass === "adventurer") {
                        s = t ? .8 : .9
                    }
                    e.values.cur_wages = Math.round(e.values.cur_wages * r);
                    e.values.cur_experience = Math.round(e.values.cur_experience * i);
                    e.values.cur_luck2 = Math.floor(e.values.cur_luck2 * r);
                    e.values.cur_danger = Math.round(e.values.cur_danger * s);
                    e.values.wages = Math.round(e.values.wages * r);
                    e.values.experience = Math.round(e.values.experience * i);
                    e.values.luck2 = Math.floor(e.values.luck2 * r);
                    e.values.danger = Math.round(e.values.danger * s);
                    return e
                },
                calcJob: function(e) {
                    var t = this.parent.calcdata.jobs[e],
                        n = t.difficulty,
                        r = JobList.getJobById(t.gameid),
                        i;
                    t.values = {};
                    t.sp = 0;
                    t.max_sp = 0;
                    t.laborpoints.skills = 0;
                    for (i in t.skills) {
                        t.laborpoints.skills += Number(t.skills[i]) * Number(CharacterSkills.skills[i].points)
                    }
                    t.laborpoints.sum = t.laborpoints.cloth;
                    t.laborpoints.sum += t.laborpoints.skills;
                    t.laborpoints.sum -= t.difficulty + 1;
                    if (isDefined(r)) {
                        t.laborpoints.current = r.calcJobPoints() - (r.malus + 1);
                        t.sp = r.calcJobPoints();
                        t.max_sp = t.laborpoints.skills + t.laborpoints.cloth
                    } else {
                        t.laborpoints.current = 0
                    }
                    if (t.gameid !== 0) {
                        t.values.motivation = this.parent.data.jobs.jobs[t.gameid].motivation;
                        t.values.resmotivation = Math.ceil(this.parent.data.jobs.jobs[t.gameid].motivation * 4) / 4
                    } else {
                        t.values.motivation = 0;
                        t.values.resmotivation = 0
                    }
                    t.values.name = t.name;
                    t.values.laborpoints = Number(t.laborpoints.sum);
                    t.values.duration = Number(this.basetime);
                    var s = 1;
                    switch (this.base) {
                        case 0:
                            s = .1;
                            break;
                        case 1:
                            s = .47;
                            break;
                        default:
                            break
                    }
                    var o = t.values.motivation * 100;
                    t.values.cur_wages = this.calcWage(t.sp, n, t.wages, o, s);
                    t.values.cur_experience = this.calcExp(t.sp, n, t.experience, o, s);
                    t.values.cur_luck1 = this.calcLuck(t.sp, n, t.luck, o, 1);
                    t.values.cur_luck2 = this.calcLuck(t.sp, n, t.luck, o, 3);
                    t.values.cur_danger = this.calcDanger(t.sp, n, t.danger, o, 1);
                    t.values.wages = this.calcWage(t.max_sp, n, t.wages, t.values.resmotivation * 100, s);
                    t.values.experience = this.calcExp(t.max_sp, n, t.experience, t.values.resmotivation * 100, s);
                    t.values.luck1 = this.calcLuck(t.max_sp, n, t.luck, t.values.resmotivation * 100, 1);
                    t.values.luck2 = this.calcLuck(t.max_sp, n, t.luck, t.values.resmotivation * 100, 3);
                    t.values.danger = this.calcDanger(t.max_sp, n, t.danger, t.values.resmotivation * 100, 1);
                    return this.addPremium(t)
                },
                getJobPopup: function(e) {
                    var t = this.parent.calcdata.jobs[e].values,
                        n;
                    t.laborpoints = this.parent.calcdata.jobs[e].laborpoints.sum;
                    n = "<table>" + '<tr><td colspan="4" style="font-weight:bold;text-align:center;font-size:11px;">' + this.parent.calcdata.jobs[e].name + "</td></tr>" + '<tr><td><img src="' + TWDB.images.iconExperience + '" title=" Experiência " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.experience + "</td>" + '<td><img src="' + TWDB.images.iconDollar + '" title=" Salário " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.wages + "</td></tr>" + '<tr><td><img src="' + TWDB.images.iconLuck + '" title=" Sorte " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.luck1 + "-" + t.luck2 + "</td>" + '<td><img src="' + TWDB.images.iconDanger + '" title=" Perigo " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.danger + "</td></tr>" + '<tr><td><img src="' + TWDB.images.iconLaborpoints + '" title=" ?laborpoints " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.laborpoints + "</td>" + '<td><img src="' + TWDB.images.iconClock + '" title=" Duração " height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.duration + "</td></tr>" + '<tr><td><img src="' + TWDB.images.iconMoti + '" title=" Motivação "  height="15px" width="15px" /></td><td style="font-size:10px;vertical-align:bottom;">' + t.resmotivation * 100 + " (" + Math.round(t.motivation * 100) + ")%</td><td></td><td></td></tr>" + "</table>";
                    return n
                }
            },
            joblist: {
                ready: false,
                gui: {},
                elements: [],
                focused: 0,
                sort: {
                    type: "name",
                    order: 1
                },
                all: false,
                name: null,
                reset: function() {
                    this.ready = false;
                    delete this.elements;
                    this.elements = [];
                    this.getMainDiv().children().remove();
                    this.getMainDiv().append('<style type="text/css">.TWDB_hide{display:none;}.TWDB_filter{display:none;}</style>');
                    this.init(this.parent)
                },
                init: function(e) {
                    if (this.ready) {
                        return
                    }
                    this.ready = true;
                    this.parent = e;
                    if (!this.gui.main) {
                        this.gui.main = this.getMainDiv()
                    }
                    this.gui.result = $('<div class="tw2gui_jobsearchbar_allresults" style="width:285px;" />');
                    this.gui.input = (new west.gui.Textfield).maxlength(32).setClass4Input("tw2gui_jobsearch_string").setWidth(265);
                    this.gui.button = $('<div class="tw2gui_jobsearch_showall" style="display:block;cursor:pointer;"></div>');
                    this.gui.scrollpane = new west.gui.Scrollpane;
                    $(this.gui.scrollpane.getMainDiv()).css({
                        width: "285px",
                        height: "250px"
                    });
                    var t, n, r, i;
                    for (t in e.calcdata.jobs) {
                        n = e.calcdata.jobs[t];
                        r = $("<p>" + n.name + "</p>");
                        i = {};
                        i.dom = r;
                        i.id = t;
                        i.str = "Â§" + n.name.toUpperCase() + "Â§";
                        if (n.gameid !== 0) {
                            var s = JobList.getJobById(n.gameid),
                                o;
                            for (o in s.yields) {
                                if (isNaN(o)) {
                                    continue
                                }
                                i.str += ItemManager.get(o).name.toUpperCase() + "Â§"
                            }
                        }
                        this.elements.push(i)
                    }
                    this.gui.main.append($('<div style="position:relative;top:0;left:0;width:305px" />').append(this.gui.input.getMainDiv()).append(this.gui.button)).append(this.gui.result);
                    this.update();
                    if (this.name) {
                        this.open(this.name)
                    }
                },
                open: function(e) {
                    var t = this;
                    this.gui.result.show();
                    $(this.gui.input.getMainDiv()).off().on("keyup", function(e) {
                        t.keyHandler(e)
                    });
                    $(this.gui.input.getField()).off().on("focus", function() {
                        t.gui.result.show()
                    });
                    delete this.gui.scrollpane;
                    this.gui.scrollpane = new west.gui.Scrollpane;
                    $(this.gui.scrollpane.getMainDiv()).css({
                        width: "285px",
                        height: "250px"
                    });
                    var n = true;
                    $.each(this.elements, function(e, r) {
                        r.dom.off();
                        t.updateJob(e);
                        if (n && r.dom.is(":visible")) {
                            this.focused = e;
                            r.dom.addClass("focused");
                            n = false
                        } else {
                            r.dom.removeClass("focused")
                        }
                        r.dom.addMousePopup(TWDB.ClothCalc.jobs.getJobPopup(r.id));
                        r.dom.click(function(e) {
                            return function() {
                                t.close();
                                TWDB.ClothCalc.jobs.switchJob(e)
                            }
                        }(r.id));
                        t.gui.scrollpane.appendContent(r.dom)
                    });
                    this.gui.result.children().remove();
                    this.gui.result.append(this.gui.scrollpane.getMainDiv());
                    this.gui.button.click(function() {
                        if (t.gui.result.is(":visible")) {
                            t.gui.result.hide()
                        } else {
                            t.gui.input.focus()
                        }
                    });
                    this.gui.main.show();
                    if (isDefined(e)) {
                        $(this.gui.input.getField()).attr("value", e);
                        this.search(e, true)
                    }
                },
                search: function(e, t) {
                    var n = new RegExp(isDefined(t) ? "Â§" + e.toUpperCase() + "Â§" : e.toUpperCase(), "i");
                    var r = true;
                    var i = this;
                    var s = [];
                    $.each(this.elements, function(e, t) {
                        t.dom.removeClass("focused");
                        if (n.test(t.str)) {
                            t.dom.removeClass("TWDB_filter");
                            if (t.dom.is(":visible")) {
                                s.push(t.dom);
                                if (r) {
                                    i.focused = e;
                                    t.dom.addClass("focused");
                                    r = false
                                }
                            }
                        } else {
                            t.dom.addClass("TWDB_filter")
                        }
                    });
                    if (s.length === 1) {
                        s[0].click()
                    }
                },
                keyHandler: function(e) {
                    var t = e.keyCode || e.which,
                        n;
                    if (t === 38 || t === 40) {
                        if (t === 38) {
                            this.elements[this.focused].dom.removeClass("focused");
                            for (n = 0; n < this.elements.length; n++) {
                                this.focused--;
                                if (this.focused < 0) {
                                    this.focused = this.elements.length - 1
                                }
                                if (this.elements[this.focused].dom.is(":visible")) {
                                    this.elements[this.focused].dom.addClass("focused");
                                    break
                                }
                            }
                        } else {
                            this.elements[this.focused].dom.removeClass("focused");
                            for (n = 0; n < this.elements.length; n++) {
                                this.focused++;
                                if (this.focused >= this.elements.length) {
                                    this.focused = 0
                                }
                                if (this.elements[this.focused].dom.is(":visible")) {
                                    this.elements[this.focused].dom.addClass("focused");
                                    break
                                }
                            }
                        }
                        var r = this.elements[this.focused].dom.offset().top,
                            i = jQuery(this.gui.scrollpane.clipPane).offset().top,
                            s;
                        if (r - i > 180 || i - r > 0) {
                            s = (r - i - 90) / 16;
                            this.gui.scrollpane.scrollTo(0, s)
                        }
                    } else if (t === 13) {
                        this.elements[this.focused].dom.click()
                    } else {
                        this.search(this.gui.input.getValue())
                    }
                },
                order: function(e) {
                    function t(t, n) {
                        var r = TWDB.ClothCalc.calcdata.jobs[t.id].values[e];
                        var s = TWDB.ClothCalc.calcdata.jobs[n.id].values[e];
                        return r > s ? i : -i
                    }

                    function n(t, n) {
                        var r = TWDB.ClothCalc.calcdata.jobs[t.id].values[e];
                        var s = TWDB.ClothCalc.calcdata.jobs[n.id].values[e];
                        return r * 1 > s * 1 ? i : -i
                    }
                    var r = true;
                    if (e) {
                        if (e === this.sort.type) {
                            this.sort.order *= -1
                        } else {
                            r = false;
                            if (e === "danger" || e === "name") {
                                this.sort.order = 1
                            } else {
                                this.sort.order = -1
                            }
                            this.sort.type = e
                        }
                    }
                    var i = this.sort.order,
                        e = this.sort.type,
                        s = this,
                        o = true;
                    if (e === "name") {
                        this.elements.sort(t)
                    } else {
                        this.elements.sort(n)
                    }
                    jQuery.each(this.elements, function(e, t) {
                        if (!r) {
                            s.updateJob(e)
                        }
                        if (o && t.dom.is(":visible")) {
                            this.focused = e;
                            t.dom.addClass("focused");
                            o = false
                        } else {
                            t.dom.removeClass("focused")
                        }
                        s.gui.scrollpane.appendContent(t.dom)
                    });
                    this.parent.jobs.showCur()
                },
                updateJob: function(e) {
                    var t = this.elements[e],
                        n = TWDB.ClothCalc.jobs.calcJob(t.id),
                        r = n.name;
                    t.dom.removeClass("TWDB_hide");
                    r += " [" + n.laborpoints.current + "/" + n.laborpoints.sum + "] ";
                    switch (this.sort.type) {
                        case "luck1":
                            r += " $" + n.values.luck1 + "-" + "$" + n.values.luck2;
                            break;
                        case "laborpoints":
                            break;
                        case "experience":
                            r += n.values.experience + "exp";
                            break;
                        case "wages":
                            r += "$" + n.values.wages;
                            break;
                        case "danger":
                            r += n.values.danger + "%";
                            break;
                        case "duration":
                            r += n.values.duration + " sec";
                            break;
                        case "motivation":
                            r += n.values.resmotivation * 100 + " (" + Math.round(n.values.motivation * 100) + ")%";
                            break
                    }
                    t.dom.html(r);
                    if (n.laborpoints.current < 0) {
                        if (n.laborpoints.sum < 0) {
                            if (JobList.getJobById(t.id).level <= Character.level) {
                                t.dom.css("color", "blue")
                            } else {
                                t.dom.css("color", "red");
                                if (!this.all) {
                                    t.dom.addClass("TWDB_hide")
                                }
                            }
                        } else {
                            t.dom.css("color", "orange")
                        }
                    } else {
                        t.dom.css("color", "#333")
                    }
                    return n
                },
                update: function() {
                    var e = this;
                    jQuery.each(this.elements, function(t) {
                        e.updateJob(t)
                    });
                    this.order()
                },
                getMainDiv: function() {
                    if (!this.gui.main) {
                        this.gui.main = jQuery('<div style="position:absolute;left: 255px; top: 30px; display: none;" />').append('<style type="text/css">.TWDB_hide{display:none;}.TWDB_filter{display:none;}</style>')
                    }
                    return this.gui.main
                },
                close: function() {
                    this.gui.main.hide()
                }
            },
            customs: {
                selected: 0,
                setParent: function(e) {
                    this.parent = e
                },
                init: function() {
                    var e, t;
                    for (e in this.parent.calcdata.custom) {
                        try {
                            t = this.parent.calcdata.custom[e];
                            switch (t.type) {
                                case "speed":
                                    t.skills = ["ride"];
                                    if (!t.laborpoints) {
                                        var n = t.cloth && t.cloth[1] && t.cloth[1].other && t.cloth[1].other[1] || 0,
                                            r = t.boni && t.boni.other && t.boni.other[1] || 0;
                                        r -= n;
                                        n += t.boni && t.boni.skill && t.boni.skill[2] || 0;
                                        n += t.boni && t.boni.skill && t.boni.skill[10] || 0;
                                        n += CharacterSkills.skills.ride.points;
                                        t.laborpoints = Math.round((100 + n) * (1 + r / 100))
                                    }
                                    t.laborpoints += "%";
                                    break;
                                case "regen":
                                    t.skills = ["health"];
                                    t.laborpoints = "";
                                    break;
                                case "fort":
                                    var i, s = {},
                                        o = Character.charClass === "soldier" ? Premium.hasBonus("character") ? 1.5 : 1.25 : 1,
                                        u = Character.charClass == "worker" ? Premium.hasBonus("character") ? 1.4 : 1.2 : 1,
                                        a = (Number(t.boni.other[11]) || 0) + (Number(t.boni.other[17]) || 0),
                                        f = (Number(t.boni.other[12]) || 0) + (Number(t.boni.other[18]) || 0);
                                    if (t.para.type === 0) {
                                        s.aim = CharacterSkills.skills.aim.points + (typeof t.boni.skill[3] !== "undefined" ? t.boni.skill[3] : 0) + (typeof t.boni.skill[15] !== "undefined" ? t.boni.skill[15] : 0);
                                        s.hide = CharacterSkills.skills.hide.points + (typeof t.boni.skill[2] !== "undefined" ? t.boni.skill[2] : 0) + (typeof t.boni.skill[13] !== "undefined" ? t.boni.skill[13] : 0);
                                        s.dodge = CharacterSkills.skills.dodge.points + (typeof t.boni.skill[2] !== "undefined" ? t.boni.skill[2] : 0) + (typeof t.boni.skill[12] !== "undefined" ? t.boni.skill[12] : 0);
                                        s.leadership = CharacterSkills.skills.leadership.points + (typeof t.boni.skill[4] !== "undefined" ? t.boni.skill[4] : 0) + (typeof t.boni.skill[20] !== "undefined" ? t.boni.skill[20] : 0);
                                        s.health = CharacterSkills.skills.health.points + (typeof t.boni.skill[1] !== "undefined" ? t.boni.skill[1] : 0) + (typeof t.boni.skill[9] !== "undefined" ? t.boni.skill[9] : 0);
                                        i = 100 + (Character.level - 1) * Character.lifePointPerHealthSkill + s.health * (Character.lifePointPerHealthSkill + Character.lifePointPerHealthSkillBonus) + " | ";
                                        i += Number((25 + Math.pow(s.leadership * o, .5) + Math.pow(s.aim, .5) + Math.pow(s.hide, .6) + a) * u).round(2) + " | ";
                                        i += Number((10 + Math.pow(s.leadership * o, .5) + Math.pow(s.dodge, .5) + Math.pow(s.hide, .6) + f) * u).round(2)
                                    } else {
                                        s.aim = CharacterSkills.skills.aim.points + (typeof t.boni.skill[3] !== "undefined" ? t.boni.skill[3] : 0) + (typeof t.boni.skill[15] !== "undefined" ? t.boni.skill[15] : 0);
                                        s.pitfall = CharacterSkills.skills.pitfall.points + (typeof t.boni.skill[3] !== "undefined" ? t.boni.skill[3] : 0) + (typeof t.boni.skill[17] !== "undefined" ? t.boni.skill[17] : 0);
                                        s.dodge = CharacterSkills.skills.dodge.points + (typeof t.boni.skill[2] !== "undefined" ? t.boni.skill[2] : 0) + (typeof t.boni.skill[12] !== "undefined" ? t.boni.skill[12] : 0);
                                        s.leadership = CharacterSkills.skills.leadership.points + (typeof t.boni.skill[4] !== "undefined" ? t.boni.skill[4] : 0) + (typeof t.boni.skill[20] !== "undefined" ? t.boni.skill[20] : 0);
                                        s.health = CharacterSkills.skills.health.points + (typeof t.boni.skill[1] !== "undefined" ? t.boni.skill[1] : 0) + (typeof t.boni.skill[9] !== "undefined" ? t.boni.skill[9] : 0);
                                        i = 100 + (Character.level - 1) * Character.lifePointPerHealthSkill + s.health * (Character.lifePointPerHealthSkill + Character.lifePointPerHealthSkillBonus) + " | ";
                                        i += Number((25 + Math.pow(s.leadership * o, .5) + Math.pow(s.aim, .5) + Math.pow(s.pitfall, .6) + a) * u).round(2) + " | ";
                                        i += Number((10 + Math.pow(s.leadership * o, .5) + Math.pow(s.dodge, .5) + Math.pow(s.pitfall, .6) + f) * u).round(2)
                                    }
                                    t.skills = ["health", "attacker", "defender"];
                                    t.laborpoints = i;
                                    break;
                                case "duel":
                                    t.skills = [];
                                    var i = 0,
                                        l, c;
                                    for (l in t.para) {
                                        c = Math.floor(l / 5);
                                        if (typeof t.boni.skill[l] !== "undefined") {
                                            i += t.boni.skill[l]
                                        }
                                        if (typeof t.boni.skill[c] !== "undefined") {
                                            i += t.boni.skill[c]
                                        }
                                        if (typeof TWDB.ClothCalc._id2skill[l] !== "undefined") {
                                            t.skills.push(TWDB.ClothCalc._id2skill[l]);
                                            if (typeof CharacterSkills.skills[TWDB.ClothCalc._id2skill[l]] !== "undefined") {
                                                i += CharacterSkills.skills[TWDB.ClothCalc._id2skill[l]].points
                                            } else if (typeof CharacterSkills.attributes[TWDB.ClothCalc._id2skill[l]] !== "undefined") {
                                                i += CharacterSkills.attributes[TWDB.ClothCalc._id2skill[l]].points
                                            }
                                        }
                                    }
                                    t.laborpoints = i;
                                    break;
                                case "custom":
                                    t.skills = [];
                                    var i = 0,
                                        l, c;
                                    for (l in t.para) {
                                        c = Math.floor(l / 5);
                                        if (typeof t.boni.skill[l] !== "undefined") {
                                            i += t.boni.skill[l]
                                        }
                                        if (typeof t.boni.skill[c] !== "undefined") {
                                            i += t.boni.skill[c]
                                        }
                                        if (typeof TWDB.ClothCalc._id2skill[l] !== "undefined") {
                                            t.skills.push(TWDB.ClothCalc._id2skill[l]);
                                            if (typeof CharacterSkills.skills[TWDB.ClothCalc._id2skill[l]] !== "undefined") {
                                                i += CharacterSkills.skills[TWDB.ClothCalc._id2skill[l]].points
                                            } else if (typeof CharacterSkills.attributes[TWDB.ClothCalc._id2skill[l]] !== "undefined") {
                                                i += CharacterSkills.attributes[TWDB.ClothCalc._id2skill[l]].points
                                            }
                                        }
                                    }
                                    t.laborpoints = i;
                                    break;
                                default:
                                    break
                            }
                        } catch (h) {
                            TWDB.Error.report(h, "GENERICERROR#; handle Customs")
                        }
                    }
                },
                calc: function() {
                    var e = this.parent.calcdata.custom[this.selected];
                    return isDefined(e) && e.type === "fort" ? "0|0|0" : ""
                },
                createSelectbox: function() {
                    if (!this.parent.gui.custom.selectbox) {
                        return
                    }
                    var e, t;
                    this.parent.gui.custom.selectbox.elContent.empty();
                    this.parent.gui.custom.selectbox.value = null;
                    this.parent.gui.custom.selectbox.items = [];
                    for (e in this.parent.calcdata.custom) {
                        t = this.parent.calcdata.custom[e].name + " [" + this.parent.calcdata.custom[e].laborpoints + "]";
                        this.parent.gui.custom.selectbox.addItem(e, t)
                    }
                    this.switchCustomJob(this.selected)
                },
                switchCustomJob: function(e) {
                    if (isDefined(this.parent.calcdata.custom[e]) && isDefined(this.parent.calcdata.custom[e].cloth)) {
                        this.parent.customs.selected = e;
                        var t = " [" + this.parent.calcdata.custom[e].laborpoints + "]";
                        t = this.parent.calcdata.custom[e].name.substring(0, 35 - t.length) + t;
                        this.parent.gui.custom.title.html(t);
                        this.parent.bag.showItems(this.parent.calcdata.custom[e].cloth, "custom");
                        this.showSkill()
                    }
                },
                showSkill: function() {
                    this.parent.gui.custom.skills.children().remove();
                    if (!isDefined(this.parent.calcdata.custom[this.parent.customs.selected])) {
                        return
                    }
                    if (this.parent.calcdata.custom[this.parent.customs.selected].type == "fort") {
                        return
                    }
                    var e = this.calc();
                    var t = String(e).split("|");
                    for (var n = 0; n < this.parent.calcdata.custom[this.selected].skills.length; n++) {
                        var r = jQuery('<div style="float:left;width:30px;height:30px;" />');
                        r.append(this.parent.getSkillImg(this.parent.calcdata.custom[this.selected].skills[n], 30));
                        this.parent.gui.custom.skills.append(r);
                        if (this.parent.calcdata.custom[this.parent.customs.selected].type == "fort" && typeof t[n] !== "undefined") {
                            var i = jQuery('<div style="float:left;height:25px;padding:5px 10px 0px 5px ;font-weight:bold;">' + t[n] + "</div>");
                            this.parent.gui.custom.skills.append(i)
                        }
                    }
                    if (this.parent.calcdata.custom[this.parent.customs.selected].type !== "fort") {
                        var i = jQuery('<div style="float:left;height:25px;padding:5px 0px 0px 5px ;font-weight:bold;">' + e + "</div>");
                        this.parent.gui.custom.skills.append(i)
                    }
                },
                showConfig: function() {
                    var e = this;
                    var t = jQuery('<div title="Editar" style="display:inline-block;vertical-align:top;height:16px;width:16px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/window/messages/head-icons.png') repeat scroll 0 16px transparent;\" />");
                    var n = jQuery('<div title="Apagar" style="display:inline-block;vertical-align:top;height:16px;width:16px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/icons/delete.png') repeat scroll 0px 0px transparent;\" />");
                    var r = jQuery('<div title="Adicionar" style="display:block;margin-top:2px;vertical-align:top;height:20px;width:25px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/window/messages/icons.png') repeat scroll 72px -5px transparent;\" />");
                    var i = jQuery("<div />");
                    for (var s in this.parent.data.custom) {
                        var o = this.parent.data.custom[s];
                        var u = jQuery('<div style="display:inline-block;vertical-align:top;height:16px;width:300px;overflow:hidden;" />').html(o.name);
                        var a = t.clone(false);
                        var f = n.clone(false);
                        var l = jQuery('<div style="display:block;height:18px;padding: 3px 0px 0px 0px;border-bottom: 1px solid #666" />').append(u).append(a).append(f);
                        i.append(l);
                        var c = function(t) {
                            return function() {
                                e.editConfig(t)
                            }
                        }(s);
                        a.click(c);
                        var c = function(t) {
                            return function() {
                                e.deleteConfig(t)
                            }
                        }(s);
                        f.click(c)
                    }
                    var h = 0;
                    for (var s in this.parent.data.custom) {
                        h++
                    }
                    if (h < 15) {
                        i.append(r);
                        r.click(function() {
                            e.addConfig()
                        })
                    }
                    this.parent.gui.custom.config = new west.gui.Dialog("Personalizado", i);
                    this.parent.gui.custom.config.addButton("ok", function() {
                        e.parent.checkCache()
                    });
                    this.parent.gui.custom.config.show()
                },
                addConfig: function() {
                    var e = 0;
                    for (var t in this.parent.data.custom) {
                        e++
                    }
                    if (e >= 15) {
                        (new UserMessage("Demasiadas entradas, apenas dez são permitidas", UserMessage.TYPE_ERROR)).show()
                    } else {
                        e++;
                        this.editConfig(e)
                    }
                },
                htmlUnEscape: function(e) {
                    return String(e).replace(/&amp;/g, "&").replace(/&quot/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                },
                htmlEscape: function(e) {
                    return String(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                },
                editConfig: function(e, t) {
                    if (typeof t == "undefined") {
                        var n = this;
                        var r = "";
                        var i = "";
                        var s = "Adicionar - ";
                        if (typeof this.parent.data.custom[e] !== "undefined") {
                            s = "Editar - ";
                            var r = this.parent.data.custom[e].name;
                            var i = JSON.stringify({
                                type: this.parent.data.custom[e].type,
                                para: this.parent.data.custom[e].para
                            })
                        }
                        this.tmp = {
                            name: r,
                            code: i
                        };
                        this.parent.gui.custom.name = (new west.gui.Textfield("twdb_cc_custom_name")).setSize(30).setValue(this.htmlUnEscape(r));
                        this.parent.gui.custom.code = (new west.gui.Textfield("twdb_cc_custom_code")).setSize(30).setValue(i);
                        var o = jQuery('<table width="400px" />');
                        o.append(jQuery("<tr />").append('<td style="vertical-align:middle">Nome:</td>').append(jQuery("<td />").append(this.parent.gui.custom.name.getMainDiv())));
                        o.append(jQuery("<tr />").append('<td style="vertical-align:middle">Código:</td>').append(jQuery("<td />").append(this.parent.gui.custom.code.getMainDiv())));
                        o.append('<tr><td colspan="2">Para obter um código basta ir á calculadora do site, em personalizado, aplicar a configuração desejada, calcular e copiar o código para colar aqui. <a href="https://tw-db.info/?strana=calc" target="_blank">tw-db.info Calculadora</a></td></tr>');
                        var o = new west.gui.Dialog(s + "Personalizado", o);
                        o.addButton("ok", function() {
                            return n.editConfig(e, true)
                        });
                        o.addButton("cancel");
                        o.show()
                    } else {
                        var u = function(e) {
                            (new UserMessage("os dados que introduzis-te estão incorrectos.: " + e, UserMessage.TYPE_ERROR)).show();
                            return false
                        };
                        if (this.parent.gui.custom.name.getValue() == "") {
                            return u("vazio Nome")
                        }
                        if (this.parent.gui.custom.code.getValue() == "") {
                            return u("vazio Código [1]")
                        }
                        if (this.parent.gui.custom.name.getValue() == this.tmp.name && this.parent.gui.custom.code.getValue() == this.tmp.code) {
                            return true
                        }
                        try {
                            var i = JSON.parse(this.parent.gui.custom.code.getValue())
                        } catch (a) {
                            return u("errado Código [2]")
                        }
                        if (typeof i.type == "undefined" || typeof i.para == "undefined") {
                            return u("errado Código [3]")
                        }
                        var f = 0;
                        for (var l in i.para) {
                            f++
                        }
                        switch (i.type) {
                            case "speed":
                            case "regen":
                                if (f !== 0) {
                                    return u("errado Código [4]")
                                }
                                break;
                            case "fort":
                                if (typeof i.para.type == "undefined" || typeof i.para.att == "undefined" || typeof i.para.def == "undefined" || typeof i.para.health == "undefined") {
                                    return u("errado Código [5]")
                                }
                                if (i.para.type !== 1 && i.para.type !== 0) {
                                    return u("errado Código [6]")
                                }
                                if (!jQuery.isNumeric(i.para.att) || i.para.att < 0) {
                                    return u("errado Código [7]")
                                }
                                if (!jQuery.isNumeric(i.para.def) || i.para.def < 0) {
                                    return u("errado Código [8]")
                                }
                                if (!jQuery.isNumeric(i.para.health) || i.para.health < 0) {
                                    return u("errado Código [9]")
                                }
                                break;
                            case "duel":
                            case "custom":
                                if (f <= 0) {
                                    return u("errado Código [10]")
                                }
                                break;
                            default:
                                return u("errado Código [11]")
                        }
                        delete this.tmp;
                        this.parent.data.custom[e] = {
                            id: Number(e),
                            type: i.type,
                            para: i.para,
                            name: this.htmlEscape(this.parent.gui.custom.name.getValue())
                        };
                        this.parent.gui.custom.config.hide();
                        this.showConfig();
                        TWDB.Settings.set("custom", this.parent.data.custom)
                    }
                },
                deleteConfig: function(e, t) {
                    if (typeof t == "undefined") {
                        var n = this;
                        var r = new west.gui.Dialog("Apagar - Personalizado", "Apagar: " + this.parent.data.custom[e].name + "?");
                        r.addButton("ok", function() {
                            n.deleteConfig(e, true)
                        });
                        r.addButton("cancel");
                        r.show()
                    } else {
                        var i = this.parent.data.custom;
                        delete i[e];
                        this.parent.data.custom = {};
                        var s = 0;
                        for (var e in i) {
                            s++;
                            this.parent.data.custom[s] = i[e];
                            this.parent.data.custom[s].id = s
                        }
                        this.parent.gui.custom.config.hide();
                        this.showConfig();
                        TWDB.Settings.set("custom", this.parent.data.custom)
                    }
                }
            },
            getSkillImg: function(e, t) {
                var n = 1;
                var r = 1;
                var i = 0;
                switch (e) {
                    case "build":
                        var s = Game.cdnURL + "/images/skill/skills_strength.png";
                        r = 2;
                        break;
                    case "punch":
                        var s = Game.cdnURL + "/images/skill/skills_strength.png";
                        i = 1;
                        r = 2;
                        break;
                    case "tough":
                        var s = Game.cdnURL + "/images/skill/skills_strength.png";
                        i = 2;
                        r = 2;
                        break;
                    case "endurance":
                        var s = Game.cdnURL + "/images/skill/skills_strength.png";
                        i = 3;
                        r = 2;
                        break;
                    case "health":
                        var s = Game.cdnURL + "/images/skill/skills_strength.png";
                        i = 4;
                        r = 2;
                        break;
                    case "ride":
                        var s = Game.cdnURL + "/images/skill/skills_flexibility.png";
                        r = 2;
                        break;
                    case "reflex":
                        var s = Game.cdnURL + "/images/skill/skills_flexibility.png";
                        i = 1;
                        r = 2;
                        break;
                    case "dodge":
                        var s = Game.cdnURL + "/images/skill/skills_flexibility.png";
                        i = 2;
                        r = 2;
                        break;
                    case "hide":
                        var s = Game.cdnURL + "/images/skill/skills_flexibility.png";
                        i = 3;
                        r = 2;
                        break;
                    case "swim":
                        var s = Game.cdnURL + "/images/skill/skills_flexibility.png";
                        i = 4;
                        r = 2;
                        break;
                    case "aim":
                        var s = Game.cdnURL + "/images/skill/skills_dexterity.png";
                        r = 2;
                        break;
                    case "shot":
                        var s = Game.cdnURL + "/images/skill/skills_dexterity.png";
                        i = 1;
                        r = 2;
                        break;
                    case "pitfall":
                        var s = Game.cdnURL + "/images/skill/skills_dexterity.png";
                        i = 2;
                        r = 2;
                        break;
                    case "finger_dexterity":
                        var s = Game.cdnURL + "/images/skill/skills_dexterity.png";
                        i = 3;
                        r = 2;
                        break;
                    case "repair":
                        var s = Game.cdnURL + "/images/skill/skills_dexterity.png";
                        i = 4;
                        r = 2;
                        break;
                    case "leadership":
                        var s = Game.cdnURL + "/images/skill/skills_charisma.png";
                        r = 2;
                        break;
                    case "tactic":
                        var s = Game.cdnURL + "/images/skill/skills_charisma.png";
                        i = 1;
                        r = 2;
                        break;
                    case "trade":
                        var s = Game.cdnURL + "/images/skill/skills_charisma.png";
                        i = 2;
                        r = 2;
                        break;
                    case "animal":
                        var s = Game.cdnURL + "/images/skill/skills_charisma.png";
                        i = 3;
                        r = 2;
                        break;
                    case "appearance":
                        var s = Game.cdnURL + "/images/skill/skills_charisma.png";
                        i = 4;
                        r = 2;
                        break;
                    case "strength":
                        var s = Game.cdnURL + "/images/window/skills/circle_strength.png";
                        break;
                    case "flexibility":
                        var s = Game.cdnURL + "/images/window/skills/circle_flexibility.png";
                        break;
                    case "dexterity":
                        var s = Game.cdnURL + "/images/window/skills/circle_dexterity.png";
                        break;
                    case "charisma":
                        var s = Game.cdnURL + "/images/window/skills/circle_charisma.png";
                        break;
                    case "attacker":
                        var s = TWDB.images.attacker;
                        break;
                    case "defender":
                        var s = TWDB.images.defender;
                        break;
                    default:
                        return jQuery("<div />")
                }
                var o = "";
                if (typeof CharacterSkills.skills[e] !== "undefined") {
                    var o = CharacterSkills.skills[e].name
                } else if (typeof CharacterSkills.attributes[e] !== "undefined") {
                    var o = CharacterSkills.attributes[e].name
                }
                s = '<img src="' + s + '" height="' + t * r + '" title="' + o + '" style="margin-left:-' + i * t + 'px" />';
                s = jQuery(s);
                var u = '<div style="display:block;overflow:hidden;width:' + t * n + "px;height:" + t + 'px;"/>';
                u = jQuery(u);
                return u.append(s)
            },
            bag: {
                stack: {},
                interval: false,
                setParent: function(e) {
                    this.parent = e
                },
                showItems: function(e, t) {
                    this.parent.gui.bag.children().remove();
                    this.items = {};
                    var n = this,
                        r = false,
                        i = function(e) {
                            var r = (new tw2widget.InventoryItem(ItemManager.get(e))).setCharacter(Character);
                            var i = r.getMainDiv();
                            var s = function(e) {
                                return function() {
                                    n.click(r, e, t)
                                }
                            }(e);
                            jQuery(i).removeAttr("id").children(".TWDBbuyTip, .TWDBsellTip, .TWDBcollector").remove().end().children("img:first-child").removeAttr("id").end().click(s).appendTo(n.parent.gui.bag);
                            n.items[e] = jQuery(i)
                        },
                        s, o;
                    for (s in e) {
                        if (typeof s === "function") {
                            break
                        }
                        o = e[s].id;
                        i(o);
                        r = r || ItemManager.get(o).type === "animal"
                    }
                    this.parent.gui.bag.append(jQuery((new west.gui.Button(Inventory.guiElements.instantWearButton.caption.text, n.autoEquip, n, null)).getMainDiv()).css({
                        position: "absolute",
                        right: "8px",
                        bottom: "5px"
                    }));
                    var u = TWDB.DataManager.getAnimals();
                    if (!r && u.length > 0) {
                        i(u[0]["id"])
                    }
                    this.wear()
                },
                autoEquip: function() {
                    var e;
                    for (e in this.items) {
                        if (this.items.hasOwnProperty(e)) {
                            jQuery(this.items[e]).click()
                        }
                    }
                },
                click: function(e, t, n) {
                    if (Bag.getItemByItemId(t) === undefined) {
                        return false
                    }
                    Wear.carry(e);
                    this.stack[t] = e;
                    var r = this,
                        i;
                    if (this.interval === false) {
                        switch (n) {
                            case "jobs":
                                i = function() {
                                    r.wear();
                                    r.parent.jobs.update();
                                    r.parent.joblist.update()
                                };
                                break;
                            case "custom":
                                i = function() {
                                    r.wear();
                                    r.parent.customs.showSkill()
                                };
                                break
                        }
                        TWDB.Eventer.set("carryChecker", i, 1);
                        this.interval = setInterval(function() {
                            r.carry()
                        }, 100)
                    }
                },
                carry: function() {
                    var e = 0,
                        t, n;
                    for (t in this.stack) {
                        n = this.stack[t];
                        if (n === undefined || n.getImgEl().css("opacity") === "1") {
                            delete this.stack[t]
                        } else {
                            e++
                        }
                    }
                    if (e === 0) {
                        clearInterval(this.interval);
                        this.interval = false;
                        TWDB.Eventer.trigger("carryChecker")
                    }
                },
                wear: function() {
                    var e, t;
                    for (e in Wear.wear) {
                        t = Wear.wear[e].getId();
                        if (typeof this.items[t] !== "undefined") {
                            this.items[t].css("opacity", "0.5")
                        }
                    }
                }
            },
            setUsedItems: function() {
                for (var e in this.calcdata.jobs) {
                    for (var t in this.calcdata.jobs[e].cloth) {
                        var n = this.calcdata.jobs[e].cloth[t].id;
                        if (typeof(this.calcdata.used[n] == "undefined")) {
                            this.calcdata.used[n] = 1
                        } else {
                            this.calcdata.used[n]++
                        }
                    }
                }
                for (var r in this.calcdata.custom) {
                    for (var t in this.calcdata.custom[r].cloth) {
                        var n = this.calcdata.custom[r].cloth[t].id;
                        if (typeof(this.calcdata.used[n] == "undefined")) {
                            this.calcdata.used[n] = 1
                        } else {
                            this.calcdata.used[n]++
                        }
                    }
                }
            },
            jobSearch: function() {
                var e = this;
                if (this.jobs.selected == 0) {
                    return
                }
                if (this.gui.job.searchDiv.parent().length) {
                    this.jobs.switchJob(this.jobs.selected);
                    return
                }
                this.gui.bag.children().remove();
                var t = TWDB.Map.getNearestJob(this.jobs.selected);
                var n = 4;
                var r = jQuery("<table />");
                for (var i = 0; i < t.length; i++) {
                    if (i === n) {
                        break
                    }
                    var s = t[i];
                    var o = "rotate(" + s.angle + "deg);";
                    var u = jQuery("<tr />");
                    u.append('<td style="text-align:left;vertical-align:middle">' + s.time.formatDuration() + "</td>");
                    u.append(jQuery('<td style="text-align:left;vertical-align:middle">').append(jQuery('<img src="' + TWDB.images.arrow + '" title="Direcção" style="cursor:pointer;-moz-transform: ' + o + "-webkit-transform:" + o + "-rotat-transform:" + o + "-ms-transform:" + o + "transform:" + o + '" />').click(function(e, t) {
                        return function() {
                            Map.center(e, t)
                        }
                    }(s.x, s.y))));
                    var a = jQuery("<td />");
                    var f = new west.gui.Button("Abrir", function(e, t, n) {
                        return function() {
                            TWDB.Jobs.openJob(e, t, n)
                        }
                    }(e.jobs.selected, s.x, s.y));
                    jQuery(f.divMain).css({
                        "min-width": "50px",
                        "max-width": "80px"
                    });
                    jQuery(f.divMain).find(".textart_title").css({
                        overflow: "hidden"
                    });
                    f.appendTo(a);
                    u.append(a);
                    if (Premium.hasBonus("automation")) {
                        var a = jQuery("<td />");
                        var f = new west.gui.Button("default", function(t, n, r) {
                            return function() {
                                TWDB.Jobs.startJob(t, n, r, Number(e.jobs.basetime))
                            }
                        }(e.jobs.selected, s.x, s.y));
                        jQuery(f.divMain).css({
                            "min-width": "50px",
                            "max-width": "80px"
                        });
                        jQuery(f.divMain).find(".textart_title").css({
                            overflow: "hidden"
                        });
                        f.appendTo(a);
                        u.append(a)
                    }
                    r.append(u)
                }
                this.gui.job.searchDiv.children().remove();
                this.gui.job.searchDiv.append(r);
                this.gui.bag.append(this.gui.job.searchDiv)
            },
            isUsedItem: function(e) {
                if (this.calcdata.used[e]) {
                    return true
                } else {
                    return false
                }
            },
            getClothForJob: function(e) {
                if (!isDefined(this.calcdata.jobs[e]) || !isDefined(this.calcdata.jobs[e].cloth)) {
                    return null
                }
                return this.calcdata.jobs[e].cloth
            },
            getLPForJob: function(e) {
                if (!isDefined(this.calcdata.jobs[e]) || !isDefined(this.calcdata.jobs[e].laborpoints)) {
                    return null
                }
                return this.calcdata.jobs[e].laborpoints
            },
            getSelectedJob: function() {
                return this.jobs.selected
            },
            isLoaded: function() {
                if (isDefined(this.calcdata.loaded)) {
                    return this.calcdata.loaded
                }
                return false
            }
        };
        (function($) {
            var _base = TWDB;
            var w = window;
            var Images = _base.images;
            var Script = _base.script;
            var ClothCalc = _base.ClothCalc;
            var Debugger = function(e) {
                var t = {};
                return t
            }($);
            _base.Debugger = Debugger;
            var Error = function(e) {
                var t = {};
                var n = "twdb_error";
                var r = [];
                var i = true;
                t.report = function(e, t) {
                    if (!isDefined(e.message)) {
                        r.push({
                            msg: "failed to add error",
                            e: t
                        })
                    } else {
                        r.push({
                            msg: t + " " + (e.stack && (e.stack.match(/:\d+:\d+/) || [])[0] || ""),
                            e: e.message
                        })
                    }
                    if (i) {
                        i = false;
                        WestUi.NotiBar.add(new OnGoingPermanentEntry(function() {
                            s()
                        }, "tw-db.info: an error occured", "tip"))
                    }
                };
                var s = function() {
                    var t = new west.gui.Scrollpane;
                    e(t.getMainDiv()).css("height", "370px");
                    e(t.getMainDiv()).find(".tw2gui_scrollpane_clipper_contentpane").addClass("selectable");
                    var i = '<table border="1" cellpadding="3" cellspacing="1">';
                    for (var s = r.length - 1; s >= 0; s--) {
                        i += "<tr><td>" + s + "</td><td>" + r[s].msg + "</td><td>" + r[s].e + "</td></tr>"
                    }
                    i += "</table>";
                    t.appendContent(i);
                    var o = wman.open(n, null, "noreload").setMiniTitle("TWDB Errorlog").setTitle("tw-db.info Errorlog").appendToContentPane(t.getMainDiv())
                };
                return t
            }($);
            _base.Error = Error;
            Debugger.Error = Error;
            var Loader = function(e) {
                var t = {};
                var n = [];
                var r = {};
                var i = {};
                var s;
                var o = false;
                var u = false;
                var a = false;
                var f = 0;
                t.add = function(e, t, r, i) {
                    var s = {
                        ready: false
                    };
                    n.push({
                        key: e,
                        txt: t,
                        call: r,
                        dep: i || {},
                        ready: s,
                        count: 0
                    });
                    return s
                };
                t.init = function() {
                    if (s) {
                        return
                    }
                    s = w.setInterval(function() {
                        l()
                    }, 500)
                };
                var l = function() {
                    if (u) {
                        return
                    }
                    u = true;
                    if (o === false) {
                        if (!c()) {
                            u = false;
                            return
                        }
                        TWDB.Cache.init();
                        r.Cache = true;
                        try {
                            Updater.query();
                            h()
                        } catch (e) {
                            Error.report(e, "");
                            (new UserMessage("falha ao registar no tw-db.info script em TheWestApi", UserMessage.TYPE_FATAL)).show();
                            return d()
                        }
                        if (TWDB.Util.isNewIDsystem()) {
                            TWDB.Util.wrapBetaGetItem()
                        }
                        if (TWDB.Util.isNewIDsystem() && window.location.href.indexOf(".beta.the-west.net") === -1 && !TWDB.Util.idMigrationDone()) {
                            try {
                                TWDB.Util.backupData()
                            } catch (e) {}
                            try {
                                TWDB.Util.idMigrator();
                                (new UserMessage("Converting TW-DB data to new item ID system successful.", UserMessage.TYPE_SUCCESS)).show();
                                TWDB.Util.simpleRestore(true)
                            } catch (e) {
                                Error.report(e, "Item ID conversion failed.");
                                (new UserMessage("Item ID conversion failed. Do not use the ANALYSERS if you want to save your data!", UserMessage.TYPE_FATAL)).show();
                                TWDB.Util.simpleRestore()
                            }
                        }
                        return p()
                    }
                    if (isDefined(i[o.key])) {
                        return p()
                    }
                    if (o.ready.ready) {
                        r[o.key] = true;
                        a = false;
                        return p()
                    }
                    u = false
                };
                var c = function() {
                    if (!isDefined(w.jQuery) || !isDefined(w.TheWestApi) || !isDefined(w.TheWestApi.version) || w.ItemManager.get(2e3) === undefined || !isDefined(w.Character) || w.Character.playerId === 0 || !w.Bag.loaded) {
                        return false
                    } else {
                        return true
                    }
                };
                var h = function() {
                    var t = w.TheWestApi.register("twdb_clothcalc", "tw-db.info Cloth Calc", "2.04", String(Script.gameversion), "scoobydoo, Dun, Petee, Bluep, Tom Robert, xShteff [tw-db.info]", "https://tw-db.info");
                    var n = '<br><br><form action="https://www.paypal.com/cgi-bin/webscr" method="post">' + '<input name="cmd" value="_s-xclick" type="hidden">' + '<input name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----" type="hidden">' + '<input type="image" src="https://www.paypalobjects.com/en_US/DE/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">' + '<img width="1" border="0" height="1" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" alt=""></form><br>';
                    var r = e("<div style='font-family:comic sans ms; font-size:13pt; padding-top:10px; text-align:center;' />").append("O UserScript ClothCalc é um projecto criado pela equipa do TW-DB.info. Oferece vários recursos e extensões que vão melhorar o jogo, que te farão poupar tempo e te irá optimizar certas actividades.", n, "Obrigado!");
                    t.setGui(r);
                    if (t.isOutdated()) {
                        w.TheWestApi.displayOutdated()
                    }
                };
                var p = function() {
                    if (n.length === 0) {
                        return d()
                    }
                    o = n.shift();
                    o.count++;
                    if (o.count > f) {
                        if (a) {
                            Error.report({
                                message: "deadlock detected"
                            }, "failed to load module: " + o.key);
                            i[o.key] = true;
                            return p()
                        }
                        f++;
                        a = true
                    }
                    for (var e in o.dep) {
                        if (!isDefined(r[e])) {
                            if (TWDB.script.isDev()) {
                                console.log(o.key, "needs ", e)
                            }
                            n.push(o);
                            return p()
                        }
                    }
                    try {
                        o.call()
                    } catch (t) {
                        Error.report(t, "failed to load module: " + o.key);
                        i[o.key] = true;
                        return p()
                    }
                    u = false;
                    l()
                };
                var d = function() {
                    w.clearInterval(s);
                    w.setTimeout(function() {
                        delete t
                    }, 1e3)
                };
                t.stack = n;
                t.loaded = r;
                t.failed = i;
                t.current = o;
                return t
            }($);
            Debugger.Loader = Loader;
            var Cache = function(e) {
                var t = {};
                var n = {};
                var r = "";
                var i = {};
                var s = function(e) {
                    if (!i[e]) {
                        i[e] = true;
                        t.save("keys", i)
                    }
                };
                var o = function() {
                    if (n.ready) {
                        return
                    }
                    r = "twdb_" + Character.playerId + "_";
                    i = t.load("keys");
                    if (!i) {
                        i = {
                            keys: true
                        }
                    }
                    n.ready = true
                };
                t.load = function(e) {
                    s(e);
                    try {
                        return JSON.parse(decodeURIComponent(localStorage.getItem(r + e)))
                    } catch (n) {
                        Error.report(n, "load " + e + " from cache");
                        t.save(e, null);
                        return null
                    }
                };
                t.save = function(e, n) {
                    s(e);
                    try {
                        localStorage.setItem(r + e, encodeURIComponent(JSON.stringify(n)));
                        return true
                    } catch (i) {
                        Error.report(i, "save " + e + " to cache");
                        t.save(e, null);
                        return false
                    }
                };
                t.reset = function(n, s) {
                    try {
                        if (n) {
                            if (isDefined(s)) {
                                localStorage.removeItem(s)
                            } else {
                                for (var o in i) {
                                    localStorage.removeItem(r + o)
                                }
                            }(new UserMessage("Reset Done, page will now be reloaded", UserMessage.TYPE_SUCCESS)).show();
                            location.href = location.href.replace(location.hash || "#", "")
                        } else {
                            var u = e("<div><h2>queres mesmo fazer reset a toda a cache do usercript do tw-db?</h2></div>");
                            var a = (new west.gui.Textfield("twdb_cache_key")).setSize(40).setLabel("Key:");
                            u.append(a.getMainDiv());
                            var f = (new west.gui.Checkbox("all Keys")).setSelected(true);
                            f.setCallback(function(e) {
                                if (e) {
                                    a.setValue("")
                                }
                            });
                            e(a.getMainDiv()).find("span").css("font-size", "12px");
                            e(a.getMainDiv()).find("input").keyup(function() {
                                f.setSelected(false)
                            });
                            u.append(e('<div style="display:block;" />').append(f.getMainDiv()));
                            (new west.gui.Dialog("tw-db Cache Reset", u, west.gui.Dialog.SYS_QUESTION)).addButton("ok", function() {
                                if (f.isSelected()) {
                                    t.reset(true)
                                } else {
                                    t.reset(true, a.getValue())
                                }
                            }).addButton("cancel").show()
                        }
                    } catch (l) {
                        Error.report(l, "cache reset")
                    }
                };
                t.init = o;
                return t
            }($);
            _base.Cache = Cache;
            Debugger.Cache = Cache;
            var Worker = function(e) {
                var t = {};
                var n = [];
                var r = false;
                var i = false;
                t.add = function(e) {
                    n.push(e);
                    if (r) {
                        return
                    }
                    r = w.setInterval(function() {
                        s()
                    }, 100)
                };
                var s = function() {
                    if (i) {
                        return
                    }
                    i = true;
                    var e = n.shift();
                    try {
                        e()
                    } catch (t) {
                        Error.report(t, "Worker")
                    }
                    if (n.length == 0) {
                        w.clearInterval(r);
                        r = false
                    }
                    i = false
                };
                return t
            }($);
            Debugger.Worker = Worker;
            var Jobs = function(e) {
                var t = {};
                var n = {};
                var r = [];
                var i = {};
                var s = {};
                var o = [1828e3, 1829e3, 183e4, 2e6, 2003e3, 2006e3, 2009e3];
                var u;
                var a = {};
                var f = function() {
                    if (n.ready) {
                        return
                    }
                    var t = 0;
                    var f = 0;
                    var c = {};
                    while (true) {
                        t++;
                        var h = w.JobList.getJobById(t);
                        if (!h) {
                            f++;
                            if (f > 5) {
                                break
                            }
                            continue
                        }
                        f = 0;
                        r.push(h.id);
                        i[h.name.toLowerCase()] = h.id;
                        s[h.shortname.toLowerCase()] = h.id;
                        for (var p in h.yields) {
                            if (isNaN(p) || c[p]) {
                                continue
                            }
                            c[p] = true;
                            o.push(Number(p))
                        }
                    }
                    u = function(e) {
                        var t = {
                            description: "",
                            duration: 1800,
                            energy: 6,
                            groupid: null,
                            id: 255,
                            malus: 0,
                            name: "Construção",
                            randomyields: [],
                            shortname: "construction",
                            skills: {
                                build: 3,
                                repair: 1,
                                leadership: 1
                            },
                            yields: {},
                            calcJobPoints: function() {
                                return 0
                            },
                            canDo: function() {
                                return true
                            }
                        };
                        return t
                    }(e);
                    r.push(255);
                    i[u.name.toLowerCase()] = 255;
                    s[u.shortname.toLowerCase()] = 255;
                    var d = function(e, t) {
                        var n = e === 255 ? u : w.JobList.getJobById(e);
                        var r = t === 255 ? u : w.JobList.getJobById(t);
                        return n.name > r.name
                    };
                    r.sort(d);
                    o.sort();
                    a = Cache.load("jobdata");
                    if (a === null || typeof a !== "object") {
                        a = {}
                    }
                    Eventer.set("TWDBdataLoaded", function() {
                        l()
                    });
                    n.ready = true
                };
                n = Loader.add("Jobs", "tw-db Jobsystem", f, {
                    Cache: true
                });
                var l = function() {
                    a = {};
                    Cache.save("jobdata", a)
                };
                t.getJobByName = function(n) {
                    n = e.trim(n).toLowerCase();
                    if (!isDefined(i[n])) {
                        return null
                    }
                    return t.getJobById(i[n])
                };
                t.getJobByShortname = function(n) {
                    n = e.trim(n).toLowerCase();
                    if (!isDefined(s[n])) {
                        return null
                    }
                    return t.getJobById(s[n])
                };
                t.getJobById = function(t) {
                    var n;
                    if (t === 255) {
                        n = u
                    } else {
                        n = w.JobList.getJobById(t);
                        if (!n) {
                            return n
                        }
                    }
                    var r = e.extend(true, {}, n);
                    var i = 1;
                    if (w.Character.charClass == "adventurer") {
                        if (w.Premium.hasBonus("character")) {
                            i *= 1.2
                        } else {
                            i *= 1.1
                        }
                    }
                    if (w.Premium.hasBonus("money")) {
                        i *= 1.5
                    }
                    for (var s = 0; s < r.randomyields.length; s++) {
                        r.randomyields[s] = (r.randomyields[s] * i).round(2)
                    }
                    if (typeof r.yields.length == "undefined") {
                        for (var o in r.yields) {
                            r.yields[o].prop = (r.yields[o].prop * i).round(2)
                        }
                    }
                    return r
                };
                t.openJob = function(e, t, n) {
                    w.JobWindow.open(e, t, n)
                };
                t.startJob = function(e, t, n, r) {
                    w.JobWindow.startJob(e, t, n, Number(r) || 3600)
                };
                t.getAllJobs = function() {
                    return r
                };
                t.isProduct = function(t) {
                    return e.inArray(Number(t), o)
                };
                t.getPopup = function(e, n) {
                    var r = '<div style="min-width:60px;text-align:center" >';
                    var i = t.getJobById(e);
                    if (isDefined(i)) {
                        r += '<span style="font-weight:bold;display:block;">' + i.name + "</span>" + '<div class="job" style="position:relative;left:50%;margin:10px -25px;">' + "<div " + (!isDefined(n) ? "" : 'class="featured ' + n + '"') + "></div>" + '<img src="' + Game.cdnURL + "/images/jobs/" + i.shortname + '.png" class="job_icon" >' + "</div>"
                    }
                    return r += "</div>"
                };
                return t
            }($);
            _base.Jobs = Jobs;
            Debugger.Jobs = Jobs;
            var Window = function(e) {
                var t = {};
                var n = "twdb_window";
                var r = null;
                var i = null;
                var s = {};
                var o = {};
                var u = function() {
                    if (o.ready) {
                        return
                    }
                    var t = e('<div title="tw-db.info" class="menulink" />').css("background-image", "url(" + Images.button + ")").mouseenter(function() {
                        e(this).css("background-position", "-25px 0px")
                    }).mouseleave(function() {
                        e(this).css("background-position", "0px 0px")
                    }).click(function() {
                        a()
                    });
                    e("#ui_menubar").append(e('<div class="ui_menucontainer" id="TWDB_ClothCalc_menubuttons" />').append(t).append('<div class="menucontainer_bottom" />'));
                    ready = true;
                    o.ready = true
                };
                o = Loader.add("Window", "tw-db Scriptwindow", u);
                t.open = function(e) {
                    a(e)
                };
                var a = function(t) {
                    r = wman.open(n, null).setMiniTitle("tw-db.info").setTitle("tw-db.info");
                    r.appendToContentPane(e('<div style="width:100%;text-align:center;position:absolute;bottom:0px;left:0px;height:15px;display:block;font-size:12px;color:#000000;">.:powered by tw-db team:. | <a href="https://tw-db.info" style="font-weight:normal;color:#000000;" target="_blank">.:tw-db.info:.</a> | ' + (Script.version / 100 + " rev. " + Script.revision) + "</div>"));
                    r.appendToContentPane(e('<div title=" tw-db support " style="width:19px;height:19px;position:absolute;bottom:-5px;right:5px;display:block;cursor:pointer;" />').append('<img src="' + Images.iconSupport + '" />').click(function() {
                        Support.open()
                    }));
                    var o;
                    for (var u in s) {
                        if (!isDefined(o)) {
                            o = u
                        }
                        if (t == u) {
                            o = u
                        }
                        r.addTab(s[u].name, u, function(e, t) {
                            f(t)
                        });
                        s[u].gui.children().remove();
                        r.appendToContentPane(s[u].gui)
                    }
                    if (isDefined(o)) {
                        i = s[o].gui;
                        f(o)
                    }
                };
                var f = function(e) {
                    i.hide();
                    r.showLoader();
                    r.activateTab(e);
                    if (!isDefined(s[e])) {
                        return
                    }
                    if (s[e].title !== "") {
                        r.setTitle("tw-db.info " + s[e].title)
                    } else {
                        r.setTitle("")
                    }
                    i = s[e].gui;
                    i.show();
                    w.setTimeout(s[e].callback, 10)
                };
                t.addTab = function(t, n, r, i) {
                    s[t] = {
                        title: r,
                        name: n,
                        callback: i,
                        gui: null
                    };
                    s[t].gui = e('<div style="margin-top:10px;"/>').hide();
                    return s[t].gui
                };
                t.hideLoader = function() {
                    r.hideLoader()
                };
                return t
            }($);
            Debugger.Window = Window;
            var Support = function(e) {
                var t = {};
                var n = "twdb_support";
                var r = {};
                t.addKey = function(e, t) {
                    r[e] = t
                };
                t.open = function() {
                    var t = e('<p style="margin:10px;">Please include the text displayed below in a bug report sent using <a href="https://tw-db.info/?strana=contact" target="_blank">our contact form</a> and also try to describe how to reproduce this error (what did you do when it occured). Thanks!</p>');
                    var i = e('<div style="margin:10px;"/>');
                    var s = "[CODE]";
                    for (var o in r) {
                        s += String(o) + "\n";
                        s += String(r[o]) + "\n";
                        s += "----------" + "\n"
                    }
                    s += "[/CODE]";
                    i.append((new west.gui.Textarea).setContent(s).setWidth(600).setHeight(250).setReadonly().getMainDiv());
                    wman.open(n, null).setMiniTitle("tw-db.info Support").setTitle("tw-db.info Support").appendToContentPane(t).appendToContentPane(i)
                };
                return t
            }($);
            Debugger.Support = Support;
            var Timer = function(e) {
                var t = {};
                var n = 0;
                var r = 0;
                var i = 0;
                t.getTimeout = function() {
                    var e = (new Date).getTime();
                    if (e - n < 2e3) {
                        r++
                    } else {
                        r = 0
                    }
                    if (e - n < 6e4) {
                        i++
                    } else {
                        i = 0
                    }
                    n = e;
                    var t = 0;
                    if (i > 50) {
                        t = 6e4
                    }
                    if (r < 20) {
                        return t + 200
                    }
                    return t + 2e3
                };
                return t
            }($);
            Debugger.Timer = Timer;
            var Eventer = function(e) {
                var t = {};
                var n = {};
                t.set = function(e, t, r) {
                    if (!isDefined(n[e])) {
                        n[e] = {}
                    }
                    if (!isDefined(r)) {
                        var r = false
                    }
                    var i = Number((new Date).getTime());
                    while (n[e][i]) i++;
                    n[e][i] = {
                        id: i,
                        call: t,
                        count: r
                    };
                    return i
                };
                t.trigger = function(e) {
                    if (!isDefined(n[e])) {
                        return
                    }
                    var t = 0;
                    for (var r in n[e]) {
                        if (!isDefined(n[e][r].id)) {
                            continue
                        }
                        w.setTimeout(n[e][r].call, 10);
                        if (n[e][r].count == false) {
                            t++;
                            continue
                        }
                        n[e][r].count--;
                        if (n[e][r].count > 0) {
                            t++;
                            continue
                        }
                    }
                    if (t == 0) {
                        delete n[e]
                    }
                };
                t.remove = function(e, t) {
                    if (!isDefined(n[e]) || !isDefined(n[e][t])) {
                        return false
                    }
                    delete n[e][t]
                };
                return t
            }($);
            _base.Eventer = Eventer;
            Debugger.Eventer = Eventer;
            var Calc = function(e) {
                var t = {};
                var n = false;
                var r = {
                    sets: {}
                };
                var i = {
                    sets: {},
                    items: {}
                };
                var s = {};
                var o = function(e) {
                    for (set in e) {
                        var t = e[set];
                        var n = {};
                        var i = {},
                            s = {},
                            o = {};
                        var u = 0;
                        for (level in t.bonus) {
                            if (!t.bonus.hasOwnProperty(level)) continue;
                            n[level] = {
                                jobs: {},
                                attributes: [],
                                skills: []
                            };
                            if (u > 0) {
                                for (var a = parseInt(u, 10) + 1; a <= level; ++a) {
                                    n[a] = JSON.parse(JSON.stringify(n[u]))
                                }
                            }
                            for (bonus in t.bonus[level]) {
                                if (!t.bonus[level].hasOwnProperty(bonus)) continue;
                                var f = t.bonus[level][bonus];
                                var l = TWDB.ClothCalc._skill2id[f.name];
                                switch (f.type) {
                                    case "job":
                                        if (!isDefined(n[level]["jobs"][f.job])) n[level]["jobs"][f.job] = 0;
                                        n[level]["jobs"][f.job] += f.value;
                                        break;
                                    case "attribute":
                                        if (!isDefined(i[l])) i[l] = 0;
                                        i[l] += f.value;
                                        n[level]["attributes"][l] = i[l];
                                        for (iT = 0; iT < TWDB.ClothCalc._sk4attr[f.name].length; iT++) {
                                            var c = TWDB.ClothCalc._sk4attr[f.name][iT];
                                            if (!isDefined(s[c])) s[c] = 0;
                                            s[c] += f.value;
                                            n[level]["skills"][c] = s[c]
                                        }
                                        break;
                                    case "skill":
                                        if (!isDefined(s[l])) s[l] = 0;
                                        s[l] += f.value;
                                        n[level]["skills"][l] = s[l];
                                        break;
                                    case "character":
                                        if (f.bonus && f.key === "level") {
                                            var h = f.roundingMethod;
                                            if (f.bonus.type === "skill") {
                                                var p = TWDB.ClothCalc._skill2id[f.bonus.name];
                                                if (!isDefined(s[p])) s[p] = 0;
                                                s[p] += Math[h](Character.level * f.bonus.value);
                                                n[level]["skills"][p] = s[p]
                                            } else if (f.bonus.type == "attribute") {
                                                for (iT = 0; iT < TWDB.ClothCalc._sk4attr[f.bonus.name].length; iT++) {
                                                    var c = TWDB.ClothCalc._sk4attr[f.bonus.name][iT];
                                                    if (!isDefined(s[c])) s[c] = 0;
                                                    s[c] += Math[h](Character.level * f.bonus.value);
                                                    n[level]["skills"][c] = s[c]
                                                }
                                            } else if (f.bonus.type == "job") {
                                                if (!isDefined(n[level]["jobs"][f.bonus.job])) n[level]["jobs"][f.bonus.job] = 0;
                                                n[level]["jobs"][f.bonus.job] += Math[h](Character.level * f.bonus.value)
                                            }
                                        }
                                        break;
                                    default:
                                        break
                                }
                            }
                            u = level
                        }
                        r.sets[set] = n
                    }
                    return r.sets
                };
                var u = function() {
                    if (s.ready) {
                        return
                    }
                    Worker.add(function() {
                        return function() {
                            r = o(west.storage.ItemSetManager._setList);
                            s.ready = true;
                            n = true
                        }
                    }())
                };
                s = Loader.add("Calc", "tw-db Calculator", u, {});
                t.getCcCache = function() {
                    return i
                };
                t.getSetCache = function() {
                    return r
                };
                t.getSetBonusForJob = function(e, t, n) {
                    if (isDefined(i.sets[e]) && isDefined(i.sets[e][t]) && isDefined(i.sets[e][t][n])) {
                        return i.sets[e][t][n]
                    }
                    try {
                        return a(e, t, n)
                    } catch (r) {
                        Error.report(r, "calcSetBonusForJob (" + e + " " + t + " " + n + ")")
                    }
                    return 0
                };
                t.getItemBonusForJob = function(e, t) {
                    try {
                        if (isDefined(i) && isDefined(i.items) && isDefined(i.items[e]) && isDefined(i.items[e][t])) {
                            return i.items[e][t]
                        }
                        return f(e, t)
                    } catch (n) {
                        Error.report(n, "calcItemBonusForJob (" + e + " " + t + ")")
                    }
                    return 0
                };
                t.isCached = function(e, t) {
                    if (isDefined(i.items[e]) && isDefined(i.items[e][t])) {
                        return true
                    } else {
                        return false
                    }
                };
                var a = function(e, t, n) {
                    if (!isDefined(r[e])) {
                        console.log({
                            message: "unknown set " + e
                        }, "calcSetBonusForJob");
                        return 0
                    }
                    if (!isDefined(r[e][t])) {
                        return 0
                    }
                    var s = r[e][t];
                    var o = Jobs.getJobById(n);
                    if (!o) {
                        return 0
                    }
                    var u = 0;
                    if (isDefined(s.jobs["all"])) {
                        u += s.jobs["all"]
                    }
                    if (isDefined(s.jobs[n])) {
                        u += s.jobs[n]
                    }
                    for (var a in o.skills) {
                        var f = o.skills[a];
                        if (isDefined(s.skills[TWDB.ClothCalc._skill2id[a]])) {
                            u += s.skills[TWDB.ClothCalc._skill2id[a]] * f
                        }
                    }
                    if (!isDefined(i.sets[e])) {
                        i.sets[e] = {}
                    }
                    if (!isDefined(i.sets[e][t])) {
                        i.sets[e][t] = {}
                    }
                    i.sets[e][t][n] = u;
                    return u
                };
                var f = function(e, t) {
                    var n = ItemManager.get(e);
                    if (!n) {
                        return 0
                    }
                    var r = Jobs.getJobById(t);
                    if (!r) {
                        return 0
                    }
                    var s = n.getValue(r.skills, t);
                    if (!isDefined(i.items[e])) {
                        i.items[e] = {}
                    }
                    i.items[e][t] = s;
                    return s
                };
                return t
            }($);
            _base.Calc = Calc;
            Debugger.Calc = Calc;
            var Importer = function(e) {
                var t = {};
                var n = {};
                t.div = null;
                var r = function() {
                    if (n.ready) {
                        return
                    }
                    t.div = Window.addTab("importer", "Importer", "", function() {
                        i()
                    });
                    n.ready = true
                };
                n = Loader.add("Importer", "tw-db Importersystem", r, {
                    Window: true
                });
                var i = function() {
                    t.div.children().remove();
                    Window.hideLoader();
                    e.getScript(Script.protocol + "://" + Script.url + "/cache/js/sDoImport_" + Script.lang + ".js")
                };
                return t
            }($);
            _base.Importer = Importer;
            Debugger.Importer = Importer;
            var Settings = function(e) {
                var t = {};
                var n = {};
                var r = null;
                var i = {};
                var s = function() {
                    if (i.ready) {
                        return
                    }
                    var e = Cache.load("settings");
                    if (typeof e === "object" && e !== null) {
                        n = e
                    } else {
                        n = {}
                    }
                    TWDB.Util.addCss("span.twdb_sett_capt { font-size: 115%; font-weight: bold; font-style: italic; display: inline-block; margin-top: 8px; text-shadow: 2px 1px 2px #643; }");
                    r = Window.addTab("settings", "Definições", "Definições", o);
                    i.ready = true
                };
                i = Loader.add("Settings", "tw-db Settingssystem", s, {
                    Cache: true,
                    Window: true
                });
                var o = function() {
                    r.children().remove();
                    var i = new west.gui.Scrollpane;
                    e(i.getMainDiv()).css("height", "300px");
                    r.append(i.getMainDiv());
                    var s = [
                        [9, "", "Inventário", false],
                        [0, "jobBoniTooltip", "Mostrar, no inventário, os pontos de trabalho adicionados para o trabalho escolhido na Cloth Calc", false],
                        [0, "collector", "Apontar itens no velho e no mercado que não possuis", false],
                        [0, "buyTip", "Mostrar os pontos de trabalho que os itens á venda nos mercados dão para cada trabalho existente", false],
                        [0, "sellTip", "Mostrar dica de venda no inventário", false],
                        [0, "sellTip1", "Mostrar dica de venda de itens que tens repetidos", "Definições de dicas de venda"],
                        [0, "sellTip2", "Mostrar dica de venda de itens que não são usados em nenhum trabalho", "Definições de dicas de venda"],
                        [0, "sellTip3", "Nunca dar a dica de venda nos itens raros", "Definições de dicas de venda"],
                        [0, "sellTip4", "Nunca dar dica de venda a itens que só podem ser encontrados em aventuras", "Definições de dicas de venda"],
                        [0, "sellTip5", "Nunca dar a dica de venda nos itens de conjuntos", "Definições de dicas de venda"],
                        [0, "pinitems", "Permitir fixar itens na secção de recentemente usados do Inventário", false],
                        [0, "collectorsell", "add a button to sell all but one of the selected item to the Mobile Trader", false],
                        [9, "", "Aventuras", false],
                        [0, "questwiki", "Incluir o link para o TW-DB e o botão da ClothCalc na janela das aventuras", false],
                        [0, "questcancle", "Ao cancelares uma aventura receberás um aviso a perguntar se queres mesmo cancelar a aventura, evitando cancelamentos indesejados", false],
                        [0, "qbswitch", "Activar capacidade de alternar entre texto de introdução e de conclusão no livro de aventuras", false],
                        [0, "qfulltext", "Mostrar sempre o texto todo da descrição das aventuras", false],
                        [9, "", "Mercado", false],
                        [0, "marketmap", "Usar o mapa do mercado", false],
                        [0, "marketreminder", "Adicionar um lembrete para licitações no mercado", false],
                        [0, "marketselldialog", "Melhorar o diálogo de venda no mercado", false],
                        [9, "", "Trabalhos", false],
                        [0, "jobwin_ccbutton", "Adicionar a ClothCalc á janela dos trabalhos", false],
                        [0, "jobwin_showlp", "Mostrar pontos de trabalho nas janelas de trabalho", false],
                        [9, "", "Lista de tarefas", false],
                        [0, "tasklistpoints", "show labor points and LP-hints on the task list", false],
                        [9, "", "GUI", false],
                        [0, "duelmotivation", "Adicionar uma barra para indicar a motivação de duelo debaixo da barra de energia", false],
                        [0, "directsleep", "Adicionar um botão para ir directamente para o Hotel ou o Quartel de um dos fortes da tua aliança", false],
                        [0, "deposit", "Adicionar um botão para depositar o teu dinheiro", false],
                        [0, "noshopsale", "Desactivar notificação de SALE na Shop", false],
                        [0, "expbarvalues", "Mostrar valores na barra de experiência; Credito & Obrigado a Leones/Slygoxx", false],
                        [0, "mini_chatgui", "allow Chat room GUI to be minimized", false],
                        [0, "customcounterpos", "reposition event counters (event currency, Hiro&#38;#39;s script) on wide screens", false],
                        [0, "noscrollbars", "disable scrollbars on small screens or when moving windows too far", false],
                        [9, "", "Mini map", false],
                        [0, "showbonusjobs", "Mostrar trabalhos com bónus no minimapa", false],
                        [0, "showscrollto", "Adicionar um campo de inserção de coordenadas no minimapa", false],
                        [9, "", "Forte", false],
                        [0, "fortrecruitment", "Mostrar o painel de recrutamento mesmo que não sejas general nem capitão", false],
                        [0, "enhancedfortrecruitment", "Mostrar jogadores perto do forte", false],
                        [9, "", "Diverso", false],
                        [0, "chat", "Usar a melhoria do chat", false],
                        [0, "notes", "Usar a ferramenta de notas", false],
                        [0, "forumlastpage", "Adicionar um icon no fórum para abrir diretamente a última página do tópico", false],
                        [0, "fastskillchange", "Activar mudança rápida de Habilidades no menu de Habilidades (Pressionar continuamente o botão do rato)", false],
                        [0, "autodeposit", "Receber uma dica para depositares o teu dinheiro logo que chegues á cidade com dinheiro na mão (Ao clicar sim, o dinheiro é automaticamente depositado)", false],
                        [0, "chestanalyser", "Adicionar um analisador de cofres que cria uma estatística para os cofres que abriste", false],
                        [0, "weeklycrafting", "Ser notificado de quando o tempo de espera entre crafts expira", false],
                        [0, "noworkqueuepa", "Remover os hints para a automatização de trabalho (Pop up de conta prémium)", "Definições prémium"],
                        [0, "nofetchallpa", "Desactivar o Premium quando se pesquisa todos os itens do mercado", "Definições prémium"],
                        [0, "nowofnuggets", "Não usar pepitas como o pagamento pré-definido em eventos do jogo (Quando disponível)", "Definições prémium"],
                        [0, "instanthotel", "Adicionar um botão de acesso rápido ao Hotel ás cidades", false],
                        [0, "telegramsource", "Adicionar botão para mudar para texto não formatado em telegramas", false],
                        [8, "clothPos"],
                        [0, "wear_openmin", "Abrir a janela de equipamento minimizada quando se abrir a ClothCalc", false]
                    ];
                    var o = {};
                    var a = e("<table />");
                    var f = {};
                    for (var l = 0; l < s.length; l++) {
                        var c = s[l][1];
                        o[c] = t.get(c);
                        var h = e("<tr />");
                        if (s[l][0] === 9) {
                            h.append(e('<td colspan="2" />').append(e('<span class="twdb_sett_capt" />').text((s[l][2] + "").twdb_twiceHTMLUnescape())));
                            a.append(h);
                            continue
                        }
                        if (s[l][0] === 8) {
                            h.addClass("placeholder_" + s[l][1]);
                            a.append(h);
                            continue
                        }
                        switch (s[l][0]) {
                            case 0:
                                var p = function(e) {
                                    return function() {
                                        o[e] = !o[e]
                                    }
                                }(c);
                                var d = new west.gui.Checkbox("", !o[c] ? "" : "tw2gui_checkbox_checked", p);
                                h.append(e('<td style="width:25px;" />').append(d.getMainDiv()));
                                break
                        }
                        h.append(e("<td />").text((s[l][2] + "").twdb_twiceHTMLUnescape()));
                        if (s[l][3]) {
                            var v = s[l][3];
                            if (!isDefined(f[v])) {
                                f[v] = e("<table />").hide();
                                a.append(e('<tr><td style="width:25px;cursor:pointer;" /><td style="cursor:pointer;" class="item_sell"><span class="twdb_cat butMinus" style="margin-top: -3px;" />&nbsp;&nbsp;' + v.twdb_twiceHTMLUnescape() + "</td></tr>").click(function(t) {
                                    return function() {
                                        e(f[t]).toggle();
                                        e(this).find("span.twdb_cat").toggleClass("butMinus").toggleClass("butPlus")
                                    }
                                }(v)), e("<tr>").append(e('<td style="width:25px;">'), e("<td>").append(f[v])))
                            }
                            f[v].append(h)
                        } else {
                            a.append(h)
                        }
                    }
                    var m = new west.gui.Combobox;
                    m.addItem("left", "esquerda").addItem("right", "direita").addItem("custom", "Posição guardada");
                    m.select(String(n["clothPos"]));
                    e("tr.placeholder_clothPos", a).removeClass("placeholder_clothPos").append(e('<td colspan="2" />').append(m.getMainDiv(), "<span>&nbsp;direita</span>"));
                    a.append(e("<tr><td>&nbsp;</td></tr>"));
                    var g = new west.gui.Button("Guardar", function() {
                        switch (m.getValue()) {
                            case "left":
                                n["clothPos"] = "left";
                                break;
                            case "right":
                                n["clothPos"] = "right";
                                break;
                            default:
                                n["clothPos"] = "custom";
                                break
                        }
                        u(o)
                    });
                    var y = e('<div style="width:100%;text-align:right;" />').append(e('<img style="position:relative;top:-20px;cursor:pointer;" title=" reset local Storage" src="' + Images.iconReset + '" />').click(function() {
                        Cache.reset()
                    }));
                    i.appendContent(a);
                    r.append(g.getMainDiv()).append(y);
                    Window.hideLoader()
                };
                t.get = function(e, r) {
                    if (!isDefined(n[e])) {
                        t.set(e, r);
                        return r
                    }
                    return n[e]
                };
                t.set = function(e, t) {
                    n[e] = t;
                    Cache.save("settings", n)
                };
                var u = function(e) {
                    for (var t in e) {
                        n[t] = e[t]
                    }
                    if (Cache.save("settings", n)) {
                        (new UserMessage("Guardado com sucesso", UserMessage.TYPE_SUCCESS)).show()
                    } else {
                        (new UserMessage("?save_error", UserMessage.TYPE_ERROR)).show()
                    }
                };
                return t
            }($);
            _base.Settings = Settings;
            Debugger.Settings = Settings;
            var JobWindowCC = function(e) {
                var t = {};
                var n = {};
                var r = function() {
                    if (n.ready) {
                        return
                    }
                    if (Settings.get("jobwin_ccbutton", true)) {
                        i()
                    }
                    if (Settings.get("jobwin_showlp", true)) {
                        s()
                    }
                    n.ready = true
                };
                var i = function() {
                    try {
                        JobWindow.prototype.__twdb__getBestWearButton = JobWindow.prototype.__twdb__getBestWearButton || JobWindow.prototype.getBestWearButton;
                        JobWindow.prototype.getBestWearButton = function() {
                            var t = JobWindow.prototype.__twdb__getBestWearButton.apply(this, arguments);
                            var n = this;
                            return t.append(e('<div class="twdb_bestwear" title="Mostrar este trabalho na janela da ClothCalc">').click(function(e) {
                                e.stopImmediatePropagation();
                                TWDB.ClothCalc.open(n.job.id, "job")
                            }))
                        };
                        var t = "div.job_bestwearbutton {left: 15px!important; width: 210px;}\n" + "div.twdb_bestwear {background: url('" + TWDB.images.bestwear + "') no-repeat top; " + "height: 55px; width: 55px; position: relative; left: 195px; top: -15px;}\n" + "div.job_bestwearbutton:hover .twdb_bestwear {background-position: bottom;}";
                        TWDB.Util.addCss(t, "bestwear")
                    } catch (n) {
                        Error.report(n, "manipulate JobWindow.prototype.getBestWearButton")
                    }
                };
                var s = function() {
                    try {
                        JobWindow.prototype.__twdb__initView = JobWindow.prototype.__twdb__initView || JobWindow.prototype.initView;
                        JobWindow.prototype.initView = function() {
                            var t = JobWindow.prototype.__twdb__initView.apply(this, arguments);
                            var n = "&nbsp;&nbsp;(" + (this.currSkillpoints - this.job.workpoints) + "&nbsp;PT)";
                            e("div.tw2gui_inner_window_title > .textart_title", this.window.divMain).append(n);
                            return t
                        }
                    } catch (t) {
                        Error.report(t, "manipulate JobWindow.prototype.initView")
                    }
                };
                n = Loader.add("JobWindowCC", "tw-db Job window", r, {
                    Settings: true,
                    ClothCalc: true
                });
                return t
            }($);
            var Tools = function(e) {
                var t = {};
                var n = {};
                var r;
                var i = function() {
                    if (n.ready) {
                        return
                    }
                    r = Window.addTab("tools", "Tools", "", function() {
                        s()
                    });
                    n.ready = true
                };
                n = Loader.add("Tools", "tw-db Toolsystem", i, {
                    Window: true
                });
                var s = function() {
                    r.children().remove();
                    (new west.gui.Button("open Tool", function() {
                        w.open("https://" + Script.url + "/?strana=politic_map&world=" + location.hostname.split(".")[0])
                    })).appendTo(r);
                    var t = new west.gui.Button;
                    t.setCaption("Alliance Import".escapeHTML()).click(function() {
                        t.disable();
                        e.getScript(Script.protocol + "://" + Script.url + "/js/sDoAllianceImport.js")
                    }).appendTo(r);
                    Window.hideLoader()
                };
                return t
            }($);
            Debugger.Tools = Tools;
            var Updater = function(e) {
                var t = {};
                var n = {};
                var r;
                var i = false;
                var s = function() {
                    if (n.ready) {
                        return
                    }
                    r = Window.addTab("notes", "Release Notes", "Release Notes", function() {
                        u()
                    });
                    if (!Cache.load("version")) Cache.save("version", Script.version + " " + Script.revision);
                    else if (Script.version + " " + Script.revision !== Cache.load("version")) {
                        Cache.save("version", Script.version + " " + Script.revision);
                        i = true;
                        var e = "O userscript foi actualizado";
                        var t = '<div class="txcenter">O userscript =1= foi actualizado. Quer ver as notas de lançamento?</div>';
                        t = t.replace("=1=", "<b>" + Script.name + "</b>");
                        (new west.gui.Dialog(e, t, "warning")).addButton("no").addButton("yes", function() {
                            Window.open("notes")
                        }).show()
                    }
                    n.ready = true
                };
                n = Loader.add("Updater", "tw-db Updater", s, {
                    Cache: true,
                    Window: true
                });
                var o = function(e, t) {
                    var n = "O usercript precisa de uma actualização";
                    var r = '<div class="txcenter">Existe uma nova versão para o =1=, por favor, clique OK para actualizar.</div>';
                    r = r.replace("=1=", "<b>" + Script.name + "</b>");
                    r += "<div><br />current version: " + Script.version / 100 + " revision " + Script.revision + "<br />new version: " + e / 100 + " revision " + t + "</div>";
                    var i = Script.protocol + "://" + Script.update;
                    var s = function() {
                        window.open(i);
                        (new west.gui.Dialog(Script.name, "Por favor, recarregue o jogo após instalar.", "warning")).setModal(true, false, true).show()
                    };
                    (new west.gui.Dialog(n, r, west.gui.Dialog.SYS_WARNING)).addButton("Not now").addButton("ok", s).show()
                };
                t.wasUpdated = function() {
                    return i
                };
                var u = function() {
                    r.children().remove();
                    var t = new west.gui.Scrollpane;
                    e(t.getMainDiv()).css("height", "335px");
                    var n = false;
                    for (var i = 0; i < Script.notes.length; i++) {
                        var s = e("<h3><a>Version " + String(Script.notes[i].version / 100) + "</a></h3>").css("border-bottom", "1px solid black").click(function() {
                            e(this).next().toggle()
                        });
                        var o = e("<div>" + Script.notes[i].notes + "</div>");
                        t.appendContent(s).appendContent(o);
                        if (n) {
                            o.hide()
                        }
                        n = true
                    }
                    r.append(t.getMainDiv());
                    Window.hideLoader()
                };
                t.query = function() {
                    setTimeout(function() {
                        e.getScript(Script.protocol + "://" + Script.check + "?" + (new Date).getTime())
                    }, 500)
                };
                t.check = function(e, t, n) {
                    if (Script.version !== e || Script.revision !== t) {
                        o(e, t)
                    }
                };
                return t
            }($);
            _base.Updater = Updater;
            Debugger.Updater = Updater;
            var Sleep = function(e) {
                var t = {};
                var n = null;
                var r = [];
                var i = [];
                var s = {};
                var o = 1;
                var u = false;
                var a = {};
                var f;
                var l = false;
                var c = 0;
                var h = [];
                var p = ["", "cubby", "bedroom", "hotel_room", "apartment", "luxurious_apartment"];
                var d = function() {
                    if (a.ready) {
                        return
                    }
                    if (Settings.get("directsleep", true)) {
                        var e = "ul.tw2gui_selectbox_content.twdb_sleepmenu {max-width: 320px!important; white-space: nowrap; overflow-y: auto; overflow-x: hidden;}" + "ul.tw2gui_selectbox_content.twdb_sleepmenu > div.tw2gui_scrollpane {width: 320px!important}" + "ul.tw2gui_selectbox_content.twdb_sleepmenu > li {padding-right: 20px!important;}";
                        TWDB.Util.addCss(e);
                        s = Cache.load("barracks");
                        if (s == null || typeof s !== "object") {
                            s = {}
                        }
                        v();
                        if (Character.homeTown.town_id !== 0) x();
                        else S()
                    }
                    a.ready = true
                };
                a = Loader.add("Sleep", "tw-db DirectSleep", d, {
                    Cache: true,
                    Settings: true
                });
                var v = function() {
                    n = GameInject.CharacterButton.add(Images.buttonSleep);
                    n.addMousePopup("Dormir").click(function(e) {
                        if (w.Character.homeTown.town_id !== 0 && r.length == 0) b();
                        else y(e)
                    })
                };
                var m = function(t, n, r) {
                    var i = (new west.gui.Selectbox(true)).addListener(function(e) {
                        switch (e) {
                            case "home":
                                b();
                                break;
                            default:
                                E(e);
                                break
                        }
                    });
                    if (w.Character.homeTown.town_id !== 0) i.addItem("home", "Hotel&nbsp;" + w.Map.calcWayTime(f, w.Character.homeTown).formatDuration());
                    for (var s = 0; s < r; s++)
                        if (t[s].stage !== 0) i.addItem(s, "Nível&nbsp;" + t[s].stage + "&nbsp;" + t[s].distance.formatDuration() + "&nbsp;|&nbsp;" + t[s].name);
                    e(i.elContent).addClass("twdb_sleepmenu");
                    i.show(n);
                    l = false
                };
                var g = function(e, t, n) {
                    Ajax.remoteCallMode("building_hotel", "get_data", {
                        town_id: h[e].town_id
                    }, function(r) {
                        if (r.error) return (new UserMessage(r.msg)).show();
                        h[e].stage = r.hotel_level;
                        if (++c == t) m(h, n, t)
                    })
                };
                var y = function(e) {
                    if (l) return;
                    l = true;
                    f = Map.getLastPosition();
                    if (w.Character.homeTown.town_id === 0) {
                        for (var t = 0; t < h.length; t++) h[t].distance = w.Map.calcWayTime(f, h[t]);
                        h.sort(function(e, t) {
                            return e.distance - t.distance
                        });
                        var n = h.length > 5 ? 5 : h.length;
                        c = 0;
                        for (var i = 0; i < n; i++) {
                            if (h[i].hasOwnProperty("stage")) {
                                if (++c == n) m(h, e, n)
                            } else g(i, n, e)
                        }
                    } else {
                        for (var t = 0; t < r.length; t++) r[t].distance = w.Map.calcWayTime(f, r[t]);
                        r.sort(function(e, t) {
                            return e.distance - t.distance
                        });
                        m(r, e, r.length)
                    }
                };
                var b = function() {
                    Ajax.remoteCallMode("building_hotel", "get_data", {
                        town_id: w.Character.homeTown.town_id
                    }, function(e) {
                        if (e.error) return (new UserMessage(e.msg)).show();
                        var t = p[e.hotel_level];
                        w.TaskQueue.add(new TaskSleep(w.Character.homeTown.town_id, t))
                    })
                };
                var E = function(e) {
                    if (isDefined(h[e])) w.TaskQueue.add(new TaskSleep(h[e].town_id, p[h[e].stage]));
                    else if (isDefined(r[e])) w.TaskQueue.add(new TaskFortSleep(r[e].id, r[e].x, r[e].y))
                };
                var S = function() {
                    Ajax.get("map", "get_minimap", {}, function(e) {
                        if (e.error) return (new UserMessage(e.msg)).show();
                        for (var t in e.towns)
                            if (e.towns[t].member_count) h.push(e.towns[t])
                    })
                };
                var x = function() {
                    if (w.Character.homeTown.alliance_id == 0) Ajax.remoteCall("fort_overview", "", {}, function(e) {
                        for (var t in e.js) {
                            var n = e.js[t],
                                r = e.page.match(new RegExp('<div id="ownforts">[\\S\\s]+FortWindow.open\\(undefined, ' + n[1] + ", " + n[2] + '\\)\\)">(.+?)</a>[\\S\\s]+<div id="lastbattle">'));
                            if (r) i.push({
                                fort_id: n[0],
                                x: n[1],
                                y: n[2],
                                name: r[1]
                            })
                        }
                        if (i.length > 0) w.setTimeout(function() {
                            T()
                        }, Timer.getTimeout())
                    });
                    else Ajax.remoteCallMode("alliance", "get_data", {
                        alliance_id: w.Character.homeTown.alliance_id
                    }, function(e) {
                        if (e.error) return (new UserMessage(e.error)).show();
                        i = e.data.forts;
                        if (i.length > 0) w.setTimeout(function() {
                            T()
                        }, Timer.getTimeout())
                    })
                };
                var T = function() {
                    try {
                        if (i.length <= 0) {
                            return
                        }
                        var t = i.pop();
                        var n = t.fort_id;
                        if (!isDefined(s[n])) {
                            s[n] = {
                                time: 0,
                                stage: 0
                            }
                        }
                        e.extend(s[n], {
                            id: n,
                            x: t.x,
                            y: t.y,
                            name: t.name
                        });
                        if (s[n].stage !== 5 && s[n].time + o * 86400 > (new Date).getTime() / 1e3) {
                            r.push(s[n]);
                            if (i.length > 0) {
                                w.setTimeout(function() {
                                    T()
                                }, Timer.getTimeout())
                            } else {
                                Cache.save("barracks", s)
                            }
                            return
                        }
                        Ajax.remoteCallMode("fort_building_barracks", "index", {
                            fort_id: n
                        }, function(e) {
                            if (e.error) {
                                (new UserMessage(e.error)).show()
                            } else {
                                s[n].time = Number((new Date).getTime() / 1e3).round(0);
                                if (isDefined(e.barrackStage)) {
                                    s[n].stage = e.barrackStage
                                }
                            }
                            r.push(s[n]);
                            if (i.length > 0) {
                                w.setTimeout(function() {
                                    T()
                                }, Timer.getTimeout())
                            } else {
                                Cache.save("barracks", s)
                            }
                        })
                    } catch (u) {
                        Error.report(u, "getFortData")
                    }
                };
                return t
            }($);
            Debugger.Sleep = Sleep;
            var Analyser = function(e) {
                var t = {};
                var n = false;
                var r = null;
                var s = null;
                var o = false;
                var u = [];
                var a = [];
                var f = 0;
                var l = {};
                var c = {};
                t.extra = false;
                var h = {};
                var p = function() {
                    if (h.ready) {
                        return
                    }
                    TWDB.Util.addCss(".messages-analyser-job .item img.tw_item { width: 30px; height: 27px; }" + ".messages-analyser-job .item .count { bottom: -4px; }" + ".messages-analyser-job .item span.usable { display: none; }" + "div.tw2gui_window .messages-analyser-job div.fancytable .row > div { display: none; vertical-align: top; }" + ".messages-analyser-job.view-rewards div.fancytable .row > div.view-rewards { display: inline-block; }" + ".messages-analyser-job.view-items div.fancytable .row > div.view-items { display: inline-block; }" + "div.tw2gui_window .messages-analyser-job div.fancytable div.trows div.tbody div.row { height: auto; }");
                    var t = Cache.load("statistic");
                    if (typeof t == "object" && t !== null) {
                        r = t
                    } else {
                        d("all", true)
                    }
                    if (!r.ver) {
                        d("all", true)
                    }
                    switch (r.ver) {
                        case 1:
                            d("job", true, 1);
                            d("duel", true, 1);
                            r.ver = 2;
                        case 2:
                            d("job", true, 1);
                            d("duel", true, 1);
                            r.ver = 3;
                        case 3:
                            d("chest", true, 1);
                            r.ver = 4
                    }
                    s = e.extend(true, {}, r);
                    GameInject.addTabOnMessagesWindow("Analisador de trabalhos", "analyser-job", function() {
                        T("job")
                    });
                    if (Settings.get("chestanalyser", true)) {
                        GameInject.ItemUse(v.add);
                        GameInject.addTabOnMessagesWindow("Analisador de cofres", "analyser-chest", function() {
                            v.show()
                        })
                    }
                    h.ready = true
                };
                h = Loader.add("Analyser", "tw-db Job-Analyser", p, {
                    Cache: true,
                    Settings: true,
                    Jobs: true
                });
                t.restore = function() {
                    r = e.extend(true, {}, s)
                };
                t.debug = function() {
                    console.log(r);
                    console.log(c)
                };
                var d = function(t, n, i) {
                    if (n == true) {
                        if (!i) {
                            var i = 0
                        } else {
                            var s = /\[report=([0-9]+)([A-Fa-f0-9]{10})\]/;
                            var o = String(i).match(s);
                            if (o) {
                                var i = o[1]
                            }
                        }
                        if (isNaN(parseInt(i, 10))) {
                            var u = 0
                        } else {
                            var u = parseInt(i, 10) - 1
                        }
                        switch (t) {
                            case "job":
                                r[t] = {
                                    last: u,
                                    items: {
                                        last: 0
                                    }
                                };
                                break;
                            case "duel":
                                r[t] = {
                                    last: u
                                };
                                break;
                            case "chest":
                                r[t] = {};
                                break;
                            case "all":
                                r = {
                                    ver: 4
                                };
                                d("job", true, u + 1);
                                d("duel", true, u + 1);
                                d("chest", true, u + 1);
                                break
                        }
                    } else {
                        var a = e('<div><h2>Do you really want to reset the ReportAnalyser statistics?</h2><span style="font-size:12px"><br />Give Report-Link of first Report which should be read after Reset</span></div>');
                        var f = (new west.gui.Textfield("twdb_analyser_last")).setSize(40);
                        f.setLabel("Report-Link:");
                        a.append(f.getMainDiv());
                        var l = new west.gui.Checkbox("or use all reports&nbsp;&nbsp;");
                        var c = new west.gui.Checkbox("or use only future reports");
                        l.setCallback(function(e) {
                            if (e) {
                                c.setSelected(false);
                                f.setValue("")
                            }
                        });
                        c.setCallback(function(e) {
                            if (e) {
                                l.setSelected(false);
                                f.setValue("")
                            }
                        });
                        e(f.getMainDiv()).find("span").css("font-size", "12px");
                        e(f.getMainDiv()).find("input").keyup(function() {
                            l.setSelected(false);
                            c.setSelected(false)
                        });
                        a.append(e('<div style="display:block;" />').append(l.getMainDiv()).append(c.getMainDiv()));
                        var h = new west.gui.Dialog("ReportAnalyser - Reset", a);
                        h.addButton("ok", function() {
                            if (l.isSelected()) {
                                d(t, true)
                            } else if (c.isSelected()) {
                                d(t, true, r[t].last + 1)
                            } else {
                                d(t, true, f.getValue())
                            }
                            h.hide();
                            MessagesWindow.open("analyser-" + t)
                        });
                        h.addButton("cancel");
                        h.show()
                    }
                };
                var v = function(e) {
                    var t = {};
                    t.add = function(e, t) {
                        var n = false;
                        for (i = 0; i < t.msg.effects.length; i += 1) {
                            var s = t.msg.effects[i];
                            if (s.type == "lottery" || s.type == "content") {
                                if (!isDefined(r.chest[e])) {
                                    r.chest[e] = {
                                        count: 0,
                                        items: {}
                                    }
                                }
                                var o = r.chest[e];
                                if (!n) {
                                    o.count++;
                                    n = true
                                }
                                s.items.each(function(e) {
                                    if (!isDefined(o.items[e.item_id])) {
                                        o.items[e.item_id] = 0
                                    }
                                    o.items[e.item_id] += e.count
                                })
                            } else if (s.type == "learn_recipe") TWDB.ClothCalc.recipes[s.recipe] = 1
                        }
                        Cache.save("statistic", r)
                    };
                    t.show = function() {
                        if (!MessagesWindow.window) {
                            return
                        }
                        var t = e(MessagesWindow.window.getContentPane()).find(".messages-analyser-chest");
                        MessagesWindow.window.showLoader();
                        t.children().remove();
                        var n = new west.gui.Scrollpane;
                        e(n.getMainDiv()).css("height", "385px");
                        t.append(n.getMainDiv());
                        for (var i in r.chest) {
                            var s = r.chest[i];
                            var o = (new tw2widget.Item(ItemManager.get(i), "item_inventory")).setCount(s.count);
                            o.getImgEl().addClass("item_inventory_img");
                            n.appendContent(e('<div style="float:left;position:relative;height:61px;width:61px;" />').append(o.getMainDiv()));
                            var u = 0;
                            var a = e('<div style="float:left;position:relative;width:610px;" />');
                            for (var f in s.items) {
                                u++;
                                var o = (new tw2widget.Item(ItemManager.get(f), "item_inventory")).setCount(s.items[f]);
                                o.getImgEl().addClass("item_inventory_img");
                                a.append(o.getMainDiv())
                            }
                            n.appendContent('<div style="float:left;position:relative;width:10px;height:' + String(Math.ceil(u / 10) * 61) + 'px;background: url(/images/window/report/devider_report.png) repeat-y;" />').appendContent(a).appendContent('<div style="clear:both;position:relative;height:10px;display:block;background: url(/images/window/dailyactivity/wood_devider_horiz.png) repeat-x;" />')
                        }
                        MessagesWindow.window.hideLoader()
                    };
                    return t
                }(e);
                var m = function(e) {
                    if (o) {
                        return
                    }
                    o = true;
                    u = [];
                    g(e)
                };
                var g = function(e, t) {
                    if (!t) {
                        t = 1
                    }
                    f = t;
                    Ajax.remoteCall("reports", "get_reports", {
                        page: t,
                        folder: e
                    }, function(t) {
                        y(e, t)
                    })
                };
                var y = function(e, t) {
                    var n = true;
                    if (typeof t.reports !== "object") {
                        t.reports = [];
                        n = false
                    }
                    if (typeof t.page == "undefined" || f !== t.page) {
                        t.reports = [];
                        n = false
                    }
                    for (var i = 0; i < t.reports.length; i++) {
                        var s = t.reports[i];
                        if (s.report_id <= r[e].last) {
                            n = false;
                            break
                        }
                        u.push({
                            id: s.report_id,
                            hash: s.hash,
                            type: e
                        })
                    }
                    l.bar.setMaxValue(u.length);
                    if (n) {
                        window.setTimeout(function() {
                            g(e, f + 1)
                        }, Timer.getTimeout())
                    } else {
                        b(e)
                    }
                };
                var b = function(e) {
                    if (u.length > 0) {
                        l.bar.setValue(l.bar.getValue() + 1);
                        w(u.pop())
                    } else {
                        Cache.save("statistic", r);
                        o = false;
                        T(e, true)
                    }
                };
                var w = function(t) {
                    e.post("game.php?window=reports&mode=show_report", {
                        flash: null,
                        hash: t.hash,
                        report_id: t.id
                    }, function(e) {
                        E(t.type, e)
                    }, "json")
                };
                var E = function(e, t) {
                    if (!t || !t.report_id || !t.publishHash) {
                        (new UserMessage("empty Server Response", UserMessage.TYPE_ERROR)).show();
                        return false
                    }
                    if (typeof t.page !== "string" || typeof t.title !== "string" || typeof t.js !== "string") {
                        a.push(t.report_id)
                    } else {
                        switch (e) {
                            case "job":
                                x(t);
                                break;
                            case "duel":
                                S(t);
                                break
                        }
                        r[e].last = t.report_id
                    }
                    window.setTimeout(function() {
                        b(e)
                    }, Timer.getTimeout())
                };
                var S = function(e) {};
                var x = function(n) {
                    try {
                        data = {
                            id: null,
                            hash: null,
                            job: null,
                            motivation: null,
                            duration: null,
                            wage: null,
                            bond: null,
                            experience: null,
                            injury: 0,
                            killed: false,
                            date_received: null,
                            items: {}
                        };
                        data.id = n.report_id;
                        data.hash = n.publishHash;
                        var i = Jobs.getJobByName(n.title.slice(n.title.indexOf(":") + 1));
                        if (!i) {
                            a.push(data.id);
                            return false
                        }
                        data.job = i.id;
                        data.date_received = n.date_received;
                        var s = e(n.page);
                        s.find(".rp_row_jobdata").each(function(t) {
                            var n = e.trim(e(this).children("span:last-child").html());
                            n = n.split("&nbsp;").join(" ");
                            switch (t) {
                                case 0:
                                    data.motivation = parseInt(n.slice(0, n.indexOf(" ")), 10);
                                    break;
                                case 1:
                                    var r = parseFloat(n);
                                    data.duration = r == 1 ? 3600 : r == 10 ? 600 : r == 15 ? 15 : null;
                                    if (!data.duration) Error.report({
                                        message: "Unrecognized time on report:" + n
                                    }, "Job-Analyser");
                                    break;
                                case 2:
                                    data.wage = parseInt(n.slice(n.indexOf(" ") + 1), 10);
                                    break;
                                case 3:
                                    data.bond = parseInt(n, 10);
                                    break;
                                case 4:
                                    data.experience = parseInt(n.slice(0, n.indexOf(" ")), 10);
                                    break
                            }
                        });
                        s.find(".rp_hurtmessage_text").each(function() {
                            var t = new RegExp("[0-9]+");
                            data.injury = Number(t.exec(e(this).html()))
                        });
                        s.find(".rp_row_killmessage").each(function() {
                            data.killed = true
                        });
                        var s = n.js.split(";");
                        e(s).each(function() {
                            var e = new RegExp(/\s*ItemManager\.get\(([0-9]+)\)\s*\)\.setCount\(([0-9]+)\)/m);
                            var t = e.exec(this);
                            if (t) {
                                data.items[Number(t[1])] = Number(t[2])
                            }
                        });
                        if (!r.job[data.job]) {
                            r.job[data.job] = {
                                count: 0,
                                products: {}
                            }
                        }
                        var o = r.job[data.job];
                        o.count++;
                        if (!o[data.motivation]) {
                            o[data.motivation] = {
                                count: 0,
                                duration: 0,
                                wage: 0,
                                bond: 0,
                                experience: 0,
                                injury: {},
                                killed: 0,
                                items: {},
                                extraitems: {}
                            }
                        }
                        var u = o[data.motivation];
                        if (!isDefined(u.duration)) {
                            u.duration = 0
                        }
                        u.count++;
                        u.duration += data.duration;
                        u.wage += data.wage;
                        u.bond += data.bond;
                        u.experience += data.experience;
                        if (!u.injury[data.injury]) {
                            u.injury[data.injury] = 0
                        }
                        u.injury[data.injury]++;
                        if (data.killed) {
                            u.killed++
                        }
                        for (var f in data.items) {
                            var l = Number(f);
                            var c = 138e3;
                            if (l === c) {
                                if (!isDefined(r.extra)) {
                                    r.extra = {
                                        count: 0
                                    };
                                    t.extra = true
                                }
                                r.extra.count++;
                                r.extra[r.extra.count] = data
                            }
                            var h = data.items[l];
                            var p = ItemManager.get(l);
                            if (Jobs.isProduct(l) !== -1) {
                                if (!o.products[l]) {
                                    o.products[l] = {
                                        last: 0
                                    }
                                }
                                var s = o.products[l];
                                for (var d = 0; d < h; d++) {
                                    var v = o.count - s.last;
                                    s.last = o.count;
                                    if (!s[v]) {
                                        s[v] = 0
                                    }
                                    s[v]++
                                }
                            } else if (p.price == 0) {
                                if (!u.extraitems[l]) {
                                    u.extraitems[l] = 0
                                }
                                u.extraitems[l]++
                            } else {
                                luck = true;
                                if (!u.items[l]) {
                                    u.items[l] = 0
                                }
                                u.items[l]++
                            }
                        }
                    } catch (m) {
                        a.push(data.id);
                        return false
                    }
                };
                var T = function(t, n) {
                    if (!MessagesWindow.window) {
                        return
                    }
                    l.window = e(MessagesWindow.window.getContentPane()).find(".messages-analyser-" + t);
                    if (typeof n == "undefined") {
                        MessagesWindow.window.showLoader();
                        l.bar = new west.gui.Progressbar(0, u.length);
                        l.window.children().remove();
                        l.window.append(l.bar.getMainDiv());
                        m(t)
                    } else {
                        switch (t) {
                            case "job":
                                var r = k();
                                break;
                            case "duel":
                                var r = showDuels();
                                break
                        }
                        l.window.children().remove();
                        l.window.append(r);
                        N();
                        C();
                        N();
                        MessagesWindow.window.hideLoader()
                    }
                };
                var N = function(t) {
                    try {
                        if (typeof t != "undefined") {
                            if (c.type == t) {
                                c.ord *= -1
                            } else {
                                c.ord = 1;
                                c.type = t
                            }
                        } else {
                            var t = c.type
                        }
                        var n = c.ord;
                        var r = function(r, i) {
                            var s = e(r).find(".cell_" + t).html();
                            var o = e(i).find(".cell_" + t).html();
                            if (Number(s) == s) {
                                return s * 1 > o * 1 ? n : -n
                            } else {
                                return s > o ? n : -n
                            }
                        };
                        l.rows.sort(r);
                        for (var i = 0; i < l.rows.length; i++) {
                            l.bodyscroll.appendContent(l.rows[i])
                        }
                    } catch (s) {
                        Error.report(s, "Analyser sort")
                    }
                };
                var C = function() {
                    switch (c.avg) {
                        case "avg":
                            c.avg = "sum";
                            break;
                        case "sum":
                            c.avg = "avg";
                            break
                    }
                    e(l.window).find("div.row div").each(function(t) {
                        var n = e(this).data(String(c.avg));
                        var r = e(this).data(String(c.avg) + "-t");
                        e(this).html(n).attr("title", r)
                    })
                };
                var k = function() {
                    l.window.addClass("view-rewards");
                    c = {
                        ord: 1,
                        type: 0,
                        avg: "avg"
                    };
                    var t = e('<div class="fancytable">' + '<div class="_bg tw2gui_bg_tl"></div>' + '<div class="_bg tw2gui_bg_tr"></div>' + '<div class="_bg tw2gui_bg_bl"></div>' + '<div class="_bg tw2gui_bg_br"></div>' + '<div class="trows">' + '<div class="thead statics">' + '<div class="row row_head">' + '<div class="cell_0 view-rewards view-items" style="width:91px; text-align:center;">' + '<span title="Nome" style="cursor:pointer, margin-bottom:3px;">' + '<img src="' + Images.iconName + '" />' + "</span>" + "</div>" + '<div class="cell_1 view-rewards view-items" style="width:50px; text-align:center;">' + '<span title="Quantidade">' + '<img src="' + Images.iconCount + '" />' + "</span>" + "</div>" + '<div class="cell_2 view-rewards view-items" style="width:50px; text-align:center;">' + '<span title="Duração">' + '<img src="' + Images.iconClock + '" />' + "</span>" + "</div>" + '<div class="cell_3 view-rewards" style="width:50px; text-align:center;">' + '<span title="Experiência">' + '<img src="' + Images.iconExperience + '" />' + "</span>" + "</div>" + '<div class="cell_4 view-rewards" style="width:50px; text-align:center;">' + '<span title="Salário">' + '<img src="' + Images.iconDollar + '" />' + "</span>" + "</div>" + '<div class="cell_5 view-rewards" style="width:50px; text-align:center;">' + '<span title="Título">' + '<img src="' + Images.iconUpb + '" />' + "</span>" + "</div>" + '<div class="cell_6 view-rewards" style="width:50px; text-align:center;">' + '<span title="Motivação">' + '<img src="' + Images.iconMoti + '" />' + "</span>" + "</div>" + '<div class="cell_7 view-rewards" style="width:50px; text-align:center;">' + '<span title="Perigo">' + '<img src="' + Images.iconDanger + '" />' + "</span>" + "</div>" + '<div class="cell_8 view-rewards" style="width:50px; text-align:center;">' + '<span title="Morto">' + '<img src="' + Images.iconKilled + '" />' + "</span>" + "</div>" + '<div class="cell_9 view-rewards" style="width:50px; text-align:center;">' + '<span title="Produtos">' + '<img src="' + Images.iconYield + '" />' + "</span>" + "</div>" + '<div class="cell_9 view-items" style="width:63px; text-align:center;">' + '<span title="Produtos">' + '<img src="' + Images.iconYield + '" />' + "</span>" + "</div>" + '<div class="cell_10 view-rewards" style="width:50px; text-align:center;">' + '<span title="Item">' + '<img src="' + Images.iconItem + '" />' + "</span>" + "</div>" + '<div class="cell_10 view-items" style="width:378px; text-align:center;">' + '<span title="Item">' + '<img src="' + Images.iconItem + '" />' + "</span>" + "</div>" + '<div class="cell_11 view-rewards" style="width:41px; text-align:center;">' + '<span title="Sorte">' + '<img src="' + Images.iconLuck + '" />' + "</span>" + "</div>" + '<div class="cell_reset view-rewards view-items" style="width:20px; text-align:right;">' + '<span title="Reset">' + '<img src="' + Images.iconReset + '" />' + "</span>" + "</div>" + "</div>" + "</div>" + '<div class="tbody">' + '<div class="_bg tw2gui_bg_l"></div>' + '<div class="_bg tw2gui_bg_r"></div>' + "</div>" + '<div class="tfoot statics">' + '<div class="row row_foot"></div>' + "</div>" + "</div>" + "</div>");
                    t.find(".row_head > div").each(function() {
                        var t = e(this).attr("class").match(/cell_(\d+|reset)/)[1],
                            n = e(this).find("img");
                        if (t == "reset") {
                            e(this).click(function() {
                                d("job")
                            })
                        } else {
                            e(this).click(function(e) {
                                return function() {
                                    N(e)
                                }
                            }(t * 1))
                        }
                    });
                    t.find(".row_head").find("img").css("cursor", "pointer");
                    var n = 0;
                    var i = {
                        jobs: 0,
                        count: 0,
                        duration: 0,
                        experience: 0,
                        wage: 0,
                        bond: 0,
                        motivation: 0,
                        injury: 0,
                        killed: 0,
                        products: 0,
                        items: 0,
                        luck: 0
                    };
                    var s = r.job;
                    var o = e();
                    l.rows = [];
                    for (var u in s) {
                        var a = Jobs.getJobById(u);
                        if (!a) {
                            continue
                        }
                        var f = {
                            count: 0,
                            duration: 0,
                            experience: 0,
                            wage: 0,
                            bond: 0,
                            motivation: 0,
                            injury: 0,
                            killed: 0,
                            products: 0,
                            items: 0,
                            luck: 0,
                            all_products: {},
                            all_items: {}
                        };
                        var h = s[u];
                        f.count = h.count;
                        var p = 0;
                        for (var n = 0; n < a.randomyields.length; n++) {
                            p += a.randomyields[n]
                        }
                        if (typeof a.yields.length == "undefined") {
                            for (var v in a.yields) {
                                p += a.yields[v].prop
                            }
                        }
                        for (var v in h.products) {
                            for (var m in h.products[v]) {
                                if (m == "last") {
                                    continue
                                }
                                var g = ItemManager.get(v);
                                f.products += Number(h.products[v][m]);
                                f.luck += Number(g.price * h.products[v][m]);
                                f.all_products[v] = (f.all_products[v] || 0) + h.products[v][m]
                            }
                        }
                        for (var y in h) {
                            if (y == "count" || y == "products") {
                                continue
                            }
                            var m = h[y];
                            f.motivation += y * m.count;
                            f.bond += m.bond;
                            f.duration += m.duration || 0;
                            f.experience += m.experience;
                            for (var b in m.injury) {
                                f.injury += b * m.injury[b]
                            }
                            for (var v in m.items) {
                                var g = ItemManager.get(v);
                                f.items += Number(m.items[v]);
                                f.luck += Number(g.price * m.items[v]);
                                f.all_items[v] = (f.all_items[v] || 0) + m.items[v]
                            }
                            f.killed += m.killed;
                            f.wage += m.wage
                        }
                        var w = e('<div class="row row_' + n + '" />');
                        var m = e('<div class="cell_0 view-rewards view-items" style="width:91px; text-align:left;cursor:pointer;font-size:11px;" ></div>');
                        m.data("sum", a.name);
                        m.data("sum-t", a.name);
                        m.data("avg", a.name);
                        m.data("avg-t", a.name);
                        w.append(m);
                        i.jobs++;
                        var m = e('<div class="cell_1 view-rewards view-items" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", f.count);
                        m.data("sum-t", f.count);
                        m.data("avg", f.count);
                        m.data("avg-t", f.count);
                        w.append(m);
                        i.count += f.count;
                        var m = e('<div class="cell_2 view-rewards view-items" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", (f.duration / 3600).round(2));
                        m.data("sum-t", String((f.duration / 3600).round(2)) + " Horas");
                        m.data("avg", (f.duration / (3600 * f.count)).round(2));
                        m.data("avg-t", "&Oslash; " + String((f.duration / (3600 * f.count)).round(2)) + " Horas");
                        w.append(m);
                        i.duration += f.duration;
                        var m = e('<div class="cell_3 view-rewards" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", f.experience);
                        m.data("sum-t", String(f.experience));
                        m.data("avg", (f.experience / f.count).round(2));
                        m.data("avg-t", "&Oslash; " + String((f.experience / f.count).round(2)));
                        w.append(m);
                        i.experience += f.experience;
                        var m = e('<div class="cell_4 view-rewards" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", f.wage);
                        m.data("sum-t", "$" + String(f.wage));
                        m.data("avg", (f.wage / f.count).round(2));
                        m.data("avg-t", "&Oslash; $" + String((f.wage / f.count).round(2)));
                        w.append(m);
                        i.wage += f.wage;
                        var m = e('<div class="cell_5 view-rewards" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", f.bond);
                        m.data("sum-t", String(f.bond));
                        m.data("avg", (f.bond / f.count * 100).round(2));
                        m.data("avg-t", "&Oslash; " + String((f.bond / f.count * 100).round(2)) + "%");
                        w.append(m);
                        i.bond += f.bond;
                        var m = e('<div class="cell_6 view-rewards" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", f.motivation);
                        m.data("sum-t", String(f.motivation) + "%");
                        m.data("avg", (f.motivation / f.count).round(2));
                        m.data("avg-t", "&Oslash; " + String((f.motivation / f.count).round(2)) + "%");
                        w.append(m);
                        i.motivation += f.motivation;
                        var m = e('<div class="cell_7 view-rewards" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", f.injury);
                        m.data("sum-t", String(f.injury));
                        m.data("avg", (f.injury / f.count).round(2));
                        m.data("avg-t", "&Oslash; " + String((f.injury / f.count).round(2)));
                        w.append(m);
                        i.injury += f.injury;
                        var m = e('<div class="cell_8 view-rewards" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", f.killed);
                        m.data("sum-t", String(f.killed));
                        m.data("avg", (f.killed / f.count * 100).round(2));
                        m.data("avg-t", "&Oslash; " + String((f.killed / f.count * 100).round(2)) + "%");
                        w.append(m);
                        i.killed += f.killed;
                        var m = e('<div class="cell_9 view-rewards" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", f.products);
                        m.data("sum-t", String(f.products));
                        m.data("avg", (f.products / f.count * 100).round(2));
                        m.data("avg-t", "&Oslash; " + String((f.products / f.count * 100).round(2)) + "% [" + p * 100 + "%]");
                        w.append(m);
                        i.products += f.products;
                        var m = e('<div class="cell_9 view-items" style="width:63px; text-align:center;cursor:pointer;" ></div>');
                        var E = e.map(f.all_products, function(e, t) {
                            return (new tw2widget.Item(ItemManager.get(t))).setCount(e).getMainDiv()
                        });
                        m.data("sum", E);
                        m.data("avg", E);
                        w.append(m);
                        var m = e('<div class="cell_10 view-rewards" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", f.items);
                        m.data("sum-t", String(f.items));
                        m.data("avg", (f.items / f.count * 100).round(2));
                        m.data("avg-t", "&Oslash; " + String((f.items / f.count * 100).round(2)) + "%");
                        w.append(m);
                        i.items += f.items;
                        var m = e('<div class="cell_10 view-items" style="width:390px; text-align:center;cursor:pointer;" ></div>');
                        var E = e.map(f.all_items, function(e, t) {
                            return (new tw2widget.Item(ItemManager.get(t))).setCount(e).getMainDiv()
                        });
                        m.data("sum", E);
                        m.data("avg", E);
                        w.append(m);
                        var m = e('<div class="cell_11 view-rewards" style="width:50px; text-align:center;cursor:pointer;" ></div>');
                        m.data("sum", f.luck);
                        m.data("sum-t", "$" + String(f.luck));
                        m.data("avg", (f.luck / f.count).round(2));
                        m.data("avg-t", "&Oslash; $" + String((f.luck / f.count).round(2)));
                        w.append(m);
                        i.luck += f.luck;
                        l.rows.push(w);
                        w.click(function() {
                            L(e(this).children(".cell_0").html())
                        });
                        n++
                    }
                    l.bodyscroll = new west.gui.Scrollpane;
                    e(l.bodyscroll.getMainDiv()).css("height", "300px");
                    t.find(".tbody").append(l.bodyscroll.getMainDiv());
                    l.footer = t.find(".row_foot");
                    var m = e('<div class="cell_0" style="width:71px; text-align:center;" ></div>');
                    m.data("sum", i.jobs);
                    m.data("sum-t", i.jobs + " Trabalhos");
                    m.data("avg", i.jobs);
                    m.data("avg-t", i.jobs + " Trabalhos");
                    l.footer.append(m);
                    var m = e('<div class="cell_0 view-rewards view-items" style="width:87px; text-align:center;cursor:pointer;color:#444;" ></div>');
                    m.mouseenter(function() {
                        e(this).css("color", "#888")
                    }).mouseleave(function() {
                        e(this).css("color", "#444")
                    });
                    m.click(function() {
                        C()
                    });
                    m.data("sum", "&sum;");
                    m.data("sum-t", "mudar para &Oslash;");
                    m.data("avg", "&Oslash;");
                    m.data("avg-t", "mudar para &sum;");
                    l.footer.append(m);
                    var m = e('<div class="cell_1 view-rewards view-items" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", i.count);
                    m.data("sum-t", i.count);
                    m.data("avg", i.count);
                    m.data("avg-t", i.count);
                    l.footer.append(m);
                    var m = e('<div class="cell_2 view-rewards view-items" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", (i.duration / 3600).round(2));
                    m.data("sum-t", String((i.duration / 3600).round(2)) + "Horas");
                    m.data("avg", (i.duration / (3600 * i.count)).round(2));
                    m.data("avg-t", "&Oslash; " + String((i.duration / (3600 * i.count)).round(2)) + "Horas");
                    l.footer.append(m);
                    var m = e('<div class="cell_3 view-rewards" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", i.experience);
                    m.data("sum-t", String(i.experience));
                    m.data("avg", (i.experience / i.count).round(2));
                    m.data("avg-t", "&Oslash; " + String((i.experience / i.count).round(2)));
                    l.footer.append(m);
                    var m = e('<div class="cell_4 view-rewards" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", i.wage);
                    m.data("sum-t", "$" + String(i.wage));
                    m.data("avg", (i.wage / i.count).round(2));
                    m.data("avg-t", "&Oslash; $" + String((i.wage / i.count).round(2)));
                    l.footer.append(m);
                    var m = e('<div class="cell_5 view-rewards" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", i.bond);
                    m.data("sum-t", String(i.bond));
                    m.data("avg", (i.bond / i.count * 100).round(2));
                    m.data("avg-t", "&Oslash; " + String((i.bond / i.count * 100).round(2)) + "%");
                    l.footer.append(m);
                    var m = e('<div class="cell_6 view-rewards" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", i.motivation);
                    m.data("sum-t", String(i.motivation) + "%");
                    m.data("avg", (i.motivation / i.count).round(2));
                    m.data("avg-t", "&Oslash; " + String((i.motivation / i.count).round(2)) + "%");
                    l.footer.append(m);
                    var m = e('<div class="cell_7 view-rewards" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", i.injury);
                    m.data("sum-t", String(i.injury));
                    m.data("avg", (i.injury / i.count).round(2));
                    m.data("avg-t", "&Oslash; " + String((i.injury / i.count).round(2)));
                    l.footer.append(m);
                    var m = e('<div class="cell_8 view-rewards" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", i.killed);
                    m.data("sum-t", String(i.killed));
                    m.data("avg", (i.killed / i.count * 100).round(2));
                    m.data("avg-t", "&Oslash; " + String((i.killed / i.count * 100).round(2)) + "%");
                    l.footer.append(m);
                    var m = e('<div class="cell_9 view-rewards" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", i.products);
                    m.data("sum-t", String(i.products));
                    m.data("avg", (i.products / i.count * 100).round(2));
                    m.data("avg-t", "&Oslash; " + String((i.products / i.count * 100).round(2)) + "%");
                    l.footer.append(m);
                    var m = e('<div class="cell_9 view-items" style="width:63px; text-align:center;" ></div>');
                    m.data("sum", i.products);
                    m.data("sum-t", String(i.products));
                    m.data("avg", (i.products / i.count * 100).round(2));
                    m.data("avg-t", "&Oslash; " + String((i.products / i.count * 100).round(2)) + "%");
                    l.footer.append(m);
                    var m = e('<div class="cell_10 view-rewards" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", i.items);
                    m.data("sum-t", String(i.items));
                    m.data("avg", (i.items / i.count * 100).round(2));
                    m.data("avg-t", "&Oslash; " + String((i.items / i.count * 100).round(2)) + "%");
                    l.footer.append(m);
                    var m = e('<div class="cell_10 view-items" style="width:390px; text-align:center;" ></div>');
                    m.data("sum", i.items);
                    m.data("sum-t", String(i.items));
                    m.data("avg", (i.items / i.count * 100).round(2));
                    m.data("avg-t", "&Oslash; " + String((i.items / i.count * 100).round(2)) + "%");
                    l.footer.append(m);
                    var m = e('<div class="cell_11 view-rewards" style="width:50px; text-align:center;" ></div>');
                    m.data("sum", i.luck);
                    m.data("sum-t", "$" + String(i.luck));
                    m.data("avg", (i.luck / i.count).round(2));
                    m.data("avg-t", "&Oslash; $" + String((i.luck / i.count).round(2)));
                    l.footer.append(m);
                    var o = e('<div style="margin: 0px 6px 0px 6px;width:680px;" />').append(e('<a href="#">Mudar entre recompensas e itens encontrados</a>').css({
                        marginTop: "-8px",
                        display: "block",
                        textAlign: "center"
                    }).click(function() {
                        e(".messages-analyser-job").toggleClass("view-rewards view-items")
                    })).append(t);
                    return o
                };
                var L = function(e) {};
                t.getExtra = function() {
                    if (isDefined(r.extra)) {
                        return r.extra
                    }
                    return null
                };
                return t
            }($);
            Debugger.Analyser = Analyser;
            var Notes = function(e) {
                var t = {};
                var n = null;
                var r = {};
                var i = function() {
                    if (r.ready) {
                        return
                    }
                    if (r.ready) {
                        return
                    }
                    if (Settings.get("notes", true)) {
                        GameInject.addTabOnMessagesWindow("Notas", "notes", function() {
                            s()
                        })
                    }
                    r.ready = true
                };
                r = Loader.add("Notes", "tw-db Notes", i, {
                    Cache: true,
                    Settings: true
                });
                var s = function() {
                    if (!w.MessagesWindow.window) {
                        return
                    }
                    n = e(w.MessagesWindow.window.getContentPane()).find(".messages-notes");
                    n.css("width", "680px").css("margin", "0 auto").css("position", "relative").css("top", "0");
                    a(Cache.load("notes"))
                };
                var o = function(e) {
                    Cache.save("notes", e);
                    (new UserMessage("Guardado com sucesso", UserMessage.TYPE_SUCCESS)).show()
                };
                var u = function(t) {
                    n.children().remove();
                    w.MessagesWindow.window.showLoader();
                    var r = (new west.gui.Textarea).setWidth(660).setHeight(300).setContent(t);
                    n.append(e('<div style="margin-left:8px" />').append((new west.gui.Bbcodes(r)).getMainDiv())).append(r.getMainDiv()).append(e('<div style="margin-left:8px" />').append((new west.gui.Button("Guardar".escapeHTML(), function() {
                        o(r.getContent());
                        a(r.getContent())
                    })).getMainDiv()).append((new west.gui.Button("Pré-visualizar".escapeHTML(), function() {
                        a(r.getContent())
                    })).getMainDiv()));
                    w.MessagesWindow.window.hideLoader()
                };
                var a = function(t) {
                    n.children().remove();
                    var r = new west.gui.Scrollpane;
                    e(r.getMainDiv()).css("height", "324px");
                    e(r.getMainDiv()).find(".tw2gui_scrollpane_clipper_contentpane").addClass("selectable");
                    n.append(e('<div style="margin:8px" />').append(r.getMainDiv())).append(e('<div style="margin-left:8px" />').append((new west.gui.Button("Guardar".escapeHTML(), function() {
                        o(t)
                    })).getMainDiv()).append((new west.gui.Button("Editar".escapeHTML(), function() {
                        u(t)
                    })).getMainDiv()));
                    if (t) {
                        w.MessagesWindow.window.showLoader();
                        Ajax.remoteCall("settings", "get_parsed_text", {
                            text: t
                        }, function(e) {
                            r.appendContent(w.Game.TextHandler.parse(e.parsed_text));
                            w.MessagesWindow.window.hideLoader()
                        })
                    }
                };
                return t
            }($);
            Debugger.Notes = Notes;
            var Map = function(e) {
                var t = {};
                var n = false;
                var r = 181;
                var i = 79;
                var s = 0;
                var o = 0;
                var u = {};
                var a = {};
                var f = null;
                var l = null;
                var c = {};
                var h = function() {
                    if (c.ready) {
                        return
                    }
                    if (Settings.get("showscrollto", true)) {
                        d()
                    }
                    Ajax.get("map", "get_minimap", {}, function(e) {
                        if (e.error) {
                            c.failed = true;
                            return (new UserMessage(e.msg)).show()
                        }
                        u = e.job_groups;
                        c.ready = true
                    })
                };
                c = Loader.add("Map", "tw-db Map", h, {
                    Settings: true
                });
                t.getNearestJob = function(e) {
                    var n = JobList.getJobById(e);
                    var r = u[n.groupid];
                    if (!r) {
                        return []
                    }
                    var i = [];
                    var s = t.getLastPosition();
                    for (var o = 0; o < r.length; o++) {
                        var a = r[o][0] - s.x;
                        var f = r[o][1] - s.y;
                        var l = Math.sqrt(a * a + f * f);
                        var c = window.Map.calcWayTime({
                            x: r[o][0],
                            y: r[o][1]
                        }, s);
                        var h = Number(Math.atan(f / a) * 180 / Math.PI).round(0);
                        if (a < 0) {
                            h -= 180
                        }
                        i.push({
                            dist: l,
                            time: c,
                            x: r[o][0],
                            y: r[o][1],
                            angle: h
                        })
                    }
                    var p = function(e, t) {
                        return e.dist * 1 > t.dist * 1 ? 1 : -1
                    };
                    i.sort(p);
                    return i
                };
                t.getLastPosition = function() {
                    var e = {
                        x: Character.position.x,
                        y: Character.position.y
                    };
                    var t = TaskQueue.queue;
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n].wayData;
                        if (r.x) {
                            e.x = r.x;
                            e.y = r.y
                        }
                    }
                    return e
                };
                t.setMinimapJob = function(t) {
                    if (f) {
                        window.clearInterval(l);
                        window.clearInterval(f)
                    }
                    var n = function(t) {
                        if (!MinimapWindow.window || e(MinimapWindow.window.divMain).find(".tw2gui_jobsearch_string").length == 0 || !e(MinimapWindow.window.divMain).find(".tw2gui_jobsearch_string").is(":visible")) {
                            return
                        }
                        window.clearInterval(f);
                        window.clearInterval(l);
                        f = null;
                        l = null;
                        MinimapWindow.resetSearchContext();
                        e("input.tw2gui_jobsearch_string", MinimapWindow.DOM).val(t).keyup()
                    };
                    l = setInterval(function() {
                        window.clearInterval(f);
                        window.clearInterval(l);
                        f = null;
                        l = null
                    }, 3e5);
                    f = setInterval(function() {
                        n(t)
                    }, 200)
                };
                var p = function(e) {
                    var n = false;
                    var u = 0;
                    var e = [];
                    var a = s;
                    var f = o;
                    for (var a = s; a <= r; a++) {
                        for (var f = o; f <= i; f++) {
                            u++;
                            e.push([a, f]);
                            if (u > 299) {
                                n = true;
                                break
                            }
                        }
                        if (n) {
                            break
                        }
                        o = 0
                    }
                    s = a;
                    o = f + 1;
                    if (e.length > 0) {
                        window.Map.Data.Loader.load(e, function() {
                            setTimeout(function() {
                                t.loadMap()
                            }, Timer.getTimeout())
                        })
                    }
                };
                t.loadMap = function() {
                    p()
                };
                var d = function() {
                    var t = "div#mmap_twdb_coords {position: absolute; bottom: 35px; left: 1px; display: block;}\n" + "div#mmap_twdb_coords > img {cursor:pointer; opacity:0.5; position:relative;}";
                    TWDB.Util.addCss(t, "minimap");
                    var n = function() {
                        var t = e('<div id="mmap_twdb_coords" />');
                        var n = new west.gui.Textfield;
                        var r = new west.gui.Textfield;
                        var i = "";
                        var s = "";
                        n.setWidth(45);
                        r.setWidth(45).setMaxLength(5);
                        var o = function() {
                            var e = Number(n.getValue());
                            var t = Number(r.getValue());
                            window.Map.center(e, t);
                            n.setValue("");
                            r.setValue("")
                        };
                        e(n.getMainDiv()).find("input").keyup(function(t) {
                            window.setTimeout(function() {
                                var u;
                                if (t.ctrlKey && t.keyCode === 86 && !t.altKey) {
                                    u = (new RegExp("^([0-9]{1,5})([^0-9]+)([0-9]{1,5})$")).exec(e.trim(n.getValue()));
                                    if (u) {
                                        n.setValue(u[1]);
                                        r.setValue(u[3]);
                                        e(r.getMainDiv()).find("input").focus();
                                        i = n.getValue();
                                        s = r.getValue();
                                        return
                                    }
                                    u = (new RegExp("^([0-9]{1,5})$")).exec(e.trim(n.getValue()));
                                    if (u) {
                                        n.setValue(u[1]);
                                        e(r.getMainDiv()).find("input").focus();
                                        i = n.getValue();
                                        return
                                    }
                                    n.setValue(i)
                                }
                                if (t.keyCode === 13) {
                                    return o()
                                }
                                if (String(e.trim(n.getValue())).length === 0) {
                                    i = n.getValue();
                                    return
                                }
                                u = (new RegExp("^([0-9]{1,5})$")).exec(e.trim(n.getValue()));
                                if (u) {
                                    n.setValue(u[1]);
                                    if (String(u[1]).length === 5) {
                                        e(r.getMainDiv()).find("input").focus()
                                    }
                                    i = n.getValue();
                                    return
                                }
                                n.setValue(i)
                            }, 100)
                        });
                        e(r.getMainDiv()).find("input").keyup(function(t) {
                            window.setTimeout(function() {
                                if (t.ctrlKey && t.keyCode == 86 && !t.altKey) {
                                    var n = (new RegExp("^([0-9]{1,5})$")).exec(e.trim(r.getValue()));
                                    if (n) {
                                        r.setValue(n[1]);
                                        e(r.getMainDiv()).find("input").focus();
                                        s = r.getValue();
                                        return
                                    }
                                    r.setValue(s)
                                }
                                if (t.keyCode == 13) {
                                    o();
                                    return
                                }
                                if (String(e.trim(r.getValue())).length == 0) {
                                    s = r.getValue();
                                    return
                                }
                                var n = (new RegExp("^([0-9]{1,5})$")).exec(e.trim(r.getValue()));
                                if (n) {
                                    r.setValue(n[1]);
                                    if (String(n[1]).length == 5) {
                                        e(r.getMainDiv()).find("input").focus()
                                    }
                                    s = r.getValue();
                                    return
                                }
                                r.setValue(s)
                            }, 100)
                        });
                        var u = (new west.gui.Button("Ok", function() {
                            o()
                        }, null, null, "Centralizar o mapa nas coordenadas dadas")).setWidth("48");
                        var a = e('<img title="Mostrar as coordenadas do mapa" src="' + Images.iconCount + '" />').click(function() {
                            if (e(this).css("opacity") === 1) {
                                e(this).css("opacity", "0.5");
                                window.Map.hideCoords()
                            } else {
                                e(this).css("opacity", "1");
                                window.Map.showCoords()
                            }
                        });
                        t.append(a, n.getMainDiv(), "<span>|</span>", r.getMainDiv(), e(u.getMainDiv()).css("top", "6px"));
                        e(".minimap-right", MinimapWindow.window.divMain).append(t)
                    };
                    GameInject.injectMinimap(function() {
                        n()
                    })
                };
                return t
            }($);
            _base.Map = Map;
            Debugger.Map = Map;
            var BonusJobs = function(e) {
                var t = {},
                    n, r = {},
                    i = {
                        gold: false,
                        silver: false
                    },
                    s = function() {
                        if (r.ready) {
                            return
                        }
                        if (!Settings.get("showbonusjobs", true)) {
                            r.ready = true;
                            return
                        }
                        var e, t, s, a, f = get_server_date(),
                            l = 1,
                            c = new Date;
                        c.setUTCHours(l);
                        c.setMinutes(15);
                        c.setSeconds(0);
                        c.setMilliseconds(0);
                        var h = c.getTime();
                        if (f.getUTCHours() < l || f.getUTCHours() == l && f.getMinutes() < 15) h -= 24 * 60 * 60 * 1e3;
                        n = Cache.load("bonusjobs") || {};
                        i = Cache.load("bonusdisplay") || {
                            gold: false,
                            silver: false
                        };
                        for (e in n) {
                            if (!n.hasOwnProperty(e)) {
                                continue
                            }
                            t = n[e];
                            s = 0;
                            for (a in t) {
                                if (!t.hasOwnProperty(a)) {
                                    continue
                                }
                                if (t[a].gold) {
                                    s++;
                                    continue
                                }
                                if (t[a].time > h) {
                                    s++
                                } else {
                                    delete t[a]
                                }
                            }
                            if (s == 0) {
                                delete n[e]
                            }
                        }
                        u();
                        o();
                        r.ready = true
                    };
                r = Loader.add("BonusJobs", "tw-db BonusJobs", s, {
                    Settings: true,
                    Cache: true,
                    Jobs: true
                });
                var o = function() {
                    var e = function(e) {
                        var t = window.Map.Helper.getPosition(e.parent);
                        if (!isDefined(t) || !isDefined(t.x) || !isDefined(t.y)) {
                            return
                        }
                        if (!isDefined(window.Map.JobHandler.Featured[t.x + "-" + t.y])) {
                            if (isDefined(n[t.x + "-" + t.y])) {
                                delete n[t.x + "-" + t.y];
                                Cache.save("bonusjobs", n)
                            }
                            return
                        }
                        var r = window.Map.JobHandler.Featured[t.x + "-" + t.y],
                            i;
                        n[t.x + "-" + t.y] = {};
                        for (i in r) {
                            if (!r.hasOwnProperty(i)) {
                                continue
                            }
                            n[t.x + "-" + t.y][i] = r[i];
                            n[t.x + "-" + t.y][i]["time"] = (new Date).getTime()
                        }
                        Cache.save("bonusjobs", n)
                    };
                    GameInject.injectRadialmenu(function(t) {
                        e(t)
                    })
                };
                var u = function() {
                    var t = "div#mmap_twdb_bonusjobs {position:absolute; top:40px; right:10px;}\n" + 'div#mmap_twdb_bonusjobs > input[type="checkbox"] {margin-left:6px; cursor:pointer;}\n' + "div#mmap_twdb_bonusjobs > div {position:relative; display:inline-block; height:9px; width:9px; margin:1px;}\n" + "div#mmap_twdb_bonusjobs > img {margin-left:3px; cursor:pointer; position:relative; display:inline-block; height:16px; width:16px; top:-4px;}";
                    TWDB.Util.addCss(t, "minimap");
                    var n = function() {
                        var t = e('<div id="mmap_twdb_bonusjobs" />').append(e('<input title="Mostrar trabalhos com bónus de ouro" type="checkbox" ' + (i.gold ? 'checked="checked"' : "") + " />").change(function() {
                            i.gold = e(this).is(":checked");
                            a()
                        })).append('<div title="Mostrar trabalhos com bónus de ouro" style="background-color:yellow; border:1px solid red;" />').append(e('<input title="Mostrar trabalhos com bónus de prata" type="checkbox" ' + (i.silver ? 'checked="checked"' : "") + " />").change(function() {
                            i.silver = e(this).is(":checked");
                            a()
                        })).append('<div title="Mostrar trabalhos com bónus de prata" style="background-color:white; border:1px solid black;" />').append(e('<img title="Trabalhos com bónus Exportar" src="' + Images.iconExport + '" />').click(function() {
                            f()
                        })).append(e('<img title="Trabalhos com bónus Importar" src="' + Images.iconImport + '" />').click(function() {
                            l()
                        })).append(e('<img title="Trabalhos com bónus Reset" src="' + Images.iconReset2 + '" />').click(function() {
                            c()
                        }));
                        e(MinimapWindow.window.divMain).find(".minimap-right").append(t);
                        a()
                    };
                    GameInject.injectMinimap(function() {
                        n()
                    })
                };
                var a = function() {
                    Cache.save("bonusdisplay", i);
                    e("#minimap_worldmap > div.TWDBbonusjob", MinimapWindow.window.divMain).remove();
                    var t = function(t, n, r, i, s) {
                        var o = .00513;
                        var u = parseInt(t * o, 10) - 3;
                        var a = parseInt(n * o, 10) + 2;
                        var f = "";
                        if (i > 1) {
                            f = "-moz-transform:rotate(45deg);-webkit-transform:rotate(45deg);-o-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);"
                        }
                        var l = e('<div class="TWDBbonusjob" style="z-index:7;position:absolute;display:block;width:4px;height:4px;background-color:' + (r ? "yellow" : "white") + ";left:" + u + "px;top:" + a + "px;" + f + "border:1px solid " + (r ? "red" : "black") + ';" />').click(function(e, t) {
                            return function() {
                                window.Map.center(e, t)
                            }
                        }(t, n)).addMousePopup('<div style="min-width:60px;text-align:center">' + s.join('<div class="marker_popup_divider"></div>') + "</div>");
                        e(MinimapWindow.window.divMain).find("#minimap_worldmap").append(l)
                    };
                    var r = n;
                    for (key in r) {
                        if (!r.hasOwnProperty(key)) {
                            continue
                        }
                        var s = r[key];
                        var o = false;
                        var u = 0;
                        var a = [];
                        for (var f in s) {
                            if (!s.hasOwnProperty(f)) {
                                continue
                            }
                            if (s[f].gold) {
                                if (!i.gold) {
                                    continue
                                }
                                o = true;
                                u++
                            }
                            if (s[f].silver) {
                                if (!i.silver) {
                                    continue
                                }
                                u++
                            }
                            var l = s[f].x;
                            var c = s[f].y;
                            job = JobList.getJobById(s[f].job_id);
                            a.push(Jobs.getPopup(s[f].job_id, s[f].gold ? "gold" : "silver"))
                        }
                        if (u > 0) {
                            t(l, c, o, u, a)
                        }
                    }
                };
                var f = function() {
                    var t = [];
                    for (var r in n) {
                        if (!n.hasOwnProperty(r)) {
                            continue
                        }
                        var i = n[r];
                        for (var s in i) {
                            if (!i.hasOwnProperty(s)) {
                                continue
                            }
                            var o = Jobs.getJobById(s);
                            var u = Math.ceil(i[s].x / 6635) + (i[s].y > 10176 ? 7 : 0);
                            t.push({
                                name: o.name,
                                bonus: i[s].gold ? "gold" : "silver",
                                country: u,
                                x: i[s].x,
                                y: i[s].y,
                                id: s
                            })
                        }
                    }
                    var a = e("<textarea />").css({
                        width: "500px",
                        height: "200px",
                        "background-color": "transparent",
                        "border-width": "0px"
                    }).click(function() {
                        this.select()
                    });
                    var f = "";
                    var l = 1;
                    var c = function(e) {
                        if (f !== e) {
                            f = e;
                            l = 1
                        } else {
                            l *= -1
                        }
                        var n = function(e, t) {
                            return e[f] > t[f] ? l : -1 * l
                        };
                        t.sort(n);
                        var r = "";
                        var i = "";
                        for (var s = 0; s < t.length; s++) {
                            var o = t[s];
                            if (f == "country" && i !== o.country) {
                                i = o.country;
                                r += "-- ?country " + i + " --" + "\n"
                            }
                            r += o.name + "; " + o.bonus + "; " + o.x + "-" + o.y + "; " + o.id + "\n"
                        }
                        a.val(r)
                    };
                    c("name");
                    var h = e("<div />").css({
                        width: "500px",
                        height: "22px",
                        position: "relative",
                        display: "block"
                    }).append(e('<img src="' + Images.iconName + '" title=" Ordenar por nome "  style="margin:0px 2px 0px 2px;cursor:pointer;" />').click(function() {
                        c("name")
                    })).append(e('<img src="' + Images.iconCount + '" title=" Ordenar por condado " style="margin:0px 2px 0px 2px;cursor:pointer;" />').click(function() {
                        c("country")
                    }));
                    (new west.gui.Dialog("Trabalhos com bónus Exportar", e("<div />").append(h).append(a))).addButton("ok").show()
                };
                var l = function() {
                    var t = e("<textarea />").css({
                        width: "400px",
                        height: "100px"
                    });
                    var r = function() {
                        var r = t.val(),
                            i = r.split(/[\n,\r,\r\n]/),
                            s, o, u, f, l, c;
                        for (s = 0; s < i.length; s++) {
                            o = i[s].split(";", 4);
                            if (o.length !== 4 || !e.isNumeric(o[3]) || !Jobs.getJobById(Number(o[3]))) {
                                continue
                            }
                            u = String(o[2]).split("-", 2);
                            if (u.length !== 2 || !e.isNumeric(u[0]) || !e.isNumeric(u[1])) {
                                continue
                            }
                            f = Number(o[3]);
                            l = {
                                gold: e.trim(o[1]) == "gold" ? true : false,
                                group_id: Jobs.getJobById(f).groupid,
                                job_id: f,
                                silver: e.trim(o[1]) == "gold" ? false : true,
                                x: Number(u[0]),
                                y: Number(u[1]),
                                time: (new Date).getTime()
                            };
                            c = Number(u[0]) + "-" + Number(u[1]);
                            if (!isDefined(n[c])) {
                                n[c] = {}
                            }
                            n[c][f] = l
                        }
                        Cache.save("bonusjobs", n);
                        a()
                    };
                    (new west.gui.Dialog("Trabalhos com bónus Importar", t)).addButton("ok", r).addButton("cancel").show()
                };
                var c = function(e) {
                    try {
                        if (e) {
                            for (var t in n) {
                                if (!n.hasOwnProperty(t)) {
                                    continue
                                }
                                var r = n[t];
                                var i = 0;
                                for (var s in r) {
                                    if (!r.hasOwnProperty(s)) {
                                        continue
                                    }
                                    if (e == "gold" && r[s].gold) {
                                        i++;
                                        continue
                                    }
                                    if (e == "silver" && r[s].silver) {
                                        i++;
                                        continue
                                    }
                                    delete r[s]
                                }
                                if (i == 0) {
                                    delete n[t]
                                }
                            }
                            Cache.save("bonusjobs", n);
                            a();
                            (new UserMessage("Trabalhos com bónus Reset", UserMessage.TYPE_SUCCESS)).show()
                        } else {
                            var o = "tw-db Trabalhos com bónus Reset";
                            var u = '<div class="txcenter">Trabalhos com bónus Reset</div>';
                            (new west.gui.Dialog(o, u, west.gui.Dialog.SYS_QUESTION)).addButton("Todos", function() {
                                c("all")
                            }).addButton("Trabalhos ouro", function() {
                                c("silver")
                            }).addButton("Trabalhos prata", function() {
                                c("gold")
                            }).addButton("cancel").show()
                        }
                    } catch (f) {
                        Error.report(f, "bonusjob reset")
                    }
                };
                return t
            }($);
            Debugger.BonusJobs = BonusJobs;
            var Chat = function(e) {
                var t = {};
                var n = false;
                var i = {
                    ":/": "sore",
                    "=:)": "invader",
                    ">:(": "angry",
                    ":'(": "cry",
                    ":)": "smile",
                    ":D": "grin",
                    ":(": "frown",
                    ";)": "smirk",
                    ":P": "tongue",
                    ":o": "ohmy",
                    ":x": "muted",
                    ":|": "silent",
                    ">.<": "palm",
                    "-.-": "nc",
                    "o.O": "oo",
                    "O.o": "oo",
                    "^_^": "happy",
                    o_O: "oo",
                    "x.x": "xx",
                    "T.T": "cry",
                    "el pollo diablo!": "elpollodiablo",
                    "!el pollo diablo": "elpollodiablo_mirror",
                    "el pollo diablo?!": "elpollodiablo_front",
                    "add me": "sheep.gif",
                    "add me!": "sheep_rainbow.gif"
                };
                var s = [];
                var o = {};
                var u = function() {
                    if (o.ready) {
                        return
                    }
                    if (Settings.get("chat", true)) {
                        GameInject.ChatLayout(function(e) {
                            f(e)
                        });
                        GameInject.ChatSend(function(e) {
                            a(e)
                        });
                        var e = Cache.load("chathistory");
                        if (typeof e == "object" && e !== null) {
                            if (e.color) {
                                e = e.color;
                                Cache.save("chathistory", e)
                            }
                            s = e
                        }
                        if ($("div.tw2gui_window.chat.nominimize div.tw2gui_window_buttons_close").click().length > 0) {
                            ChatWindow.open()
                        }
                    }
                    o.ready = true
                };
                o = Loader.add("Chat", "tw-db Chat Enhancement", u, {
                    Settings: true,
                    Cache: true
                });
                var a = function(e) {
                    var t = e.input.val();
                    if (!t) {
                        return
                    }
                    var n = function(t) {
                        if (e._caps) {
                            t = t.toUpperCase()
                        }
                        if (e._bold) {
                            t = t.replace(/\*/g, "~");
                            t = "*" + t + "*"
                        }
                        return t
                    };
                    if (t.substr(0, 1) == "/") {
                        r = new RegExp("^\\/(tell|msg)\\s+([^:]+):(.+)$");
                        v = t.match(r);
                        if (v) {
                            if (e._color) {
                                t = "/tell " + v[2] + ":/" + e._color + n(v[3])
                            } else {
                                t = "/tell " + v[2] + ":" + n(v[3])
                            }
                        }
                        e.input.val(t);
                        return
                    }
                    t = n(t);
                    if (e._color) {
                        t = "/" + e._color + t
                    }
                    e.input.val(t);
                    return
                };
                var f = function(e) {
                    var t = e.mainDiv.find(".TWDBchat");
                    if (t.length == 0) {
                        e.mainDiv.find(".chat_input").find(".cbg").css("left", "38px").addClass(".TWDBchat");
                        e._color = null;
                        e._bold = false;
                        e._caps = false;
                        l(e);
                        m(e)
                    }
                };
                var l = function(t) {
                    var n;
                    var r = e('<span style="padding:3px;display:none;width:160px;position:absolute;bottom:20px;left:-3px;" />');
                    for (var s in i) {
                        n = i[s].indexOf(".gif") === -1 ? i[s] + ".png" : i[s];
                        r.append(e('<img src="' + Game.cdnURL + "/images/chat/emoticons/" + n + '?1" title="' + s + '" style="cursor:pointer;margin:1px;" />').click(function(e) {
                            return function() {
                                t.input.val(t.input.val() + " " + e + " ");
                                t.input.focus();
                                r.hide()
                            }
                        }(s)))
                    }
                    var o = false;
                    t.mainDiv.find(".chat_input").append(e('<div style="position:absolute;width:15px;height:15px;bottom:7px;vertical-align:top;left:23px;cursor:pointer;" />').append(e('<img style="vertical-align:top;" src="' + Images.iconChatSM + '" />')).append(r).hover(function() {
                        o = true;
                        r.show()
                    }, function() {
                        o = false;
                        setTimeout(function() {
                            if (!o) {
                                r.hide()
                            }
                        }, 200)
                    }))
                };
                var c = function(e) {
                    var t = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    if (t) {
                        return String(parseInt(t[1] * 9 / 255 + .5, 10)) + String(parseInt(t[2] * 9 / 255 + .5, 10)) + String(parseInt(t[3] * 9 / 255 + .5, 10))
                    } else {
                        return "000"
                    }
                };
                var h = function(e) {
                    return "rgb(" + parseInt(e[0] * 255 / 9, 10) + "," + parseInt(e[1] * 255 / 9, 10) + "," + parseInt(e[2] * 255 / 9, 10) + ")"
                };
                var p = function(e, t) {
                    if (isDefined(t.color)) {
                        var n = c(t.color);
                        var r = s.length;
                        for (var i = 0; i < r; i++) {
                            var o = s.shift();
                            if (o !== n) {
                                s.push(o)
                            }
                        }
                        s.push(n);
                        if (s.length > 5) {
                            s.shift()
                        }
                        Cache.save("chathistory", s);
                        e._color = n
                    }
                    if (t.color === null) {
                        e._color = null
                    }
                    if (isDefined(t.bold)) {
                        e._bold = t.bold
                    }
                    if (isDefined(t.caps)) {
                        e._caps = t.caps
                    }
                    if (e._bold) {
                        e.mainDiv.find(".TWDBtext").css("font-weight", "bold")
                    } else {
                        e.mainDiv.find(".TWDBtext").css("font-weight", "normal")
                    }
                    if (e._caps) {
                        e.mainDiv.find(".TWDBtext").html("A")
                    } else {
                        e.mainDiv.find(".TWDBtext").html("a")
                    }
                    if (e._color) {
                        e.mainDiv.find(".TWDBcolor").children("div").children("div").css("background-color", h(e._color));
                        if (e._color[1] >= 4) {
                            e.mainDiv.find(".TWDBtext").css("color", "#000")
                        } else {
                            e.mainDiv.find(".TWDBtext").css("color", "#fff")
                        }
                    } else {
                        e.mainDiv.find(".TWDBcolor").children("div").children("div").css("background-color", "#e0e2e0");
                        e.mainDiv.find(".TWDBtext").css("color", "#000")
                    }
                    e.input.focus()
                };
                var d = function(t) {
                    return e('<div style="position:absolute;display:block;width:15px;height:15px;"/>').append(e('<div style="position:absolute;width:15px;height:1px;top:7px;left:0px;background-color:' + t + ';opacity:0.1;" />')).append(e('<div style="position:absolute;width:1px;height:15px;top:0px;left:7px;background-color:' + t + ';opacity:0.1;" />')).append(e('<div style="position:absolute;width:15px;height:3px;top:6px;left:0px;background-color:' + t + ';opacity:0.33;" />')).append(e('<div style="position:absolute;width:3px;height:15px;top:0px;left:6px;background-color:' + t + ';opacity:0.33;" />')).append(e('<div style="position:absolute;width:15px;height:5px;top:5px;left:0px;background-color:' + t + ';opacity:0.47;" />')).append(e('<div style="position:absolute;width:5px;height:15px;top:0px;left:5px;background-color:' + t + ';opacity:0.47;" />')).append(e('<div style="position:absolute;width:13px;height:9px;top:3px;left:1px;background-color:' + t + ';opacity:0.6;" />')).append(e('<div style="position:absolute;width:9px;height:13px;top:1px;left:3px;background-color:' + t + ';opacity:0.6;" />')).append(e('<div style="position:absolute;width:11px;height:11px;top:2px;left:2px;background-color:' + t + ';opacity:0.8;" />')).append(e('<div style="position:absolute;width:13px;height:7px;top:4px;left:1px;background-color:' + t + ';" />')).append(e('<div style="position:absolute;width:7px;height:13px;top:1px;left:4px;background-color:' + t + ';" />')).append(e('<div style="position:absolute;width:9px;height:11px;top:2px;left:3px;background-color:' + t + ';" />')).append(e('<div style="position:absolute;width:11px;height:9px;top:3px;left:2px;background-color:' + t + ';" />'))
                };
                var m = function(t) {
                    try {
                        var n = e('<span style="position:relative;display:none;padding:3px;width:300px;position:absolute;bottom:17px;left:-5px;" />');
                        n.append('<div style="position:absolute;height: 50px; width:25;display:block" />');
                        var r = ["black", "red", "blue", "yellow", "green", "brown", "magenta", "gray"];
                        n.append(e('<div style="display:inline-block;width:15px;height:15px;padding:2px;opacity:0.5;"/>').append(d("#e0e2e0")).append(e('<div style="position:absolute;width:15px;height:15px;" ><table border="0" cellspacing="0" cellpadding="0" style="padding:0px;margin:0px;border:0px;" ><tr><td style="display:block;width:15px;height:15px;vertical-align:top;text-align:center;font-size:11px;color:#000;font-weight:bold;">a</td></tr></table></div>')).click(function() {
                            if (e(this).css("opacity") == .5) {
                                p(t, {
                                    bold: true
                                });
                                e(this).css("opacity", 1)
                            } else {
                                p(t, {
                                    bold: false
                                });
                                e(this).css("opacity", .5)
                            }
                            n.hide()
                        }));
                        n.append(e('<div style="display:inline-block;width:15px;height:15px;padding:2px;opacity:0.5;"/>').append(d("#e0e2e0")).append(e('<div style="position:absolute;width:15px;height:15px;" ><table border="0" cellspacing="0" cellpadding="0" style="padding:0px;margin:0px;border:0px;" ><tr><td style="display:block;width:15px;height:15px;vertical-align:top;text-align:center;font-size:11px;color:#000;">A</td></tr></table></div>')).click(function() {
                            if (e(this).css("opacity") == .5) {
                                p(t, {
                                    caps: true
                                });
                                e(this).css("opacity", 1)
                            } else {
                                p(t, {
                                    caps: false
                                });
                                e(this).css("opacity", .5)
                            }
                            n.hide()
                        }));
                        for (var i = 0; i < r.length; i++) {
                            n.append(e('<div style="display:inline-block;width:15px;height:15px;padding:2px;"/>').append(d(r[i])).click(function() {
                                p(t, {
                                    color: e(this).children("div").children("div").css("background-color")
                                });
                                n.hide()
                            }))
                        }
                        n.append(e('<div style="margin:2px;display:inline-block;vertical-align:top;width:15px;height:15px;background:url(' + Images.iconChatNoColor + ')no-repeat 0px 0px transparent;"/>').click(function() {
                            p(t, {
                                color: null
                            });
                            n.hide()
                        }));
                        n.append(e('<div style="margin:3px;display:inline-block;vertical-align:top;width:13px;height:13px;background:url(' + Images.iconChat + ')no-repeat 0px 0px transparent;"/>').click(function() {
                            g(t);
                            n.hide()
                        }));
                        var s = false;
                        t.mainDiv.find(".chat_input").append(e('<div class="TWDBcolor" style="position:absolute;width:15px;height:15px;bottom:7px;vertical-align:top;left:5px;cursor:pointer;" />').append(d("#e0e2e0")).append(e('<div style="position:absolute;width:15px;height:15px;" ><table border="0" cellspacing="0" cellpadding="0" style="padding:0px;margin:0px;border:0px;" ><tr><td class="TWDBtext" style="display:block;width:15px;height:15px;vertical-align:top;text-align:center;font-size:11px;color:#000;">a</td></tr></table></div>')).append(n).hover(function() {
                            s = true;
                            n.show()
                        }, function() {
                            s = false;
                            setTimeout(function() {
                                if (!s) {
                                    n.hide()
                                }
                            }, 200)
                        }))
                    } catch (o) {
                        Error.report(o, "injectColor")
                    }
                };
                var g = function(t) {
                    var n = t.mainDiv.find(".TWDBcolor").children("div").children("div");
                    var r = c(n.css("background-color"));
                    var i = {};
                    i.customColor = e('<div style="width:50px;height:50px;display:inline-block;vertical-align:top;margin: 5px;" />');
                    i.customColor.css("background-color", h(c(n.css("background-color"))));
                    var o = function(e, t) {
                        if (t && r[e] == 9 || !t && r[e] == 0) {
                            return
                        }
                        var n = [Number(r[0]), Number(r[1]), Number(r[2])];
                        n[e] += t ? 1 : -1;
                        r = String(n[0]) + String(n[1]) + String(n[2]);
                        i.input.val(r);
                        if (r[e] == 0) {
                            i.plusminus[e].children(".butMinus").css("opacity", .3)
                        } else {
                            i.plusminus[e].children(".butMinus").css("opacity", 1)
                        }
                        if (r[e] == 9) {
                            i.plusminus[e].children(".butPlus").css("opacity", .3)
                        } else {
                            i.plusminus[e].children(".butPlus").css("opacity", 1)
                        }
                        i.customColor.css("background-color", h(r))
                    };
                    var u = e('<div style="width:42px;height:48px;display:inline-block;vertical-align:top;margin: 6px 5px 6px 5px;" />');
                    i.plusminus = [];
                    for (var a = 0; a < 3; a++) {
                        switch (a) {
                            case 0:
                                var f = "#f00";
                                break;
                            case 1:
                                var f = "#0f0";
                                break;
                            case 2:
                                var f = "#00f";
                                break
                        }
                        i.plusminus[a] = e('<div class="tw2gui_plusminus" style="display:inline-block;background-color:' + f + ';width:12px;height:46px;padding:1px;"><span class="butPlus" style="cursor:pointer;"></span><span style="width:12px;height:10px;display:inline-block;"></span><span class="butMinus" style="cursor:pointer;"></span></div>');
                        i.plusminus[a].children(".butMinus").click(function(e) {
                            return function() {
                                o(e, false)
                            }
                        }(a));
                        i.plusminus[a].children(".butPlus").click(function(e) {
                            return function() {
                                o(e, true)
                            }
                        }(a));
                        if (r[a] == 0) {
                            i.plusminus[a].children(".butMinus").css("opacity", .3)
                        }
                        if (r[a] == 9) {
                            i.plusminus[a].children(".butPlus").css("opacity", .3)
                        }
                        u.append(i.plusminus[a])
                    }
                    u.append(i.plusminus[0]).append(i.plusminus[1]).append(i.plusminus[2]);
                    i.input = e('<input maxLength="3" type="text" value="' + r + '" style="position: relative; top: -35px; left: 2px;color: rgb(255, 255, 255); font-weight: bold; letter-spacing: 6px; text-shadow: 1px 1px 1px rgb(0, 0, 0); width: 43px; background: none repeat scroll 0pt 0pt transparent; border: medium none; height: 18px; line-height: 18px; margin: 0pt; outline: medium none;" />');
                    i.input.keyup(function() {
                        var e = i.input.val();
                        if (e.length < 3) {
                            return
                        }
                        if (!e.match(/(\d){3}/)) {
                            i.input.val(r);
                            return
                        }
                        r = e;
                        for (var t = 0; t < 3; t++) {
                            if (r[t] == 0) {
                                i.plusminus[t].children(".butMinus").css("opacity", .3)
                            } else {
                                i.plusminus[t].children(".butMinus").css("opacity", 1)
                            }
                            if (r[t] == 9) {
                                i.plusminus[t].children(".butPlus").css("opacity", .3)
                            } else {
                                i.plusminus[t].children(".butPlus").css("opacity", 1)
                            }
                        }
                        i.customColor.css("background-color", h(r));
                        i.input.attr("value", r)
                    });
                    u.append(i.input);
                    var l = {
                        bold: t._bold,
                        caps: t._caps
                    };
                    var d = e('<div style="height:50px;display:inline-block;vertical-align:top;margin: 5px;" />');
                    var v = new west.gui.Checkbox("*negrito*", l.bold ? "tw2gui_checkbox_checked" : "", function() {
                        l.bold = l.bold ? false : true
                    });
                    e(v.getMainDiv()).css("display", "block").css("margin-bottom", "5px");
                    d.append(v.getMainDiv());
                    var v = new west.gui.Checkbox("CAPITALIZAR", l.caps ? "tw2gui_checkbox_checked" : "", function() {
                        l.caps = l.caps ? false : true
                    });
                    d.append(v.getMainDiv());
                    var m = e('<div style="width:160px;height:50px;display:inline-block;vertical-align:top;border: 1px solid #000;padding: 0px;margin: 5px;" />');
                    m.append('<span style="width:140px;height:15px;display:inline-block;text-align:center;padding: 4px 0px 2px 0px;font-size:11px;">história</span>');
                    for (var a = 0; a < s.length; a++) {
                        var g = e('<div style="width:20px;height:20px;display:inline-block;vertical-align:top;margin: 0px 0px 0px 10px;cursor:pointer;background-color:' + h(s[a]) + ';" />');
                        g.click(function() {
                            p(t, {
                                color: e(this).css("background-color"),
                                bold: l.bold,
                                caps: l.caps
                            });
                            i.colorBox.hide()
                        });
                        m.append(g)
                    }
                    var y = e("<div />").append(i.customColor).append(u).append(d).append(m);
                    i.colorBox = new west.gui.Dialog("Cor", y);
                    i.colorBox.addButton("ok", function() {
                        p(t, {
                            color: e(i.customColor).css("background-color"),
                            bold: l.bold,
                            caps: l.caps
                        })
                    });
                    i.colorBox.addButton("cancel");
                    i.colorBox.show()
                };
                return t
            }(jQuery);
            Debugger.Chat = Chat;
            var SellTip = function(e) {
                var t = {};
                var n = false;
                var r = {};
                var i = function() {
                    if (r.ready) {
                        return
                    }
                    if (Settings.get("sellTip", true)) {
                        GameInject.injectItem("Inventory", "sellTip", function(e) {
                            setTimeout(function() {
                                return s(e)
                            }, 0)
                        })
                    }
                    r.ready = true
                };
                r = Loader.add("sellTip", "tw-db sellTip", i, {
                    Settings: true,
                    ClothCalc: true
                });
                var s = function(e) {
                    var t = e.obj.item_id;
                    var n = w.ItemManager.get(t);
                    var r = false;
                    var i = "";
                    if (!n.sellable && !n.auctionable) {
                        return
                    }
                    if (Settings.get("sellTip1", true)) {
                        var s = w.Bag.getItemByItemId(n.item_id);
                        var o = w.Wear.wear[n.type];
                        if (s || o && o.obj.item_id == n.item_id) {
                            var u = (s !== undefined ? s.count : 0) + (o !== undefined && o.obj.item_id == n.item_id ? 1 : 0);
                            if (u > 1) {
                                r = true;
                                i = "Tens este item mais que uma vez".escapeHTML()
                            }
                        }
                    }
                    if (Settings.get("sellTip2", true) && ClothCalc.isLoaded()) {
                        if (!ClothCalc.isUsedItem(n.item_id)) {
                            r = true;
                            i = "Este item não é usado em nenhum trabalho ou definição personalizada da Cloth Calc, por isso, pode ser vendido.".escapeHTML()
                        }
                    }
                    if (Settings.get("sellTip3", true)) {
                        if (n.named) {
                            r = false
                        }
                    }
                    if (Settings.get("sellTip4", true)) {
                        if (n.traderlevel === null || n.traderlevel > 20) {
                            r = false
                        }
                    }
                    if (Settings.get("sellTip5", true)) {
                        if (n.set) {
                            r = false
                        }
                    }
                    e.divMain.find(".TWDBsellTip").remove();
                    if (r) {
                        e.divMain.append('<img src="' + Images.iconSell + '" class="TWDBsellTip" title="' + i + '" title=" Ainda não possuis este item " style="position:absolute;bottom:4px;right:0px;width:19px;height:19px;padding:0px;border:0px;margin:0px;" />')
                    }
                };
                return t
            }($);
            Debugger.SellTip = SellTip;
            var Collector = function(e) {
                var t = {};
                var n = false;
                var r = {};
                var i = function() {
                    if (r.ready) {
                        return
                    }
                    if (Settings.get("collector", true)) {
                        GameInject.injectItem("Trader", "collector", function(e) {
                            return s(e)
                        });
                        GameInject.injectTrader("collector", function(e) {
                            if (t.isNewItem(e.item_id)) {
                                var n = '<img src="' + Images.iconNew + '" class="TWDBcollector" title=" Ainda não possuis este item " ' + ' style="position:absolute;top:0px;left:0px;padding:0px;border:0px;margin:0px;" />';
                                return n
                            }
                            return ""
                        });
                        GameInject.injectMarket("collector", function(e) {
                            return o(e)
                        });
                        GameInject.injectGetBids()
                    }
                    r.ready = true
                };
                r = Loader.add("Collector", "tw-db Collector", i, {
                    Settings: true
                });
                t.isNewItem = function(e) {
                    var t = w.ItemManager.get(e);
                    var n = w.Bag.getItemsIdsByBaseItemId(t.item_base_id);
                    var r = w.Wear.wear[t.type];
                    var i = r && r.obj.item_base_id == t.item_base_id;
                    var s = TWDB.ClothCalc.bids[t.item_id];
                    var o = TWDB.ClothCalc.recipes[t.item_id];
                    if (n.length || i || s || o) {
                        return false
                    } else {
                        return true
                    }
                };
                var s = function(e) {
                    e.divMain.find(".TWDBcollector").remove();
                    if (t.isNewItem(e.obj.item_id)) {
                        e.divMain.append('<img src="' + Images.iconNew + '" class="TWDBcollector" title=" Ainda não possuis este item " style="position:absolute;top:-8px;left:-15px;padding:0px;border:0px;margin:0px;" />')
                    }
                };
                var o = function(e) {
                    if (t.isNewItem(e)) {
                        return '<img src="' + Images.iconNew + '" class="TWDBcollector" title=" Ainda não possuis este item " style="width:18px;height:18px;position:relative;top:0px;left:0px;padding:0px;border:0px;margin:0px;" />'
                    } else {
                        return ""
                    }
                };
                return t
            }($);
            Debugger.Collector = Collector;
            var BuyTip = function(e) {
                var t = {};
                var n = false;
                var r = {};
                var i = 0;
                var s = {};
                var o = {};
                var u = function() {
                    if (o.ready) {
                        return
                    }
                    if (Settings.get("buyTip", true)) {
                        GameInject.injectItem("Trader", "buytip", function(e) {
                            return f(e, "trader")
                        });
                        GameInject.injectTrader("buytip", function(e) {
                            return a(e)
                        });
                        GameInject.injectMarket("buytip", function(e) {
                            return f(e, "market")
                        })
                    }
                    Eventer.set("TWDBdataLoaded", function() {
                        t.reset()
                    });
                    if (!Updater.wasUpdated()) {
                        r = Cache.load("betteritems");
                        if (r == null || typeof r !== "object") {
                            r = {}
                        }
                    }
                    o.ready = true
                };
                o = Loader.add("BuyTip", "tw-db BuyTip", u, {
                    Settings: true,
                    Cache: true,
                    Collector: true,
                    ClothCalc: true,
                    Calc: true
                });
                t.reset = function() {
                    r = {};
                    Cache.save("betteritems", r)
                };
                var a = function(e) {
                    n = e.item_id;
                    if (!Collector.isNewItem(n) || isDefined(r[n]) && r[n].length == 0) {
                        return ""
                    }
                    if (isDefined(r[n])) {
                        var t = h(n);
                        if (isDefined(t)) {
                            t.css({
                                bottom: "45px",
                                right: "11px"
                            })
                        }
                        return t
                    }
                    l(n);
                    var t = h(n);
                    if (isDefined(t)) {
                        t.css({
                            bottom: "45px",
                            right: "11px"
                        })
                    }
                    return t
                };
                var f = function(e, t) {
                    if (t == "shop") {
                        n = e.item_id
                    } else {
                        n = t == "market" ? e : e.obj.item_id
                    }
                    if (!Collector.isNewItem(n) || isDefined(r[n]) && r[n].length == 0) {
                        return ""
                    }
                    if (t == "market") {
                        if (isDefined(r[n])) {
                            return c(n)
                        }
                        i++;
                        Worker.add(function(e, t) {
                            return function() {
                                l(t);
                                var n = w.MarketWindow.DOM.find("#TWDBbuyTip" + e);
                                n.after(c(t));
                                n.remove()
                            }
                        }(i, n));
                        return '<img id="TWDBbuyTip' + i + '" src="' + Images["iconStar3"] + '" class="TWDBbuyTip" width="18px" height="18px" title="Calculando, por favor aguarde..." style="padding:0px;border:0px;margin:0px;" />'
                    }
                    if (isDefined(r[n])) {
                        if (t == "shop") {
                            var s = h(n);
                            s.css({
                                bottom: "45px",
                                right: "11px"
                            });
                            return s
                        } else {
                            e.divMain.find(".TWDBbuyTip").remove();
                            e.divMain.append(h(n))
                        }
                        return
                    }
                    if (isDefined(e.divMain)) {
                        e.divMain.find(".TWDBbuyTip").remove()
                    }
                    e.divMain.append('<img src="' + Images["iconStar3"] + '" class="TWDBbuyTip" width="25px" height="25px"     title="Calculando, por favor aguarde..."  style="position:absolute;bottom:-8px;right:-5px;padding:0px;border:0px;margin:0px;" />');
                    Worker.add(function(e, t) {
                        return function() {
                            l(t);
                            if (t == "shop") {
                                var n = h(t);
                                n.css({
                                    bottom: "45px",
                                    right: "11px"
                                });
                                return n
                            } else {
                                e.divMain.find(".TWDBbuyTip").remove();
                                e.divMain.append(h(t))
                            }
                        }
                    }(e, n))
                };
                var l = function(e) {
                    if (!ClothCalc.isLoaded()) {
                        return
                    }
                    if (!ClothCalc.isItemUsable(e, true)) {
                        return
                    }
                    if (isDefined(r[e])) {
                        return
                    }
                    r[e] = [];
                    var t = ItemManager.get(e);
                    var n = Jobs.getAllJobs();
                    for (var i = 0; i < n.length; i++) {
                        var s = n[i];
                        var o = ClothCalc.getClothForJob(s);
                        if (!isDefined(o)) {
                            continue
                        }
                        var u = 0;
                        var a = Calc.getItemBonusForJob(e, s);
                        if (isDefined(o[TWDB.ClothCalc._type2id[t.type]])) {
                            var f = ItemManager.get(o[TWDB.ClothCalc._type2id[t.type]].id);
                            u += Calc.getItemBonusForJob(f.item_id, s)
                        }
                        if (isDefined(f) && isDefined(f.set) || isDefined(t.set)) {
                            var l = isDefined(f) && isDefined(f.set) ? f.set : null;
                            var c = isDefined(t.set) ? t.set : null;
                            var h = {};
                            h[l] = 0;
                            h[c] = 0;
                            for (var p in o) {
                                var d = ItemManager.get(o[p].id);
                                if (!isDefined(d)) {
                                    continue
                                }
                                if (d.set) {
                                    if (d.set == l) {
                                        h[l]++
                                    }
                                    if (d.set == c && l !== c) {
                                        h[c]++
                                    }
                                }
                            }
                            if (l) {
                                u += Calc.getSetBonusForJob(l, h[l], s);
                                u -= Calc.getSetBonusForJob(l, h[l] - 1, s)
                            }
                            if (c) {
                                a += Calc.getSetBonusForJob(c, h[c] + 1, s);
                                a -= Calc.getSetBonusForJob(c, h[c], s)
                            }
                        }
                        if (a > u) {
                            var v = ClothCalc.getLPForJob(s);
                            if (isDefined(v)) {
                                var m = v.sum - u + a;
                                r[e].push({
                                    job: s,
                                    newlp: m,
                                    more: m - v.sum
                                })
                            } else {
                                r[e].push({
                                    job: s,
                                    newlp: a,
                                    more: a
                                })
                            }
                        }
                    }
                    Cache.save("betteritems", r)
                };
                var c = function(e) {
                    if (!isDefined(r[e])) {
                        return ""
                    }
                    if (r[e].length == 0) {
                        return ""
                    }
                    s[e] = false;
                    var t = p(e).escapeHTML();
                    return "<img onload=\"$(this).next('.TWDBcollector').remove();$(this).addMousePopup('" + t + '\');" src="' + Images["iconStar" + (s[e] ? "2" : "")] + '" class="TWDBbuyTip" width="18px" height="18px" style="padding:0px;border:0px;margin:0px;" />'
                };
                var h = function(t) {
                    if (!isDefined(r[t])) {
                        return
                    }
                    if (r[t].length == 0) {
                        return
                    }
                    s[t] = false;
                    var n = p(t);
                    return e('<img src="' + Images["iconStar" + (s[t] ? "2" : "")] + '" class="TWDBbuyTip" width="25px" height="25px" title=\'' + n + '\' style="position:absolute;bottom:-8px;right:-5px;padding:0px;border:0px;margin:0px;" />')
                };
                var p = function(e) {
                    if (!isDefined(r[e])) {
                        return ""
                    }
                    var t = '<table border="0" cellspacing="0" cellpadding="0"><tr>';
                    if (!ClothCalc.isItemUsable(e)) {
                        var n = ItemManager.get(e);
                        t += '<td colspan="2" style="text-align:center; font-weight:bold;">Nível ' + n.level + "</td></tr><tr>"
                    }
                    for (var i = 0; i < r[e].length; i++) {
                        var o = r[e][i];
                        var u = Jobs.getJobById(o.job);
                        var a = " +" + o.more + " " + u.name.escapeHTML() + " [" + o.newlp + "]";
                        if (o.job == ClothCalc.getSelectedJob()) {
                            a = "<b>" + a + "</b>";
                            s[e] = true
                        }
                        if (o.newlp < 0) {
                            var f = "#FF0000"
                        } else {
                            if (o.newlp - o.more < 0) {
                                var f = "#0000FF"
                            } else {
                                var f = "#008000"
                            }
                        }
                        t += '<td style="color:' + f + ';">' + a + "</td>";
                        if (i % 2) {
                            t += "</tr><tr>"
                        }
                    }
                    if (i % 2) {
                        t += "<td></td></tr>"
                    } else {
                        t = t.substring(0, t.length - 4)
                    }
                    t += "</table>";
                    return t
                };
                return t
            }($);
            Debugger.BuyTip = BuyTip;
            var LpInfo = function(e) {
                var t = {};
                var n = false;
                var r = {};
                var i = function() {
                    if (r.ready) {
                        return
                    }
                    if (Settings.get("jobBoniTooltip", true)) {
                        GameInject.injectItem("Inventory", "lpInfo", function(e) {
                            return s(e)
                        })
                    }
                    r.ready = true
                };
                r = Loader.add("LpInfo", "tw-db LpInfo", i, {
                    Settings: true,
                    Jobs: true,
                    Calc: true
                });
                var s = function(e) {
                    e.divMain.find(".TWDBlpInfo").remove();
                    var t = ClothCalc.getSelectedJob();
                    if (!isDefined(t)) {
                        return
                    }
                    var n = e.obj.item_id;
                    e.divMain.find(".TWDBlpInfo").remove();
                    if (Calc.isCached(n, t)) {
                        e.divMain.append(o(n, t))
                    } else {
                        Worker.add(function(e, t, n) {
                            return function() {
                                e.divMain.find(".TWDBlpInfo").remove();
                                e.divMain.append(o(t, n))
                            }
                        }(e, n, t))
                    }
                };
                var o = function(e, t) {
                    var n = Calc.getItemBonusForJob(e, t);
                    if (isNaN(n) || n <= 0) {
                        return
                    }
                    var t = Jobs.getJobById(t);
                    return '<img src="' + Images.iconLaborpoints + '" title="+' + n + " " + t.name.escapeHTML() + '" class="TWDBlpInfo" style="position: absolute; top: 2px; right: 2px; width: 15px; height: 15px; border: 0px none; margin: 0px;"/>'
                };
                return t
            }($);
            Debugger.LpInfo = LpInfo;
            var Snippets = function($) {
                var _self = {};
                var timeout = null;
                var interval = null;
                var loader = {};
                var init = function() {
                    if (loader.ready) {
                        return
                    }
                    trustTWDB();
                    if (Settings.get("collectorsell", true)) {
                        GameInject.injectWanderingTraderSellDialog()
                    }
                    if (Settings.get("customcounterpos", true)) {
                        repositionEventCounters()
                    }
                    if (Settings.get("noscrollbars", false)) {
                        disableScrollbars()
                    }
                    if (Settings.get("instanthotel", true)) {
                        InstantHotel()
                    }
                    if (Settings.get("qbswitch", true)) {
                        QuestbookSwitch()
                    }
                    if (Settings.get("qfulltext", false)) {
                        QuestFullText()
                    }
                    if (Settings.get("fastskillchange", true)) {
                        fastSkillChange()
                    }
                    if (Settings.get("fortrecruitment", true)) {
                        activateFortRecruitment()
                    }
                    if (Settings.get("noworkqueuepa", true)) {
                        removeWorkQueuePA()
                    }
                    if (Settings.get("nofetchallpa", false)) {
                        removeVariousPA()
                    }
                    if (Settings.get("nowofnuggets", false)) {
                        changeWofNuggets()
                    }
                    if (Settings.get("marketselldialog", true)) {
                        enhanceMarketSellDialog()
                    }
                    if (Settings.get("weeklycrafting", false)) {
                        weeklyCrafting()
                    }
                    if (Settings.get("pinitems", true)) {
                        GameInject.injectInventoryAddItemsPinItems();
                        GameInject.injectInventoryAddItemDivToInvPinItems()
                    }
                    if (Settings.get("telegramsource", true)) GameInject.injectTelegramWindowAppendTelegramDisplaySource();
                    if (Settings.get("noshopsale", false)) {
                        supressOnGoingEntries()
                    }
                    if (Settings.get("expbarvalues", true)) {
                        expBarValues()
                    }
                    if (Settings.get("mini_chatgui", true)) {
                        allowChatGuiMinimize()
                    }
                    if (Settings.get("tasklistpoints", true)) {
                        addTaskJobsHints();
                        GameInject.injectTaskJobs()
                    }
                    var e = (new ServerDate).date;
                    if (Game.locale == "de_DE" && e.getDate() < 8 && e.getMonth() == 3 && e.getFullYear() == 2017) GameInject.injectDontTellAnyone();
                    loader.ready = true
                };
                loader = Loader.add("Snippets", "tw-db code Snippets", init, {
                    Settings: true
                });
                var trustTWDB = function() {
                    try {
                        var str = showlink.toString();
                        str = str.replace("the-west", "tw-db|the-west");
                        str = str.replace("|com|", "|com|info|");
                        eval("showlink = " + str)
                    } catch (e) {}
                };
                var repositionEventCounters = function() {
                    TWDB.Util.addCss("@media (min-width: 1320px) { .custom_unit_counter {top: -1px!important; margin-left: 310px!important;} #hiro_friends_container {top: -1px!important; margin-right: 304px!important;} }")
                };
                var disableScrollbars = function() {
                    $("body").css({
                        overflow: "hidden"
                    })
                };
                var allowChatGuiMinimize = function() {
                    TWDB.Util.addCss("div#ui_bottomleft { width: auto; overflow: hidden; }" + "div#ui_chat { margin-top: 12px; }" + "div#ui_chat div#toggleMinChat { position: absolute; top: -14px; left: 5px; width: 27px; display: block; background-size: 108px 42px; border: 0px solid rgba(0, 0, 0, 0); background-clip: content-box; }" + "div#ui_chat.minchat div#toggleMinChat { background-position: 0px 0px; border-width: 0px 8px 34px 0px; }" + "div#ui_chat.minchat div#servertime { display: none; }" + "div#ui_chat.minchat > div.tabs div { display: none; }" + "div#ui_chat.minchat div.container div.friend { display: none!important; }" + "div#ui_chat.minchat div.container div.general { display: block!important; }" + "div#ui_chat.minchat div.container div.vertical_divider { display: none; }" + "div#ui_chat.minchat img.leave_channel { display: none!important; }" + "div#ui_chat div.minchat_tabr { display: none; }" + 'div#ui_chat.minchat div.minchat_tabr { display: block; position: absolute; left: 32px; top: 0px; width: 8px; height: 34px; background: url("' + to_cdn("images/interface/chat/chat-top.png?1") + '") top right; }' + "div#ui_chat.minchat { position: relative; left: -10px; top: 4px; width: 39px; }" + 'div#ui_chat.minchat > div.tabs { width: 32px; background: url("' + to_cdn("images/interface/chat/chat-top.png?1") + '"); }' + "div#ui_chat.minchat div.chat_channel { width: 24px; }" + "div#ui_chat.minchat div.chat_channel .new_message { left: 2px; top: 0px; }" + "div#ui_chat.minchat div.chat_channel div.online_count { background: none; position: absolute; right: 0px; top: -1px; width: auto; height: auto; line-height: normal; padding: 0px; font-size: 8pt; font-weight: bold; text-align: right; text-shadow: -1px 1px 1px #FFF, 0px 0px 2px #FFF; cursor: default; }" + "div#ui_chat.minchat div.container { width: 40px; background-position-x: right; }" + "div#ui_chat.minchat div.row_title { left: 5px; width: 32px; opacity: 0; }" + "div#ui_chat.minchat div.tw2gui_scrollpane { width: 50px; }", "minchat");
                    $("div#ui_chat").append('<div class="minchat_tabr" />').toggleClass("minchat", Settings.get("mini_chatgui_min", true)).children(".tabs").first().append($('<div id="toggleMinChat" class="tw2gui_arrow_up_top" />').on("click", function(e) {
                        e.stopPropagation();
                        Settings.set("mini_chatgui_min", $("div#ui_chat").toggleClass("minchat").hasClass("minchat"));
                        return false
                    }))
                };
                var addTaskJobsHints = function() {
                    var e = "div#ui_workcontainer div.twdb_lp_hint { position: absolute; left: 2px; width: 18px; height: 18px; background-color: #432; border: 2px ridge #976; border-radius: 11px; background-blend-mode: soft-light; }" + "div.twdb_lp_hint > img { position: absolute; left: 1px; top: 1px; }";
                    TWDB.Util.addCss(e);
                    var t = function() {
                        if (TaskQueue.queue.length) {
                            var e, t = $("div#ui_workcontainer"),
                                n, r;
                            for (e = 0; e < TaskQueue.queue.length; e++) {
                                if (TaskQueue.queue[e].type === "job") {
                                    n = null;
                                    r = TWDB.ClothCalc.calcdata.loaded && TaskQueue.queue[e].data.job_points < TWDB.ClothCalc.calcdata.jobs[TaskQueue.queue[e].data.job.id].laborpoints.sum - 5;
                                    if (TaskQueue.queue[e].data.job_points < 0) {
                                        n = west.gui.Icon.get("exclamation-priority-3", "negative labor points")
                                    } else if (TaskQueue.queue[e].data.job_points < TaskQueue.queue[e].data.job.malus / 5) {
                                        n = west.gui.Icon.get("exclamation-priority-2", "low labor points")
                                    } else if (r) {
                                        n = west.gui.Icon.get("exclamation-priority-1", "not optimal labor points")
                                    }
                                    if (n !== null) {
                                        $(".task-queuePos-" + e + " > div.icon", t).children(".twdb_lp_hint").remove().end().append($('<div class="twdb_lp_hint" />').toggleClass("tw2gui-iconset tw2gui-icon-star", !r).append(n))
                                    }
                                }
                            }
                        }
                    };
                    EventHandler.listen(["taskqueue-updated", "taskqueue-ready"], t)
                };
                var expBarValues = function() {
                    if (isDefined(w.SlySuite)) {
                        TWDB.Settings.set("expbarvalues", false);
                        return
                    }
                    TWDB.Util.addCss("div#ui_experience_bar .label {text-shadow: 3px 1px 1px #000, 3px -1px 1px #000, -2px 1px 1px #000, -2px 0px 0px #000;}");
                    var e = function(e) {
                        if (Math.abs(e) >= 1e4) {
                            return Math.round(e / 1e3) + "k"
                        } else {
                            return e
                        }
                    };
                    var t = function() {
                        var t = $("#ui_experience_bar"),
                            n = undefined === Character.getTrackingAchievement() ? WestUi.updateTrackXp(t) : WestUi.updateTrackAchievement(t);
                        $(".label", t).off("mouseenter mouseleave");
                        $(".label span", t).show();
                        var r = "";
                        if (Character.level < 150) {
                            r = n.percent + "% - " + e(n.current) + " / " + e(n.required);
                            r += " (" + e(n.required - n.current) + ")"
                        } else r = Character.experience.toLocaleString();
                        $(".label span", t).html(r)
                    };
                    EventHandler.listen("character_exp_changed", t);
                    EventHandler.listen("character_tracking_achievement_changed", t);
                    t()
                };
                var supressOnGoingEntries = function() {
                    var e = ["shop_sale"];
                    var t = function(e) {
                        if ($.isArray(e)) {
                            for (var n = 0; n < e.length; n++) {
                                t(e[n])
                            }
                        } else if (typeof e === "string") {
                            var r = WestUi.NotiBar.main.list;
                            for (var n = 0; n < r.length; n++) {
                                if ($(r[n].element).children().is("div.image." + e)) {
                                    WestUi.NotiBar.remove(r[n])
                                }
                            }
                        }
                    };
                    var n = function(e) {
                        try {
                            WestUi.NotiBar.__twdb__add = WestUi.NotiBar.__twdb__add || WestUi.NotiBar.add;
                            WestUi.NotiBar.add = function(t) {
                                var n = $(".image", t.element);
                                for (var r = 0; r < e.length; r++) {
                                    if (n.hasClass(e[r])) {
                                        return
                                    }
                                }
                                WestUi.NotiBar.__twdb__add.apply(this, arguments)
                            }
                        } catch (t) {
                            Error.report(t, "manipulate WestUi.NotiBar.add")
                        }
                    };
                    n(e);
                    t(e)
                };
                var InstantHotel = function() {
                    try {
                        w.Map.Component.Town.prototype.__twdb__getContent = w.Map.Component.Town.prototype.__twdb__getContent || w.Map.Component.Town.prototype.getContent;
                        w.Map.Component.Town.prototype.getContent = function() {
                            var e = this.__twdb__getContent();
                            if (e === "") {
                                return e
                            } else {
                                return e.replace(/\<\/div\>$/, "<div class='instanthotel needslistener' title='Hotel' tid='" + this.data[1].town_id + "'></div></div>")
                            }
                        };
                        w.Map.Draw.__twdb__checkDouble = w.Map.Draw.__twdb__checkDouble || w.Map.Draw.checkDouble;
                        w.Map.Draw.checkDouble = function() {
                            $("#map div.instanthotel.needslistener").each(function(e, t) {
                                var n = $(t);
                                var r = parseInt(n.attr("tid"), 10);
                                n.click(function(e) {
                                    e.stopPropagation();
                                    HotelWindow.open(r);
                                    return false
                                }).removeClass("needslistener").removeAttr("tid")
                            });
                            return w.Map.Draw.__twdb__checkDouble()
                        };
                        var e = "div.instanthotel { background-image: url('" + TWDB.images.instanthotel + "'); width: 20px; height: 20px; " + "position: absolute; right: 10px; top: -8px; cursor: pointer; display: none; }\n" + "div.townname:hover .instanthotel { z-index: 2; display: block; }";
                        TWDB.Util.addCss(e);
                        w.Map.refresh(true)
                    } catch (t) {
                        Error.report(t, "manipulate town signs")
                    }
                };
                var fastSkillChange = function() {
                    try {
                        west.gui.Plusminusfield.prototype.__twdb__init = west.gui.Plusminusfield.prototype.init;
                        west.gui.Plusminusfield.prototype.init = function(e, t, n, r, i, s, o, u) {
                            this.__twdb__init.apply(this, arguments);
                            var a = this;
                            var f = {
                                minus: $("span.butMinus", a.divMain),
                                plus: $("span.butPlus", a.divMain)
                            };
                            $(this.divMain).off("mousewheel").on("mousewheel", function(e, t) {
                                f[t < 0 ? "minus" : "plus"].click();
                                e.stopPropagation();
                                return false
                            });
                            $.each(f, function(e, t) {
                                var n = 400,
                                    r = -1,
                                    i = function() {
                                        n = Math.max(Math.round(n * (n / 200 + 1) / (n / 133 + 1)), 5);
                                        t.click();
                                        r = setTimeout(i, n)
                                    },
                                    s = function() {
                                        r = setTimeout(i, n)
                                    },
                                    o = function(e) {
                                        if (r !== -1) {
                                            clearTimeout(r);
                                            r = -1
                                        }
                                        n = 400
                                    };
                                t.css("cursor", "pointer").mousedown(s).mouseup(o).mouseout(o)
                            })
                        }
                    } catch (e) {
                        Error.report(e, "manipulate Plusminusfield")
                    }
                };
                var QuestbookSwitch = function() {
                    try {
                        QuestGroupWindowView.cc_showSolvedQuest = QuestGroupWindowView.showSolvedQuest;
                        QuestGroupWindowView.showSolvedQuest = function(e) {
                            QuestGroupWindowView.cc_showSolvedQuest(e);
                            var t = $("div.window-quest_group div.quest_description_container span").slice(1).hide();
                            var n = $("<span><br>" + e.description + "</span>");
                            $("div.window-quest_group div.quest_description_container").append(n);
                            var r = $('<a href="#"> Mostrar texto de conclusão </a>').addClass("introshown").click(function() {
                                var e = $(this),
                                    r = e.hasClass("introshown");
                                t.toggle(r);
                                n.toggle(!r);
                                e.text(r ? " Mostrar texto de introdução " : " Mostrar texto de conclusão ");
                                e.toggleClass("introshown")
                            });
                            $("div.window-quest_group div.solved_text_container").append($("<div style='text-align:center;margin-top:10px;'>").append(r))
                        }
                    } catch (e) {
                        Error.report(e, "manipulate showSolvedQuest")
                    }
                };
                var QuestFullText = function() {
                    try {
                        QuestWindowView.cc_showQuest = QuestWindowView.showQuest;
                        QuestWindowView.showQuest = function(e) {
                            QuestWindowView.cc_showQuest(e);
                            $("div.quest_description_container div#quest_shortd").hide();
                            $("div.quest_description_container div#quest_fulld").show()
                        };
                        QuestEmployerView.cc_showQuest = QuestEmployerView.showQuest;
                        QuestEmployerView.showQuest = function(e) {
                            QuestEmployerView.cc_showQuest(e);
                            $("div.quest_description_container div#quest_shortd").hide();
                            $("div.quest_description_container div#quest_fulld").show()
                        }
                    } catch (e) {
                        Error.report(e, "manipulate showQuest")
                    }
                };
                var removeWorkQueuePA = function() {
                    try {
                        TWDB.Util.addCss("#queuedTasks .buyPremiumTask {background: none!important}");
                        Premium.checkForAutomationPremium = function(e, t) {
                            if (typeof t !== "undefined") return t()
                        }
                    } catch (e) {
                        Error.report(e, "manipulate removeWorkQueuePA")
                    }
                };
                var changeWofNuggets = function() {
                    try {
                        west.gui.payHandler.prototype.__twdb__addPayOption = west.gui.payHandler.prototype.addPayOption;
                        west.gui.payHandler.prototype.addPayOption = function(e) {
                            this.__twdb__addPayOption.apply(this, arguments);
                            if (false === e || "nugget" === e || 2 == e || 2 == e.id) {
                                return this
                            }
                            this.setSelectedPayId(e.id || e);
                            return this
                        }
                    } catch (e) {
                        Error.report(e, "manipulate changeWofNuggets")
                    }
                };
                var removeVariousPA = function() {
                    var e = [],
                        t;
                    if (Settings.get("nofetchallpa", false)) e.push("marketdelivery all");
                    if (!e.length) return;
                    t = new RegExp(e.join("|"));
                    try {
                        Premium.twdb_confirmUse = Premium.confirmUse;
                        Premium.confirmUse = function(e, n, r, i, s, o, u, a) {
                            if (t.test(e)) {
                                if (typeof u !== "undefined") return u()
                            } else {
                                return Premium.twdb_confirmUse(e, n, r, i, s, o, u, a)
                            }
                        }
                    } catch (n) {
                        Error.report(n, "manipulate removeVariousPA")
                    }
                };
                var activateFortRecruitment = function() {
                    try {
                        FortBattleWindow.__twdb__getInfoArea = FortBattleWindow.__twdb__getInfoArea || FortBattleWindow.getInfoArea;
                        FortBattleWindow.getInfoArea = function() {
                            this.preBattle.battleData.canSetPrivilege = true;
                            return FortBattleWindow.__twdb__getInfoArea.apply(this, arguments)
                        }
                    } catch (e) {
                        Error.report(e, "manipulate FortBattleWindow.getInfoArea")
                    }
                };
                var enhanceMarketSellDialog = function() {
                    var e;
                    var t = TWDB.Cache.load("msdsettings");
                    if (typeof t !== "object" || t == null) {
                        t = {
                            cb: {}
                        }
                    } else if (typeof t.cb !== "object" || t.cb == null) {
                        t.cb = {}
                    }
                    try {
                        if (!isDefined(west.gui.Dialog.prototype.__twdb__show)) {
                            west.gui.Dialog.prototype.__twdb__show = west.gui.Dialog.prototype.show
                        }
                        if (TWDB.script.isDev()) {
                            west.gui.Dialog.prototype.show = function() {
                                if (this.divMain.attr("id") === "market_createoffer_window") {
                                    var e = this.__twdb__show();
                                    w.setTimeout(function() {
                                        MarketWindow.TWDB_touchUpSellDialog(e)
                                    }, 25);
                                    return e
                                }
                                var t = ["div#equip_manager_list", "span.twdb_banking"].join(", ");
                                if ($(this.divMain).find(t).addBack().is(t)) {
                                    return this.setModal(false).setBlockGame(false).setDraggable(true).__twdb__show()
                                }
                                return this.__twdb__show()
                            }
                        } else {
                            west.gui.Dialog.prototype.show = function() {
                                if (this.divMain.attr("id") === "market_createoffer_window") {
                                    var e = this.__twdb__show();
                                    w.setTimeout(function() {
                                        MarketWindow.TWDB_touchUpSellDialog(e)
                                    }, 25);
                                    return e
                                }
                                return this.__twdb__show()
                            }
                        }
                        if (!isDefined(MarketWindow.TWDB_createMarketOffer)) {
                            MarketWindow.TWDB_createMarketOffer = MarketWindow.createMarketOffer
                        }
                        MarketWindow.createMarketOffer = function(t) {
                            var n = typeof t == "number" ? t : $(t).data("itemId");
                            if (n === undefined) {
                                var r = $(this).data("dnd_droppedObj");
                                n = r.data("itemId")
                            }
                            e = w.ItemManager.get(n);
                            return MarketWindow.TWDB_createMarketOffer(n)
                        }
                    } catch (n) {
                        Error.report(n, "manipulate market sell dialog")
                    }
                    MarketWindow.TWDB_touchUpSellDialog = function(n) {
                        if (n.divMain.attr("id") !== "market_createoffer_window") {
                            return
                        }
                        var r = $("div.tw2gui_dialog_content", n.divMain);
                        if (r.find("#auction_item_slot", r).html() == "") return w.setTimeout(function() {
                            MarketWindow.TWDB_touchUpSellDialog(n)
                        }, 25);
                        $("div.tw2gui_dialog_framefix").css({
                            left: "50%",
                            top: "50%",
                            width: "1px",
                            height: "1px"
                        });
                        $("textarea#auction_description", r).css("width", "270px").closest("tr").append("<td id='twdb_msd_desc_cc'>");
                        var i = $("table:nth-child(2)", r);
                        $("tr:first-child", i).after($("<tr>").append("<td>", '<td id="twdb_msd_bid_cc" style="min-width: 90px;">', "<td>", '<td id="twdb_msd_buy_cc" style="min-width: 90px;">'));
                        $("tr:nth-last-child(5) td:nth-child(2) span.tw2gui_textfield", i).after('<span id="twdb_msd_mult_cc" title="Ajustar (Multiplicar) o valor actual com esta conta" style="background-image: url(&quot;/images/ranking/town_ranking_icons.png&quot;); display:inline-block; height:16px; width:16px; background-position:0px -80px; cursor:pointer;">&nbsp;</span>');
                        $("tr:last-child td:first-child", i).attr("colspan", 3).before('<td id="twdb_msd_opt_cc">');
                        var s = function() {
                            n.divMain.css({
                                "margin-top": "-" + n.divMain.height() / 2 + "px",
                                "margin-left": "-" + n.divMain.width() / 2 + "px"
                            })
                        };
                        var o = function() {
                            var e, n = this.groupClass;
                            $("div.tw2gui_checkbox." + n).not(this.divMain).removeClass("tw2gui_checkbox_checked");
                            if (this.isSelected()) {
                                e = this.getValue();
                                this.divMain.next().click()
                            } else {
                                e = 0
                            }
                            t.cb[n] = e;
                            TWDB.Cache.save("msdsettings", t);
                            (new UserMessage("Guardado com sucesso", UserMessage.TYPE_SUCCESS)).show();
                            return this
                        };
                        var u = function(e, n) {
                            t[e] = n;
                            TWDB.Cache.save("msdsettings", t);
                            (new UserMessage("Guardado com sucesso", UserMessage.TYPE_SUCCESS)).show()
                        };
                        var a = function() {
                            var e, n;
                            for (e in t.cb) {
                                if (!t.cb.hasOwnProperty(e)) continue;
                                $("div.tw2gui_checkbox." + e).each(function() {
                                    n = $(this).guiElement();
                                    if (n.getValue() === t.cb[e]) {
                                        n.setSelected(true, true);
                                        $(this).next().click()
                                    }
                                })
                            }
                            $("textarea#auction_description", r).val(t.description || "");
                            $("span#market_days.tw2gui_combobox", r).guiElement().select(t.duration || 1);
                            $("span#market_rights.tw2gui_combobox", r).guiElement().select(isDefined(t.rights) ? t.rights : 2)
                        };
                        $("#twdb_msd_desc_cc", r).append($('<div class="tw2gui-iconset tw2gui-icon-save" title="Guardar descrição para leilões futuros">').click(function() {
                            u("description", $("textarea#auction_description", r).val())
                        }), $('<div class="tw2gui-iconset tw2gui-icon-abort" title="Reset á descrição">').click(function() {
                            u("description", "");
                            $("textarea#auction_description", r).val("")
                        }));
                        $("#twdb_msd_buy_cc", r).append((new west.gui.Checkbox("", "twdb_msd_buy_fix", o)).setTitle("Usar como preço base").setValue(2).divMain).append($('<div class="tw2gui_checkbox" title="Definir preço de compra do item">').append('<span class="invPopup_buyicon" style="height:20px;">').click(function() {
                            $("#market_max_price", r).val(e.price || 1).keyup()
                        })).append("&nbsp;&nbsp;").append((new west.gui.Checkbox("", "twdb_msd_buy_fix", o)).setTitle("Usar como preço base").setValue(1).divMain).append($('<div class="tw2gui_checkbox" title="Definir preço de venda do item">').append('<span class="invPopup_sellicon" style="height:20px;">').click(function() {
                            $("#market_max_price", r).val(e.sell_price || Math.round(e.price / 2)).keyup()
                        }));
                        $("#twdb_msd_bid_cc", r).append((new west.gui.Checkbox("", "twdb_msd_bid_fix", o)).setTitle("Usar como preço base").setValue(2).divMain).append($('<div class="tw2gui_checkbox" title="Definir preço de compra do item">').append('<span class="invPopup_buyicon" style="height:20px;">').click(function() {
                            $("#market_min_bid", r).val(e.price || 1).keyup()
                        })).append("&nbsp;&nbsp;").append((new west.gui.Checkbox("", "twdb_msd_bid_fix", o)).setTitle("Usar como preço base").setValue(1).divMain).append($('<div class="tw2gui_checkbox" title="Definir preço de venda do item">').append('<span class="invPopup_sellicon" style="height:20px;">').click(function() {
                            $("#market_min_bid", r).val(e.sell_price || Math.round(e.price / 2)).keyup()
                        }));
                        $("#twdb_msd_mult_cc", r).click(function() {
                            var e, t = parseInt($("#market_sell_itemStack", r).val(), 10);
                            if (t > 0) {
                                e = parseInt($("#market_min_bid", r).val(), 10);
                                if (e > 0) {
                                    $("#market_min_bid", r).val(t * e).keyup()
                                }
                                e = parseInt($("#market_max_price", r).val(), 10);
                                if (e > 0) {
                                    $("#market_max_price", r).val(t * e).keyup()
                                }
                            }
                        });
                        $("#twdb_msd_opt_cc", r).append($('<span class="tw2gui-iconset tw2gui-icon-save" title="Guardar duração e outras opções para leilões futuros" style="display: inline-block;">').click(function() {
                            u("duration", parseInt($("#market_days", r).data("value"), 10));
                            u("rights", parseInt($("#market_rights", r).data("value"), 10))
                        }), $('<span class="tw2gui-iconset tw2gui-icon-abort" title="Reset ás opções" style="display: inline-block;">').click(function() {
                            u("duration", 1);
                            $("span#market_days.tw2gui_combobox", r).guiElement().select(1);
                            u("rights", 2);
                            $("span#market_rights.tw2gui_combobox", r).guiElement().select(2)
                        }));
                        var f = $("span#market_rights.tw2gui_combobox", r).guiElement().items;
                        if (f.length === 3) {
                            var l = ["home", "flag", "world"];
                            for (var c = 0; c < f.length; c++) {
                                f[c].node[0].innerHTML = '<span class="tw2gui-iconset tw2gui-icon-' + l[f[c].value] + '" style="display: inline-block;position: relative;top: 4px;"></span>&nbsp;' + f[c].node[0].innerHTML
                            }
                        }
                        var h = $("h4", r),
                            p = $("table#mps_otheroffers", r);
                        if ($("tr", p).length > 2 || $("tr:nth-child(2) > td", p).attr("colspan") !== 4) {
                            h.html(h.html() + "&nbsp;(" + ($("tr", p).length - 1) + ")").click(function() {
                                p.toggle();
                                s()
                            }).css({
                                cursor: "pointer"
                            })
                        } else {
                            h.html(h.html() + "&nbsp;(0)");
                            p.hide()
                        }
                        s();
                        a()
                    }
                };
                var weeklyCrafting = function() {
                    if (w.Character.professionId && w.Character.professionSkill > 599) {
                        var e = function(e) {
                            var t = new OnGoingEntry;
                            var n = ItemManager.get(ItemManager.get(e).craftitem);
                            var r = "<div style='text-align:center;'>Podes craftar outra vez!<br />" + '<div class="item  item_inventory" style="display:inline-block;float:none;"><img class="tw_item item_inventory_img" src="' + n.image + '"></div><br />' + n.name + "</div>";
                            t.init("", function() {
                                CharacterWindow.open("crafting");
                                TWDB.Cache.save("craftingCheck", {
                                    found: false,
                                    date: null
                                })
                            }, 11);
                            t.setTooltip(r);
                            t.setImageClass("work");
                            t.highlightBorder();
                            WestUi.NotiBar.add(t);
                            TitleTicker.setNotifyMessage("Ofício")
                        };
                        var t = function() {
                            var r = TWDB.Cache.load("craftingCheck") || {
                                found: false,
                                date: null
                            };
                            if (!r.found) {
                                return n()
                            }
                            var i = (new Date(r.date)).getTime() - (new ServerDate).getTime();
                            if (i < 0) {
                                return e(r.found)
                            } else if (i < 864e5) {
                                if (i < 18e4) {
                                    w.setTimeout(function() {
                                        e(r.found)
                                    }, i)
                                } else {
                                    w.setTimeout(function() {
                                        t()
                                    }, parseInt(i / 2, 10))
                                }
                            }
                        };
                        var n = function() {
                            Ajax.remoteCall("crafting", "", {}, function(e) {
                                if (e.error) {
                                    return (new UserMessage(e.msg)).show()
                                }
                                if (e.hasOwnProperty("recipes_content") && e.recipes_content.length > 0) {
                                    var n;
                                    var r = [20099e3, 20104e3, 20109e3, 20114e3];
                                    for (n = 0; n < e.recipes_content.length; n++) {
                                        if (r.indexOf(e.recipes_content[n].item_id) !== -1) {
                                            if (e.recipes_content[n].last_craft) {
                                                TWDB.Cache.save("craftingCheck", {
                                                    found: e.recipes_content[n].item_id,
                                                    date: new Date((new ServerDate).getTime() + parseInt(e.recipes_content[n].last_craft * 1e3, 10))
                                                })
                                            } else {
                                                TWDB.Cache.save("craftingCheck", {
                                                    found: e.recipes_content[n].item_id,
                                                    date: new Date(null)
                                                })
                                            }
                                            return t()
                                        }
                                    }
                                }
                                TWDB.Cache.save("craftingCheck", {
                                    found: false,
                                    date: null
                                })
                            })
                        };
                        t()
                    }
                };
                return _self
            }($);
            Debugger.Snippets = Snippets;
            var GameInject = function($) {
                var _self = {};
                var save = {};
                var minimap = [];
                var questlog = [];
                var radialmenu = [];
                var quests = [];
                var ready = false;
                var timeout = null;
                var interval = null;
                var _position = [];
                var _reportreceived = [];
                _self.CharacterButton = function(e) {
                    var t = {};
                    var n = 0;
                    var r = null;
                    t.add = function(t) {
                        if (n == 0) {
                            var i = "div#twdb_characbut {width:36px; height:35px; position:absolute; left:141px; top:131px; border-bottom-left-radius:8px;" + "background:url(" + Game.cdnURL + "/images/interface/character/character.png?3) no-repeat -141px -105px transparent;}";
                            TWDB.Util.addCss(i);
                            r = e('<div id="twdb_characbut" />');
                            e("#ui_character_container").prepend(r)
                        }
                        n++;
                        r.css({
                            height: 10 + 26 * n + "px",
                            "background-position": "-141px " + (26 * n - 131) + "px"
                        });
                        var s = e('<div class="char_links" style="top:' + (6 + (n - 1) * 26) + "px;left:6px;background:url(" + t + ')no-repeat 0px 0px transparent;"/>');
                        s.hover(function() {
                            e(this).css("background-position", "-25px 0px")
                        }, function() {
                            e(this).css("background-position", "0px 0px")
                        });
                        r.append(s);
                        return s
                    };
                    return t
                }($);
                _self.injectTaskJobs = function() {
                    try {
                        var e = TaskJob;
                        TaskJob = function() {
                            var t = e.apply(this, arguments);
                            t.__twdb__getTitle = t.getTitle;
                            t.getTitle = function() {
                                return t.__twdb__getTitle() + "PT: " + (this.data.job_points < 0 ? "<b class='text_red'>" : "<b>") + this.data.job_points + "</b><br />"
                            };
                            return t
                        }
                    } catch (t) {
                        Error.report(t, "manipulate TaskJob template")
                    }
                    try {
                        if (TaskQueue.queue.length) {
                            var n = $("script:contains('TaskQueue.init')").text().match(/TaskQueue\.init\(\s*(\[[^\]]*\])/);
                            if (n.length === 2) {
                                n = JSON.parse(n[1]);
                                TaskQueue.init(n, TaskQueue.limit)
                            }
                        }
                    } catch (t) {
                        Error.report(t, "manipulate existing Job tasks")
                    }
                };
                _self.ChatLayout = function(e) {
                    var t = [];
                    return function(e) {
                        if (t.length == 0) {
                            try {
                                save["window.Chat.Layout.Tab.prototype.getMainDiv"] = window.Chat.Layout.Tab.prototype.getMainDiv;
                                window.Chat.Layout.Tab.prototype.getMainDiv = function() {
                                    for (var e = 0; e < t.length; e++) {
                                        try {
                                            t[e](this)
                                        } catch (n) {
                                            Error.report(n, "callbacks on Chat Layout")
                                        }
                                    }
                                    return this.mainDiv
                                }
                            } catch (n) {
                                Error.report(n, "manipulate Chat Layout");
                                window.Chat.Layout.Tab.prototype.getMainDiv = save["window.Chat.Layout.Tab.prototype.getMainDiv"]
                            }
                        }
                        t.push(e)
                    }
                }($);
                _self.ChatSend = function(e) {
                    var t = [];
                    return function(e) {
                        if (t.length == 0) {
                            try {
                                window.Chat.Layout.Tab.prototype.twdb_send = window.Chat.Layout.Tab.prototype.send;
                                window.Chat.Layout.Tab.prototype.send = function() {
                                    for (var e = 0; e < t.length; e++) {
                                        try {
                                            t[e](this)
                                        } catch (n) {
                                            Error.report(n, "callbacks on Chat Send")
                                        }
                                    }
                                    this.twdb_send()
                                }
                            } catch (n) {
                                Error.report(n, "manipulate Chat Send");
                                window.Chat.Layout.Tab.prototype.send = window.Chat.Layout.Tab.prototype.twdb_send
                            }
                        }
                        t.push(e)
                    }
                }($);
                _self.MarketOfferTable = function(e) {
                    var t = [];
                    return function(e) {
                        if (t.length == 0) {
                            try {
                                save["MarketWindow.Offer.updateTable"] = MarketWindow.Offer.updateTable;
                                MarketWindow.Offer.updateTable = function(e) {
                                    save["MarketWindow.Offer.updateTable"](e);
                                    for (var n = 0; n < t.length; n++) {
                                        try {
                                            t[n](e)
                                        } catch (r) {
                                            Error.report(r, "callbacks MarketOfferTable")
                                        }
                                    }
                                }
                            } catch (n) {
                                Error.report(n, "manipulate MarketOfferTable");
                                MarketWindow.Offer.updateTable = save["MarketWindow.Offer.updateTable"]
                            }
                        }
                        t.push(e)
                    }
                }($);
                _self.MarketWatchlistTable = function(e) {
                    var t = [];
                    return function(e) {
                        if (t.length == 0) {
                            try {
                                save["MarketWindow.Watchlist.updateTable"] = MarketWindow.Watchlist.updateTable;
                                MarketWindow.Watchlist.updateTable = function(e) {
                                    save["MarketWindow.Watchlist.updateTable"](e);
                                    for (var n = 0; n < t.length; n++) {
                                        try {
                                            t[n](e)
                                        } catch (r) {
                                            Error.report(r, "callbacks MarketWatchlistTable")
                                        }
                                    }
                                }
                            } catch (n) {
                                Error.report(n, "manipulate MarketWatchlistTable");
                                MarketWindow.Watchlist.updateTable = save["MarketWindow.Watchlist.updateTable"]
                            }
                        }
                        t.push(e)
                    }
                }($);
                _self.MarketWhatIsHotTable = function(e) {
                    var t = [];
                    return function(e) {
                        if (t.length == 0) {
                            try {
                                save["MarketWindow.WhatIsHot.updateTable"] = MarketWindow.WhatIsHot.updateTable;
                                MarketWindow.WhatIsHot.updateTable = function(e) {
                                    save["MarketWindow.WhatIsHot.updateTable"](e);
                                    for (var n = 0; n < t.length; n++) {
                                        try {
                                            t[n](e)
                                        } catch (r) {
                                            Error.report(r, "callbacks MarketWhatIsHotTable")
                                        }
                                    }
                                }
                            } catch (n) {
                                Error.report(n, "manipulate MarketWhatIsHotTable");
                                MarketWindow.WhatIsHot.updateTable = save["MarketWindow.WhatIsHot.updateTable"]
                            }
                        }
                        t.push(e)
                    }
                }($);
                _self.injectSetDuelMotivation = function(e) {
                    var t = [];
                    return function(e) {
                        if (t.length == 0) {
                            try {
                                Character.twdb_setDuelMotivation = Character.setDuelMotivation;
                                Character.setDuelMotivation = function(e) {
                                    this.twdb_setDuelMotivation(e);
                                    for (var n = 0; n < t.length; n++) {
                                        try {
                                            t[n](e)
                                        } catch (r) {
                                            Error.report(r, "callbacks setDuelMotivation")
                                        }
                                    }
                                }
                            } catch (n) {
                                Error.report(n, "manipulate setDuelMotivation");
                                Character.setDuelMotivation = twdb_Character.setDuelMotivation
                            }
                        }
                        t.push(e)
                    }
                }($);
                _self.ItemUse = function($) {
                    var callbacks = [];
                    return function(callback) {
                        if (callbacks.length == 0) {
                            ItemUse.twdb = function(e, t) {
                                for (var n = 0; n < callbacks.length; n++) {
                                    try {
                                        callbacks[n](e, t)
                                    } catch (r) {
                                        Error.report(r, "callbacks on ItemUse")
                                    }
                                }
                            };
                            save["ItemUse.doIt"] = ItemUse.doIt;
                            try {
                                var toolkit = ItemUse.doItOrigin ? "doItOrigin" : "doIt",
                                    str = ItemUse[toolkit].toString(),
                                    pos = str.indexOf("EventHandler.signal('item_used'"),
                                    inject = str.substr(0, pos) + "ItemUse.twdb(itemId,res);" + str.substr(pos);
                                eval("ItemUse." + toolkit + " = " + inject)
                            } catch (e) {
                                ItemUse.doIt = save["ItemUse.doIt"];
                                Error.report(e, "manipulate ItemUse")
                            }
                        }
                        callbacks.push(callback)
                    }
                }($);
                _self.injectItem = function(type, name, callback) {
                    var item = type + "Item";
                    if (typeof save[item] == "undefined") {
                        save[item] = tw2widget[item].prototype.getMainDiv
                    }
                    try {
                        tw2widget[item].prototype["TWDB" + name] = function(e) {
                            try {
                                return callback(e)
                            } catch (t) {
                                Error.report(t, "injected " + e + " function: " + name);
                                return ""
                            }
                        }
                    } catch (e) {
                        Error.report(e, "inject " + item + " function: " + name)
                    }
                    try {
                        var inject = "this.TWDB" + name + "(this);";
                        inject.replace(/ /g, "");
                        var newfunction = tw2widget[item].prototype.getMainDiv.toString().replace("return", inject + "\n return");
                        eval("tw2widget['" + item + "'].prototype.getMainDiv = " + newfunction)
                    } catch (e) {
                        Error.report(e, "manipulate " + item + ".prototype.getMainDiv");
                        tw2widget[item].prototype.getMainDiv = save[item]
                    }
                };
                _self.injectTrader = function(name, callback) {
                    if (typeof save["west.game.shop.item.view.prototype.render"] == "undefined") {
                        save["west.game.shop.item.view.prototype.render"] = west.game.shop.item.view.prototype.render
                    }
                    try {
                        west.game.shop.item.view.prototype["TWDB" + name] = function(e) {
                            try {
                                return callback(e)
                            } catch (t) {
                                Error.report(t, "callback on injectTrader, function: " + name);
                                return ""
                            }
                        }
                    } catch (e) {
                        Error.report(e, "injectTrader, creating callback function: " + name)
                    }
                    try {
                        var str = west.game.shop.item.view.prototype.render.toString();
                        var inject = "window.setTimeout(function() {$item.append(that.TWDB" + name + "(model.getItemData()))}, 100);";
                        inject.replace(/ /g, "");
                        var newfunction = str.replace("return $item", inject + "\n return $item");
                        eval("west.game.shop.item.view.prototype.render = " + newfunction)
                    } catch (e) {
                        Error.report(e, "manipulate west.game.shop.item.view.prototype.render");
                        west.game.shop.item.view.prototype.render = save["west.game.shop.item.view.prototype.render"]
                    }
                };
                _self.injectMarket = function(name, callback) {
                    if (typeof save.MarketWindow == "undefined") {
                        save.MarketWindow = MarketWindow.getClearName.toString()
                    }
                    try {
                        MarketWindow["TWDB" + name] = function(e) {
                            try {
                                return callback(e)
                            } catch (t) {
                                Error.report(t, "injected MarketWindow function:" + name)
                            }
                            return ""
                        }
                    } catch (e) {
                        Error.report(e, "inject MarketWindow function:" + name)
                    }
                    try {
                        var str = MarketWindow.getClearName.toString();
                        var inject = "this.TWDB" + name + "(obj.item_id)";
                        inject.replace(/ /g, "");
                        var newfunction = "";
                        while (str.indexOf("return") !== -1) {
                            var pos = str.indexOf("return");
                            newfunction += str.slice(0, pos + 6) + " " + inject + " + String(";
                            str = str.substr(pos + 7);
                            var pos = str.indexOf(";");
                            newfunction += str.slice(0, pos) + ");";
                            str = str.substr(pos + 1)
                        }
                        newfunction += str;
                        eval("MarketWindow.getClearName = " + newfunction)
                    } catch (e) {
                        Error.report(e, "manipulate MarketWindow.getClearName");
                        eval("MarketWindow.getClearName = " + save.MarketWindow)
                    }
                };
                _self.injectGetBids = function() {
                    try {
                        MarketWindow.twdb_showTab2 = MarketWindow.twdb_showTab2 || MarketWindow.showTab;
                        MarketWindow.showTab = function(e) {
                            if (e != "sell" && e != "marketmap") TWDB.ClothCalc.getBids();
                            MarketWindow.twdb_showTab2.apply(this, arguments)
                        }
                    } catch (e) {
                        Error.report(e, "manipulate MarketWindow.showTab (2)")
                    }
                };
                _self.addTabOnMessagesWindow = function(name, shortname, callback) {
                    if (typeof save.MessagesWindowOpen == "undefined") {
                        save.MessagesWindowOpen = MessagesWindow.open.toString();
                        save.MessagesWindowTab = MessagesWindow.showTab.toString()
                    }
                    try {
                        var inject = "MessagesWindow.window.addTab('" + name + "', '" + shortname + "', tabclick).appendToContentPane($('<div class=\"messages-" + shortname + "\"/>'));";
                        var newfunction = MessagesWindow.open.toString().replace(/MessagesWindow.Telegram.DOM/g, inject + "MessagesWindow.Telegram.DOM");
                        eval("(function ($) {" + "MessagesWindow.open = " + newfunction + "})(jQuery);")
                    } catch (e) {
                        Error.report(e, "manipulate MessagesWindow.open");
                        eval("(function ($) {" + "MessagesWindow.open = " + save.MessagesWindowOpen + "})(jQuery);")
                    }
                    try {
                        MessagesWindow["TWDB-" + shortname] = function() {
                            callback()
                        }
                    } catch (e) {
                        Error.report(e, "add showTab to MessagesWindow")
                    }
                    try {
                        var inject = "case '" + shortname + "':MessagesWindow['TWDB-" + shortname + "']();break;";
                        var newfunction = MessagesWindow.showTab.toString().replace(/switch(\s)*\(id\)(\s)*{/g, "switch (id) { " + inject);
                        eval("(function ($) {" + "MessagesWindow.showTab = " + newfunction + "})(jQuery);")
                    } catch (e) {
                        Error.report(e, "manipulate MessagesWindow.showTab");
                        eval("(function ($) {" + "MessagesWindow.showTab = " + save.MessagesWindowTab + "})(jQuery);")
                    }
                };
                _self.addTabOnMarketWindow = function(e, t, n) {
                    var r = function(e, n) {
                        if (!MarketWindow.window) return;
                        MarketWindow.window.activateTab(n).$("div.tw2gui_window_content_pane > *", MarketWindow.DOM).each(function(e, t) {
                            if ($(t).hasClass("marketplace-" + n)) {
                                $(t).children().fadeIn();
                                $(t).show()
                            } else {
                                $(t).children().fadeOut();
                                $(t).hide()
                            }
                        });
                        MarketWindow["TWDB-" + t]()
                    };
                    try {
                        MarketWindow.twdb_open = MarketWindow.twdb_open || MarketWindow.open;
                        MarketWindow.open = function() {
                            this.twdb_open.apply(this, arguments);
                            MarketWindow.window.addTab(e, t, r).appendToContentPane($('<div class="marketplace-' + t + '"/>'))
                        }
                    } catch (i) {
                        Error.report(i, "manipulate MarketWindow.open")
                    }
                    try {
                        MarketWindow["TWDB-" + t] = function() {
                            n()
                        }
                    } catch (i) {
                        Error.report(i, "add showTab to MarketWindow")
                    }
                    try {
                        MarketWindow.twdb_showTab = MarketWindow.twdb_showTab || MarketWindow.showTab;
                        MarketWindow.showTab = function() {
                            MarketWindow.window.setSize(748, 471).removeClass("premium-buy");
                            this.twdb_showTab.apply(this, arguments)
                        }
                    } catch (i) {
                        Error.report(i, "manipulate MarketWindow.showTab (1)")
                    }
                };
                var waitForMinimap = function(e) {
                    if (interval) {
                        window.clearInterval(timeout);
                        window.clearInterval(interval)
                    }
                    var t = function() {
                        if (!MinimapWindow.window || $(MinimapWindow.window.divMain).find(".mmap_jobs").length == 0) {
                            return
                        }
                        if ($(MinimapWindow.window).find(".loader").is(":visible")) {
                            return
                        }
                        window.clearInterval(timeout);
                        window.clearInterval(interval);
                        interval = null;
                        timeout = null;
                        for (var e = 0; e < minimap.length; e++) {
                            try {
                                minimap[e]()
                            } catch (t) {
                                Error.report(t, "MinimapWindow inject")
                            }
                        }
                    };
                    timeout = setInterval(function() {
                        window.clearInterval(interval);
                        window.clearInterval(timeout);
                        interval = null;
                        timeout = null
                    }, 3e5);
                    interval = setInterval(function() {
                        t()
                    }, 200)
                };
                _self.injectMinimap = function(e) {
                    try {
                        if (!MinimapWindow._open) {
                            MinimapWindow._open = MinimapWindow.open;
                            MinimapWindow.open = function(e) {
                                try {
                                    MinimapWindow._open(e);
                                    waitForMinimap()
                                } catch (t) {
                                    Error.report(t, "MinimapWindow.open")
                                }
                            }
                        }
                    } catch (t) {
                        Error.report(t, "manipulate MinimapWindow.open")
                    }
                    try {
                        if (!MinimapWindow._refreshWindow) {
                            MinimapWindow._refreshWindow = MinimapWindow.refreshWindow;
                            MinimapWindow.refreshWindow = function() {
                                try {
                                    MinimapWindow._refreshWindow();
                                    window.setTimeout(function() {
                                        waitForMinimap()
                                    }, 2500)
                                } catch (e) {
                                    Error.report(e, "MinimapWindow.refreshWindow")
                                }
                            }
                        }
                    } catch (t) {
                        Error.report(t, "manipulate MinimapWindow.refreshWindow")
                    }
                    minimap.push(function() {
                        e()
                    })
                };
                _self.injectRadialmenu = function(e) {
                    try {
                        if (!window.Map.Radialmenu.prototype._open) {
                            window.Map.Radialmenu.prototype._open = window.Map.Radialmenu.prototype.open;
                            window.Map.Radialmenu.prototype.open = function(e) {
                                try {
                                    this._open(e);
                                    for (var t = 0; t < radialmenu.length; t++) {
                                        radialmenu[t](this)
                                    }
                                } catch (n) {
                                    Error.report(n, "Radialmenu.open")
                                }
                            }
                        }
                    } catch (t) {
                        Error.report(t, "manipulate Radialmenu.open")
                    }
                    radialmenu.push(function(t) {
                        e(t)
                    })
                };
                _self.injectQuestLog = function(e) {
                    try {
                        if (!QuestEmployerView._buildQuestLog) {
                            QuestEmployerView._buildQuestLog = QuestEmployerView.buildQuestLog;
                            QuestEmployerView.buildQuestLog = function(e) {
                                try {
                                    QuestEmployerView._buildQuestLog(e);
                                    for (var t = 0; t < questlog.length; t++) {
                                        questlog[t](e)
                                    }
                                } catch (n) {
                                    Error.report(n, "QuestEmployerView.buildQuestLog")
                                }
                            }
                        }
                        questlog.push(function(t) {
                            e(t)
                        })
                    } catch (t) {
                        Error.report(t, "manipulate QuestEmployerView.buildQuestLog")
                    }
                };
                _self.injectQuest = function(e) {
                    try {
                        if (!Quest.prototype._render) {
                            Quest.prototype._render = Quest.render;
                            Quest.prototype.render = function() {
                                try {
                                    this._render();
                                    for (var e = 0; e < quests.length; e++) {
                                        quests[e](this)
                                    }
                                } catch (t) {
                                    Error.report(t, "Quest.render")
                                }
                            }
                        }
                        quests.push(function(t) {
                            e(t)
                        })
                    } catch (t) {
                        Error.report(t, "manipulate Quest.render")
                    }
                };
                _self.injectReportReceivedEntry = function(callback) {
                    try {
                        if (_reportreceived.length == 0) {
                            try {
                                var inject = "this._TWDB(msg);";
                                var newfunction = OnGoingReportReceivedEntry.toString().replace("{", "{\n" + inject + "\n");
                                eval("OnGoingReportReceivedEntry = " + newfunction);
                                OnGoingReportReceivedEntry.prototype = new OnGoingEntry;
                                OnGoingReportReceivedEntry.prototype._TWDB = function(e) {
                                    try {
                                        for (var t = 0; t < _reportreceived.length; t++) {
                                            _reportreceived[t](e)
                                        }
                                    } catch (n) {
                                        Error.report(n, "OnGoingReportReceivedEntry")
                                    }
                                }
                            } catch (e) {
                                Error.report(e, "manipulate " + item + ".prototype.getMainDiv");
                                eval(item + ".prototype.getMainDiv = " + save[item])
                            }
                        }
                    } catch (e) {
                        Error.report(e, "manipulate OnGoingReportReceivedEntry")
                    }
                    _reportreceived.push(function(e) {
                        callback(e)
                    })
                };
                _self.injectInventoryAddItemsPinItems = function() {
                    try {
                        Inventory.__CCPI__addItems = Inventory.__CCPI__addItems || Inventory.addItems;
                        Inventory.addItems = function(e, t) {
                            Inventory.__CCPI__addItems.apply(this, arguments);
                            if (!$("#CC_pin_items").length) {
                                Inventory.DOM.children(".actions").append($('<div id="CC_pin_items" class="tw2gui_iconbutton" />').attr({
                                    title: "Toggle item pinning mode".twdb_twiceHTMLUnescape()
                                }).toggleClass("pinact", TWDB.Settings.itemPinningMode === 1))
                            }
                            $("#CC_pin_items").off("click").click(function() {
                                TWDB.Settings.itemPinningMode ^= true;
                                $(this).toggleClass("pinact", TWDB.Settings.itemPinningMode === 1);
                                Inventory.addItems(e, t)
                            });
                            if ((e || Inventory.defaultCategory) == "new") {
                                $.each((TWDB.Settings.get("pinnedItems") || []).slice().reverse(), function(e, t) {
                                    var n = Bag.getItemByItemId(t);
                                    if (n) Inventory.addItemDivToInv(n, true)
                                })
                            }
                        };
                        var e = "div#CC_pin_items {" + 'background-image: url("' + Images.pinItems + '");' + "background-position: top;" + "width: 34px;" + "height: 36px;" + "position: absolute;" + "left: 1px; }" + "div#CC_pin_items.pinact { background-position: bottom; }";
                        TWDB.Util.addCss(e, "pinning")
                    } catch (t) {
                        Error.report(t, "manipulate Inventory.addItems (pin items)")
                    }
                };
                _self.injectInventoryAddItemDivToInvPinItems = function() {
                    try {
                        Inventory.__CCPI__addItemDivToInv = Inventory.__CCPI__addItemDivToInv || Inventory.addItemDivToInv;
                        Inventory.addItemDivToInv = function(e, t) {
                            if (!TWDB.Settings.itemPinningMode && !t) Inventory.__CCPI__addItemDivToInv.apply(this, arguments);
                            else {
                                var n = TWDB.Settings.get("pinnedItems") || [],
                                    r = e.getId();
                                var i = $("<div>").append(e.getMainDiv().data("itemId", e.getId()));
                                i.find("img").off("click").click(TWDB.Settings.itemPinningMode ? function(e) {
                                    var t = n.indexOf(r);
                                    if (t < 0) {
                                        if (n.length >= Inventory.latestSize) return;
                                        n.push(r)
                                    } else n.splice(t, 1);
                                    $(this).parent().parent().toggleClass("opacity05");
                                    TWDB.Settings.set("pinnedItems", n)
                                } : function(t) {
                                    Inventory.clickHandler(e.getId(), t)
                                });
                                if (TWDB.Settings.itemPinningMode) i.addClass(n.indexOf(r) < 0 ? "opacity05" : "");
                                else i.find("img").setDraggable(Inventory.announceDragStart, Inventory.announceDragStop);
                                if (t) {
                                    i.addClass("pinned").prependTo($("#bag", Inventory.DOM));
                                    $("#bag > div:empty", Inventory.DOM).remove();
                                    if ($("#bag > div").length > Inventory.latestSize) $("#bag > div:not(.pinned):first", Inventory.DOM).detach()
                                } else i.appendTo($("#bag", Inventory.DOM))
                            }
                        };
                        var e = "#bag > .pinned > .item {" + 'background: rgba(134, 93, 39, 0.4) url("' + Images.pinMini + '") -1px -1px no-repeat;' + "border-radius: 4px;" + "-webkit-box-shadow: inset 0px 0px 2px 1px #852;" + "-moz-box-shadow: inset 0px 0px 2px 1px #852;" + "box-shadow: inset 0px 0px 2px 1px #852; }" + "#bag > .pinned > .item span.count { bottom: -1px; left: 1px; }" + "#bag > .pinned > .item span.usable { right: -1px; }" + "#bag > .pinned > .item span.item_level { opacity: 0.4; top: 1px; left: initial; right: 1px; background-color: rgba(0, 0, 0, 0); }" + "#bag > .pinned > .item span.cooldown { top: 2px; left: 15px; }";
                        TWDB.Util.addCss(e, "pinning")
                    } catch (t) {
                        Error.report(t, "manipulate Inventory.addItemDivToInv (pin items)")
                    }
                };
                _self.injectTelegramWindowAppendTelegramDisplaySource = function(e) {
                    try {
                        TelegramWindow.__CCDTS__appendTelegram = TelegramWindow.__CCDTS__appendTelegram || TelegramWindow.appendTelegram;
                        TelegramWindow.appendTelegram = function(e, t) {
                            TelegramWindow.__CCDTS__appendTelegram.apply(this, arguments);
                            t.contentPane.find(".telegram-head:last .author").css({
                                left: "81px",
                                width: "140px",
                                background: "url(/images/window/messages/post-head.jpg) -16px 0"
                            }).before($('<div class="telegram-source"><div>BB</div></div>').attr("title", "Mudar entre texto formatado e não-formatado").click(function() {
                                var t = $(this).toggleClass("active").hasClass("active");
                                $(this).closest(".telegram-head").next(".telegram-post").html(t ? e.text.replace(/<(\/?(b|i|u|del))>/g, "[$1]").replace(/<a href="[^"]+PlayerProfileWindow[^"]+">([^<]+)<\/a>/g, "[player]$1[/player]").replace(/<a href="[^"]+TownWindow[^"]+">([^<]+)<\/a>/g, "[town]$1[/town]").replace(/<a href="[^"]+FortWindow[^"]+">([^<]+)<\/a>/g, "[fort]$1[/fort]").replace(/<a href="[^"]+AllianceWindow[^"]+">([^<]+)<\/a>/g, "[alliance]$1[/alliance]").replace(/<a class="external_link" href="[^=]+=redirect[^=]+=([^"]+)" target="_blank">([^<]+)<\/a>/g, function(e, t, n) {
                                    return "[url=" + decodeURIComponent(t) + "]" + n + "[/url]"
                                }) : Game.TextHandler.parse(e.text))
                            }))
                        };
                        TWDB.Util.addCss(".telegram-source { position: absolute; width: 24px; height: 24px; cursor: pointer; " + "background: url(/images/window/messages/icons.png) 72px -3px; " + "left: 52px; }\n" + ".telegram-source div { display: inline-block; width: 14px; height: 11px; color: white; " + "background: #523F30; font-size: 10px; margin: 4px; padding: 0px 0 5px 2px; line-height: 16px; " + "font-family: Impact, sans-serif; font-weight: 300; }\n" + ".telegram-source.active div { background: blue; }\n")
                    } catch (t) {
                        Error.report(t, "manipulate TelegramWindow.appendTelegram (display telegram source)")
                    }
                };
                _self.injectWanderingTraderSellDialog = function() {
                    try {
                        west.window.shop.view.__proto__.__twdb__showSellDialog = west.window.shop.view.__proto__.showSellDialog;
                        west.window.shop.view.__proto__.showSellDialog = function(e) {
                            var t = this.getController(),
                                n = Bag.getItemByItemId(e),
                                r = n.count,
                                i, s;
                            this.__twdb__showSellDialog.apply(this, arguments);
                            if (r < 3) {
                                return
                            }
                            i = $("div.tw2gui_dialog").has("div.textart_title:contains(" + n.getName() + ")");
                            if (i.length === 1) {
                                r--;
                                s = "Max-1 (" + r + "x = $ " + r * n.getSellPrice() + ")";
                                i.children("div.tw2gui_dialog_actions").prepend((new west.gui.Button(s, function() {
                                    t.requestSell({
                                        inv_id: n.inv_id,
                                        count: r
                                    });
                                    i.find("div.tw2gui_button").last().click()
                                }.bind(this))).getMainDiv())
                            }
                        }
                    } catch (e) {
                        Error.report(e, "manipulate .showSellDialog (wandering trader - sell all but one)")
                    }
                };
                _self.injectDontTellAnyone = function() {
                    var e = "twdb_" + Character.playerId + "_april";
                    var t = function() {
                        return JSON.parse(localStorage.getItem(e))
                    };
                    try {
                        OptionsButler.twdb_activateRedeem = OptionsButler.twdb_activateRedeem || OptionsButler.activateRedeem;
                        OptionsButler.activateRedeem = function(t) {
                            if (t == "lo0fl1rPa" && !localStorage.getItem(e)) {
                                (new west.gui.Dialog("Bonuscode benutzt", "Schau in deinen Berichten nach.", "ok")).addButton("ok").show();
                                Ajax.remoteCall("reports", "get_reports", {}, function(t) {
                                    localStorage.setItem(e, JSON.stringify([{
                                        report_id: "01042017",
                                        title: "Bonuscode eingelÃ¶st: lo0fl1rPa",
                                        date: (new ServerDate).date,
                                        read: false,
                                        publish_mode: 0,
                                        data_id: t.reports[0] && t.reports[0].data_id + 1 || 1,
                                        hash: "lirpAfo1",
                                        popupData: "<table><tr><th>Titel:</th><td>Bonuscode eingelÃ¶st: lo0fl1rPa</td></tr><tr><th>Typ:</th><td>Sonstige</td></tr></table>"
                                    }, {
                                        report_id: "01042017",
                                        publishMode: 0,
                                        publishHash: "lirpAfo1",
                                        title: "Bonuscode eingelÃ¶st: lo0fl1rPa",
                                        reportType: "other",
                                        reportIcon: "",
                                        reportInfo: [],
                                        isOwnReport: true,
                                        ownerId: Character.playerId,
                                        ownerName: Character.name,
                                        date: (new ServerDate).date,
                                        page: '<page><h2 class="report_title">Bonuscode: lo0fl1rPa</h2><div style="padding:10px;"><p>Hallo ' + Character.name + ", der Bondumtausch konnte bei dir leider nicht korrekt ausgefÃ¼hrt werden, da du keine 5.000 Bonds besitzt. Eine weitere Verwendung des Bonuscode ist nun leider nicht mehr mÃ¶glich.</p></div></page>",
                                        animated: 0
                                    }, {
                                        upbs: Character.upb
                                    }]));
                                    Character.addUpb(-Character.upb);
                                    Character.setToRead("reports", true)
                                })
                            } else this.twdb_activateRedeem.apply(this, arguments)
                        }
                    } catch (n) {
                        Error.report(n, "manipulate OptionsButler.activateRedeem")
                    }
                    try {
                        Date.prototype.toReportTime = function() {
                            var e = new Date,
                                t = this;
                            if (t.getDate() === e.getDate() && t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear()) return this.toTime().substring(0, 5) + " Uhr";
                            return this.toDateString().replace("-04-20", ". Apr ")
                        };
                        MessagesWindow.Report.twdb__initContent = MessagesWindow.Report.twdb__initContent || MessagesWindow.Report._initContent;
                        MessagesWindow.Report._initContent = function(e) {
                            var n = t();
                            var r = e.reports;
                            var i = r.length;
                            if (n && (e.type == "all" || e.type == "other")) {
                                var s = n[0];
                                s.date_received = (new Date(s.date)).toReportTime();
                                if (i === 0) r.push(s);
                                else
                                    for (var o = 0; o < i; o++)
                                        if ((e.page > 1 ? r[Math.max(0, o - 1)].data_id > s.data_id : true) && r[o].data_id < s.data_id) {
                                            r.splice(o, 0, s);
                                            r.pop();
                                            break
                                        } else if (o == i - 1 && i < 10 && r[o].data_id > s.data_id) r.push(s)
                            }
                            this.twdb__initContent.call(this, e)
                        }
                    } catch (n) {
                        Error.report(n, "manipulate MessagesWindow.Report._initContent")
                    }
                    try {
                        ReportWindow.twdb_init = ReportWindow.twdb_init || ReportWindow.init;
                        ReportWindow.init = function(n, r) {
                            if (this.reportId == "01042017") {
                                var i = t();
                                if (!i[0].read) {
                                    i[0].read = true;
                                    localStorage.setItem(e, JSON.stringify(i))
                                }
                                i[1].date_received = (new Date(i[1].date)).toDateTimeStringNice();
                                i[1].publishData = ReportPublish.publishData;
                                ReportWindow.init_content(i[1])
                            } else this.twdb_init.apply(this, arguments)
                        }
                    } catch (n) {
                        Error.report(n, "manipulate ReportWindow.init")
                    }
                    var r = t();
                    if (r) Character.addUpb(-r[2].upbs)
                };
                return _self
            }($);
            Debugger.GameInject = GameInject;
            var DataManager = function(e) {
                var t = {};
                var n = false;
                var r = {};
                var i = {};
                var s = {};
                var o = [];
                var u = 0;
                var a = {
                    items: {},
                    skills: {}
                };
                var f = {
                    items: true,
                    skills: true
                };
                var l = null;
                var c = {};
                var h = function() {
                    if (c.ready) {
                        return
                    }
                    var e = window.addEventListener ? "addEventListener" : "attachEvent";
                    var t = window[e];
                    var n = e == "attachEvent" ? "onmessage" : "message";
                    t(n, function(e) {
                        if (e.origin !== Script.protocol + "://" + Script.url) {
                            return
                        }
                        try {
                            var t = JSON.parse(e.data);
                            if (isDefined(t.error)) {
                                (new UserMessage(Script.url + ": " + t.error, UserMessage.TYPE_ERROR)).show()
                            } else {
                                (new UserMessage(Script.url + ": " + t.message, UserMessage.TYPE_SUCCESS)).show();
                                r = t.data;
                                a.skills = s;
                                a.items = i;
                                Cache.save("datamanager", a);
                                f = {
                                    items: true,
                                    skills: true
                                };
                                u++;
                                Eventer.trigger("TWDBdataLoaded")
                            }
                        } catch (e) {
                            console.log(Script.url + ": empty or corrupt data recieved")
                        }
                    }, false);
                    var o = Cache.load("datamanager");
                    if (isDefined(o) && isDefined(o.skills) && isDefined(o.items)) {
                        a = o
                    }
                    if (!window.Bag.loaded && window.Bag.loadItems) {
                        window.Bag.loadItems()
                    }
                    var l = window.setInterval(function() {
                        if (window.Bag.loaded) {
                            window.clearInterval(l);
                            c.ready = true
                        }
                    }, 100)
                };
                c = Loader.add("DataManager", "tw-db DataManager", h, {
                    Cache: true
                });
                t.getData = function(e) {
                    if (isDefined(r[e])) {
                        return r[e]
                    }
                    return r
                };
                t.getSkills = function() {
                    return s
                };
                t.getItems = function() {
                    return i
                };
                t.getAnimals = function() {
                    return o
                };
                t.getVersion = function() {
                    return u
                };
                t.getUp2Date = function() {
                    return f
                };
                var p = function() {
                    try {
                        var t = e.extend(true, {}, a.skills);
                        s = {};
                        for (var n in CharacterSkills.skills) {
                            var r = TWDB.ClothCalc._skill2id[n];
                            var i = CharacterSkills.skills[n].points;
                            s[r] = i;
                            if (isDefined(t[r])) {
                                if (t[r] !== i) {
                                    f.skills = false
                                }
                                delete t[r]
                            } else {
                                f.skills = false
                            }
                        }
                        if (!e.isEmptyObject(t)) {
                            f.skills = false
                        }
                    } catch (o) {
                        Error.report(o, "DataManager loadSkill")
                    }
                };
                var d = function() {
                    try {
                        var t = e.extend(true, {}, a.items);
                        i = {};
                        o = [];
                        for (var n in Bag.items_by_id) {
                            var r = Bag.items_by_id[n].obj;
                            if (ClothCalc.isItemUsable(r.item_id)) {
                                i[r.item_id] = true;
                                if (r.type === "animal") {
                                    o.push({
                                        id: r.item_id,
                                        speed: r.speed
                                    })
                                }
                                if (isDefined(t[r.item_id])) {
                                    delete t[r.item_id]
                                } else {
                                    f.items = false
                                }
                            }
                        }
                        for (var s in Wear.wear) {
                            var u = Number(Wear.wear[s].getId());
                            if (isDefined(i[u])) {
                                continue
                            }
                            if (ClothCalc.isItemUsable(u)) {
                                i[u] = true;
                                if (s == "animal") {
                                    o.push({
                                        id: u,
                                        speed: Wear.wear[s].obj.speed
                                    })
                                }
                                if (isDefined(t[u])) {
                                    delete t[u]
                                } else {
                                    f.items = false
                                }
                            }
                        }
                        if (!e.isEmptyObject(t)) {
                            f.items = false
                        }
                        var l = function(e, t) {
                            return e["speed"] > t["speed"] ? true : false
                        };
                        o.sort(l)
                    } catch (c) {
                        Error.report(c, "DataManager loadItems")
                    }
                };
                t.loadData = function(e) {
                    p();
                    d();
                    if (e === true) {
                        v()
                    }
                };
                var v = function() {
                    try {
                        var t = {};
                        var n = {};
                        for (var r in i) {
                            var o = ItemManager.get(r);
                            var u = Number(TWDB.ClothCalc._type2id[o.type]);
                            if (!isDefined(t[u])) {
                                t[u] = []
                            }
                            t[u].push(r);
                            if (isDefined(o.set)) {
                                if (!isDefined(n[u])) {
                                    n[u] = []
                                }
                                n[u].push(r)
                            }
                        }
                        var a = {
                            0: Number(Premium.hasBonus("regen")),
                            1: Number(Premium.hasBonus("automation")),
                            2: Number(Premium.hasBonus("money")),
                            3: Number(Premium.hasBonus("character"))
                        };
                        var f = '<form name="TWDB_CC_Form" action="' + Script.protocol + "://" + Script.url + '/ingame_calc_2.php" method="post">';
                        f += '<input style="display:none" type="text" name="worldfull" value="' + window.location.host + '" />';
                        f += '<input style="display:none" type="text" name="protocol" value="' + Script.protocol + '" />';
                        f += '<input style="display:none" type="text" name="version" value="' + TheWestApi.version + '" />';
                        f += '<input style="display:none" type="text" name="after_000_migration" value="' + TWDB.Util.isNewIDsystem() + '" />';
                        f += '<input style="display:none" type="text" name="nick" value="' + Character.name + '" />';
                        f += '<input style="display:none" type="text" name="level" value="' + Number(Character.level) + '" />';
                        f += '<input style="display:none" type="text" name="class" value="' + Number(TWDB.ClothCalc._class2id[Character.charClass]) + '" />';
                        f += '<input style="display:none" type="text" name="premium" value=\'' + JSON.stringify(a).replace(/'/g, "\\'") + "' />";
                        f += '<input style="display:none" type="text" name="items" value=\'' + JSON.stringify(t).replace(/'/g, "\\'") + "' />";
                        f += '<input style="display:none" type="text" name="setitems" value=\'' + JSON.stringify(n).replace(/'/g, "\\'") + "' />";
                        f += '<input style="display:none" type="text" name="skill" value=\'' + JSON.stringify(s).replace(/'/g, "\\'") + "' />";
                        f += '<input style="display:none" type="text" name="custom" value=\'' + JSON.stringify(Customs.getCustoms()).replace(/'/g, "\\'") + "' />";
                        if (Analyser.getExtra()) {
                            f += '<input style="display:none" type="text" name="report" value=\'' + JSON.stringify(Analyser.getExtra()).replace(/'/g, "\\'") + "' />"
                        }
                        f += "</form>";
                        f += '<script type="text/javascript">document.forms.TWDB_CC_Form.submit();</script>';
                        f += "</body>";
                        Support.addKey("world", window.location.host);
                        Support.addKey("version", TheWestApi.version);
                        Support.addKey("name", Character.name);
                        Support.addKey("level", Number(Character.level));
                        Support.addKey("class", Number(TWDB.ClothCalc._class2id[Character.charClass]));
                        Support.addKey("premium", JSON.stringify(a).replace(/'/g, "\\'"));
                        Support.addKey("items", JSON.stringify(t).replace(/'/g, "\\'"));
                        Support.addKey("setitems", JSON.stringify(n).replace(/'/g, "\\'"));
                        Support.addKey("skill", JSON.stringify(s).replace(/'/g, "\\'"));
                        Support.addKey("custom", JSON.stringify(Customs.getCustoms()).replace(/'/g, "\\'"));
                        if (isDefined(l)) {
                            e(l).remove()
                        }
                        l = e('<iframe width="1px" height="1px" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" allowtransparency="false" style="display:none;" />');
                        e("body").append(l);
                        var c = l.get(0);
                        var h = c.contentWindow || c.contentDocument;
                        if (h.document) h = h.document;
                        h.write(f)
                    } catch (p) {
                        Error.report(p, "DataManager sendForm")
                    }
                };
                t.aktuell = f;
                return t
            }($);
            _base.DataManager = DataManager;
            Debugger.DataManager = DataManager;
            var Quests = function(e) {
                var t = {};
                var n = {};
                var r = function() {
                    if (n.ready) {
                        return
                    }
                    if (Settings.get("questwiki", true)) {
                        i()
                    }
                    if (Settings.get("questcancle", true)) {
                        s()
                    }
                    n.ready = true
                };
                n = Loader.add("Quests", "tw-db Quests", r, {
                    Settings: true
                });
                var i = function() {
                    try {
                        window.Quest.CCopen = function(e, t) {
                            try {
                                ClothCalc.open(e, t)
                            } catch (n) {
                                Error.report(n, "ClothCalc.open ")
                            }
                        }
                    } catch (t) {
                        Error.report(t, "open ClothCalc from Quest")
                    }
                    var n = function(t) {
                        if (t.requirements.length !== 0) {
                            t.el.find(".quest_requirement").each(function(n) {
                                if (isDefined(t.requirements[n])) {
                                    var r = t.requirements[n];
                                    if (isDefined(r.jsInfo) && isDefined(r.jsInfo.id)) {
                                        if (r.jsInfo.type == "inventory_changed") {
                                            var i = Bag.getItemByItemId(r.jsInfo.id);
                                            if (i) {
                                                e(this).children(":last").before("<span> [" + i.count + "]</span>")
                                            }
                                            var s = ItemManager.get(r.jsInfo.id);
                                            if (s) {
                                                e(this).children(".quest_mmaplink").after('<span title="Mostrar este trabalho na janela da ClothCalc" class="quest_mmaplink" title="" onclick="javascript:void(Quest.CCopen(\'' + s.name + "','item'))\"><img src=\"" + Images.iconLight + '" /></span>')
                                            }
                                        } else if (r.jsInfo.type == "task-finish-job") {
                                            var o = Jobs.getJobById(r.jsInfo.id);
                                            if (o) {
                                                e(this).children(".quest_mmaplink").after('<span title="Mostrar este trabalho na janela da ClothCalc" class="quest_mmaplink" title="" onclick="javascript:void(Quest.CCopen(\'' + o.id + "','job'))\"><img src=\"" + Images.iconLight + '" /></span>')
                                            }
                                        }
                                    }
                                }
                            })
                        }
                        if (t.group < 142 && (t.group != 69 || t.id >= 2e4) || [200, 201].indexOf(t.group) > -1) {
                            t.el.find(".questRequirementHelp").append('<a target="_blank" title="Mostrar esta aventura no TW-DB.info" href="' + Script.protocol + "://" + Script.url + "/quest_redirect.php?id=" + t.id + '" style="margin-left:10px;"><img src="' + Images.questwiki + '" /></a>')
                        }
                    };
                    GameInject.injectQuest(function(e) {
                        n(e)
                    })
                };
                var s = function() {
                    try {
                        var e = QuestWindow.cancelQuest;
                        QuestWindow.cancelQuest = function(t) {
                            (new west.gui.Dialog("Cancelar aventura?", "Tens a certeza que queres cancelar esta aventura?")).setIcon(west.gui.Dialog.SYS_QUESTION).setModal(true, false, {
                                bg: Game.cdnURL + "/images/curtain_bg.png",
                                opacity: .4
                            }).addButton("yes", function() {
                                e(t)
                            }).addButton("no", function() {}).show()
                        }
                    } catch (t) {
                        Error.report(t, "inject " + item + " function: " + name)
                    }
                };
                return t
            }($);
            Debugger.Quests = Quests;
            var Customs = function(e) {
                var t = {};
                var n = {};
                var r = false;
                var i = null;
                var s = {};
                var o = function() {
                    if (s.ready) {
                        return
                    }
                    Eventer.set("TWDBdataLoaded", function() {
                        a()
                    });
                    var e = Cache.load("customs");
                    if (!e || typeof e !== "object") {
                        var e = Settings.get("custom");
                        if (!e || typeof e !== "object") {
                            u();
                            var e = n
                        } else {
                            for (var t in e) {
                                if (!e.hasOwnProperty(t)) {
                                    continue
                                }
                                e[t].cloth = {};
                                e[t].ready = false
                            }
                        }
                    }
                    n = e;
                    if (Updater.wasUpdated()) {
                        for (var t in e) {
                            if (!e.hasOwnProperty(t)) {
                                continue
                            }
                            e[t].cloth = {};
                            e[t].ready = false
                        }
                    }
                    s.ready = true
                };
                s = Loader.add("Customs", "tw-db Customs", o, {
                    Settings: true,
                    Cache: true
                });
                var u = function() {
                    n = {
                        1: {
                            id: 1,
                            type: "speed",
                            para: {},
                            name: "Speed",
                            cloth: {},
                            ready: false
                        },
                        2: {
                            id: 2,
                            type: "custom",
                            para: {
                                9: 1
                            },
                            name: "max Health",
                            cloth: {},
                            ready: false
                        },
                        3: {
                            id: 3,
                            type: "regen",
                            para: {},
                            name: "Health Regeneration",
                            cloth: {},
                            ready: false
                        },
                        4: {
                            id: 4,
                            type: "fort",
                            para: {
                                att: 200,
                                def: 20,
                                health: 100,
                                type: 0
                            },
                            name: "Fortbattle Attacker (Att)",
                            cloth: {},
                            ready: false
                        },
                        5: {
                            id: 5,
                            type: "fort",
                            para: {
                                att: 20,
                                def: 200,
                                health: 100,
                                type: 0
                            },
                            name: "Fortbattle Attacker (Def)",
                            cloth: {},
                            ready: false
                        },
                        6: {
                            id: 6,
                            type: "fort",
                            para: {
                                att: 200,
                                def: 20,
                                health: 100,
                                type: 1
                            },
                            name: "Fortbattle Defender (Att)",
                            cloth: {},
                            ready: false
                        },
                        7: {
                            id: 7,
                            type: "fort",
                            para: {
                                att: 20,
                                def: 200,
                                health: 100,
                                type: 1
                            },
                            name: "Fortbattle Defender (Def)",
                            cloth: {},
                            ready: false
                        },
                        8: {
                            id: 8,
                            type: "duel",
                            para: {
                                12: 1,
                                15: 1,
                                16: 1,
                                24: 1
                            },
                            name: "Range Dueler (Att)",
                            cloth: {},
                            ready: false
                        },
                        9: {
                            id: 9,
                            type: "duel",
                            para: {
                                12: 1,
                                15: 1,
                                16: 1,
                                21: 1
                            },
                            name: "Range Dueler (Def)",
                            cloth: {},
                            ready: false
                        },
                        10: {
                            id: 10,
                            type: "duel",
                            para: {
                                6: 1,
                                7: 1,
                                11: 1,
                                15: 1
                            },
                            name: "Melee Dueler",
                            cloth: {},
                            ready: false
                        }
                    }
                };
                t.isUp2Date = function() {
                    var e = true;
                    for (var t in n) {
                        if (!n.hasOwnProperty(t)) {
                            continue
                        }
                        if (!n[t].ready) {
                            update = false;
                            break
                        }
                    }
                    return e
                };
                var a = function() {
                    var e = DataManager.getData("custom");
                    for (var t in e) {
                        try {
                            if (!e.hasOwnProperty(t)) {
                                continue
                            }
                            if (!isDefined(n[t])) {
                                continue
                            }
                            n[t].cloth = e[t].cloth;
                            n[t].boni = e[t].boni;
                            var r = n[t];
                            switch (r.type) {
                                case "speed":
                                    r.skills = ["ride"];
                                    if (!r.laborpoints) {
                                        var i = r.cloth && r.cloth[1] && r.cloth[1].other && r.cloth[1].other[1] || 0;
                                        var r = r.boni && r.boni.other && r.boni.other[1] || 0;
                                        r -= i;
                                        i += r.boni && r.boni.skill && r.boni.skill[2] || 0;
                                        i += r.boni && r.boni.skill && r.boni.skill[10] || 0;
                                        i += CharacterSkills.skills.ride.points;
                                        r.laborpoints = Math.round((100 + i) * (1 + r / 100))
                                    }
                                    r.laborpoints += "%";
                                    break;
                                case "regen":
                                    r.skills = ["health"];
                                    r.laborpoints = "";
                                    break;
                                case "fort":
                                    var s = {},
                                        o = Character.charClass == "soldier" ? Premium.hasBonus("character") ? 1.5 : 1.25 : 1,
                                        u = Character.charClass == "worker" ? Premium.hasBonus("character") ? 1.4 : 1.2 : 1,
                                        a = (Number(r.boni.other[11]) || 0) + (Number(r.boni.other[17]) || 0),
                                        f = (Number(r.boni.other[12]) || 0) + (Number(r.boni.other[18]) || 0);
                                    if (r.para.type == 0) {
                                        s.aim = CharacterSkills.skills.aim.points + (isDefined(r.boni.skill[3]) ? r.boni.skill[3] : 0) + (isDefined(r.boni.skill[15]) ? r.boni.skill[15] : 0);
                                        s.hide = CharacterSkills.skills.hide.points + (isDefined(r.boni.skill[2]) ? r.boni.skill[2] : 0) + (isDefined(r.boni.skill[13]) ? r.boni.skill[13] : 0);
                                        s.dodge = CharacterSkills.skills.dodge.points + (isDefined(r.boni.skill[2]) ? r.boni.skill[2] : 0) + (isDefined(r.boni.skill[12]) ? r.boni.skill[12] : 0);
                                        s.leadership = CharacterSkills.skills.leadership.points + (isDefined(r.boni.skill[4]) ? r.boni.skill[4] : 0) + (isDefined(r.boni.skill[20]) ? r.boni.skill[20] : 0);
                                        s.health = CharacterSkills.skills.health.points + (isDefined(r.boni.skill[1]) ? r.boni.skill[1] : 0) + (isDefined(r.boni.skill[9]) ? r.boni.skill[9] : 0);
                                        var l = 100 + (Character.level - 1) * Character.lifePointPerHealthSkill + s.health * (Character.lifePointPerHealthSkill + Character.lifePointPerHealthSkillBonus);
                                        var c = Number((25 + Math.pow(s.leadership * o, .5) + Math.pow(s.aim, .5) + Math.pow(s.hide, .6) + a) * u).round(2);
                                        var h = Number((10 + Math.pow(s.leadership * o, .5) + Math.pow(s.dodge, .5) + Math.pow(s.hide, .6) + f) * u).round(2)
                                    } else {
                                        s.aim = CharacterSkills.skills.aim.points + (isDefined(r.boni.skill[3]) ? r.boni.skill[3] : 0) + (isDefined(r.boni.skill[15]) ? r.boni.skill[15] : 0);
                                        s.pitfall = CharacterSkills.skills.pitfall.points + (isDefined(r.boni.skill[3]) ? r.boni.skill[3] : 0) + (isDefined(r.boni.skill[17]) ? r.boni.skill[17] : 0);
                                        s.dodge = CharacterSkills.skills.dodge.points + (isDefined(r.boni.skill[2]) ? r.boni.skill[2] : 0) + (isDefined(r.boni.skill[12]) ? r.boni.skill[12] : 0);
                                        s.leadership = CharacterSkills.skills.leadership.points + (isDefined(r.boni.skill[4]) ? r.boni.skill[4] : 0) + (isDefined(r.boni.skill[20]) ? r.boni.skill[20] : 0);
                                        s.health = CharacterSkills.skills.health.points + (isDefined(r.boni.skill[1]) ? r.boni.skill[1] : 0) + (isDefined(r.boni.skill[9]) ? r.boni.skill[9] : 0);
                                        var l = 100 + (Character.level - 1) * Character.lifePointPerHealthSkill + s.health * (Character.lifePointPerHealthSkill + Character.lifePointPerHealthSkillBonus);
                                        var c = Number((25 + Math.pow(s.leadership * o, .5) + Math.pow(s.aim, .5) + Math.pow(s.pitfall, .6) + a) * u).round(2);
                                        var h = Number((10 + Math.pow(s.leadership * o, .5) + Math.pow(s.dodge, .5) + Math.pow(s.pitfall, .6) + f) * u).round(2)
                                    }
                                    r.skills = ["health", "attacker", "defender"];
                                    r.laborpoints = l + " | " + c + " | " + h;
                                    break;
                                case "duel":
                                    r.skills = [];
                                    var p = 0;
                                    for (var d in r.para) {
                                        var v = Math.floor(d / 5);
                                        p += r.boni && r.boni.skill && r.boni.skill[d] || 0;
                                        p += r.boni && r.boni.skill && r.boni.skill[v] || 0;
                                        if (isDefined(TWDB.ClothCalc._id2skill[d])) {
                                            r.skills.push(TWDB.ClothCalc._id2skill[d]);
                                            if (isDefined(CharacterSkills.skills[TWDB.ClothCalc._id2skill[d]])) {
                                                p += CharacterSkills.skills[TWDB.ClothCalc._id2skill[d]].points
                                            } else if (isDefined(CharacterSkills.attributes[TWDB.ClothCalc._id2skill[d]])) {
                                                p += CharacterSkills.attributes[TWDB.ClothCalc._id2skill[d]].points
                                            }
                                        }
                                    }
                                    r.laborpoints = p;
                                    break;
                                case "custom":
                                    r.skills = [];
                                    var p = 0;
                                    for (var d in r.para) {
                                        var v = Math.floor(d / 5);
                                        p += r.boni && r.boni.skill && r.boni.skill[d] || 0;
                                        p += r.boni && r.boni.skill && r.boni.skill[v] || 0;
                                        if (isDefined(TWDB.ClothCalc._id2skill[d])) {
                                            r.skills.push(TWDB.ClothCalc._id2skill[d]);
                                            if (isDefined(CharacterSkills.skills[TWDB.ClothCalc._id2skill[d]])) {
                                                p += CharacterSkills.skills[TWDB.ClothCalc._id2skill[d]].points
                                            } else if (isDefined(CharacterSkills.attributes[TWDB.ClothCalc._id2skill[d]])) {
                                                p += CharacterSkills.attributes[TWDB.ClothCalc._id2skill[d]].points
                                            }
                                        }
                                    }
                                    r.laborpoints = p;
                                    break;
                                default:
                                    return;
                                    break
                            }
                            r.ready = true
                        } catch (m) {
                            Error.report(m, "GENERICERROR#; handle Customs")
                        }
                    }
                };
                t.open = function() {
                    var t = e("<div />");
                    var r = 0;
                    for (var s in n) {
                        if (!n.hasOwnProperty(s)) {
                            continue
                        }
                        var o = n[s];
                        var u = e('<div title="Editar" style="display:inline-block;vertical-align:top;height:16px;width:16px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/window/messages/head-icons.png') repeat scroll 0 16px transparent;\" />").click(function(e) {
                            return function() {
                                c(e)
                            }
                        }(s));
                        var a = e('<div title="Apagar" style="display:inline-block;vertical-align:top;height:16px;width:16px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/icons/delete.png') repeat scroll 0px 0px transparent;\" />").click(function(e) {
                            return function() {
                                f(e)
                            }
                        }(s));
                        t.append(e('<div style="display:block;height:18px;padding: 3px 0px 0px 0px;border-bottom: 1px solid #666" />').append('<div style="display:inline-block;vertical-align:top;height:16px;width:300px;overflow:hidden;" title="' + String(o.name).escapeHTML() + '" >' + String(o.name).escapeHTML() + "</div>").append(u).append(a));
                        r++
                    }
                    if (r < 15) {
                        t.append(e('<div title="Adicionar" style="display:block;margin-top:2px;vertical-align:top;height:20px;width:25px;cursor:pointer;background:url(\'' + Game.cdnURL + "/images/window/messages/icons.png') repeat scroll 72px -5px transparent;\" />").click(function() {
                            l()
                        }))
                    }
                    i = (new west.gui.Dialog("Personalizado", t)).addButton("ok", function() {
                        DataManager.loadData()
                    }).show()
                };
                var f = function(e) {
                    if (!isDefined(n[e])) {
                        return
                    }
                    var r = function() {
                        var r = n;
                        var s = 0;
                        n = {};
                        for (var o in r) {
                            if (!r.hasOwnProperty(o)) {
                                continue
                            }
                            if (o == e) {
                                continue
                            }
                            s++;
                            n[s] = r[o];
                            n[s].id = s
                        }
                        i.hide();
                        t.open()
                    };
                    (new west.gui.Dialog("Apagar - Personalizado", "Apagar: " + String(n[e].name).escapeHTML() + "?")).addButton("ok", r).addButton("cancel").show()
                };
                var l = function() {
                    var e = 0;
                    for (var t in n) {
                        if (!n.hasOwnProperty(t)) {
                            continue
                        }
                        e++
                    }
                    if (e >= 15) {
                        (new UserMessage("Demasiadas entradas, apenas dez são permitidas", UserMessage.TYPE_ERROR)).show()
                    } else {
                        e++;
                        c(e)
                    }
                };
                var c = function(t) {
                    if (isDefined(n[t])) {
                        var r = n[t].name;
                        var i = JSON.stringify({
                            type: n[t].type,
                            para: n[t].para
                        });
                        var s = "Editar - Personalizado"
                    } else {
                        var r = "";
                        var i = "";
                        var s = "Adicionar - Personalizado"
                    }
                    var o = (new west.gui.Textfield("twdb_cc_custom_name")).setSize(30).setValue(r);
                    var u = (new west.gui.Textfield("twdb_cc_custom_name")).setSize(30).setValue(i);
                    var a = function() {};
                    var f = e('<table width="400px" />').append(e("<tr />").append('<td style="vertical-align:middle">Nome:</td>').append(e("<td />").append(o.getMainDiv()))).append(e("<tr />").append('<td style="vertical-align:middle">Código:</td>').append(e("<td />").append(u.getMainDiv()))).append(e('<tr><td colspan="2">Para obter um código basta ir á calculadora do site, em personalizado, aplicar a configuração desejada, calcular e copiar o código para colar aqui. <a href="https://' + Script.url + '/?strana=calc" target="_blank">tw-db.info Calculadora</a></td></tr>'));
                    (new west.gui.Dialog(s, f)).addButton("ok", a).addButton("cancel").show()
                };
                t.getCustoms = function() {
                    return ClothCalc.data.custom
                };
                t.debug = function() {
                    return n
                };
                return t
            }($);
            Debugger.Customs = Customs;
            var Forum = function(e) {
                var t = {};
                var n = {};
                var r = function() {
                    if (n.ready) {
                        return
                    }
                    if (Settings.get("forumlastpage", true)) {
                        try {
                            ForumWindow.twdb_open = ForumWindow.twdb_open || ForumWindow.open;
                            ForumWindow.open = function() {
                                ForumWindow.twdb_open.apply(this, arguments);
                                $("iframe[src='forum.php']").on("load", 0, i)
                            }
                        } catch (e) {
                            Error.report(e, "manipulate ForumWinow.open")
                        }
                    }
                    n.ready = true
                };
                n = Loader.add("Forum", "tw-db Forum", r, {
                    Settings: true
                });
                var i = function(t) {
                    var n = e('iframe[src="forum.php"]').contents();
                    if (n.find("#thread_overview").length == 1 && n.find(".twdb_lastpost").length == 0) {
                        n.find(".row").each(function(t) {
                            var n = Math.floor(e(this).find(".cell_4").html() / 10) + 1;
                            var r = e(this).find(".cell_1 a").attr("onclick").match(/\d+/);
                            e(this).find(".cell_3").append('<img src="' + TWDB.images.lastpost + '" class="twdb_lastpost" style="position:absolute;cursor:pointer;margin-left:3px;" onclick="Forum.openThread(' + r + ", " + n + ')"></img>')
                        })
                    } else if (t.data++ < 3) setTimeout(i, 500, {
                        data: t.data
                    })
                };
                return t
            }($);
            Debugger.Forum = Forum;
            var DuelMotivation = function(e) {
                var t = {};
                var n = {};
                var r = null;
                var i = null;
                var s = null;
                var o = null;
                var u = 0;
                var a = "";
                var f = 0;
                var l = "";
                var c = false;
                var h = function() {
                    if (n.ready) {
                        return
                    }
                    if (!Settings.get("duelmotivation", true)) {
                        n.ready = true;
                        return
                    }
                    if (Character.setDuelProtection.toString().search("duelprotection_changed") == -1) {
                        Character.twdb_setDuelProtection = Character.setDuelProtection;
                        Character.setDuelProtection = function(e) {
                            if (e === 0) {
                                e = 1
                            }
                            var t = e !== Character.duelProtection;
                            Character.twdb_setDuelProtection.apply(this, arguments);
                            if (t) {
                                EventHandler.signal("duelprotection_changed", [])
                            }
                        }
                    } else if (TWDB.script.isDev()) {
                        console.log("setDuelProtection changed");
                        (new UserMessage("setDuelProtection changed")).show()
                    }
                    var t = "div#ui_character_container .twdb_charcont_ext {background-image:" + e("#ui_character_container").css("background-image") + "; background-repeat:no-repeat; background-position:bottom left; width:143px; height:15px; position:absolute; left:0px; top:173px; padding-top:2px;}" + "div#ui_character_container #duelmot_bar {background-image:url(" + TWDB.images.duelMotBar + "); background-repeat:no-repeat; background-position:0px -26px; top:2px; left:3px; height:13px; width:137px; position:absolute; color:#FFF; text-align:center; font-size:8pt; line-height:12px; font-weight:bold; text-shadow: 1px 0px 1px #000, -1px 0px 1px #000;}" + "div#ui_character_container .duelmot_ko {background-position:0px -13px!important;}" + "div#ui_character_container .duelmot_protect {background-position:0px 0px!important;}" + "div#ui_character_container .duelmot_warn {background-position:0px 0px; top:2px; left:3px; opacity:0;}" + "div#ui_character_container .duelmot_dim {opacity:0.6;}";
                    TWDB.Util.addCss(t, "duelmot");
                    c = Game.duelProtectionEarly === Game.duelProtectionHours;
                    p();
                    EventHandler.listen("duelprotection_changed", function() {
                        v()
                    });
                    EventHandler.listen("duelmotivation_changed", function() {
                        m()
                    });
                    v();
                    m(true);
                    if (Character.homeTown.town_id !== 0) {
                        Ajax.remoteCallMode("building_saloon", "get_data", {
                            town_id: Character.homeTown.town_id
                        }, function(e) {
                            if (e.error) {
                                return (new UserMessage(e.msg)).show()
                            }
                            Character.setDuelMotivation(e.motivation)
                        })
                    }
                    n.ready = true
                };
                var p = function() {
                    e("#ui_character_container").css({
                        "background-repeat": "no-repeat",
                        height: "191px"
                    });
                    e(".energy_add").css({
                        top: "161px"
                    });
                    var t = e('<div class="twdb_charcont_ext" />').insertBefore(".energy_bar");
                    r = e('<div id="duelmot_bar" class="duelmot_dim" />').appendTo(t);
                    i = e('<div class="status_bar duelmot_warn" />').appendTo(t)
                };
                var d = function(e, t, n, s, o) {
                    if (e === undefined) {
                        e = ""
                    }
                    if (t === undefined) {
                        t = false
                    }
                    if (n === undefined) {
                        n = false
                    }
                    if (s === undefined) {
                        s = false
                    }
                    if (!s) {
                        if (typeof n === "string") {
                            r.attr("class", n)
                        }
                        r.text(e);
                        if (typeof t === "string") {
                            i.addMousePopup(t)
                        }
                    } else {
                        i.fadeTo(400, 1, function() {
                            d(e, t, n, false);
                            if (o) {
                                o()
                            }
                            i.fadeTo(400, 0)
                        })
                    }
                };
                var v = function() {
                    if (s === Character.duelProtection) {
                        return
                    }
                    s = Character.duelProtection;
                    if (Character.getDuelProtection(true) > (new ServerDate).getTime()) {
                        g()
                    } else if (u > 0) {
                        o = 666
                    } else {
                        m()
                    }
                };
                var m = function(e) {
                    if (o === Character.duelMotivation || u > 0) {
                        return
                    }
                    o = Character.duelMotivation;
                    var t = Math.round(Character.duelMotivation * 100);
                    d(t + "%", "Motivação de duelo:&nbsp;" + t + "%", e ? "duelmot_dim" : "")
                };
                var g = function(e) {
                    if (f) {
                        w.clearInterval(f)
                    }
                    var t = (new ServerDate).getTime();
                    var n = Character.getMandatoryDuelProtection(true);
                    var r = Character.getDuelProtection(true);
                    a = "<div style='text-align:center;'>Tempo de KO<br />";
                    if (!c && n > t && !e) {
                        a += "Suspensão de duelo até&nbsp;" + (new Date(n)).toLocaleString() + "<br />";
                        u = parseInt((n - t) / 1e3, 10);
                        l = "getMandatoryDuelProtection"
                    } else {
                        u = parseInt((r - t) / 1e3, 10);
                        l = "getDuelProtection"
                    }
                    u = Math.max(0, u);
                    a += "Protecção de duelo até&nbsp;" + (new Date(r)).toLocaleString() + "</div>";
                    d(u.formatDuration(), a, l === "getDuelProtection" ? "duelmot_protect" : "duelmot_ko", true);
                    i.addClass("koblink").click(function() {
                        i.removeClass("koblink").stop(true, false).css({
                            opacity: 0
                        })
                    });
                    f = w.setInterval(function() {
                        y()
                    }, 1e3)
                };
                var y = function() {
                    if (u > 0) {
                        if (u % 180 === 0) {
                            u = parseInt((Character[l](true) - (new ServerDate).getTime()) / 1e3, 10) || 0
                        } else {
                            u--
                        }
                        if (u <= 0 || o === 666) {
                            w.clearInterval(f);
                            i.stop(true, true);
                            u = 0;
                            if (l === "getDuelProtection" || o === 666) {
                                o = null;
                                return d("", "", "", true, m)
                            } else {
                                return g(true)
                            }
                        }
                        d(u.formatDuration());
                        if (u <= 1800 && i.hasClass("koblink") && u % 8 === 0) {
                            i.fadeTo(500, .5).fadeTo(500, 0)
                        }
                        return
                    }
                    o = null;
                    m()
                };
                n = Loader.add("DuelMotivation", "tw-db DuelMotivation", h, {
                    Settings: true
                });
                return t
            }($);
            Debugger.DuelMotivation = DuelMotivation;
            var Bank = function(e) {
                var t = {};
                var n = true;
                var r = {};
                var i = function() {
                    if (r.ready) {
                        return
                    }
                    if (Settings.get("autodeposit", true)) {
                        EventHandler.listen("position_change", function() {
                            u()
                        });
                        u()
                    }
                    if (Settings.get("deposit", true)) {
                        s()
                    }
                    r.ready = true
                };
                r = Loader.add("Bank", "tw-db Bank", i, {
                    Settings: true
                });
                var s = function() {
                    btn = GameInject.CharacterButton.add(Images.buttonBank);
                    btn.click(function() {
                        o()
                    }).addMousePopup("Deposita o teu dinheiro")
                };
                var o = function() {
                    (new west.gui.Dialog("Deposita o teu dinheiro", e("<span class='twdb_banking'>Dinheiro: " + w.Character.money + "</span>"))).setIcon(west.gui.Dialog.SYS_QUESTION).setModal(true, false).addButton("yes", function() {
                        a(1)
                    }).addButton("no").show()
                };
                var u = function() {
                    try {
                        if (w.Character.homeTown.town_id == 0 || w.Character.money <= 10) {
                            n = true;
                            return
                        }
                        if (w.Character.position.x == w.Character.homeTown.x && w.Character.position.y == w.Character.homeTown.y) {
                            if (n) {
                                n = false;
                                (new west.gui.Dialog("Deposita o teu dinheiro", e("<span class='twdb_banking'>Chegas-te á tua cidade, queres depositar o teu dinheiro? <br />Dinheiro: " + w.Character.money + "</span>"))).setIcon(west.gui.Dialog.SYS_QUESTION).setModal(true, false).addButton("yes", function() {
                                    n = true;
                                    a(w.Character.homeTown.town_id)
                                }).addButton("no").show()
                            }
                        } else {
                            n = true
                        }
                    } catch (t) {
                        Error.report(t, "autoDeposit")
                    }
                };
                var a = function(e) {
                    if (w.Character.money <= 0) {
                        return
                    }
                    w.BankWindow.townid = e;
                    w.BankWindow.DOM = (new west.gui.Textfield("tb_balance_input_" + w.BankWindow.townid)).setSize(10).setValue(w.Character.money).getMainDiv();
                    w.BankWindow.Balance.add()
                };
                return t
            }($);
            Debugger.Bank = Bank;
            var Market = function(e) {
                var t = {};
                var n = false;
                var r = false;
                var i = {};
                var s = {};
                var o = function() {
                    if (s.ready) return;
                    if (Settings.get("marketmap", true)) {
                        GameInject.addTabOnMarketWindow("Mapa do mercado", "marketmap", function() {
                            c()
                        });
                        TWDB.Util.addCss(".twdb_mmap_point { width: 7px;" + "height: 7px;" + "background-color: #F00;" + "position: absolute;" + "border: 1px solid #000;" + "border-radius: 5px; }")
                    }
                    if (Settings.get("marketreminder", true)) {
                        GameInject.MarketOfferTable(function(e) {
                            u(e)
                        });
                        GameInject.MarketWatchlistTable(function(e) {
                            a(e)
                        });
                        l.init()
                    }
                    s.ready = true
                };
                s = Loader.add("Market", "tw-db Market", o, {
                    Settings: true
                });
                var u = function(t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        var i = e('<div class="mpo_alert" />');
                        e(MarketWindow.offerTable.getMainDiv()).children().find(".marketBidsData_" + r.market_offer_id).append(i);
                        if (!r.isFinished) {
                            i.append(f(r))
                        }
                    }
                };
                var a = function(t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        var i = e('<div class="mpo_alert" />');
                        e(MarketWindow.watchlistTable.getMainDiv()).children().find(".marketWatchData_" + r.market_offer_id).append(i);
                        if (!r.isFinished) {
                            i.append(f(r))
                        }
                    }
                };
                var f = function(t) {
                    var n = e('<img src="' + Images.iconAlarm + '" />').css({
                        cursor: "pointer"
                    });
                    n.click(function(e, t) {
                        return function() {
                            l.create(e, t)
                        }
                    }(t, n));
                    if (l.exists(t.market_offer_id) === false) {
                        n.css("opacity", .5)
                    }
                    return n
                };
                var l = function(e) {
                    var t = {},
                        n = {},
                        r = {};
                    t.init = function() {
                        var e = Cache.load("marketreminder");
                        if (isDefined(e)) {
                            n = e
                        }
                        for (var t in n) {
                            i(t)
                        }
                    };
                    t.exists = function(e) {
                        return isDefined(n[e])
                    };
                    var i = function(e) {
                        var t = n[e],
                            r = Math.max(t.ends * 1e3 - (new Date).getTime() - t.reminder * 60 * 1e3, 100);
                        t.timer = setTimeout(function(e) {
                            return function() {
                                u(e)
                            }
                        }(e), r)
                    };
                    var s = function(e, r, s) {
                        var o = parseInt(r.getValue(), 10);
                        if (isNaN(o) || o < 1) {
                            t.create(e, s);
                            return
                        }
                        if ((new Date).getTime() / 1e3 + o * 60 >= e.auction_end_date) {
                            (new UserMessage("?remindertoolate")).show();
                            t.create(e, s);
                            return
                        }
                        if (t.exists(e.market_offer_id)) {
                            clearTimeout(n[e.market_offer_id].timer);
                            delete n[e.market_offer_id].timer
                        }
                        n[e.market_offer_id] = {
                            ends: e.auction_end_date,
                            reminder: o,
                            id: e.market_offer_id,
                            item: e.item_id
                        };
                        Cache.save("marketreminder", n);
                        i(e.market_offer_id)
                    };
                    var o = function(e) {
                        delete n[e];
                        Cache.save("marketreminder", n)
                    };
                    var u = function(t) {
                        var r = n[t],
                            i = ItemManager.get(r.item),
                            s = new OnGoingEntry;
                        s.init();
                        s.setTooltip("Licitação: " + i.name + ", Fim: " + Number(r.ends - (new Date).getTime() / 1e3).getTimeString4Timestamp());
                        s.setImage(e('<img src="' + Images.notiBell + '" />'));
                        WestUi.NotiBar.add(s);
                        TitleTicker.setNotifyMessage("Licitação: " + i.name + ", Fim: " + Number(r.ends - (new Date).getTime() / 1e3).getTimeString4Timestamp());
                        AudioController.play(AudioController.SOUND_NEWMSG);
                        o(t)
                    };
                    t.create = function(r, i) {
                        var u = e("<div />").append('<span style="position:relative; width:100%;display:block;">Fim da licitação: ' + r.auction_ends_in.getTimeString4Timestamp() + "</span>"),
                            a = (new west.gui.Textfield("twdb_analyser_last")).maxlength(4).onlyNumeric().setLabel("Lembrar-me antes da licitação acabar: ").setPlaceholder("Minutos");
                        u.append(a.getMainDiv());
                        if (t.exists(r.market_offer_id)) {
                            a.setValue(n[r.market_offer_id].reminder);
                            i.css("opacity", 1)
                        } else {
                            i.css("opacity", .5)
                        }
                        var f = (new west.gui.Dialog("Lembrete do mercado", u)).setIcon(west.gui.Dialog.SYS_QUESTION).setModal(true, false, {
                            bg: w.Game.cdnURL + "/images/curtain_bg.png",
                            opacity: .4
                        }).addButton("ok", function() {
                            i.css("opacity", 1);
                            s(r, a, i)
                        });
                        if (t.exists(r.market_offer_id)) {
                            f.addButton("Apagar", function() {
                                o(r.market_offer_id);
                                i.css("opacity", .5)
                            })
                        }
                        f.addButton("cancel", function() {}).show()
                    };
                    return t
                }(e);
                var c = function() {
                    try {
                        window.MarketWindow.window.showLoader();
                        window.MarketWindow.window.setTitle("Mapa do mercado").setSize(840, 655).addClass("premium-buy");
                        var t = -111,
                            s = -1;
                        r = e('<div style="position:relative;display:block;margin:10px 9px 10px 9px;width:770px;height:338px;" />');
                        for (var o = 1; o < 16; o++) {
                            if (o == 8) {
                                s += 169;
                                t = -111
                            }
                            t += 110;
                            var u = e('<img style="position:absolute;border:1px solid #000;width:110px;height:169px;left:' + t + "px;top:" + s + 'px;" src="' + Game.cdnURL + "/images/map/minimap/county_" + o + '.jpg" />');
                            if (o == 4) {
                                u.css({
                                    height: "114px"
                                })
                            } else {
                                if (o == 11) {
                                    u.css({
                                        height: "114px",
                                        top: s + 55 + "px"
                                    })
                                } else {
                                    if (o == 15) {
                                        u.css({
                                            height: "108px",
                                            width: "109px",
                                            left: "329px",
                                            top: "114px"
                                        })
                                    }
                                }
                            }
                            r.append(u)
                        }
                        n = e("<div />").append(r);
                        e(MarketWindow.window.getContentPane()).find(".marketplace-marketmap").children().remove();
                        e(MarketWindow.window.getContentPane()).find(".marketplace-marketmap").append(n);
                        i = {};
                        p()
                    } catch (a) {
                        Error.report(a, "Market map")
                    }
                };
                var h = function(e, t, n, r, s, o, u) {
                    if (!isDefined(i[e])) {
                        i[e] = {
                            name: t,
                            town_id: e,
                            x: n,
                            y: r,
                            count: 0,
                            offers_end: {},
                            offers_unend: {},
                            money: 0,
                            distance: window.Map.calcWayTime(window.Character.position, {
                                x: n,
                                y: r
                            }).formatDuration()
                        }
                    }
                    var a = i[e];
                    if (s !== "") {
                        if (!isDefined(a.offers_end[s.item_id])) {
                            a.count++;
                            a.offers_end[s.item_id] = s
                        } else {
                            a.offers_end[s.item_id].count += s.count
                        }
                    }
                    if (o !== "") {
                        if (!isDefined(a.offers_unend[o.item_id])) {
                            a.count++;
                            a.offers_unend[o.item_id] = o
                        } else {
                            a.offers_unend[o.item_id].count += o.count
                        }
                    }
                    if (u !== 0) {
                        a.money += u
                    }
                };
                var p = function() {
                    Ajax.remoteCall("building_market", "fetch_bids", {}, function(e) {
                        if (e.error) return (new UserMessage(e.msg, UserMessage.TYPE_ERROR)).show();
                        var t = e.msg.search_result;
                        for (var n = 0; n < t.length; n++) {
                            if (t[n].auction_ends_in < 0 || t[n].current_bid == t[n].max_price) {
                                var r = {
                                    item_id: t[n].item_id,
                                    count: parseFloat(t[n].item_count)
                                };
                                var i = ""
                            } else {
                                var i = {
                                    item_id: t[n].item_id,
                                    count: parseFloat(t[n].item_count)
                                };
                                var r = ""
                            }
                            h(t[n].market_town_id, t[n].market_town_name, t[n].market_town_x, t[n].market_town_y, r, i, 0)
                        }
                        d()
                    })
                };
                var d = function() {
                    Ajax.remoteCall("building_market", "fetch_offers", {
                        page: 0
                    }, function(e) {
                        if (e.error) return (new UserMessage(e.msg, UserMessage.TYPE_ERROR)).show();
                        var t = e.msg.search_result;
                        for (var n = 0; n < t.length; n++) {
                            var r = "";
                            if (t[n].auction_ends_in < 0 && !t[n].current_bid) {
                                r = {
                                    item_id: t[n].item_id,
                                    count: parseFloat(t[n].item_count)
                                }
                            }
                            h(t[n].market_town_id, t[n].market_town_name, t[n].market_town_x, t[n].market_town_y, r, "", t[n].current_bid)
                        }
                        v()
                    })
                };
                var v = function() {
                    for (var t in i) {
                        var n = i[t];
                        var s = '<div style="max-width: 305px;"><b>' + n.name + "</b>" + (n["money"] == 0 ? "" : " " + n["money"] + "$") + "<br/>";
                        var o = 0,
                            u;
                        for (var a in n["offers_end"]) {
                            o++;
                            if (o > 19) {
                                s += " ... ";
                                break
                            }
                            u = n["offers_end"][a];
                            if (n["offers_end"][a] !== 0) {
                                s += '<div class="item item_inventory"><img width="53" height="53" src="' + ItemManager.get(a).image + '" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>' + u.count + "</p></span></div>"
                            }
                        }
                        for (a in n["offers_unend"]) {
                            o++;
                            if (o > 19) {
                                s += " ... ";
                                break
                            }
                            u = n["offers_unend"][a];
                            if (n["offers_unend"][a] !== 0) {
                                s += '<div style="opacity:0.35" class="item item_inventory"><img width="53" height="53" src="' + ItemManager.get(a).image + '" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>' + u.count + "</p></span></div>"
                            }
                        }
                        s += "</div>";
                        e("<div />").css({
                            left: n.x / (181 * window.Map.tileSize) * 770 - 5 + "px",
                            top: n.y / (79 * window.Map.tileSize) * 338 - 5 + "px"
                        }).attr({
                            "class": "twdb_mmap_point",
                            id: t,
                            title: s
                        }).click(function(e) {
                            return function() {
                                TownWindow.open(e.x, e.y)
                            }
                        }(n)).appendTo(r)
                    }
                    e("<img src='" + to_cdn("images/map/minimap/icons/miniicon_pos.png") + "' />").css({
                        left: Character.position.x / (181 * window.Map.tileSize) * 770 - 8 + "px",
                        top: Character.position.y / (79 * window.Map.tileSize) * 338 - 8 + "px",
                        width: "16px",
                        height: "16px"
                    }).attr({
                        "class": "mmap_mappoint",
                        id: "mmap_icon_pos",
                        title: "A tua posição"
                    }).appendTo(r);
                    m()
                };
                var m = function() {
                    try {
                        var t = [],
                            r, s, o;
                        for (r in i) {
                            t.push({
                                id: r,
                                distance: i[r].distance
                            })
                        }
                        t.sort(function(e, t) {
                            return e.distance == t.distance ? 0 : e.distance > t.distance ? 1 : -1
                        });
                        o = "";
                        for (var u = 0; u < t.length; u++) {
                            var a = i[t[u].id];
                            o += '<div><a onclick="TownWindow.open(' + a.x + ", " + a.y + ');">' + a.name + "</a>" + ' <a title="Mostrar cidade no mapa" onclick="Map.center(' + a["x"] + ", " + a["y"] + ')"><img src="' + Game.cdnURL + '/images/icons/center.png" /></a>' + " Distância: " + a["distance"] + ' <a title="Viajar até á cidade" onclick="TaskQueue.add(new TaskWalk(' + a.town_id + ",'town'))\"><img src=\"" + Game.cdnURL + '/images/map/icons/instantwork.png"></a>' + (a["money"] == 0 ? "" : " " + a["money"] + "$") + "<br />";
                            for (s in a["offers_end"]) {
                                var f = a["offers_end"][s];
                                if (a["offers_end"][s] !== 0) {
                                    var l = new ItemPopup(ItemManager.get(s));
                                    o += '<div class="item item_inventory" title="' + l.getXHTML().escapeHTML() + '"><img width="53" height="53" src="' + ItemManager.get(s).image + '" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>' + f.count + "</p></span></div>"
                                }
                            }
                            for (s in a["offers_unend"]) {
                                var f = a["offers_unend"][s];
                                if (a["offers_unend"][s] !== 0) {
                                    var l = new ItemPopup(ItemManager.get(s));
                                    o += '<div style="opacity:0.35" class="item item_inventory" title="' + l.getXHTML().escapeHTML() + '"><img width="53" height="53" src="' + ItemManager.get(s).image + '" class="tw_item item_inventory_img dnd_draggable dnd_dragElem" style="margin-left:3px;margin-top:4px;"><span class="count" style="display: block;"><p>' + f.count + "</p></span></div>"
                                }
                            }
                            o += "</div>";
                            for (var c = 0; c <= (a.count - a.count % 12) / 12; c++) {
                                o += a.count == 0 ? "<br/>" : "<br/><br/><br/><br/>"
                            }
                        }
                        var h = new west.gui.Scrollpane;
                        e(h.getMainDiv()).css({
                            height: "200px",
                            "margin-left": "8px"
                        });
                        h.appendContent(o);
                        n.append(h.getMainDiv())
                    } catch (p) {
                        Error.report(p, "Market createTownList")
                    }
                    window.MarketWindow.window.hideLoader()
                };
                return t
            }($);
            Debugger.Market = Market;
            var Fort = function($) {
                var _self = {};
                var loader = {};
                var init = function() {
                    if (loader.ready) {
                        return
                    }
                    if (Settings.get("enhancedfortrecruitment", true)) {
                        inject()
                    }
                    loader.ready = true
                };
                loader = Loader.add("Fort", "tw-db Fort", init, {
                    Settings: true
                });
                var inject = function() {
                    try {
                        var gradeValues = {
                            TRAITOR: "-2",
                            RESERVIST: "-1",
                            RECRUIT: "0",
                            PRIVATE: "1",
                            SERGEANT: "2",
                            CAPTAIN: "3",
                            GENERAL: "4"
                        };
                        var gradeNames = {
                            "-2": "traitor",
                            "-1": "reservist",
                            0: "recruit",
                            1: "private",
                            2: "sergeant",
                            3: "captain",
                            4: "general"
                        };
                        var getGradeImg = function(e, t, n, r) {
                            try {
                                return '<img class="' + (n || "") + '" src="' + window.Game.cdnURL + "/images/chat/servicegrade_" + gradeNames[e] + '.png" title="' + (t ? window.Chat.rankTitles[gradeNames[e]].escapeHTML() : "") + (isDefined(r) && r !== "" ? " (" + r + ")" : "") + '" />'
                            } catch (i) {
                                Error.report(i, "getGradeImg")
                            }
                        };
                        var newfunction = String(FortBattleWindow.updateRecruitlist);
                        newfunction = newfunction.replace(/totalCnt\s{0,1}=\s{0,1}0;/, "totalCnt=0, totalCntTotal=0, gradeCountTotal={ '-2':0, '-1':0, '0':0, '1':0, '2':0, '3':0, '4':0 };").replace(/gradeCount\[g\]/, "gradeCount[g] + ' [' + gradeCountTotal[g] + ']'").replace(/\+\s{0,1}totalCnt\s{0,1}\+/, "+totalCnt+' ['+totalCntTotal+']'+").replace(/if\(this\.preBattle\.isHidden\(list\[i\]\['class'\], ?'rank_' ?\+ ?priv\)\)/, "totalCntTotal++;gradeCountTotal[priv]++;if(this.preBattle.isHidden(list[i]['class'],'rank_'+priv,list[i].coords.x,list[i].coords.y))").replace(/getGradeImg\(priv, ?true, ?'recruitplayer recruitplayer-'\+ ?i\)/, "getGradeImg(priv,true,'recruitplayer recruitplayer-'+i,list[i].officername||'')").replace(/\.addColumns\(\['count', ?'name', ?'town', ?'rank', ?'class', ?'status', ?'evaluated'\]\)/, ".addColumns(['count','name','town','rank','class','status','healthpoints'])").replace(/\.appendToThCell\('head', ?'evaluated' ?,.*?,.*?\);/, ".appendToThCell('head','healthpoints','Ordenar por saúde','<span class=\"sort sort-healthpoints\">'+'Lp'+'</span>');").replace(/evaluated ?: ?list\[i\]\.officername ?\|\| ?''/, "healthpoints:'<p style=\"font-weight: 700; color: '+((this.preBattle.battleData.fortCoords.x-list[i].coords.x==0&&this.preBattle.battleData.fortCoords.y-list[i].coords.y==0) ? 'rgb(0, 153, 0)' : ((Math.abs(this.preBattle.battleData.fortCoords.x-list[i].coords.x)<=500&&Math.abs(this.preBattle.battleData.fortCoords.y-list[i].coords.y)<=500) ? 'rgb(255, 119, 0)' : 'rgb(255, 0, 0)'))+'\">'+list[i].currhealth+'/'+list[i].maxhealth+'</p>'");
                        eval("FortBattleWindow.updateRecruitlist=(function(){ var lastStamp; return " + newfunction + "})();");
                        var newfunction = String(PreBattle.getSortedPlayerlist);
                        newfunction = newfunction.replace(/pa\s{0,1},\s{0,1}pb\s{0,1}\)/g, "pa,pb,that)");
                        eval("PreBattle.getSortedPlayerlist = " + newfunction);
                        var fb_sort = String(FortBattleWindow.recruitListClick);
                        fb_sort = "FortBattleWindow.recruitListClick=" + fb_sort;
                        fb_sort = fb_sort.replace(/pp ?< ?ownPriv/, "pp<ownPriv&&ownPriv>gv.SERGEANT").replace(/var hidden ?= ?function\(classKey, ?privKey\) ?{ ?return that\.preBattle\.isHidden\(classKey, ?'rank_'\+ ?privKey\); ?};/, "var hidden=function(classKey,privKey, location){return that.preBattle.isHidden(classKey,'rank_'+privKey, null, null, location);};").replace(/return ?{message: ?sorting, ?title: ?title};/, "else if(key=='healthpoints'){title='Ordenar por saúde';sorting.append(getSortLink('Crescente da saúde actual','>currhealth'));sorting.append(getSortLink('Decrescente da saúde actual','<currhealth')); sorting.append(getSortLink('Crescente de saúde máxima','>maxhealth'));sorting.append(getSortLink('Decrescente de saúde máxima','<maxhealth'));sorting.append('<br />');sorting.append(getSortLink('Crescente de distância','>distance'));sorting.append(getSortLink('Decrescente de distância','<distance'));sorting.append(getVisLink(hidden(null,'-3','atfort')?'Mostrar jogadores no forte':'Esconder jogadores no forte','atfort'));sorting.append(getVisLink(hidden(null,'-3','nearbyfort')?'Mostrar jogadores perto do forte':'Esconder jogadores perto do forte','nearbyfort'));sorting.append(getVisLink(hidden(null,'-3','notatfort')?'Mostrar jogadores longe do forte':'Esconder jogadores longe do forte','notatfort'));}return{message:sorting,title:title};");
                        eval(fb_sort);
                        PreBattle.recruitSorting.currhealth = function(e, t, n) {
                            return n ? e.currhealth == t.currhealth : e.currhealth < t.currhealth
                        };
                        PreBattle.recruitSorting.maxhealth = function(e, t, n) {
                            return n ? e.maxhealth == t.maxhealth : e.maxhealth < t.maxhealth
                        };
                        PreBattle.recruitSorting.distance = function(e, t, n, r, i, s) {};
                        PreBattle.isHidden = function(e, t, n, r, i) {
                            if (i == null) {
                                var s = this.battleData.fortCoords.x - n;
                                var o = this.battleData.fortCoords.y - r;
                                var u = "notatfort";
                                if (s == 0 && o == 0) {
                                    u = "atfort"
                                } else if (Math.abs(s) <= 500 && Math.abs(o) <= 500) {
                                    u = "nearbyfort"
                                }
                            } else if (i !== null) {
                                var u = i
                            }
                            return e !== undefined && this.recruitlistVisibility[e] || t !== undefined && this.recruitlistVisibility[t] || u !== undefined && this.recruitlistVisibility[u]
                        }
                    } catch (e) {
                        Error.report(e, "Fort")
                    }
                };
                return _self
            }($);
            Debugger.Fort = Fort;
            var CCstarter = function(e) {
                var t = {};
                var n = {};
                var r = function() {
                    if (n.ready) {
                        return
                    }
                    ClothCalc.ready = n.ready;
                    ClothCalc.init();
                    n.ready = true
                };
                n = Loader.add("ClothCalc", "tw-db ClothCalc", r, {});
                return t
            }($);
            Debugger.CCstarter = CCstarter;
            if ((w.location.href.indexOf(".the-west.") !== -1 || w.location.href.indexOf(".tw.innogames.") !== -1) && w.location.href.indexOf("game.php") !== -1) {
                Loader.init()
            }
        })(jQuery)
    }
});