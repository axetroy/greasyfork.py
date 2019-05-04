// ==UserScript==
// @name        	Colorfull snapzu usernames (CSU)
// @namespace   	sxxe@gmx.de
// @description 	Colorizes usernames on sanpzu
// @version         0.2.6
// @grant           GM_config
// @grant           GM_registerMenuCommand
// @include         *snapzu.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require         https://greasyfork.org/libraries/GM_config/20131122/GM_config.js

// ==/UserScript==

/*
    Features:
    - Colors are assigned so that a username will always have the same color, even in different comments and snaps.
    - OPs username highlighter
    - VIP username highlighter 
        (a simple GUI to add as many usernames you want to be highlighted) (Open the script options to open it)
    - Temp Highlighter
        (A new button appears beside the up/down vote arrows to highlight a username temporary. Great to get a better overview.)
*/


/*
08/04/2015: 0.2.6
            Fixed colors on "Follow page"
            A couple of random small fixes.

08/03/2015: 0.2.5
            Added 'nickcobb' to VIP lost

08/01/2015: 0.2.4 
            Random color are a bit darker now.
            A couple of random small fixes.

07/31/2015: 0.2
            Initial upload (Port from reddit user script)
*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#GM_config { width: 700px ! important; height: 280px ! important;}');
addGlobalStyle('.snapComments .comment .vote .highLightName { display: inline-block; cursor: pointer; background-color: #EDEDED; width: 18px; height: 18px; position: relative; margin: 0px 1px 0px 0px; font-family: "icomoon"; transition: background-color 100ms linear 0s;}');
addGlobalStyle('.snapComments .comment .vote .highLightName::after { content: "H"; position: absolute; top: 3px; font-size: 11px; color: ##292929; width: 100%; text-align: center; transition: color 100ms linear 0s; }');

// add configuration options
GM_config.init('Colorfull Snapzu Usernames Options',

        {
            'vip_users':
            {
                'section': ['Highlight Usernames','Add usernames you wish to be highlighted'],
                'label': 'Usernames to highlight (seperated by space):',
                'type': 'text',
                'cols': '50',
                'default': 'gladsdotter drunkenninja nickcobb' // Dont add your VIPs here. There is a GUI to add them
            },
            'vip_color_bg':
            {
                'section': ['Highlight Colors','Customize the highligt color. ( <a target="_blank" href="http://www.w3schools.com/html/html_colornames.asp">Available Colors</a> )'],
                'label': 'Background color of highlighted users:',
                'type': 'text',
                'default': 'yellow'
            },
            'vip_color_border':
            {
                'label': 'Border color of highlighted users:',
                'type': 'text',
                'default': 'red'
            }
        },
        '#GM_config_header { text-align: center ! important; } \
        #GM_config_wrapper label { margin-left: 4px; } \
        #GM_config_wrapper input { position: absolute; right: 10px; width: 400px;} \
        .config_var { margin-top: 4px; } \
        .section_header_holder { }'
);

GM_registerMenuCommand("CSU - Options", function(){GM_config.open();}, "");

var GM_U;
window.addEventListener ("load", function () {
        //console.log("Ping");
        var username = GM_config.get('vip_users');
        var vipColorBg = GM_config.get('vip_color_bg');
        var vipColorBorder = GM_config.get('vip_color_border');

        GM_U = new GM_UserColor (username, vipColorBg, vipColorBorder);
    },
    false
);

function GM_UserColor (username, vipColorBg, vipColorBorder) {
    //console.log(username);
    var vip_users=0;
    vip_users=username.split(" ");
    highlighted_users = [];

  
    function add_colors () {
      
        //var authors = $('.btnItem.userHome > a.transition');
		var authors = $('a.user').add('.topMembers a.userName');

        var submitter = $('.comment >.user.green');

        if (submitter.length > 0 ) {
            submitter = extractUsername(submitter.eq(0).text());
        }

        for (var i = 0; i < authors.length; i++) {
            var elem = authors.eq(i);
            var author = extractUsername(elem.text());

            //console.log("a: "+author);

            //elem.textContent = "";

            // Get character sum
            var sum = 0;
            for (var j = 0; j < author.length; j++)
                sum += author.charCodeAt(j);

            // get random color 
            var color = generate_color(sum);

            elem.attr('style', 'color: ' + getContrastYIQ (color) + '; border-width: 0px;' + ' padding: 1px 3px; border-radius: 4px; background-color:' + color + ' !important;');
        
            //Add special look to vip users, OP, and highlighted users
            if ( author==submitter || (vip_users.indexOf(author) > -1) ||
                    (highlighted_users.indexOf (author) > -1) ) {

                elem.attr('style', 'color: ' + vipColorBorder + ' !important; border-width: 1px;' + ' padding: 1px 3px; border-radius: 4px; border-color: red; border-style: solid; border-width: 1px; background-color:' + vipColorBg + ' !important; text-align: justify;');
            }

            var span = '<span class="highLightName GM_highlight" name="'+author+'"></span>';

            if ( (elem.parent().find(".GM_highlight").length == 0 ) && (author != submitter) ) {
                elem.parent().find(".vote").prepend(span);
            }

            
        }
    }

     // add a new user to the highlighted user array
    function add_highlighted_user (user) {

        if (highlighted_users.indexOf (user) == -1) {
            highlighted_users.push(user);
        } else {
            highlighted_users.remove(user);
        }
        add_colors();
    }

    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    // generate random color but skip white
    function generate_color (sum) {
        
        var colorcode = ((1<<24)*sum/1000|0).toString(16);
        
        if (colorcode.length > 6)
            colorcode = colorcode.substring(colorcode.length-6,colorcode.length);
        
        if (colorcode == "ffffff")
            colorcode = "654f76";
        
        colorcode = colorLuminance(colorcode, -0.1);
        
        return colorcode;
    }

    // calculate the contrast of a color to decide if white or black text color should be used
    function getContrastYIQ (hexcolor){
            if (hexcolor.length > 6)
            hexcolor = hexcolor.substring(hexcolor.length-6,hexcolor.length);
            
            var r = parseInt(hexcolor.substr(0,2),16);
            var g = parseInt(hexcolor.substr(2,2),16);
            var b = parseInt(hexcolor.substr(4,2),16);
            var yiq = ((r*299)+(g*587)+(b*114))/1000;
            return (yiq >= 128) ? 'black' : 'white';
    }

    // Calculates lighter or darker colors
    //http://www.sitepoint.com/javascript-generate-lighter-darker-color/
    function colorLuminance (hex, lum) {
            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            lum = lum || 0;
            // convert to decimal and change luminosity
            var rgb = "#", c, i;
            for (i = 0; i < 3; i++) {
                    c = parseInt(hex.substr(i*2,2), 16);
                    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                    rgb += ("00"+c).substr(c.length);
            }
            return rgb;
    }

    function extractUsername(elem) {

        var user = elem.trim();

        var regExp = /(^\w+)/;
        var match = user.match(regExp);

        if (match[0] !== '') {
            return match[0];
        } else {
            return 0;
        }
    }

    add_colors ();

    //Add highlighted users onclick even
    $('.comment').on('click', 'span.GM_highlight', function(event) {
        event.preventDefault();
        var user = $(this).attr('name');
        add_highlighted_user(user);
    });
}




