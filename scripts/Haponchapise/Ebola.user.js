// ==UserScript==
// @name        Ebola
// @namespace   JVScript
// @include     http://www.jeuxvideo.com/forums/1*
// @version     2
// @grant       GM_xmlhttpRequest
// @description Ebola infection script
// ==/UserScript==
 
 
function ajax() {
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://redsky.fr/ajax/ebola/get.php?idForum=50&orderTyp=tms_infection&orderMod=DESC&pseudo=&limit=1400", //j'espère que ça dépassera pas les 1400 pseudos
    onload: infect
  })
}
 
function infect(data) {
  // liste des infectés
  var infected = []
  // regex pour extraires les données du site de Redsky
  var regex = /<b>([^<]+)<\/b><\/a> ?<\/td><td><b style="color:(red|green|orange)"\s*>(\d+)%<\/b>/g
  // resultats de l'extraction
  var results
  // liste des posts
  var posts = document.getElementsByClassName('msg')
 
  // extraction les pseudos et pourcentages des infectés
  while ((results = regex.exec(data.responseText)) !== null)
    infected[results[1].toLowerCase()] = results[3]
 
  // je vérifie pour chaque post si le pseudo est infecté ou pas, si oui je fais mon traitement
  for(var i = 0; i < posts.length; i++) {
    var pseudo = posts[i].getElementsByClassName('pseudo')[0]
    var p = pseudo.getElementsByTagName('strong')[0].textContent.toLowerCase()
 
    if (infected[p] != undefined) { //si le pseudo est dans la liste des infecté
      if (infected[p] == 100)
        pseudo.innerHTML += ' <img width="22px" src="http://image.noelshack.com/fichiers/2014/41/1412764295-poison.png" />'
      else
        pseudo.innerHTML += '<span style="font-weight: bold">' + infected[p] + '</span>% contaminé'
        //posts[i].setAttribute('style', 'background-color: rgba(0, 255, 0, ' + infected[p]/100 + ')')
        pseudo.getElementsByTagName('strong')[0].setAttribute('style', 'color: green')
        posts[i].setAttribute('style', 'background-color: rgba(239, 255, 239 ' + infected[p]/100 + ')')
    }
  }  
}
 
ajax()