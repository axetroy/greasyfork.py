<!DOCTYPE html>
<html lang="en">
<head>
<script>window.NREUM||(NREUM={});NREUM.info={"beacon":"bam.nr-data.net","errorBeacon":"bam.nr-data.net","licenseKey":"2a000a1c4d","applicationID":"3221391","transactionName":"ewpeFRRWXVQDFxcSBUoMQBUVFkJQCRJnAglcAA==","queueTime":0,"applicationTime":47,"agent":""}</script>
<script>window.NREUM||(NREUM={}),__nr_require=function(e,n,t){function r(t){if(!n[t]){var o=n[t]={exports:{}};e[t][0].call(o.exports,function(n){var o=e[t][1][n];return r(o||n)},o,o.exports)}return n[t].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<t.length;o++)r(t[o]);return r}({1:[function(e,n,t){function r(){}function o(e,n,t){return function(){return i(e,[c.now()].concat(u(arguments)),n?null:this,t),n?void 0:this}}var i=e("handle"),a=e(3),u=e(4),f=e("ee").get("tracer"),c=e("loader"),s=NREUM;"undefined"==typeof window.newrelic&&(newrelic=s);var p=["setPageViewName","setCustomAttribute","setErrorHandler","finished","addToTrace","inlineHit","addRelease"],d="api-",l=d+"ixn-";a(p,function(e,n){s[n]=o(d+n,!0,"api")}),s.addPageAction=o(d+"addPageAction",!0),s.setCurrentRouteName=o(d+"routeName",!0),n.exports=newrelic,s.interaction=function(){return(new r).get()};var m=r.prototype={createTracer:function(e,n){var t={},r=this,o="function"==typeof n;return i(l+"tracer",[c.now(),e,t],r),function(){if(f.emit((o?"":"no-")+"fn-start",[c.now(),r,o],t),o)try{return n.apply(this,arguments)}catch(e){throw f.emit("fn-err",[arguments,this,e],t),e}finally{f.emit("fn-end",[c.now()],t)}}}};a("actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","),function(e,n){m[n]=o(l+n)}),newrelic.noticeError=function(e,n){"string"==typeof e&&(e=new Error(e)),i("err",[e,c.now(),!1,n])}},{}],2:[function(e,n,t){function r(e,n){if(!o)return!1;if(e!==o)return!1;if(!n)return!0;if(!i)return!1;for(var t=i.split("."),r=n.split("."),a=0;a<r.length;a++)if(r[a]!==t[a])return!1;return!0}var o=null,i=null,a=/Version\/(\S+)\s+Safari/;if(navigator.userAgent){var u=navigator.userAgent,f=u.match(a);f&&u.indexOf("Chrome")===-1&&u.indexOf("Chromium")===-1&&(o="Safari",i=f[1])}n.exports={agent:o,version:i,match:r}},{}],3:[function(e,n,t){function r(e,n){var t=[],r="",i=0;for(r in e)o.call(e,r)&&(t[i]=n(r,e[r]),i+=1);return t}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],4:[function(e,n,t){function r(e,n,t){n||(n=0),"undefined"==typeof t&&(t=e?e.length:0);for(var r=-1,o=t-n||0,i=Array(o<0?0:o);++r<o;)i[r]=e[n+r];return i}n.exports=r},{}],5:[function(e,n,t){n.exports={exists:"undefined"!=typeof window.performance&&window.performance.timing&&"undefined"!=typeof window.performance.timing.navigationStart}},{}],ee:[function(e,n,t){function r(){}function o(e){function n(e){return e&&e instanceof r?e:e?f(e,u,i):i()}function t(t,r,o,i){if(!d.aborted||i){e&&e(t,r,o);for(var a=n(o),u=v(t),f=u.length,c=0;c<f;c++)u[c].apply(a,r);var p=s[y[t]];return p&&p.push([b,t,r,a]),a}}function l(e,n){h[e]=v(e).concat(n)}function m(e,n){var t=h[e];if(t)for(var r=0;r<t.length;r++)t[r]===n&&t.splice(r,1)}function v(e){return h[e]||[]}function g(e){return p[e]=p[e]||o(t)}function w(e,n){c(e,function(e,t){n=n||"feature",y[t]=n,n in s||(s[n]=[])})}var h={},y={},b={on:l,addEventListener:l,removeEventListener:m,emit:t,get:g,listeners:v,context:n,buffer:w,abort:a,aborted:!1};return b}function i(){return new r}function a(){(s.api||s.feature)&&(d.aborted=!0,s=d.backlog={})}var u="nr@context",f=e("gos"),c=e(3),s={},p={},d=n.exports=o();d.backlog=s},{}],gos:[function(e,n,t){function r(e,n,t){if(o.call(e,n))return e[n];var r=t();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(e,n,{value:r,writable:!0,enumerable:!1}),r}catch(i){}return e[n]=r,r}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],handle:[function(e,n,t){function r(e,n,t,r){o.buffer([e],r),o.emit(e,n,t)}var o=e("ee").get("handle");n.exports=r,r.ee=o},{}],id:[function(e,n,t){function r(e){var n=typeof e;return!e||"object"!==n&&"function"!==n?-1:e===window?0:a(e,i,function(){return o++})}var o=1,i="nr@id",a=e("gos");n.exports=r},{}],loader:[function(e,n,t){function r(){if(!E++){var e=x.info=NREUM.info,n=l.getElementsByTagName("script")[0];if(setTimeout(s.abort,3e4),!(e&&e.licenseKey&&e.applicationID&&n))return s.abort();c(y,function(n,t){e[n]||(e[n]=t)}),f("mark",["onload",a()+x.offset],null,"api");var t=l.createElement("script");t.src="https://"+e.agent,n.parentNode.insertBefore(t,n)}}function o(){"complete"===l.readyState&&i()}function i(){f("mark",["domContent",a()+x.offset],null,"api")}function a(){return O.exists&&performance.now?Math.round(performance.now()):(u=Math.max((new Date).getTime(),u))-x.offset}var u=(new Date).getTime(),f=e("handle"),c=e(3),s=e("ee"),p=e(2),d=window,l=d.document,m="addEventListener",v="attachEvent",g=d.XMLHttpRequest,w=g&&g.prototype;NREUM.o={ST:setTimeout,SI:d.setImmediate,CT:clearTimeout,XHR:g,REQ:d.Request,EV:d.Event,PR:d.Promise,MO:d.MutationObserver};var h=""+location,y={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-1123.min.js"},b=g&&w&&w[m]&&!/CriOS/.test(navigator.userAgent),x=n.exports={offset:u,now:a,origin:h,features:{},xhrWrappable:b,userAgent:p};e(1),l[m]?(l[m]("DOMContentLoaded",i,!1),d[m]("load",r,!1)):(l[v]("onreadystatechange",o),d[v]("onload",r)),f("mark",["firstbyte",u],null,"api");var E=0,O=e(5)},{}]},{},["loader"]);</script>
  <title>Hide Threads and Replies by Poster - Source code</title>
  <meta name="description" value="Source code for Hide Threads and Replies by Poster">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" media="all" href="/assets/application-054b726c52577ab6b80a3169406a3628025532bbe15182bac55b9c55a6c817b1.css" />
  <script src="/assets/application-6f3fdf691e17817118bf2825a435cd046555a0562258cd6d2bdc234ffa41c8a5.js"></script>
  <meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="oZPJQk85KvtdlDYG7vsVwuDtz052kpMFGSCuqShPVVHgzzfWPxroRD1ABiJXyskx+kGUqtwFxr4idUcZmazwZA==" />
  <link rel="canonical" href="https://greasyfork.org/en/scripts/25447-hide-threads-and-replies-by-poster/code">
  <link rel="icon" href="/assets/blacklogo16-bc64b9f7afdc9be4cbfa58bdd5fc2e5c098ad4bca3ad513a27b15602083fd5bc.png">
  <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <link rel="alternate" hreflang="x-default" href="/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="ar" href="/ar/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="bg" href="/bg/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="cs" href="/cs/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="da" href="/da/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="de" href="/de/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="el" href="/el/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="en" href="/en/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="es" href="/es/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="fi" href="/fi/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="fr" href="/fr/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="fr-CA" href="/fr-CA/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="he" href="/he/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="hu" href="/hu/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="id" href="/id/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="it" href="/it/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="ja" href="/ja/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="ko" href="/ko/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="nb" href="/nb/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="nl" href="/nl/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="pl" href="/pl/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="pt-BR" href="/pt-BR/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="ro" href="/ro/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="ru" href="/ru/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="sk" href="/sk/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="sv" href="/sv/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="th" href="/th/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="tr" href="/tr/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="uk" href="/uk/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="vi" href="/vi/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="zh-CN" href="/zh-CN/scripts/25447-hide-threads-and-replies-by-poster/code">
      <link rel="alternate" hreflang="zh-TW" href="/zh-TW/scripts/25447-hide-threads-and-replies-by-poster/code">


  <link rel="search" href="/en/opensearch.xml" type="application/opensearchdescription+xml" title="Greasy Fork search" hreflang="en">

  
</head>
<body>

  <header id="main-header">
    <div class="width-constraint">
      <div id="site-name">
        <a href="/en"><img src="/assets/blacklogo96-e0c2c76180916332b7516ad47e1e206b42d131d36ff4afe98da3b1ba61fd5d6c.png" alt=""></a>
        <div id="site-name-text">
          <h1><a href="/en">Greasy Fork</a></h1>
        </div>
      </div>
      <div id="site-nav">
        <div id="nav-user-info">
            <span class="sign-in-link"><a rel="nofollow" href="/en/users/sign_in?return_to=%2Fen%2Fscripts%2F25447-hide-threads-and-replies-by-poster%2Fcode">Sign in</a></span>

          <form id="language-selector" action="/scripts/25447-hide-threads-and-replies-by-poster/code">
            <select id="language-selector-locale" name="locale">
                  <option data-language-url="/ar/scripts/25447-hide-threads-and-replies-by-poster/code" value="ar">
                    العَرَبِيةُ (ar)
                  </option>
                  <option data-language-url="/bg/scripts/25447-hide-threads-and-replies-by-poster/code" value="bg">
                    Български (bg)
                  </option>
                  <option data-language-url="/cs/scripts/25447-hide-threads-and-replies-by-poster/code" value="cs">
                    Čeština (cs)
                  </option>
                  <option data-language-url="/da/scripts/25447-hide-threads-and-replies-by-poster/code" value="da">
                    Dansk (da)
                  </option>
                  <option data-language-url="/de/scripts/25447-hide-threads-and-replies-by-poster/code" value="de">
                    Deutsch (de)
                  </option>
                  <option data-language-url="/el/scripts/25447-hide-threads-and-replies-by-poster/code" value="el">
                    Ελληνικά (el)
                  </option>
                  <option data-language-url="/en/scripts/25447-hide-threads-and-replies-by-poster/code" value="en" selected>
                    English (en)
                  </option>
                  <option data-language-url="/es/scripts/25447-hide-threads-and-replies-by-poster/code" value="es">
                    Español (es)
                  </option>
                  <option data-language-url="/fi/scripts/25447-hide-threads-and-replies-by-poster/code" value="fi">
                    Suomi (fi)
                  </option>
                  <option data-language-url="/fr/scripts/25447-hide-threads-and-replies-by-poster/code" value="fr">
                    Français (fr)
                  </option>
                  <option data-language-url="/fr-CA/scripts/25447-hide-threads-and-replies-by-poster/code" value="fr-CA">
                    Français canadien (fr-CA)
                  </option>
                  <option data-language-url="/he/scripts/25447-hide-threads-and-replies-by-poster/code" value="he">
                    עברית (he)
                  </option>
                  <option data-language-url="/hu/scripts/25447-hide-threads-and-replies-by-poster/code" value="hu">
                    Magyar (hu)
                  </option>
                  <option data-language-url="/id/scripts/25447-hide-threads-and-replies-by-poster/code" value="id">
                    Bahasa Indonesia (id)
                  </option>
                  <option data-language-url="/it/scripts/25447-hide-threads-and-replies-by-poster/code" value="it">
                    Italiano (it)
                  </option>
                  <option data-language-url="/ja/scripts/25447-hide-threads-and-replies-by-poster/code" value="ja">
                    日本語 (ja)
                  </option>
                  <option data-language-url="/ko/scripts/25447-hide-threads-and-replies-by-poster/code" value="ko">
                    한국어 (ko)
                  </option>
                  <option data-language-url="/nb/scripts/25447-hide-threads-and-replies-by-poster/code" value="nb">
                    Bokmål (nb)
                  </option>
                  <option data-language-url="/nl/scripts/25447-hide-threads-and-replies-by-poster/code" value="nl">
                    Nederlands (nl)
                  </option>
                  <option data-language-url="/pl/scripts/25447-hide-threads-and-replies-by-poster/code" value="pl">
                    Polski (pl)
                  </option>
                  <option data-language-url="/pt-BR/scripts/25447-hide-threads-and-replies-by-poster/code" value="pt-BR">
                    Português do Brasil (pt-BR)
                  </option>
                  <option data-language-url="/ro/scripts/25447-hide-threads-and-replies-by-poster/code" value="ro">
                    Română (ro)
                  </option>
                  <option data-language-url="/ru/scripts/25447-hide-threads-and-replies-by-poster/code" value="ru">
                    Русский (ru)
                  </option>
                  <option data-language-url="/sk/scripts/25447-hide-threads-and-replies-by-poster/code" value="sk">
                    Slovenčina (sk)
                  </option>
                  <option data-language-url="/sv/scripts/25447-hide-threads-and-replies-by-poster/code" value="sv">
                    Svenska (sv)
                  </option>
                  <option data-language-url="/th/scripts/25447-hide-threads-and-replies-by-poster/code" value="th">
                    ภาษาไทย (th)
                  </option>
                  <option data-language-url="/tr/scripts/25447-hide-threads-and-replies-by-poster/code" value="tr">
                    Türkçe (tr)
                  </option>
                  <option data-language-url="/uk/scripts/25447-hide-threads-and-replies-by-poster/code" value="uk">
                    Українська (uk)
                  </option>
                  <option data-language-url="/vi/scripts/25447-hide-threads-and-replies-by-poster/code" value="vi">
                    Tiếng Việt (vi)
                  </option>
                  <option data-language-url="/zh-CN/scripts/25447-hide-threads-and-replies-by-poster/code" value="zh-CN">
                    简体中文 (zh-CN)
                  </option>
                  <option data-language-url="/zh-TW/scripts/25447-hide-threads-and-replies-by-poster/code" value="zh-TW">
                    繁體中文 (zh-TW)
                  </option>
              <option value="help">Help us translate!</option>
            </select><input id="language-selector-submit" type="submit" value="→">
            <script>
              /* submit is handled by js if enabled */
              document.getElementById("language-selector-submit").style.display = "none"
            </script>
          </form>
        </div>
        <nav>
          <li class="scripts-index-link"><a href="/en/scripts">Scripts</a></li>
            <li class="forum-link"><a href="/en/forum/">Forum</a></li>
          <li class="help-link"><a href="/en/help">Help</a></li>
          <li class="with-submenu">
            <a href="#" onclick="return false">More</a>
            <nav>
              <li><a href="/en/search">Advanced search</a></li>
              <li><a href="/en/users">User list</a></li>
              <li><a href="/en/scripts/libraries">Libraries</a></li>
              <li><a href="/en/moderator_actions">Moderator log</a></li>
            </nav>
          </li>
        </nav>
      </div>
    </div>
  </header>

  <div class="width-constraint">

    	<section id="script-info">
		<ul id="script-links" class="tabs">
			<li><a href="/en/scripts/25447-hide-threads-and-replies-by-poster"><span>Info</span></a></li>
			<li class="current"><span>Code</span></li>
			<li><a href="/en/scripts/25447-hide-threads-and-replies-by-poster/versions"><span>History</span></a></li>
			<li><a href="/en/scripts/25447-hide-threads-and-replies-by-poster/feedback"><span>Feedback (0)</span></a></li>
			<li><a href="/en/scripts/25447-hide-threads-and-replies-by-poster/stats"><span>Stats</span></a></li>
		</ul>
		<header>
			<h2>Hide Threads and Replies by Poster</h2>
			<p id="script-description">see https://greasyfork.org/en/scripts/29925-hide-threads-and-replies-by-poster.</p>
		</header>
		<div id="script-content">
			
  <p>
      This script has been deleted and replaced by <a href="/en/scripts/29925-hide-threads-and-replies-by-poster">Hide Threads and Replies by Poster</a>.
  </p>


<div id="script-feedback-suggestion">
    <a rel="nofollow" href="/en/forum/post/discussion?script=25447">Ask a question, post a review</a>, or <a rel="nofollow" href="/en/scripts/25447-hide-threads-and-replies-by-poster/report">report the script</a>.
</div>


<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>

<pre class="prettyprint lang-js">// ==UserScript==
// @name	Hide Threads and Replies by Poster
// @namespace	daniel.church@btinternet.com
// @description	see https://greasyfork.org/en/scripts/29925-hide-threads-and-replies-by-poster.
// @include	https://www.warlight.net/*
// @version	2
// @grant	none
// @license	n/a
// ==/UserScript==
//see https://greasyfork.org/en/scripts/29925-hide-threads-and-replies-by-poster.</pre>

		</div>
	</section>

  </div>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-48197018-1', 'greasyfork.org');
      ga('send', 'pageview');

    </script>

</body>
</html>

