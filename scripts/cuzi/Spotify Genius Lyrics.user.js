// ==UserScript==
// @name         Spotify Genius Lyrics
// @description  Show lyrics from genius.com on the Spotify web player
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright    2019, cuzi (https://github.com/cvzi)
// @supportURL   https://github.com/cvzi/Spotify-Genius-Lyrics-userscript/issues
// @version      5
// @include      https://open.spotify.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @connect      genius.com
// @namespace https://greasyfork.org/users/20068
// ==/UserScript==

const isFirefox = typeof InstallTrigger !== 'undefined'
var requestCache = {}
var selectionCache = {}
var currentTitle = ''
var currentArtists = ''
var resizeLeftContainer
var resizeContainer
var optionCurrentSize = 30.0
var optionAutoShow = true
var mainIv

function getHostname (url) {
  const a = document.createElement('a')
  a.href = url
  return a.hostname
}

function metricPrefix (n, decimals, k) {
  // http://stackoverflow.com/a/18650828
  if (n <= 0) {
    return String(n)
  }
  k = k || 1000
  let dm = decimals <= 0 ? 0 : decimals || 2
  let sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  let i = Math.floor(Math.log(n) / Math.log(k))
  return parseFloat((n / Math.pow(k, i)).toFixed(dm)) + sizes[i]
}

function loadCache () {
  Promise.all([
    GM.getValue('selectioncache', '{}'),
    GM.getValue('requestcache', '{}'),
    GM.getValue('optioncurrentsize', 30.0),
    GM.getValue('optionautoshow', true)
  ]).then(function (values) {
    selectionCache = JSON.parse(values[0])

    requestCache = JSON.parse(values[1])

    optionCurrentSize = values[2]

    optionAutoShow = values[3]
    /*
    requestCache = {
       "cachekey0": "121648565.5\njsondata123",
       ...
       }
    */
    const now = (new Date()).getTime()
    const exp = 2 * 60 * 60 * 1000
    for (let prop in requestCache) {
      // Delete cached values, that are older than 2 hours
      const time = requestCache[prop].split('\n')[0]
      if ((now - (new Date(time)).getTime()) > exp) {
        delete requestCache[prop]
      }
    }
  })
}

function request (obj) {
  const cachekey = JSON.stringify(obj)
  if (cachekey in requestCache) {
    return obj.load(JSON.parse(requestCache[cachekey].split('\n')[1]))
  }

  let headers = {
    'Referer': obj.url,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': getHostname(obj.url),
    'User-Agent': navigator.userAgent
  }
  if (obj.headers) {
    headers = Object.assign(headers, obj.headers)
  }

  return GM.xmlHttpRequest({
    url: obj.url,
    method: obj.method ? obj.method : 'GET',
    data: obj.data,
    headers: headers,
    onerror: obj.error ? obj.error : function xmlHttpRequestGenericOnError (response) { console.log(response) },
    onload: function xmlHttpRequestOnLoad (response) {
      const time = (new Date()).toJSON()
      // Chrome fix: Otherwise JSON.stringify(requestCache) omits responseText
      var newobj = {}
      for (var key in response) {
        newobj[key] = response[key]
      }
      newobj.responseText = response.responseText
      requestCache[cachekey] = time + '\n' + JSON.stringify(newobj)

      GM.setValue('requestcache', JSON.stringify(requestCache))

      obj.load(response)
    }
  })
}

function rememberLyricsSelection (title, artists, jsonHit) {
  const cachekey = title + '--' + artists
  selectionCache[cachekey] = jsonHit
  GM.setValue('selectioncache', JSON.stringify(selectionCache))
}

function forgetLyricsSelection (title, artists) {
  const cachekey = title + '--' + artists
  if (cachekey in selectionCache) {
    delete selectionCache[cachekey]
    GM.setValue('selectioncache', JSON.stringify(selectionCache))
  }
}

function getLyricsSelection (title, artists) {
  const cachekey = title + '--' + artists
  if (cachekey in selectionCache) {
    return JSON.parse(selectionCache[cachekey])
  } else {
    return false
  }
}

function geniusSearch (query, cb) {
  request({
    url: 'https://genius.com/api/search/song?page=1&q=' + encodeURIComponent(query),
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    error: function geniusSearchOnError (response) {
      alert('Error geniusSearch(' + JSON.stringify(query) + ', cb):\n' + response)
    },
    load: function geniusSearchOnLoad (response) {
      cb(JSON.parse(response.responseText))
    }
  })
}

function loadGeniusSong (song, cb) {
  request({
    url: song.result.url,
    error: function loadGeniusSongOnError (response) {
      alert('Error loadGeniusSong(' + JSON.stringify(song) + ', cb):\n' + response)
    },
    load: function loadGeniusSongOnLoad (response) {
      cb(response.responseText)
    }
  })
}

function loadGeniusAnnotations (song, html, cb) {
  const regex = /annotation-fragment="\d+"/g
  let m = html.match(regex)
  if (!m) {
    // No annotations, skip loading from API
    return cb(song, html, {})
  }

  m = m.map((s) => s.match(/\d+/)[0])
  const ids = m.map((id) => 'ids[]=' + id)

  const apiurl = 'https://genius.com/api/referents/multi?text_format=html%2Cplain&' + ids.join('&')

  request({
    url: apiurl,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    error: function loadGeniusAnnotationsOnError (response) {
      alert('Error loadGeniusAnnotations(' + JSON.stringify(song) + ', cb):\n' + response)
    },
    load: function loadGeniusAnnotationsOnLoad (response) {
      const r = JSON.parse(response.responseText).response
      const annotations = {}
      if (r.referents.forEach) {
        r.referents.forEach(function forEachReferent (referent) {
          referent.annotations.forEach(function forEachAnnotation (annotation) {
            annotations[annotation.id] = annotation
          })
        })
      } else {
        for (let refId in r.referents) {
          const referent = r.referents[refId]
          referent.annotations.forEach(function forEachAnnotation (annotation) {
            annotations[annotation.id] = annotation
          })
        }
      }
      cb(song, html, annotations)
    }
  })
}

function myScripts () {
  const script = []
  const onload = []

  // Define globals
  script.push('var iv458,annotations1234;')
  script.push('function removeIfExists (e) { if(e && e.remove) { e.remove() }}')
  script.push('function decodeHTML652 (s) { return s.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">") }')

  // Hide cookies box function
  // script.push('function hideCookieBox458 () {if(document.querySelector(".optanon-allow-all")){document.querySelector(".optanon-allow-all").click(); clearInterval(iv458)}}')
  // onload.push('iv458 = window.setInterval(hideCookieBox458, 500)')

  // Hide footer
  script.push('function hideFooter895 () {let f = document.querySelectorAll(".footer div"); if(f.length){removeIfExists(f[0]);removeIfExists(f[1])}}')
  script.push('function hideSecondaryFooter895 () {if(document.querySelector(".footer.footer--secondary")){document.querySelector(".footer.footer--secondary").parentNode.removeChild(document.querySelector(".footer.footer--secondary"))}}')

  onload.push('hideFooter895()')
  onload.push('hideSecondaryFooter895()')

  // Hide other stuff
  script.push('function hideStuff235 () {')
  script.push('  const grayBox = document.querySelector(".column_layout-column_span-initial_content>.dfp_unit.u-x_large_bottom_margin.dfp_unit--in_read"); removeIfExists(grayBox)')
  script.push('  removeIfExists(document.querySelector(".header .header-expand_nav_menu"))')
  script.push('}')
  onload.push('hideStuff235()')

  // Show annotations function
  script.push('function checkAnnotationHeight458() {')
  script.push('  const annot = document.querySelector(".song_body.column_layout .column_layout-column_span.column_layout-column_span--secondary .column_layout-flex_column-fill_column")')
  script.push('  const arrow = annot.querySelector(".annotation_sidebar_arrow")')
  script.push('  if (arrow.offsetTop > arrow.nextElementSibling.clientHeight) {')
  script.push('    arrow.nextElementSibling.style.paddingTop = (10 + parseInt(arrow.nextElementSibling.style.paddingTop) + arrow.offsetTop - arrow.nextElementSibling.clientHeight) + "px"')
  script.push('  }')
  script.push('}')
  script.push('function showAnnotation1234(ev, id) {')
  script.push('  ev.preventDefault()')
  script.push('  document.querySelectorAll(".song_body-lyrics .referent--yellow.referent--highlighted").forEach((e) => e.className = e.className.replace(/\\breferent--yellow\\b/, "").replace(/\\breferent--highlighted\\b/, ""))')
  script.push('  this.className += " referent--yellow referent--highlighted"')
  script.push('  if(typeof annotations1234 == "undefined") {')
  script.push('    annotations1234 = JSON.parse(document.getElementById("annotationsdata1234").innerHTML)')
  script.push('  }')
  script.push('  if(id in annotations1234) {')
  script.push('    let annotation = annotations1234[id]')
  script.push('    let main = document.querySelector(".song_body.column_layout .column_layout-column_span.column_layout-column_span--secondary")')
  script.push('    main.style.paddingRight = 0')
  script.push('    main.innerHTML = ""')
  script.push('    const div0 = document.createElement("div")')
  script.push('    div0.className = "column_layout-flex_column-fill_column"')
  script.push('    main.appendChild(div0)')
  script.push('    const arrowTop = this.offsetTop')
  script.push('    const paddingTop = window.scrollY - main.offsetTop - main.parentNode.offsetTop')
  script.push('    let html = \'<div class="annotation_sidebar_arrow" style="top: \'+arrowTop+\'px;"><svg src="left_arrow.svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.87 21.32"><path d="M9.37 21.32L0 10.66 9.37 0l1.5 1.32-8.21 9.34L10.87 20l-1.5 1.32"></path></svg></div>\';')
  script.push('    html += \'\\n<div class="u-relative nganimate-fade_slide_from_left" style="margin-left:1px;padding-top:\'+paddingTop+\'px; padding-left:2px; border-left:3px #99a7ee solid"><div class="annotation_label">$author</div><div class="rich_text_formatting">$body</div></div>\';')
  script.push('    html = html.replace(/\\$body/g, decodeHTML652(annotation.body.html)).replace(/\\$author/g, decodeHTML652(annotation.created_by.name));')
  script.push('    div0.innerHTML = html')
  script.push('    targetBlankLinks145 (); // Change link target to _blank')
  script.push('    window.setTimeout(checkAnnotationHeight458, 200) // Change link target to _blank')
  script.push('  }')
  script.push('}')
  onload.push('annotations1234 = JSON.parse(document.getElementById("annotationsdata1234").innerHTML);')

  // Make song title clickable
  script.push('function clickableTitle037() { let url = document.querySelector("meta[property=\'og:url\']").content; ')
  script.push('  let h1 = document.querySelector(\'.header_with_cover_art-primary_info-title\'); h1.innerHTML = \'<a target="_blank" href="\' + url + \'" style="color:#ffff64">\' + h1.innerHTML + \'</a>\'')
  script.push('  let div = document.querySelector(\'.header_with_cover_art-cover_art .cover_art\'); div.innerHTML = \'<a target="_blank" href="\' + url + \'">\' + div.innerHTML + \'</a>\'')
  script.push('}')
  onload.push('clickableTitle037()')

  // Change links to target=_blank
  script.push('function targetBlankLinks145 () {')
  script.push('  const as = document.querySelectorAll(\'body a:not([href|="#"]):not([target=_blank])\')')
  script.push('  as.forEach(function(a) {')
  script.push('    a.target = "_blank";')
  script.push('  })')
  script.push('}')
  onload.push('window.setTimeout(targetBlankLinks145, 1000)')

  // Open real page if not in frame
  onload.push('if(top==window) {document.location.href = document.querySelector("meta[property=\'og:url\']").content}')

  return [script, onload]
}



function combineGeniusResources (song, html, annotations, cb) {
  const [script, onload] = myScripts()

  let headhtml = ''

  // Make annotations clickable
  const regex = /annotation-fragment="(\d+)"/g
  html = html.replace(regex, 'onclick="showAnnotation1234.call(this, event, $1)"')

  // Change design
  html = html.split('<div class="leaderboard_ad_container">').join('<div class="leaderboard_ad_container" style="width:0px;height:0px">')

  // Remove cookie consent
  html = html.replace(/<script defer="true" src="https:\/\/cdn.cookielaw.org.+?"/, '<script ')

  // Add onload attribute to body and hide horizontal scroll bar
  let parts = html.split('<body')
  html = parts[0] + '<body style="overflow-x:hidden;width:100%" onload="onload7846552()"' + parts.slice(1).join('<body')

  // Add script code
  headhtml += '\n<script type="text/javascript">\n\n' + script.join('\n') + '\n\nfunction onload7846552() {\n' + onload.join('\n') + '\n}\n\n</script>'

  // Add annotation data
  headhtml += '\n<script id="annotationsdata1234" type="application/json">' + JSON.stringify(annotations).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</script>'

  // Add to <head>
  parts = html.split('</head>')
  html = parts[0] + '\n' + headhtml + '\n</head>' + parts.slice(1).join('</head>')
  cb(html)
}

function onResize () {
  let iframe = document.getElementById('lyricsiframe')
  if (iframe) {
    iframe.style.width = document.getElementById('lyricscontainer').clientWidth - 1 + 'px'
    iframe.style.height = document.querySelector('.Root__nav-bar .navBar').clientHeight + 'px'
  }
}
function initResize () {
  window.addEventListener('mousemove', onMouseMoveResize)
  window.addEventListener('mouseup', stopResize)
  window.removeEventListener('resize', onResize)
}
function onMouseMoveResize (e) {
  optionCurrentSize = 100 - (e.clientX / document.body.clientWidth * 100)
  resizeLeftContainer.style.width = (100 - optionCurrentSize) + '%'
  resizeContainer.style.width = optionCurrentSize + '%'
}
function stopResize () {
  window.removeEventListener('mousemove', onMouseMoveResize)
  window.removeEventListener('mouseup', stopResize)
  window.addEventListener('resize', onResize)
  onResize()
  GM.setValue('optioncurrentsize', optionCurrentSize)
}
function getCleanLyricsContainer () {
  const topContainer = document.querySelector('.Root__top-container')
  if (!document.getElementById('lyricscontainer')) {
    topContainer.style.width = (100 - optionCurrentSize) + '%'
    topContainer.style.float = 'left'
    resizeContainer = document.createElement('div')
    resizeContainer.id = 'lyricscontainer'
    resizeContainer.style = 'min-height: 100%; width: ' + optionCurrentSize + '%; position: relative; z-index: 1; float:left'
    topContainer.parentNode.insertBefore(resizeContainer, topContainer.nextSibling)
  } else {
    resizeContainer = document.getElementById('lyricscontainer')
    resizeContainer.innerHTML = ''
  }
  resizeLeftContainer = topContainer

  return document.getElementById('lyricscontainer')
}

function hideLyrics () {
  if (document.getElementById('lyricscontainer')) {
    document.getElementById('lyricscontainer').parentNode.removeChild(document.getElementById('lyricscontainer'))
    const topContainer = document.querySelector('.Root__top-container')
    topContainer.style.width = '100%'
    topContainer.style.removeProperty('float')
  }
  addLyricsButton()
}

function showLyrics (song, searchresultsLengths) {
  const container = getCleanLyricsContainer()

  const separator = document.createElement('span')
  separator.setAttribute('class', 'second-line-separator')
  separator.setAttribute('style', 'padding:0px 3px')
  separator.appendChild(document.createTextNode('•'))

  const bar = document.createElement('div')
  bar.style.fontSize = '0.7em'
  container.appendChild(bar)

  // Resize button
  const resizeButton = document.createElement('span')
  resizeButton.style.fontSize = '1.8em'
  resizeButton.style.cursor = 'ew-resize'
  resizeButton.style.color = 'white'
  resizeButton.appendChild(document.createTextNode('⇹'))
  resizeButton.addEventListener('mousedown', initResize)
  bar.appendChild(resizeButton)

  bar.appendChild(separator.cloneNode(true))

  // Hide button
  const hideButton = document.createElement('a')
  hideButton.href = '#'
  hideButton.appendChild(document.createTextNode('Hide'))
  hideButton.addEventListener('click', function hideButtonClick (ev) {
    ev.preventDefault()
    optionAutoShow = false  // Temporarily disable showing lyrics automatically on song change
    clearInterval(mainIv)
    hideLyrics()
  })
  bar.appendChild(hideButton)

  bar.appendChild(separator.cloneNode(true))

  // Config button
  const configButton = document.createElement('a')
  configButton.href = '#'
  configButton.appendChild(document.createTextNode('Options'))
  configButton.addEventListener('click', function configButtonClick (ev) {
    ev.preventDefault()
    config()
  })
  bar.appendChild(configButton)

  bar.appendChild(separator.cloneNode(true))

  // Wrong lyrics
  const wrongLyricsButton = document.createElement('a')
  wrongLyricsButton.href = '#'
  wrongLyricsButton.appendChild(document.createTextNode('Wrong lyrics'))
  wrongLyricsButton.addEventListener('click', function wrongLyricsButtonClick (ev) {
    ev.preventDefault()
    forgetLyricsSelection(currentTitle, currentArtists, this.dataset.hit)
    showSearchField(currentArtists + ' ' + currentTitle)
  })
  bar.appendChild(wrongLyricsButton)

  // Back button
  if (searchresultsLengths) {
    bar.appendChild(separator.cloneNode(true))

    const backbutton = document.createElement('a')
    backbutton.href = '#'
    if (searchresultsLengths === true) {
      backbutton.appendChild(document.createTextNode('Back to search results'))
    } else {
      backbutton.appendChild(document.createTextNode('Back to search (' + (searchresultsLengths - 1) + ' other result' + (searchresultsLengths === 2 ? '' : 's') + ')'))
    }
    backbutton.addEventListener('click', function backbuttonClick (ev) {
      ev.preventDefault()
      addLyrics(true)
    })
    bar.appendChild(backbutton)
  }

  const iframe = document.createElement('iframe')
  iframe.id = 'lyricsiframe'
  container.appendChild(iframe)
  const spinner = '<style>.loadingspinner { pointer-events: none; width: 2.5em; height: 2.5em; border: 0.4em solid transparent; border-color: rgb(255, 255, 100) #181818 #181818 #181818; border-radius: 50%; animation: loadingspin 2s ease infinite;} @keyframes loadingspin { 25% { transform: rotate(90deg) } 50% { transform: rotate(180deg) } 75% { transform: rotate(270deg) } 100% { transform: rotate(360deg) }}</style><div class="loadingspinner"></div>'
  if (isFirefox) {
    iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(spinner)
  } else {
    iframe.src = 'https://open.spotify.com/405#html,' + encodeURIComponent(spinner)
  }
  iframe.style.width = container.clientWidth - 1 + 'px'
  iframe.style.height = document.querySelector('.Root__nav-bar .navBar').clientHeight + 'px'
  loadGeniusSong(song, function loadGeniusSongCb (html) {
    loadGeniusAnnotations(song, html, function loadGeniusAnnotationsCb (song, html, annotations) {
      combineGeniusResources(song, html, annotations, function combineGeniusResourcesCb (html) {
        if (isFirefox) {
          iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(html)
        } else {
          iframe.src = 'https://open.spotify.com/404#html:scripts,' + encodeURIComponent(html)
        }
        iframe.style.position = 'fixed'
      })
    })
  })
}

function listSongs (hits, container, query) {
  if (!container) {
    container = getCleanLyricsContainer()
  }

  // Back to search button
  const backToSearchButton = document.createElement('a')
  backToSearchButton.href = '#'
  backToSearchButton.appendChild(document.createTextNode('Search again'))
  backToSearchButton.addEventListener('click', function backToSearchButtonClick (ev) {
    ev.preventDefault()
    if (query) {
      showSearchField(query)
    } else if (currentArtists) {
      showSearchField(currentArtists + ' ' + currentTitle)
    } else {
      showSearchField()
    }
  })

  // List search results
  const trackhtml = '<div class="tracklist-col position-outer"><div class="tracklist-play-pause tracklist-top-align"><span style="color:silver;font-size:2.0em">🅖</span></div><div class="position tracklist-top-align"><span style="font-size:1.5em">📄</span></div></div><div class="tracklist-col name"><div class="track-name-wrapper tracklist-top-align"><div class="tracklist-name ellipsis-one-line" dir="auto">$title</div><div class="second-line"><span class="TrackListRow__explicit-label">$lyrics_state</span><span class="ellipsis-one-line" dir="auto"><a tabindex="-1" class="tracklist-row__artist-name-link" href="#">$artist</a></span><span class="second-line-separator" aria-label="in album">•</span><span class="ellipsis-one-line" dir="auto"><a tabindex="-1" class="tracklist-row__album-name-link" href="#">👁 <span style="font-size:0.8em">$stats.pageviews</span></a></span></div></div></div>'
  container.innerHTML = '<section class="tracklist-container"><ol class="tracklist" style="width:99%"></ol></section>'

  container.insertBefore(backToSearchButton, container.firstChild)

  const ol = container.querySelector('ol.tracklist')
  const searchresultsLengths = hits.length
  const title = currentTitle
  const artists = currentArtists
  const onclick = function onclick () {
    rememberLyricsSelection(title, artists, this.dataset.hit)
    showLyrics(JSON.parse(this.dataset.hit), searchresultsLengths)
  }
  hits.forEach(function forEachHit (hit) {
    let li = document.createElement('li')
    li.setAttribute('class', 'tracklist-row')
    li.setAttribute('role', 'button')
    li.innerHTML = trackhtml.replace(/\$title/g, hit.result.title_with_featured).replace(/\$artist/g, hit.result.primary_artist.name).replace(/\$lyrics_state/g, hit.result.lyrics_state).replace(/\$stats\.pageviews/g, metricPrefix(hit.result.stats.pageviews, 1))
    li.dataset.hit = JSON.stringify(hit)

    li.addEventListener('click', onclick)
    ol.appendChild(li)
  })
}

function addLyrics (force, beLessSpecific) {
  let songTitle = document.querySelector('.track-info__name.ellipsis-one-line').innerText
  let feat = songTitle.indexOf(' (feat')
  if (feat !== -1) {
    songTitle = songTitle.substring(0, feat).trim()
  }
  const musicIsPlaying = document.querySelector('.now-playing-bar .player-controls__buttons .control-button.control-button--circled').className.toLowerCase().indexOf('pause') !== -1
  const songArtistsArr = []
  document.querySelector('.track-info__artists.ellipsis-one-line').querySelectorAll('a[href^="/artist/"]').forEach((e) => songArtistsArr.push(e.innerText))
  let songArtists = songArtistsArr.join(' ')
  if (force || (!document.hidden && musicIsPlaying && (currentTitle !== songTitle || currentArtists !== songArtists))) {
    currentTitle = songTitle
    currentArtists = songArtists
    const firstArtist = songArtistsArr[0]
    let simpleTitle = songTitle = songTitle.replace(/\s*-\s*.+?$/, '') // Remove anything following the last dash
    if (beLessSpecific) {
      songArtists = firstArtist
      songTitle = simpleTitle
    }
    let hitFromCache = getLyricsSelection(songTitle, songArtists)
    if (!force && hitFromCache) {
      showLyrics(hitFromCache, true)
    } else {
      geniusSearch(songTitle + ' ' + songArtists, function geniusSearchCb (r) {
        const hits = r.response.sections[0].hits
        if (hits.length === 0) {
          hideLyrics()
          if (!beLessSpecific && (firstArtist !== songArtists || simpleTitle !== songTitle)) {
            // Try again with only the first artist or the simple title
            addLyrics(!!force, true)
          } else if (force) {
            showSearchField()
          }
        } else if (hits.length === 1) {
          showLyrics(hits[0])
        } else {
          listSongs(hits)
        }
      })
    }
  }
}

function searchByQuery (query, container) {
  geniusSearch(query, function geniusSearchCb (r) {
    const hits = r.response.sections[0].hits
    if (hits.length === 0) {
      alert('No search results')
    } else {
      listSongs(hits, container, query)
    }
  })
}

function showSearchField (query) {
  const b = getCleanLyricsContainer()
  b.appendChild(document.createTextNode('Search genius.com'))
  b.style.paddingRight = '15px'
  const input = b.appendChild(document.createElement('input'))
  input.className = 'SearchInputBox__input'
  input.placeholder = 'Search genius.com...'

  if (query) {
    input.value = query
  } else if (currentArtists) {
    input.value = currentArtists
  }
  input.addEventListener('change', function onSearchLyricsButtonClick () {
    if (input.value) {
      searchByQuery(input.value, b)
    }
  })
  input.addEventListener('keyup', function onSearchLyricsKeyUp (ev) {
    if (ev.keyCode === 13) {
      ev.preventDefault()
      if (input.value) {
        searchByQuery(input.value, b)
      }
    }
  })
  document.body.appendChild(b)
  input.focus()
}

function addLyricsButton () {
  if (document.getElementById('showlyricsbutton')) {
    return
  }
  const b = document.createElement('div')
  b.setAttribute('id', 'showlyricsbutton')
  b.setAttribute('style', 'position:absolute; top: 0px; right:0px; color:#ffff64; cursor:pointer')
  b.setAttribute('title', 'Load lyrics from genius.com')
  b.appendChild(document.createTextNode('🅖'))
  b.addEventListener('click', function onShowLyricsButtonClick () {
    optionAutoShow = true  // Temporarily enable showing lyrics automatically on song change
    mainIv = window.setInterval(main, 2000)
    addLyrics(true)
  })
  document.body.appendChild(b)
}

function config () {
  loadCache()
  const win = document.createElement('div')
  win.setAttribute('style', 'position:absolute; top: 10px; right:10px; padding:15px; background:white; border-radius:10%; border:2px solid black; color:black')
  document.body.appendChild(win)
  const h1 = document.createElement('h1')
  win.appendChild(h1).appendChild(document.createTextNode('Options'))
  const a = document.createElement('a')
  a.href = 'https://github.com/cvzi/Spotify-Genius-Lyrics-userscript/issues'
  a.style = 'color:blue'
  win.appendChild(a).appendChild(document.createTextNode('Report problem: github.com/cvzi/Spotify-Genius-Lyrics-userscript'))

  // Switch: Show automatically
  let div = document.createElement('div')
  win.appendChild(div)
  const checkAutoShow = div.appendChild(document.createElement('input'))
  checkAutoShow.type = 'checkbox'
  checkAutoShow.checked = optionAutoShow === true
  const onAutoShow = function onAutoShowListener () {
    GM.setValue('optionautoshow', checkAutoShow.checked === true)
  }
  checkAutoShow.addEventListener('click', onAutoShow)
  checkAutoShow.addEventListener('change', onAutoShow)
  div.appendChild(document.createTextNode(' Automatically show lyrics when new song starts'))
  div.appendChild(document.createElement('br'))
  div.appendChild(document.createTextNode('(if you disable this, a small button will appear in the top right corner to show the lyrics)'))

  const closeButton = win.appendChild(document.createElement('button'))
  closeButton.appendChild(document.createTextNode('Close'))
  closeButton.style.color = 'black'
  closeButton.addEventListener('click', function onCloseButtonClick () {
    win.parentNode.removeChild(win)
  })

  const bytes = metricPrefix(JSON.stringify(selectionCache).length + JSON.stringify(requestCache).length, 2, 1024) + 'Bytes'
  const clearCacheButton = win.appendChild(document.createElement('button'))
  clearCacheButton.appendChild(document.createTextNode('Clear cache (' + bytes + ')'))
  clearCacheButton.style.color = 'black'
  clearCacheButton.addEventListener('click', function onClearCacheButtonClick () {
    Promise.all([GM.setValue('selectioncache', '{}'), GM.setValue('requestcache', '{}')]).then(function () {
      clearCacheButton.innerHTML = 'Cleared'
    })
  })
}

function main () {
  if (document.querySelector('.now-playing')) {
    if (optionAutoShow) {
      addLyrics()
    } else {
      addLyricsButton()
    }
  }
}

if (!isFirefox && document.location.href.startsWith('https://open.spotify.com/404#html:scripts,')) {
  const [script, onload] = myScripts()
  document.write(decodeURIComponent(document.location.hash.split('#html:scripts,')[1]))
  window.setTimeout(function () {
    eval(script.join('\n') + '\n' + onload.join('\n'))
  }, 1000)
} else if (!isFirefox && document.location.href.startsWith('https://open.spotify.com/405#html,')) {
  document.write(decodeURIComponent(document.location.hash.split('#html,')[1]))
} else {
  loadCache()
  mainIv = window.setInterval(main, 2000)
  window.addEventListener('resize', onResize)
}
