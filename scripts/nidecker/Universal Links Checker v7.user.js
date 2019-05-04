(function ()
{
	var fileMETA=new Array();
// ==UserScript==
// @name           Universal Links Checker v7
fileMETA["name"]= 'Universal Links Checker v7';
// @namespace      https://greasyfork.org/en/scripts/6746-universal-links-checker-v7
// @description    Universal Links Checker v7 turn plain text links into real clickable links and then automatically checks their functionality from the page you are visiting. This script works only with HTML code.
// @version        7.8.0501
fileMETA["version"]= "7.8.0501";
fileMETA["changes"]= "uploadable.ch,pornfile.cz";
// @author         Lucifer
// @include        http://*
// @include        https://*
// @exclude        *google.*
// @exclude        *facebook.com*
// @exclude        *twitter.com*
// @exclude        *ceskatelevize.cz*
// @exclude        *sfshare.se*
// @exclude        *mediafire.com*
// @exclude        *megashares.com*
// @exclude        *depositfiles.com*
// @exclude        *fastshare.cz*
// @exclude        *sendspace.com*
// @exclude        *uloz.to,
// @exclude        *ulozto.cz*
// @exclude        *pornfile.cz*
// @exclude        *sdilej.cz*
// @exclude        *hellshare.com*
// @exclude        *uploaded.to*
// @exclude        *ul.to*
// @exclude        *edisk.cz*
// @exclude        *letitbit.net*
// @exclude        *stiahni.si*
// @exclude        *shareflare.net*
// @exclude        *bitshare.com*
// @exclude        *rapidu.net*
// @exclude        *euroshare.eu*
// @exclude        *turbobit.net*
// @exclude        *datafile.com*
// @exclude        *superbshare.com*
// @exclude        *filekeen.com*
// @exclude        *bezvadata.cz*
// @exclude        *filefactory.com*
// @exclude        *filejungle.com*
// @exclude        *shareonline.biz*
// @exclude        *rapidgator.net*
// @exclude        *zippyshare.com*
// @exclude        *ozofiles.com*
// @exclude        *datoid.cz*
// @exclude        *box.com*
// @exclude        *depfile.com*
// @exclude        *keep2share.cc*
// @exclude        *exload.com*
// @exclude        *fileboom.me*
// @exclude        *upsto.re*
// @exclude        *clicknupload.com*
// @exclude        *hugefiles.net*
// @exclude        *dvauploading.com*
// @exclude        *userscloud.com*
// @exclude        *lfichier.com*
// @exclude        *ulozisko.sk*
// @exclude        *stiahnito.sk*
// @exclude        *usersfiles.com*
// @exclude        *solidfiles.com*
// @exclude        *uptobox.com*
// @exclude        *rockfile.eu*
// @exclude        *nitroflare.com*
// @exclude        *tusfiles.net*
// @exclude        *xdisk.cz*
// @exclude        *uploadrocket.net*
// @exclude        *gboxes.com*
// @exclude        *chayfile.com*
// @exclude        *sfiles.com*
// @exclude        *wipfiles.net*
// @exclude        *brupload.net*
// @exclude        *sendmyway.com*
// @exclude        *unlimitzone.com*
// @exclude        *rapidfileshare.net*
// @exclude        *lunaticfiles.com*
// @exclude        *hitfile.net*
// @exclude        *creafile.net*
// @exclude        *kingfiles.net*
// @exclude        *uploadboy.com*
// @exclude        *junocloud.me*
// @exclude        *datator.cz*
// @exclude        *openload.io*
// @exclude        *bitster.cz*
// @exclude        *veodrop.com*
// @exclude        *secureupload.eu*
// @exclude        *upload.ee*
// @exclude        *uplea.com*
// @exclude        *filesupload.org*
// @exclude        *uptostream.com*
// @exclude        *ezfile.ch*
// @exclude        *mightyupload.com*
// @exclude        *fileshare.top*
// @exclude        *firstplanet.eu*
// @exclude        *filemoney.com*
// @exclude        *mega.co.nz*
// @exclude        *mega.nz*
// @exclude        *webshare.cz*
// @exclude        *netshare.cz*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant			     GM_getResourceText
// @icon           data:image/png;base64,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
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require			https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js
// @resource		jQueryUICSS https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/smoothness/jquery-ui.css
// ==/UserScript==

/*
===============================

script created for wareznet.cz
http://www.wareznet.cz/viewtopic.php?f=52&t=571557
original script(outdated) - http://userscripts-mirror.org/scripts/show/66656

===============================
*/

//<--Aktualizacia
   function getdays(date){
      Year = ((date.getYear() + 1900)*365); var daday = (date.getMonth() + 1); if(daday<7) {daday = "0" + daday;}    daday = (daday*30); daret = Year+daday+date.getDate(); return daret;
      }
   function check_update(version){
      var today = new Date( );
      day = parseInt( getdays (today) );
      if ( (typeof GM_getValue("day") == "undefined") || ( ( (day - GM_getValue("day")) ) < 0) || ( ( (day - GM_getValue("day")) ) > 1)){
         check_version(version);
         GM_setValue("day",day);
         }
      }

   var version = fileMETA["version"];
   if (navigator.appName == 'Netscape'){
   check_update(version);
   }
   function check_version(version) { var script_url = "https://greasyfork.org/scripts/6746-universal-links-checker-v7/code/Universal%20Links%20Checker%20v7.user.js";
      GM_xmlhttpRequest({ method:"GET",url:script_url,
         onload:function(result) {    var newversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(result.responseText)[1];
         if (null == newversion){ alert('There was an error in the update function of the "'+fileMETA["name"]+'" \nGo to '+script_url+' to download the latest version.\nThis message will appear again in 7 days'); }
         if(newversion==version){ return; }else{ var answer = confirm('New version of the "'+fileMETA["name"]+'"  is available.\nChanges: '+fileMETA["changes"]+'\nDo you want to update now? Check for update will be done again in 7 days');
                if (answer){   GM_openInTab("https://greasyfork.org/en/scripts/6746-universal-links-checker-v7"); }
            }
          }
         });
   }
//koniec Aktualizacia-->

linkify2();
calljs();

var sfshare_se= new Array(6)
 sfshare_se[0]="sfshare.se";
 sfshare_se[1]='Size:|Uploaded on:';
 sfshare_se[2]='The file was removed|Reason for deletion:';
 sfshare_se[3]='dsdlhkhsgdsgdhskjhgd';
 sfshare_se[4]="//a[contains(@href,'sfshare.se/')]";
 sfshare_se[5]='dsdlhkhsgdsgdhskjhgd';

var mediafire_com= new Array(6)
 mediafire_com[0]="mediafire\.com\/";
 mediafire_com[1]='href="/images/favicon/download.ico"/>';
 mediafire_com[2]='<title>Simple File Sharing and Storage.</title>';
 mediafire_com[3]='dsdlhkhsgdsgdhskjhgd';
 mediafire_com[4]="//a[contains(@href,'mediafire.com')]";
 mediafire_com[5]='tos_aup_violation';

var megashares_com= new Array(6)
 megashares_com[0]="(megashares.com\|\.megashares.com)";
 megashares_com[1]='Filesize';
 megashares_com[2]='Invalid Link Request - file does not exist.';
 megashares_com[3]='All download slots for this link are currently filled|This link is currently offline for scheduled maintenance, please try again later.';
 megashares_com[4]="//a[contains(@href,'megashares.com/')]";
 megashares_com[5]='dsdlhkhsgdsgdhskjhgd';

var depositfiles_com= new Array(6)
 depositfiles_com[0]="(depositfiles\.(com|org)\/|dfiles\.eu\/)";
 depositfiles_com[1]='<b>File Download</b>|File name|Nom du fichier|Nome do arquivo|speed_small\.gif';
 depositfiles_com[2]='Such file does not exist|<div class="no_download_msg"|This file does not exist,';
 depositfiles_com[3]='dsdlhkhsgdsgdhskjhgd';
 depositfiles_com[4]="//a[contains(@href,'depositfiles') or contains(@href,'dfiles')]";
 depositfiles_com[5]='dsdlhkhsgdsgdhskjhgd';

var fastshare_cz= new Array(6)
 fastshare_cz[0]="fastshare\.(cz|sk)";
 fastshare_cz[1]='<div class="download-div">';
 fastshare_cz[2]='Tento soubor již není dostupný.|Tento súbor už nie je dostupný.|Tento súbor bol zmazaný|Tento soubor byl smazán|Plik został usunięty na życzenie właściciela praw autorskich.|The file has been deleted at request of its copyright owner.|<h2>Na vyhledávaný dotaz nebylo nic nalezeno.</h2>';
 fastshare_cz[3]='dsdlhkhsgdsgdhskjhgd';
 fastshare_cz[4]="//a[contains(@href,'fastshare.cz') or contains(@href,'fastshare.sk')]";
 fastshare_cz[5]='dsdlhkhsgdsgdhskjhgd';

var sendspace_com= new Array(6)
 sendspace_com[0]='sendspace\.com\/file\/(?:\w*)';
 sendspace_com[1]='File Size:';
 sendspace_com[2]='the file you requested is not available.';
 sendspace_com[3]='dsdlhkhsgdsgdhskjhgd';
 sendspace_com[4]="//a[contains(@href,'sendspace.com') and contains(@href,'file')]";
 sendspace_com[5]='dsdlhkhsgdsgdhskjhgd';

var uloz_to= new Array(6)
 uloz_to[0]='uloz\.to';
 uloz_to[1]='fileDownload|<p>Vyplň prosím heslo.</p>';
 uloz_to[2]='Soubor nebyl nalezen|Soubor byl smazán|Súbor bol zmazaný|Stránka nenalezena|Soubor byl zakázán|File was banned|deleted';
 uloz_to[3]='dsdlhkhsgdsgdhskjhgd';
 uloz_to[4]="//a[contains(@href,'uloz.to/')]";
 uloz_to[5]='dsdlhkhsgdsgdhskjhgd';

var ulozto_cz= new Array(6)
 ulozto_cz[0]='(ulozto|pornfile)\.(cz|sk|net)';
 ulozto_cz[1]='fileDownload|<p>Vyplň prosím heslo.</p>';
 ulozto_cz[2]='Soubor nebyl nalezen|Soubor byl smazán|Súbor bol zmazaný|Stránka nenalezena|Soubor byl zakázán|File was banned|deleted';
 ulozto_cz[3]='dsdlhkhsgdsgdhskjhgd';
 ulozto_cz[4]="//a[contains(@href,'ulozto.cz') or contains(@href,'ulozto.sk') or contains(@href,'ulozto.net') or contains(@href,'pornfile.cz')]";
 ulozto_cz[5]='dsdlhkhsgdsgdhskjhgd';

var sdilej_cz= new Array(6)
 sdilej_cz[0]='(https|http)://sdilej\.cz';
 sdilej_cz[1]='Velikost:|<div class="detail-content clearfix">|Komentáře|class="page-download"';
 sdilej_cz[2]='Soubor nenalezen|Soubor expiroval|Proveďte prosím reupload.|identifikován jako warez|Soubor byl smazán|Tato složka neobsahuje žádné soubory!';
 sdilej_cz[3]='dsdlhkhsgdsgdhskjhgd';
 sdilej_cz[4]="//a[contains(@href,'sdilej.cz')]";
 sdilej_cz[5]='optional--';

var hellshare_com= new Array(6)
 hellshare_com[0]='(hellshare\.(cz|sk|com)|download\.(com|sk|cz|en)\.hellshare\.(cz|sk|com))';
 hellshare_com[1]='tab\\-details|<a class="button"';
 hellshare_com[2]='list-purp-2|not found on this server|<p>Žiadne súbory</p>';
 hellshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 hellshare_com[4]="//a[contains(@href,'hellshare.')]";
 hellshare_com[5]='dsdlhkhsgdsgdhskjhgd';

var uploaded_to= new Array(6)
 uploaded_to[0]='uploaded\.(to|net)';
 uploaded_to[1]='Choose your download method';
 uploaded_to[2]='Page not found|The requested file isn\'t available anymore!';
 uploaded_to[3]='Wartungsarbeiten';
 uploaded_to[4]="//a[contains(@href,'uploaded.to') or contains(@href,'uploaded.net')]";
 uploaded_to[5]='dsdlhkhsgdsgdhskjhgd';

var ul_to= new Array(6)
 ul_to[0]='ul\.to\/';
 ul_to[1]='Choose your download method|Downloadart';
 ul_to[2]='Page not found|The requested file isn\'t available anymore!';
 ul_to[3]='Wartungsarbeiten';
 ul_to[4]="//a[contains(@href,'ul.to/')]";
 ul_to[5]='dsdlhkhsgdsgdhskjhgd';

var edisk_cz= new Array(6)
 edisk_cz[0]='edisk\.(cz|sk)';
 edisk_cz[1]='Stáhnout soubor:|Stiahnuť súbor:';
 edisk_cz[2]='Tento soubor již neexistuje z následujích důvodů:|Tento súbor už neexistuje z nasledujúcich dôvodov:';
 edisk_cz[3]='dsdlhkhsgdsgdhskjhgd';
 edisk_cz[4]="//a[contains(@href,'edisk.cz') or contains(@href,'edisk.sk')]";
 edisk_cz[5]='dsdlhkhsgdsgdhskjhgd';

var letitbit_net= new Array(6)
 letitbit_net[0]='(www\.)?letitbit\.net\/download';
 letitbit_net[1]='img_sigmal_free';
 letitbit_net[2]='Request file|File not found';
 letitbit_net[3]='dsdlhkhsgdsgdhskjhgd';
 letitbit_net[4]="//a[contains(@href,'letitbit.net') and contains(@href,'download')]";
 letitbit_net[5]='dsdlhkhsgdsgdhskjhgd';

var stiahni_si= new Array(6)
 stiahni_si[0]='(stiahni|stahni)\.si';
 stiahni_si[1]='General:|<div class="about-file">';
 stiahni_si[2]='404\.png|download_icon3\.png|<div class="col-md-7 error-content">';
 stiahni_si[3]='dsdlhkhsgdsgdhskjhgd';
 stiahni_si[4]="//a[contains(@href,'stiahni.si') or contains(@href,'stahni.si')]";
 stiahni_si[5]='dsdlhkhsgdsgdhskjhgd';


var shareflare_net= new Array(6)
 shareflare_net[0]='shareflare\.net\/download';
 shareflare_net[1]='<div class="premium-block">';
 shareflare_net[2]='File not found|<div id="captcha"';
 shareflare_net[3]='dsdlhkhsgdsgdhskjhgd';
 shareflare_net[4]="//a[contains(@href,'shareflare.net') and contains(@href,'download')]";
 shareflare_net[5]='dsdlhkhsgdsgdhskjhgd';

var bitshare_com= new Array(6)
 bitshare_com[0]='bitshare\.com';
 bitshare_com[1]='Please select your download type to start';
 bitshare_com[2]='We are sorry, but the requested file was not found in our database!|Folder does not contain any files!';
 bitshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 bitshare_com[4]="//a[contains(@href,'bitshare.com')]";
 bitshare_com[5]='dsdlhkhsgdsgdhskjhgd';

var rapidu_net= new Array(6)
 rapidu_net[0]='rapidu.net';
 rapidu_net[1]='Download file:';
 rapidu_net[2]='error.png';
 rapidu_net[3]='dsdlhkhsgdsgdhskjhgd';
 rapidu_net[4]="//a[contains(@href,'rapidu.net')]";
 rapidu_net[5]='dsdlhkhsgdsgdhskjhgd';

var euroshare_eu= new Array(6)
 euroshare_eu[0]='euroshare\.eu\/(file|folder)';
 euroshare_eu[1]='<i class="material-icons dp48">file_download</i>';
 euroshare_eu[2]='chyba - EuroShare.eu';
 euroshare_eu[3]='dsdlhkhsgdsgdhskjhgd';
 euroshare_eu[4]="//a[contains(@href,'euroshare.eu') and contains(@href,'file') or contains(@href,'folder')]";
 euroshare_eu[5]='dsdlhkhsgdsgdhskjhgd';

var turbobit_net= new Array(6)
 turbobit_net[0]='turbobit\.net\/';
 turbobit_net[1]='Choose a download type|Выберите вариант скачивания';
 turbobit_net[2]='<table class="captcha_table">|Подождите, идёт поиск файла...|Файл не найден.|Please wait, searching file...|File not found.|function afterWait()';
 turbobit_net[3]='<h1>The site is temporarily unavailable during upgrade process.</h1>';
 turbobit_net[4]="//a[contains(@href,'turbobit')]";
 turbobit_net[5]='dsdlhkhsgdsgdhskjhgd';

var datafile_com= new Array(6)
 datafile_com[0]='datafile.com\/';
 datafile_com[1]='Download will start in|Filesize:|Загрузка начнется через';
 datafile_com[2]='ErrorCode|This file was deleted|<div class="error-msg">';
 datafile_com[3]='dsdlhkhsgdsgdhskjhgd';
 datafile_com[4]="//a[contains(@href,'datafile.com')]";
 datafile_com[5]='dsdlhkhsgdsgdhskjhgd';

var superbshare_com= new Array(6)
 superbshare_com[0]='superbshare\.(com|cz)\/file';
 superbshare_com[1]='">Stahovat soubory může jen registrovaný';
 superbshare_com[2]='Najdi podobné soubory';
 superbshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 superbshare_com[4]="//a[contains(@href,'superbshare.com') or contains(@href,'superbshare.cz') and contains(@href,'file')]";
 superbshare_com[5]='dsdlhkhsgdsgdhskjhgd';

var filekeen_com= new Array(6)
 filekeen_com[0]='(filekeen|filerio)\.(com|in)\/';
 filekeen_com[1]='<div class="form_filed_download_0">';
 filekeen_com[2]='File Not Found|The file was removed by administrator|File has been removed';
 filekeen_com[3]='dsdlhkhsgdsgdhskjhgd';
 filekeen_com[4]="//a[contains(@href,'filekeen.com') or contains(@href,'filerio.in')]";
 filekeen_com[5]='dsdlhkhsgdsgdhskjhgd';

var bezvadata_cz= new Array(6)
 bezvadata_cz[0]='bezvadata\.cz\/stahnout';
 bezvadata_cz[1]='stahnoutSoubor';
 bezvadata_cz[2]='Tento soubor byl na žádost uživatele nebo vlastníka autorských práv odstraněn a není ho nadále možné zobrazit ani stáhnout.';
 bezvadata_cz[3]='dsdlhkhsgdsgdhskjhgd';
 bezvadata_cz[4]="//a[contains(@href,'bezvadata.cz') and contains(@href,'stahnout')]";
 bezvadata_cz[5]='dsdlhkhsgdsgdhskjhgd';

var filefactory_com = new Array(6)
 filefactory_com[0]='filefactory\.com';
 filefactory_com[1]='file uploaded|<div id="file_info">|Go pro with FileFactory Premium';
 filefactory_com[2]='Invalid Download Link|The requested folder is private.|Could not find a folder matching your request|There are no files in this folder.|<h2>Invalid Folder Link</h2>|no longer available';
 filefactory_com[3]='dsdlhkhsgdsgdhskjhgd';
 filefactory_com[4]="//a[contains(@href,'filefactory')]";
 filefactory_com[5]='dsdlhkhsgdsgdhskjhgd';

var filejungle_com= new Array(6)
 filejungle_com[0]='filejungle\.com';
 filejungle_com[1]='fastest_dl rounded2';
 filejungle_com[2]='This file is no longer available';
 filejungle_com[3]='optional--';
 filejungle_com[4]="//a[contains(@href,'filejungle.com')]";
 filejungle_com[5]='optional--';

var shareonline_biz= new Array(6)
 shareonline_biz[0]='(share-online|egoshare)\.(biz|com)';
 shareonline_biz[1]='Please choose your download package|Bitte wählen Sie Ihr Download-Paket';
 shareonline_biz[2]='The requested file is not available!|Die angeforderte Datei konnte nicht gefunden werden!';
 shareonline_biz[3]='dsdlhkhsgdsgdhskjhgd';
 shareonline_biz[4]="//a[contains(@href,'share-online.biz') or contains(@href,'egoshare.com')]";
 shareonline_biz[5]='dsdlhkhsgdsgdhskjhgd';

var rapidgator_net= new Array(6)
 rapidgator_net[0]='(rapidgator|rg)\.(net|to)';
 rapidgator_net[1]='Downloading|Скачиваемый файл:|Téléchargement en cours:|Descargando:';
 rapidgator_net[2]='File not found|Файл не найден|Fichier non trouvé|Archivo no encontrado';
 rapidgator_net[3]='dsdlhkhsgdsgdhskjhgd';
 rapidgator_net[4]="//a[contains(@href,'rapidgator.net') or contains(@href,'rg.to')]";
 rapidgator_net[5]='dsdlhkhsgdsgdhskjhgd';

var zippyshare_com= new Array(6)
 zippyshare_com[0]='zippyshare\.com';            //http://www45.zippyshare.com/v/499080/file.html
 zippyshare_com[1]='download_small\.png|Download Now|download\.png|class="download"></div>';
 zippyshare_com[2]='not exist';
 zippyshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 zippyshare_com[4]="//a[contains(@href,'zippyshare.com')]";
 zippyshare_com[5]='dsdlhkhsgdsgdhskjhgd';

var ozofiles_com= new Array(6)
 ozofiles_com[0]='ozofiles\.com';
 ozofiles_com[1]='name="method_free"';
 ozofiles_com[2]='class="err">Copyright|class="content_white"> <b>|delete_icon\.png|expired|deleted|Datei ist abgelaufen,|fichier a expire|عذراً للإزعاج.الأسباب|Dosya Administrator|ไฟล์ถูกลบโดยการบริหาร|El archivo|これは利用規約を遵守し|a tulajdonos|File sudah|Bestand is verwijderd|شامل یکی';
 ozofiles_com[3]='dsdlhkhsgdsgdhskjhgd';
 ozofiles_com[4]="//a[contains(@href,'ozofiles.com')]";
 ozofiles_com[5]='dsdlhkhsgdsgdhskjhgd';

var datoid_cz= new Array(6)
 datoid_cz[0]='(pornoid|datoid)\.(cz|sk)';
 datoid_cz[1]='<div id="snippet--comments">|btn-download';
 datoid_cz[2]='Soubor byl zablokován.|Súbor bol zablokovaný.|Soubor byl smazán.|Súbor bol zmazaný';
 datoid_cz[3]='dsdlhkhsgdsgdhskjhgd';
 datoid_cz[4]="//a[contains(@href,'pornoid') or contains(@href,'datoid')]";
 datoid_cz[5]='dsdlhkhsgdsgdhskjhgd';

var box_com= new Array(6)
 box_com[0]='\.box\.(com|net)';
 box_com[1]='data-type="download-btn">Download File</a>';
 box_com[2]='This shared file or folder link has been removed.';
 box_com[3]='dsdlhkhsgdsgdhskjhgd';
 box_com[4]="//a[contains(@href,'box.com') or contains(@href,'box.net')]";
 box_com[5]='dsdlhkhsgdsgdhskjhgd';

var depfile_com= new Array(6)
 depfile_com[0]='depfile\.com';
 depfile_com[1]='Popis súboru ktorý sa sťahuje|The description of currently downloaded file|Popis soubora ke stažení';
 depfile_com[2]='Page Not Found!|Súbor bol vymazaný|The file was deleted|Soubor je smazan';
 depfile_com[3]='dsdlhkhsgdsgdhskjhgd';
 depfile_com[4]="//a[contains(@href,'depfile.com')]";
 depfile_com[5]='dsdlhkhsgdsgdhskjhgd';

var keep2share_cc= new Array(6)
 keep2share_cc[0]='(keep2share|k2s).cc';
 keep2share_cc[1]='File:|Size:';
 keep2share_cc[2]='This file is no longer available.';
 keep2share_cc[3]='dsdlhkhsgdsgdhskjhgd';
 keep2share_cc[4]="//a[contains(@href,'keep2share.cc') or contains(@href,'k2s.cc')]";
 keep2share_cc[5]='dsdlhkhsgdsgdhskjhgd';

var exload_com= new Array(6)
 exload_com[0]='ex-load.com';
 exload_com[1]='Are you trying to download the file:';
 exload_com[2]='File Not Found';
 exload_com[3]='This file is available for Premium Users only';
 exload_com[4]="//a[contains(@href,'ex-load.com')]";
 exload_com[5]='dsdlhkhsgdsgdhskjhgd';

var fileboom_me= new Array(6)
 fileboom_me[0]='(fileboom|fboom).me';
 fileboom_me[1]='Download file:';
 fileboom_me[2]='Sorry, this file is blocked or deleted.';
 fileboom_me[3]='dsdlhkhsgdsgdhskjhgd';
 fileboom_me[4]="//a[contains(@href,'fileboom.me') or contains(@href,'fboom.me')]";
 fileboom_me[5]='dsdlhkhsgdsgdhskjhgd';

var upsto_re= new Array(6)
 upsto_re[0]='(upsto|upstore).(re|net)';
 upsto_re[1]='Upgrade to premium and get:|Slow download';
 upsto_re[2]='File was deleted by owner or due to a violation of service rules. Sorry for inconvenience...';
 upsto_re[3]='dsdlhkhsgdsgdhskjhgd';
 upsto_re[4]="//a[contains(@href,'upsto.re') or contains(@href,'upstore.net')]";
 upsto_re[5]='dsdlhkhsgdsgdhskjhgd';

var clicknupload_com= new Array(6)
 clicknupload_com[0]='clicknupload.(com|me)';
 clicknupload_com[1]='Size:|Grootte:|גודל קובץ:';
 clicknupload_com[2]='File Not Found|The file you were looking for could not be found, sorry for any inconvenience.|קובץ לא נמצא|Bestand niet gevonden';
 clicknupload_com[3]='dsdlhkhsgdsgdhskjhgd';
 clicknupload_com[4]="//a[contains(@href,'clicknupload')]";
 clicknupload_com[5]='dsdlhkhsgdsgdhskjhgd';

var hugefiles_net= new Array(6)
 hugefiles_net[0]='hugefiles.net';
 hugefiles_net[1]='method_free';
 hugefiles_net[2]='class="clear"';
 hugefiles_net[3]='dsdlhkhsgdsgdhskjhgd';
 hugefiles_net[4]="//a[contains(@href,'hugefiles.net')]";
 hugefiles_net[5]='dsdlhkhsgdsgdhskjhgd';

var dvauploading_com= new Array(6)
 dvauploading_com[0]='24uploading.com';
 dvauploading_com[1]='File:|Download Speed:';
 dvauploading_com[2]='<b>File Not Found</b>';
 dvauploading_com[3]='dsdlhkhsgdsgdhskjhgd';
 dvauploading_com[4]="//a[contains(@href,'24uploading.com')]";
 dvauploading_com[5]='dsdlhkhsgdsgdhskjhgd';

var userscloud_com= new Array(6)
 userscloud_com[0]='userscloud.com';
 userscloud_com[1]='<button type="submit" id="btn_download" class="btn btn-info">';
 userscloud_com[2]='The file you are trying to download is no longer available|OFFLINE';
 userscloud_com[3]='server is in maintenance mode';
 userscloud_com[4]="//a[contains(@href,'userscloud.com')]";
 userscloud_com[5]='dsdlhkhsgdsgdhskjhgd';

var lfichier_com= new Array(6)
 lfichier_com[0]='1fichier';
 lfichier_com[1]='value="Access to download"';
 lfichier_com[2]="errorDiv|deleted";
 lfichier_com[3]='dsdlhkhsgdsgdhskjhgd';
 lfichier_com[4]="//a[contains(@href,'1fichier')]";
 lfichier_com[5]='dsdlhkhsgdsgdhskjhgd';

var ulozisko_sk= new Array(6)
 ulozisko_sk[0]='ulozisko.sk';
 ulozisko_sk[1]='Detaily:';
 ulozisko_sk[2]='neexistuje';
 ulozisko_sk[3]='dsdlhkhsgdsgdhskjhgd';
 ulozisko_sk[4]="//a[contains(@href,'ulozisko.sk')]";
 ulozisko_sk[5]='dsdlhkhsgdsgdhskjhgd';

var stiahnito_sk= new Array(6)
 stiahnito_sk[0]='stiahnito.sk';
 stiahnito_sk[1]='Nahrané:';
 stiahnito_sk[2]='Súbor nebol nájdený';
 stiahnito_sk[3]='dsdlhkhsgdsgdhskjhgd';
 stiahnito_sk[4]="//a[contains(@href,'stiahnito.sk')]";
 stiahnito_sk[5]='dsdlhkhsgdsgdhskjhgd';

var usersfiles_com= new Array(6)
 usersfiles_com[0]='usersfiles.com';
 usersfiles_com[1]='glyphicons cloud-download';
 usersfiles_com[2]='class="label label-important"';
 usersfiles_com[3]='dsdlhkhsgdsgdhskjhgd';
 usersfiles_com[4]="//a[contains(@href,'usersfiles.com')]";
 usersfiles_com[5]='dsdlhkhsgdsgdhskjhgd';

var solidfiles_com= new Array(6)
 solidfiles_com[0]='solidfiles.com';
 solidfiles_com[1]='<dl class="meta">|<p class="meta">';
 solidfiles_com[2]='The page you were looking for appears to no longer be there.|<h2>404</h2>|This file has been deleted and is no longer available for download.|<title>File not available - Solidfiles</title>';
 solidfiles_com[3]='dsdlhkhsgdsgdhskjhgd';
 solidfiles_com[4]="//a[contains(@href,'solidfiles.com')]";
 solidfiles_com[5]='dsdlhkhsgdsgdhskjhgd';

var uptobox_com= new Array(6)
 uptobox_com[0]='uptobox.com';
 uptobox_com[1]='Anda telah meminta:|Lien de téléchargement:|You have requested:';
 uptobox_com[2]='Alasan-alasan yang mungkin:|Raisons possibles:|Possible reasons:';
 uptobox_com[3]='dsdlhkhsgdsgdhskjhgd';
 uptobox_com[4]="//a[contains(@href,'uptobox.com')]";
 uptobox_com[5]='dsdlhkhsgdsgdhskjhgd';

var rockfile_eu= new Array(6)
 rockfile_eu[0]='rockfile.eu';
 rockfile_eu[1]='You have requested:';
 rockfile_eu[2]='fa-chain-broken"></i>';
 rockfile_eu[3]='dsdlhkhsgdsgdhskjhgd';
 rockfile_eu[4]="//a[contains(@href,'rockfile.eu')]";
 rockfile_eu[5]='dsdlhkhsgdsgdhskjhgd';

var nitroflare_com= new Array(6)
 nitroflare_com[0]='nitroflare.com';
 nitroflare_com[1]='<th>Free Download</th>';
 nitroflare_com[2]='This file has been removed';
 nitroflare_com[3]='dsdlhkhsgdsgdhskjhgd';
 nitroflare_com[4]="//a[contains(@href,'nitroflare.com')]";
 nitroflare_com[5]='dsdlhkhsgdsgdhskjhgd';

var tusfiles_net= new Array(6)
 tusfiles_net[0]='tusfiles.net';
 tusfiles_net[1]='id="btn_download"';
 tusfiles_net[2]='This could be due to the following reasons:|causes of this error|Le fichier|je istekao|Nag-expire na ang file';
 tusfiles_net[3]='dsdlhkhsgdsgdhskjhgd';
 tusfiles_net[4]="//a[contains(@href,'tusfiles.net')]";
 tusfiles_net[5]='dsdlhkhsgdsgdhskjhgd';

var xdisk_cz= new Array(6)
 xdisk_cz[0]='xdisk.cz';
 xdisk_cz[1]='Popis:';
 xdisk_cz[2]='Soubor, který hledáte nenalezen!';
 xdisk_cz[3]='dsdlhkhsgdsgdhskjhgd';
 xdisk_cz[4]="//a[contains(@href,'xdisk.cz')]";
 xdisk_cz[5]='dsdlhkhsgdsgdhskjhgd';

var uploadrocket_net= new Array(6)
 uploadrocket_net[0]='uploadrocket.net';
 uploadrocket_net[1]='<td>2000 Mb</td>';
 uploadrocket_net[2]='<font style="color:#d33;"></font>';
 uploadrocket_net[3]='dsdlhkhsgdsgdhskjhgd';
 uploadrocket_net[4]="//a[contains(@href,'uploadrocket.net')]";
 uploadrocket_net[5]='dsdlhkhsgdsgdhskjhgd';

var gboxes_com= new Array(6)
 gboxes_com[0]='gboxes.com';
 gboxes_com[1]='<td>2048 Mb</td>|<td>2048 Mb</td>';
 gboxes_com[2]='Possible causes of this error could be:|Mögliche Gründe für diesen Fehler::|le fichier a expire |انتهاء صلاحية الملف|HatanД±n olasД± nedenleri::|ไฟล์หมดอายุ|El archivo expirу|ファイルの有効期限が切れ|A file lejГЎrt|File sudah kadaluarsa|Bestand is verlopen|פג זמנו של הקובץ';
 gboxes_com[3]='dsdlhkhsgdsgdhskjhgd';
 gboxes_com[4]="//a[contains(@href,'gboxes.com')]";
 gboxes_com[5]='dsdlhkhsgdsgdhskjhgd';

var chayfile_com= new Array(6)
 chayfile_com[0]='chayfile.com';
 chayfile_com[1]='name="method_free"';
 chayfile_com[2]='<h3>The file was removed by administrator</h3>|was deleted';
 chayfile_com[3]='dsdlhkhsgdsgdhskjhgd';
 chayfile_com[4]="//a[contains(@href,'chayfile.com')]";
 chayfile_com[5]='dsdlhkhsgdsgdhskjhgd';

var sfiles_com= new Array(6)
 sfiles_com[0]='salefiles.com';
 sfiles_com[1]='class="Freebutton"';
 sfiles_com[2]='Possible causes of this error could be:|Mögliche Gründe für diesen Fehler::|le fichier a expire |انتهاء صلاحية الملف|HatanД±n olasД± nedenleri::|ไฟล์หมดอายุ|El archivo expirу|ファイルの有効期限が切れ|A file lejГЎrt|File sudah kadaluarsa|Bestand is verlopen|פג זמנו של הקובץ';
 sfiles_com[3]='dsdlhkhsgdsgdhskjhgd';
 sfiles_com[4]="//a[contains(@href,'salefiles.com')]";
 sfiles_com[5]='dsdlhkhsgdsgdhskjhgd';

var wipfiles_net= new Array(6)
 wipfiles_net[0]='wipfiles.net';
 wipfiles_net[1]='You have requested';
 wipfiles_net[2]='Possible causes of this error could be:';
 wipfiles_net[3]='dsdlhkhsgdsgdhskjhgd';
 wipfiles_net[4]="//a[contains(@href,'wipfiles.net')]";
 wipfiles_net[5]='dsdlhkhsgdsgdhskjhgd';

var brupload_net= new Array(6)
 brupload_net[0]='brupload.net';
 brupload_net[1]='Voce Solicitou';
 brupload_net[2]='Possiveis causas:';
 brupload_net[3]='dsdlhkhsgdsgdhskjhgd';
 brupload_net[4]="//a[contains(@href,'brupload.net')]";
 brupload_net[5]='dsdlhkhsgdsgdhskjhgd';


var sendmyway_com= new Array(6)
 sendmyway_com[0]='sendmyway.com';
 sendmyway_com[1]='id="download_link"|<div class="dl_header">';
 sendmyway_com[2]='was removed';
 sendmyway_com[3]='dsdlhkhsgdsgdhskjhgd';
 sendmyway_com[4]="//a[contains(@href,'sendmyway.com')]";
 sendmyway_com[5]='dsdlhkhsgdsgdhskjhgd';

var unlimitzone_com= new Array(6)
 unlimitzone_com[0]='unlimitzone.com';
 unlimitzone_com[1]='yep\.png';
 unlimitzone_com[2]='Download The Requested File';
 unlimitzone_com[3]='dsdlhkhsgdsgdhskjhgd';
 unlimitzone_com[4]="//a[contains(@href,'unlimitzone.com')]";
 unlimitzone_com[5]='dsdlhkhsgdsgdhskjhgd';


var rapidfileshare_net= new Array(6)
 rapidfileshare_net[0]='rapidfileshare.net';
 rapidfileshare_net[1]='cross\.png';
 rapidfileshare_net[2]='class="err">Copyright Issue</b>|style="width:500px;text-align:left;">';
 rapidfileshare_net[3]='dsdlhkhsgdsgdhskjhgd';
 rapidfileshare_net[4]="//a[contains(@href,'rapidfileshare.net')]";
 rapidfileshare_net[5]='dsdlhkhsgdsgdhskjhgd';


var lunaticfiles_com= new Array(6)
 lunaticfiles_com[0]='lunaticfiles.com';
 lunaticfiles_com[1]='value="download1">';
 lunaticfiles_com[2]='The file expired';
 lunaticfiles_com[3]='dsdlhkhsgdsgdhskjhgd';
 lunaticfiles_com[4]="//a[contains(@href,'lunaticfiles.com')]";
 lunaticfiles_com[5]='dsdlhkhsgdsgdhskjhgd';


var hitfile_net= new Array(6)
 hitfile_net[0]='hitfile.net';
 hitfile_net[1]='<h2 class="download-file">';
 hitfile_net[2]='function afterWait()';
 hitfile_net[3]='dsdlhkhsgdsgdhskjhgd';
 hitfile_net[4]="//a[contains(@href,'hitfile.net')]";
 hitfile_net[5]='dsdlhkhsgdsgdhskjhgd';


var creafile_net= new Array(6)
 creafile_net[0]='creafile.net';
 creafile_net[1]='<div class="statics">';
 creafile_net[2]='<div id="errcontainer">';
 creafile_net[3]='dsdlhkhsgdsgdhskjhgd';
 creafile_net[4]="//a[contains(@href,'creafile.net')]";
 creafile_net[5]='dsdlhkhsgdsgdhskjhgd';


var kingfiles_net= new Array(6)
 kingfiles_net[0]='kingfiles.net';
 kingfiles_net[1]='yep\.png';
 kingfiles_net[2]='class="err">|expired|deleted|Datei ist abgelaufen,|fichier a expire|عذراً للإزعاج.الأسباب|Dosya Administrator|ไฟล์ถูกลบโดยการบริหาร|El archivo|これは利用規約を遵守し|a tulajdonos|File sudah|Bestand is verwijderd|شامل یکی';
 kingfiles_net[3]='dsdlhkhsgdsgdhskjhgd';
 kingfiles_net[4]="//a[contains(@href,'kingfiles.net')]";
 kingfiles_net[5]='dsdlhkhsgdsgdhskjhgd';


var uploadboy_com= new Array(6)
 uploadboy_com[0]='uploadboy.(com|me)';
 uploadboy_com[1]='uploadboy-lowspeed.png';
 uploadboy_com[2]='action-btn';
 uploadboy_com[3]='dsdlhkhsgdsgdhskjhgd';
 uploadboy_com[4]="//a[contains(@href,'uploadboy.com') or contains(@href,'uploadboy.me')]";
 uploadboy_com[5]='dsdlhkhsgdsgdhskjhgd';

var junocloud_me= new Array(6)
 junocloud_me[0]='junocloud.me';
 junocloud_me[1]='class="request">You have requested:</p>';
 junocloud_me[2]='<h1>File Not Found</h1>';
 junocloud_me[3]='dsdlhkhsgdsgdhskjhgd';
 junocloud_me[4]="//a[contains(@href,'junocloud.me')]";
 junocloud_me[5]='dsdlhkhsgdsgdhskjhgd';

var datator_cz= new Array(6)
 datator_cz[0]='datator.cz';
 datator_cz[1]='<ul class="file_info_list">';
 datator_cz[2]='odstraněný soubor';
 datator_cz[3]='dsdlhkhsgdsgdhskjhgd';
 datator_cz[4]="//a[contains(@href,'datator.cz')]";
 datator_cz[5]='dsdlhkhsgdsgdhskjhgd';

var openload_io= new Array(6)
 openload_io[0]='openload.(io|co)';
 openload_io[1]='class="download">';
 openload_io[2]='<h1>We are sorry!</h1>';
 openload_io[3]='dsdlhkhsgdsgdhskjhgd';
 openload_io[4]="//a[contains(@href,'openload.io') or contains(@href,'openload.co')]";
 openload_io[5]='dsdlhkhsgdsgdhskjhgd';

   var bitster_cz= new Array(6)
 bitster_cz[0]='bitster.cz';
 bitster_cz[1]='True';
 bitster_cz[2]='False';
 bitster_cz[3]='dsdlhkhsgdsgdhskjhgd';
 bitster_cz[4]="//a[contains(@href,'bitster.cz')]";
 bitster_cz[5]='dsdlhkhsgdsgdhskjhgd';

var veodrop_com= new Array(6)
 veodrop_com[0]='veodrop.com';
 veodrop_com[1]='class="btn_free"';
 veodrop_com[2]='The file you were looking for could not be found, sorry for any inconvenience';
 veodrop_com[3]='dsdlhkhsgdsgdhskjhgd';
 veodrop_com[4]="//a[contains(@href,'veodrop.com')]";
 veodrop_com[5]='dsdlhkhsgdsgdhskjhgd';

var secureupload_eu= new Array(6)
 secureupload_eu[0]='secureupload.eu';
 secureupload_eu[1]='id="freedlsubmit"';
 secureupload_eu[2]='Possible causes of this error could be:';
 secureupload_eu[3]='dsdlhkhsgdsgdhskjhgd';
 secureupload_eu[4]="//a[contains(@href,'secureupload.eu')]";
 secureupload_eu[5]='dsdlhkhsgdsgdhskjhgd';

var upload_ee= new Array(6)
 upload_ee[0]='upload.ee';
 upload_ee[1]='images/dl_.gif';
 upload_ee[2]='deleted';
 upload_ee[3]='dsdlhkhsgdsgdhskjhgd';
 upload_ee[4]="//a[contains(@href,'upload.ee')]";
 upload_ee[5]='dsdlhkhsgdsgdhskjhgd';

var uplea_com= new Array(6)
uplea_com[0]='uplea.com';
uplea_com[1]='Download your file:';
uplea_com[2]='You followed an invalid or expired link.';
uplea_com[3]='dsdlhkhsgdsgdhskjhgd';
uplea_com[4]="//a[contains(@href,'uplea.com')]";
uplea_com[5]='dsdlhkhsgdsgdhskjhgd';

var filesupload_org= new Array(6)
filesupload_org[0]='filesupload.org';
filesupload_org[1]='Filename :';
filesupload_org[2]='File not found';
filesupload_org[3]='dsdlhkhsgdsgdhskjhgd';
filesupload_org[4]="//a[contains(@href,'filesupload.org')]";
filesupload_org[5]='dsdlhkhsgdsgdhskjhgd';

var uptostream_com= new Array(6)
 uptostream_com[0]='uptostream.com';
 uptostream_com[1]='<title>Stream';
 uptostream_com[2]='UpToStream : 404';
 uptostream_com[3]='dsdlhkhsgdsgdhskjhgd';
 uptostream_com[4]="//a[contains(@href,'uptostream.com')]";
 uptostream_com[5]='dsdlhkhsgdsgdhskjhgd';

var ezfile_ch= new Array(6)
ezfile_ch[0]='ezfile.ch';
ezfile_ch[1]='Complete the reCaptcha challenge above';
ezfile_ch[2]='The file at this URL was either removed or did not exist in the first place';
ezfile_ch[3]='dsdlhkhsgdsgdhskjhgd';
ezfile_ch[4]="//a[contains(@href,'ezfile.ch')]";
ezfile_ch[5]='dsdlhkhsgdsgdhskjhgd';

var mightyupload_com= new Array(6)
mightyupload_com[0]='mightyupload.com';
mightyupload_com[1]='Click here to Continue to your File';
mightyupload_com[2]='Archive no Encontrado|deleted';
mightyupload_com[3]='dsdlhkhsgdsgdhskjhgd';
mightyupload_com[4]="//a[contains(@href,'mightyupload.com')]";
mightyupload_com[5]='dsdlhkhsgdsgdhskjhgd';

var fileshare_top= new Array(6)
fileshare_top[0]='file-share.top';
fileshare_top[1]='btn-success btn-lg download';
fileshare_top[2]='Stránka neexistuje|404 Not Found';
fileshare_top[3]='dsdlhkhsgdsgdhskjhgd';
fileshare_top[4]="//a[contains(@href,'file-share.top')]";
fileshare_top[5]='dsdlhkhsgdsgdhskjhgd';

var firstplanet_eu= new Array(6)
firstplanet_eu[0]='firstplanet.eu';
firstplanet_eu[1]='<div class="sto">';
firstplanet_eu[2]='<h2>Soubor byl';
firstplanet_eu[3]='dsdlhkhsgdsgdhskjhgd';
firstplanet_eu[4]="//a[contains(@href,'firstplanet.eu')]";
firstplanet_eu[5]='dsdlhkhsgdsgdhskjhgd';

var filemoney_com= new Array(6)
filemoney_com[0]='filemoney.com';
filemoney_com[1]='filemoney-lowspeed.gif';
filemoney_com[2]='<div style="width:500px;text-align:left;">';
filemoney_com[3]='dsdlhkhsgdsgdhskjhgd';
filemoney_com[4]="//a[contains(@href,'filemoney.com')]";
filemoney_com[5]='dsdlhkhsgdsgdhskjhgd';

var netshare_cz= new Array(6)
netshare_cz[0]="netshare.cz";
netshare_cz[1]='<div class="row title_row">';
netshare_cz[2]='Chyba 404|Stránka, kterou se pokoušíte zobrazit, neexistuje.|Plik został usunięty na życzenie właściciela praw autorskich.|The file has been deleted at request of its copyright owner.|<h2>Na vyhledávaný dotaz nebylo nic nalezeno.</h2>';
netshare_cz[3]='dsdlhkhsgdsgdhskjhgd';
netshare_cz[4]="//a[contains(@href,'netshare.cz') or contains(@href,'netshare.sk')]";
netshare_cz[5]='dsdlhkhsgdsgdhskjhgd';


//var http_file_hosts=[megaupload_com];
var http_file_hosts=[sfshare_se,mediafire_com,megashares_com,depositfiles_com,fastshare_cz,sendspace_com,uloz_to,ulozto_cz,sdilej_cz,hellshare_com,uploaded_to,ul_to,edisk_cz,letitbit_net,stiahni_si,shareflare_net,bitshare_com,
rapidu_net,euroshare_eu,turbobit_net,datafile_com,superbshare_com,filekeen_com,bezvadata_cz,filefactory_com,filejungle_com,shareonline_biz,rapidgator_net,zippyshare_com,ozofiles_com,datoid_cz,box_com,depfile_com,keep2share_cc,
exload_com,fileboom_me,upsto_re,clicknupload_com,hugefiles_net,dvauploading_com,userscloud_com,lfichier_com,ulozisko_sk,stiahnito_sk,usersfiles_com,solidfiles_com,uptobox_com,rockfile_eu,nitroflare_com,tusfiles_net,xdisk_cz,uploadrocket_net,
gboxes_com,chayfile_com,sfiles_com,wipfiles_net,brupload_net,sendmyway_com,unlimitzone_com,rapidfileshare_net,lunaticfiles_com,hitfile_net,creafile_net,kingfiles_net,uploadboy_com,junocloud_me,datator_cz,openload_io,bitster_cz,veodrop_com,
secureupload_eu,upload_ee,uplea_com,filesupload_org,uptostream_com,ezfile_ch,mightyupload_com,fileshare_top,firstplanet_eu,filemoney_com,netshare_cz];
/*is this faster ?
//var lianks = document.getElementsByTagName('a');
//for (var i = links.length - 1; i >= 0; i--) {
//}
var lianks = document.getElementsByTagName('a');*/
//var lianks = document.evaluate( "//a",  document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);
//var lianks = document.evaluate( "//a[contains(@href,'depositfiles') and contains(@href,'files')]" ,  document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);

var lianks = document.evaluate(sfshare_se[4]+'|'+mediafire_com[4]+'|'+megashares_com[4]+'|'+depositfiles_com[4]+'|'+fastshare_cz[4]+'|'+netshare_cz[4]+'|'+sendspace_com[4]+'|'+uloz_to[4]+'|'+ulozto_cz[4]+'|'+sdilej_cz[4]+'|'
+hellshare_com[4]+'|'+uploaded_to[4]+'|'+ul_to[4]+'|'+edisk_cz[4]+'|'+letitbit_net[4]+'|'
+stiahni_si[4]+'|'+shareflare_net[4]+'|'+bitshare_com[4]+'|'+rapidu_net[4]+'|'+euroshare_eu[4]+'|'+turbobit_net[4]+'|'+datafile_com[4]+'|'+superbshare_com[4]+'|'+filekeen_com[4]+'|'+bezvadata_cz[4]+'|'
+filefactory_com[4]+'|'+filejungle_com[4]+'|'+shareonline_biz[4]+'|'+rapidgator_net[4]+'|'+zippyshare_com[4]+'|'+ozofiles_com[4]+'|'+datoid_cz[4]+'|'+box_com[4]+'|'+depfile_com[4]+'|'+keep2share_cc[4]+'|'+exload_com[4]+'|'
+fileboom_me[4]+'|'+upsto_re[4]+'|'+clicknupload_com[4]+'|'+hugefiles_net[4]+'|'+dvauploading_com[4]+'|'+userscloud_com[4]+'|'+lfichier_com[4]+'|'+ulozisko_sk[4]+'|'+stiahnito_sk[4]+'|'+usersfiles_com[4]+'|'+solidfiles_com[4]+'|'
+uptobox_com[4]+'|'+rockfile_eu[4]+'|'+nitroflare_com[4]+'|'+tusfiles_net[4]+'|'+xdisk_cz[4]+'|'+uploadrocket_net[4]+'|'+gboxes_com[4]+'|'+chayfile_com[4]+'|'+sfiles_com[4]+'|'+wipfiles_net[4]+'|'+brupload_net[4]+'|'+sendmyway_com[4]+'|'
+unlimitzone_com[4]+'|'+rapidfileshare_net[4]+'|'+lunaticfiles_com[4]+'|'+hitfile_net[4]+'|'+creafile_net[4]+'|'+kingfiles_net[4]+'|'+uploadboy_com[4]+'|'+junocloud_me[4]+'|'+datator_cz[4]+'|'+openload_io[4]+'|'+bitster_cz[4]+'|'
+veodrop_com[4]+'|'+secureupload_eu[4]+'|'+upload_ee[4]+'|'+uplea_com[4]+'|'+filesupload_org[4]+'|'+uptostream_com[4]+'|'+ezfile_ch[4]+'|'+mightyupload_com[4]+'|'+fileshare_top[4]+'|'+firstplanet_eu[4]+'|'+filemoney_com[4], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// var lianks = document.evaluate(megarapid_cz[4], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// GM_log(lianks.snapshotLength);
if (lianks.snapshotLength > 0){
	addstyle();
	 if ( lianks.snapshotLength > 1500 ){ checktill = "1500";}else{checktill = lianks.snapshotLength;}
	//}
for (var y = 0; y < checktill; y++) {

	var link = lianks.snapshotItem(y);

	for (var i=0; i<http_file_hosts.length; i++) {
//		GM_log(http_file_hosts[i][0]+' +++ '+link.href);
		if (link.href.match(http_file_hosts[i][0])) {
            console.log(http_file_hosts[i]);
// 			GM_log(http_file_hosts[i][0]+' +++ '+link.href);
			var URL                                          = link.href;
			var name                                         = http_file_hosts[i][0];
			var file_is_alive                                = http_file_hosts[i][1];
			var file_is_dead                                 = http_file_hosts[i][2];
			var no_dd_slots_temp_unavail_servererror         = http_file_hosts[i][3];
			var whattoreplace                                = http_file_hosts[i][4];
			var tos_violation                                = http_file_hosts[i][5];

			geturl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , tos_violation);
		}
	}
}
}
function geturl(URL,name,file_is_alive,file_is_dead,no_dd_slots_temp_unavail_servererror,whattoreplace,tos_violation){

//headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
GM_xmlhttpRequest({
method: 'GET',
url: name == "bitster.cz" ? "https://bitster.cz/api/file_validate?param=" + encodeURIComponent(URL) : URL,
headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
           'Accept': 'text/xml,application/x-httpd-php', },
onload: function(responseDetails) {
	//GM_log(URL);
	GM_log(responseDetails.responseText);
//	alert(OK);
	if (responseDetails.status == 403 || responseDetails.status == 404 ){
		DiplayTheNDSTUSERROR(URL);
	}
// 	GM_log(responseDetails.status);
	var alivelink = responseDetails.responseText.match(file_is_alive);
	var deadylink = responseDetails.responseText.match(file_is_dead);
	var tosviolat = responseDetails.responseText.match(tos_violation);
	var noddslotstempunavailservererror = responseDetails.responseText.match(no_dd_slots_temp_unavail_servererror);
	if (deadylink && (deadylink != null)){
		DiplayTheDeletedLinks(URL);
	}
	if (alivelink && (alivelink != null)){
		DiplayTheLiveLinks(URL);
	}
	if (tosviolat && (tosviolat != null)){
		DiplayTheDeletedLinks(URL);
	}
	if (noddslotstempunavailservererror && (noddslotstempunavailservererror != null)){
		DiplayTheNDSTUSERROR(URL);
	}
}
});
}

function DiplayTheLiveLinks(URL){
//var xpathoflivelinklinks = "//a[starts-with(@href,\'" + livelinklinks.join('\') or starts-with(@href,\'') +"\')]";
//var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\')]";
var xpathoflivelinklinks = "//a[contains(@href,\'"+URL+"\')]";
//GM_log (xpathoflivelinklinks);

var allliveLinks, thisLink;

allliveLinks = document.evaluate( xpathoflivelinklinks,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allliveLinks.snapshotLength; i++) {
//	GM_log('i ='+i);
    var thisLink = allliveLinks.snapshotItem(i);
    thisLink.id = 'alive_link';
    thisLink.style.color = "#29CF29";
 }
}

function DiplayTheDeletedLinks(URL){

//GM_log ("//a[starts-with(@href,\'" + fotfoundlinks.join('\') or starts-with(@href,\'') +"\')]");
//var xpathoffotfoundlinks = "//a[starts-with(@href,\'" + fotfoundlinks.join('\') or starts-with(@href,\'') +"\')]";#FFCC00
//var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') +"\')]";
var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
var allLinks, thisLink;

allLinks = document.evaluate( xpathoffotfoundlinks,
document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
//    GM_log(allLinks.snapshotItem(i).id);
    thisLink.id = 'adead_link';
    thisLink.style.color = "#FF4719";
}
}

function DiplayTheNDSTUSERROR(URL){
var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
var allLinks, thisLink;

allLinks = document.evaluate( xpathoffotfoundlinks,
document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
    thisLink.id = 'NDSTUSERROR';
    thisLink.style.color = "#E6B800";
}
	}

function addstyle(){
   alive_link_png = 'data:image/png;base64,'+       // http://i28.tinypic.com/dq5emx.png http://hosts1.atspace.com/accept.png
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUA'+
'QWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAITSURBVHjadJJNSFRhFIafud+94/iHMxhBChloFESFlVhZ4KJoEUSEBVFB'+
'LgqKCClt0SIJop/dEAVBQbSIFoFF+9Dsh8AW/W2iKTIdtdBx0hxn5s6903tniFYdeDnn+3jPOe/5zhe6MULJrBDY'+
'Fh0Ku4VOoVFICkPC3YLPS79Y5triorharqdQ5Lx8Ff+sOYAKHpS/LMTFX7DzHo4J0e9DH/+xXzmqahwuOYbavM8F'+
'q+CxLV+gR8m4QuB1LnshOWeImD1MZxqZz3FGMrdYrk+34ASEuXyZqDOe8DkFscp9nG4fYFntbsbncTTXUVtVO5HQ'+
'2YwhW6inwvxkaQ0kZiFib+Jk221Si1Mkpt8TFi/n0mlJ0pJkWtObXRzf+IhK08GbMchkm+nreIBjhbkyeITJuddU'+
'O7CYJ2apU0oBFXrADQ1bOdV+j5a6vZxoi9MUbeHq02OMpgdZHlWCq04eadN6gNaIYd3oTIKx1A92rjrMjpVdrIit'+
'5vrwOYa+3qKpXjNqL3q0YNYnQVJaF4cqwp71cWKEqXSKtQ3befzuDg8/9NNQXySkWQp+KdHVQ/TabnnTca2jN1YH'+
'w99u8n3mE5OZt8SiKh0qSfprcS36hVnTpQJFXnkeGfnNtlN0Jn5/wYksaOvl3UlSxve5qKRr6pY16/eXKrhKeC7C'+
's+BXRcLE1KBS5DGpGBDOGov7kukG3+6PAAMAhlLlEXAyFYcAAAAASUVORK5CYII=';

adead_link_png = 'data:image/png;base64,'+       //http://i27.tinypic.com/t96wq8.png http://hosts1.atspace.com/dead.png
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAABcRAAAXEQHKJvM/AAACRElEQVR42j1S'+
'T0gUURj/vdnn7OK6rqC1ZrWWmetuWRGWHiqjyAgTBalDEnQoCaF/p+jmKbpFJw916BIiUReJJLp5CYMy6hClQaKJ'+
'bLOuO7vuzM7M+/pmlGbmzXvf+36/9/35PYCf3uZGVG5dgjEygPW7l1G4P4z1B8PRYGbbuDEQ+M8mEz4csidRj4eH'+
'2uCaFrSIPAGiGbKcwElbf03TCo5pNT4+mi4P5kzIySMZxCBh2c51jeipKtkQ/PqfzyLBliZqbauy0UZaZOr4YVvk'+
'erpBNZEGdmT/gxVtMqQELAvKdaFFq4NsqsqOEMb5UxDlym9SlIRtg3OB0PVgVvk8ZOYAEIvNe58/tUIPQxnmTWF0'+
'd4JMm4hPlOl2ULEItbjEcbiWRAJ176afu7Mfr60PX50Kbd/W762VFqXKFkGKM1o1EBu/k5WpVF3u5JkqUV2N+MvJ'+
'MbX8Z6wweo8j6/1evgSXKClWd7fCFYKo4kDu2vm14c3rDpX9CxEOv4KuD2XP9XnKyIVENMqHKx/rSYeL9jQuOxKB'+
's/CrY+XC4ELTzPt9qrQxtHK6F15uLSRqYwA3g7jOCjAhlpP7UQZuKyGeaCEJVShAz7R/IMftcuYXhE8gJghupsOd'+
'jXGbxXTTHhysCsNkVVWgSQhklSH8NUcnz9uUmEnxkDb+1iyMijoO+ahhBy7WxGEoL8/guC9ogMKWxryu17SJ6ZJ5'+
'ZWR1aXPTH88ak/jRksFcMtX5Ld0x+73rGM01p+jL3vYXP1vSYd8f3Dse/wDrSwJ+r/9TiQAAAABJRU5ErkJggg==';

NDSTUSERROR_png = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsSAAALEgHS3X78AAAA8UlEQVR42mP8'+
'f4YBGQQCcTIQ2wAxPxBfA+IdQNwExB9hihihmniAeAUQezNgB0+BOBGId4M4TFDBpXg0gIA0EG+BugCsKQSI/fBo'+
'OAXFbEA8GSTAAsQJeDUY/zcDs84y3geSBiDbQDaZISlaA3M3moYCIKkIFTcA2SQE5VwDKgqBKpoIZOcjaZiAZDAn'+
'KPRuAxkqUIEOoOIKuDSmBhCIADlvK5JABVBhBx4Nv0DOB9kECs4b0LiCAZC/XLEETB8QFzNBIy4aagoMYNMAMqgS'+
'OUUwQCNuGhDroin+DsQ1UFsY0DXBgAo0GmBp7ywQf0FWAABl6UADfVkWTgAAAABJRU5ErkJggg==';


GM_addStyle("#alive_link {background:transparent url("+alive_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#adead_link {background:transparent url("+adead_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#NDSTUSERROR {background:transparent url("+NDSTUSERROR_png+") no-repeat scroll 100% 50%;padding-right:17px;}");

}

function linkify2(){ // code from http://userscripts.org/scripts/review/34397  Linkify ting
try{


var regex = /\b((https?|file|irc|ftp):\/\/)?(([-.A-Za-z0-9]+:)?[\#-.A-Za-z0-9]+@)?((([\w-]+(?!@)\.)?([\w-]+\.)+(ru|si|is|bz|dk|com|net|org|se|no|nl|ee|cn|us|uk|de|it|nu|edu|info|co|in|ly|to|fr|gov|biz|tv|mil|hu|ug|eu|sx|mobi|az|me|cc|cx|pk|ge|so|pl|ir|be|nz|lk|re|ch|st|la|sk|cz|es|io|top|au|at|lk|pr|fm|ws)(\.(nr|in|uk))?)|(about:\w+))(\/[^\s]*)?\b/gi, space_regex=/ /g, http_regex=/^((https?|file|irc|ftp)\:\/\/)|(about:\w+)/i, txt=/\.txt$/i;

var black_tags = ["a", "script", "style", "textarea", "title", "option", "pre"+(txt.test(location.href)?"allowTxt":"")];
var path = ".//text()[not(parent::" + black_tags.join(" or parent::") +")]";

textNodes = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0,item; (item=textNodes.snapshotItem(i)); i++){

    var itemText = item.nodeValue;

    if (regex.test(itemText)){
        var span=document.createElement("span");
        var lastLastIndex = 0;
            regex.lastIndex = 0;
        for (var myArray = null; myArray = regex.exec(itemText); ){
            var link = myArray[0];
            span.appendChild(document.createTextNode(itemText.substring(lastLastIndex, myArray.index)));
            var href = link.replace(space_regex,""),
                text = (link.indexOf(" ")==0)?link.substring(1):link;
            if (!http_regex.test(href)) href="http://"+href;
            var a = document.createElement("a");
            a.setAttribute("href", href);
            a.setAttribute("target", "newTab");
            a.appendChild(document.createTextNode(link));
            if ((link.indexOf(" ")==0)) span.appendChild(document.createTextNode(" "));
            span.appendChild(a);
            lastLastIndex = regex.lastIndex;
        }
        span.appendChild(document.createTextNode(itemText.substring(lastLastIndex)));
        item.parentNode.replaceChild(span, item);
	}
}
} catch(e){alert(e);}
}

function calljs(){ //based on mental's Mega.co.nz Link Checker - reduced
var allHostNames = ["mega.co.nz","webshare.cz",];

try {
	//iframes excluded
	if (window.top != window.self) {
		return;
	}

	//allHostNames sites excluded
	if (window.location.href.match("https?:\/\/(www\.)?[\w\.-]*(?:" + allHostNames.join("|").replace(/\./g, "\\.").replace(/-/g, "\\-") + ")")) {
		return;
	}
} catch (e) {
	return;
}

	String.prototype.contains = function(searchString) {
	if (searchString.constructor === RegExp) {
		if (searchString.test(this)) return true;
		else return false;

	} else if (searchString.constructor === String) {
		function replaceStr(string) {
			return string.replace(new RegExp(RAND_STRING, 'g'), '|');
		}

		searchString = searchString.replace(/\\\|/g, RAND_STRING);
		var searchArray = searchString.split('|');

		if (searchArray.length > 1) {
			var found = false;
			var i = searchArray.length;

			while (i--) {
				if (this.indexOf(replaceStr(searchArray[i])) > -1) {
					found = true;
					break;
				}
			}

			return found;

		} else {
			if (this.indexOf(replaceStr(searchString)) > -1) return true;
			else return false;
		}
	} else {
		throw new TypeError('String.contains: Input is not valid, string or regular expression required, ' + searchString.constructor.name + ' given.');
	}
}

var firstRun = JSON.parse(localStorage.getItem("MLC_First_Run"));
if (firstRun == null) firstRun = true;

var chromeBrowser = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

var preferences = JSON.parse(localStorage.getItem("MLC_Preferences"));

allHostNames.sort();

var RAND_STRING = "8QyvpOSsRG3QWq";
var RAND_INT = Math.floor(Math.random()*10000);
var RAND_INT2 = Math.floor(Math.random()*10000);

var ANONYMIZE_SERVICE;
var ANONYMIZERS = [];

var cLinksTotal = 0;
var cLinksDead = 0;
var cLinksAlive = 0;


var filehostsAlive = "";
var filehostsDead = "";

var alive_link_png	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAITSURBVHjadJJNSFRhFIafud+94/iHMxhBChloFESFlVhZ4KJoEUSEBVFBLgqKCClt0SIJop/dEAVBQbSIFoFF+9Dsh8AW/W2iKTIdtdBx0hxn5s6903tniFYdeDnn+3jPOe/5zhe6MULJrBDYFh0Ku4VOoVFICkPC3YLPS79Y5triorharqdQ5Lx8Ff+sOYAKHpS/LMTFX7DzHo4J0e9DH/+xXzmqahwuOYbavM8Fq+CxLV+gR8m4QuB1LnshOWeImD1MZxqZz3FGMrdYrk+34ASEuXyZqDOe8DkFscp9nG4fYFntbsbncTTXUVtVO5HQ2YwhW6inwvxkaQ0kZiFib+Jk221Si1Mkpt8TFi/n0mlJ0pJkWtObXRzf+IhK08GbMchkm+nreIBjhbkyeITJuddUO7CYJ2apU0oBFXrADQ1bOdV+j5a6vZxoi9MUbeHq02OMpgdZHlWCq04eadN6gNaIYd3oTIKx1A92rjrMjpVdrIit5vrwOYa+3qKpXjNqL3q0YNYnQVJaF4cqwp71cWKEqXSKtQ3befzuDg8/9NNQXySkWQp+KdHVQ/TabnnTca2jN1YHw99u8n3mE5OZt8SiKh0qSfprcS36hVnTpQJFXnkeGfnNtlN0Jn5/wYksaOvl3UlSxve5qKRr6pY16/eXKrhKeC7Cs+BXRcLE1KBS5DGpGBDOGov7kukG3+6PAAMAhlLlEXAyFYcAAAAASUVORK5CYII=';
var adead_link_png	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAABcRAAAXEQHKJvM/AAACRElEQVR42j1ST0gUURj/vdnn7OK6rqC1ZrWWmetuWRGWHiqjyAgTBalDEnQoCaF/p+jmKbpFJw916BIiUReJJLp5CYMy6hClQaKJbLOuO7vuzM7M+/pmlGbmzXvf+36/9/35PYCf3uZGVG5dgjEygPW7l1G4P4z1B8PRYGbbuDEQ+M8mEz4csidRj4eH2uCaFrSIPAGiGbKcwElbf03TCo5pNT4+mi4P5kzIySMZxCBh2c51jeipKtkQ/PqfzyLBliZqbauy0UZaZOr4YVvkerpBNZEGdmT/gxVtMqQELAvKdaFFq4NsqsqOEMb5UxDlym9SlIRtg3OB0PVgVvk8ZOYAEIvNe58/tUIPQxnmTWF0d4JMm4hPlOl2ULEItbjEcbiWRAJ176afu7Mfr60PX50Kbd/W762VFqXKFkGKM1o1EBu/k5WpVF3u5JkqUV2N+MvJMbX8Z6wweo8j6/1evgSXKClWd7fCFYKo4kDu2vm14c3rDpX9CxEOv4KuD2XP9XnKyIVENMqHKx/rSYeL9jQuOxKBs/CrY+XC4ELTzPt9qrQxtHK6F15uLSRqYwA3g7jOCjAhlpP7UQZuKyGeaCEJVShAz7R/IMftcuYXhE8gJghupsOdjXGbxXTTHhysCsNkVVWgSQhklSH8NUcnz9uUmEnxkDb+1iyMijoO+ahhBy7WxGEoL8/guC9ogMKWxryu17SJ6ZJ5ZWR1aXPTH88ak/jRksFcMtX5Ld0x+73rGM01p+jL3vYXP1vSYd8f3Dse/wDrSwJ+r/9TiQAAAABJRU5ErkJggg==';


function linkify(filterId) { //code from http://userscripts.org/scripts/review/2254 Linkify ting
	if (!filterId) {
		var regexy = "", ikkeTilladteTags = [];

			regexy = "(?:http:\/\/.+?\\?)?(?:https?:\/\/)?(?:[\\w\\.\\-]*[\\w\\-]+\\.(?:com?\\.\\w{2}|in\\.ua|uk\\.com|\\w{2,4})(?::\\d{2,5})?\/|(?:www\\.)?\\w{6,}\\.1fichier\\.com)[\\w\\Ã¢â‚¬â€œ\\-\\.+$!*\\/\\(\\)\\[\\]\',~%?:@#&=\\\\\\Ã¢â‚¬â€;\\u0020Ã¢â‚¬Â¦Ãƒâ€”ÃƒÆ’\\_\\u0080-\\u03FFÃ¢â‚¬â„¢Ã¢â‚¬Ëœ\\|]*";

			ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links

		var regex = new RegExp(regexy, "g");
		var censors = [	];

		var censorRegex = new RegExp("(?:http:\/\/.+?\\?)?(?:https?:\/\/)?[\\w\\.\\-]*~\\s?(?:" + censors.join("|") +  ")\\.*\\s?~[\\w\\–\\-\\.+$!*\\/()\\[\\]\',~%?:@#&=\\\\\\—;…×Ã\\_\\u0080-\\u03FF’‘]*", "i");
		var ignoreImage = /(?:\.png|\.jpg|\.gif|\.jpeg|\.bmp)$/i, textNode, muligtLink;

		var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") + ") and contains(.,'/')]";
		var textNodes = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var i = textNodes.snapshotLength;

		while (i--) {
			textNode = textNodes.snapshotItem(i);
			muligtLink = textNode.nodeValue; //all links on page

			var myArray = null;
			if (regex.test(muligtLink)) {
				var span = document.createElement('span'), lastLastIndex = 0, myArray = null;
				regex.lastIndex = 0;

				while (myArray = regex.exec(muligtLink)) {
					var link = $.trim(myArray[0]);

					var hostName = gimmeHostName2(link);
					var hostNameSafe = hostName.replace(/\./g, "_dot_").replace(/\-/g, "_dash_").toLowerCase();
					if (hostName == gimmeHostName(window.location.hostname) || !hostsIDs[hostNameSafe] || ignoreImage.test(link.replace(/\[\/img\]$/, ""))) {
						continue;
					}

					span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));

					var $a = $("<a>" + link + "</a>")

					if (!link.match(/https?:\/\//)) {
						link = 'http://' + link;
					}

					$a.attr("href", link.replace(/\[\/hide:\w+\]/,"")).appendTo(span);

					lastLastIndex = regex.lastIndex;
				}

				span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
				textNode.parentNode.replaceChild(span, textNode);
			}
		}
	}

	var jQ;
	filterId ? jQ = "a." + filterId : jQ = "a";
	var as = $(jQ);
	var i = as.length;
	var currA, hostNameSafe, hostID;
	while(i--) {
		currA = as[i];
		if (currA.href && /^https?:\/\//.test(currA.href) && gimmeHostName2(currA.href) != -1 && gimmeHostName2(currA.href) != gimmeHostName(window.location.host) && (!currA.className || currA.className == "processing_link" || currA.className == filterId)) {
			hostNameSafe = gimmeHostName2(currA.href).replace(/\./g, "_dot_").replace(/\-/g, "_dash_").toLowerCase();
			if (!hostsIDs[hostNameSafe]) {
				if (filterId) cLinksTotal--; currA.className = '';
				continue;
			} else {
				var ix = hostsIDs[hostNameSafe].length;
				while(ix--) {
					if (new RegExp(hostsIDs[hostNameSafe][ix].linkRegex).test(currA.href)) {
						currA.className = "processing_link";
						hostID = hostsIDs[hostNameSafe][ix].hostID;
						hostsCheck[hostID].links.push(currA);
						foundMirrors[hostID.substr(0,2)].push(hostID);
					}
				}
			}
		}
	}
}

function add_webshare_style()
{
	if (!(document.getElementsByTagName('WBSLCH')[0]))
	{
		var meta_not_to_add_more_style = document.createElement("WBSLCH");
		meta_not_to_add_more_style.setAttribute('content', 'webshare_links_checker');
		meta_not_to_add_more_style.setAttribute('name', 'description');
		document.getElementsByTagName('head')[0].appendChild(meta_not_to_add_more_style);

		GM_addStyle(
			".alive_link {background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;padding-right:17px;color:#29CF29 !important;}\
			.adead_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;padding-right:17px;color:#FF4719 !important;}\
			.processing_link {background:transparent url() no-repeat scroll 100% 50%;background-size:13px;padding-right:16px;}"
		);
	}
}

function gimmeHostName(link) {
    if (link.contains(/([\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4}))(?::\d+)?$/)) return link.match(/([\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4}))(?::\d+)?$/)[1];
    else {
        console.warn("gimmeHostName error.", link);
        return -1;
    }
}
function gimmeHostName2(link) {
	link = link.replace(/http:\/\/.*?\?http:\/\//, 'http://'); //anonymizers
    if (link.contains(/(?:https?:\/\/)?(?:www\.|[\w\.])*?[\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4})(?::\d+)?\//)) return link.match(/(?:https?:\/\/)?(?:www\.|[\w\.])*?([\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4}))(?::\d+)?\//)[1];
    else if (link.contains(".1fichier.com")) {
		return "1fichier.com";
	} else {
        console.warn("gimmeHostName error.", link);
        return -1;
    }
}

function uniqArray(array) {
	var uniqueArray = [];
	$.each(array, function(i, el){
	    if($.inArray(el, uniqueArray) === -1) uniqueArray.push(el);
	});
	return uniqueArray;
}

function genset(pref, def) {
	var val = preferences.general[pref];
	if (val == undefined) val = def;
	return val;
}

function lsSave() {
	localStorage.setItem("MLC_Preferences", JSON.stringify(preferences));
}

function setVariables()
{
	if (firstRun)
	{
		console.warn('First run, compiling preferences object...');
		preferences = {
			hosts: {},
			general: {}
		}

		localStorage.setItem("MLC_First_Run", false);
		lsSave();
	}

	ANONYMIZE_SERVICE = genset("Ref_anonymize_service", ANONYMIZERS[0]);
	ANONYMIZE_SERVICE = (ANONYMIZE_SERVICE != 'NoRed' ? ANONYMIZE_SERVICE : '');
}

function hostSet(key, def) {
	var val = preferences.hosts[key];
	if (val == undefined) val = !def;
	return val;
}

function lsSetVal(section, key, value) {
	preferences[section][key] = value;
	lsSave();
}
function delinkifySnapshot(snapshot)
{
	var n = snapshot.snapshotLength;
	while (n--)
	{
		thisLink = snapshot.snapshotItem(n);

		var spanElm = document.createElement("span");
		spanElm.className = thisLink.className;
		spanElm.innerHTML = thisLink.innerHTML;

		thisLink.parentNode.replaceChild(spanElm, thisLink);
	}
}

	function checkLinks(filterId)
	{
		start(filterId);
	}

	function check_all_links()
	{
		add_webshare_style();

		start(null);
	}

	setVariables();

	$(document).ready(check_all_links);

var hostsIDs = {};
var hostsCheck = {};
var foundMirrors = {
	BC: [],
}

function start(filterId)
{
	var redirectorTypes = {	"HTTP_302": 0,
							"INNER_LINK": 1};

	if (!filterId) {
		initBulkHosts();
	}

	linkify(filterId);

	foundMirrors.BC = uniqArray(foundMirrors.BC);
	var BCLength = foundMirrors.BC.length;
	if (BCLength > 0) {
		var hostID, links, y, corrLink, m, n;
		while(BCLength--) {
			hostID = foundMirrors.BC[BCLength];
			links = uniqArray(hostsCheck[hostID].links);
			if (filterId == null)
			{
				cLinksTotal += links.length;
			}
			y = links.length;
			while(y--) {
				corrLink = links[y].href;
				if (hostsCheck[hostID].corrMatch && hostsCheck[hostID].corrMatch.test(corrLink)) corrLink = corrLink.match(hostsCheck[hostID].corrMatch)[1]; //link match corrections
				if (hostsCheck[hostID].corrReplWhat && hostsCheck[hostID].corrReplWith) corrLink = corrLink.replace(hostsCheck[hostID].corrReplWhat, hostsCheck[hostID].corrReplWith); //link replace corrections
				links[y] = corrLink;
			}
			links = uniqArray(links);

			m = links.length;
			n = hostsCheck[hostID].blockSize;
			if (m > n) {
				for(var i = n; i < (Math.floor(m/n)+1)*n; i += n + 1)
				{
					links.splice(i, 0, RAND_STRING);
				}
			}

			var sep = hostsCheck[hostID].splitSeparator;

			hostsCheck[hostID].func.call({ 	links:			links.join(sep).replace(new RegExp(sep.replace(/\\/g, "\\") + RAND_STRING + sep.replace(/\\/g, "\\"), "g"), RAND_STRING).replace(new RegExp(RAND_STRING + "$"), "").split(RAND_STRING),
											apiUrl: 		hostsCheck[hostID].apiUrl,
											postData: 		hostsCheck[hostID].postData,
											resLinkRegex:	hostsCheck[hostID].resLinkRegex,
											resLiveRegex:	hostsCheck[hostID].resLiveRegex,
											resDeadRegex:	hostsCheck[hostID].resDeadRegex,
											resUnavaRegex: 	hostsCheck[hostID].resUnavaRegex,
											separator: 		sep
										});

			hostsCheck[hostID].links.length = 0;
		}
	}

	function DisplayTheCheckedLinks(links, resultStatus)
	{
		var $links = $('a[href*="' + links.join('"], a[href*="') + '"]');
				$links.removeClass().addClass(resultStatus);

		var hostname = gimmeHostName2($links[0].href);
		$links.each(function() {
			if (!this.href.contains('mega.co.nz')) this.href = $(this).attr("href");
		});

		switch(resultStatus)
		{
			case "alive_link":		cLinksAlive += $links.length;
									if (!filehostsAlive.contains(hostname)) filehostsAlive += hostname + ",";
									break;
			case "adead_link": 		cLinksDead += $links.length;
									if (!filehostsDead.contains(hostname)) filehostsDead += hostname + ",";
									break;
			default:
		}

		cLinksProcessed += $links.length;
	}

	function initBulkHosts()
	{
		var aHCount = 1;
		function addHost(hostName, linkRegex, blockSize, corrMatch, corrReplWhat, corrReplWith, splitSeparator,
							apiUrl, postData, resLinkRegex, resLiveRegex, resDeadRegex, resUnavaRegex, func)
		{
			hostName = hostName.split("|");
			var i = hostName.length;

			var hostID = "BC" + aHCount;

			while(i--) {
				var filehost = hostName[i].replace(/\./g, "_dot_").replace(/\-/g, "_dash_");
				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}

			var BCObj = {
				blockSize: 50,
				corrMatch: corrMatch,
				corrReplWhat: corrReplWhat,
				corrReplWith: corrReplWith,
				splitSeparator: '\r\n',
				apiUrl: apiUrl,
				postData: postData,
				resLinkRegex: resLinkRegex,
				resLiveRegex: resLiveRegex,
				resDeadRegex: resDeadRegex,
				resUnavaRegex: resUnavaRegex,
				func: genBulkCheck,
				links: []
			}

			if (blockSize != null) {
				BCObj.blockSize = blockSize;
			}
			if (splitSeparator != null) {
				BCObj.splitSeparator = splitSeparator;
			}
			if (func != null) {
				BCObj.func = func;
			}

			hostsCheck[hostID] = BCObj;
			aHCount++;
		}

		var genType1 = [];


		var genType2 = [];

		//xfilesharing 1.0
		function addGenericType1()
		{
			var i = genType1.length;

			while(i--)
			{
				var host = genType1[i].host;
				var apiUrl = genType1[i].apiurl;

				if (apiUrl == "default") apiUrl = "http://www." + host + "/checkfiles.html";

				if (hostSet("Check_" + host.replace(/\./g, "_dot_").replace(/-/g, "_dash_") + "_links", false))
				{
					var regexSafe = host.replace(/\./g, "\\.").replace(/-/g, "\\-");

					addHost(
						host, //hostname
						regexSafe + "\/\\w+", //linkregex
						null, //blocksize
						new RegExp("(https?:\/\/(?:|www\\.)" + regexSafe + "\/\\w+)",""), //corrmatch
						null, //corrreplwhat
						null, //corrreplwith
						null, //separator
						apiUrl, //api url
						"op=checkfiles&process=Check+URLs&list=", //postdata
						new RegExp("(" + regexSafe + "\/\\w+)",""), //linkregex
						new RegExp("<font color='green'>https?:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //liveregex
						new RegExp("<font color='red'>https?:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //deadregex
						new RegExp("<font color='orange'>https?:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //unavaregex
						null //function delegate
					)
				}
			}
		}

		//xfilesharing 2.0
		function addGenericType2()
		{
			var i = genType2.length;

			while(i--)
			{
				var host = genType2[i].host;
				var apiUrl = genType2[i].apiurl;
				if (hostSet("Check_" + host.replace(/\./g, "_dot_").replace(/-/g, "_dash_") + "_links", false))
				{
					var regexSafe = host.replace(/\./g, "\\.").replace(/-/g, "\\-");
					addHost(
						host, //hostname
						"https?:\/\/(?:www\\.|file\\.)?" + regexSafe + "\/\\w+", //linkregex
						null, //blocksize
						new RegExp("(https?:\/\/(?:|www\\.)" + regexSafe + "\/\\w+)",""), //corrmatch
						null, //corrreplwhat
						null, //corrreplwith
						null, //separator
						apiUrl, //api url
						"op=checkfiles&process=Check+URLs&list=", //postdata
						new RegExp("(" + regexSafe + "\/\\w+)",""), //linkregex
						new RegExp(regexSafe + "\/\\w+.*?\\s*<\/td>\\s*<td style=\"color:(?:green|#33FF33);","g"), //liveregex
						new RegExp(regexSafe + "\/\\w+.*?\\s*<\/td>\\s*<td style=\"color:(?:red|#FF4719);","g"), //deadregex
						null //function delegate
					)
				}
			}
		}
		addGenericType1();
		addGenericType2();

		if (hostSet("Check_webshare_dot_cz_links", false))
		{
			addHost(
				"webshare.cz", //hostname
				"webshare\\.cz\/(?:(?:#/)?file/\\w+|\\w+-.*)", //linkregex
				100000, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null, //api url
				null, //postdata
				null, //linkregex
				null, //liveregex
				null, //deadregex
        null,
				webshareBulkCheck //function delegate
			)
		}

      if (hostSet("Check_mega_dot_co_dot_nz_links", false))
		{
			addHost(
				"mega.co.nz",
				"mega\\.co\\.nz\/#!\\w+",
				100000, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null,
				null,
				null,
				null,
				null,
				null,
				megaBulkCheck //function delegate
			)
		}

		function genBulkCheck()
		{
			var blockIdx = this.links.length;
			while (blockIdx--)
			{
				postRequest(this.apiUrl, this.postData, this.links[blockIdx],
					this.resLinkRegex, this.resLiveRegex, this.resDeadRegex, this.separator);
			}
			function postRequest(api, postData, links, linkRegex, liveRegex, deadRegex, sep)
			{
				GM_xmlhttpRequest(
				{
					method: 'POST',
					url: api,
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': api,
						'X-Requested-With': 'XMLHttpRequest'
					},
					data: postData + encodeURIComponent(links),
					onload: function (result)
					{
						var res = result.responseText;
						var i;
						var livelinks = res.match(liveRegex);
						var deadlinks = res.match(deadRegex);

						if (livelinks != null)
						{
							i = livelinks.length - 1;
							do
							{
								livelinks[i] = livelinks[i].match(linkRegex)[1];
							}
							while (i--);
							DisplayTheCheckedLinks(livelinks, 'alive_link');
						}

						if (deadlinks != null)
						{
							i = deadlinks.length - 1;
							do
							{
								deadlinks[i] = deadlinks[i].match(linkRegex)[1];
							}
							while (i--);
							DisplayTheCheckedLinks(deadlinks, 'adead_link');
						}
					},
				});

			}
		}
		function webshareBulkCheck()
		{
			var arr = this.links[0].split('\r\n');
			var i = arr.length;

			while(i--)
			{
				postRequest(arr[i]);
			}
			function postRequest(wsLink) {
				var id = wsLink.match(/webshare\.cz\/(?:(?:#\/)?file\/)?(\w+)/)[1];

				GM_xmlhttpRequest({
					method: 'POST',
					url: "http://webshare.cz/api/file_info/",
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': "",
					},
					data: "wst=&ident=" + id,
					onload: function (result) {
						var res = result.responseText;

						if (res.contains(/<name>.+?<\/name>/))
						{
							DisplayTheCheckedLinks([id], 'alive_link');
						}
						else
						{
							DisplayTheCheckedLinks([id], 'adead_link');
						}
					}
				});
			}
		}

		function megaBulkCheck()
		{
			var arr = this.links[0].split("\r\n");
			var i = arr.length;
			var seqno = Math.floor(Math.random()*1000000000);

			while(i--)
			{
				postRequest(arr[i]);
			}

			function postRequest(megaLink)
			{
				var id = megaLink.match(/mega\.co\.nz\/#!(\w+)(?:!\w+)?/)[1];

				GM_xmlhttpRequest(
				{
					method: "POST",
					url: 'https://g.api.mega.co.nz/cs?id=' + seqno++,
					data: '[{"a":"g","p":"' + id + '","ssl": "1"}]',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-Type': 'application/xml',
						'Referer': "https://mega.co.nz/"
					},
					onload: function (result)
					{
						var res = $.parseJSON(result.responseText.match(/\[(.+?)\]/)[1]);

						if ((typeof res == "number" && (res == -9 || res == -16 || res == -6)) || res.d) {
							DisplayTheCheckedLinks([id], 'adead_link');
						} else if (res.e == "ETEMPUNAVAIL") {
										DisplayTheCheckedLinks([id], 'unava_link');
						} else if (res.at) {
							DisplayTheCheckedLinks([id], 'alive_link');
						} else {
							console.warn("Error in checking Mega.co.nz! Please notify devs.\r\nError code: " + result.responseText);
						}
					}
				});
			}
		}

	}
}
}
})();