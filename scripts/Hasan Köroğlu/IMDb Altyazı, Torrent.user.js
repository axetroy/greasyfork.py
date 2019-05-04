// ==UserScript==
// @name        IMDb Altyazı, Torrent
// @author      Hasan KÖROĞLU
// @namespace   hasankoroglu.com
// @description IMDb üzerinde bir filmin sayfasında, filmin isminin yanında Türkçe Altyazı sitesindeki ilgili filmin altyazı sayfasına direk erişim sağlayan bir link ekliyor. Ek olarak Zamunda ve IPT üzerinde de arama yapıyor
// @include     https://www.imdb.com/title/*
// @version     1.9
// @grant       none
// ==/UserScript==

var IMDbID = document.URL.split("/")[4];
var IMDbID4TA = IMDbID.replace("tt","");
var spanNOBR = document.querySelector('div.title_wrapper h1');

if (spanNOBR !== null)
  {
    var hr01 = document.createElement('hr');
    hr01.style.margin = 0;
    spanNOBR.appendChild(hr01);

    /*----------------Türkçe Altyazı-----------------*/
    var taLink = document.createElement('a');
    taLink.href = 'http://www.turkcealtyazi.org/mov/' + IMDbID4TA + '/';
    taLink.target = 'ta';
      
    
    var taIcon = new Image();
    taIcon.src= ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAxlBMVEXs5uDYmFjej0LYlVTs5Nzaq376fAD7fQDapXLdoWbxgRTmlkvpizPsiCfqgyHnlUnnlEb3ewDfoGLnk0X////pwJzptYbcoG327+n38e7udgLv2snveQfotYbppWfkhSz7+ff28e7tdgLnk0Tnn1zppmf5fADpxqjugRfquo/vfQ/qjDPnsYD2egDtegvoxqnmupTvegncoWjjuZXu39Xu39TlsIDarYL4ewD1eQD5ewDaqXjw7Ojao27eoGLao2zu6eT///+9dV4WAAAAQXRSTlMcpbuoIX79/YqW/f39/f39/f2a/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/ZT9/f39e/39/YYUjpqQGHUulP4AAAABYktHRBSS38k1AAAAB3RJTUUH4gEfDA8XrxMePAAAAIlJREFUGNOdzdcOAkEIQFFsoI51xV7Wuvbeu///VcJo4jx7Hwg5IQEgFHaKRCGG5IRxSCSNSaWNlMmaXN4Dr8BcLLFUrnC1ZqHeaCq0/HanK9DjPloYBEN7MRpP6AM0nc0FSN58QVYF+gH9DbhYKqzWFjZEwXan7Q+ocJR5OtsucnyF2/3h9Hy9Acj/Ff/423BoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAxLTMxVDEyOjE1OjIzLTA3OjAwC521fwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMS0zMVQxMjoxNToyMy0wNzowMHrADcMAAAAASUVORK5CYII=';
    taIcon.alt= 'TurkceAltyazi.org';
    taIcon.title= 'TurkceAltyazi.org';
    taIcon.setAttribute('width', '16px');
    taIcon.setAttribute('height', '16px');
    taIcon.style.marginLeft = '15px';
   
    taLink.appendChild(taIcon);
    spanNOBR.appendChild(taLink);
    /*----------------Türkçe Altyazı-----------------*/
    
    /*----------------Zamunda-----------------*/
    var zamundaLink = document.createElement('a');
    zamundaLink.href = 'http://zamunda.net/bananas?search=' + IMDbID + '&incldead=&field=descr';
    zamundaLink.target = 'zamunda';
    
    var zamundaIcon = new Image();
    zamundaIcon.src= ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACyklEQVR42k1UXU8TQRTd/4eGYMFI9Mk3E6I++GBMjPqi8cEXNcHSiNIWJBjQECJCbAgK5UM+LVALtAu0hZay22/b7tyd451pQSc5DzP33nPOnZ27hmwt15VSCCFPcgW5GjuRy3uWXNnPy9V4Xv4yLRk/zstytSZd4kRXXizD5UoiguMIxNM2oodn2E9ZSFl1WBXCWdnBsV1DIlNCLGkjmS2AhcB1cKULo+64slZv4Gc0ia1kCY5wOCigSJM2IWEJ1BzSexXbMIv4bWZY0NEkRrVWl0o1mq42WRkqeS5BuDFM6AwI9IaJSViVz9k1IodFdmlznoARSeTkQsxGpSbAbiA4qc6KL3+oYlfj5gjhwFIEyrZkJwLrCRuFcg3Gx4UT+S1awWmJYJcJRd03q38gdA1KDU+AsJki7t3VaDQIS7t5mGkLxquQLb/HBfZPuec8Ic2Y2W2qnxN0BiTmTSavEkp/SOcumgLTqykYd0aLcmKbsJYk7BwT4hx8GvpH0Bl0ccXvYvmQcFwQ2M0SNtIuVo5c+GeZoPt9Xj6fIXzdIQyvs7UDwqMp0rab6oSHvJ9nlxspRprFuJ3xLb6nyQMYPYNJeS3g4AWTPGPlx9OE13OkbZ8TKHQFBT5FSDvxLREefCH0TcVh9E3uyg6fja5A8+bvc8Ab/s8Bt6DBe98CxycI14cI3QNlhFZNGGvRI9kTTMHjFzrp1hhxz9RSdpmoCX0nQSZuxW4PpWGmTmEUikU5MhtDm7ekgx6/qwmUAw3/eVHLCZNc9pUwyjXVagWGGqBcLoe344u41FeGZ0BcPKCLzxhs7pXLNm8Rb8YWoWrUTBhqCuuNOjLZLD7PbuPekImr/Rba3znaSccAob2/jm7fCe4G4hgJRZDJZPkxNZqzoEZSvX11kLd5GvcSmApvoXd8A0+GGMMReMfXMR3exE4sDsuy4bSK+R+Av2zpb/iEe4yjAAAAAElFTkSuQmCC';
    zamundaIcon.alt= 'Zamunda.Net';
    zamundaIcon.title= 'Zamunda.Net';
    zamundaIcon.setAttribute('width', '16px');
    zamundaIcon.setAttribute('height', '16px');
    zamundaIcon.style.marginLeft = '15px';
   
    zamundaLink.appendChild(zamundaIcon);
    spanNOBR.appendChild(zamundaLink);
    /*----------------Zamunda-----------------*/


    /*----------------IPTorrents-----------------*/
    var iptLink = document.createElement('a');
    iptLink.href = 'https://iptorrents.com/t?q=' + IMDbID + '/';
    iptLink.target = 'ipt';
    
    var iptIcon = new Image();
    iptIcon.src= ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAqFBMVEUAAAAZGRsZGRtBQUJISElAQEFCQkMZGRsZGRsZGRstLS8ZGRtHR0lFRUdHR0kZGRtCQkQrKy1CQkNDQ0UZGRsZGRtGRkgZGRsjIyUxMTM1NTc2NTdCQUNGRkhHR0lSUlNSUlRpaWtvbm+AgIGLiouMi4yXlpeYl5iZmJmamZmioaKura65uLm/vr7Fw8TMysvQz8/T0dLb2trl4+Pn5eXw7u7y8PH9+/sAlp/OAAAAF3RSTlMAMDM0NjtydXh+foGDhoaHi4yTlJn8/WhZUs4AAACJSURBVBgZVcHLDoIwEEDR2+kgT6Nu/P8fxMRgoJTSURYGOMdROHa2qD4qdqH3zZUDRYQTr1C2r2vBGDMbgaKkgEfLswPU2MTPvcQ3bjBZjZ9LV80jYTTTvKwkU9/PmRQsK7ay2nvgx2UQdrFrwWslcyQlYEq2JFfdOApinESJmYMcHFLX/E1T/gLDGzwhNRbwQQAAAABJRU5ErkJggg==';
    iptIcon.alt= 'IPTorrents';
    iptIcon.title= 'IPTorrents';
    iptIcon.setAttribute('width', '16px');
    iptIcon.setAttribute('height', '16px');
    iptIcon.style.marginLeft = '15px';
   
    iptLink.appendChild(iptIcon);
    spanNOBR.appendChild(iptLink);
    /*----------------IPTorrents-----------------*/
      
      var hr02 = document.createElement('hr');
      hr02.style.margin = 0;
      spanNOBR.appendChild(hr02);
  }