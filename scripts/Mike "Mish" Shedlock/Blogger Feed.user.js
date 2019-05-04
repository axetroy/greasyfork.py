// ==UserScript==
// @name           Blogger Feed 
// @description    To handle recent post list greater than blogger natively allows
// @author         Mike Shedlock
// @version 0.0.1.20140701063726
// @namespace https://greasyfork.org/users/3143
// ==/UserScript==


function showrecentposts(json) {

  var entry0 = json.feed.entry[0];
  var postdate0 = entry0.published.$t;
    var cdyear0 = postdate0.substring(0,4);
    var cdmonth0 = postdate0.substring(5,7);
    var cdday0 = postdate0.substring(8,10);
    var cdhour0 = postdate0.substring(11,13);
    var cdmin0 = postdate0.substring(14,16);
    var monthnames = new Array();
    monthnames[1] = "Jan";
    monthnames[2] = "Feb";
    monthnames[3] = "Mar";
    monthnames[4] = "Apr";
    monthnames[5] = "May";
    monthnames[6] = "Jun";
    monthnames[7] = "Jul";
    monthnames[8] = "Aug";
    monthnames[9] = "Sep";
    monthnames[10] = "Oct";
    monthnames[11] = "Nov";
    monthnames[12] = "Dec";

    var numposts = 2;

  document.write('<ul>');
  for (var l = 0; l &lt; numposts; l++) {
    var i = l;
    var entry = json.feed.entry[i];
    var posttitle = entry.title.$t;

    var posturl;
    if (i == json.feed.entry.length) break;
    for (var k = 0; k &lt; entry.link.length; k++) {
      if (entry.link[k].rel == 'alternate') {
        posturl = entry.link[k].href;
        break;
      }
    }
    posttitle = posttitle.link(posturl);
    var readmorelink = "(more)";
    readmorelink = readmorelink.link(posturl);
    var postdate = entry.published.$t;
    var cdyear = postdate.substring(0,4);
    var cdmonth = postdate.substring(5,7);
    var cdday = postdate.substring(8,10);
    var cdhour = postdate.substring(11,13);
    var cdmin = postdate.substring(14,16); 
    var cdampm = "AM";


    var _mTime = parseInt(cdhour,10);

    if (_mTime > 11) {
                cdampm = "PM";
            }
    if (_mTime > 12) {
                _mTime = _mTime - 12;
            }

    var _hr = _mTime.toString().substr(0, 2);

    var postbold = 0;    
    var pll = '';
    if ("category" in entry) {
       for (var k = 0; k &lt; entry.category.length; k++) {
           pll = entry.category[k].term;
           if (pll == 'mark') postbold = 1;
               }
            }

    document.write('<li>');

    document.write(monthnames[parseInt(cdmonth,10)] + ' ' + cdday);

    document.write(' at ' + _hr + ':' + cdmin + ' ' + cdampm + ' ');

    document.write(posttitle);

    document.write('</li>');
}
    document.write('</ul>');

}