// ==UserScript==
// @name        Ebola - 15-18
// @namespace   JVScript
// @include     http://www.jeuxvideo.com/forums/1*
// @version     1
// @grant       GM_xmlhttpRequest
// @description Ebola infection script
// ==/UserScript==
function ajax()
{
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://redsky.fr/ajax/ebola/get.php?idForum=50&orderTyp=tms_infection&orderMod=DESC&pseudo=&limit=1300",
    onload: infect
  })
}
function infect(data)
{
  // liste des infectés
  var infected = [];
  // regex pour extraires les données du site de Redsky
  var regex = /<b>([^<]+)<\/b><\/a> ?<\/td><td><b style="color:(red|green|orange)"\s*>(\d+)%<\/b>/g
  // resultats de l'extraction
  var results;
  // liste des posts
  var posts = window.document.getElementsByClassName('msg');
 
  // extraction les pseudos et pourcentages des infectés
  while ((results = regex.exec(data.responseText))!==null)
  {
    infected[results[1].toLowerCase()] = results[3];
  }
 
  // je vérifie pour chaque post si le pseudo est infecté ou pas, si oui je fais mon traitement
  for(var i = 0; i < posts.length; i++)
  {
    var pseudo = posts[i].getElementsByClassName('pseudo')[0];
    var p = pseudo.getElementsByTagName('strong')[0].textContent.toLowerCase();
 
    if(infected[p]!=undefined)
    { //si le pseudo est dans la liste des infecté
      if(infected[p]==100)
      {
        pseudo.innerHTML += ' 100%  <img width="22px" src="http://image.noelshack.com/fichiers/2014/41/1412764295-poison.png" />';
        pseudo.getElementsByTagName('strong')[0].setAttribute('style', 'color: black');
                  posts[i].setAttribute('style', 'background-color: rgba(255, 51, 51, ' + infected[p]/250 + ')');

      }
      else
      {
        pseudo.innerHTML += '<span style="font-weight: bold">' + infected[p] + '</span>% contaminé';
        posts[i].setAttribute('style', 'background-color: rgba(0, 255, 0, ' + infected[p]/100 + ')');
                  pseudo.getElementsByTagName('strong')[0].setAttribute('style', 'color: green');


      }
    }
     else
    {
                pseudo.innerHTML += ' 0%  Sain ';
                  posts[i].setAttribute('style', 'background-color: rgba(51, 255, 255,  0.3 )');
                  pseudo.getElementsByTagName('strong')[0].setAttribute('style', 'color: blue');

    }
  }
}
ajax();