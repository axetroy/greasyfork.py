// ==UserScript==
// @name        MBC Everywhere
// @namespace   *
// @include     http://www.leboncoin.fr/*
// @version     3.4
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js
// @grant       GM_xmlhttpRequest
// @description Script d'ajout de fonctionnalité LeBonCoin (filtres, tag, distances, sauvegarde "cloud",...)
// ==/UserScript==

function getCookie(e){for(cName="",pCOOKIES=new Array,pCOOKIES=document.cookie.split("; "),bb=0;bb<pCOOKIES.length;bb++)NmeVal=new Array,NmeVal=pCOOKIES[bb].split("="),NmeVal[0]==e&&(cName=unescape(NmeVal[1]));return cName}function setCookie(e,t,a,o){var n=new Date;n.setTime(n.getTime()+24*a*60*60*1e3);var i="expires="+n.toGMTString()+"; ",o="path="+o+"; ";document.cookie=e+"="+t+"; "+i+o}function mylog(){var e=Array.prototype.slice.call(arguments);console.log(arguments.callee.caller.name+"() : "+e)}function globalsync(){var e=Date.now();if(session_sync>e){mylog("cas de MAJ distant");var t=getCookie("watch_ads");mylog("cookies : "+t);var a=new RegExp("[ ,;]+","g"),o=t.split(a);if(null!=localStorage.getItem("aCook")){var n=JSON.parse(localStorage.getItem("aCook"));n.forEach(function(e){o.indexOf(e[1])<0&&(mylog(e[1]+" supprimé"),$.parse["delete"]("tasks/"+e[0]))})}synccookhere("0")}else{mylog("1ère comm? cas synchro distant -> local");var i=e+18e5;window.localStorage.setItem("session_sync",i),synccookhere("1"),mylog("on synchro et remets à jour le timestamp")}}function synccookhere(e){$.parse.get("tasks",{where:{type:"cookies"}},function(t){var a=t.results;if(0===a.length)return!1;for(var o=new Array,n="",i=0;i<a.length;i++){Valeur="",a[i].Val&&(Valeur=a[i].Val);var s=new Array;s[0]=a[i].objectId,s[1]=a[i].body,s[2]=a[i].Val,s[3]=a[i].Text,o.push(s),n=n+a[i].body+","}mylog("MAJ local aCook -> "+o),window.localStorage.setItem("aCook",JSON.stringify(o)),n=n.substring(0,n.length-1),setCookie("watch_ads",n,180,"/",".leboncoin.fr"),$("#myads-backup").length>0&&get_tags(),"1"==e&&setTimeout(function(){document.location.reload()},1e3)})}function infoLocal(e,t){var a=JSON.parse(localStorage.getItem("aCook")),o=[];return a.forEach(function(a){mytag="",mytext="",a[2]&&(mytag=a[2]),a[3]&&(mytext=a[3]),"ad"==e?a[1]==t&&(o[0]=a[0],o[1]=mytag,o[2]=mytext):"bdd"==e&&a[0]==t&&(o[0]=a[1],o[1]=mytag,o[2]=mytext)}),o[0]||(o[0]="",o[1]=""),o}function getItemfromLocaltable(e,t){if(null===localStorage.getItem(e))return null;var a=JSON.parse(localStorage.getItem(e));for(var o in a)if(a[o].id==t)return{distance:a[o].distance,duration:a[o].duration}}function addtoLocaltable(e,t,a,o){var n={id:t,distance:a,duration:o};null===localStorage.getItem(e)?window.localStorage.setItem(e,JSON.stringify([n])):(json=JSON.parse(localStorage.getItem(e)),json.push(n),window.localStorage.setItem(e,JSON.stringify(json)))}function save(){var e=window.confirm("Cette opération envoit vos annonces locales vers la sauvegarde. Etes-vous sûr?");if(1==e){var t=getCookie("watch_ads");mylog("cookies = "+t);var a=new RegExp("[ ,;]+","g"),o=t.split(a);$.parse.get("tasks",{where:{type:"cookies"}},function(e){var t=e.results;o.forEach(function(e){t.indexOf(e)<0&&(mylog(e+" sauvé"),$.parse.post("tasks",{body:e,type:"cookies"},function(e){mylog("post = "+e)}))})}),setTimeout(function(){document.location.reload()},3e4)}}function initmenu(){MYgmapkey=window.localStorage.getItem("gmapkey")||"",""==MYgmapkey&&$.parse.get("tasks",{where:{Val:"gmapkey"},order:"-updateAt"},function(e){var t=e.results;0!=t.length&&(MYgmapkey=t[0].body,window.localStorage.setItem("gmapkey",MYgmapkey))});var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML="#Divaction{position:fixed;display:"+viewmenu+';max-width:200px;top:50px;font-size:0.8em;float:left;transition: all .5s ease-in;} #MYDIV{background-color:#FFCE78;padding: 10px 5px;border-radius: 0 10px 10px 0; } #MYDIV h1{border-bottom: 1px solid #000000; font-size: 1.1em;padding-bottom:2px;margin-bottom:5px;font-weight:bold;} #VIEWMYDIV{position:fixed;left:0px;top:30px;font-weight:bold;font-size:0.8em;float:left; background-color:#E3DCCD;width:75px;border-radius: 0 10px 10px 0;padding:2px;} .detail .price{float:none !important;height:20px !important;line-height:20px !important;} .Divnote{margin-top:5px; margin:auto;background-color:#FFCE78;float:right;margin:5px 0;padding:2px 5px;width:180px;border-radius: 4px;} input[type="text"].MBC{margin:2px;} input[type="text"].Ctrledit, .Textedit{text-align:center;margin : 5px auto;} input[type="button"]{text-align: center; font-size:10px;color: #000; margin:2px;background: linear-gradient( #FFE4AB, #fb9e25);border:none;border-radius: 4px;text-shadow: 0px 1px 0px #fb9e25; box-shadow: 1px 1px 2px #5D2400;}  input[type="button"].enfonce{box-shadow: 1px 1px 2px #5D2400 inset; margin:6px 2px;} #LISTSEARCH{list-style:none;padding:0;} #VERSIONSPAN a.tooltip span, #INFOSPAN a.tooltip span {display:none;} #INFOSPAN{text-align:center;} #FORMCFG {display:none; background:linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0));padding:0 0 6px 3px; width:500px; border:1px solid black;box-shadow: 2px 2px 6px 1px #5d2400;margin:0 0 5px;} #FORMCFG label {font-weight:bold; display:block; margin:5px 0 0;} #VERSIONSPAN a.tooltip:hover span, #INFOSPAN a.tooltip:hover span {display:inline;position:absolute;color:#111; border:1px solid #DCA; background:#fffAF0; width:400px;left:50px;padding:5px;} ul.dropdown{position:absolute; width:82px; display:none; background-color:#BEC0A8;margin:-5px 35px;padding:5px 10px;box-shadow:1px 1px 1px black;border-radius:0 0 5px 5px;} ul.dropdown li{list-style-type:none;} ul.itemfiltre{margin: 10px 0 0 5px;} ul.itemfiltre li{display:inline;border: 1px solid #f60; color:#f60; margin: 3px; font-weight:bold; padding:0 0 0 5px; background-color:#fff0d0; cursor:pointer;} ul.itemfiltre li span{margin:0 1px 0 5px; font-size:1.1em; color:black;} .savetag{text-align:left;}',document.head.appendChild(e);var t=document.getElementsByTagName("body")[0],a=document.createElement("div");a.innerHTML='<div id="VIEWMYDIV">Mon menu</div>';var o=document.createElement("div");o.id="Divaction",HTML='<div id="MYDIV">',MYappid&&MYrestkey&&(HTML+='<h1>Gestion des cookies :</h1><INPUT type="button" id="bouton_save" class="MBC" value="1ère sauvegarde"><br /><br /><br /><h1>Mes recherches:</h1><ul id="LISTSEARCH"></ul><div id="ADDSEARCH"><br /><input type="button" id="bouton_viewsearchform" value="Ajouter" class="button"/></div><div id="FORMSEARCH" style="display:none;"><br /><FORM name="formsearch"><INPUT type="text" class="MBC" size="17" name="Sname" value=""><br/><input type="button" class="MBC" id="bouton_addsearch" value="Enregistrer" class="button"/></FORM></div>'),HTML+='<br /><br /><h1>Gestion du script :</h1><div id="INFOSPAN"">'+Info_appli+'</div><span id="VERSIONSPAN"">'+Info_version+'</span><div id="VIEWFORMCFG" style="display:block;"><input type="button" id="bouton_viewcfgform" value="Configurer" class="button"/><br/><div id="FORMCFG" ><br /><FORM name="formcfg"><label>Ville d\'origine :</label><em>Ville de départ; cette valeur peut aussi être changé directement via les recherches</em><INPUT type="text" size="17" name="Sville" value="'+MYville+'"><label>Code App_Id :</label><em>Code d\'un compte Parsing.com, nécessaire pour sauver vos infos dans le cloud</em><INPUT type="text" size="17" name="Sappid" value="'+MYappid+'"><label>Code Rest_Key :</label><em>Code d\'un compte Parsing.com, nécessaire pour sauver vos infos dans le cloud</em><INPUT type="text" size="17" name="Srestkey" value="'+MYrestkey+'"><label>Clé Google maps :</label><em>Champs optionnel, permet de saisir une clé Google Map personnelle : la limite de requête ne sera plus partagée comme avec le compte fourni avec le script</em><br/><INPUT type="text" size="17" name="Sgmapkey" value="'+MYgmapkey+'"><br/><br/><input type="button" id="bouton_savecfg" value="Enregistrer" class="button"/></FORM></div></div><input type="button" id="vote" value="Votre avis" class="button" onclick="window.open(\'https://docs.google.com/forms/d/1zXYRHePFbgzMwG71TgnTBL0S1bqJFO5OGgR6-dfxhS8/viewform\')" /><input type="button" id="site" value="Le site" class="button" onclick="window.open(\'http://shampra.free.fr/Scripts/\')" /></div>',o.innerHTML=HTML,t.appendChild(a),t.appendChild(o),$("#VIEWMYDIV").click(function(e){viewform("#Divaction",this,"viewmenu")}),$("#bouton_save").click(save),$("#bouton_addsearch").click(addsearch),$("#bouton_viewsearchform").click(function(e){viewform("#FORMSEARCH",this)}),$("#FORMSEARCH").keypress(function(e){13==e.keyCode&&(e.preventDefault(),addsearch())}),$("#bouton_savecfg").click(savecfg),$("#bouton_viewcfgform").click(function(e){viewform("#FORMCFG",this)}),$("#LinkMaj").click(DL_maj),MYrestkey&&MYappid&&ListSearch(),mylog("before UpdateInfo"),UpdateInfo()}function savecfg(){window.localStorage.setItem("ville",document.forms.formcfg.Sville.value),window.localStorage.removeItem("aDistance"),window.localStorage.setItem("appid",document.forms.formcfg.Sappid.value),window.localStorage.setItem("restkey",document.forms.formcfg.Srestkey.value),window.localStorage.setItem("gmapkey",document.forms.formcfg.Sgmapkey.value),val_gmapkey=document.forms.formcfg.Sgmapkey.value,$.parse.post("tasks",{body:val_gmapkey,type:"conf",Val:"gmapkey"},function(e){document.location.reload()})}function viewform(e,t,a){"undefined"!=typeof a&&("none"==$(e).css("display")?window.localStorage.setItem(a,"block"):window.localStorage.setItem(a,"none")),$(t).toggleClass("enfonce"),$(e).toggle("10000000")}function addsearch(){var e=document.forms.formsearch.Sname.value,t=document.URL;$.parse.post("tasks",{body:t,type:"search",Val:e},function(e){ListSearch(),viewform("#ADDSEARCH","#FORMSEARCH")})}function ListSearch(){var e=document.querySelector("#LISTSEARCH");e.innerHTML="",$.parse.get("tasks",{where:{type:"search"},order:"-Text"},function(t){var a=t.results;return 0===a.length?!1:(a.forEach(function(t){e.innerHTML+='<li id="Search_'+t.objectId+'" style="padding: 2px;"><span class="bouton_delsearch">X</span> <a href="'+t.body+'">'+t.Val+"</a></li>"}),void $(".bouton_delsearch").click(function(e){li_ads=$(this).parents("li"),idads=li_ads.attr("id").substring(7),console.log("Delete "+idads),$.parse["delete"]("tasks/"+idads,function(e){$(li_ads).remove()})}))})}function surcharge_page(){if(mylog("Début surcharge..."),$("#myads-backup").length>0){mylog("beforeglobalsync"),globalsync(),mylog("afterglobalsync");var e=document.querySelectorAll(".myads-content div.list-lbc>a");if(e.length>0)for(var t=0;t<e.length;t++){link=e[t].href;var a=/\/([0-9]{8,10})\.htm/,o=a.exec(link),n=infoLocal("ad",o[1])[1],i=infoLocal("ad",o[1])[2],s=document.createElement("div");s.className="Divnote",s.innerHTML='Tags : <INPUT type="text" size="22" name="'+o[1]+'" class="Ctrledit MBC" value="'+n+'"><ul class="dropdown"></ul><br/>Notes : <INPUT type="text" size="22" name="'+o[1]+'" class="Textedit MBC" value="'+i+'">';var r=e[t].nextSibling.nextSibling;$(s).insertAfter(r)}$("input.Ctrledit, input.Textedit").change(function(){var e=$(this).val(),t=$(this).attr("name"),a=infoLocal("ad",t)[0];mylog("myads.changeinput : envoi de tasks/"+a+" avec Val:"+e+"(classname : "+this.className+" / "+t+")"),$(this).hasClass("Ctrledit")&&($.parse.put("tasks/"+a,{Val:e},function(e){synccookhere("0")}),$(this).next().fadeOut(100)),$(this).hasClass("Textedit")&&$.parse.put("tasks/"+a,{Text:e},function(e){synccookhere("0")}),$(this).css("color","black").css("background-color","#FFFFEB")}),$("input.Ctrledit").blur(function(){$(this).next().fadeOut(100),$(this).css("color","black").css("background-color","#FFFFEB")}),$("input.Ctrledit").focus(function(){$(this).next().fadeIn(100),$(this).css("color","#FF4C11").css("background-color","#BEC0A8")}),$("input.Textedit").blur(function(){$(this).css("color","black").css("background-color","#FFFFEB")}),$("input.Textedit").focus(function(){$(this).css("color","#FF4C11").css("background-color","#BEC0A8")});var l=document.querySelectorAll(".myads-content div.list-lbc"),c=document.createElement("div");c.className="Divfiltre",c.innerHTML='<b>Tag :</b> <select id="Schoixtag" name="Schoixtag"></select> | <b>Trier par :</b> <select id="Schoixtrie" name="Schoixtrie"><option value="Prix">Prix</option><option value="Distance">Distance</option><option value="Note">Note</option></select><br />Fitres par tags : <ul class="itemfiltre"></ul> <br />',l[0].insertBefore(c,l[0].firstChild),get_tags(),filtretag(),$("#Schoixtag, #Schoixtrie").on("change",function(){return filtretag()}),GetDistanceInfo()}else if($(".search_box").length>0){var d=document.querySelectorAll(".content-color .list-lbc a");if(d.length>0){var p=getCookie("watch_ads"),u=new RegExp("[ ,;]+","g"),g=p.split(u);d=Array.prototype.slice.call(d,0),d.forEach(function(e){link=e.href;var t=/\/([0-9]{8,10})\.htm/,a=t.exec(link);if(null!=a&&g.indexOf(a[1])>0){var o=e.querySelector("div.lbc");o.style.backgroundColor="#DDDDD5"}})}var c=document.createElement("div");c.className="Divfiltre",c.innerHTML='<div style="border-right: 1px solid #CCCCCC;float:left; padding-right:10px;">Origine :<INPUT type="text" size="17" name="Sville" class="MBC" value="'+MYville+'" id="FiltreVille"></div><div style="border-right: 1px solid #CCCCCC;float:left; padding-right:10px;">Distance max : <INPUT type="text" class="MBC" size="4" value="'+MaxDistance+'" id="FiltreDistance">km</div>',$("#searchextras").after(c),$("#FiltreVille").on("change keypress",function(e){(13==e.keyCode||"change"==e.type)&&(window.localStorage.setItem("ville",$("#FiltreVille").val()),window.localStorage.removeItem("aDistance"),document.location.reload())}),$("#FiltreDistance").on("change keypress",function(e){(13==e.keyCode||"change"==e.type)&&(window.sessionStorage.setItem("maxDistance",$("#FiltreDistance").val()),MaxDistance=window.sessionStorage.getItem("maxDistance"),mylog("Changement valeur de filtre : "+MaxDistance),$("[mydest]").each(function(){var e=$(this).attr("data-dist");parseInt(e)>parseInt(MaxDistance)?$(this).parent().parent().parent().css("display","none"):$(this).parent().parent().parent().css("display","block")}),e.preventDefault())}),GetDistanceInfo(),$(".list-gallery").hide()}else if($(".lbcContainer").length>0){var m=document.URL,a=/\/([0-9]{8,10})\.htm/,o=a.exec(m),p=getCookie("watch_ads"),u=new RegExp("[ ,;]+","g"),g=p.split(u);if(g.indexOf(o[1])>0)$("#myads_link").replaceWith('<a id="myads_link" style="opacity:0.5; "><span>Annonce déjà sauvée</span></a>');else{var f=document.createElement("div");f.className="savetag",f.innerHTML='Tags (ajouté lors de la sauvegarde de l\'annonce) (DEV): </br><INPUT type="text" size="22" name="" class="Ctrledit MBC" value=""><ul class="dropdown"></ul>',$(".bottomLinks").append(f);var h=JSON.parse(localStorage.getItem("aCook")),v=[];h.forEach(function(e){var t=new Array;null!==e[2]&&(t=e[2].split(",")),t.forEach(function(e){v.indexOf(e)<0&&""!=e&&v.push(e)})}),mylog("result : "+v),v.sort(),$.each(v,function(e,t){$(".dropdown").append("<li>"+t+"</li>")}),$("input.Ctrledit").css("color","black").css("background-color","#FFFFEB"),$("input.Ctrledit").blur(function(){$(this).next().fadeOut(100),$(this).css("color","black").css("background-color","#FFFFEB")}),$("input.Ctrledit").focus(function(){$(this).next().fadeIn(100),$(this).css("color","#FF4C11").css("background-color","#BEC0A8")}),$("ul.dropdown li").click(function(){var e=$(this).text();$(this).parent().prev().val(function(t,a){return a.length<1?e:a+","+e})}),$("#myads_link").on("click",function(){add_ads($("input.Ctrledit").val())})}}}function filtretag(e){var e=e||"",t=[];if(null!=localStorage.getItem("filtre_tag")&&(t=window.localStorage.getItem("filtre_tag").split(",")),mylog("array récupéré : "+t),""!=e)mylog("Suppression tag : "+e),t.splice($.inArray(e,t),1);else if(null!=$("#Schoixtag").val()){var a=$("#Schoixtag").val();mylog("Ajout tag : "+a),"Tout voir"==a?t=[]:"Sans tag"==a?t=["Sans tag"]:(t=jQuery.grep(t,function(e){return"Sans tag"!=e}),-1==t.indexOf(a)&&t.push(a),t=$.grep(t,function(e){return e}))}var o=$(".Divfiltre > ul");""==t?o.html(""):(o.html(""),t.forEach(function(e){o.append('<li class="itemfiltre" name="'+e+'"><input type="hidden" value="'+e+'" /> '+e+" <span>X</span></li>")}),$("li.itemfiltre").on("click",function(){return filtretag(this.attributes.name.value)})),window.localStorage.setItem("filtre_tag",t),$("#Schoixtag").val("");var n=$("#Schoixtrie").val();window.localStorage.setItem("trie",$("#Schoixtrie").val()),mylog("trie : "+n+" et tags finaux : "+t),$(".backup div.list-lbc>a").each(function(){mylog("PLOOOOOOP"),link=this.href;var e=/\/([0-9]{8,10})\.htm/,t=e.exec(link),a=$(this).find(".price").text().replace("€","").replace(/ /g,"").trim(),o=$();o.push(this),o.push(this.nextSibling),o.push(this.nextSibling.nextSibling),o.push(this.nextSibling.nextSibling.nextSibling),o.push(this.nextSibling.nextSibling.nextSibling.nextSibling),o.push(this.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling),o.wrapAll('<div class="adbox" data-nbad="'+t[1]+'" data-price="'+a+'" data-dist="waiting" >')}),$(".adbox").sort(function(e,t){return"Prix"==n?parseInt(e.dataset.price)>parseInt(t.dataset.price):"Distance"==n?parseInt(e.dataset.dist)>parseInt(t.dataset.dist):"Note"==n?$(e).find("input.Textedit").val()>$(t).find("input.Textedit").val():void mylog("Erreur trie : "+n)}).appendTo(".list-lbc"),jQuery.isEmptyObject(t)?$(".adbox").show():$(".adbox").each(function(){var e=this.dataset.nbad;Article=$(this),Article.show(),t.forEach(function(a){sTagAd=infoLocal("ad",e)[1],mylog("Filtre : "+a+" de la liste "+t+" // article tags :"+sTagAd),"Sans tag"==a&&""!=sTagAd?Article.hide():-1==sTagAd.indexOf(a)&&"Sans tag"!=a&&Article.hide()})})}function add_ads(e){var t=document.URL,e=e||"",a=/\/([0-9]{8,10})\.htm/,o=a.exec(t);mylog("Sauvegarde annonce "+o[1]+" / tags : "+e),$.parse.get("tasks",{where:{body:o[1]}},function(t){var a=t.results;mylog("add_ads().results lenght : "+a.length),0==a.length&&$.parse.post("tasks",{body:o[1],type:"cookies",Val:e},function(e){synccookhere("0")})})}function get_tags(){$("#Schoixtag option").remove(),$("ul.dropdown li").remove();var e=JSON.parse(localStorage.getItem("aCook")),t=new Array;$("#Schoixtag").append($("<option>",{value:"Tout voir"}).text("Tout voir")),$("#Schoixtag").append($("<option>",{value:"Sans tag"}).text("Sans tag")),e.forEach(function(e){var a=new Array;null!==e[2]&&(a=e[2].split(",")),a.forEach(function(e){t.indexOf(e)<0&&""!=e&&t.push(e)})}),mylog("result : "+t),t.sort(),$.each(t,function(e,t){$("#Schoixtag").append($("<option>",{value:t}).text(t)),$(".dropdown").append("<li>"+t+"</li>")}),$("ul.dropdown li").click(function(){var e=$(this).text();$(this).parent().prev().val(e);var t=$(this).parent().prev().attr("name"),a=infoLocal("ad",t)[0];mylog(" myads.changeinput : envoi de tasks/"+a+" avec Val:"+e),$.parse.put("tasks/"+a,{Val:e},function(e){synccookhere("0")})}),$("#Schoixtag").val("Choisir un tag");var a=window.localStorage.getItem("trie");$("#Schoixtrie").val(a)}function Get_Info_appli(){var e=new XMLHttpRequest;e.open("GET","https://api.parse.com/1/classes/Control/Bygg1hfpJu",!0),e.setRequestHeader("X-Parse-Application-Id","EhB5hNN5dUBprlXcfwcHm3yF0errtP7fEayyGFSY"),e.setRequestHeader("X-Parse-REST-API-Key","lHiuO3cG9myXeMCegnWuIOTCH2nANeiawPYzQtc5"),e.setRequestHeader("Content-Type","application/json"),e.onreadystatechange=function(){if(4==e.readyState){var t=JSON.parse(e.responseText);"Alerte"==t.Niveau?window.localStorage.setItem("Info_appli",' <a href="#" class="tooltip"><img style="vertical-align:bottom;" width="15" height="15"src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAedJREFUeNpiYKAyYCSk4MHdW//fPL0HZmuYOTPwcLAykmUgyKDT25cxHFzew6DC9wUsducTD4N9ZAlDaE4DI0kGggybVxXJoC1ymyHE9D9c/Mebzwyz9zIw/FP2Ywgq7GFQUFbD0M+Cy7Ao6bMM6nZyKHIcQJzqDDJ0E8O6fuwuZEIXAHkT5DJkw87d+QXGTAKCDBwivEBDgRrvbmJYPaXhP14Dzxza8f/p1gYUb67a/YGhctUPMAaxkQ0FhS9ID04DN02thtgO1EQMyDH/AtaD1UCQTUKfzjJwqaCGm4oiF2Y4QV0pK8XAANKD7EomZNd5aGK6wkiFDc5GDgoYAOlZUBmC6kKY69BjFQbUWP/AXYbNlaB0CnMlONncv3QCq+tgwNaAicGW4R9OeUklPoZDq6YhXHj58GawTbgAyKvYwhIG9Nk/Mdw7vw9h4LsnN8Gcfx/eY0+sQO8hhyVetSBCydCJ4fEz7ApBCdq97RMYg9jIakBZEaZPSEYdYaCshhHDjusQBTANMIwOQGIgdTC1IADSq2vriygckAsDH8VPRCVqmMtAhoEKi6IpmxhRShuQoev6S8CBC0oG+GL94k8+huf3PsGLM1PPKHjJg1H8gNITKBmBYh4WWegAFOagYEI2iGYAIMAA2WDo2KLFwPUAAAAASUVORK5CYII=" /><br /><br /><span>'+t.Valeur+"</span></a>"):window.localStorage.setItem("Info_appli","")}},e.send("")}function UpdateInfo(){var e=Date.now(),t=window.localStorage.getItem("timer_version"),a=window.localStorage.getItem("last_version"),o=1*t+864e5;mylog("checkafter = "+o+" et timestamp = "+e+" soit attente de : "+(o-e)),(e>o||null==a)&&(window.localStorage.setItem("timer_version",e),mylog("MAJ des infos"),Get_Info_appli(),GM_xmlhttpRequest({method:"GET",url:website+"MBC.meta.js",onload:function(e){var t=/@version\s+(\d+\.\d+)/.exec(e.responseText);mylog("Version récupérée : "+t[1]),window.localStorage.setItem("last_version",t[1]),t[1]>CurVersion?(mylog("Version pas à jour"),window.localStorage.setItem("Info_version","Version "+TypeVersion+" "+t[1]+' disponible!<br /><input type="button" value="Mettre à jour" id="LinkMaj" class="button"/></a><br /><br />')):window.localStorage.setItem("Info_version","Version "+TypeVersion+" à jour ("+CurVersion+') <a href="#" class="tooltip"><img style="vertical-align:bottom;" width="15" height="15"src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbUlEQVQ4jXWTTUhUURTHf+/Nc0ZHUzMVSemTLDLMCIWiclGBIG4lgoiW46Ig0EW0baMhtHHatguxRYQgSAhtAlu0EfOLGSW/mmHU+X7v3XvfbTE5OA4dOHDO/57/n8OfewyOxerkjSbL8kIYug9NjwbQel5rZjzPCl8a/Bk/Om8cbSJTncNmoGa0tq2XqsYOKuvOA2Ano2TjCyQ35lAiNdI++GusTGB16tpEXdu9UP25B1QEasCz0VoUhowKMCsRdppEZJa9yFy448nyEIAPYOljx2hd650XTZcHMHUa7A20vQH2BjjbaJEAlcK0/NQ0X0c4ue6nvcnq95/3Z43lD+2tVJ/cvHj7OYbYBWcLAF/7eIk3auVloQi0oq0WFufe4qXjbaardaiupQsjF0GnFtCZaBn5UFBnoujUAkY+QkPrTRzPCFlCqv7qYCVechHEPmhVJInvDwGouDULgHYy4ObRrs2JmiZcofotKdXVgEqg7Z0i2f12t0AQdskWxV7YBCpASnXeEkLlZWbH7/OyZWsH7v8o1s7X7hJBT8YRQvksKVQ0n050Vfu9MoHDsGc60cIpwXJ2DCnVmiWFnN5LHHQFGyvLiPkvV/6t7pa9xWJZpFDTZk544d9/MijXBumUZNXAElUDS2W4cm3Wt5PYSoTNgdeJrawtxlY202jplmTRvGP4YvSAXMYZG3yT3yp+5U+vghNnGvyhC6fr/+uFVpK1rSTrMTf8aNwZgmPHNDlSNew39ejZUxbNtT7qgyYA+1lFLKWIxgWO6408fifLj6koMkyLK/0hQ3l92qCHwj3Pe9qYUUqGn02we3T+Ly24YAJThgxSAAAAAElFTkSuQmCC" /><br /><br /><span>'+Lastnews+"</span></a>")}}))}function DL_maj(){window.open(website+"MBC.user.js"),GM_xmlhttpRequest({method:"PUT",url:"https://EhB5hNN5dUBprlXcfwcHm3yF0errtP7fEayyGFSY:javascript-key=iuv9TvfNy2wX5kcwSkqIxSoKxMSMY20MulN95jce@api.parse.com/1/classes/Count/"+Id_Version,data:'{"Count":{"__op":"Increment","amount":1}}',onload:function(e){JSON.parse(e.responseText)}})}function gotoGoogleMap(e){return e.preventDefault(),MYville?void window.open("http://maps.google.fr/maps?daddr="+$(this).attr("mydest")+"&saddr="+MYville):void alert("Aucune adresse de départ spécifiée.")}function GetDistanceInfo(){var e=new Array,t=document.querySelectorAll(".placement");if(t.length>0)for(var a=0;a<t.length;a++)if(1==t[a].childNodes.length){var o=t[a].textContent,n=document.createElement("div");if(n.className="Divtime",n.style.fontWeight="bold",n.style.fontSize="0.9em",n.style.backgroundImage="linear-gradient(to right, #F4F4E0, #FBFBE7)",n.style.width="150px",n.style.cursor="zoom-in",n.style.padding="2px",n.innerHTML="...",t[a].appendChild(n),"-1"!=o.indexOf("/",0)){nbstr=o.indexOf("/",0);var i=o.substring(0,nbstr).replace(/^\s+|\s+$/g,"");if($(".Divtime:eq( "+a+" )").attr("mydest",i),n.addEventListener("click",gotoGoogleMap,!1),null!=getItemfromLocaltable("aDistance",i)){var s=getItemfromLocaltable("aDistance",i);AffDistanceResult(i,s.distance,s.duration)}else e.indexOf(i,0)<"0"&&(e.push(i),MYgmapkey?Get_Distance_Google(MYville,i):Get_Distance_OMQ(MYville,i))}}}function Get_Distance_Google(e,t){mylog("Requête distance Google : https://maps.googleapis.com/maps/api/distancematrix/json?origins="+e+", France&destinations="+t+",France&sensor=false&key="+MYgmapkey),GM_xmlhttpRequest({method:"GET",url:"https://maps.googleapis.com/maps/api/distancematrix/json?origins="+e+", France&destinations="+t+",France&sensor=false&key="+MYgmapkey,onload:function(e){var a=JSON.parse(e.responseText);if("OK"==a.status)for(var o=a.rows[0].elements,n=0;n<o.length;n++){var i=o[n];if("OK"==i.status){var s=i.distance.text;s=s.substring(0,s.length-3);var r=i.duration.value;r=r>3600?Math.floor(r/3600)+"h"+r%60:Math.floor(r/60)+"mn";var l=t;addtoLocaltable("aDistance",l,s,r),mylog("Résultat sortant = "+s+" & "+r+" & mydest="+l+"!"),AffDistanceResult(l,s,r)}}else mylog("ERROR")}})}function Get_Distance_OMQ(e,t){mylog("Requête distance MAPQUEST : http://open.mapquestapi.com/directions/v2/routematrix?key=Fmjtd|luu82l01n9,a5=o5-94za16&from="+e+",France&to="+t+",France&unit=k"),GM_xmlhttpRequest({method:"GET",url:"http://open.mapquestapi.com/directions/v2/routematrix?key=Fmjtd|luu82l01n9,a5=o5-94za16&from="+e+",France&to="+t+",France&unit=k",onload:function(e){var a=JSON.parse(e.responseText);if("0"==a.info.statuscode){var o=a.distance[1];o=parseFloat(o).toFixed(0);var n=a.time[1],i=t;mylog(n),n=n>3600?Math.floor(n/3600)+"h"+n%60:Math.floor(n/60)+"mn",LocalDistance&&parseFloat(o)<400&&(addtoLocaltable("aDistance",i,o,n),mylog(o+" & "+n+" & mydest="+i+"!"),AffDistanceResult(i,o,n))}}})}function AffDistanceResult(e,t,a){""==t&&(t="0"),mylog("affichage : "+t+" & "+e),affich=t+"km ("+a+")",$('[mydest="'+e+'"]').text(affich),$('[mydest="'+e+'"]').attr("data-dist",t),$('[mydest="'+e+'"]').parent().parent().parent().parent().attr("data-dist",t),parseFloat(t)<15?$('[mydest="'+e+'"]').css("color","#00CC00"):parseFloat(t)<30?$('[mydest="'+e+'"]').css("color","#660000"):$('[mydest="'+e+'"]').css("color","red"),0==$("#myads-backup").length&&$('[mydest="'+e+'"]').each(function(){var e=$(this).attr("data-dist");parseInt(e)>parseInt(MaxDistance)&&0!=MaxDistance?$(this).parent().parent().parent().css("display","none"):$(this).parent().parent().parent().css("display","block")})}function unique(e){var t=[];return $.each(e,function(e,a){-1==$.inArray(a,t)&&t.push(a)}),t}function ajoutePage(e){$("#paging").remove(),mylog("remove paging");var t=$(e),a=t.find(".list-lbc a"),o=t.find("#paging");$(".list-lbc").append(a),GetDistanceInfo(),$(".content-border").after(o),offset=$("#paging").offset().top,load=!1;var n=document.querySelectorAll(".content-color .list-lbc a");if(n.length>0){var i=getCookie("watch_ads"),s=new RegExp("[ ,;]+","g"),r=i.split(s);n=Array.prototype.slice.call(n,0),n.forEach(function(e){link=e.href;var t=/\/([0-9]{8,10})\.htm/,a=t.exec(link);if(null!=a&&r.indexOf(a[1])>0){var o=e.querySelector("div.lbc");o.style.backgroundColor="#DDDDD5"}})}}var CurVersion="3.4",Id_Version="v2WaWQ544L",TypeVersion="",website="http://shampra.free.fr/Scripts/MBC/",Lastnews="Version "+CurVersion+" : Gestion GoogleMaps perso, voir le site (avant une grosse évolution)";!function(e){function t(){var t;return r.app_id&&r.rest_key?!0:(t="Missing app_id, or rest_key authentication parameters.\nPass these credentials to $."+s+".init\napp_id = Application Id\nrest_key = REST API Key",alert(t),e.error(t),!1)}function a(t,a,o){e.error("$."+s+" :"+a+" "+o)}function o(a,o,n){var i;return t()?(i={contentType:"application/json",processData:!1,dataType:"json",url:r.base+(c.test(o)?o:"classes/"+o),type:a,headers:{"X-Parse-Application-Id":r.app_id,"X-Parse-REST-API-Key":r.rest_key}},r.session_token&&(i.headers["X-Parse-Session-Token"]=r.session_token),"object"!=typeof n?e.ajax(i):(n=e.extend({},n),"GET"===a?(i.processData=!0,n.where&&"object"==typeof n.where&&(n.where=JSON.stringify(n.where))):n=JSON.stringify(n),i.data=n,e.ajax(i))):!1}function n(t,o,n){return"function"==typeof o&&t.done(o),n="function"==typeof n?n:a,t.fail(n),e[s]}function i(t,a,o){var n=["$.",s,".",t,"(",'"',a,'"'];return o&&n.push(", "+(JSON?JSON.stringify(o):"data")),n=n.join("")+");",e.publish&&e.publish("parse.log",[n]),n}var s,r,l,c;s="parse",r={base:"https://api.parse.com/1/"},l={},c=/(files|installations|login|push|roles|requestPasswordReset|users)/,l.init=function(t){return e.extend(r,"object"==typeof t?t:{},!0),e[s]},e.each(["GET","POST","PUT","DELETE"],function(e,t){var a=t.toLowerCase();l[a]=function(){var e,s,r,l,c;return e=arguments,s=e[0],r=e[1],l=e[2],error=e[3],"function"==typeof e[1]&&(r=!1,l=e[1],error=e[2]),i(a,s,r),c=o(t,s,r),n(c,l,error)}}),e.extend(l,{signup:function(e,t,a){return this.post("users",e,t,a)},login:function(e,t,a,o){return this.get("login",{username:e,password:t},a,o)},requestPasswordReset:function(e,t,a){return this.post("requestPasswordReset",{email:e},t,a)}}),e[s]=l}(jQuery);var MYville=window.localStorage.getItem("ville"),MaxDistance=window.sessionStorage.getItem("maxDistance")||"",MYappid=window.localStorage.getItem("appid"),MYrestkey=window.localStorage.getItem("restkey"),MYgmapkey,viewmenu=window.localStorage.getItem("viewmenu")||"",session_sync=window.localStorage.getItem("session_sync")||"0",Info_appli=window.localStorage.getItem("Info_appli")||"",Info_version=window.localStorage.getItem("Info_version")||"";if(MYrestkey&&MYappid&&$.parse.init({app_id:MYappid,rest_key:MYrestkey}),document.URL.indexOf("occasions")<0)var LocalDistance=1;var MYdebug=window.localStorage.getItem("debug");MYdebug||(console.log=function(){},mylog=function(){}),$(function(){$("#LISTSEARCH").sortable(),$("#LISTSEARCH").disableSelection()}),this.$=this.jQuery=jQuery.noConflict(!0);var load=!1,offset;$(window).scroll(function(){offset=$("#paging").offset().top;var e=window.innerHeight,t=window.scrollY;if(!load&&t>offset-e){load=!0;var a=$("#paging"),o=$("li.page:last a");if(o.length>0){var n=a.find(".selected").next().text(),i=o.get(0).href,s=$("<a/>",{href:i}).append($("<div/>",{"class":"lbc"}).text("PAGE "+n).css({"background-color":"#ddd","text-align":"center",padding:"15px",border:"2px solid black"}));$(".list-lbc").append(s),a.empty().html("<center>Chargement...</center>"),$.ajax({url:i,success:ajoutePage,error:function(e){mylog(e)}})}else a.empty().html("<center>Plus de page.</center>")}}),initmenu(),surcharge_page();