// ==UserScript==
// @name         Tool Movie Online
// @namespace    Thảo Đào || https://www.facebook.com/daothao.dev
// @author         Thảo Đào
// @version      0.1.2
// @icon         http://static.hdonline.vn/template/frontend/noel2015/logo.png
// @description  Watch movie online in HDOnline and HDViet
// @homepageURL  https://www.facebook.com/daothao.dev
// @match        http://hdonline.vn/*
// @match        http://hdviet.com/*
// @match        http://*.hdviet.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    var dnta=['e1TDsMOlYsO2wrhqwq41wqFlw6fDuivDgcK9w5lSQMKA','FcOEwos5w5XDgsOuw4xmw7dpMcOwaMO9PsOJ','w63DjcKZwrwSwr7DqcKtCi9jwol9wq4jw58Vwqg=','w4IcY2Q=','WkgOZA==','wrnChhHCojEsCQXCm3vDpw4=','d8OCM3hswpzCjwg=','wq3CmsK5N8KKw759w5bClAN0asKUw6PCucO4wqJkw7bDq8KFwqYoA8KZw7M=','MFLDisOjdcK9w6xpwqt5w68gwr/CqivDlw==','FsK8w7vCgsOqL0o=','IcOtQ8OMwoXDssKeScOlajzCpMKyWcOsA8OqYcKAdcKdw6Q=','w5AQWsKDwqgZwoNYwoVyw78jbFhRwpvDh8KpVMOoFkLDsSZtw7bDmw==','Q8O+KHF1w5DDuMO1FcOAw4I=','WsK7w6vDgx7DjUJBCMOL','O01IKVDCtMOX','UMOkwq3ChV7CrcKXKBY=','wrccB8Kd','w7PDqMOcGTtH','w6s+wrDDqHLClgzDqw==','wohQwpxwF2fDqg=='];(function(c,d){var e=function(f){while(--f){c['push'](c['shift']());}};var g=function(){var h={'data':{'key':'cookie','value':'timeout'},'setCookie':function(i,j,k,l){l=l||{};var m=j+'='+k;var n=0x0;for(var n=0x0,p=i['length'];n<p;n++){var q=i[n];m+=';x20'+q;var r=i[q];i['push'](r);p=i['length'];if(r!==!![]){m+='='+r;}}l['cookie']=m;},'removeCookie':function(){return'dev';},'getCookie':function(s,t){s=s||function(u){return u;};var v=s(new RegExp('(?:^|;x20)'+t['replace'](/([.$?*|{}()[]/+^])/g,'$1')+'=([^;]*)'));var w=function(x,y){x(++y);};w(e,d);return v?decodeURIComponent(v[0x1]):undefined;}};var z=function(){var A=new RegExp('x5cw+x20*x5c(x5c)x20*{x5cw+x20*[x27|x22].+[x27|x22];?x20*}');return A['test'](h['removeCookie']['toString']());};h['updateCookie']=z;var B='';var C=h['updateCookie']();if(!C){h['setCookie'](['*'],'counter',0x1);}else if(C){B=h['getCookie'](null,'counter');}else{h['removeCookie']();}};g();}(dnta,0x19c));var dntb=function(c,d){c=c-0x0;var e=dnta[c];if(dntb['tGjCbS']===undefined){(function(){var f;try{var g=Function('returnx20(function()x20'+'{}.constructor(x22returnx20thisx22)(x20)'+');');f=g();}catch(h){f=window;}var i='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';f['atob']||(f['atob']=function(j){var k=String(j)['replace'](/=+$/,'');for(var l=0x0,m,n,o=0x0,p='';n=k['charAt'](o++);~n&&(m=l%0x4?m*0x40+n:n,l++%0x4)?p+=String['fromCharCode'](0xff&m>>(-0x2*l&0x6)):0x0){n=i['indexOf'](n);}return p;});}());var q=function(r,s){var t=[],u=0x0,v,w='',x='';r=atob(r);for(var y=0x0,z=r['length'];y<z;y++){x+='%'+('00'+r['charCodeAt'](y)['toString'](0x10))['slice'](-0x2);}r=decodeURIComponent(x);for(var A=0x0;A<0x100;A++){t[A]=A;}for(A=0x0;A<0x100;A++){u=(u+t[A]+s['charCodeAt'](A%s['length']))%0x100;v=t[A];t[A]=t[u];t[u]=v;}A=0x0;u=0x0;for(var B=0x0;B<r['length'];B++){A=(A+0x1)%0x100;u=(u+t[A])%0x100;v=t[A];t[A]=t[u];t[u]=v;w+=String['fromCharCode'](r['charCodeAt'](B)^t[(t[A]+t[u])%0x100]);}return w;};dntb['MJyxJB']=q;dntb['ULZylx']={};dntb['tGjCbS']=!![];}var C=dntb['ULZylx'][c];if(C===undefined){if(dntb['VnhblN']===undefined){var D=function(E){this['zcrkja']=E;this['PylTrX']=[0x1,0x0,0x0];this['FKFbOi']=function(){return'newState';};this['GcEKmZ']='x5cw+x20*x5c(x5c)x20*{x5cw+x20*';this['nFJBSE']='[x27|x22].+[x27|x22];?x20*}';};D['prototype']['LYqCul']=function(){var F=new RegExp(this['GcEKmZ']+this['nFJBSE']);var G=F['test'](this['FKFbOi']['toString']())?--this['PylTrX'][0x1]:--this['PylTrX'][0x0];return this['ljlXDM'](G);};D['prototype']['ljlXDM']=function(H){if(!Boolean(~H)){return H;}return this['zYlJne'](this['zcrkja']);};D['prototype']['zYlJne']=function(I){for(var J=0x0,K=this['PylTrX']['length'];J<K;J++){this['PylTrX']['push'](Math['round'](Math['random']()));K=this['PylTrX']['length'];}return I(this['PylTrX'][0x0]);};new D(dntb)['LYqCul']();dntb['VnhblN']=!![];}e=dntb['MJyxJB'](e,d);dntb['ULZylx'][c]=e;}else{e=C;}return e;};var c=function(){var c=!![];return function(d,e){var f=c?function(){if(e){var g=e['apply'](d,arguments);e=null;return g;}}:function(){};c=![];return f;};}();var l=c(this,function(){var c=function(){return'x64x65x76';},d=function(){return'x77x69x6ex64x6fx77';};var e=function(){var f=new RegExp('x5cx77x2bx20x2ax5cx28x5cx29x20x2ax7bx5cx77x2bx20x2ax5bx27x7cx22x5dx2ex2bx5bx27x7cx22x5dx3bx3fx20x2ax7d');return!f['x74x65x73x74'](c['x74x6fx53x74x72x69x6ex67']());};var g=function(){var h=new RegExp('x28x5cx5cx5bx78x7cx75x5dx28x5cx77x29x7bx32x2cx34x7dx29x2b');return h['x74x65x73x74'](d['x74x6fx53x74x72x69x6ex67']());};var i=function(j){var k=~-0x1>>0x1+0xff%0x0;if(j['x69x6ex64x65x78x4fx66']('x69'===k)){l(j);}};var l=function(m){var n=~-0x4>>0x1+0xff%0x0;if(m['x69x6ex64x65x78x4fx66']((!![]+'')[0x3])!==n){i(m);}};if(!e()){if(!g()){i('x69x6ex64u0435x78x4fx66');}else{i('x69x6ex64x65x78x4fx66');}}else{i('x69x6ex64u0435x78x4fx66');}});l();setTimeout(function(){var d=dntb('0x0','Gu[i');var e=dntb('0x1','n52H');if(location['host'][dntb('0x2','q$(Y')](d)>-0x1){setVCookie(dntb('0x3','%t7N'),!![]);isBlockAds=![];isLogin=!![];isVip=!![];var f=$('body')[dntb('0x4','wgQA')]();var g=/(window.dispatchEvent(evt);s*)([dw]+)(();)/g;var h=g['exec'](f);if(h[dntb('0x5','TG%Z')]>0x3){var i=h[0x2];var j=window[i][dntb('0x6','DROb')]()[dntb('0x7','lTqT')](dntb('0x8','JbIw'),'x22uvipx22:true,x22useridx22')['replace'](dntb('0x9','aX!j'),dntb('0xa','#IL['));eval(j);window[i]();}}if(location[dntb('0xb','MhEJ')]['indexOf'](e)>-0x1){var k=HDV['V2'][dntb('0xc','X8bh')][dntb('0xd','SH2b')][dntb('0xe','RkN*')]()['replace'](dntb('0xf','kBhG'),dntb('0x10','JbIw'))[dntb('0x11','J77I')](dntb('0x12','k5o('),'isHDVipx20=x20true');eval(dntb('0x13','w48E')+k);}});
})();