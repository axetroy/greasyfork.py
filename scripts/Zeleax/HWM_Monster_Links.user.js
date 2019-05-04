// ==UserScript==
// @name HWM_Monster_Links
// @author  Zeleax
// @namespace   Zeleax
// @description Добавляет ссылки на описания существ и монстров на страницах Помощи в охоте и в заданиях ГН
// @include /https?:\/\/(www.heroeswm.ru|178.248.235.15|www.lordswm.com)\/(plstats_hunters.php|group_wars.php.*|mercenary_guild.php)/
// @include http://help.ordenmira.ru/gn/monsters.php?id=*
// @version 1.10
// @grant  none
// ==/UserScript==
if (typeof GM_getValue != 'function') {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
var monsterarr;

if(/plstats_hunters.php/.test(location.href)){
   monsterarr = new Object();
   var ratetable =  getElementByXpath("/html/body/center/table[2]/tbody/tr/td/table/tbody/tr[5]/td/table");

   var rows=ratetable.getElementsByClassName("pi");
   for(var i=0; i<rows.length; i++)
   {
      el = rows[i];
      if ((href = el.getAttribute("href")) && (res = /army_info.php\?name=(\S+)/.exec(href)) && res[1])
         monsterarr[el.innerHTML] = res[1];
   }
   if (Object.keys(monsterarr).length > 1) GM_setValue("monsters", JSON.stringify(monsterarr));
}
else if(/group_wars.php/.test(location.href))
{
   var battletable = getElementByXpath("/html/body/center/table[2]/tbody/tr/td/table/tbody/tr/td/table");
   var rows = battletable.rows;
   for(var i=0; i<rows.length; i++)
   {
      el = rows[i];
      var txt = el.cells[el.cells.length-1].innerHTML;
      if( (res = / vs .+>(.{2,25})\(\d+\)/.exec(txt)) && (monstername = res[1]) && (link = getCreatures()[monstername]))
            el.cells[el.cells.length-1].innerHTML = txt.replace(monstername,'<a target="_blank" href="army_info.php\?name='+link+'">'+monstername+'</a>');
   }   
}
else if(/mercenary_guild.php/.test(location.href))
{
   var el = getElementByXpath("/html/body/center/table[2]/tbody/tr/td/table/tbody/tr/td[2]");
   var txt = el.innerHTML;
   
   if(((res = /'(.{2,25}) {\d+}'/.exec(txt)) || (res = /'<b>(.{2,25})-набеги \{\d+\}/.exec(txt))) && (monstername = res[1]) && (link = getCreatures()[monstername]))
         el.innerHTML = txt.replace(monstername,'<a target="_blank" href="army_info.php\?name='+link+'">'+monstername+'</a>');
   else if ((res =  /<b>(.{2,25})-монстр {(\d+)}/.exec(txt)) && (monstername = res[1])
                  && (link = getCreatures()[monstername]) && (mlink = getMonstersOrdenMiraID()[link]))
         el.innerHTML = txt.replace(monstername+'-монстр','<a target="_blank" href="http://help.ordenmira.ru/gn/monsters.php?id='+mlink+'&lvl='+res[2]+'">'+monstername+'-монстр'+'</a>');
}
else if((/ordenmira\.ru\/gn\/monsters\.php/.test(location.href)) && (res=/&lvl=(\d+)/.exec(location.href)) && (x = document.getElementsByClassName("Table")))
{
   regex = new RegExp( '\\{'+res[1]+'\\}','i');
   for(var i=0, row; row=x[0].rows[i]; i++) 
      if(regex.test(row.cells[0].innerHTML)) {row.style.backgroundColor = "yellow"; break; }
}

function getElementByXpath (path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getCreatures(){
   if ((monsterarr==null || monsterarr==undefined) && !(monsterarr=JSON.parse( GM_getValue("monsters", null))))
      window.open(document.location.origin+'/plstats_hunters.php');
   return monsterarr;
}

function getMonstersOrdenMiraID(){
return JSON.parse( '{"untamedcyc":"433","bloodeyecyc":"399","dbehemoth":"538","dgolemup":"521","crystaldragon":"590","emeralddragon":"100","blackdragon":"101","stormtitan":"581","titan":"107","cyclopus":"397","archangel":"249","ancientbehemoth":"301","seraph2":"496","shadowdragon":"102","behemoth":"131","greendragon":"103","colossus":"106","angel":"132","magmadragon":"169","dgolem":"520","archdemon":"293","archdevil":"292","spectraldragon":"300","ghostdragon":"514","upleviathan":"214","phoenix":"464","bonedragon":"133","paladin":"234","firedragon":"168","champion":"495","zhryak":"284","efreetisultan":"282","leviathan":"213","devil":"82","cavalier":"90","ancienent":"238","wraith":"235","banshee":"515","rapukk":"283","efreeti":"280","pitlord":"236","foulwyvern":"337","deadknight":"273","cyclopod":"537","treant":"92","matriarch":"239","cyclopking":"237","blacktroll":"205","cyclop":"89","wyvern":"336","wight":"91","pity":"291","rakshasa_kshatra":"580","thunderlord":"167","rakshasa_raja":"108","blackknight":"272","shadow_witch":"94","pitfiend":"83","rakshasa_rani":"93","troll":"204","nightmare":"150","upseamonster":"212","hellkon":"290","hellcharger":"76","pristineunicorn":"588","silverunicorn":"147","pharaoh":"269","thane":"166","unicorn":"38","zealot":"494","inquisitor":"145","seamonster":"211","darkbird":"544","firebird":"536","mummy":"268","deephydra":"149","thunderbird":"148","djinn_vizier":"579","archlich":"146","djinn_sultan":"105","hydra":"50","rocbird":"30","djinn":"39","druideld":"120","priest":"37","ddhigh":"587","runepatriarch":"165","chieftain":"436","masterlich":"341","briskrider":"316","grimrider":"121","lich":"29","executioner":"335","ogrebrutal":"535","sdaughter":"332","ogremagi":"119","druid":"26","eadaughter":"333","battlemage":"578","vampireprince":"513","archmage":"104","vampirelord":"118","upsiren":"210","slayer":"334","vampire":"15","kamnegryz":"203","succubusmis":"122","shamaness":"331","darkrider":"51","seducer":"485","mage":"16","earth":"154","impergriffin":"117","battlegriffon":"493","succubus":"81","siren":"209","ogre":"24","fire":"155","griffon":"3","air":"153","runepriest":"164","magneticgolem":"259","water":"156","minotaurguard":"70","kamneed":"202","taskmaster":"317","steelgolem":"69","bloodsister":"315","fury":"53","harpyhag":"201","battlegriffin":"36","arcaneelf":"261","berserker":"163","masterhunter":"72","cerberus":"75","minotaur":"55","elf":"19","orcchief":"73","orcrubak":"534","hotdog":"288","blackbearrider":"162","warmong":"330","thiefwarrior":"123","mercwizard":"126","thiefmage":"125","thiefarcher":"124","beholder":"207","wardancer":"41","evileye":"208","iron_golem":"12","assassin":"56","hellhound":"74","wdancer":"258","orcshaman":"546","boarrider":"318","wolfraider":"43","maiden":"49","cursed":"522","redlizard":"47","spiderpois":"199","harpy":"200","orc":"23","brawler":"114","poltergeist":"512","spectre":"68","ghost":"11","obsgargoyle":"44","mercfootman":"21","elgargoly":"256","lizard":"45","bearrider":"161","mountaingr":"339","hornedoverseer":"79","mauler":"320","bear":"172","warrior":"319","squire":"71","mcentaur":"309","dancer":"25","swolf":"27","scout":"52","sprite":"31","ncentaur":"311","wolfrider":"18","jdemon":"289","dryad":"255","vindicator":"260","marksman":"42","harpooner":"378","footman":"10","rotzombie":"270","skirmesher":"160","stone_gargoyle":"8","crossman":"257","megogachi":"287","trapper":"386","mercarcher":"20","archer":"2","spider":"198","plaguezombie":"40","horneddemon":"77","gogachi":"285","smalllizard":"46","fcentaur":"310","skmarksman":"340","pixel":"17","shieldguard":"158","spearwielder":"159","zombie":"5","sceletonwar":"267","familiar":"80","enforcer":"35","vermin":"281","skeletonarcher":"28","mastergremlin":"32","saboteurgremlin":"253","goblinarcher":"314","goblinmag":"545","hobgoblin":"33","conscript":"34","defender":"157","imp":"78","skeleton":"1","brute":"254","gremlin":"9","goblin":"14","peasant":"4","goblinus":"329"}')}
