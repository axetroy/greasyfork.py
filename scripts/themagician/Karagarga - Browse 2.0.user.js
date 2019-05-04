// ==UserScript==
// @author         themagician@karagarga 
// @version        1.5
// @name           Karagarga - Browse 2.0
// @namespace      Karagarga
// @description    New design for Karagarga browse
// @include        /^http[s]?:\/\/(www\.)?karagarga.in\/(?:browse|bookmarks)\.php(?:.*)$/
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant          GM_addStyle
// ==/UserScript==           

// http://stackoverflow.com/a/646643/110397
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}              

jQuery(document).ready(function() {

GM_addStyle("span { font-size: 100% !important; } \
             #browse { font-family: tahoma, helvetica, sans-serif !important; }");
             
var earth_flag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE8SURBVDhPY2C0XoYVMVgthSM0KTjCopnBcimD4UJWu+UMRouACMQwXAgURFMGROiagYqYbJaVTzvvlLunf+X1vuXXHXP3ALlAQUz9GJoNFmb3nmZQni0TsB6IZMEkg8pskKDBQnTFKByLJRK+6yqmn3fO27t894OiSWcLJ50FMoDcimnngVJABSjqUTjGi1I7TobXHXHI2cPnuiq982TX0ms8zquA3Ii6I0ApoAIU9Sgc40WR9UcZNOct2n5v0+EnVTMuVE6/AGQAuUBBkBR+zXCbeVxWlU45N3XtLS6nlQ7ZxNgM9LMP0M8XgEG948SzuKZjsU3HgAwgF+RnH7x+BvFhoS0buF4heCMQAQMcyCUc2iA+LJ6B0du34nrv8utAa4mNZyACKoKlsIVAREIKgyN4wgYiNCkosl4GAIF6GZRdhZ5eAAAAAElFTkSuQmCC";            

var _start = Date.now();

var browseTbl = jQuery("#browse");
    browseTbl.attr("width", "100%").css("margin", "0 auto");

// get the header
var header = browseTbl.find("tr").first();

var hdr_dir = header.children("td:nth-child(3)").detach();
    hdr_dir.find("a").text("Director / Artist");
    hdr_dir.append("<span> - </span>");
    
var hdr_yr = header.children("td:nth-child(3)").detach();
    hdr_yr.find("a").text("Year");
    hdr_yr.prepend("<span> - </span>");  
    
var hdr_genres = header.children("td:nth-child(3)").detach();
    hdr_genres.find("a").css("float", "right");

// append director, year and genres to title column
header.children("td:nth-child(2)")
      .css("width", "650px")
      .prepend(hdr_dir.html())
      .append(hdr_yr.html())
      .append(hdr_genres.html());
if(hdr_dir.attr("id") == "sorted" || hdr_yr.attr("id") == "sorted" || hdr_genres.attr("id") == "sorted") { header.find("td:nth-child(2)").attr("id", "sorted"); }

var hdr_flag = header.children("td:nth-child(3)");
    hdr_flag.css("width", "50px"); 

// comments
var hdr_comm = header.children("td:nth-child(4)").detach();
var hdr_comm_new = '<td align="left" id="' + hdr_comm.attr("id") + '" class="colhead" style="width: 40px; text-align: center;">'
                 + '<a title="click to sort by number of comments" href="' + hdr_comm.find("a").first().attr("href") + '" class="panel">Comm.</a></td>';

// uploader
var hdr_upper = header.children("td:nth-child(4)").detach();
    hdr_upper.css("width", "120px").text("Uploader");

// added
var hdr_date = header.children("td:nth-child(4)").detach();
    hdr_upper.append(" - ").append(hdr_date.html());
    if(hdr_date.attr("id") == "sorted") { hdr_upper.attr("id", "sorted"); }
    
// filelist
var hdr_files = header.children("td:nth-child(4)").detach();

// filesize
// add filelist to filesize column
var hdr_size = header.children("td:nth-child(4)").detach();
    hdr_size.css("width", "70px").css("text-align", "center").append(" - " + hdr_files.html());
if(hdr_files.attr("id") == "sorted") { hdr_size.attr("id", "sorted"); }
    
// snatches
var hdr_snatch = header.children("td:nth-child(4)").detach();
    hdr_snatch.find("a").text("Snatched");
    hdr_snatch.css("width", "50px");

// seeders
var hdr_seed = header.children("td:nth-child(4)").detach();
    hdr_seed.find("a").text("S");
    hdr_seed.css("width", "50px").append(" / ");

// leechers
var hdr_leech = header.children("td:nth-child(4)").detach();
    hdr_leech.find("a").text("L");
    hdr_leech.css("width", "50px");
    if(hdr_leech.attr("id") == "sorted") { hdr_seed.attr("id", "sorted"); }
    
// add leechers to seeders column    
hdr_seed.append(hdr_leech.html());

// like button
var hdr_like = header.children("td:nth-child(4)").detach();
    hdr_like.css("width", "40px"); 
    
header.append(hdr_comm_new)
      .append(hdr_size)
      .append(hdr_snatch)
      .append(hdr_seed)
      .append(hdr_upper)
      .append(hdr_like); 
      
// Flags
var flag_root_url = "https://karagarga.in/pic/flag/";
var flags = {
    // popular countries (as per advanced search)
    "english": "uk.gif", "eng": "uk.gif", "en": "uk.gif",
    "ja": "japan.gif", 
    "fr": "france.gif", "francais": "france.gif", "fre": "france.gif",  
    "de": "germany.gif", "ger": "germany.gif",
    "ita": "italy.gif", "it": "italy.gif", 
    "espanol": "spain.gif", "esp": "spain.gif", "es": "spain.gif", "spa": "spain.gif",
    "castellano": "spain.gif", 
    "zh": "china.gif", "simplified zh": "china.gif", "traditional zh": "china.gif",
    "cht": "china.gif", 
    "mandarin": "china.gif", "cantonese": "china.gif",   
    "ko": "southkorea.gif", "kor": "southkorea.gif",
    "ru": "russia.gif",
    // nordic europe
    "fi": "finland.gif", "fin": "finland.gif",
    "sv": "sweden.gif", "swe": "sweden.gif",
    "no": "norway.gif", "nor": "norway.gif",
    "da": "denmark.gif", "dan": "denmark.gif",
    "is": "iceland.gif", "ice": "iceland.gif",
    // central europe
    "pl": "poland.gif", "pol": "poland.gif",
    "cs": "czechrep.gif", "cze": "czechrep.gif",
    "sk": "slovakia.gif",
    "sl": "slovenia.gif", "slv": "slovenia.gif",
    "hu": "hungary.gif", "hun": "hungary.gif",
    // rest of europe
    "pt": "portugal.gif", "por": "portugal.gif",
    "et": "estonia.gif", "est": "estonia.gif",
    "lv": "latvia.gif",
    "lt": "lithuania.gif",
    "ro": "romania.gif", "rom": "romania.gif",
    "tr": "turkey.gif", "tur": "turkey.gif", "turkce": "turkey.gif",
    "sr": "serbia.gif", "srp": "serbia.gif",
    "el": "greece.gif",
    "uk": "ukraine.gif",
    "hr": "croatia.gif", "hrv": "croatia.gif",
    "bosnian": "bosniaherzegovina.gif",
    "mk": "macedonia.gif",
    "bg": "bulgaria.gif",
    "nl": "netherlands.gif", "dut": "netherlands.gif",
    "sq": "albania.gif",
    "gl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAANCAIAAADE7sJwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGfSURBVChTY2CYfpphxmmOOWenXHn5//+//0QDBpGFFximngTp7z9mveH6nY8/oDL////48RXKwgYYdj/+aLr+GsO0UyA05aTA/AtTr756/fXrt+/vD53Y+v3Xl79//0DVogIGIH7+9Wf5icdss8+CLAfqn3Uhe/WmY5MzNtZ6nFlc+e7VbYhSNADSCQT//v3b+/ST5sorDBOOM8y8qNY6c3GS3O4AtuONVv//YXczVCcEfPn1J2n/A4bJp/hqtkrHL3ZK61fLXr393FOoNCpA0QkBW599Nu7Ywxm5NaxlF2/8FrnOvWsefoDKIQEsOoFg4aaz2okdNd2BmqkLeRu3AV0Rtvvup58oQYVd55Kdl5jCtqfV2rPH7OJo280w8wzDxBMKyy5te/T+z19onGPX+eDVt8gJpwo6c+Nn3UjYe5dh1hmGqaeAiHnWmYKjjx5+/glUg10nEHz49PH6vQf/f//8+e//3BuvxRddYJh8gmE6KNr111zd9OA9Tp1o4NHnn25bbjH0HQeltimnBBecJ1YnBMy78Zp37jmQ5umnAVKWY4YHL+cwAAAAAElFTkSuQmCC",
    "gallegan": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAANCAIAAADE7sJwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGfSURBVChTY2CYfpphxmmOOWenXHn5//+//0QDBpGFFximngTp7z9mveH6nY8/oDL////48RXKwgYYdj/+aLr+GsO0UyA05aTA/AtTr756/fXrt+/vD53Y+v3Xl79//0DVogIGIH7+9Wf5icdss8+CLAfqn3Uhe/WmY5MzNtZ6nFlc+e7VbYhSNADSCQT//v3b+/ST5sorDBOOM8y8qNY6c3GS3O4AtuONVv//YXczVCcEfPn1J2n/A4bJp/hqtkrHL3ZK61fLXr393FOoNCpA0QkBW599Nu7Ywxm5NaxlF2/8FrnOvWsefoDKIQEsOoFg4aaz2okdNd2BmqkLeRu3AV0Rtvvup58oQYVd55Kdl5jCtqfV2rPH7OJo280w8wzDxBMKyy5te/T+z19onGPX+eDVt8gJpwo6c+Nn3UjYe5dh1hmGqaeAiHnWmYKjjx5+/glUg10nEHz49PH6vQf/f//8+e//3BuvxRddYJh8gmE6KNr111zd9OA9Tp1o4NHnn25bbjH0HQeltimnBBecJ1YnBMy78Zp37jmQ5umnAVKWY4YHL+cwAAAAAElFTkSuQmCC",
    "ka": "georgia.gif",
    "ca": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAANCAIAAADE7sJwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABGSURBVChTY/j3mp08xPAiTYg8xHCDU4o8xPD/Pyt5iOGRuyh5iOGuhgR5iALXoplEPKLAn2huIB5REJ9oKYN4RG66fc0OAOH0b18By5cOAAAAAElFTkSuQmCC",
    // south america
    "brazilian": "brazil.gif",
    // 
    "ar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAANCAIAAADE7sJwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGDSURBVChTY2RIMmYgCzBBaUzw9zfD7x8Mf/9AuRgAm87//xl+fjEQVssyDNHhVwCyQSIYgJnBUArKhID//xh+/Ug2Dg3XNLz25mKMvrMIj+z5J5cYmJkZGBmhasAA1Z9As79+XBM3sfdo1/EnzxjYRXjY/mrzspfZVgYvymPg4QephwFUnb9/huq6///59B4DKz87j5KIxPNP7158fq3w/x8zh/TqyzsZWNmhKtH9+f+fCq/EpVf3Agyd2FmY+bl4VcVkYyz8Lr++CxQHeQQJoOpkYrr55pGSkKSHjjkbC/umC4c+fP9qoqCmKCh98/UjoCxUGRig+fMfw59/x9Jmuc4LXFu0VFtW/8qj8yF9cbuT11nNSmNgYWJgRGjGSAl/fknxiK+Nbd96d+fB8wftDB18lN2CF1c++/KSgYUNqgYMMGKFifnzlzff/v3m+8IpKaXC+O7frsdnjt8/zcDGCVUAAzhSHzD1wMMD6EJWDigbCWBLQ0AAVMrGBUXYtDEwMAAAcGmGzrGg1aYAAAAASUVORK5CYII=",
    "fa": "iran.gif",
    "iw": "israel.gif", "heb": "israel.gif",
    //
    "ms": "malaysia.gif",
    "in": "indonesia.gif",
    //
    "hi": "india.gif"
};   
var flag_names = {
    "english": "english", "eng": "english", "en": "english",
    "ja": "japanese", 
    "fr": "french", "francais": "french", "fre": "french",   
    "de": "german", "ger": "german",
    "ita": "italian", "it": "italian", 
    "espanol": "spanish", "esp": "spanish", "es": "spanish", "spa": "spanish",
    "castellano": "spanish", 
    "zh": "chinese", "simplified zh": "simplified chinese", 
    "traditional zh": "traditional chinese", "mandarin": "mandarin",
    "cht": "traditional chinese", 
    "cantonese": "cantonese",   
    "ko": "korean", "kor": "korean",
    "ru": "russian",
    // nordic europe
    "fi": "finnish", "fin": "finnish",
    "sv": "swedish", "swe": "swedish",
    "no": "norwegian", "nor": "norwegian",
    "da": "danish", "dan": "danish",
    "is": "icelandic", "ice": "icelandic",
    // central europe
    "pl": "polish", "pol": "polish",
    "cs": "czech", "cze": "czech",
    "sk": "slovakian",
    "sl": "slovenian", "slv": "slovenian",
    "hu": "hungarian", "hun": "hungarian",
    // rest of europe
    "pt": "portuguese", "por": "portuguese",
    "et": "estonian", "est": "estonian",
    "lv": "latvian",
    "el": "greek",
    "tr": "turkish", "tur": "turkish", "turkce": "turkish",
    "ro": "romanian", "rom": "romanian",
    "nl": "dutch", "dut": "dutch",
    "lt": "lithuanian",
    "sr": "serbian", "srp": "serbian",
    "uk": "ukrainian",
    "hr": "croatian", "hrv": "croatian",
    "bosnian": "bosnian",
    "mk": "macedonian",
    "bg": "bulgarian",
    "sq": "albanian",
    "gl": "galician",
    "gallegan": "galician",
    "ka": "georgian",
    "ca": "catalan",
    // south america
    "brazilian": "brazilian",
    //
    "ar": "arabic",
    "fa": "persian",
    "iw": "hebrew", "heb": "hebrew",
    //
    "ms": "malay",
    "in": "indonesian",
    //
    "hi": "hindi"
};   

//
// Given str and country (e.g. uk)
// Checks if uk is in str so that the characters before and after it
// are not a-zA-Z, but they can be commas or spaces, etc.
function country_match(str, country) {
    function is_valid_(str_, country_, idx_) {
        if(idx_ === -1) {
            return false;
        }
        
        if(str_ === country_) {
            return true;
        }
        
        // check next character
        if(country_.length + idx_ < str_.length) {
            var next = str_.charAt(country_.length + idx_);
            if(next.match(/([a-zA-Z]){1}/)) {
                return false;
            }
        }
        
        // check previous character
        if(idx_ > 0) {
            var prev = str_.charAt(idx_ - 1);
            if(prev.match(/([a-zA-Z]){1}/)) {
                return false;
            }
        }
        
        return true;
    }
    
    for(var idx = 0; idx !== -1;) {
        var idx = str.indexOf(country);
        if(is_valid_(str, country, idx)) {
            return idx;
        }
        str = str.substr(idx+1);
    }
        
    return -1;
}   
      
var torrents = browseTbl.find("tr");

// skip the first header row
for(var i = 1; i < torrents.length; i++)
{
    // skip odd rows
    if(i % 2 == 0) { continue; }
    
    var t = jQuery(torrents[i]);
    
    // title column
    var second = t.children("td:nth-child(2)");
    
    // title link
    var title = second.find("span").first().detach();
    
    // subs
    var subs = second.children("span").detach();
    
    // ajax button
    var show_ajax = second.find("span").last().detach();
    
    // buttons
    var btns = second.find("div").find("span").detach();
    btns.css({position: "absolute", right: 0, top: 0});
        
    
    // director
    var dir = t.children("td:nth-child(3)").detach();
    var dir_txt = jQuery("<span />").text("By ").append(dir.find("a"));
    
    // Flags 
    // TODO: does not recognize en full? https://karagarga.in/details.php?id=28452
    // does not recognize "improved en": https://karagarga.in/details.php?id=52561
    // does not recognize espanol https://karagarga.in/details.php?id=29209
    // "srt" disappears: https://karagarga.in/details.php?id=15403
    // does not recognize "en with xxx": https://karagarga.in/details.php?id=1225   
    if(subs.length && subs.text().startsWith("Subs:")) {
        var sub_txt = subs.text().toLowerCase();
        var new_txt = sub_txt.substr(6);
        var split = new_txt.split(/[\.,&]|and/);
        var used = [];
        jQuery.each(flags, function(name, url) {
            for(var i = 0; i < split.length; ++i) {
                var str = split[i].trim();
                // check if no subs
                if(str.match(/no need/gi) || str.match(/no.*sub/gi)) {
                    continue;
                }
                // if a film has subtitles that are EXACTLY the same, do nothing
                // but if we have e.g. en, en cc, en autotranslated, *en, etc.
                // those are all unique and WILL be listed separately
                if(used.indexOf(str) > -1) {
                    split.splice(i, 1);
                    continue;
                }
                var is_pot = str.indexOf("\u2605") > -1;
                // remove non-ascii characters, like the star (pot) character
                str = str.replace(/[^\x00-\x7F]/g, "");
                str = str.trim();
                // check if the flag name matches the beginning of the string
                var idx;
                if((idx = country_match(str, name)) === 0) {
                    // stuff after the country code
                    var rest = str.substr(name.length + 1);
                    var $img = jQuery("<img />").css("marginLeft", "5px");
                    if(url.indexOf(".gif") > -1) {
                        $img.attr("src", flag_root_url + url).css("width", "20px");
                    }
                    else {
                        $img.attr("src", url);
                    }
                    
                    var s = "";
                    if(is_pot) {
                        s = "\u2605 ";
                    } 
                    if(rest.length > 0) {
                        s += flag_names[name] + " (" + rest + ")";
                    }
                    else {
                        s += flag_names[name];
                    }
                    $img.attr("title", s);
                    dir_txt.append($img);
                    used.push(split[i].trim());
                    split.splice(i, 1);
                    // Otherwise it can skip over an entry with the same name
                    --i;
                }
            }
        });
        
        // Put the rest we could not identify in Earth flag
        var rest = split.join(",");
        // Skip if it contains only things like spaces and commas
        if(rest.length > 0 && rest.match(/\w+/)) {
            var $subs = jQuery("<img />").css("marginLeft", "6px").height("13px").attr("src", earth_flag).attr("title", rest);
            dir_txt.append($subs);
        }
    }                                
    
    // year
    var year = t.children("td:nth-child(3)").detach()
                .find("a").prepend(" [").append("]");
        
    // append year to title span element
    title.css({display: "block", marginRight: "50px"}).append(year);  
    
    // genres
    var genres = t.children("td:nth-child(3)").detach();
        genres.find("br").remove();
                           
    second.html("").css("position", "relative");
    
    var topline = jQuery("<div />").css("position", "relative")
                                   .append(title)
                                   .append(btns);
    var bottomline = jQuery("<div />").css({position: "relative", marginTop: "2px"})
                                      .append(dir_txt)                                                                     
                                      .append('<span class="genre_cont" style="position: absolute; right: 0">' + genres.html() + '</span>');
    second.append(topline).append(bottomline);                                
    
    // comments
    var comm = t.children("td:nth-child(4)").detach();
    var comm_link = comm.find("a").first();
    var comm_new = '<td align="center">' + (parseInt(comm_link.text()) > 0 ? ('<a href="' + comm_link.attr("href") + '">' + comm_link.text() + '</a>') : '0') + '</td>';
    
    // upper
    var upper = t.children("td:nth-child(4)").detach();
    
    // date
    var added = t.children("td:nth-child(4)").detach();
    
    // replace &nbsp; with space
    var dates = added.text().replace(/\xA0/g,' ').split(" ");
    
    if(dates.length == 3)
    {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        var date_obj = new Date(dates[2].replace("'", "20"), months.indexOf(dates[0]), dates[1]);        
    }
    
    upper.append('<br><span style="color:gray">' + date_obj.toLocaleDateString() + "</span>");
    
    // filelist
    var filelist = t.children("td:nth-child(4)").detach(); 
    
    // filesize
    var filesize = t.children("td:nth-child(4)").detach();
    
    filesize.css("text-align", "center").append("<br><span>in " + filelist.html() + (filelist.text() == 1 ? " file" : " files") + "</span>");
    
    // snatched
    var snatched = t.children("td:nth-child(4)").detach();
    
    // seeders
    var seeders = t.children("td:nth-child(4)").detach();
    
    // leechers
    var leechers = t.children("td:nth-child(4)").detach();
    
    seeders.append(" / " + leechers.html());
    
    // like button
    var likebtn = t.children("td:nth-child(4)").detach();
    
    t.append(comm_new)
     .append(filesize)
     .append(snatched)
     .append(seeders)
     .append(upper)
     .append(likebtn);
}                             
});