// ==UserScript==
// @name       CC Code
// @version    1.0.28
// @description  CC Code 是一个贴吧扩展程序/脚本，功能类似于“度伴娘”中的贴吧小工具。
// @match      *://tieba.baidu.com/*
// @include      *://tieba.baidu.com/*
// @icon		http://ww2.sinaimg.cn/large/8c5fbe53gw1eah13rn48hj201s01smwx.jpg
// @author		864907600cc
// @grant       none
// @run-at      document-end
// @namespace   http://ext.ccloli.com
// @!updateURL	https://userscripts.org/scripts/source/182770.meta.js
// @!downloadURL	https://userscripts.org/scripts/source/182770.user.js
// ==/UserScript==

// CC Code
// Copyright (c) 864907600cc. Some rights reserved.
// 本扩展程序使用了 Crypto-JS 的 AES 加密脚本, Licence: BSD

if(document.getElementsByClassName('p_postlist')[0]||document.getElementById('thread_list')){

var stylesheet='.cc_code_panel{padding-left:25px;float:left}.cc_code_title{color:#3163b6;padding:5px 0}.cc_code_content span{color:orange;cursor:pointer;margin-right:20px}.cc_cipher,.cc_video{color:green;cursor:pointer}.cc_code_title span{cursor:pointer}.e_inter_wrapper{height:auto!important}.tb-editor-wrapper{float:left}.poster_body .cc_code_panel{width:100%;margin-left:0!important;padding-left:0;margin-bottom:15px;float: none;}body[has_tbbg_extension] .cc_code_panel,html[has_tbbg_extension] .cc_code_panel{margin-left:4px}#list_loading{display:none!important}';
var ss=document.createElement('style');
ss.textContent=stylesheet;
document.head.appendChild(ss);

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

console.log('%cCC Code%c main script start loading.','color:#ff7f3e;text-decoration:underline','color:#ff7f3e');
var t0=new Date().getTime();
//定义加密解密函数
function cc_encode(){
	var pwd=prompt("请输入密码以加密（无密码请留空）：");
	if(pwd!=null){
		var text=editor,
			content=text.innerHTML;
		if(!content)return;
		else var result=String(CryptoJS.AES.encrypt(content,pwd)).replace(/\n/g,'');
		var s=document.createElement('span');
		s.innerHTML='#CC_Cipher#'+result+' <br>';
		//text.innerHTML = '';
		text.appendChild(s);
		if(panel.getElementsByClassName('cc_code_cancelcode')[0])var ct=panel.getElementsByClassName('cc_code_cancelcode')[0];
		else {
			var ct=document.createElement('span');
			ct.className='cc_code_cancelcode';
			ct.innerHTML='取消解密';
		}
		ct.onclick=function(){/*text.innerHTML=text.innerHTML.replace('#CC_Cipher#'+result,content);*/s.outerHTML='';ct.outerHTML=''};
		panel.getElementsByClassName('cc_code_content')[0].insertBefore(ct,panel.getElementsByClassName('cc_code_encode')[0]);
	}
}
function cc_decode(){
	try{
		var result=CryptoJS.AES.decrypt(this.getAttribute('ciphertext'),'').toString(CryptoJS.enc.Utf8)||null;
		this.outerHTML=result.replace(/<script/gi,'&lt;script').replace(/<style/gi,'&lt;style').replace(/<link/gi,'&lt;link').replace(/<meta/gi,'&lt;meta').replace(/<iframe/gi,'&lt;iframe').replace(/<frame/gi,'&lt;frame').replace(/<object/gi,'&lt;object').replace(/<embed/gi,'&lt;embed').replace(/on(\w*?)=/gi,"on$1!=").replace(/(=|='|="|=`)javascript:/);
	}
	catch(error){
		var pwd=prompt("请输入密码以解密：");
		if(pwd!=null){
			try{
				var result=CryptoJS.AES.decrypt(this.getAttribute('ciphertext'),pwd).toString(CryptoJS.enc.Utf8)||null;
				this.outerHTML=result.replace(/<script/gi,'&lt;script').replace(/<style/gi,'&lt;style').replace(/<link/gi,'&lt;link').replace(/<meta/gi,'&lt;meta').replace(/<iframe/gi,'&lt;iframe').replace(/<frame/gi,'&lt;frame').replace(/<object/gi,'&lt;object').replace(/<embed/gi,'&lt;embed').replace(/on(\w*?)=/gi,"on$1!=").replace(/(=|='|="|=`)(javascript:)/gi, '$1http://$2');
			}
			catch(error){
				alert('解密失败，请确认密码正确...');
			}
		}
	}
}

//定义插入视频及转换函数
function cc_addvideo(){
	var url=prompt("请输入视频页地址（目前支持 YouTube、AcFun、bilibili、Tucao.cc、SoundCloud、虾米、网易云音乐，尝试性支持 catfun、萌否电台）：");
	if(url!=null){
		var text=editor;
		if(url.indexOf('youtu')>=0)result=url.replace(/.*youtu\.?be.*?\/(?:watch\?.*?v=)?([\w-]{11}).*/,'#youtube#$1');
		else if(url.indexOf('acfun')>=0||url.indexOf('ranktv')>=0)result=url.replace(/.*(ac\d+|ac\d+_\d+).*/,'#acfun#$1');
		else if(url.indexOf('bilibili')>=0)result=url.replace(/.*(av\d+)(?:\/index(_\d+))?.*/, '#bilibili#$1$2');
		else if(url.indexOf('loli.my')>=0||url.indexOf('hdslb')>=0)result=url.replace(/.*aid=(\d+)(?:&page=(\d+))?.*/, '#bilibili#av$1_$2');
		else if(url.indexOf('tucao.cc/mini')>=0)result=url.replace(/.*mini\/([\d_]+)\.swf/, '#tucao#$1');
		else if(url.indexOf('tucao.cc/play')>=0)result=url.replace(/\/#/,'_').replace(/.*play\/h(\d+_\d+|\d+).*/, '#tucao#$1');//http://www.tucao.cc/play/h4020744/#8
		else if(url.indexOf('catfun')>=0)result=url.replace(/.*(cat\d+)(?:\/index(_\d+))?.*/, '#catfun#$1$2');
		else if(url.indexOf('soundcloud')>=0)result=url.replace(/%2F/gi,'/').replace(/.*soundcloud.com\/(tracks\/\d+|[-\/\w]+).*/, '#soundcloud#$1');
		else if(url.indexOf('xiami')>=0)result=url.replace(/.*(?:song\/|widget\/\d*_)(\d+).*/, '#xiami#$1');
        else if(url.indexOf('moe.fm')>=0)result=url.replace(/\//gi,'=').replace(/.*((?:song|music)=[\d,]+).*/, '#moefm#$1');
        else if(url.indexOf('moefm.ccloli')>=0)result=url.replace(/\//gi,'=').replace(/.*((?:song|music)=[\d,]+).*/, '#moefm#$1 #moefm#html5?$1');
        else if(url.indexOf('music.163')>=0)result=url.replace(/\//gi,'=').replace(/.*(song|album|playlist)(?:\?id=|\/)(\d+).*/, '#163music#$1/$2');
		else return;
		var s=document.createElement('a');
		text.appendChild(s);
		s.outerHTML=result+' <br>';
		url=null;
	}
}
function cc_devideo(){
	var t=this.getAttribute('type'),
		v=this.getAttribute('mid');
	if(document.getElementById('cc_media_'+t+'_'+v)){
		document.getElementById('cc_media_'+t+'_'+v).outerHTML='';
		this.title="点击展开";
	}
	else {
		var node=document.createElement('div');
		node.id='cc_media_'+t+'_'+v;
		switch(t){
		case 'youtube':
			node.innerHTML='<iframe src="//www.youtube.com/embed/'+v+'" width="560" height="400" frameborder="0" allowfullscreen></iframe>';
			break;
		case 'acfun':
			node.innerHTML='<object type="application/x-shockwave-flash" wmode="direct" allowfullscreeninteractive="true" allowfullscreen="true" allowscriptaccess="always" data="http://www.acfun.tv/player/'+v+'" width="560" height="400"></object>';
			break;
		case 'bilibili':
			node.innerHTML='<embed height="400" width="560" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="http://static.hdslb.com/miniloader.swf?aid='+v.replace(/av/,'').replace(/_/,'&page=')+'"></embed>';
			break;
		case 'tucao':
			node.innerHTML='<embed type="application/x-shockwave-flash" allowfullscreen="true" src="http://www.tucao.cc/mini/'+v+'.swf" width="560" height="400" quality="high"></embed>';
			break;
		case 'catfun':
			node.innerHTML='<iframe src="http://catfun.gsksoft.cn/player.html?'+v.replace(/cat/,'').replace(/_/,'|')+'|1" width="590" height="471" frameborder="0" allowfullscreen scrolling="no"></iframe>';
			break;
		case 'soundcloud':
			node.innerHTML='<iframe width="560" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http://api.soundcloud.com/'+v+'"></iframe>';
			break;
		case 'xiami':
			node.innerHTML='<embed src="http://www.xiami.com/widget/0_'+v+'/singlePlayer.swf" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent"></embed>';
			break;
		case 'moefm':
			node.innerHTML='<iframe src="http://moe.fm/listen?'+v+'" width="450" height="125"></iframe>';
			break;
		case 'moefm_html5':
			node.innerHTML='<iframe src="http://moefm.ccloli.com/?'+v+'#loop=1,background=0" width="450" height="125"></iframe>';
			break;
		case '163music':
			var vg = v.split('/');
			var vl = {
				playlist: 0,
				album: 1,
				song: 2,
				program: 3,
				djradio: 4
			}
			vg[0] = vl[vg[0]];
			node.innerHTML='<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=' + (vg[0] === 2 || vg[0] === 3 ? '86' : '450') + ' src="http://music.163.com/outchain/player?type=' + vg[0] + '&id=' + vg[1] + '&auto=1&height=' + (vg[0] === 2 || vg[0] === 3 ? '66' : '430') + '"></iframe>';
			break;
		}
		this.parentElement.insertBefore(node,this.nextElementSibling);
		this.title="点击收起";
	}
}

//定义插入音乐函数
function cc_addmusic(){
	var url=prompt('请输入音乐外链地址（百度播放器仅支持 mp3）：');
	if(url!=null){
		var title=prompt('请输入歌曲名：');
		if(title==null)title='';
		var artist=prompt('请输入歌手名：');
		if(artist==null)artist='';
		var text=editor;
		var s=document.createElement('a');
		text.appendChild(s);
		//text.innerHTML+='<img unselectable="on" class="BDE_Music" src="/tb/static-common/editor_img/music.png" title="http://box.baidu.com/widget/flash/bdspacesong.swf?from=tieba&url='+encodeURI(url)+'&name='+encodeURI(title)+'&artist='+encodeURI(artist)+'&extra=&autoPlay=true&loop=true" width="400" height="95" data-width="400" data-height="95"><br>';
		s.outerHTML='<img data-height="95" data-width="400" title="http://box.baidu.com/widget/flash/bdspacesong.swf?from=tiebasongwidget&amp;url='+encodeURIComponent(url)+'&amp;name='+encodeURIComponent(title)+'&amp;artist='+encodeURIComponent(artist)+'&amp;extra=&amp;autoPlay=false&amp;loop=true" src="http://tieba.baidu.com/tb/editor/v2/music.png" class="BDE_Music"><br>';
	}
}


//定义扩展介绍函数
function cc_about(){
	var s=document.createElement('script');
	s.innerHTML='$.dialog.alert(\'<style>.dialogJ.dialogJfix{font-size:14px;color:#000;background:rgba(255,255,255,.5)!important;font-family:微软雅黑!important}.dialogJbody{padding:15px;word-break:initial;text-align:justify}</style>CC Code 是一个贴吧扩展程序，功能类似于 <a href="http://www.baidu.com/p/%E6%82%A0%E6%82%A0%E5%A5%88%E4%BD%95" target="_blank">@悠悠奈何</a> 的扩展“<a href="https://chrome.google.com/webstore/detail/ladblhncmdocpacjhapihkgbmamliljn" target="_blank">度伴娘</a>”中的贴吧小工具。扩展开发的起源是由于“度伴娘”久不更新（现该扩展已继续更新），所以 cc 就写了这个扩展程序实现原扩展的某些功能（但可能有所差异）。通过这个扩展程序，您可以实现以下内容：<br><ul><li><b>加密文字</b><br>这里的加密文字功能和“度伴娘”中的百度密语相似（本扩展程序不能解析“度伴娘”的百度密语），但是该扩展的特殊之处是你可以设置密码。你可以将你想说的话在发贴框中输入，然后点击“加密文字”，即可将文字转换为密文（若不设置密码则直接点击确定）。当其他安装了 CC Code 的用户点击你的密文时会被要求输入密码（若无密码则直接点击确定），只有输入了正确的密码才可以显示文字。<br><small>本扩展程序使用了来自 <a href="https://code.google.com/p/crypto-js/" target="_blank">Crypto-JS</a> 的 AES 加密脚本（© 2009–2013 by Jeff Mott.）。</small></li><li><b>插入视频</b><br>这里的插入视频功能和“度伴娘”的 UUCode 功能类似（本扩展程序不能解析“度伴娘”的部分视频代码）。通过该功能，你可以将百度不支持的某些视频网站（目前支持 YouTube、A 站、B 站、C 站、SoundCloud、虾米，尝试性支持 catfun）以代码的形式插入贴子中。当其他安装了 CC Code 的用户点击这段代码时，即可直接在贴吧播放视频。<br><small>同“度伴娘”一样，只有安装了 CC Code 的用户才能直接查看视频，建议插入视频后在贴子中贴上原视频网址。</small></li><li><b>插入音乐</b><br>贴吧又他喵的改版了，不能在贴子中插入音乐外链了，百度的音乐库少的可怜啊=.=……不过通过该功能，你可以像以往一样插入 mp3 外链了哦~~<br><small>任何人都可以看见插入的音乐，即便没有安装本扩展程序——除非百度把这功能封了……</small></li></ul><br>如果你对本扩展有任何疑问、建议或遇到了 bug，请<a href="http://msg.baidu.com/msg/writing?receiver=864907600cc" target="_blank">反馈</a>……\',{title:"CC Code Introduction",width:800})';
	document.body.appendChild(s);
	document.body.removeChild(s);
}


//控制面板函数
function add_panel(){
	panel=document.createElement('div');
	panel.className='cc_code_panel';
	panel.innerHTML='<div class="cc_code_title"><span>CC Code</span></div>'
		+'<div class="cc_code_content">'
			+'<span class="cc_code_encode" title="注意：解密密文仅安装了 CC Code 的用户可用。Powered by Crypto-JS.">加密文字</span>'
			+'<span class="cc_code_addvideo" title="注意：这些代码仅安装了 CC Code 的用户可用。">外站媒体</span>'
			+'<span class="cc_code_addmusic" title="功能已失效"><del>插入音乐</del></span>'
		+'</div>';
	p_node.parentNode.insertBefore(panel,p_node.nextElementSibling);
	
	//触发扩展程序介绍事件函数
	panel.getElementsByClassName('cc_code_title')[0].getElementsByTagName('span')[0].onclick=function(event){cc_about()}
	//触发加密事件函数
	panel.getElementsByClassName('cc_code_encode')[0].onclick=function(event){cc_encode()}
	//触发插入视频函数
	panel.getElementsByClassName('cc_code_addvideo')[0].onclick=function(event){cc_addvideo()}
	//触发插入音乐函数
	panel.getElementsByClassName('cc_code_addmusic')[0].onclick=function(event){cc_addmusic()}
	editor=document.getElementById('editor')?document.getElementById('editor').getElementsByClassName('tb-editor-editarea')[0]:document.getElementById('ueditor_replace');
}


//替换正文内容函数
function kill_tieba_lazyload(){
	if(document.getElementById('pblistCodeArea')){
		//document.getElementById('list_loading').outerHTML=document.getElementById('pblistCodeArea').value;
		//document.getElementById('pblistCodeArea').parentElement.removeChild(document.getElementById('pblistCodeArea'));
		var lazyload_nodes=document.getElementById('pblistCodeArea').childNodes;
		for(var i=0;i<lazyload_nodes.length;i++) {
			if(lazyload_nodes[i].nodeType==8) {
		    	document.getElementById('pblistCodeArea').outerHTML=lazyload_nodes[i].data;
				//lazyload_nodes[i].parentElement.removeChild(lazyload_nodes[i])
		    	break;
		    }
		}
		_.Module.use("pb/widget/ForumListV3", {});
		_.Module.use('pb/component/NoAutoVideo',[{text_videofrom:'视频来自: '}]);
		rebind_image();
	}
}

function rebind_image(){
	var imglist=document.querySelectorAll('.d_post_content img[pic_type="0"]');//.BDE_Image
	$(imglist).unbind();
	Page.bindOpenImg();
}

function bind_pager(){
	var pager=document.getElementsByClassName('l_pager');
	for(var i=0;i<pager.length;i++){
		pager[i].onclick=function(){
			setInterval(function(){
				if(PageData.pager.cur_page!=c_pager){
					bind_pager();
					replace_nodes();
					c_pager=PageData.pager.cur_page;
				}
			},1000)
		}
	}
}

function replace_nodes(){
	if(document.getElementsByClassName('d_post_content')[0]){
		var d=/#(CC_Cipher|youtube|utb|acfun|bilibili|tucao|catfun|soundcloud|xiami|moefm|163music)#/,
		t1=new Date().getTime(),
		list=[],
		xpath = document.evaluate(
			'//cc//text()', //XPath表达式：选择所有文本元素（text node）
			document,//document.body, //筛选环境
			null, //指定命名空间，不用管它
			XPathResult.ORDERED_NODE_ITERATOR_TYPE, //被匹配的元素按出现顺序排列
			null
		),
		k,x;
		while (k = xpath.iterateNext()) {
			if(k.parentElement.hasAttribute('class')&&k.parentElement.className=='cc_video')continue;
			if (!d.test(x = k.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"))) continue;
			if(x.indexOf('#CC_Cipher#')>=0)x=x.replace(/#CC_Cipher#([a-zA-z0-9+\/=]{20})([a-zA-z0-9+\/=]*)([a-zA-z0-9+\/=]{20})/gi,'<span class="cc_cipher" ciphertext="$1$2$3">#CC_Cipher#$1...$3</span>');
			if(x.indexOf('#youtube#')>=0||x.indexOf('#utb#')>=0)x=x.replace(/#youtube#([\w-]{11})|#utb#([\w-]{11})/gi,'<span class="cc_video" type="youtube" mid="$1$2" titie="点击展开">#youtube#$1$2</span>');
			if(x.indexOf('#acfun#')>=0)x=x.replace(/#acfun#(ac\d+_\d+|ac\d+)/gi,'<span class="cc_video" type="acfun" mid="$1" titie="点击展开">#acfun#$1</span>');
			if(x.indexOf('#bilibili#')>=0)x=x.replace(/#bilibili#(av)?(\d+_\d+|\d+)/gi,'<span class="cc_video" type="bilibili" mid="$1$2" titie="点击展开">#bilibili#$1$2</span>');
			if(x.indexOf('#tucao#')>=0)x=x.replace(/#tucao#([\d_]+)/gi,'<span class="cc_video" type="tucao" mid="$1" titie="点击展开">#tucao#$1</span>');
			if(x.indexOf('#catfun#')>=0)x=x.replace(/#catfun#(cat[\d_]+)/gi,'<span class="cc_video" type="catfun" mid="$1" titie="点击展开">#catfun#$1</span>');
			if(x.indexOf('#soundcloud#')>=0)x=x.replace(/#soundcloud#(tracks(?:\/|%2F)\d+|[-\/\w]+)/gi,'<span class="cc_video" type="soundcloud" mid="$1" titie="点击展开">#soundcloud#$1</span>');
			if(x.indexOf('#xiami#')>=0)x=x.replace(/#xiami#(\d+)/gi,'<span class="cc_video" type="xiami" mid="$1" titie="点击展开">#xiami#$1</span>');
	        if(x.indexOf('#moefm#html5?')>=0)x=x.replace(/#moefm#html5\?((?:song|music|radio)=[\d,]+)/gi,'<span class="cc_video" type="moefm_html5" mid="$1" titie="点击展开">#moefm#html5?$1</span>');
	        if(x.indexOf('#moefm#')>=0)x=x.replace(/#moefm#((?:song|music|radio)=[\d,]+)/gi,'<span class="cc_video" type="moefm" mid="$1" titie="点击展开">#moefm#$1</span>');
	        if(x.indexOf('#163music#')>=0)x=x.replace(/#163music#((?:song|album|playlist|djradio)(?:\/|=)\d+)/gi,'<span class="cc_video" type="163music" mid="$1" titie="点击展开">#163music#$1</span>');
			list.push([k,x]);
		}
		while (e = list.shift()){
			var node = document.createElement('a');
			e[0].parentElement.replaceChild(node,e[0]);
			node.outerHTML = e[1];
		}
		var ciphertext=document.getElementsByClassName('p_postlist')[0].getElementsByClassName('cc_cipher'),
			pvideo=document.getElementsByClassName('p_postlist')[0].getElementsByClassName('cc_video');
		for(var j=0;j<ciphertext.length;j++)ciphertext[j].onclick=cc_decode;
		for(var j=0;j<pvideo.length;j++)pvideo[j].onclick=cc_devideo;
		console.log('%cCC Code%c 替换正文节点时间统计：'+(new Date().getTime()-t1)+'ms','color:#4a82f0;text-decoration:underline','color:#4a82f0');
	}
}

var c_pager=PageData.pager ? PageData.pager.cur_page : 1;
if(document.getElementsByClassName('tb_preload_notification')[0]){
	var tpn=document.getElementsByClassName('tb_preload_notification')[0];
	tpn.addEventListener('DOMSubtreeModified',function(){
		if(tpn.hasAttribute('show')==false)replace_nodes();
	})
}/*
else{
	//kill_tieba_lazyload();
}*/
replace_nodes();
bind_pager();


//在网页中插入伪·控制面板.
var editor,panel,p_node;
if(document.getElementsByClassName('e_inter_wrapper')[0]){
	p_node=document.getElementsByClassName('e_inter_wrapper')[0];
	add_panel();
}
else if(document.getElementsByClassName('tb-editor-wrapper')[0]){
	p_node=document.getElementsByClassName('tb-editor-wrapper')[0];
	add_panel();
}
else if(document.getElementsByClassName('editor_content_wrapper')[0]){
	p_node=document.getElementsByClassName('editor_content_wrapper')[0];
	add_panel();
}
else {
	var editor_wait=window.setInterval(function(){
		if(document.getElementsByClassName('editor_content_wrapper')[0]){
			p_node=document.getElementsByClassName('editor_content_wrapper')[0];
			window.clearInterval(editor_wait);
			add_panel();
		}
	},100)
}

console.log('%cCC Code%c 脚本载入时间统计：'+(new Date().getTime()-t0)+'ms','color:#4a82f0;text-decoration:underline','color:#4a82f0')
}