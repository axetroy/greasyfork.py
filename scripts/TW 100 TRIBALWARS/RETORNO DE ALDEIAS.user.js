// ==UserScript==
// @name           RETORNO DE ALDEIAS
// @author         Marcos V.S. Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @version        2.0 (JUN/2017;)
// @grant          Publico
// @description    (EM DESENVOLVIMENTO) (linguagem: javascript-ECMAscript5;)
// @Realiza        Suporte para inserção de emoticons,ferramentas para forum, e inserção de assinatura nas postagens e mps em forum da tribo.
// @Opções         Pode ser adicionado mais emoticons ou funções no codigo fonte do script
// @Utilização     Utilizar no forum da tribo.
// @include        https://*.tribalwars.*/forum.php*
// @include        https://*.tribalwars.*/game.php*screen=*
// @include        https://de*.die-staemme.de/forum.php*
// @include        https://de*.die-staemme.de/game.php*screen=*
// @include        http*://*.tribalwars.com.br/forum.php*
// @include        http*://*.tribalwars.com.br/game.php*screen=*
// @include        http*://*.staemme.ch/forum.php*
// @include        http*://*.staemme.ch/game.php*screen=*
// @include        http*://*.tribalwars.net/forum.php*
// @include        http*://*.tribalwars.net/game.php*screen=*
// @include        http*://*.tribalwars.nl/forum.php*
// @include        http*://*.tribalwars.nl/game.php*screen=*
// @include        http*://*.plemiona.pl/forum.php*
// @include        http*://*.plemiona.pl/game.php*screen=*
// @include        http*://*.tribalwars.se/forum.php*
// @include        http*://*.tribalwars.se/game.php*screen=*
// @include        http*://*.tribos.com.pt/forum.php*
// @include        http*://*.tribos.com.pt/game.php*screen=*
// @include        http*://*.divokekmeny.cz/forum.php*
// @include        http*://*.divokekmeny.cz/game.php*screen=*
// @include        http*://*.bujokjeonjaeng.org/forum.php*
// @include        http*://*.bujokjeonjaeng.org/game.php*screen=*
// @include        http*://*.triburile.ro/forum.php*
// @include        http*://*.triburile.ro/game.php*screen=*
// @include        http*://*.voyna-plemyon.ru/forum.php*
// @include        http*://*.voyna-plemyon.ru/game.php*screen=*
// @include        http*://*.fyletikesmaxes.gr/forum.php*
// @include        http*://*.fyletikesmaxes.gr/game.php*screen=*
// @include        http*://*.tribalwars.no.com/forum.php*
// @include        http*://*.tribalwars.no.com/game.php*screen=*
// @include        http*://*.divoke-kmene.sk/forum.php*
// @include        http*://*.divoke-kmene.sk/game.php*screen=*
// @include        http*://*.klanhaboru.hu/forum.php*
// @include        http*://*.klanhaboru.hu/game.php*screen=*
// @include        http*://*.tribalwars.dk/forum.php*
// @include        http*://*.tribalwars.dk/game.php*screen=*
// @include        http*://*.plemena.net/forum.php*
// @include        http*://*.plemena.net/game.php*screen=*
// @include        http*://*.tribals.it/forum.php*
// @include        http*://*.tribals.it/game.php*screen=*
// @include        http*://*.klanlar.org/forum.php*
// @include        http*://*.klanlar.org/game.php*screen=*
// @include        http*://*.guerretribale.fr/forum.php*
// @include        http*://*.guerretribale.fr/game.php*screen=*
// @include        http*://*.guerrastribales.es/forum.php*
// @include        http*://*.guerrastribales.es/game.php*screen=*
// @include        http*://*.tribalwars.fi/forum.php*
// @include        http*://*.tribalwars.fi/game.php*screen=*
// @include        http*://*.tribalwars.ae/forum.php*
// @include        http*://*.tribalwars.ae/game.php*screen=*
// @include        http*://*.tribalwars.co.uk/forum.php*
// @include        http*://*.tribalwars.co.uk/game.php*screen=*
// @include        http*://*.vojnaplemen.si/forum.php*
// @include        http*://*.vojnaplemen.si/game.php*screen=*
// @include        http*://*.genciukarai.lt/forum.php*
// @include        http*://*.genciukarai.lt/game.php*screen=*
// @include        http*://*.wartribes.co.il/forum.php*
// @include        http*://*.wartribes.co.il/game.php*screen=*
// @include        http*://*.plemena.com.hr/forum.php*
// @include        http*://*.plemena.com.hr/game.php*screen=*
// @include        http*://*.perangkaum.net/forum.php*
// @include        http*://*.perangkaum.net/game.php*screen=*
// @include        http*://*.tribalwars.jp/forum.php*
// @include        http*://*.tribalwars.jp/game.php*screen=*
// @include        http*://*.tribalwars.bg/forum.php*
// @include        http*://*.tribalwars.bg/game.php*screen=*
// @include        http*://*.tribalwars.asia/forum.php*
// @include        http*://*.tribalwars.asia/game.php*screen=*
// @include        http*://*.tribalwars.us/forum.php*
// @include        http*://*.tribalwars.us/game.php*screen=*
// @icon             https://www.tribalwars.nl/graphic/klee.png
// ==/UserScript==

/*	Changelog versão 2
*        Equipe do Canal Youtube TW 100 se reserva ao direito de possuir a posse do codigo-fonte  do script, quaisquer modificação deve ser solicitado via email, segundos regras da Licença Pública Geral GNU 
*        Equipe do Canal Youtube TW 100 não se responsabiliza por eventuais danos causados pela utilização do script
*        Equipe do Canal Youtube TW 100 promove a campanha "Software livre não e virus nem boot" abraça e se solidariza com os scripts de tampermonkey voltados para o game tribal wars, do qual as equipes inesperientes de suporte, sem conhecimento, e sem saber a historia dos primordios do game, impõe um pensamento de que os script de tampermonkey inflige regras, assim tornando-os proibidos. Sendo Muitas das melhorias no game, que se deu atraves de scrips de tampermonkey, Criado de players pra players.
*		25/06/2017 v2.0i primeira versão para atualização TW 8.89
*/

JavaScript:

var doc=(window.frames.length>0)?window.main.document:document;
url = doc.URL;
as = doc.getElementsByTagName("a");
urlSplit = url.split("screen");
theScreen = urlSplit[1];
villageId = as[0].href.match(/village=(\d+)/i);
t=as[0].href.match(/t=(\d+)/);
if(t)
	t="&"+t[0];
else
{
	t='';
}
previousVillageLink = "village=p" + villageId[1] + "&screen" + theScreen + t;
location.search = previousVillageLink;