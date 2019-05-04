// ==UserScript==
// @name           Sanskrit Tools - Toolbar
// @namespace      stgeorge
// @description    Sanskrit Language Tools - Quick access to Sanskrit dictionary, thesarus, news and other tools, on Firefox and Chrome browsers.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match          *://*/*
// @version        3.4.0
// ==/UserScript==


(function() {
  var $j = jQuery.noConflict();
  // ====================================================================
  // Options. Modify as needed.
  // TODO: Expose these options via GM. Some day ...

  var OPTION_DEBUG = false;

  // When on spokensanskrit.org site, Set to true to change word completion list
  // to show up below the input field instead of on the side.
  var OPTION_IN_PLACE_MATCH = true;

  // End options. Don't change anything below this.
  // ====================================================================
  
  // Grammar stuff.

  var SANSKRIT_SITE = 'spokensanskrit.org';

  var verbMatch = /(verb)\s*(.*)/;
  var verbRootMatch = /{\s*(.*)\s*}/;
  var verbClassMatch = /\s*([0-9]+)\s*/g;
  var nounMatch = /\b([fmn](?=\.))/g;
  var nounRootMatch = /^\s*(.*)\s*$/;
  var vurl = 'http://sanskrit.inria.fr/cgi-bin/SKT/sktconjug?lex=SH&q=%Q%&t=KH&c=%C%&font=deva';
  var nurl = 'http://sanskrit.inria.fr/cgi-bin/SKT/sktdeclin?lex=SH&q=%Q%&t=KH&g=%G%&font=deva';
  var surl = 'http://sanskrit.uohyd.ernet.in/cgi-bin/scl/SHMT/generate.cgi?dic=amara&word=%Q%'; var genders = { f: 'Fem', n: 'Neu', m: 'Mas' };
  var gender_names = { f: 'feminine', n: 'neuter', m: 'masculine' };

  var initDone = false;

  function isGrammarSupported() {
    if (document.URL.indexOf(SANSKRIT_SITE) == -1)
      return false;
    if (!initDone) {
      _debug('vurl=' + vurl);
      _debug('nurl=' + nurl);
      _debug('-----');
      initDone = true;
    }
    return true;
  }

  function buildGrammarUI() {
    fixSuggestBox();
    addGrammarLinks();
  }

  function fixSuggestBox() {
    if (OPTION_IN_PLACE_MATCH) {
      var ans = $j('#answer2');
      var target = $j('input[name="tran_input"]').closest('form');
      ans.detach();
      ans.attr('align', 'center');
      ans.removeClass('absolute');
      target.after(ans);
    }
  }

  function addGrammarLinks() {
    var line = 1;
    $j('tr.bgcolor2,tr.bgcolor0,tr.highlight').each(function() {
      var row = $j(this);
      // Each row is of the form:
      // sans_text grammar_info translit_text meaning
      var col = row.children().first(); var sansText = col.text().trim();
      col = col.next(); var grammarInfo = col.text().trim();
      col = col.next(); var transText = col.text().trim();
      _debug("line " + (line++) + "='" + sansText + "' '" + grammarInfo + "' '" + transText + "'");
      var links = [];
      if (matchVerb(sansText, grammarInfo, transText, links) || matchNoun(sansText, grammarInfo, transText, links)) {
        makeURLs(row, links);
      }
      _debug('-----');
    });
  }

  function matchVerb(sansText, grammarInfo, transText, links) {
    // Grammar is of the form: verb N 
    var a = grammarInfo.match(verbMatch);
    if (a && a[1] == 'verb') {
      // transText is of the form xlit_word (xlit_root).
      // We want the root.
      var b = transText.match(verbRootMatch);
      if (!b || !b[1]) return false;
      b[1] = b[1].trim().replace(/[\s-]/g, "")
      _debug('verb: matching ' + transText + ' with verbroot');
      if (b[1].match(/[^A-Za-z]/)) return false;
      var n;
      // For verbs, see if grammar_info has the gaNA info.
      if (a[2])
        n = a[2].trim().match(verbClassMatch);
      if (!(n && n[0])) {
        return false;
      }
      // At this point, b[1] is the transliterated verb root,
      // sansText is the devangari verb root, and n the gaNa.
      _debug('verb=' + b[1]);
      _debug('ganas=' + n);
      for (var i = 0; i < n.length; ++i) {
        links.push({
          tooltip: 'Inflections for ' + a[1] + '(' + n[i].trim() + ') ' + sansText,
          url: vurl.replace('%Q%', b[1]).replace('%C%', n[i].trim()),
          sym: '&rtrif;',
          target: 'l_grammar',
        });
      }
      return true;
    }
    return false;
  }

  function matchNoun(sansText, grammarInfo, transText, links) {
    // grammar, in turn, is of the forms: m./f./n./adj. etc (for nouns)
    _debug('noun: matching ' + grammarInfo + ' with noun');
    var a = grammarInfo.match(nounMatch);
    if (!(a && a[0])) return false;
    _debug('noun: matching ' + transText + ' with nounroot');
    var b = transText.match(nounRootMatch);
    if (!b || !b[1]) return false;
    b[1] = b[1].trim();
    if (b[1].match(/[^A-Za-z]/)) return false;
    // At this point, b[1] is the xlit noun, sansText is the
    // devanagari noun, and a is one or more lingas.
    _debug('noun=' + b[1]);
    _debug('lingams=' + a);
    if (a.length > 0) {
      for (var i = 0; i < a.length; ++i) {
        links.push({
          url: nurl.replace('%Q%', b[1]).replace('%G%', genders[a[i]]),
          tooltip: 'Inflections for ' + gender_names[a[i]] + ' noun ' + sansText,
          sym: '&rtrif;',
          target: 'l_grammar',
        });
      }
      return true;
    }
    return false;
  }

  function makeURLs(row, links) {
    var ltd = row.children().first();
    var html;
    html = '';
    for (var i in links) {
      l = links[i];
      ltd.attr('valign','top');
      html +=
        '<a data-id="' +i+
          '" class="def stil4" style="text-decoration:none;color: #96290e;font-weight:bold;" href="' +
          l.url + '" title="' + l.tooltip + '">'+l.sym+'</a>';
    }
    _debug("link: " + l.url + " --> " + l.tooltip);
    ltd.html(html + ' ' + ltd.html());
    ltd.attr('align', 'left');
    return true;
  }

  // ===============================================================
  // Toolbar stuff.
  // ===============================================================

  var IGNORES = [
    'mail.yahoo.com',
    'groups.yahoo.com',
    SANSKRIT_SITE
  ];
  var ALLOW_ANCHORS = [
    'sanskrit.uohyd.ernet.in/cgi-bin/scl/SHMT/generate.cgi',
  ];
  var TOOLBAR_HTML = '\
    <table id="s_toolbar">\
      <tr>\
        <td class="st_li">\
          <center>\
          <a title="Doordarshan Sanskrit News/Magazine" class="st_common st_link" href="https://www.youtube.com/playlist?list=PLxx0m3vtiqMZGmsUEVeTAuWIXqc9fTMHy" target="l_news">&#2357;&#2366;&#2352;&#2381;&#2340;&#2366;&#2357;&#2354;&#2367;&#2307;<br/>Sanskrit News/Magazine</a>\
          </center>\
        </td>\
        <td class="st_li">\
        <center>\
          <a title="Sanskrit News" class="st_common st_link" href="http://samprativartah.in/" target="l_mag2">&#2360;&#2350;&#2381;&#2346;&#2381;&#2352;&#2340;&#2367;&#2357;&#2366;&#2352;&#2381;&#2340;&#2366;&#2307;<br/>Samprati Vartah</a>\
        </center>\
        </td>\
        <td class="st_li">\
        <center>\
          <a title="Sudharma Sanskrit Daily" class="st_common st_link" href="http://epaper.sudharmasanskritdaily.in/" target="l_mag3">&#2360;&#2369;&#2343;&#2352;&#2381;&#2350;&#2366;<br/>Sudharma</a>\
        </center>\
        </td>\
        <td class="st_li">\
        <center>\
          <a title="\'Sambhaashana Sandesha\' Magazine" class="st_common st_link" href="http://www.sambhashanasandesha.in/" target="l_mag1">&#2360;&#2350;&#2381;&#2349;&#2366;&#2359;&#2339; &#2360;&#2344;&#2381;&#2342;&#2375;&#2358;&#2307;<br/>Sambashana Sandesha</a>\
        </center>\
        </td>\
        <td class="st_li">\
          <center>\
          <a title="Sanskrit Books" class="st_common st_link" href="http://www.sanskrit.nic.in/ebooks.php" target="l_books">&#2346;&#2369;&#2360;&#2381;&#2340;&#2325;&#2366;&#2344;&#2367;<br/>Books</a>\
          </center>\
        </td>\
        <td class="st_li">\
          <center>\
          <a title="Sanskrit Wikipedia" class="st_common st_link" href="http://sa.wikipedia.org" target="l_wiki">\
            &#2357;&#2367;&#2325;&#2367;&#2346;&#2368;&#2337;&#2367;&#2351;&#2366<br/>Wikipedia</a>\
          </center>\
        </td>\
        <td class="st_li">\
          <center>\
          <a title="Maheshwara Sutras" class="st_common st_link" href="http://en.wikipedia.org/wiki/Siva_Sutra#Text" target="l_msutra">\
            &#2350;&#2366;&#2361;&#2375;&#2358;&#2381;&#2357;&#2352;&#2360;&#2370;&#2340;&#2381;&#2352;&#2366;&#2339;&#2367;<br/>Maheshawara Sutras</a>\
          </center>\
        </td>\
        <td class="st_li">\
          <center>\
          <a title="Noun/Verb Expansion" class="st_common st_link" href="http://sanskrit.inria.fr/DICO/grammar.fr.html" target="l_inria">\
            &#2358;&#2348;&#2381;&#2342;-/&#2343;&#2366;&#2340;&#2369;-&#2352;&#2370;&#2346;&#2366;&#2357;&#2354;&#2368;<br/>Noun/Verb</a>\
          </center>\
        </td>\
        <td class="st_li">\
          <center>\
          <a title="Sandhi splitter" class="st_common st_link" href="http://sanskrit.jnu.ac.in/sandhi/viccheda.jsp" target="l_sandhi">\
            &#2360;&#2344;&#2381;&#2343;&#2367;&#2307;<br/>Sandhi</a>\
          </center>\
        </td>\
        <td class="st_lastcol">\
          <div title="When enabled, double-clicking a word will automatically launch the dictionary" class="st_link st_common st_option">\
            <input type="checkbox" id="o_auto" class="st_link st_checkbox" title="When enabled, double-clicking a word will automatically launch the dictionary"/>\
            <label for="o_auto" class="st_link st_label">Auto-dictionary</label>\
          </div>\
        </td>\
      </tr>\
    </table>\
    <a id="a_dict" style="display:none" href="" target="l_dict"></a>\
  </div>';
  var ICON_HTML = '\
      <div id="s_icon" title="Click to show/hide Sanskrit Toolbar">\u0938\
      </div>';
  var icon;
  var visible = {};
  var numClicks = 0;
  var vdiv = null;
  var allowAnchor = false;
  var selectedText = null;

  function isToolbarSupported() {
    for (var i in IGNORES) {
      if (document.URL.indexOf(IGNORES[i]) != -1) {
        return false;
      }
    }
    return true;
  }

  function initToolbarData() {
    for (var i in ALLOW_ANCHORS) {
      if (document.URL.indexOf(ALLOW_ANCHORS[i]) != -1) {
        allowAnchor = true;
        break;
      }
    }
  }

  function buildToolbarUI() {
    place('s_toolbar', TOOLBAR_HTML, {
      fontFamily: 'sans-serif',
      position: 'fixed',
      'top': 0,
      margin: 0,
      width: '100%',
      zIndex: 2999999999,
      backgroundColor: 'white',
      'float': 'left',
      display:'none',
      lineHeight: '20px',
    });
    $j('.st_lastcol').css({
      backgroundColor: '#ffd',
      padding: 0
    });
    $j('.st_li').css({
      backgroundColor: '#ffd',
      padding: '0px',
      border: 'solid 1px #aaa',
      lineHeight: '1.5em'
    });
    $j('.st_space').css({
      marginLeft:'20px',
    });
    $j('.st_common').css({
      'float': 'left',
      border: 0,
      margin: 0,
      padding: 0,
      // fontFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
      // fontSize: '10px',
      fontWeight: 'normal',
      verticalAlign:'middle',
      color: 'black'
    });
    $j('.st_link').css({
      textDecoration: 'none',
      marginLeft:'5px',
      padding:'2px',
      cursor: 'pointer'
    });
    $j('.st_label').css({
      marginLeft: '5px',
      verticalAlign: 'text-top'
    });
    $j('.st_option').css({
      display: 'inline-block',
      margin: '5px'
    });
    $j('.st_link').hover(function() {
      $j(this).css({color:'orange'});
    }, function() {
      $j(this).css({color:'black'});
    });
    $j('.st_checkbox').css({
      margin: '5px'
    });
    $j('.st_menutrigger').css({
      position: 'relative'
    });
    $j('.st_menu').css({
      backgroundColor:'#eee',
      display:'none',
      listStyle: 'none',
      position:'absolute',
      width:'120px',
      'top': '50px',
      boxShadow: '5px 5px 5px #888888',
      zIndex:'999',
    });
    $j('.st_menu li').css({
      width:'100px',
      listStyle: 'none inside',
    });
    place('s_icon', ICON_HTML, {
      cursor:'pointer',
      'float':'right',
      padding: '0px 15px 25px',
      fontWeight:'bold',
      backgroundColor: 'transparent',
      color:'red',
      position:'fixed',
      right:0,
      bottom: 0,
      height:'10px',
      width:'10px',
      zIndex:9999
    });
    icon = $j('#s_icon').get(0);

    $j('#s_icon').on('click', function(e) {
      var tb = $j('#s_toolbar');
      var v = tb.css('display');
      if (v == 'none') {
        tb.css({
          'display':'table',
        });
        $j('body').css('marginTop', '50px');
        setValue('status', 1);
      } else {
        tb.css({
          'display':'none',
        });
        $j('body').css('marginTop', 0);
        setValue('status', 0);
      }
    });
    $j('#o_auto').on('change', function(e) {
      setValue('auto', $j(this).prop('checked'));
    });
    $j('.st_menutrigger').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var trigger = $j(this);
      var tgt = trigger.attr('data-menu');
      var v = visible[tgt];
      if (v)
        $j(tgt).css('display', 'none');
      else
        $j(tgt).css('display', 'block');
      visible[tgt] = !v;
    });
    $j(document).on('click', function(e) {
      $j('.st_menu').css('display', 'none');
      for (var i in visible) {
        visible[i] = false;
      }
    });
    document.addEventListener('mouseup', function(e) {
      var node = (e.target || e.srcElement);
      if (e.button != 0 || (node.nodeName == 'A' && !allowAnchor)
        || node.nodeName == 'INPUT') {
        return;
      }
      var n = node;
      while (n) {
        if (n == icon) {
          return;
        }
        if (n.getAttribute) {
          var ce = n.getAttribute('contenteditable');
          if (ce) {
            return;
          }
        }
        n = n.parentNode;
      }
      if (++numClicks == 1) {
        window.setTimeout(function() {
          selectedText = getSelectedText(true);
          if (selectedText != null && selectedText.length > 0) {
            if (selectedText.indexOf(' ') != -1) {
              selectedText = null;
              return;
            }
            if ($j('#o_auto').prop('checked')) {
              showDict(selectedText);
            }
          } else {
            hideDict();
          }
          numClicks = 0;
        }, 300);
      }
    }, false);

    if (getValue('status', 0))
      show();
  }

  function place(id, html, css) {
    $j('body').prepend(html);
    $j('#'+id).css(css);
  }

  function getSelectedText(trim) {
    var text =
      (window.getSelection) ? window.getSelection().toString() :
      (document.getSelection) ? document.getSelection().toString() :
      (document.selection) ? document.selection.createRange().text : null;
    if (trim && text != null)
      text = text.trim();
    return text;
  }

  function showDict(text) {
    hideDict();
    var a = $j('#a_dict');
    a.on('click', function(e) {
      a.attr('href',
        'http://'+SANSKRIT_SITE+'/index.php?mode=3&direct=au&tran_input='+text);
    });
    a.get(0).click();
  }
  
  function hideDict() {
    if (vdiv) {
      vdiv.close();
      vdiv = null;
    }
  }

  function getValue(key, defval) {
    return defval;
  }

  function setValue(key, defval) {
  }

  // ===============================================================
  // General stuff.
  // ===============================================================

  function _debug(s) {
    if (OPTION_DEBUG)
      console.log(s);
  }

  function isMainWindow() {
    return (window.top == window.self);
  }

  // Main.
  if (!isMainWindow())
    return;

  if (isGrammarSupported()) {
    buildGrammarUI();
  }
  if (isToolbarSupported()) {
    initToolbarData();
    buildToolbarUI();
  }
  // End main.
})();
