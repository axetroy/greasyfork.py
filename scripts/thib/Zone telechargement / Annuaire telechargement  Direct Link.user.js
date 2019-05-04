// ==UserScript==
// @name         Zone telechargement / Annuaire telechargement  Direct Link
// @name:en      Zone telechargement / Annuaire telechargement  Direct Link
// @namespace    https://www.zone-telechargement1.com/
// @version      2.050
// @description  Show direct link (Uptobox,Uploaded,1fichier ...) on Zone-Telechargement and avoid dl-protect!
// @description:en  Show direct link (Uptobox,Uploaded,1fichier ...) on Zone-Telechargement and avoid dl-protect!
// @author       Thibault
// @icon https://www.annuaire-telechargement.com/templates/Default/images/favicon.ico
// @include /http(|s)://(|(|w|v)*\.)annuaire-telechargement.com/
// @include /http(|s)://(|www\.)zone\-telechargement1\.com/.*/
// @include /http(|s)://(|(|w|0|1|2|3|4|5|6|7|8|9)*w(|w|0|1|2|3|4|5|6|7|8|9)*\.)zone\-telechargement(||1|2|3|4|5|6|7|8|9).(|ws|com|org)/.*/
// @include /http(|s)://(|(|w|0|1|2|3|4|5|6|7|8|9)*w(|w|0|1|2|3|4|5|6|7|8|9)*\.)annuaire-telechargement.(|ws|com|org)/.*/
// @require      http://code.jquery.com/jquery-latest.js
// @grant       none
// ==/UserScript==

(function() {
    $(document).ready(function() {
     function replaceArray (string, find, replace, bAddSpace)
        {
            replaceString = string;

            for (var i = 0; i < find.length; i++)
            {
                replaceString = replaceString.replace(new RegExp(find[i], 'g'), replace[i]);
            }

            if (bAddSpace)
            {
                string = replaceString;
                replaceString ="";
                for (var z = 0; z < string.length; z++)
                {
                    replaceString += string.charAt(z);
                    if (z%2 == 1)
                    {
                        replaceString += " ";
                    }
                }
                return replaceString;
            }
            else
            {
                return replaceString.replace(/\s+/g, '');
            }
        }
        
        var findSpecialChar = ["062","063","064","066","067"];
        var replaceSpecialChar = [": ",". ","? ","- " ,"/ "]

        var find = ["0036","0037","0038","0039","0040","0041","0042","0043","0044","0045","0046","0047","0048","0049","0050","0051","0052","0053","0054","0055","0056","0057","0058","0059","0060","0061","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","0f","0l","0r","0k","0z","0x","0h","0o","0m","0n","00"];
        var replace =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",""];


        $(".postinfo a").each(function (i)
        {
            var $originalLink = $(this).attr("href");
            var $pathname = this.pathname.substring(1);
            
            $pathname = replaceArray( replaceArray($pathname , findSpecialChar, replaceSpecialChar, true), find, replace, false);
            /*
            //uptobox //        123455600123455602123455610123455615
            if ($pathname.indexOf("123455600123455602123455610123455615") >=0 )
            {
                $pathname = "http://uptobox.com"+$pathname.replace("123455600123455602123455610123455615","");
            }

            if ($pathname.indexOf("123455601123455602123455610123455615") >=0 )
            {
                $pathname = "http://uptobox.com"+$pathname.replace("123455601123455602123455610123455615","");
            }

            //uploaded 123455600123455605123455615
            if ($pathname.indexOf("123455600123455605123455615") >=0 )
            {
                $pathname = "http://ul.to"+$pathname.replace("123455600123455605123455615","");
            }

            //turbobit // 123455600123455607123455611123455615
            if ($pathname.indexOf("123455600123455607123455611123455615") >=0 )
            {
                $pathname = "http://turbobit.net"+$pathname.replace("123455600123455607123455611123455615","");
            }

            //1fichier //123455601123455603123455610123455615123455617
            if ($pathname.indexOf("123455601123455603123455610123455615123455617") >=0 )
            {
                $pathname = "http://1fichier.com"+$pathname.replace("123455601123455603123455610123455615123455617","?");
            }

            //uplea 123455600123455609123455610123455615dl123455615
            if ($pathname.indexOf("123455600123455609123455610123455615dl123455615") >=0 )
            {
                $pathname = "http://uplea.com/dl"+$pathname.replace("123455600123455609123455610123455615dl123455615","");
            }

            //rapidgator // 123455600123455606123455611123455615file
            if ($pathname.indexOf("file123455615") >=0 )
            {
                $pathname = "http://rapidgator.net/file/"+$pathname.split("file123455615").pop();
                $pathname = $pathname.replace("123455615","/");
            }

            //Nitroflare //123455600123455608123455610123455615view123455615
            if ($pathname.indexOf("123455600123455608123455610123455615view123455615") >=0 )
            {
                $pathname = "http://nitroflare.com"+$pathname.replace("123455600123455608123455610123455615view123455615","view/");
                $pathname = $pathname.replace("123455615","/");
            }

            //Streaming //123455600123455609123455610123455615
            if ($pathname.indexOf("123455600123455609123455610123455615") >=0 )
            {
                $pathname = "http://streaming.zone-telechargement1.com"+$pathname.replace("123455600123455609123455610123455615","");
            }*/
            
            var $value = $(this).html();
            if ($value.indexOf("Episode") >= 0)
            {
                $value = $value+" : ";
            }
            else
            {
                $value = "";
            }
            
            $(this).attr("href", $pathname).html($value+$pathname);
            $("<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>").insertBefore($(this));
            $("<b>&nbsp;&nbsp;&nbsp;<a target='_blank' href="+$originalLink+">Original Link</a></b>").insertAfter($(this));
            
         });
 $("div.corps > center:eq(1) strong:last").next().after('<strong><a href="http://www.allocine.fr/recherche/?q='+escape($($('div.corps div')[2]).text())+'" target="_blank"><u><span class="selection_index"></span>Allocine</u> :  Lien</a></strong><br/>');
  
    });
})();
