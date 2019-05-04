// ==UserScript==
// @name        Erepublik BattleInfo
// @include     *www.erepublik.com/en
// @include     *www.erepublik.com/bg
// @version     0.10
// @description Battles and COs monitoring
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @grant       GM_addStyle
// @namespace https://greasyfork.org/users/2402
// ==/UserScript==
var $ = jQuery,
    timeout = 60e3,
    me = $('.user_name').text().trim(),
    i = 0,
    myPrice = 9999,
    lowestPrice = 9999,
    pricer = 0,
    provider = "";

function style(t) {
    $("head").append("<style>" + t + "</style>")
}

var img_country = {
    1: "Romania",
    9: "Brazil",
    10: "Italy",
    11: "France",
    12: "Germany",
    13: "Hungary",
    14: "China",
    15: "Spain",
    23: "Canada",
    24: "USA",
    26: "Mexico",
    27: "Argentina",
    28: "Venezuela",
    29: "United-Kingdom",
    30: "Switzerland",
    31: "Netherlands",
    32: "Belgium",
    33: "Austria",
    34: "Czech-Republic",
    35: "Poland",
    36: "Slovakia",
    37: "Norway",
    38: "Sweden",
    39: "Finland",
    40: "Ukraine",
    41: "Russia",
    42: "Bulgaria",
    43: "Turkey",
    44: "Greece",
    45: "Japan",
    47: "South-Korea",
    48: "India",
    49: "Indonesia",
    50: "Australia",
    51: "South-Africa",
    52: "Republic-of-Moldova",
    53: "Portugal",
    54: "Ireland",
    55: "Denmark",
    56: "Iran",
    57: "Pakistan",
    58: "Israel",
    59: "Thailand",
    61: "Slovenia",
    63: "Croatia",
    64: "Chile",
    65: "Serbia",
    66: "Malaysia",
    67: "Philippines",
    68: "Singapore",
    69: "Bosnia-Herzegovina",
    70: "Estonia",
    71: "Latvia",
    72: "Lithuania",
    73: "North-Korea",
    74: "Uruguay",
    75: "Paraguay",
    76: "Bolivia",
    77: "Peru",
    78: "Colombia",
    79: "Republic-of-Macedonia-FYROM",
    80: "Montenegro",
    81: "Republic-of-China-Taiwan",
    82: "Cyprus",
    83: "Belarus",
    84: "New-Zealand",
    164: "Saudi-Arabia",
    165: "Egypt",
    166: "United-Arab-Emirates",
    167: "Albania",
    168: "Georgia",
    169: "Armenia",
    170: "Nigeria",
    171: "Cuba"
}

function main() {
    style("#btlinf{z-index: 99999; position: absolute; top: 0; left: 0;margin: 7px; border-radius: 3px;font-size: 11px; background-color: #fafafa; border: 1px solid #eee; padding: 4px;}");
    style("#cos span{display: inline-block;}");
    style(".i1{width: 18px;}");
    style(".i2{width: 18px; text-align: right}");
    style(".i3{width: 120px; text-align: center}");
    style(".i4{width: 18px; text-align: right}");
    style(".i5{width: 18px; text-align: right}");
    style(".div{padding-left: 10px; border-bottom: 1px solid #666;}");
    style(".div, a{font-family: Arial,Helvetica,sans-serif;}");
    style("#t1 a img{vertical-align: text-top;}")
    style(".tabs li {list-style:none; display:inline;}.tabs a {padding:5px 10px;display:inline-block;background:#666;color:#fff;text-decoration:none;}.tabs a.active {background:#fff;color:#000;}")
    $("body").after("<div id='btlinf'></div>");
    $('#btlinf').html('<div id="tabs"><ul class="tabs"><li><a href="#t1">CoD</a></li><li><a href="#t2">COs</a></li></ul><div id="t1"></div><div id="t2"></div></div>');
    $('ul.tabs').each(function() {
        var $active, $content, $links = $(this).find('a');
        $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
        $active.addClass('active');
        $content = $($active[0].hash);
        $links.not($active).each(function() {
            $(this.hash).hide();
        });
        $(this).on('click', 'a', function(e) {
            $active.removeClass('active');
            $content.hide();
            $active = $(this);
            $content = $(this.hash);
            $active.addClass('active');
            $content.show();
            e.preventDefault();
        });
    });
    $.ajax({
            url: "/en/military/campaigns-new/",
        })
        .done(function(b) {
            var r = $.parseJSON(b),
                a = 0;
            $.each(r.countries, function(i, c) {
                if (c.cotd != "0") {
                    $('#t1').append("<a href='/en/military/battlefield-new/" + c.cotd + "'><img src='https://www.erepublik.net/images/flags_png/S/" + img_country[c.id] + ".png' alt=''> - " + r.battles[c.cotd].region.name + "</a><div></div>")
                }
            })
            $('#t2').append("<div id='cos'></div>");
            $.each(r.battles, function(i, b) {
                $('#cos').append("<div id='hed" + b.id + "'><span class='i1'><img src='https://www.erepublik.net/images/flags_png/S/" + img_country[b.inv.id] + ".png' alt=''></span><span class='i2'>" + b.inv.points + "</span><span class='i3'>" + b.region.name + "</span><span class='i4'>" + b.def.points + "</span><span class='i5'><img src='https://www.erepublik.net/images/flags_png/S/" + img_country[b.def.id] + ".png' alt=''></span></div>")
                $('#cos').append("<div id='rid" + b.id + "'><p> &gt;&gt; <a href='/en/military/battlefield-new/" + b.id + "'>" + b.region.name + "</a></p></div>");
                ct = 0;
                $.each(b.div, function(i, d) {
                    $('#rid' + b.id).append("<div id='did" + b.id + d.div + "'><b>div " + d.div + "</b></div>")
                    if (typeof d.co.inv !== "undefined") {
                        $('#did' + b.id + d.div).append("<div class='div'>Invading side</div>");
                        $.each(d.co.inv, function(i, cc) {
                            priv = cc.sub_mu != 0 ? "private" : "";
                            prc = cc.sub_country != 0 ? "<img src='https://www.erepublik.net/images/flags_png/S/" + img_country[cc.sub_country] + ".png' alt=''>" : "";
                            $('#did' + b.id + d.div).append("<div class='div'><a href='https://www.erepublik.com/en/main/group-show/" + cc.group_id + "'><span>" + cc.reward + "/mil.</span><span>  / " + cc.threshold + "%</span><span>  / " + cc.budget + " cc </span> <span> " + priv + " " + prc + "</span></a></div>");
                            cc.reward > 0 && ct++;
                        })
                    }
                    if (typeof d.co.def !== "undefined") {
                        $('#did' + b.id + d.div).append("<div class='div'>Defending side</div>");
                        $.each(d.co.def, function(i, cc) {
                            priv = cc.sub_mu != 0 ? "private" : "";
                            prc = cc.sub_country != 0 ? "<img src='https://www.erepublik.net/images/flags_png/S/" + img_country[cc.sub_country] + ".png' alt=''>" : "";
                            $('#did' + b.id + d.div).append("<div class='div'><a href='https://www.erepublik.com/en/main/group-show/" + cc.group_id + "'><span>" + cc.reward + "/mil.</span><span>  / " + cc.threshold + "%</span><span>  / " + cc.budget + " cc </span> <span> " + priv + " " + prc + "</span></a></div>");
                            cc.reward > 0 && ct++;
                        })
                    }
                })
                ct == 0 && $("#rid" + b.id).remove();
                ct == 0 && $("#hed" + b.id).remove();
            })
        })

}

main();