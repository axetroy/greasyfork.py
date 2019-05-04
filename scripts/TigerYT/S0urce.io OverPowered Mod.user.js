// ==UserScript==
// @name S0urce.io OverPowered Mod
// @namespace S0urce.io OverPowered Mod
// @description Press any enter to auto complete every word
// @version 1
// @author TigerYT
// @match *://s0urce.io/*
// @require http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js
// @grant none
// ==/UserScript==

var w="";
$("#tool-type-word").keypress(function(e){
switch($(".tool-type-img").prop("src").replace("http://s0urce.io/client/img/word/","")){
case "e/0":
w="remove";
break;
case "e/1":
w="load";
break;
case "e/2":
w="signal";
break;
case "e/3":
w="right";
break;
case "e/4":
w="part";
break;
case "e/5":
w="url";
break;
case "e/6":
w="event";
break;
case "e/7":
w="stat";
break;
case "e/8":
w="call";
break;
case "e/9":
w="anon";
break;
case "e/10":
w="init";
break;
case "e/11":
w="dir";
break;
case "e/12":
w="add";
break;
case "e/13":
w="cookies";
break;
case "e/14":
w="handle";
break;
case "e/15":
w="ping";
break;
case "e/16":
w="ghost";
break;
case "e/17":
w="count";
break;
case "e/18":
w="loop";
break;
case "e/19":
w="temp";
break;
case "e/20":
w="status";
break;
case "e/21":
w="xml";
break;
case "e/22":
w="num";
break;
case "e/23":
w="bytes";
break;
case "e/24":
w="join";
break;
case "e/25":
w="intel";
break;
case "e/26":
w="reset";
break;
case "e/27":
w="info";
break;
case "e/28":
w="global";
break;
case "e/29":
w="size";
break;
case "e/30":
w="port";
break;
case "e/31":
w="get";
break;
case "e/32":
w="http";
break;
case "e/33":
w="emit";
break;
case "e/34":
w="delete";
break;
case "e/35":
w="buffer";
break;
case "e/36":
w="root";
break;
case "e/37":
w="file";
break;
case "e/38":
w="write";
break;
case "e/39":
w="socket";
break;
case "e/40":
w="bit";
break;
case "e/41":
w="key";
break;
case "e/42":
w="pass";
break;
case "e/43":
w="host";
break;
case "e/44":
w="val";
break;
case "e/45":
w="send";
break;
case "e/46":
w="list";
break;
case "e/47":
w="poly";
break;
case "e/48":
w="data";
break;
case "e/49":
w="log";
break;
case "e/50":
w="user";
break;
case "e/51":
w="upload";
break;
case "e/52":
w="set";
break;
case "e/53":
w="system";
break;
case "e/54":
w="com";
break;
case "e/55":
w="type";
break;
case "e/56":
w="add";
break;
case "e/57":
w="net";
break;
case "e/58":
w="client";
break;
case "e/59":
w="domain";
break;
case "e/60":
w="left";
break;
case "e/61":
w="point";
break;
case "m/0":
w="config";
break;
case "m/1":
w="setport";
break;
case "m/2":
w="module";
break;
case "m/3":
w="thread";
break;
case "m/4":
w="export";
break;
case "m/5":
w="encode";
break;
case "m/6":
w="datatype";
break;
case "m/7":
w="download";
break;
case "m/8":
w="decrypt";
break;
case "m/9":
w="vector";
break;
case "m/10":
w="channel";
break;
case "m/11":
w="fillgrid";
break;
case "m/12":
w="mysql";
break;
case "m/13":
w="setping";
break;
case "m/14":
w="number";
break;
case "m/15":
w="eventtype";
break;
case "m/16":
w="disconnect";
break;
case "m/17":
w="sizeof";
break;
case "m/18":
w="server";
break;
case "m/19":
w="findpackage";
break;
case "m/20":
w="hexagon";
break;
case "m/21":
w="newserver";
break;
case "m/22":
w="newline";
break;
case "m/23":
w="accountname";
break;
case "m/24":
w="response";
break;
case "m/25":
w="userport";
break;
case "m/26":
w="command";
break;
case "m/27":
w="setnewid";
break;
case "m/28":
w="gridwidth";
break;
case "m/29":
w="package";
break;
case "m/30":
w="length";
break;
case "m/31":
w="setcookie";
break;
case "m/32":
w="newhost";
break;
case "m/33":
w="filedir";
break;
case "m/34":
w="username";
break;
case "m/35":
w="filetype";
break;
case "m/36":
w="threat";
break;
case "m/37":
w="connect";
break;
case "m/38":
w="getid";
break;
case "m/39":
w="syscall";
break;
case "m/40":
w="getlog";
break;
case "m/41":
w="listconfig";
break;
case "m/42":
w="gridheight";
break;
case "m/43":
w="uesrid";
break;
case "m/44":
w="loadbytes";
break;
case "m/45":
w="getkey";
break;
case "m/46":
w="account";
break;
case "m/47":
w="process";
break;
case "m/48":
w="hostserver";
break;
case "m/49":
w="encryptfile";
break;
case "m/50":
w="urlcheck";
break;
case "m/51":
w="decryptfile";
break;
case "m/52":
w="writefile";
break;
case "m/53":
w="protocol";
break;
case "m/54":
w="serverproxy";
break;
case "m/55":
w="responder";
break;
case "m/56":
w="generate";
break;
case "m/57":
w="getping";
break;
case "m/58":
w="password";
break;
case "m/59":
w="proxy";
break;
case "m/60":
w="getfile";
break;
case "m/61":
w="setstats";
break;
case "m/62":
w="encrypt";
break;
case "m/63":
w="constructor";
break;
case "m/64":
w="getinfo";
break;
case "m/65":
w="getpass";
break;
case "h/0":
w="statusofprocess";
break;
case "h/1":
w="disconnectserver";
break;
case "h/2":
w="sendintelprice";
break;
case "h/3":
w="getfirewallchannel";
break;
case "h/4":
w="createnewsocket";
break;
case "h/5":
w="systemportkey";
break;
case "h/6":
w="batchallfiles";
break;
case "h/7":
w="loadloggedpassword";
break;
case "h/8":
w="checkhttptype";
break;
case "h/9":
w="setnewproxy";
break;
case "h/10":
w="getdatapassword";
break;
case "h/11":
w="patcheventlog";
break;
case "h/12":
w="ghostfilesystem";
break;
case "h/13":
w="callmodule";
break;
case "h/14":
w="getmysqldomain";
break;
case "h/15":
w="disconnectchannel";
break;
case "h/16":
w="changeusername";
break;
case "h/17":
w="joinnetworkclient";
break;
case "h/18":
w="mergesocket";
break;
case "h/19":
w="uploaduserstats";
break;
case "h/20":
w="blockthreat";
break;
case "h/21":
w="unpacktmpfile";
break;
case "h/22":
w="createnewsocket";
break;
case "h/23":
w="eventlistdir";
break;
case "h/24":
w="rootcookieset";
break;
case "h/25":
w="decryptdatabatch";
break;
case "h/26":
w="wordcounter";
break;
case "h/27":
w="dodecahedron";
break;
case "h/28":
w="systemgridtype";
break;
case "h/29":
w="fileexpresslog";
break;
case "h/30":
w="includedirectory";
break;
case "h/31":
w="createnewpackage";
break;
case "h/32":
w="create3axisvector";
break;
case "h/33":
w="destroybatch";
break;
case "h/34":
w="removenewcookie";
break;
case "h/35":
w="deleteallids";
break;
case "h/36":
w="respondertimeout";
break;
case "h/37":
w="encodenewfolder";
break;
case "h/38":
w="getxmlprotocol";
break;
case "h/39":
w="exportconfigpackage";
break;
case "h/40":
w="generatecodepack";
break;
case "h/41":
w="bufferpingset";
break;
case "h/42":
w="loadaltevent";
break;
case "h/43":
w="sizeofhexagon";
break;
case "h/44":
w="create2axisvector";
break;
case "h/45":
w="createfilethread";
break;
case "h/46":
w="removeoldcookie";
break;
case "h/47":
w="httpbuffersize";
break;
case "h/48":
w="changepassword";
break;
case "h/49":
w="encryptunpackedbatch";
break;
case "h/50":
w="tempdatapass";
break;
case "h/51":
w="channelsetpackage";
break;
case "h/52":
w="getpartoffile";
break;
case "h/53":
w="loadregisterlist";
break;
case "h/54":
w="emitconfiglist";
break;
default:
w="";
break;
}
$("#tool-type-word").val(w);
});