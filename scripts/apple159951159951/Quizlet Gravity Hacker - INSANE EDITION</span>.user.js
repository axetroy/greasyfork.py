<!DOCTYPE html>
<html lang="en">
<head>
<script>window.NREUM||(NREUM={});NREUM.info={"beacon":"bam.nr-data.net","errorBeacon":"bam.nr-data.net","licenseKey":"2a000a1c4d","applicationID":"3221391","transactionName":"ewpeFRRWXVQDFxcSBUoMQBUVFkJQCRJnAglcAA==","queueTime":0,"applicationTime":26,"agent":""}</script>
<script>window.NREUM||(NREUM={}),__nr_require=function(e,t,n){function r(n){if(!t[n]){var o=t[n]={exports:{}};e[n][0].call(o.exports,function(t){var o=e[n][1][t];return r(o||t)},o,o.exports)}return t[n].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<n.length;o++)r(n[o]);return r}({1:[function(e,t,n){function r(){}function o(e,t,n){return function(){return i(e,[f.now()].concat(u(arguments)),t?null:this,n),t?void 0:this}}var i=e("handle"),a=e(2),u=e(3),c=e("ee").get("tracer"),f=e("loader"),s=NREUM;"undefined"==typeof window.newrelic&&(newrelic=s);var p=["setPageViewName","setCustomAttribute","setErrorHandler","finished","addToTrace","inlineHit","addRelease"],d="api-",l=d+"ixn-";a(p,function(e,t){s[t]=o(d+t,!0,"api")}),s.addPageAction=o(d+"addPageAction",!0),s.setCurrentRouteName=o(d+"routeName",!0),t.exports=newrelic,s.interaction=function(){return(new r).get()};var m=r.prototype={createTracer:function(e,t){var n={},r=this,o="function"==typeof t;return i(l+"tracer",[f.now(),e,n],r),function(){if(c.emit((o?"":"no-")+"fn-start",[f.now(),r,o],n),o)try{return t.apply(this,arguments)}catch(e){throw c.emit("fn-err",[arguments,this,e],n),e}finally{c.emit("fn-end",[f.now()],n)}}}};a("setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","),function(e,t){m[t]=o(l+t)}),newrelic.noticeError=function(e){"string"==typeof e&&(e=new Error(e)),i("err",[e,f.now()])}},{}],2:[function(e,t,n){function r(e,t){var n=[],r="",i=0;for(r in e)o.call(e,r)&&(n[i]=t(r,e[r]),i+=1);return n}var o=Object.prototype.hasOwnProperty;t.exports=r},{}],3:[function(e,t,n){function r(e,t,n){t||(t=0),"undefined"==typeof n&&(n=e?e.length:0);for(var r=-1,o=n-t||0,i=Array(o<0?0:o);++r<o;)i[r]=e[t+r];return i}t.exports=r},{}],4:[function(e,t,n){t.exports={exists:"undefined"!=typeof window.performance&&window.performance.timing&&"undefined"!=typeof window.performance.timing.navigationStart}},{}],ee:[function(e,t,n){function r(){}function o(e){function t(e){return e&&e instanceof r?e:e?c(e,u,i):i()}function n(n,r,o,i){if(!d.aborted||i){e&&e(n,r,o);for(var a=t(o),u=m(n),c=u.length,f=0;f<c;f++)u[f].apply(a,r);var p=s[y[n]];return p&&p.push([b,n,r,a]),a}}function l(e,t){v[e]=m(e).concat(t)}function m(e){return v[e]||[]}function w(e){return p[e]=p[e]||o(n)}function g(e,t){f(e,function(e,n){t=t||"feature",y[n]=t,t in s||(s[t]=[])})}var v={},y={},b={on:l,emit:n,get:w,listeners:m,context:t,buffer:g,abort:a,aborted:!1};return b}function i(){return new r}function a(){(s.api||s.feature)&&(d.aborted=!0,s=d.backlog={})}var u="nr@context",c=e("gos"),f=e(2),s={},p={},d=t.exports=o();d.backlog=s},{}],gos:[function(e,t,n){function r(e,t,n){if(o.call(e,t))return e[t];var r=n();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(e,t,{value:r,writable:!0,enumerable:!1}),r}catch(i){}return e[t]=r,r}var o=Object.prototype.hasOwnProperty;t.exports=r},{}],handle:[function(e,t,n){function r(e,t,n,r){o.buffer([e],r),o.emit(e,t,n)}var o=e("ee").get("handle");t.exports=r,r.ee=o},{}],id:[function(e,t,n){function r(e){var t=typeof e;return!e||"object"!==t&&"function"!==t?-1:e===window?0:a(e,i,function(){return o++})}var o=1,i="nr@id",a=e("gos");t.exports=r},{}],loader:[function(e,t,n){function r(){if(!x++){var e=h.info=NREUM.info,t=d.getElementsByTagName("script")[0];if(setTimeout(s.abort,3e4),!(e&&e.licenseKey&&e.applicationID&&t))return s.abort();f(y,function(t,n){e[t]||(e[t]=n)}),c("mark",["onload",a()+h.offset],null,"api");var n=d.createElement("script");n.src="https://"+e.agent,t.parentNode.insertBefore(n,t)}}function o(){"complete"===d.readyState&&i()}function i(){c("mark",["domContent",a()+h.offset],null,"api")}function a(){return E.exists&&performance.now?Math.round(performance.now()):(u=Math.max((new Date).getTime(),u))-h.offset}var u=(new Date).getTime(),c=e("handle"),f=e(2),s=e("ee"),p=window,d=p.document,l="addEventListener",m="attachEvent",w=p.XMLHttpRequest,g=w&&w.prototype;NREUM.o={ST:setTimeout,SI:p.setImmediate,CT:clearTimeout,XHR:w,REQ:p.Request,EV:p.Event,PR:p.Promise,MO:p.MutationObserver};var v=""+location,y={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-1071.min.js"},b=w&&g&&g[l]&&!/CriOS/.test(navigator.userAgent),h=t.exports={offset:u,now:a,origin:v,features:{},xhrWrappable:b};e(1),d[l]?(d[l]("DOMContentLoaded",i,!1),p[l]("load",r,!1)):(d[m]("onreadystatechange",o),p[m]("onload",r)),c("mark",["firstbyte",u],null,"api");var x=0,E=e(4)},{}]},{},["loader"]);</script>
	<title>Quizlet Gravity Hacker - INSANE EDITION - Source code</title>
	<meta name="description" value="Source code for Quizlet Gravity Hacker - INSANE EDITION">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" media="all" href="/assets/application-fc7f62ff611ee8e1e4f4337b3a50e07957df96d59875321b843b1f08bb338e60.css" />
	<script src="/assets/application-1f026f9e0b5db241bd9d15edfcc2034a53c83d5a8f2394e446733548d647a19a.js"></script>
	<meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="uMjyVke4YaVWpUVtSkAiegd5ArW0YFG/AQTi0X/oRHecFXySHzdUUaxp/cG18l45YddX8ChXm2taVTJCWqsTCg==" />
	<link rel="canonical" href="https://greasyfork.org/en/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
	<link rel="icon" href="/assets/blacklogo16-bc64b9f7afdc9be4cbfa58bdd5fc2e5c098ad4bca3ad513a27b15602083fd5bc.png">
	<link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
		<link rel="alternate" hreflang="x-default" href="/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="ar" href="/ar/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="bg" href="/bg/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="cs" href="/cs/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="da" href="/da/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="de" href="/de/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="el" href="/el/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="en" href="/en/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="es" href="/es/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="fi" href="/fi/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="fr" href="/fr/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="fr-CA" href="/fr-CA/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="he" href="/he/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="hu" href="/hu/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="id" href="/id/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="it" href="/it/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="ja" href="/ja/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="ko" href="/ko/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="nb" href="/nb/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="nl" href="/nl/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="pl" href="/pl/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="pt-BR" href="/pt-BR/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="ro" href="/ro/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="ru" href="/ru/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="sk" href="/sk/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="sv" href="/sv/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="th" href="/th/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="tr" href="/tr/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="uk" href="/uk/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="vi" href="/vi/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="zh-CN" href="/zh-CN/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
			<link rel="alternate" hreflang="zh-TW" href="/zh-TW/scripts/372132-quizlet-gravity-hacker-insane-edition/code">


	<link rel="search" href="/en/opensearch.xml" type="application/opensearchdescription+xml" title="Greasy Fork search" hreflang="en">

	


</head>
<body>


	<header id="main-header">
		<div class="width-constraint">
			<div id="site-name">
				<a href="/en"><img src="/assets/blacklogo96-e0c2c76180916332b7516ad47e1e206b42d131d36ff4afe98da3b1ba61fd5d6c.png" alt=""></a>
				<div id="site-name-text">
						<h1><a href="/en">Greasy Fork</a></h1>
						<p class="subtitle">Shined up real nice.</p>
				</div>
			</div>
			<div id="site-nav">
				<div id="nav-user-info">
						<span class="sign-in-link"><a rel="nofollow" href="/en/users/sign_in?return_to=%2Fen%2Fscripts%2F372132-quizlet-gravity-hacker-insane-edition%2Fcode">Sign in</a></span>

					<form id="language-selector" action="/scripts/372132-quizlet-gravity-hacker-insane-edition/code">
						<select id="language-selector-locale" name="locale">
									<option data-language-url="/ar/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="ar">
										العَرَبِيةُ (ar)
									</option>
									<option data-language-url="/bg/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="bg">
										Български (bg)
									</option>
									<option data-language-url="/cs/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="cs">
										Čeština (cs)
									</option>
									<option data-language-url="/da/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="da">
										Dansk (da)
									</option>
									<option data-language-url="/de/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="de">
										Deutsch (de)
									</option>
									<option data-language-url="/el/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="el">
										Ελληνικά (el)
									</option>
									<option data-language-url="/en/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="en" selected>
										English (en)
									</option>
									<option data-language-url="/es/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="es">
										Español (es)
									</option>
									<option data-language-url="/fi/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="fi">
										Suomi (fi)
									</option>
									<option data-language-url="/fr/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="fr">
										Français (fr)
									</option>
									<option data-language-url="/fr-CA/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="fr-CA">
										Français canadien (fr-CA)
									</option>
									<option data-language-url="/he/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="he">
										עברית (he)
									</option>
									<option data-language-url="/hu/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="hu">
										Magyar (hu)
									</option>
									<option data-language-url="/id/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="id">
										Bahasa Indonesia (id)
									</option>
									<option data-language-url="/it/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="it">
										Italiano (it)
									</option>
									<option data-language-url="/ja/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="ja">
										日本語 (ja)
									</option>
									<option data-language-url="/ko/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="ko">
										한국어 (ko)
									</option>
									<option data-language-url="/nb/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="nb">
										Bokmål (nb)
									</option>
									<option data-language-url="/nl/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="nl">
										Nederlands (nl)
									</option>
									<option data-language-url="/pl/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="pl">
										Polski (pl)
									</option>
									<option data-language-url="/pt-BR/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="pt-BR">
										Português do Brasil (pt-BR)
									</option>
									<option data-language-url="/ro/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="ro">
										Română (ro)
									</option>
									<option data-language-url="/ru/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="ru">
										Русский (ru)
									</option>
									<option data-language-url="/sk/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="sk">
										Slovenčina (sk)
									</option>
									<option data-language-url="/sv/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="sv">
										Svenska (sv)
									</option>
									<option data-language-url="/th/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="th">
										ภาษาไทย (th)
									</option>
									<option data-language-url="/tr/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="tr">
										Türkçe (tr)
									</option>
									<option data-language-url="/uk/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="uk">
										Українська (uk)
									</option>
									<option data-language-url="/vi/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="vi">
										Tiếng Việt (vi)
									</option>
									<option data-language-url="/zh-CN/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="zh-CN">
										简体中文 (zh-CN)
									</option>
									<option data-language-url="/zh-TW/scripts/372132-quizlet-gravity-hacker-insane-edition/code" value="zh-TW">
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
			<li><a href="/en/scripts/372132-quizlet-gravity-hacker-insane-edition"><span>Info</span></a></li>
			<li class="current"><span>Code</span></li>
			<li><a href="/en/scripts/372132-quizlet-gravity-hacker-insane-edition/versions"><span>History</span></a></li>
			<li><a href="/en/scripts/372132-quizlet-gravity-hacker-insane-edition/feedback"><span>Feedback (0)</span></a></li>
			<li><a href="/en/scripts/372132-quizlet-gravity-hacker-insane-edition/stats"><span>Stats</span></a></li>
		</ul>
		<header>
			<h2>Quizlet Gravity Hacker - INSANE EDITION</h2>
			<p id="script-description">Hold the spacebar to automatically get the correct answers</p>
		</header>
		<div id="script-content">
			
<link rel="stylesheet" media="all" href="/assets/coderay-f4e12c6472ebad4dd65d169da09a20b0da0347ca10708acc32a3cf853f231b92.css" />

			<div id="install-area">
				<a class="install-link" data-ping-url="/scripts/372132-quizlet-gravity-hacker-insane-edition/install-ping" data-is-previous-version="false" data-previous-version-warning="This is not the latest version of this script. If you install it, you will never be updated to a newer version. Install anyway?" rel="nofollow" data-script-name="Quizlet Gravity Hacker - INSANE EDITION" data-script-namespace="Ray D. Adams" data-script-version="1.0" data-update-label="Update to version 1.0" data-downgrade-label="Downgrade to version 1.0" data-reinstall-label="Reinstall version 1.0" href="/scripts/372132-quizlet-gravity-hacker-insane-edition/code/Quizlet%20Gravity%20Hacker%20-%20INSANE%20EDITION.user.js">Install this script</a><a class="install-help-link" title="How to install" rel="nofollow" href="/en/help/installing-user-scripts">?</a>
			</div>




<div id="script-feedback-suggestion">
		<a rel="nofollow" href="/en/forum/post/discussion?script=372132">Ask a question, post a review, or report the script on Greasy Fork.</a>
</div>



<div id="code-container" class="max-screen-height">
		<table class="CodeRay"><tr>
  <td class="line-numbers"><pre><a href="#n1" name="n1">1</a>
<a href="#n2" name="n2">2</a>
<a href="#n3" name="n3">3</a>
<a href="#n4" name="n4">4</a>
<a href="#n5" name="n5">5</a>
<a href="#n6" name="n6">6</a>
<a href="#n7" name="n7">7</a>
<a href="#n8" name="n8">8</a>
<a href="#n9" name="n9">9</a>
<strong><a href="#n10" name="n10">10</a></strong>
<a href="#n11" name="n11">11</a>
<a href="#n12" name="n12">12</a>
<a href="#n13" name="n13">13</a>
<a href="#n14" name="n14">14</a>
<a href="#n15" name="n15">15</a>
<a href="#n16" name="n16">16</a>
<a href="#n17" name="n17">17</a>
<a href="#n18" name="n18">18</a>
<a href="#n19" name="n19">19</a>
<strong><a href="#n20" name="n20">20</a></strong>
<a href="#n21" name="n21">21</a>
<a href="#n22" name="n22">22</a>
<a href="#n23" name="n23">23</a>
<a href="#n24" name="n24">24</a>
<a href="#n25" name="n25">25</a>
<a href="#n26" name="n26">26</a>
<a href="#n27" name="n27">27</a>
<a href="#n28" name="n28">28</a>
<a href="#n29" name="n29">29</a>
<strong><a href="#n30" name="n30">30</a></strong>
<a href="#n31" name="n31">31</a>
<a href="#n32" name="n32">32</a>
<a href="#n33" name="n33">33</a>
<a href="#n34" name="n34">34</a>
<a href="#n35" name="n35">35</a>
<a href="#n36" name="n36">36</a>
<a href="#n37" name="n37">37</a>
<a href="#n38" name="n38">38</a>
<a href="#n39" name="n39">39</a>
<strong><a href="#n40" name="n40">40</a></strong>
<a href="#n41" name="n41">41</a>
<a href="#n42" name="n42">42</a>
<a href="#n43" name="n43">43</a>
<a href="#n44" name="n44">44</a>
<a href="#n45" name="n45">45</a>
<a href="#n46" name="n46">46</a>
<a href="#n47" name="n47">47</a>
<a href="#n48" name="n48">48</a>
<a href="#n49" name="n49">49</a>
<strong><a href="#n50" name="n50">50</a></strong>
<a href="#n51" name="n51">51</a>
<a href="#n52" name="n52">52</a>
<a href="#n53" name="n53">53</a>
<a href="#n54" name="n54">54</a>
<a href="#n55" name="n55">55</a>
<a href="#n56" name="n56">56</a>
<a href="#n57" name="n57">57</a>
<a href="#n58" name="n58">58</a>
<a href="#n59" name="n59">59</a>
<strong><a href="#n60" name="n60">60</a></strong>
<a href="#n61" name="n61">61</a>
<a href="#n62" name="n62">62</a>
<a href="#n63" name="n63">63</a>
<a href="#n64" name="n64">64</a>
<a href="#n65" name="n65">65</a>
<a href="#n66" name="n66">66</a>
<a href="#n67" name="n67">67</a>
<a href="#n68" name="n68">68</a>
<a href="#n69" name="n69">69</a>
<strong><a href="#n70" name="n70">70</a></strong>
<a href="#n71" name="n71">71</a>
<a href="#n72" name="n72">72</a>
<a href="#n73" name="n73">73</a>
<a href="#n74" name="n74">74</a>
<a href="#n75" name="n75">75</a>
<a href="#n76" name="n76">76</a>
<a href="#n77" name="n77">77</a>
<a href="#n78" name="n78">78</a>
<a href="#n79" name="n79">79</a>
<strong><a href="#n80" name="n80">80</a></strong>
<a href="#n81" name="n81">81</a>
<a href="#n82" name="n82">82</a>
<a href="#n83" name="n83">83</a>
<a href="#n84" name="n84">84</a>
<a href="#n85" name="n85">85</a>
<a href="#n86" name="n86">86</a>
<a href="#n87" name="n87">87</a>
<a href="#n88" name="n88">88</a>
<a href="#n89" name="n89">89</a>
<strong><a href="#n90" name="n90">90</a></strong>
<a href="#n91" name="n91">91</a>
<a href="#n92" name="n92">92</a>
<a href="#n93" name="n93">93</a>
<a href="#n94" name="n94">94</a>
<a href="#n95" name="n95">95</a>
<a href="#n96" name="n96">96</a>
<a href="#n97" name="n97">97</a>
<a href="#n98" name="n98">98</a>
<a href="#n99" name="n99">99</a>
<strong><a href="#n100" name="n100">100</a></strong>
<a href="#n101" name="n101">101</a>
<a href="#n102" name="n102">102</a>
<a href="#n103" name="n103">103</a>
<a href="#n104" name="n104">104</a>
<a href="#n105" name="n105">105</a>
<a href="#n106" name="n106">106</a>
<a href="#n107" name="n107">107</a>
<a href="#n108" name="n108">108</a>
<a href="#n109" name="n109">109</a>
<strong><a href="#n110" name="n110">110</a></strong>
<a href="#n111" name="n111">111</a>
<a href="#n112" name="n112">112</a>
<a href="#n113" name="n113">113</a>
<a href="#n114" name="n114">114</a>
<a href="#n115" name="n115">115</a>
<a href="#n116" name="n116">116</a>
<a href="#n117" name="n117">117</a>
<a href="#n118" name="n118">118</a>
<a href="#n119" name="n119">119</a>
<strong><a href="#n120" name="n120">120</a></strong>
<a href="#n121" name="n121">121</a>
<a href="#n122" name="n122">122</a>
<a href="#n123" name="n123">123</a>
<a href="#n124" name="n124">124</a>
<a href="#n125" name="n125">125</a>
<a href="#n126" name="n126">126</a>
<a href="#n127" name="n127">127</a>
<a href="#n128" name="n128">128</a>
<a href="#n129" name="n129">129</a>
<strong><a href="#n130" name="n130">130</a></strong>
<a href="#n131" name="n131">131</a>
<a href="#n132" name="n132">132</a>
<a href="#n133" name="n133">133</a>
<a href="#n134" name="n134">134</a>
<a href="#n135" name="n135">135</a>
<a href="#n136" name="n136">136</a>
<a href="#n137" name="n137">137</a>
<a href="#n138" name="n138">138</a>
<a href="#n139" name="n139">139</a>
<strong><a href="#n140" name="n140">140</a></strong>
<a href="#n141" name="n141">141</a>
<a href="#n142" name="n142">142</a>
<a href="#n143" name="n143">143</a>
<a href="#n144" name="n144">144</a>
<a href="#n145" name="n145">145</a>
<a href="#n146" name="n146">146</a>
<a href="#n147" name="n147">147</a>
<a href="#n148" name="n148">148</a>
<a href="#n149" name="n149">149</a>
<strong><a href="#n150" name="n150">150</a></strong>
<a href="#n151" name="n151">151</a>
<a href="#n152" name="n152">152</a>
<a href="#n153" name="n153">153</a>
<a href="#n154" name="n154">154</a>
<a href="#n155" name="n155">155</a>
<a href="#n156" name="n156">156</a>
<a href="#n157" name="n157">157</a>
<a href="#n158" name="n158">158</a>
<a href="#n159" name="n159">159</a>
<strong><a href="#n160" name="n160">160</a></strong>
<a href="#n161" name="n161">161</a>
<a href="#n162" name="n162">162</a>
<a href="#n163" name="n163">163</a>
<a href="#n164" name="n164">164</a>
<a href="#n165" name="n165">165</a>
<a href="#n166" name="n166">166</a>
<a href="#n167" name="n167">167</a>
<a href="#n168" name="n168">168</a>
<a href="#n169" name="n169">169</a>
<strong><a href="#n170" name="n170">170</a></strong>
<a href="#n171" name="n171">171</a>
<a href="#n172" name="n172">172</a>
<a href="#n173" name="n173">173</a>
<a href="#n174" name="n174">174</a>
<a href="#n175" name="n175">175</a>
<a href="#n176" name="n176">176</a>
<a href="#n177" name="n177">177</a>
<a href="#n178" name="n178">178</a>
<a href="#n179" name="n179">179</a>
<strong><a href="#n180" name="n180">180</a></strong>
<a href="#n181" name="n181">181</a>
<a href="#n182" name="n182">182</a>
<a href="#n183" name="n183">183</a>
<a href="#n184" name="n184">184</a>
<a href="#n185" name="n185">185</a>
<a href="#n186" name="n186">186</a>
<a href="#n187" name="n187">187</a>
<a href="#n188" name="n188">188</a>
<a href="#n189" name="n189">189</a>
<strong><a href="#n190" name="n190">190</a></strong>
<a href="#n191" name="n191">191</a>
<a href="#n192" name="n192">192</a>
<a href="#n193" name="n193">193</a>
<a href="#n194" name="n194">194</a>
<a href="#n195" name="n195">195</a>
<a href="#n196" name="n196">196</a>
<a href="#n197" name="n197">197</a>
<a href="#n198" name="n198">198</a>
<a href="#n199" name="n199">199</a>
<strong><a href="#n200" name="n200">200</a></strong>
<a href="#n201" name="n201">201</a>
<a href="#n202" name="n202">202</a>
<a href="#n203" name="n203">203</a>
<a href="#n204" name="n204">204</a>
<a href="#n205" name="n205">205</a>
<a href="#n206" name="n206">206</a>
<a href="#n207" name="n207">207</a>
<a href="#n208" name="n208">208</a>
<a href="#n209" name="n209">209</a>
<strong><a href="#n210" name="n210">210</a></strong>
<a href="#n211" name="n211">211</a>
<a href="#n212" name="n212">212</a>
<a href="#n213" name="n213">213</a>
<a href="#n214" name="n214">214</a>
<a href="#n215" name="n215">215</a>
<a href="#n216" name="n216">216</a>
<a href="#n217" name="n217">217</a>
<a href="#n218" name="n218">218</a>
<a href="#n219" name="n219">219</a>
<strong><a href="#n220" name="n220">220</a></strong>
<a href="#n221" name="n221">221</a>
<a href="#n222" name="n222">222</a>
<a href="#n223" name="n223">223</a>
<a href="#n224" name="n224">224</a>
<a href="#n225" name="n225">225</a>
<a href="#n226" name="n226">226</a>
<a href="#n227" name="n227">227</a>
<a href="#n228" name="n228">228</a>
<a href="#n229" name="n229">229</a>
<strong><a href="#n230" name="n230">230</a></strong>
<a href="#n231" name="n231">231</a>
<a href="#n232" name="n232">232</a>
<a href="#n233" name="n233">233</a>
<a href="#n234" name="n234">234</a>
<a href="#n235" name="n235">235</a>
<a href="#n236" name="n236">236</a>
<a href="#n237" name="n237">237</a>
<a href="#n238" name="n238">238</a>
<a href="#n239" name="n239">239</a>
<strong><a href="#n240" name="n240">240</a></strong>
<a href="#n241" name="n241">241</a>
<a href="#n242" name="n242">242</a>
<a href="#n243" name="n243">243</a>
<a href="#n244" name="n244">244</a>
<a href="#n245" name="n245">245</a>
<a href="#n246" name="n246">246</a>
<a href="#n247" name="n247">247</a>
<a href="#n248" name="n248">248</a>
<a href="#n249" name="n249">249</a>
<strong><a href="#n250" name="n250">250</a></strong>
<a href="#n251" name="n251">251</a>
<a href="#n252" name="n252">252</a>
<a href="#n253" name="n253">253</a>
<a href="#n254" name="n254">254</a>
<a href="#n255" name="n255">255</a>
<a href="#n256" name="n256">256</a>
<a href="#n257" name="n257">257</a>
<a href="#n258" name="n258">258</a>
<a href="#n259" name="n259">259</a>
<strong><a href="#n260" name="n260">260</a></strong>
<a href="#n261" name="n261">261</a>
<a href="#n262" name="n262">262</a>
<a href="#n263" name="n263">263</a>
<a href="#n264" name="n264">264</a>
<a href="#n265" name="n265">265</a>
<a href="#n266" name="n266">266</a>
<a href="#n267" name="n267">267</a>
<a href="#n268" name="n268">268</a>
<a href="#n269" name="n269">269</a>
<strong><a href="#n270" name="n270">270</a></strong>
<a href="#n271" name="n271">271</a>
<a href="#n272" name="n272">272</a>
<a href="#n273" name="n273">273</a>
<a href="#n274" name="n274">274</a>
<a href="#n275" name="n275">275</a>
<a href="#n276" name="n276">276</a>
<a href="#n277" name="n277">277</a>
<a href="#n278" name="n278">278</a>
<a href="#n279" name="n279">279</a>
<strong><a href="#n280" name="n280">280</a></strong>
<a href="#n281" name="n281">281</a>
<a href="#n282" name="n282">282</a>
<a href="#n283" name="n283">283</a>
<a href="#n284" name="n284">284</a>
<a href="#n285" name="n285">285</a>
<a href="#n286" name="n286">286</a>
<a href="#n287" name="n287">287</a>
<a href="#n288" name="n288">288</a>
<a href="#n289" name="n289">289</a>
<strong><a href="#n290" name="n290">290</a></strong>
<a href="#n291" name="n291">291</a>
<a href="#n292" name="n292">292</a>
<a href="#n293" name="n293">293</a>
<a href="#n294" name="n294">294</a>
<a href="#n295" name="n295">295</a>
<a href="#n296" name="n296">296</a>
<a href="#n297" name="n297">297</a>
<a href="#n298" name="n298">298</a>
<a href="#n299" name="n299">299</a>
<strong><a href="#n300" name="n300">300</a></strong>
<a href="#n301" name="n301">301</a>
<a href="#n302" name="n302">302</a>
<a href="#n303" name="n303">303</a>
<a href="#n304" name="n304">304</a>
<a href="#n305" name="n305">305</a>
<a href="#n306" name="n306">306</a>
<a href="#n307" name="n307">307</a>
<a href="#n308" name="n308">308</a>
<a href="#n309" name="n309">309</a>
<strong><a href="#n310" name="n310">310</a></strong>
<a href="#n311" name="n311">311</a>
<a href="#n312" name="n312">312</a>
<a href="#n313" name="n313">313</a>
<a href="#n314" name="n314">314</a>
<a href="#n315" name="n315">315</a>
<a href="#n316" name="n316">316</a>
<a href="#n317" name="n317">317</a>
<a href="#n318" name="n318">318</a>
<a href="#n319" name="n319">319</a>
<strong><a href="#n320" name="n320">320</a></strong>
<a href="#n321" name="n321">321</a>
<a href="#n322" name="n322">322</a>
<a href="#n323" name="n323">323</a>
<a href="#n324" name="n324">324</a>
<a href="#n325" name="n325">325</a>
<a href="#n326" name="n326">326</a>
<a href="#n327" name="n327">327</a>
<a href="#n328" name="n328">328</a>
<a href="#n329" name="n329">329</a>
<strong><a href="#n330" name="n330">330</a></strong>
<a href="#n331" name="n331">331</a>
<a href="#n332" name="n332">332</a>
<a href="#n333" name="n333">333</a>
<a href="#n334" name="n334">334</a>
<a href="#n335" name="n335">335</a>
<a href="#n336" name="n336">336</a>
<a href="#n337" name="n337">337</a>
<a href="#n338" name="n338">338</a>
<a href="#n339" name="n339">339</a>
<strong><a href="#n340" name="n340">340</a></strong>
<a href="#n341" name="n341">341</a>
<a href="#n342" name="n342">342</a>
<a href="#n343" name="n343">343</a>
<a href="#n344" name="n344">344</a>
<a href="#n345" name="n345">345</a>
<a href="#n346" name="n346">346</a>
<a href="#n347" name="n347">347</a>
<a href="#n348" name="n348">348</a>
<a href="#n349" name="n349">349</a>
<strong><a href="#n350" name="n350">350</a></strong>
<a href="#n351" name="n351">351</a>
<a href="#n352" name="n352">352</a>
<a href="#n353" name="n353">353</a>
<a href="#n354" name="n354">354</a>
<a href="#n355" name="n355">355</a>
<a href="#n356" name="n356">356</a>
<a href="#n357" name="n357">357</a>
<a href="#n358" name="n358">358</a>
<a href="#n359" name="n359">359</a>
<strong><a href="#n360" name="n360">360</a></strong>
<a href="#n361" name="n361">361</a>
<a href="#n362" name="n362">362</a>
<a href="#n363" name="n363">363</a>
<a href="#n364" name="n364">364</a>
<a href="#n365" name="n365">365</a>
<a href="#n366" name="n366">366</a>
<a href="#n367" name="n367">367</a>
<a href="#n368" name="n368">368</a>
<a href="#n369" name="n369">369</a>
<strong><a href="#n370" name="n370">370</a></strong>
<a href="#n371" name="n371">371</a>
<a href="#n372" name="n372">372</a>
<a href="#n373" name="n373">373</a>
<a href="#n374" name="n374">374</a>
<a href="#n375" name="n375">375</a>
<a href="#n376" name="n376">376</a>
<a href="#n377" name="n377">377</a>
<a href="#n378" name="n378">378</a>
<a href="#n379" name="n379">379</a>
<strong><a href="#n380" name="n380">380</a></strong>
<a href="#n381" name="n381">381</a>
<a href="#n382" name="n382">382</a>
<a href="#n383" name="n383">383</a>
<a href="#n384" name="n384">384</a>
<a href="#n385" name="n385">385</a>
<a href="#n386" name="n386">386</a>
<a href="#n387" name="n387">387</a>
<a href="#n388" name="n388">388</a>
<a href="#n389" name="n389">389</a>
<strong><a href="#n390" name="n390">390</a></strong>
<a href="#n391" name="n391">391</a>
<a href="#n392" name="n392">392</a>
<a href="#n393" name="n393">393</a>
<a href="#n394" name="n394">394</a>
<a href="#n395" name="n395">395</a>
<a href="#n396" name="n396">396</a>
<a href="#n397" name="n397">397</a>
<a href="#n398" name="n398">398</a>
<a href="#n399" name="n399">399</a>
<strong><a href="#n400" name="n400">400</a></strong>
<a href="#n401" name="n401">401</a>
<a href="#n402" name="n402">402</a>
<a href="#n403" name="n403">403</a>
<a href="#n404" name="n404">404</a>
<a href="#n405" name="n405">405</a>
<a href="#n406" name="n406">406</a>
<a href="#n407" name="n407">407</a>
<a href="#n408" name="n408">408</a>
<a href="#n409" name="n409">409</a>
<strong><a href="#n410" name="n410">410</a></strong>
<a href="#n411" name="n411">411</a>
<a href="#n412" name="n412">412</a>
<a href="#n413" name="n413">413</a>
<a href="#n414" name="n414">414</a>
<a href="#n415" name="n415">415</a>
<a href="#n416" name="n416">416</a>
<a href="#n417" name="n417">417</a>
<a href="#n418" name="n418">418</a>
<a href="#n419" name="n419">419</a>
<strong><a href="#n420" name="n420">420</a></strong>
<a href="#n421" name="n421">421</a>
<a href="#n422" name="n422">422</a>
<a href="#n423" name="n423">423</a>
<a href="#n424" name="n424">424</a>
<a href="#n425" name="n425">425</a>
<a href="#n426" name="n426">426</a>
<a href="#n427" name="n427">427</a>
<a href="#n428" name="n428">428</a>
<a href="#n429" name="n429">429</a>
<strong><a href="#n430" name="n430">430</a></strong>
<a href="#n431" name="n431">431</a>
<a href="#n432" name="n432">432</a>
<a href="#n433" name="n433">433</a>
<a href="#n434" name="n434">434</a>
<a href="#n435" name="n435">435</a>
<a href="#n436" name="n436">436</a>
<a href="#n437" name="n437">437</a>
<a href="#n438" name="n438">438</a>
<a href="#n439" name="n439">439</a>
<strong><a href="#n440" name="n440">440</a></strong>
<a href="#n441" name="n441">441</a>
<a href="#n442" name="n442">442</a>
<a href="#n443" name="n443">443</a>
<a href="#n444" name="n444">444</a>
<a href="#n445" name="n445">445</a>
<a href="#n446" name="n446">446</a>
<a href="#n447" name="n447">447</a>
<a href="#n448" name="n448">448</a>
<a href="#n449" name="n449">449</a>
<strong><a href="#n450" name="n450">450</a></strong>
<a href="#n451" name="n451">451</a>
<a href="#n452" name="n452">452</a>
<a href="#n453" name="n453">453</a>
<a href="#n454" name="n454">454</a>
<a href="#n455" name="n455">455</a>
<a href="#n456" name="n456">456</a>
<a href="#n457" name="n457">457</a>
<a href="#n458" name="n458">458</a>
<a href="#n459" name="n459">459</a>
<strong><a href="#n460" name="n460">460</a></strong>
<a href="#n461" name="n461">461</a>
<a href="#n462" name="n462">462</a>
<a href="#n463" name="n463">463</a>
<a href="#n464" name="n464">464</a>
<a href="#n465" name="n465">465</a>
<a href="#n466" name="n466">466</a>
<a href="#n467" name="n467">467</a>
<a href="#n468" name="n468">468</a>
<a href="#n469" name="n469">469</a>
<strong><a href="#n470" name="n470">470</a></strong>
<a href="#n471" name="n471">471</a>
<a href="#n472" name="n472">472</a>
<a href="#n473" name="n473">473</a>
<a href="#n474" name="n474">474</a>
<a href="#n475" name="n475">475</a>
<a href="#n476" name="n476">476</a>
<a href="#n477" name="n477">477</a>
<a href="#n478" name="n478">478</a>
<a href="#n479" name="n479">479</a>
<strong><a href="#n480" name="n480">480</a></strong>
<a href="#n481" name="n481">481</a>
<a href="#n482" name="n482">482</a>
<a href="#n483" name="n483">483</a>
<a href="#n484" name="n484">484</a>
<a href="#n485" name="n485">485</a>
<a href="#n486" name="n486">486</a>
<a href="#n487" name="n487">487</a>
<a href="#n488" name="n488">488</a>
<a href="#n489" name="n489">489</a>
<strong><a href="#n490" name="n490">490</a></strong>
<a href="#n491" name="n491">491</a>
<a href="#n492" name="n492">492</a>
<a href="#n493" name="n493">493</a>
<a href="#n494" name="n494">494</a>
<a href="#n495" name="n495">495</a>
<a href="#n496" name="n496">496</a>
<a href="#n497" name="n497">497</a>
<a href="#n498" name="n498">498</a>
<a href="#n499" name="n499">499</a>
<strong><a href="#n500" name="n500">500</a></strong>
<a href="#n501" name="n501">501</a>
<a href="#n502" name="n502">502</a>
<a href="#n503" name="n503">503</a>
<a href="#n504" name="n504">504</a>
<a href="#n505" name="n505">505</a>
<a href="#n506" name="n506">506</a>
<a href="#n507" name="n507">507</a>
<a href="#n508" name="n508">508</a>
<a href="#n509" name="n509">509</a>
<strong><a href="#n510" name="n510">510</a></strong>
<a href="#n511" name="n511">511</a>
<a href="#n512" name="n512">512</a>
<a href="#n513" name="n513">513</a>
<a href="#n514" name="n514">514</a>
<a href="#n515" name="n515">515</a>
<a href="#n516" name="n516">516</a>
<a href="#n517" name="n517">517</a>
<a href="#n518" name="n518">518</a>
<a href="#n519" name="n519">519</a>
<strong><a href="#n520" name="n520">520</a></strong>
<a href="#n521" name="n521">521</a>
<a href="#n522" name="n522">522</a>
<a href="#n523" name="n523">523</a>
<a href="#n524" name="n524">524</a>
<a href="#n525" name="n525">525</a>
<a href="#n526" name="n526">526</a>
<a href="#n527" name="n527">527</a>
<a href="#n528" name="n528">528</a>
<a href="#n529" name="n529">529</a>
<strong><a href="#n530" name="n530">530</a></strong>
<a href="#n531" name="n531">531</a>
<a href="#n532" name="n532">532</a>
<a href="#n533" name="n533">533</a>
<a href="#n534" name="n534">534</a>
<a href="#n535" name="n535">535</a>
<a href="#n536" name="n536">536</a>
<a href="#n537" name="n537">537</a>
<a href="#n538" name="n538">538</a>
<a href="#n539" name="n539">539</a>
<strong><a href="#n540" name="n540">540</a></strong>
<a href="#n541" name="n541">541</a>
<a href="#n542" name="n542">542</a>
<a href="#n543" name="n543">543</a>
<a href="#n544" name="n544">544</a>
<a href="#n545" name="n545">545</a>
<a href="#n546" name="n546">546</a>
<a href="#n547" name="n547">547</a>
<a href="#n548" name="n548">548</a>
<a href="#n549" name="n549">549</a>
<strong><a href="#n550" name="n550">550</a></strong>
<a href="#n551" name="n551">551</a>
<a href="#n552" name="n552">552</a>
<a href="#n553" name="n553">553</a>
<a href="#n554" name="n554">554</a>
<a href="#n555" name="n555">555</a>
<a href="#n556" name="n556">556</a>
<a href="#n557" name="n557">557</a>
<a href="#n558" name="n558">558</a>
<a href="#n559" name="n559">559</a>
<strong><a href="#n560" name="n560">560</a></strong>
<a href="#n561" name="n561">561</a>
<a href="#n562" name="n562">562</a>
<a href="#n563" name="n563">563</a>
<a href="#n564" name="n564">564</a>
<a href="#n565" name="n565">565</a>
<a href="#n566" name="n566">566</a>
<a href="#n567" name="n567">567</a>
<a href="#n568" name="n568">568</a>
<a href="#n569" name="n569">569</a>
<strong><a href="#n570" name="n570">570</a></strong>
<a href="#n571" name="n571">571</a>
<a href="#n572" name="n572">572</a>
<a href="#n573" name="n573">573</a>
<a href="#n574" name="n574">574</a>
<a href="#n575" name="n575">575</a>
<a href="#n576" name="n576">576</a>
<a href="#n577" name="n577">577</a>
<a href="#n578" name="n578">578</a>
<a href="#n579" name="n579">579</a>
<strong><a href="#n580" name="n580">580</a></strong>
<a href="#n581" name="n581">581</a>
<a href="#n582" name="n582">582</a>
<a href="#n583" name="n583">583</a>
<a href="#n584" name="n584">584</a>
<a href="#n585" name="n585">585</a>
<a href="#n586" name="n586">586</a>
<a href="#n587" name="n587">587</a>
<a href="#n588" name="n588">588</a>
<a href="#n589" name="n589">589</a>
<strong><a href="#n590" name="n590">590</a></strong>
</pre></td>
  <td class="code"><pre><span class="comment">// ==UserScript==</span>
<span class="comment">// @name         Quizlet Gravity Hacker - INSANE EDITION</span>
<span class="comment">// @namespace    Ray D. Adams</span>
<span class="comment">// @version      1.0</span>
<span class="comment">// @description  Hold the spacebar to automatically get the correct answers</span>
<span class="comment">// @author       You</span>
<span class="comment">// @match        https://quizlet.com/*/gravity</span>
<span class="comment">// @grant        none</span>
<span class="comment">// @license MIT</span>
<span class="comment">// ==/UserScript==<</span>

<span class="keyword">var</span> gravityScore,
    href = window.location.href;
(<span class="keyword">function</span>() {
    initLoad();

    <span class="keyword">function</span> <span class="function">initLoad</span>() {
        <span class="keyword">if</span> (href.includes(<span class="string"><span class="delimiter">&quot;</span><span class="content">quizlet.com</span><span class="delimiter">&quot;</span></span>)) {
            <span class="keyword">if</span> (href.includes(<span class="string"><span class="delimiter">&quot;</span><span class="content">/learn</span><span class="delimiter">&quot;</span></span>)) {
                cAlert(<span class="string"><span class="delimiter">'</span><span class="content">&lt;h2&gt;Game Mode: Learn&lt;/h2&gt;Thank you for using Ray D. Adams Quizlet Gravity Hacker - INSANE EDITION&lt;br&gt;Without you, this exploit wouldnt be possible.&lt;br&gt;&lt;h4&gt;Instructions:&lt;/h4&gt;Just wait for this script to finish!&lt;br&gt;&lt;br&gt;&lt;button class=&quot;UIButton&quot; id=&quot;learnButton&quot; type=&quot;button&quot;&gt;&lt;span class=&quot;UIButton-wrapper&quot;&gt;&lt;span&gt;Inject&lt;/span&gt;&lt;/span&gt;&lt;/button&gt;</span><span class="delimiter">'</span></span>);
                getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">learnButton</span><span class="delimiter">&quot;</span></span>)
                    .addEventListener(<span class="string"><span class="delimiter">&quot;</span><span class="content">click</span><span class="delimiter">&quot;</span></span>, <span class="keyword">function</span>() {
                        document.getElementById(<span class="string"><span class="delimiter">&quot;</span><span class="content">customMessageContainer</span><span class="delimiter">&quot;</span></span>)
                            .remove();
                        learn();
                    });

            } <span class="keyword">else</span> <span class="keyword">if</span> (href.includes(<span class="string"><span class="delimiter">&quot;</span><span class="content">/flashcards</span><span class="delimiter">&quot;</span></span>)) {
                cAlert(<span class="string"><span class="delimiter">'</span><span class="content">&lt;h2&gt;Game Mode: Flashcards&lt;/h2&gt;Thank you for using Ray D. Adams Quizlet Gravity Hacker - INSANE EDITION&lt;br&gt;Without you, this exploit wouldnt be possible.&lt;br&gt;&lt;h4&gt;Changelog:&lt;/h4&gt;+ Added Match time freeze for regular match and diagrams&lt;br&gt;+ Added Gravity score exploit to get ANY score you want!&lt;br&gt;+ Added custom alert box&lt;br&gt;+ Fixed graphics&lt;br&gt;- Removed useless alert boxes.&lt;h4&gt;Instructions:&lt;/h4&gt;Umm why are you here? Go cheat somewhere else...&lt;br&gt;&lt;br&gt;&lt;button class=&quot;UIButton&quot; id=&quot;flashcardsButton&quot; type=&quot;button&quot;&gt;&lt;span class=&quot;UIButton-wrapper&quot;&gt;&lt;span&gt;Inject&lt;/span&gt;&lt;/span&gt;&lt;/button&gt;</span><span class="delimiter">'</span></span>);
                getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">flashcardsButton</span><span class="delimiter">&quot;</span></span>)
                    .addEventListener(<span class="string"><span class="delimiter">&quot;</span><span class="content">click</span><span class="delimiter">&quot;</span></span>, <span class="keyword">function</span>() {
                        document.getElementById(<span class="string"><span class="delimiter">&quot;</span><span class="content">customMessageContainer</span><span class="delimiter">&quot;</span></span>)
                            .remove();
                    });
            } <span class="keyword">else</span> <span class="keyword">if</span> (href.includes(<span class="string"><span class="delimiter">&quot;</span><span class="content">/write</span><span class="delimiter">&quot;</span></span>)) {
                cAlert(<span class="string"><span class="delimiter">'</span><span class="content">&lt;h2&gt;Game Mode: Write&lt;/h2&gt;Thank you for using Ray D. Adams Quizlet Gravity Hacker - INSANE EDITION&lt;br&gt;Without you, this exploit wouldnt be possible.&lt;br&gt;&lt;h4&gt;Instructions:&lt;/h4&gt;You dont even have to wait,&lt;br&gt; this is my favorite one to watch!&lt;br&gt;&lt;br&gt;&lt;button class=&quot;UIButton&quot; id=&quot;writeButton&quot; type=&quot;button&quot;&gt;&lt;span class=&quot;UIButton-wrapper&quot;&gt;&lt;span&gt;Inject&lt;/span&gt;&lt;/span&gt;&lt;/button&gt;</span><span class="delimiter">'</span></span>);
                getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">writeButton</span><span class="delimiter">&quot;</span></span>)
                    .addEventListener(<span class="string"><span class="delimiter">&quot;</span><span class="content">click</span><span class="delimiter">&quot;</span></span>, <span class="keyword">function</span>() {
                        document.getElementById(<span class="string"><span class="delimiter">&quot;</span><span class="content">customMessageContainer</span><span class="delimiter">&quot;</span></span>)
                            .remove();
                        write();
                    });
            } <span class="keyword">else</span> <span class="keyword">if</span> (href.includes(<span class="string"><span class="delimiter">&quot;</span><span class="content">/spell</span><span class="delimiter">&quot;</span></span>)) {
                cAlert(<span class="string"><span class="delimiter">'</span><span class="content">&lt;h2&gt;Game Mode: Spell&lt;/h2&gt;Thank you for using Ray D. Adams Quizlet Gravity Hacker - INSANE EDITION&lt;br&gt;Without you, this exploit wouldnt be possible.&lt;br&gt;&lt;h4&gt;Instructions:&lt;/h4&gt;Nothing! Bypassed having to press enter!&lt;br&gt;&lt;br&gt;&lt;button class=&quot;UIButton&quot; id=&quot;spellButton&quot; type=&quot;button&quot;&gt;&lt;span class=&quot;UIButton-wrapper&quot;&gt;&lt;span&gt;Inject&lt;/span&gt;&lt;/span&gt;&lt;/button&gt;</span><span class="delimiter">'</span></span>);
                getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">spellButton</span><span class="delimiter">&quot;</span></span>)
                    .addEventListener(<span class="string"><span class="delimiter">&quot;</span><span class="content">click</span><span class="delimiter">&quot;</span></span>, <span class="keyword">function</span>() {
                        document.getElementById(<span class="string"><span class="delimiter">&quot;</span><span class="content">customMessageContainer</span><span class="delimiter">&quot;</span></span>)
                            .remove();
                        spell();
                    });
            } <span class="keyword">else</span> <span class="keyword">if</span> (href.includes(<span class="string"><span class="delimiter">&quot;</span><span class="content">/test</span><span class="delimiter">&quot;</span></span>)) {
                cAlert(<span class="string"><span class="delimiter">'</span><span class="content">&lt;h2&gt;Game Mode: Test&lt;/h2&gt;Thank you for using Ray D. Adams Quizlet Gravity Hacker - INSANE EDITION&lt;br&gt;Without you, this exploit wouldnt be possible.&lt;br&gt;&lt;br&gt;&lt;h4&gt;Instructions:&lt;/h4&gt;Right click to toggle answers.&lt;br&gt;(Be subtle when using)&lt;br&gt;&lt;br&gt;&lt;button class=&quot;UIButton&quot; id=&quot;testButton&quot; type=&quot;button&quot;&gt;&lt;span class=&quot;UIButton-wrapper&quot;&gt;&lt;span&gt;Inject&lt;/span&gt;&lt;/span&gt;&lt;/button&gt;</span><span class="delimiter">'</span></span>);
                getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">testButton</span><span class="delimiter">&quot;</span></span>)
                    .addEventListener(<span class="string"><span class="delimiter">&quot;</span><span class="content">click</span><span class="delimiter">&quot;</span></span>, <span class="keyword">function</span>() {
                        document.getElementById(<span class="string"><span class="delimiter">&quot;</span><span class="content">customMessageContainer</span><span class="delimiter">&quot;</span></span>)
                            .remove();
                        testMode();
                    });
            } <span class="keyword">else</span> <span class="keyword">if</span> (href.includes(<span class="string"><span class="delimiter">&quot;</span><span class="content">/micromatch</span><span class="delimiter">&quot;</span></span>)) {
                cAlert(<span class="string"><span class="delimiter">'</span><span class="content">&lt;h2&gt;Game Mode: Micromatch&lt;/h2&gt;Thank you for using Ray D. Adams Quizlet Gravity Hacker - INSANE EDITION&lt;br&gt;Without you, this exploit wouldnt be possible.&lt;br&gt;&lt;h4&gt;Instructions:&lt;/h4&gt;The timer will be paused when at choosen time.&lt;br&gt;The answers will also be highlighted for you.&lt;br&gt;At your leisure, solve the questions.&lt;br&gt;&lt;h4&gt;Match Time: &lt;/h4&gt;&lt;input type=&quot;text&quot; id=&quot;matchTimeInput&quot; value=&quot;0&quot;&gt;&lt;/input&gt;&lt;br&gt;&lt;br&gt;&lt;button class=&quot;UIButton&quot; id=&quot;micromatchButton&quot; type=&quot;button&quot;&gt;&lt;span class=&quot;UIButton-wrapper&quot;&gt;&lt;span&gt;Inject&lt;/span&gt;&lt;/span&gt;&lt;/button&gt;</span><span class="delimiter">'</span></span>);
                getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">micromatchButton</span><span class="delimiter">&quot;</span></span>)
                    .addEventListener(<span class="string"><span class="delimiter">&quot;</span><span class="content">click</span><span class="delimiter">&quot;</span></span>, <span class="keyword">function</span>() {
                        document.getElementById(<span class="string"><span class="delimiter">&quot;</span><span class="content">customMessageContainer</span><span class="delimiter">&quot;</span></span>)
                            .remove();
                        insaneWin(<span class="string"><span class="delimiter">&quot;</span><span class="content">match</span><span class="delimiter">&quot;</span></span>);
                        micromatch();
                    });
            } <span class="keyword">else</span> <span class="keyword">if</span> (href.includes(<span class="string"><span class="delimiter">&quot;</span><span class="content">/match</span><span class="delimiter">&quot;</span></span>)) {
                cAlert(<span class="string"><span class="delimiter">'</span><span class="content">&lt;h2&gt;Game Mode: Match&lt;/h2&gt;Thank you for using Ray D. Adams Quizlet Gravity Hacker - INSANE EDITION&lt;br&gt;Without you, this exploit wouldnt be possible.&lt;br&gt;&lt;h4&gt;Instructions:&lt;/h4&gt;The timer will be paused when at choosen time.&lt;br&gt;The answers will also be highlighted for you.&lt;br&gt;At your leisure, solve the questions.&lt;br&gt;&lt;h4&gt;Match Time: &lt;/h4&gt;&lt;input type=&quot;text&quot; id=&quot;matchTimeInput&quot; value=&quot;0&quot;&gt;&lt;/input&gt;&lt;br&gt;&lt;br&gt;&lt;button class=&quot;UIButton&quot; id=&quot;matchButton&quot; type=&quot;button&quot;&gt;&lt;span class=&quot;UIButton-wrapper&quot;&gt;&lt;span&gt;Inject&lt;/span&gt;&lt;/span&gt;&lt;/button&gt;</span><span class="delimiter">'</span></span>);
                getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">matchButton</span><span class="delimiter">&quot;</span></span>)
                    .addEventListener(<span class="string"><span class="delimiter">&quot;</span><span class="content">click</span><span class="delimiter">&quot;</span></span>, <span class="keyword">function</span>() {
                        document.getElementById(<span class="string"><span class="delimiter">&quot;</span><span class="content">customMessageContainer</span><span class="delimiter">&quot;</span></span>)
                            .remove();
                        insaneWin(<span class="string"><span class="delimiter">&quot;</span><span class="content">match</span><span class="delimiter">&quot;</span></span>);
                        match();
                    });
            } <span class="keyword">else</span> <span class="keyword">if</span> (href.includes(<span class="string"><span class="delimiter">&quot;</span><span class="content">/gravity</span><span class="delimiter">&quot;</span></span>)) {
                cAlert(<span class="string"><span class="delimiter">'</span><span class="content">&lt;h2&gt;Game Mode: Gravity&lt;/h2&gt;Thank you for using Ray D. Adams Quizlet Gravity Hacker - INSANE EDITION&lt;br&gt;Without you, this hack wouldnt be possible.&lt;br&gt;&lt;h4&gt;Instructions:&lt;/h4&gt;Press space when the answer appears in the input area. If you get an answer wrong, press space in the input to continue quickly.&lt;br&gt;&lt;/h4&gt;&lt;br&gt;&lt;button class=&quot;UIButton&quot; id=&quot;gravityButton&quot; type=&quot;button&quot;&gt;&lt;span class=&quot;UIButton-wrapper&quot;&gt;&lt;span&gt;Inject&lt;/span&gt;&lt;/span&gt;&lt;/button&gt;</span><span class="delimiter">'</span></span>);
                getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">gravityButton</span><span class="delimiter">&quot;</span></span>)
                    .addEventListener(<span class="string"><span class="delimiter">&quot;</span><span class="content">click</span><span class="delimiter">&quot;</span></span>, <span class="keyword">function</span>() {
                        document.getElementById(<span class="string"><span class="delimiter">&quot;</span><span class="content">customMessageContainer</span><span class="delimiter">&quot;</span></span>)
                            .remove();
                        insaneWin(<span class="string"><span class="delimiter">&quot;</span><span class="content">gravity</span><span class="delimiter">&quot;</span></span>);
                        gravity();
                    });

            } <span class="keyword">else</span> {}
        }

        <span class="keyword">function</span> <span class="function">testMode</span>() {
            <span class="keyword">var</span> question = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">TermText notranslate lang-en</span><span class="delimiter">&quot;</span></span>);
            <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; question.length; i++) {
                question[i].innerHTML += <span class="string"><span class="delimiter">'</span><span class="content">&lt;br&gt;&lt;small style=&quot;font-weight: bold; display: block;&quot; class=&quot;answers&quot;&gt;</span><span class="delimiter">'</span></span> + findAnswerGlobal(question[i].innerHTML) + <span class="string"><span class="delimiter">&quot;</span><span class="content">&lt;/small&gt;</span><span class="delimiter">&quot;</span></span>;
            }
            window.<span class="function">oncontextmenu</span> = <span class="keyword">function</span>(e) {
                e.preventDefault();
                <span class="keyword">var</span> answer = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">answers</span><span class="delimiter">&quot;</span></span>);
                <span class="keyword">if</span> (answer[<span class="integer">0</span>].style.display == <span class="string"><span class="delimiter">&quot;</span><span class="content">block</span><span class="delimiter">&quot;</span></span>) {
                    <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; answer.length; i++) {
                        answer[i].style.display = <span class="string"><span class="delimiter">&quot;</span><span class="content">none</span><span class="delimiter">&quot;</span></span>;
                    }
                } <span class="keyword">else</span> {
                    <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; answer.length; i++) {
                        answer[i].style.display = <span class="string"><span class="delimiter">&quot;</span><span class="content">block</span><span class="delimiter">&quot;</span></span>
                    }
                }
            }
        }

        <span class="keyword">function</span> <span class="function">gravity</span>() {
            <span class="keyword">var</span> createListener = <span class="predefined-constant">true</span>;
            <span class="keyword">var</span> input = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">GravityTypingPrompt-input js-keymaster-allow</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>];
            <span class="keyword">if</span> (input) {
                input.addEventListener(<span class="string"><span class="delimiter">&quot;</span><span class="content">keypress</span><span class="delimiter">&quot;</span></span>, <span class="keyword">function</span>(e) {
                    <span class="keyword">if</span> (e.which == <span class="string"><span class="delimiter">&quot;</span><span class="content">32</span><span class="delimiter">&quot;</span></span> &amp;&amp; getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">GravityTerm-content</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>]) {
                        setTimeout(<span class="keyword">function</span>() {
                            submit();
                        }, <span class="integer">10</span>);
                    }
                });
            }

            setInterval(<span class="keyword">function</span>() {
                input = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">GravityTypingPrompt-input js-keymaster-allow</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>];
                <span class="keyword">if</span> (createListener &amp;&amp; input) {
                    createListener = <span class="predefined-constant">false</span>;
                    input.addEventListener(<span class="string"><span class="delimiter">&quot;</span><span class="content">keypress</span><span class="delimiter">&quot;</span></span>, <span class="keyword">function</span>(e) {
                        <span class="keyword">if</span> (e.which == <span class="string"><span class="delimiter">&quot;</span><span class="content">32</span><span class="delimiter">&quot;</span></span> &amp;&amp; getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">GravityTerm-content</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>]) {
                            setTimeout(<span class="keyword">function</span>() {
                                submit();
                            }, <span class="integer">10</span>);
                        }
                    });
                }
                <span class="keyword">if</span> (input &amp;&amp; getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">GravityTerm-content</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>]) {
                    input.focus();
                    input.value = findAnswerGlobal(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">GravityTerm-content</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerText.trim());
                } <span class="keyword">else</span> {
                    createListener = <span class="predefined-constant">true</span>;
                    <span class="keyword">if</span> (getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">GravityCopyTermView-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>]) {
                        getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">GravityCopyTermView-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].value = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">TermText notranslate lang-en</span><span class="delimiter">&quot;</span></span>)[<span class="integer">1</span>].innerHTML;
                    }
                }
            }, <span class="integer">100</span>);

            <span class="keyword">function</span> <span class="function">submit</span>() {
                input = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">GravityTypingPrompt-input js-keymaster-allow</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>];
                <span class="keyword">if</span> (input) {
                    input.focus();
                    <span class="keyword">var</span> keyEvent = <span class="keyword">new</span> KeyboardEvent(<span class="string"><span class="delimiter">&quot;</span><span class="content">keydown</span><span class="delimiter">&quot;</span></span>, {
                        <span class="key">bubbles</span>: <span class="predefined-constant">true</span>,
                        <span class="key">cancelable</span>: <span class="predefined-constant">true</span>,
                        <span class="reserved">char</span>: <span class="string"><span class="delimiter">&quot;</span><span class="content">Enter</span><span class="delimiter">&quot;</span></span>,
                        <span class="key">key</span>: <span class="string"><span class="delimiter">&quot;</span><span class="content">Enter</span><span class="delimiter">&quot;</span></span>,
                        <span class="key">shiftKey</span>: <span class="predefined-constant">false</span>,
                        <span class="key">keyCode</span>: <span class="integer">13</span>,
                        <span class="key">which</span>: <span class="integer">13</span>
                    });
                    input.dispatchEvent(keyEvent);
                }
            }


            <span class="comment">/* VARIABLES CHANGE IN UNKNOWN WAY
            window.QJP[3][1].tfdH(
			
            	window.Quizlet.gravityModeData, 
            	
            	{}, 
            	
            	function n(a) {
            		if (t[a])
            			return t[a].exports;
            			var o = t[a] = {
            				i: a,
            				l: !1,
            				exports: {}
            			};
            			return e[a].call(o.exports, o, o.exports, n),
            			o.l = !0,
            			o.exports
            	}
            );
            */</span>

            <span class="comment">/* PATCHED
            var t = window.QJP([], [], [&quot;hyek&quot;]).a,
            n = t.grader.grade.bind(t.grader);
            t._startGame(), t.dataMap = t.dataMap.update(&quot;points&quot;, function(t) {
            	return gravityScore;
            });
            for (var o = 0; o &lt; 99; o++) t._advanceLevel();

            function s(e) {
            	t.grader.grade = function(e, t, n) {
            		return !0;
            	}, e(), t.grader.grade = n
            }
            s(function() {
            	console.log(null);
            });
            var a = t._promptCopyAnswer.bind(t);
            t._promptCopyAnswer = function(e) {
            	a(e), setTimeout(function() {
            		s(function() {
            			t._checkCopiedAnswer({
            				liveTermId: e,
            				answer: &quot;&quot;
            			});
            		});
            	}, 0);
            };
            */</span>
        }

        <span class="keyword">function</span> <span class="function">write</span>() {
            <span class="comment">//This is sad... but works better...</span>
            <span class="keyword">var</span> remaining = parseInt(document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">LearnModeProgressBar-value</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML);
            <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; remaining; i++) {
                getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">user-answer</span><span class="delimiter">&quot;</span></span>)
                    .value = Math.random();
                getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">js-learnModeAnswerButton</span><span class="delimiter">&quot;</span></span>)
                    .click();
                getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">js-learnModeOverrideIncorrect</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].click();
            }
            <span class="comment">/*
            var buttons = document.querySelectorAll(&quot;button&quot;),
            	 span = document.querySelectorAll(&quot;span&quot;);

            if (getId(&quot;user-answer&quot;)) {
            	getId(&quot;user-answer&quot;).disabled = true;
            	getId(&quot;user-answer&quot;).value = findAnswerGlobal(getClass(&quot;qDef lang-en TermText&quot;)[0].innerHTML);
            	for (var i = 0; i &lt; buttons.length; i++) {
            		if (buttons[i].childNodes[0].innerHTML == &quot;Answer&quot;) {
            			buttons[i].click();
            		}
            	}
            try {
            	for (var i = 0; i &lt; span.length; i++) {
            		if (span[i].childNodes[0].childNodes[0].innerHTML == &quot;Override: I was right&quot;) {
            			span[i].click;
            		}
            	}
            } catch (e) {}
            	write();
            } else {
            	for (var i = 0; i &lt; buttons.length; i++) {
            		if (buttons[i].innerHTML == &quot;Press any key to continue&quot;) {
            			buttons[i].click();
            		} else if (buttons[i].innerHTML == &quot;Start Over&quot;) {
            			return 1;
            		}
            	}
            	setTimeout(write, 0);
            }
            */</span>
        }

        <span class="keyword">function</span> <span class="function">spell</span>() {
            <span class="keyword">if</span> (getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">SpellModeControls-progressValue</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML == <span class="string"><span class="delimiter">&quot;</span><span class="content">100%</span><span class="delimiter">&quot;</span></span>) {
                <span class="keyword">return</span> <span class="integer">1</span>;
            }

            <span class="keyword">try</span> {
                <span class="keyword">if</span> (getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">js-spellInput</span><span class="delimiter">&quot;</span></span>)
                    .style.visibility == <span class="string"><span class="delimiter">&quot;</span><span class="content">visible</span><span class="delimiter">&quot;</span></span>) {
                    getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">js-spellInput</span><span class="delimiter">&quot;</span></span>)
                        .value = findAnswerGlobal(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">qDef lang-en TermText</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML);
                    submit();
                    setTimeout(spell, <span class="integer">10</span>);
                }
            } <span class="keyword">catch</span> (e) {
                console.log(e);
                setTimeout(spell, <span class="integer">500</span>);
            }

            <span class="keyword">function</span> <span class="function">submit</span>() {
                input = getId(<span class="string"><span class="delimiter">&quot;</span><span class="content">js-spellInput</span><span class="delimiter">&quot;</span></span>);
                <span class="keyword">if</span> (input) {
                    input.focus();
                    <span class="keyword">var</span> keyEvent = <span class="keyword">new</span> KeyboardEvent(<span class="string"><span class="delimiter">&quot;</span><span class="content">keydown</span><span class="delimiter">&quot;</span></span>, {
                        <span class="key">bubbles</span>: <span class="predefined-constant">true</span>,
                        <span class="key">cancelable</span>: <span class="predefined-constant">true</span>,
                        <span class="reserved">char</span>: <span class="string"><span class="delimiter">&quot;</span><span class="content">Enter</span><span class="delimiter">&quot;</span></span>,
                        <span class="key">key</span>: <span class="string"><span class="delimiter">&quot;</span><span class="content">Enter</span><span class="delimiter">&quot;</span></span>,
                        <span class="key">shiftKey</span>: <span class="predefined-constant">false</span>,
                        <span class="key">keyCode</span>: <span class="integer">13</span>,
                        <span class="key">which</span>: <span class="integer">13</span>
                    });
                    input.dispatchEvent(keyEvent);
                }
            }
        }

        <span class="keyword">function</span> <span class="function">match</span>() {
            button = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">UIButton UIButton--hero</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>], button &amp;&amp; button.click();
            setTimeout(<span class="keyword">function</span>() {
                <span class="keyword">if</span> (getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">UIModalBody</span><span class="delimiter">&quot;</span></span>)
                    .length) {
                    setInterval = console.log;
                } <span class="keyword">else</span> {
                    <span class="keyword">for</span> (let x = setTimeout(<span class="string"><span class="delimiter">&quot;</span><span class="content">;</span><span class="delimiter">&quot;</span></span>), i = <span class="integer">0</span>; i &lt; x; i++) {
                        clearTimeout(i);
                    }
                }

                <span class="keyword">function</span> <span class="function">waitForMatch</span>() {
                    <span class="keyword">if</span> (getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">MatchModeQuestionScatterTile</span><span class="delimiter">&quot;</span></span>) || getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">MatchModeQuestionGridBoard-tile</span><span class="delimiter">&quot;</span></span>)) {
                        <span class="keyword">for</span> (<span class="keyword">var</span> F = setTimeout(<span class="string"><span class="delimiter">&quot;</span><span class="content">;</span><span class="delimiter">&quot;</span></span>), i = <span class="integer">0</span>; i &lt; F; i++) clearTimeout(i);
                        <span class="keyword">var</span> tiles = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">MatchModeQuestionScatterTile</span><span class="delimiter">&quot;</span></span>);
                        <span class="keyword">var</span> colors = [<span class="string"><span class="delimiter">&quot;</span><span class="content">#FF0000</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FF0000</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FF6600</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FF6600</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FFFF00</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FFFF00</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#00FF00</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#00FF00</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#00FFFF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#00FFFF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#0033FF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#0033FF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FF00FF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FF00FF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#CC00FF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#CC00FF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#6E0DD0</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#6E0DD0</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#C0C0C0</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#C0C0C0</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FFFFFF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FFFFFF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#A52A2A</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#A52A2A</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#F6CFFF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#F6CFFF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#CFD9FF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#CFD9FF</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FBFFA3</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FBFFA3</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FFD1A3</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#FFD1A3</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#710000</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">#710000</span><span class="delimiter">&quot;</span></span>];
                        <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; tiles.length; i++) {
                            tiles[i].style.backgroundColor = colors[i];
                            <span class="keyword">for</span> (<span class="keyword">var</span> j = <span class="integer">0</span>; j &lt; tiles.length; j++) {
                                <span class="keyword">if</span> (tiles[j].childNodes[<span class="integer">0</span>].innerHTML == findAnswerGlobal(tiles[j].childNodes[<span class="integer">0</span>].innerHTML)) {
                                    tiles[j].style.backgroundColor = colors[i];
                                }
                            }
                        }
                        clearTimeout(matchLoop);
                    }
                }
            }, <span class="integer">500</span>);
        }

        <span class="keyword">function</span> <span class="function">micromatch</span>() {
            button = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">UIButton UIButton--hero</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>], button &amp;&amp; button.click();
            setTimeout(<span class="keyword">function</span>() {

                <span class="keyword">if</span> (getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">UIModalBody</span><span class="delimiter">&quot;</span></span>)
                    .length) {
                    setInterval = console.log;
                } <span class="keyword">else</span> {
                    <span class="keyword">for</span> (let x = setTimeout(<span class="string"><span class="delimiter">&quot;</span><span class="content">;</span><span class="delimiter">&quot;</span></span>), i = <span class="integer">0</span>; i &lt; x; i++) {
                        clearTimeout(i);
                    }
                }
                <span class="keyword">var</span> tiles = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">MatchModeQuestionGridTile-text</span><span class="delimiter">&quot;</span></span>); <span class="comment">//[0].childNodes[0].innerHTML</span>
                <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; tiles.length; i++) {

                    <span class="keyword">if</span> (getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">MatchModeQuestionGridTile</span><span class="delimiter">&quot;</span></span>)[i].classList[<span class="integer">1</span>] != <span class="string"><span class="delimiter">&quot;</span><span class="content">is-selected</span><span class="delimiter">&quot;</span></span>) {
                        click(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">MatchModeQuestionGridBoard-tile</span><span class="delimiter">&quot;</span></span>)[i].childNodes[<span class="integer">0</span>], <span class="string"><span class="delimiter">&quot;</span><span class="content">pointerdown</span><span class="delimiter">&quot;</span></span>);
                    }
                    <span class="keyword">for</span> (<span class="keyword">var</span> j = <span class="integer">0</span>; j &lt; tiles.length; j++) {
                        <span class="keyword">if</span> (tiles[j].childNodes[<span class="integer">0</span>].innerHTML == findAnswerGlobal(tiles[i].childNodes[<span class="integer">0</span>].innerHTML)) {
                            <span class="keyword">if</span> (getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">MatchModeQuestionGridTile</span><span class="delimiter">&quot;</span></span>)[j].classList[<span class="integer">1</span>] != <span class="string"><span class="delimiter">&quot;</span><span class="content">is-selected</span><span class="delimiter">&quot;</span></span>) {
                                click(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">MatchModeQuestionGridBoard-tile</span><span class="delimiter">&quot;</span></span>)[j].childNodes[<span class="integer">0</span>], <span class="string"><span class="delimiter">&quot;</span><span class="content">pointerdown</span><span class="delimiter">&quot;</span></span>);
                                j = tiles.length;
                            }
                        }
                    }
                }

                <span class="keyword">function</span> <span class="function">click</span>(e, t) {
                    <span class="keyword">if</span> (e.fireEvent) e.fireEvent(<span class="string"><span class="delimiter">&quot;</span><span class="content">on</span><span class="delimiter">&quot;</span></span> + t);
                    <span class="keyword">else</span> {
                        <span class="keyword">var</span> n = document.createEvent(<span class="string"><span class="delimiter">&quot;</span><span class="content">Events</span><span class="delimiter">&quot;</span></span>);
                        n.initEvent(t, !<span class="integer">0</span>, !<span class="integer">1</span>), e.dispatchEvent(n);
                    }
                }
            }, <span class="integer">500</span>);
        }

        <span class="keyword">function</span> <span class="function">learn</span>() {
            <span class="keyword">if</span> (getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">ProgressSegmentedSemicircle-percent</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML = <span class="string"><span class="delimiter">&quot;</span><span class="content">100%</span><span class="delimiter">&quot;</span></span>) {
                <span class="keyword">return</span> <span class="integer">1</span>;
            }
            checkCheckbox();
            <span class="keyword">if</span> (getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">AssistantMultipleChoiceQuestionPromptView-inner</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>] !== <span class="predefined-constant">undefined</span>) {
                <span class="keyword">var</span> answer = findAnswerGlobal(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">FormattedText notranslate TermText lang-en</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML);
                <span class="keyword">var</span> q1 = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">FormattedText notranslate TermText lang-en</span><span class="delimiter">&quot;</span></span>)[<span class="integer">1</span>];
                <span class="keyword">var</span> q2 = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">FormattedText notranslate TermText lang-en</span><span class="delimiter">&quot;</span></span>)[<span class="integer">2</span>];
                <span class="keyword">var</span> q3 = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">FormattedText notranslate TermText lang-en</span><span class="delimiter">&quot;</span></span>)[<span class="integer">3</span>];
                <span class="keyword">var</span> q4 = getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">FormattedText notranslate TermText lang-en</span><span class="delimiter">&quot;</span></span>)[<span class="integer">4</span>];
                <span class="keyword">if</span> (answer == q1.innerHTML) {
                    q1.click();
                } <span class="keyword">else</span> <span class="keyword">if</span> (answer == q2.innerHTML) {
                    q2.click();
                } <span class="keyword">else</span> <span class="keyword">if</span> (answer == q3.innerHTML) {
                    q3.click();
                } <span class="keyword">else</span> <span class="keyword">if</span> (answer == q4.innerHTML) {
                    q4.click();
                } <span class="keyword">else</span> {
                    console.error(<span class="string"><span class="delimiter">&quot;</span><span class="content">ERROR: Unable to find / click answer</span><span class="delimiter">&quot;</span></span>);
                    <span class="keyword">return</span> <span class="integer">0</span>;
                }
                getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">UIButton</span><span class="delimiter">&quot;</span></span>)[<span class="integer">4</span>].click();
                setTimeout(learn, <span class="integer">10</span>);
            } <span class="keyword">else</span> {
                setTimeout(learn, <span class="integer">100</span>);
            }
        }

        <span class="keyword">function</span> <span class="function">checkCheckbox</span>() {
            document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UIButton UIButton--whiteBorder UIButton--fill</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].click();
            <span class="keyword">if</span> (document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UICheckbox-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">3</span>].checked &amp;&amp; document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UICheckbox-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">2</span>].checked !== <span class="predefined-constant">true</span> &amp;&amp; document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UICheckbox-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">4</span>].checked !== <span class="predefined-constant">true</span>) {
                document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UIButton UIButton--inverted</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].click();
                <span class="keyword">return</span> <span class="integer">1</span>;
            }
            <span class="keyword">if</span> (document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UICheckbox-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">4</span>].checked === <span class="predefined-constant">true</span>) {
                document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UICheckbox-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">4</span>].click();
            }
            <span class="keyword">if</span> (document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UICheckbox-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">2</span>].checked === <span class="predefined-constant">true</span>) {
                document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UICheckbox-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">2</span>].click();
            }
            <span class="keyword">if</span> (document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UICheckbox-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">3</span>].checked === <span class="predefined-constant">false</span>) {
                document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UICheckbox-input</span><span class="delimiter">&quot;</span></span>)[<span class="integer">3</span>].click();
            }
            document.getElementsByClassName(<span class="string"><span class="delimiter">&quot;</span><span class="content">UIButton UIButton--inverted</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].click();
        }

        <span class="keyword">function</span> <span class="function">findAnswerGlobal</span>(question) {
            <span class="keyword">if</span> (Quizlet.assistantModeData !== <span class="predefined-constant">undefined</span>) { <span class="comment">//Quizlet.assistantModeData.terms</span>
                <span class="keyword">return</span> getAnswer(Quizlet.assistantModeData.terms, question);
            } <span class="keyword">else</span> <span class="keyword">if</span> (Quizlet.learnGameData !== <span class="predefined-constant">undefined</span>) { <span class="comment">//Quizlet.learnGameData.allTerms</span>
                <span class="keyword">return</span> getAnswer(Quizlet.learnGameData.allTerms, question);
            } <span class="keyword">else</span> <span class="keyword">if</span> (Quizlet.testModeData !== <span class="predefined-constant">undefined</span>) { <span class="comment">//Quizlet.testModeData.terms</span>
                <span class="keyword">return</span> getAnswer(Quizlet.testModeData.terms, question);
            } <span class="keyword">else</span> <span class="keyword">if</span> (Quizlet.spellModeData !== <span class="predefined-constant">undefined</span>) { <span class="comment">//Quizlet.spellModeData.spellGameData.termsById</span>
                <span class="keyword">return</span> getAnswer(Quizlet.spellModeData.spellGameData.termsById, question);
            } <span class="keyword">else</span> <span class="keyword">if</span> (Quizlet.matchModeData !== <span class="predefined-constant">undefined</span>) { <span class="comment">//Quizlet.matchModeData.terms</span>
                <span class="keyword">return</span> getAnswer(Quizlet.matchModeData.terms, question);
            } <span class="keyword">else</span> <span class="keyword">if</span> (Quizlet.gravityModeData !== <span class="predefined-constant">undefined</span>) { <span class="comment">//Quizlet.gravityModeData.terms</span>
                <span class="keyword">return</span> getAnswer(Quizlet.gravityModeData.terms, question);
            } <span class="keyword">else</span> {
                <span class="keyword">return</span> <span class="integer">0</span>;
            }

            <span class="keyword">function</span> <span class="function">getAnswer</span>(s, t) {
                <span class="keyword">var</span> e = s;
                <span class="keyword">if</span> (t.indexOf(<span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>) != <span class="string"><span class="delimiter">&quot;</span><span class="content">-1</span><span class="delimiter">&quot;</span></span>) {
                    <span class="keyword">if</span> (t.slice(-<span class="integer">1</span>) == <span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>) { <span class="comment">//Underscore at end</span>
                        <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; e.length; i++) {
                            <span class="keyword">if</span> (e[i].definition.indexOf(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">qDef lang-en TermText</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML.split(<span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>]) != <span class="string"><span class="delimiter">&quot;</span><span class="content">-1</span><span class="delimiter">&quot;</span></span>) {
                                <span class="keyword">return</span> e[i].word;
                            } <span class="keyword">else</span> <span class="keyword">if</span> (e[i].word.indexOf(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">qDef lang-en TermText</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML.split(<span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>]) != <span class="string"><span class="delimiter">&quot;</span><span class="content">-1</span><span class="delimiter">&quot;</span></span>) {
                                <span class="keyword">return</span> e[i].definition;
                            }
                        }
                    } <span class="keyword">else</span> <span class="keyword">if</span> (t[<span class="integer">0</span>] == <span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>) {
                        <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; e.length; i++) { <span class="comment">//Underscore at start</span>
                            <span class="keyword">if</span> (e[i].definition.indexOf(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">qDef lang-en TermText</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML.split(<span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>)
                                    .slice(-<span class="integer">1</span>)[<span class="integer">0</span>]) != <span class="string"><span class="delimiter">&quot;</span><span class="content">-1</span><span class="delimiter">&quot;</span></span>) {
                                <span class="keyword">return</span> e[i].word;
                            } <span class="keyword">else</span> <span class="keyword">if</span> (e[i].word.indexOf(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">qDef lang-en TermText</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML.split(<span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>)
                                    .slice(-<span class="integer">1</span>)[<span class="integer">0</span>]) != <span class="string"><span class="delimiter">&quot;</span><span class="content">-1</span><span class="delimiter">&quot;</span></span>) {
                                <span class="keyword">return</span> e[i].definition;
                            }
                        }
                    } <span class="keyword">else</span> {
                        <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; e.length; i++) { <span class="comment">//Underscore in middle</span>
                            <span class="keyword">if</span> (e[i].definition.indexOf(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">qDef lang-en TermText</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML.split(<span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>)
                                    .slice(-<span class="integer">1</span>)[<span class="integer">0</span>]) != <span class="string"><span class="delimiter">&quot;</span><span class="content">-1</span><span class="delimiter">&quot;</span></span> &amp;&amp; e[i].definition.indexOf(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">qDef lang-en TermText</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML.split(<span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>]) != <span class="string"><span class="delimiter">&quot;</span><span class="content">-1</span><span class="delimiter">&quot;</span></span>) {
                                <span class="keyword">return</span> e[i].word;
                            } <span class="keyword">else</span> <span class="keyword">if</span> (e[i].word.indexOf(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">qDef lang-en TermText</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML.split(<span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>)
                                    .slice(-<span class="integer">1</span>)[<span class="integer">0</span>]) != <span class="string"><span class="delimiter">&quot;</span><span class="content">-1</span><span class="delimiter">&quot;</span></span> &amp;&amp; e[i].word.indexOf(getClass(<span class="string"><span class="delimiter">&quot;</span><span class="content">qDef lang-en TermText</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>].innerHTML.split(<span class="string"><span class="delimiter">&quot;</span><span class="content">_</span><span class="delimiter">&quot;</span></span>)[<span class="integer">0</span>]) != <span class="string"><span class="delimiter">&quot;</span><span class="content">-1</span><span class="delimiter">&quot;</span></span>) {
                                <span class="keyword">return</span> e[i].definition;
                            }
                        }
                    }
                }
                <span class="keyword">var</span> answers = [];
                <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; e.length; i++) {
                    e[i].definition = e[i].definition.replace(<span class="string"><span class="delimiter">&quot;</span><span class="char">\n</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">&lt;br&gt;</span><span class="delimiter">&quot;</span></span>);
                    e[i].word = e[i].word.replace(<span class="string"><span class="delimiter">&quot;</span><span class="char">\n</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">&lt;br&gt;</span><span class="delimiter">&quot;</span></span>);
                    <span class="keyword">if</span> (t == e[i].word) {
                        answers.push(e[i].definition);
                    } <span class="keyword">else</span> <span class="keyword">if</span> (t == e[i].definition) {
                        answers.push(e[i].word);
                    }
                }
                <span class="keyword">return</span> answers[Math.floor(Math.random() * answers.length)];
            }
        }
    }

    <span class="keyword">function</span> <span class="function">cAlert</span>(message) {
        <span class="keyword">var</span> html = <span class="string"><span class="delimiter">'</span><span class="content">&lt;div class=&quot;UIModal is-white is-open&quot; id=&quot;customMessageContainer&quot; role=&quot;document&quot; tabindex=&quot;-1&quot;&gt; &lt;div class=&quot;UIModal-box&quot;&gt; &lt;div class=&quot;UIModalHeader&quot;&gt; &lt;div class=&quot;UIModalHeader-wrapper&quot;&gt; &lt;span class=&quot;UIModalHeader-close&quot;&gt; &lt;div class=&quot;UIModalHeader-closeIconButton&quot;&gt; &lt;span class=&quot;UIIconButton&quot;&gt; &lt;button class=&quot;UIButton UIButton--inverted&quot; type=&quot;button&quot; id=&quot;customCloseButton&quot; onclick=&quot;document.getElementById(&amp;quot;customMessageContainer&amp;quot;).remove();&quot;&gt; &lt;span class=&quot;UIButton-wrapper&quot;&gt; &lt;svg class=&quot;UIIcon UIIcon--x-thin&quot;&gt; &lt;noscript&gt;&lt;/noscript&gt; &lt;use xlink:href=&quot;#x-thin&quot;&gt;&lt;/use&gt; &lt;noscript&gt;&lt;/noscript&gt; &lt;/svg&gt; &lt;/span&gt; &lt;/button&gt; &lt;/span&gt; &lt;/div&gt; &lt;/span&gt; &lt;div class=&quot;UIModalHeader-childrenWrapper&quot;&gt; &lt;h3 class=&quot;UIHeading UIHeading--three&quot;&gt;&lt;span id=&quot;customTitle&quot;&gt;Ray D. Adams Quizlet Gravity Hacker - INSANE EDITION&lt;/span&gt;&lt;/h3&gt; &lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;div class=&quot;UIModalBody&quot;&gt; &lt;div class=&quot;UIDiv SetPageEmbedModal-content&quot;&gt; &lt;div&gt; &lt;p class=&quot;UIParagraph&quot;&gt;&lt;span id=&quot;customMessage&quot;&gt;</span><span class="delimiter">'</span></span> + message + <span class="string"><span class="delimiter">'</span><span class="content">&lt;/span&gt;&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;</span><span class="delimiter">'</span></span>;
        <span class="keyword">var</span> j = document.createElement(<span class="string"><span class="delimiter">'</span><span class="content">div</span><span class="delimiter">'</span></span>);
        j.innerHTML = html;
        document.body.appendChild(j);
    }

    <span class="keyword">function</span> <span class="function">insaneWin</span>(game) {
        <span class="keyword">var</span> data = {}

        <span class="keyword">if</span> (game == <span class="string"><span class="delimiter">&quot;</span><span class="content">gravity</span><span class="delimiter">&quot;</span></span>) {
            data = {
                <span class="key">sessionId</span>: <span class="predefined-constant">undefined</span>,
                <span class="key">score</span>: prompt(<span class="string"><span class="delimiter">&quot;</span><span class="content">Highest possible score is 4294967295.</span><span class="char">\n</span><span class="content">Score: </span><span class="delimiter">&quot;</span></span>, <span class="integer">4294967295</span>),
                <span class="key">previous_record</span>: Quizlet.highscoresModalData.previousRecord,
                <span class="key">time_started</span>: Date.now() - <span class="integer">63641</span>,
                <span class="key">selectedOnly</span>: <span class="predefined-constant">false</span>
            }
        }

        <span class="keyword">if</span> (game == <span class="string"><span class="delimiter">&quot;</span><span class="content">match</span><span class="delimiter">&quot;</span></span>) {
            data = {
                <span class="key">score</span>: prompt(<span class="string"><span class="delimiter">&quot;</span><span class="content">Anything lower than 5 won't work.</span><span class="char">\n</span><span class="content">Time: </span><span class="delimiter">&quot;</span></span>, <span class="integer">5</span>),
                <span class="key">previous_record</span>: Quizlet.matchModeData.recordTime,
                <span class="key">too_small</span>: <span class="integer">0</span>,
                <span class="key">time_started</span>: Quizlet.SERVER_TIME,
                <span class="key">selectedOnly</span>: <span class="predefined-constant">false</span>
            }
        }

        <span class="keyword">var</span> message = {
            <span class="key">data</span>: obfuscate(JSON.stringify(data), <span class="integer">77</span>)
        };

        <span class="keyword">var</span> send = <span class="keyword">new</span> XMLHttpRequest;
        send.open(<span class="string"><span class="delimiter">&quot;</span><span class="content">POST</span><span class="delimiter">&quot;</span></span>, document.location.href + <span class="string"><span class="delimiter">&quot;</span><span class="content">/highscores</span><span class="delimiter">&quot;</span></span>);
        send.setRequestHeader(<span class="string"><span class="delimiter">&quot;</span><span class="content">CS-Token</span><span class="delimiter">&quot;</span></span>, getCookie(<span class="string"><span class="delimiter">&quot;</span><span class="content">qtkn</span><span class="delimiter">&quot;</span></span>));
        send.setRequestHeader(<span class="string"><span class="delimiter">&quot;</span><span class="content">Accept</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">application/json</span><span class="delimiter">&quot;</span></span>);
        send.setRequestHeader(<span class="string"><span class="delimiter">&quot;</span><span class="content">Content-Type</span><span class="delimiter">&quot;</span></span>, <span class="string"><span class="delimiter">&quot;</span><span class="content">application/json</span><span class="delimiter">&quot;</span></span>);
        send.send(JSON.stringify(message));
    }
})();

<span class="keyword">function</span> <span class="function">getId</span>(id) {
    <span class="keyword">return</span> document.getElementById(id);
}

<span class="keyword">function</span> <span class="function">getClass</span>(id) {
    <span class="keyword">return</span> document.getElementsByClassName(id);
}

<span class="keyword">function</span> <span class="function">getCookie</span>(cname) {
    <span class="keyword">var</span> name = cname + <span class="string"><span class="delimiter">&quot;</span><span class="content">=</span><span class="delimiter">&quot;</span></span>;
    <span class="keyword">var</span> decodedCookie = decodeURIComponent(document.cookie);
    <span class="keyword">var</span> ca = decodedCookie.split(<span class="string"><span class="delimiter">'</span><span class="content">;</span><span class="delimiter">'</span></span>);
    <span class="keyword">for</span> (<span class="keyword">var</span> i = <span class="integer">0</span>; i &lt; ca.length; i++) {
        <span class="keyword">var</span> c = ca[i];
        <span class="keyword">while</span> (c.charAt(<span class="integer">0</span>) == <span class="string"><span class="delimiter">'</span><span class="content"> </span><span class="delimiter">'</span></span>) {
            c = c.substring(<span class="integer">1</span>);
        }
        <span class="keyword">if</span> (c.indexOf(name) == <span class="integer">0</span>) {
            <span class="keyword">return</span> c.substring(name.length, c.length);
        }
    }
    <span class="keyword">return</span> <span class="string"><span class="delimiter">&quot;</span><span class="delimiter">&quot;</span></span>;
}

<span class="comment">//var learnInsertJs = &quot;function figure(match) {termsWord = window.Quizlet.assistantModeData.terms.filter(function z(x) {return x.word == match}); termsDefinition = window.Quizlet.assistantModeData.terms.filter(function z(x) {return x.definition === match}); if (termsWord.length &gt; 0) {return termsWord[0].definition;}; if (termsDefinition.length &gt; 0) {return termsDefinition[0].word;}}; function solve() {input = document.querySelector('#AssistantModeTarget &gt; div &gt; div &gt; div &gt; div.ModeLayout-content &gt; div &gt; span:nth-child(2) &gt; div &gt; div &gt; div.AssistantScrollableViewLayout-content &gt; div &gt; div.AssistantMultipleChoiceQuestionPromptView-promptArea &gt; div &gt; div &gt; div &gt; span').innerHTML; output = figure(input); outs = document.querySelectorAll('.AssistantMultipleChoiceQuestionPromptView-termOptionInner &gt; div &gt; span'); for (var i = 0; i &lt; outs.length; i++) {if (outs[i].innerText === output) {outs[i].click();}}; document.querySelector('#AssistantModeTarget &gt; div &gt; div &gt; div &gt; div.ModeLayout-content &gt; div &gt; span:nth-child(3) &gt; div &gt; div.AssistantFixedActionLayout-action &gt; div &gt; button').click(); if (document.querySelector('#AssistantModeTarget &gt; div &gt; div &gt; div &gt; div.ModeLayout-controls &gt; div &gt; div &gt; div &gt; div.ModeControls-main &gt; div.ModeControls-progress &gt; div &gt; div &gt; div &gt; svg &gt; text.ProgressSegmentedSemicircle-text.ProgressSegmentedSemicircle-progressText &gt; tspan').innerHTML.slice(0, -1) !== '100') {setTimeout(solve, 10);};}; solve();&quot;</span>

<span class="comment">//backupOptionsSet = &quot;/*document.querySelector('#AssistantModeTarget &gt; div &gt; div &gt; div &gt; div.ModeLayout-controls &gt; div &gt; div &gt; div &gt; div.ModeControls-main &gt; div.ModeControls-actions &gt; div &gt; button &gt; span &gt; span').click(); if (document.querySelector('body &gt; div:nth-child(4) &gt; div.UIModal.is-white.is-open &gt; div &gt; div.UIModalBody &gt; div &gt; div:nth-child(3) &gt; div &gt; div &gt; div &gt; div &gt; div &gt; div:nth-child(3) &gt; label &gt; input').checked) {document.querySelector('body &gt; div:nth-child(4) &gt; div.UIModal.is-white.is-open &gt; div &gt; div.UIModalBody &gt; div &gt; div:nth-child(3) &gt; div &gt; div &gt; div &gt; div &gt; div &gt; div:nth-child(3) &gt; label &gt; input').click();}; if (document.querySelector('body &gt; div:nth-child(4) &gt; div.UIModal.is-white.is-open &gt; div &gt; div.UIModalBody &gt; div &gt; div:nth-child(3) &gt; div &gt; div &gt; div &gt; div &gt; div &gt; div:nth-child(1) &gt; label &gt; input').checked) {document.querySelector('body &gt; div:nth-child(4) &gt; div.UIModal.is-white.is-open &gt; div &gt; div.UIModalBody &gt; div &gt; div:nth-child(3) &gt; div &gt; div &gt; div &gt; div &gt; div &gt; div:nth-child(1) &gt; label &gt; input').click();}; document.querySelector('body &gt; div:nth-child(4) &gt; div.UIModal.is-white.is-open &gt; div &gt; div.UIModalHeader &gt; div &gt; span &gt; div &gt; span &gt; button &gt; span').click();*/&quot;</span>
<span class="comment">/*
function solveLearn() {
    script = document.createElement('script');
    script.textContent = learnInsertJs;
    (document.head||document.documentElement).appendChild(script);
    script.remove();
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.run == &quot;write&quot;) {
      iters = parseInt($(&quot;.LearnModeProgressBar-value&quot;).html())
      for (var i = 0; i &lt; iters; i++) {
        
        $(&quot;#user-answer&quot;)[0].value = &quot;*&quot;; 
        $(&quot;#js-learnModeAnswerButton&quot;)[0].click();
        document.evaluate('//*[@id=&quot;js-learnModeInner&quot;]/div[1]/div/div[2]/div/div[2]/span/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
      }
      sendResponse({out: 0});
    }
    else if (request.run === &quot;learn&quot;) {
      solveLearn();
      sendResponse({out: 0});
    }
    else {
      sendResponse({out: 1});
    }
});
*/</span>

<span class="comment">/* Enter Spoof - Works
document.getElementById(&quot;user-answer&quot;).focus();
var keyEvent = new KeyboardEvent(&quot;keydown&quot;, {
	bubbles: true,
	cancelable: true,
	char: &quot;Enter&quot;,
	key: &quot;Enter&quot;,
	shiftKey: false,
	keyCode: 13,
	which: 13
});

document.getElementById(&quot;user-answer&quot;).dispatchEvent(keyEvent);
*/</span></pre></td>
</tr></table>

</div>

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

