// ==UserScript==
// @name         Heroes Profile中文化
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  try to take over the world!
// @author       BearBox
// @include      https://heroesprofile.com*
// @require      https://greasyfork.org/scripts/372862-libreplacetext/code/libReplaceText.js?version=635703
// @match        http://*/*
// @grant        none
// ==/UserScript==
// ['', ''],

(function () {
   new ReplaceText([
       ['All', '全部'],
       ['Stat Filter', '統計過濾'],['Win Rate', '勝率'],['Kills', '擊殺數'],['Takedowns', '助攻擊殺數'],['Deaths', '死亡數'],['Siege Damage', '攻城傷害'],['Hero Damage', '英雄傷害'],['Healing', '治療量'],['Damage Taken', '承受傷害'],['Experience Contribution', '經驗貢獻'],['Assists', '助攻'],
       ['Highest Kill Streak', '最高連續擊殺'],['Structure Damage', 'Structure Damage'],['Minion Damage', 'Minion Damage'],['Creep Damage', 'Creep Damage'],['Summon Damage', 'Creep Damage'],['Self Healing', '自我治療'],['Town Kills', 'Town Kills'],['Time Spent Dead', 'Time Spent Dead'],['Merc Camp Captures', 'Merc Camp Captures'],['Watch Tower Captures', 'Watch Tower Captures'],
       ['Role', '類型'],['Bruiser', '鬥士'],['Healer', '治療者'],['Melee Assassin', '近戰刺客'],['Ranged Assassin', '遠程刺客'],['Support', '輔助'],['Tank', '肉盾'],
       ['Timeframe', '版本'],
       ['Hero', '英雄'],
       ['Game Type', '遊戲類型'],['Quick Match', '快速對戰'],['Unranked Draft', '非排名模式'],['Storm League', '排名模式'],
       ['Map', '地圖'],
       ['Battlefield of Eternity', '永恆戰場'],["Blackheart's Bay", '黑心灣'],['Braxis Holdout', '布萊西斯實驗所'],['Cursed Hollow', '詛咒谷地'],
       ['Dragon Shire', '巨龍郡'],['Garden of Terror', '恐怖花園'],['Hanamura Temple', '花村神殿'],['Haunted Mines', '亡骸礦坑'],['Infernal Shrines', '煉獄聖壇'],['Sky Temple', '天空神殿'],
       ['Tomb of the Spider Queen', '蛛后之墓'],['Towers of Doom', '厄運之塔'],['Warhead Junction', '核武戰地'],['Volskaya Foundry', '伏斯凱亞鑄造廠'],['Alterac Pass', '奧特蘭克隘口'],
       ['League Tier', '階級選擇'],['Master', '大師'],['Diamond', '鑽石'],['Platinum', '白金'],['Gold', '金牌'],['Silver', '銀牌'],['Bronze', '銅牌'],
       ['Games Played', '遊玩場數'],
       ['Wins', '獲勝場數'],
       ['Losses', '戰敗場數'],
       ['Win Rate % ', '勝率 %'],
       ['View Talent Builds', '查看天賦選擇'],
       ['Hero Stats', '英雄統計'],
       ['Hero Talents', '英雄天賦'],
       ['Talent Builder', '天賦產生器'],
       ['Compare', '比較'],
       ['Enter a Battletag', '輸入Battletag'],
       ['Find a Player', '搜尋玩家'],
       ['filter', '篩選'],
       ['Abathur', '阿巴瑟'],
       ['Alarak', '亞拉瑞克'],
       ['Alexstrasza', '雅立史卓莎'],
       ['Ana', '安娜'],
       ['Anduin', '安度因'],
       ["Anub'arak", '阿努巴拉克'],
       ['Artanis', '亞坦尼斯'],
       ['Arthas', '阿薩斯'],
       ['Auriel', '奧莉爾'],
       ['Azmodan', '阿茲莫丹'],
       ['Blaze', '爆焰'],
       ['Brightwing', '亮翼'],
       ['Cassia', '卡西雅'],
       ['Chen', '老陳'],
       ['Cho', '丘'],
       ['Chromie', '克羅米'],
       ['D.Va', 'D.Va'],
       ['Deckard', '凱恩'],
       ['Dehaka', '德哈卡'],
       ['Diablo', '迪亞布羅'],
       ['E.T.C.', '精英牛頭大佬'],
       ['Falstad', '弗斯塔德'],
       ['Fenix', '菲尼克斯'],
       ['Gall', '加利'],
       ['Garrosh', '卡爾洛斯'],
       ['Gazlowe', '加茲魯維'],
       ['Genji', '源氏'],
       ['Greymane', '葛雷邁恩'],
       ["Gul'dan", '古爾丹'],
       ['Hanzo', '半藏'],
       ['Illidan', '伊利丹'],
       ['Imperius', '英普瑞斯'],
       ['Jaina', '珍娜'],
       ['Johanna', '喬安娜'],
       ['Junkrat', '炸彈鼠'],
       ["Kael'thas", '凱爾薩斯'],
       ["Kel'Thuzad", '科爾蘇加德'],
       ['Kerrigan', '凱莉根'],
       ['Kharazim', '克拉辛'],
       ['Leoric', '李奧瑞克'],
       ['Li Li', '莉莉'],
       ['Li-Ming', '李敏'],
       ['Lt. Morales', '莫拉萊斯中尉'],
       ['Lúcio', '路西歐'],
       ['Lunara', '露娜拉'],
       ['Maiev', '瑪翼夫'],
       ["Mal'Ganis", '瑪爾加尼斯'],
       ['Malfurion', '瑪法里恩'],
       ['Malthael', '瑪瑟爾'],
       ['Medivh', '麥迪文'],
       ['Mephisto', '墨菲斯托'],
       ['Muradin', '穆拉丁'],
       ['Murky', '莫奇'],
       ['Nazeebo', '納奇班'],
       ['Nova', '諾娃'],
       ['Orphea', '歐菲亞'],
       ['Probius', '普羅比斯'],
       ['Ragnaros', '拉格納羅斯'],
       ['Raynor', '雷諾'],
       ['Rehgar', '雷加'],
       ['Rexxar', '雷克薩'],
       ['Samuro', '薩姆羅'],
       ['Sgt. Hammer', '榔頭中士'],
       ['Sonya', '桑雅'],
       ['Stitches', '縫合怪'],
       ['Stukov', '斯杜科夫'],
       ['Sylvanas', '希瓦娜斯'],
       ['Tassadar', '塔薩達'],
       ['The Butcher', '屠夫'],
       ['The Lost Vikings', '失落的維京人'],
       ['Thrall', '索爾'],
       ['Tracer', '閃光'],
       ['Tychus', '泰科斯'],
       ['Tyrael', '泰瑞爾'],
       ['Tyrande', '泰蘭妲'],
       ['Uther', '烏瑟'],
       ['Valeera', '瓦麗拉'],
       ['Valla', '維拉'],
       ['Varian', '瓦里安'],
       ['Whitemane', '懷特邁恩'],
       ['Xul', '蘇爾'],
       ['Yrel', '伊芮爾'],
       ['Zagara', '札迦拉'],
       ['Zarya', '札莉雅'],
       ['Zeratul', '澤拉圖'],
       ["Zul'jin", '祖爾金'],
       ['Talent', '天賦'],
       ['Level       One', '1等'],
       ['Level       Four', '4等'],
       ['Level       Seven', '7等'],
       ['Level       Ten', '10等'],
       ['Level       Thirteen', '13等'],
       ['Level       Sixteen', '16等'],
       ['Level       Twenty', '20等'],
       ['Build Filter', '組合篩選'],
       ['Popular', '熱門'],
       ['HP Algorithm', 'HP Algorithm'],
       ['Unique Lvl 1', '不同的等級 1'],
       ['Unique Lvl 4', '不同的等級 4'],
       ['Unique Lvl 7', '不同的等級 7'],
       ['Unique Lvl 10', '不同的等級 10'],
       ['Unique Lvl 13', '不同的等級 13'],
       ['Unique Lvl 16', '不同的等級 16'],
       ['Unique Lvl 20', '不同的等級 20'],
       ['Overall Stats', '整體數據統計'],
       ['Overall Win Rates', '整體勝率'],
       ['\nWins', '獲勝'],
       ['\nLosses', '戰敗'],
       ['\nBruiser', '鬥士'],
       ['\nHealer', '治療者'],
       ['\nMelee Assassin', '近戰刺客'],
       ['\nRanged Assassin', '遠程刺客'],
       ['\nTank', '坦克'],
       ['View Role Data', '查看類型資料'],
       ['\nAccount Level', '帳號等級'],
       ['Win Rate', '勝率'],
       ['Most Played', '最多遊玩'],
       ['Highest Win Rate', '最高勝率'],
       ['Latest Played', '最後遊玩'],
       ['View all heroes', '查看所有英雄'],
       ['Player MMR', '玩家MMR'],
       ['Change', '變化'],
       ['Hero MMR', '英雄MMR'],
       ['All Game Types', ''],
       ['All Game Types', '全部遊戲模式'],
       ['Hero League', '英雄聯賽'],
       ['Team League', '團隊聯賽'],
       ['All Seasons', '全部賽季'],
       ['2019 Season 1.5', '本賽季'],
       ['2019 Season 1', '2019年第一賽季'],
       ['2018 Season 4', '2018年第四賽季'],
       ['2018 Season 3', '2018年第三賽季'],
       ['2018 Season 2', '2018年第二賽季'],
       ['2018 Season 1', '2018年第一賽季'],
       ['2017 Season 4', '2017年第四賽季'],
       ['2017 Season 3', '2017年第三賽季'],
       ['2017 Season 2', '2017年第二賽季'],
       ['2017 Season 1', '2017年第一賽季'],
       ['2016 Season 3', '2016年第三賽季'],
       ['2016 Season 2', '2016年第二賽季'],
       ['2016 Season 1', '2016年第一賽季'],
       ['Profile', '個人資訊'],
       ['Friends And Foes', 'Friends And Foes'],
       ['Heroes', '英雄'],
       ['Roles', '類型'],
       ['Maps', '地圖'],
       ['Talents', '天賦'],
       ['MMR Breakdown', 'MMR 分析'],
       ['Match History', '遊玩歷史'],
       ['', ''],
       ['', ''],
       ['', ''],
       ['', ''],

   ])
})();

