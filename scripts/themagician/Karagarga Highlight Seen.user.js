// ==UserScript==
// @author themagician@karagarga
// @name        Karagarga Highlight Seen
// @namespace   Karagarga
// @description Highlights seen entries in Browse based on IMDb ratings CSV
// @include     *karagarga.in/browse.php* 
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.71/jquery.csv-0.71.min.js 
// @version     1.1
// @grant   GM_addStyle
// @grant   GM_getValue
// @grant   GM_setValue
// @grant   GM_registerMenuCommand
// ==/UserScript==

//
// [1.1] bugfix: IMDb CSV format changed
// 

function isLocalFileSupported() {
    return window.File && window.FileReader && window.FileList;
}

var Ratings = {
    ratings: [],
    load: function() {
        var tmp_ratings = GM_getValue("imdb_ratings");
        if(tmp_ratings !== undefined) {
            this.ratings = eval(tmp_ratings);
        }
    },
    save: function() {
        GM_setValue("imdb_ratings", uneval(this.ratings));
    },
    contains: function(value) {
        return this.ratings.indexOf(value) !== -1;    
    }
};

var Highlighter = {
    imdbRx: new RegExp("(tt[0-9]{7})", "g"),
    filterImdb: function() {
        return Highlighter.imdbRx.test(jQuery(this).attr("href"));
    },
    filterRows: function() { 
        return jQuery(this).find("a").filter(Highlighter.filterImdb).length > 0;
    },
    markSeen: function() {
        $t = jQuery(this);
        $t.removeClass("seenrow");
        $imdb_elem = $t.find("a").filter(Highlighter.filterImdb).first();
        if($imdb_elem.length > 0) {
            var imdb_id = $imdb_elem.attr("href").match(Highlighter.imdbRx)[0];
            var seen = Ratings.contains(imdb_id);
            if(seen) {
                $t.addClass("seenrow");
            }
        }
    },
    highlightSeen: function() {
        jQuery("#browse").find("tr").filter(Highlighter.filterRows).each(Highlighter.markSeen);
    }
};

var App = {
    handleFileSelect: function (evt) {
        var files = evt.target.files;
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function(event){
            var csv = event.target.result;
            var csv_lines = csv.split("\n");
            var imdbids = [];
            for(var i = 1; i < csv_lines.length; ++i) {
                try {
                    var data = jQuery.csv.toArray(csv_lines[i]);
                    imdbids.push(data[0]);
                }
                catch(e) {
                    console.log("Exception: " + e)
                }
            } 
            
            Ratings.ratings = imdbids;
            Ratings.save();
            Highlighter.highlightSeen();
            App.hideUpdater();
        }
        
        reader.readAsText(file);        
    },
    hideUpdater: function() {
        jQuery("#showfileupdateimdbratings").hide();
    },
    showUpdater: function() {
        jQuery("#showfileupdateimdbratings").show();
    },
    run: function() {
        if(!isLocalFileSupported()) {
            window.alert('Local file reading is not supported!\nUpdate browser or disable script.');
            return;
        }
        
        GM_addStyle(".seenrow { background-color: #58D68D !important; } #showfileupdateimdbratings { display: none; margin-top: 10px; margin-bottom: -15px; }");
        
        jQuery("body > div:nth-child(4) > nobr:nth-child(1)")   
            .after('<div id="showfileupdateimdbratings"><span>IMDb ratings CSV: </span><input type="file" id="fileupdateimdbratings" name="files[]" size="45"></div>');
            
        jQuery("#showupdateimdbratings").on("click", App.showUpdater);        
            
        jQuery("#fileupdateimdbratings").on("change", App.handleFileSelect);
    
        Ratings.load();
        Highlighter.highlightSeen();    
    }
};     

GM_registerMenuCommand("Update ratings", App.showUpdater);

jQuery(document).ready(App.run);
