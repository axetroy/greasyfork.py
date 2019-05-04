// ==UserScript==
// @name           Badoo
// @author         anonyme
// @version        4.14
// @namespace      Badoo
// @description    Affiche dans la liste de recherche les profils déjà observés (+info si fume + info si enfant(s) + vote + retirer des profils) + dévoile les Likes + retire les pubs
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @include        https://badoo.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//****************************************************************
//		C h e c k   u p d a t e
//	Source code : https://greasyfork.org/fr/scripts/1939-allocine-zap : Merci
//****************************************************************
var AZ_today = new Date();
var BD_currentVersion, i_cV;
var AZ_today_YYYYMMDD = parseInt(AZ_today.getFullYear()*10000+AZ_today.getMonth()*100+AZ_today.getDate());
if (!GM_getValue('BD_Version')) GM_setValue('BD_Version', 0);
if (!GM_getValue('BD_date')) GM_setValue('BD_date', 0);
if (!GM_getValue('BD_paramVuSup')) GM_setValue('BD_paramVuSup', 0);
function check_BD_version(evt){
    GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://greasyfork.org/scripts/27888/code/badoo.meta.js',
		onload: function(responseDetails){
			try{
				BD_currentVersion = responseDetails.responseText.match(/\@version\s+(\d+\.\d+\.?\d?)/)[1];
				BD_currentVersion = BD_currentVersion.replace(/\./g,'');
				for (i_cV = BD_currentVersion.length; i_cV < 4; i_cV++) BD_currentVersion +=0;
				BD_currentVersion = parseInt(BD_currentVersion);
				if(GM_getValue('BD_Version') === 0) {
                    GM_setValue('BD_Version', BD_currentVersion);
                }
				if (GM_getValue('BD_Version') < BD_currentVersion){
                    GM_setValue('BD_Version', BD_currentVersion);
                    GM_openInTab('https://greasyfork.org/scripts/27888/code/badoo.user.js');
				}
			}
			catch(Err) {}
		}
	});
}
if(AZ_today_YYYYMMDD>GM_getValue('BD_date')){//test verification version à la premiere connexion de chaque jour
    check_BD_version();
    GM_setValue('BD_date',AZ_today_YYYYMMDD);
}
//****************************************************************
//		F I N  C h e c k   u p d a t e
//****************************************************************

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var imgClope = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKbSURBVDhPjZPrS1NxGMd/yMoaEd4gKCzqRRIlXSSKQU2RJQMZ0YschBDUG8P/oYw0VxLbi41FikGjbViyaVKsYa4SL5tnxzxedsTlhbZ52U67T3fc6Tn7HZoXjD6vnuf7PN/f/Ye4XWTS6ZjTufKqw9f0xN/6nLFY15eWhNoWtjkzbNrX8tRdWOxEiBQXTZw4/ePI8TG0H9KZyqroyKjQlyXnhIEnL1SMIjTf8CDmdG0mEljfCATW3hios+UjCPmftWEREJwby8vjpSfJo6VxksTKbn49bBpCyNfcilPB6amUEQUlG34/TjEURTkcDpqmhZzjfC2qYYTC/V8g5p2MtZfP7f3ZqkAqlVKr1QzDdHZ22mw2QeW4GYmUOnUGAt45c+X6dIUkq+dgWdZoNFqt1tXVVZVKFQwGsR79PggbjrvdiI3F4PRWdC9xYSuZTAamHRgYMJlMOp2OIAhe5DLjxcf8zSqUpGkXQtGhYdy9g1Ao1NXV1dfXp9VqNRoNjAUiXS2fu1UH85IulJeYmsKte2G32/V6PXZ66+o9VTUoNTfHz/ltECRYkkQiqdqOVCpVKBRms9lgMPA+uIhr1d7bd9BmMknkiQNtapDa29tlMlntduRyuVKp7OnpsVgs0APvjDxcEnih5s929kbtZFk5P9p/8PvjJzjbpMfDOyOOr3CfQaMZ1/4NVXZu+tJVCIQ35FXWO5EoMUHhdC8WGhr5yyTHIRacm4n41MXLrn0HmN4PWNkBGw576+/C0tY6XmNFcAJsJDKruAk1WlYTet8NX4eNx9IMA9fme/TYXVDoEuVv3VHOiQkaTZPl5+FDupDIfbCIEB2CmMgX/7x3PzW/IDRl2enErC8uhm2f1wxvQ++6Y2Njf/9qDo77AzhzW5XSgR3gAAAAAElFTkSuQmCC';
var imgGamin = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJUSURBVEhLvZQ9ryFxFMYvydrL5lZe12s0NyJRikonVDrCJ3CVSl9AqdBLfAGdqCQ0EiQ6GvFSSUQ0glyvyz475+zcYWYUW+yvOuc5z3li/jN/L7enzOfzbDb7UwAFWh6o8CxuPB5bLJYXCWgh8liJZ3HJZJJjJEDksRKqcfv9Hg/IGRIgYsQmGapxh8NBLQ4jNsn4Xw8LJpOJw+HgGAG0//4qQKfTiUQi3wVQdLtdHqigGne5XDKZjNPpdLlc3wRQuN3uXC7HDiWU447HYzwe5yeUkU6nT6cTW+9RiMN3EI1GeVWFWCy23W55QcJj3Hq9DofDvPSUUCi0XC557S93cavVKhgMklur1b6+vlItRa/X4xyp9vv9s9mMlwW+4haLRSAQIN/b21u1WrXZbNRKsVqttVrNZDJRi/czGo04QhpXLpfJYTAY2u02FLvd/kMGbgVGg8HAbDaTP5/PCwF/+IqbTqf48R6Pp9VqkYKjwU9+QDyv4XAIPz6dXq9HCrg7O7z+z89Pqvv9PhVyxNH5fBb9xF2cSLPZxHvA8XEvASJGMHB/j0LcZrPxer04FJ1OV6lUxP8PFGghYgQDbKRLeYy7Xq8fHx/CETP1ep1GKFgSwH89zDQSeYzD9TIajbSg0WgKhQIOiEYo0EKkKWww00hE4WFLpRItYLPRaLAqgFaMg41VCcqvIpVK0c77+7t421GgJR0GEh9Qjtvtdj6fjzaLxSKJKEjBCAYSH1COA/hKcT2wjK8fpwboGkDEiE0yVOMArhruWSKR+CWAAi3dP2Vut9/DAIfXBdHvKAAAAABJRU5ErkJggg==';
var imgVu = 'data:image/bmp;base64,Qk12BQAAAAAAADYAAAAoAAAAFQAAABUAAAABABgAAAAAAEAFAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////////////////////////////////////////////////////////////AP///////////////////////////////////////////////////////////////////////////////////wD////////////////////////////////////09/rc4eXS1trT1dfn6Or9/f3///////////////////////8A////////////////////////zMzMjo+PV1VSRDgsSC8ZQiQJQS8eKyMbamtskpKS6urq////////////////AP////////////39/cPDw4KCg1hYWRwJAGUzB6FVFrBZEc+gd/Xv6KqekVxUTb6/wImJiefn5////////////wD////////+/v7W1taysrLs7OyIh4VfLwO7ZyK4ZSGwWRLs2sr///////0+JArFxsf39/fl5eX///////////8A/////////////v7+////////U0c7nFESuWUiuGUiqlkXxIdU8+HS3rWScjQCbmto////////////////////AP///////////////////+Dk6VA1HbZiHblmIms9FiIVCTQaA5xUGblfGJ5SElZJPPz+/////////////////wD////////////////////Gy89XMQ/BaSGdWB4HBQMAAAAAAABNLA6/aSKqWhhSPir3+/7Y2NjU1NT///////8A////////////////////vcHFWzAMx2wjfkcZAAAAAAAAAAAAJhYJuGYjqlsZTzsp8vX58fHxcnJy+fn5////AP///////////////////8fLzkopDMVrIn1GGQAAAAAAAAAAAB4SB75oI5hQE05BNPn8/f///2pqapCQkP///wD////////////////////n6uw6KhmEShVoOREAAAAICAgAAAAPBACQUh5YLQRkXVb///////+SkpISEhL39/cA////////////////////////YVlRPhwAXEMquLi44uLizs/QXVJISyoJNBgAo6Ki////////ampqAAAAxMTEAP///////////////////////8DBwyULAIhuVP///////////+nj3UcjAEk4KfHz9f///7u7uwAAADAwMO3t7QD////39/f///////////////////+Gg342GQDh2tL///////+smoo1HAbGxsb///+urq4AAAAtLS23t7fb29sA////3t7e3Nzc////////////////////kIuHX0s4nY1/gW5cXkw80tHQ////iomJAQEBUVFRaWlpVVVV4eHhAPv7++Hh4aysrMPDw////////////////////+Tk5L22stjU0P///+Xm50VFRQAAADQ0NKmpqerq6srKyrCwsAD9/f3T09PMzMyOjo6EhITe3t7////////////////////e399ra2sBAQEaGhpZWVm2traurq6wsLD9/f39/f0A////////4+Pj0dHRjY2NT09PWlpadHR0eXl5X19fMDAwDAwMLS0tl5eX4uLi1dXV4ODg/////////Pz8////AP////////////r6+unp6cvLy4uLi1xcXEtLS1NTU3Z2dq+vr9/f3+3t7fHx8f///////////////////////wD////////////////////////////////9/f3+/v7////9/f39/f3///////////////////////////////8A';
var imgCoeur = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOkSURBVDhPXZF7TFN3FMcbQwu4GIy1V0unDPoHFBFoaLFtJuMhTsJkU4eKOkF0QxTn1CXTLHvPP9wyM5f96ZbNmJi4BfYITEDt7eu2pbftLX3c3j6xD6TMlgJlFimwc223yb45yf3l9zuf8z3nXMbyPxrTjei+uoJeOqu+/KGtry8Rn4XL+J9R4uZN5UcXFe+fN3x7LUBY0skgmkwtLSs///R+c5XzZJ3vfJPrTKOhTXqvY5/y6teDh5rxtmp3d73nVJ29XXa/ZZvi8mdPnqQyJP79d4pdW0LvNnnONHhP1bu76/w9Dd6uGu1esaer1ntyu/u4jDomdR+TPOh6UbtHqL56hSb/SjwebN3hf1NGdUqpTpmrQ0p1SKh2ietItQcOh8XUoSrqDZHzqIg6UuVsE/oOC4frKyYoN2N81KpuKvPCW5uQPCh0Hqh07q8kWyvI18sde8vI1nJy31ZrI98s4RkrELyUbdiUg3JXW368wfBrNJoGvmvPFsdrpY5XBWSLwLG7xP5Ksb25mGwpGa0tGOGvwdYzsXVPg83E1q5S5a82fHONETYT6jq+s6nIvotv31lkayy07ngBwr6z0CRCMISFsVlaJEe7IRM69ip5wTrbzz8xZmNT6G4RWZ8/+hI3HdZarnX7BlyQh3FYGJL9LwMBN0Zebv+28mgwRO9W+cF7+iqOVcIhJAhRjRi3rtU9nwMdPmtFY0j2CCcLLeaqvvwi81diDyO/NNbgxXn45mxdfjbGYWKcFVZ0ALY+Cyvh3ul+K5mcz5CggNXeKxPreM/p2Fn/s4Kg3WiMN3CiczYeTyMZEhR2Ur81v6wtZNNJHNZ/GIc5gjBVZZvv9HQnpmcy2c+SoGhksr/9qKp0E74xBwPzjbkwrQFhqSuKhi6cm3uczOQ9FU0uLS0lk8l4PB6dmfEGg31n30HFAlPBGk0ew5ifqxIL+i6c84VCkUePotHo3Nzc4uIiTQKWSCQikYjP57PbbCaCUBmNNy5dHJBWWgU8VCT44e0euVanx3GLxeJ2u8fHx6enpxcWFhhQANzC4bDL5TKbzWq1emh4+Ne7d69//MmtGtn106dv9w/8MTiIoqjBYCBJMhAIgPP8/DzdLXympqZCoRDABEHo9XqlUinXaH7v7R2Sy1GFAsMwk8nkcDjGxsYmJyfTDWc2BCcYFdqABygBGR6Px+v3e7xemCIYDE5MTMRiMWCgzzSyYrdpweRQKJVKQRIIDumVrNDy8t9jPaYg3yGx6wAAAABJRU5ErkJggg==';
var imgRetirer = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAKlSURBVHjanJNPSJNxHMaf3/u+S9/t3d53bu9o6cHWxCZIq6k1NAxEEluHvAge7BBU0kqijS4euvQHFcRZCQphh9Cbp7QgQ/Ei6SEwwciDIExisuna2r/33bdDLBQ89Ry/D5/L83wfRkT4bxER7ni9CNbVdb6z27cuS9KjkndFkjDqcGBIUTCpKPcW3e4tH2NdR+C79fXXPrlceRofp68+HzWLYrgEj6gqIhZLcD0QIG1ujn60t+tNHNdlAEQQEd6qaowGBii1sUHpmRla9XjoYnl5qNFoxGtVDX5pbqaD2VlKra4STU/TkseT8TPWx4gIl6zWRxMOx/Dp3l7kKytRjEbxbWoKi/H4h7aqqo7anh4IFRXg02kUlpZwa34+8jmbfcmICIwxNJjN4QlFGaxsa4OuqsjGYoiurMDp90O0WoFsFvnNTfQtL4/NFwoPAOAfDADnJSk8ZjY/P1VTw8NkAgCwYhGapiF9cIDH6+uRj7lcfykvRkQ4a7OBKxaRI8J1WZ6/ub/fwSQJ4DgUGYNgsWB6d3ftRTzeeLgpAQA6qqvBdB2SpgU7otG2bDKJaDKJBACzLEMtK0N3dfW59Uwm9D6TGS7BHAD8LhZBun4/sLMzdjKRMGgAeABORQHPcdB1HUwQDK8aGoYC5eXhI7BR14O929uRM8kksgAMAES7HQuiuCorCgTGkC8UwJlMeNPaOnjDaAxJgIMDAG8i8eRCKoUsgBMAyGbDU00bG9ndbRre2wtZRBEGnkcun4fd6cRDt/tZPc93g4jgUpSuBZtN/wXQWkUF+a3WyOFgrppM4Y3GRooFAvS9pYV8gtAvACpKw3DJctek0/nTL8ujx22g02QKzXk8MS/H9R/57b+lMb5Wlm/zPO86Di4DrE0GQx8ApXT7MwC3lg0rJwpHAgAAAABJRU5ErkJggg==';

TM = {
	affiche : function(id,profil,iddom,page){
        if(page == "search" || page == "visitors"){
            if(profil!==undefined){
                if(GM_getValue('BD_paramVuSup')===0 && profil.vote==-1){
                    $(iddom).remove();
                }else{
                    if($('.img_vu', iddom).html()===null){
                        var profilPlus='';
                        if(profil.vu=="oui"){
                            profilPlus+='<img class="img_vu" src="'+imgVu+'" style="vertical-align: bottom;"/></a>';
                        }
                        if(profil.fume=="            Fumeuse                                "||profil.fume=="            Comme un pompier                                "||profil.fume=="            Je fume en soirée                                "||profil.fume=="            Je fume de temps en temps                                "||profil.fume=="            Je fume beaucoup                                "){
                            profilPlus+='<img class="img_fum" src="'+imgClope+'" style="vertical-align: bottom;" /></a>';
                        }
                        if(profil.maman=="            J'en ai déjà                                "||profil.maman=="            Ils sont déjà adultes                                "){
                            profilPlus+='<img class="img_mam" src="'+imgGamin+'" style="vertical-align: bottom;" /></a>';
                        }
                        /*if(profil.coeur=="oui"){
                            profilPlus+='<img class="img_coeur" src="'+imgCoeur+'" style="vertical-align: bottom;" /></a>';
                        }*/
                        if(page == "search") $('.user-card__caption', iddom).append(profilPlus);
                        if(page == "visitors") $('.user-card__caption', iddom).append(profilPlus);
                    }
                }
            }
            if(page == "search"){
                if($('#paramSearch').html()===null){
                    var lienProfil = $('a:first', iddom).get()[0].outerHTML;
                    lienProfil = lienProfil.replace("class=\"b-link user-card__link app js-folders-user-profile-link\"", "class=\"b-link\" style=\"position: relative;\"");
                    lienProfil = lienProfil.replace("</a>","");
                    $('a:first', iddom).remove();
                    $('img:first', iddom).replaceWith(lienProfil+$('img:first', iddom).get()[0].outerHTML+"</a>");
                    $('.user-card__info',iddom).css("display","block");
                }
                if($('select', iddom).html()===null){
                    $('.user-card__location', iddom).append('<label for="vote" style="position: relative;float: left;">Vote: </label>'+
                                                                   '<select style="position: relative;z-index: 1;float: left;" name="vote" class="vote" onchange="TM.getBDD(\''+id+'\',this,\'vote\');">'+
                                                                   '<option value=""></option>'+
                                                                   '<option value="0">0</option>'+
                                                                   '<option value="1">1</option>'+
                                                                   '<option value="2">2</option>'+
                                                                   '<option value="3">3</option>'+
                                                                   '<option value="4">4</option>'+
                                                                   '<option value="5">5</option>'+
                                                                   '<option value="6">6</option>'+
                                                                   '<option value="7">7</option>'+
                                                                   '<option value="8">8</option>'+
                                                                   '<option value="9">9</option>'+
                                                                   '<option value="10">10</option>'+
                                                                   '</select>'+
                                                                   '<a href="#" id="retirer" class="b-link" style="position: relative;float: left;" onclick="TM.setDB(\''+id+'\',\'\',\'\',\'\',-1);$(this).remove();return false;"><div class="user-card__info-secondary" style="display: inline-flex;"><img class="img_Retirer" alt="retirer" src="'+imgRetirer+'" style="vertical-align: bottom;"  width="15" height="15"></div></a>');
                }
                if(GM_getValue('BD_paramVuSup')===0 && profil!==undefined){
                    $("select",iddom).val(profil.vote);
                }
            }
        }
        if(page == "profil"){
            var enfant="?";
            var fume="?";
            var coeur="?";
            var descr = $(".js-profile-personal-info-container").html();
            var dfan = $(".js-profile-header-vote-yes").html();
            if(descr!==null&&dfan!==null){
                var enf = descr.split("<b>Enfants:</b>");
                if(enf.length>1){
                    var enf1 = enf[1].split('<div class="form-field">');
                    enfant = enf1[1].split('</div>')[0];
                }
                var fum = descr.split("<b>Tabac:</b>");
                if(fum.length>1){
                    var fum1 = fum[1].split('<div class="form-field">');
                    fume = fum1[1].split('</div>')[0];
                }
                var fan = dfan.split("Elle te plaît");
                if(fan.length>1){
                    coeur="oui";
                }
                if(profil!==undefined){
                    TM.setDB(id,fume,enfant,coeur,profil.vote,"oui");
                }else{
                    TM.setDB(id,fume,enfant,coeur,"","oui");
                }
            }
        }
    },
    setDB : function(id, fume, maman, coeur, vote, vu){
		var open = indexedDB.open('BDD', '2');
		open.onupgradeneeded = function() {
			var db = open.result;
			var store = db.createObjectStore("infos", {keyPath: "id"});
			var index = store.createIndex("filtre", ["fume", "maman","coeur","vote","vu"]);
		};
		open.onsuccess = function() {
			var db = open.result;
			var tx = db.transaction("infos", "readwrite");
			var store = tx.objectStore("infos");
			var index = store.index("filtre");
            store.put({id: id, fume:fume, maman:maman, coeur:coeur, vote:vote, vu:vu});
			tx.oncomplete = function() {
				db.close();
			};
		};
	},
	setDBrevele : function(id, img, name, age, idCache){
		var open = indexedDB.open('CACHE', '1');
		open.onupgradeneeded = function() {
			var db = open.result;
			var store = db.createObjectStore("revele", {keyPath: "id"});
			var index = store.createIndex("filtre", ["name", "age","idcache"]);
		};
		open.onsuccess = function() {
			var db = open.result;
			var tx = db.transaction("revele", "readwrite");
			var store = tx.objectStore("revele");
			var index = store.index("filtre");
			store.put({id: id, img:img, name:name, age:age, idCache:idCache});
			tx.oncomplete = function() {
				db.close();
			};
		};
	},
    getBDD : function(id,iddom,page){
		var open = indexedDB.open('BDD', '2');
		open.onsuccess = function() {
			var db = open.result;
			var tx = db.transaction("infos", "readwrite");
			var store = tx.objectStore("infos");
			var res = store.get(id);
			tx.oncomplete = function() {
					db.close();
			};
			res.onsuccess = function() {
				var profil= res.result;
                if(page=='vote'){
                    if(profil!==undefined){
                        TM.setDB(id, profil.fume, profil.maman, profil.coeur, $('option:selected', iddom).val(), profil.vu);
                    }else{
                        TM.setDB(id, "?", "?", "?", $('.vote option:selected', iddom).val(), "");
                    }
                }else{
                    TM.affiche(id,profil,iddom,page);
                }
            };
		};
        open.onupgradeneeded = function() {
			var db = open.result;
			var store = db.createObjectStore("infos", {keyPath: "id"});
			var index = store.createIndex("filtre", ["fume", "maman","coeur","vote","vu"]);
		};
	},
	getBDDrevele : function(id,iddom){
		var open = indexedDB.open('CACHE', '1');
		open.onsuccess = function() {
			var db = open.result;
			var tx = db.transaction("revele", "readwrite");
			var store = tx.objectStore("revele");
			var res = store.get(id);
			tx.oncomplete = function() {
					db.close();
			};
			res.onsuccess = function() {
				var profil= res.result;
				if(profil!==undefined){
                    if($('.user-card__img', iddom).html()!==null){
                        $('.user-card__img', iddom).replaceWith('<div class="user-card__img"><img src="'+profil.img+'" width="190" height="190"></div>');
						$('.user-card__img', iddom).append('<a href="/profile/0'+profil.idCache+'"class="b-link user-card__link app js-folders-user-profile-link" target="_blank" rel="profile-view"></a>');
                        $('.user-card__info-verify', iddom).append('<div class="user-card__info-name"> <span class="user-card__info-name_">'+profil.name+'</span>  <span class="user-card__info-age">, '+profil.age+'</span>  </div>');
                        $('.js-open-unlock-ovl', iddom).remove();
                    }
                }
			};
		};
        open.onupgradeneeded = function() {
			var db = open.result;
			var store = db.createObjectStore("revele", {keyPath: "id"});
			var index = store.createIndex("filtre", ["name", "age","idcache"]);
		};
	},
    changeCheckSearch : function(check){
        if(check===true){
            GM_setValue('BD_paramVuSup', 1);
        }else{
            GM_setValue('BD_paramVuSup', 0);
        }
        window.location.reload();
    },
    boucle : function(Msec){
        var url = window.location.href;
		var idUser="";
		var idU="";
        //On profite pour virer les pub ^^
        $('div[class*="js-banner"]').each(function(){
            $(this).remove();
        });
        //$('#page-surprise-top').remove();
        $('.js-google-ad-container').remove();
        $('#js-profile-hottest-friends').remove();
        $('#app_footer').remove();
        $('.location-map__layer').remove();
        $('.profile-menu__fast-message').remove();
        $('.page__wrap').css('top','0');
        $('.page__surprise').css('width','0');
        //voila voila
        if(url.substring(0, 24)=="https://badoo.com/search"){
            if($('#paramSearch').html()===null){
                var check="";
                if(GM_getValue('BD_paramVuSup')!==0){check="checked='checked'";}
                $("header").append("<div id='paramSearch'>Affichage des profils supprimés? <input type='checkbox' id='cbox' onchange='TM.changeCheckSearch(this.checked);' "+check+"></div>");
            }
            $('.js-folders-user-card').each( function(){
                idUser = $(this).html().split('/profile/0');
                if(idUser.length>1){
                    if($('.vote').html()===null){
                        var name = $(this).html().split('user-card-caption__name" dir="auto">');
                        var age = $(this).html().split('user-card-caption__age"><span class="comma">,</span> ');
                        var img = $(this).html().split('src="');
                        var idsecret = $(this).html().split(';id=');
                        if(idsecret.length>1){
                            TM.setDBrevele(idsecret[1].split('"')[0], img[1].split('"')[0], name[1].split('</span')[0], age[1].split('</span')[0], idUser[1].split('?from')[0]);
                        }
                    }
                    idUser=idUser[1].split('?from')[0];
					TM.getBDD(idUser,this,"search");
                }
            });
        }else if(url.substring(0, 26)=="https://badoo.com/visitors"){
            $('.user-card').each( function(){
                idUser = $(this).html().split('/profile/0');
                if(idUser.length>1){
                    idU=idUser[1].split('?folder')[0];
					TM.getBDD(idU,this,"visitors");
                }
            });
        }else if(url.substring(0, 26)=="https://badoo.com/profile/"){
            idU=url.substring(27, url.length);
			TM.getBDD(idU,"","profil");
        }else if(url.substring(0, 27)=="https://badoo.com/liked-you"){
            var idCacheUser="";
			$('.user-card').each( function(){
                idCacheUser = $(this).html().split('&amp;id=');
                if(idCacheUser.length>1){
                    TM.getBDDrevele(idCacheUser[1].split('&amp;size=')[0],this);
                }
            });
        }
        window.setTimeout(function(){TM.boucle(Msec);}, Msec);
    }
};
TM.boucle(1500);