// ==UserScript==
// @name         Bot S0urce.io
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A bot to automate the hacking of enemies
// @author       Gaiben#7736
// @match        http://s0urce.io/
// @grant        none
// ==/UserScript==

(function()
 {
    "use strict";

    function handle()
    {
        var url = document.getElementById("tool-type").childNodes[0].src;
        var form = document.getElementById("tool-type-word");

        switch(url)
        {
            case "http://s0urce.io/client/img/words/template.png":
                break;

            case "http://s0urce.io/client/img/word/m/46":
                form.value = "password";
                break;

            case "http://s0urce.io/client/img/word/e/57":
                form.value = "handle";
                break;

            case "http://s0urce.io/client/img/word/e/2":
                form.value = "url";
                break;

            case "http://s0urce.io/client/img/word/e/28":
                form.value = "port";
                break;

            case "http://s0urce.io/client/img/word/e/16":
                form.value = "loop";
                break;

            case "http://s0urce.io/client/img/word/e/27":
                form.value = "size";
                break;

            case "http://s0urce.io/client/img/word/e/11":
                form.value = "info";
                break;

            case "http://s0urce.io/client/img/word/e/30":
                form.value = "domain";
                break;

            case "http://s0urce.io/client/img/word/e/35":
                form.value = "file";
                break;

            case "http://s0urce.io/client/img/word/e/37":
                form.value = "get";
                break;

            case "http://s0urce.io/client/img/word/e/56":
                form.value = "reset";
                break;

            case "http://s0urce.io/client/img/word/e/36":
                form.value = "ping";
                break;

            case "http://s0urce.io/client/img/word/e/15":
                form.value = "bytes";
                break;

            case "http://s0urce.io/client/img/word/m/26":
                form.value = "newline";
                break;

            case "http://s0urce.io/client/img/word/e/42":
                form.value = "write";
                break;

            case "http://s0urce.io/client/img/word/e/55":
                form.value = "bit";
                break;

            case "http://s0urce.io/client/img/word/m/51":
                form.value = "userport";
                break;

            case "http://s0urce.io/client/img/word/m/30":
                form.value = "number";
                break;

            case "http://s0urce.io/client/img/word/m/4":
                form.value = "eventtype";
                break;

            case "http://s0urce.io/client/img/word/e/25":
                form.value = "part";
                break;

            case "http://s0urce.io/client/img/word/e/33":
                form.value = "ghost";
                break;

            case "http://s0urce.io/client/img/word/m/25":
                form.value = "download";
                break;

            case "http://s0urce.io/client/img/word/e/59":
                form.value = "init";
                break;

            case "http://s0urce.io/client/img/word/e/6":
                form.value = "dir";
                break;

            case "http://s0urce.io/client/img/word/e/9":
                form.value = "list";
                break;

            case "http://s0urce.io/client/img/word/e/6":
                form.value = "dir";
                break;

            case "http://s0urce.io/client/img/word/m/41":
                form.value = "accountname";
                break;

            case "http://s0urce.io/client/img/word/m/1":
                form.value = "datatype";
                break;

            case "http://s0urce.io/client/img/word/e/60":
                form.value = "poly";
                break;

            case "http://s0urce.io/client/img/word/e/18":
                form.value = "num";
                break;

            case "http://s0urce.io/client/img/word/m/36":
                form.value = "newserver";
                break;

            case "http://s0urce.io/client/img/word/m/50":
                form.value = "writefile";
                break;

            case "http://s0urce.io/client/img/word/m/6":
                form.value = "sizeof";
                break;

            case "http://s0urce.io/client/img/word/e/48":
                form.value = "add";
                break;

            case "http://s0urce.io/client/img/word/e/50":
                form.value = "count";
                break;

            case "http://s0urce.io/client/img/word/e/17":
                form.value = "global";
                break;

            case "http://s0urce.io/client/img/word/e/43":
                form.value = "left";
                break;

            case "http://s0urce.io/client/img/word/e/1":
                form.value = "stat";
                break;

            case "http://s0urce.io/client/img/word/e/21":
                form.value = "status";
                break;

            case "http://s0urce.io/client/img/word/e/29":
                form.value = "remove";
                break;

            case "http://s0urce.io/client/img/word/e/34":
                form.value = "val";
                break;

            case "http://s0urce.io/client/img/word/e/20":
                form.value = "root";
                break;

            case "http://s0urce.io/client/img/word/e/23":
                form.value = "http";
                break;

            case "http://s0urce.io/client/img/word/e/58":
                form.value = "point";
                break;

            case "http://s0urce.io/client/img/word/e/49":
                form.value = "set";
                break;

            case "http://s0urce.io/client/img/word/m/2":
                form.value = "loadbytes";
                break;

            case "http://s0urce.io/client/img/word/e/39":
                form.value = "host";
                break;

            case "http://s0urce.io/client/img/word/e/47":
                form.value = "key";
                break;

            case "http://s0urce.io/client/img/word/e/7":
                form.value = "event";
                break;

            case "http://s0urce.io/client/img/word/e/7":
                form.value = "file";
                break;

            case "http://s0urce.io/client/img/word/e/40":
                form.value = "system";
                break;

            case "http://s0urce.io/client/img/word/e/26":
                form.value = "net";
                break;

            case "http://s0urce.io/client/img/word/m/45":
                form.value = "export";
                break;

            case "http://s0urce.io/client/img/word/e/22":
                form.value = "user";
                break;

            case "http://s0urce.io/client/img/word/e/19":
                form.value = "type";
                break;

            case "http://s0urce.io/client/img/word/e/10":
                form.value = "right";
                break;

            case "http://s0urce.io/client/img/word/e/24":
                form.value = "anon";
                break;

            case "http://s0urce.io/client/img/word/m/20":
                form.value = "filedir";
                break;

            case "http://s0urce.io/client/img/word/m/10":
                form.value = "threat";
                break;

            case "http://s0urce.io/client/img/word/m/13":
                form.value = "hostserver";
                break;

            case "http://s0urce.io/client/img/word/e/41":
                form.value = "xml";
                break;

            case "http://s0urce.io/client/img/word/m/55":
                form.value = "constructor";
                break;

            case "http://s0urce.io/client/img/word/e/4":
                form.value = "call";
                break;

            case "http://s0urce.io/client/img/word/m/3":
                form.value = "setstats";
                break;

            case "http://s0urce.io/client/img/word/m/40":
                form.value = "module";
                break;

            case "http://s0urce.io/client/img/word/e/46":
                form.value = "emit";
                break;

            case "http://s0urce.io/client/img/word/e/38":
                form.value = "data";
                break;

            case "http://s0urce.io/client/img/word/h/21":
                form.value = "loadloggedpassword";
                break;

            case "http://s0urce.io/client/img/word/e/0":
                form.value = "buffer";
                break;

            case "http://s0urce.io/client/img/word/m/12":
                form.value = "serverproxy";
                break;

            case "http://s0urce.io/client/img/word/m/11":
                form.value = "encryptfile";
                break;

            case "http://s0urce.io/client/img/word/m/21":
                form.value = "protocol";
                break;

            case "http://s0urce.io/client/img/word/m/28":
                form.value = "command";
                break;

            case "http://s0urce.io/client/img/word/e/44":
                form.value = "pass";
                break;

            case "http://s0urce.io/client/img/word/m/34":
                form.value = "setnewid";
                break;

            case "http://s0urce.io/client/img/word/e/45":
                form.value = "socket";
                break;

            case "http://s0urce.io/client/img/word/e/8":
                form.value = "upload";
                break;

            case "http://s0urce.io/client/img/word/e/13":
                form.value = "client";
                break;

            case "http://s0urce.io/client/img/word/e/53":
                form.value = "cookies";
                break;

            case "http://s0urce.io/client/img/word/e/12":
                form.value = "send";
                break;

            case "http://s0urce.io/client/img/word/e/51":
                form.value = "join";
                break;

            case "http://s0urce.io/client/img/word/h/12":
                form.value = "blockthreat";
                break;

            case "http://s0urce.io/client/img/word/h/30":
                form.value = "respondertimeout";
                break;

            case "http://s0urce.io/client/img/word/h/51":
                form.value = "create2axisvector";
                break;

            case "http://s0urce.io/client/img/word/m/42":
                form.value = "vector";
                break;

            case "http://s0urce.io/client/img/word/m/44":
                form.value = "getping";
                break;

            case "http://s0urce.io/client/img/word/e/14":
                form.value = "intel";
                break;

            case "http://s0urce.io/client/img/word/m/5":
                form.value = "encode";
                break;

            case "http://s0urce.io/client/img/word/m/18":
                form.value = "process";
                break;

            case "http://s0urce.io/client/img/word/m/35":
                form.value = "gridwidth";
                break;

            case "http://s0urce.io/client/img/word/m/16":
                form.value = "connect";
                break;

            case "http://s0urce.io/client/img/word/e/52":
                form.value = "delete";
                break;

            case "http://s0urce.io/client/img/word/e/52":
                form.value = "delete";
                break;

            case "http://s0urce.io/client/img/word/e/54":
                form.value = "temp";
                break;

            case "http://s0urce.io/client/img/word/e/5":
                form.value = "load";
                break;

            case "http://s0urce.io/client/img/word/e/32":
                form.value = "signal";
                break;

            case "http://s0urce.io/client/img/word/m/48":
                form.value = "config";
                break;

            case "http://s0urce.io/client/img/word/m/14":
                form.value = "decrypt";
                break;

            case "http://s0urce.io/client/img/word/m/27":
                form.value = "server";
                break;

            case "http://s0urce.io/client/img/word/m/33":
                form.value = "syscall";
                break;

            case "http://s0urce.io/client/img/word/m/29":
                form.value = "getpass";
                break;

            case "http://s0urce.io/client/img/word/m/61":
                form.value = "generate";
                break;

            case "http://s0urce.io/client/img/word/m/24":
                form.value = "getkey";
                break;

            case "http://s0urce.io/client/img/word/m/47":
                form.value = "fillgrid";
                break;

            case "http://s0urce.io/client/img/word/m/7":
                form.value = "username";
                break;

            case "http://s0urce.io/client/img/word/h/38":
                form.value = "tempdatapass";
                break;

            case "http://s0urce.io/client/img/word/h/17":
                form.value = "httpbuffersize";
                break;

            case "http://s0urce.io/client/img/word/h/34":
                form.value = "exportconfigpackage";
                break;

            case "http://s0urce.io/client/img/word/h/39":
                form.value = "callmodule";
                break;

            case "http://s0urce.io/client/img/word/h/6":
                form.value = "removeoldcookie";
                break;

            case "http://s0urce.io/client/img/word/m/22":
                form.value = "gridheight";
                break;

            case "http://s0urce.io/client/img/word/m/59":
                form.value = "package";
                break;

            case "http://s0urce.io/client/img/word/m/9":
                form.value = "mysql";
                break;

            case "http://s0urce.io/client/img/word/m/57":
                form.value = "account";
                break;

            case "http://s0urce.io/client/img/word/m/31":
                form.value = "length";
                break;

            case "http://s0urce.io/client/img/word/m/19":
                form.value = "hexagon";
                break;

            case "http://s0urce.io/client/img/word/m/39":
                form.value = "disconnect";
                break;

            case "http://s0urce.io/client/img/word/h/24":
                form.value = "removenewcookie";
                break;

            case "http://s0urce.io/client/img/word/h/48":
                form.value = "sendintelpass";
                break;

            case "http://s0urce.io/client/img/word/h/22":
                form.value = "rootcookieset";
                break;

            case "http://s0urce.io/client/img/word/h/25":
                form.value = "unpacktmpfile";
                break;

            case "http://s0urce.io/client/img/word/h/54":
                form.value = "statusofprocess";
                break;

            case "http://s0urce.io/client/img/word/h/2":
                form.value = "changeusername";
                break;

            case "http://s0urce.io/client/img/word/h/11":
                form.value = "loadaltevent";
                break;

            case "http://s0urce.io/client/img/word/h/23":
                form.value = "uploaduserstats";
                break;

            case "http://s0urce.io/client/img/word/h/33":
                form.value = "fileexpresslog";
                break;

            case "http://s0urce.io/client/img/word/h/52":
                form.value = "bufferpingset";
                break;

            case "http://s0urce.io/client/img/word/h/45":
                form.value = "decryptdatabatch";
                break;

            case "http://s0urce.io/client/img/word/h/14":
                form.value = "checkhttptype";
                break;

            case "http://s0urce.io/client/img/word/h/4":
                form.value = "wordcounter";
                break;

            case "http://s0urce.io/client/img/word/m/52":
                form.value = "getid";
                break;

            case "http://s0urce.io/client/img/word/e/61":
                form.value = "com";
                break;

            case "http://s0urce.io/client/img/word/e/3":
                form.value = "log";
                break;

            case "http://s0urce.io/client/img/word/m/0":
                form.value = "setping";
                break;

            case "http://s0urce.io/client/img/word/m/32":
                form.value = "urlcheck";
                break;

            case "http://s0urce.io/client/img/word/m/53":
                form.value = "newhost";
                break;

            case "http://s0urce.io/client/img/word/h/53":
                form.value = "ghostfilesystem";
                break;

            case "http://s0urce.io/client/img/word/h/26":
                form.value = "includedirectory";
                break;

            case "http://s0urce.io/client/img/word/h/20":
                form.value = "dodecahedron";
                break;

            case "http://s0urce.io/client/img/word/h/7":
                form.value = "encodenewfolder";
                break;

            case "http://s0urce.io/client/img/word/h/16":
                form.value = "channelsetpackage";
                break;

            case "http://s0urce.io/client/img/word/h/8":
                form.value = "patcheventlog";
                break;

            case "http://s0urce.io/client/img/word/h/27":
                form.value = "getfirewallchannel";
                break;

            case "http://s0urce.io/client/img/word/h/28":
                form.value = "batchallfiles";
                break;

            case "http://s0urce.io/client/img/word/h/43":
                form.value = "generatecodepack";
                break;

            case "http://s0urce.io/client/img/word/h/5":
                form.value = "setnewproxy";
                break;

            case "http://s0urce.io/client/img/word/h/37":
                form.value = "eventlistdir";
                break;

            case "http://s0urce.io/client/img/word/h/35":
                form.value = "systemgridtype";
                break;

            case "http://s0urce.io/client/img/word/h/31":
                form.value = "getdatapassword";
                break;

            case "http://s0urce.io/client/img/word/m/49":
                form.value = "userid";
                break;

            case "http://s0urce.io/client/img/word/m/64":
                form.value = "encrypt";
                break;

            case "http://s0urce.io/client/img/word/m/62":
                form.value = "filetype";
                break;

            case "http://s0urce.io/client/img/word/h/1":
                form.value = "disconnectserver";
                break;

            case "http://s0urce.io/client/img/word/m/17":
                form.value = "getfile";
                break;

            case "http://s0urce.io/client/img/word/h/18":
                form.value = "systemportkey";
                break;

            case "http://s0urce.io/client/img/word/h/29":
                form.value = "getmysqldomain";
                break;

            case "http://s0urce.io/client/img/word/m/43":
                form.value = "proxy";
                break;

            case "http://s0urce.io/client/img/word/m/65":
                form.value = "findpackage";
                break;

            case "http://s0urce.io/client/img/word/m/8":
                form.value = "listconfig";
                break;

            case "http://s0urce.io/client/img/word/m/58":
                form.value = "decryptfile";
                break;

            case "http://s0urce.io/client/img/word/h/36":
                form.value = "createnewsocket";
                break;

            case "http://s0urce.io/client/img/word/h/47":
                form.value = "createnewpackage";
                break;

            case "http://s0urce.io/client/img/word/h/19":
                form.value = "deleteallids";
                break;

            case "http://s0urce.io/client/img/word/m/15":
                form.value = "channel";
                break;

            case "http://s0urce.io/client/img/word/m/60":
                form.value = "responder";
                break;

            case "http://s0urce.io/client/img/word/m/54":
                form.value = "getlog";
                break;

            case "http://s0urce.io/client/img/word/h/32":
                form.value = "hostnewserver";
                break;

            case "http://s0urce.io/client/img/word/h/49":
                form.value = "create3axisvector";
                break;

            case "http://s0urce.io/client/img/word/e/31":
                form.value = "add";
                break;

            case "http://s0urce.io/client/img/word/m/56":
                form.value = "setport";
                break;

            case "http://s0urce.io/client/img/word/h/42":
                form.value = "emitconfiglist";
                break;

            case "http://s0urce.io/client/img/word/h/46":
                form.value = "createfilethread";
                break;

            case "http://s0urce.io/client/img/word/h/10":
                form.value = "getxmlprotocol";
                break;

            case "http://s0urce.io/client/img/word/h/0":
                form.value = "joinnetworkclient";
                break;

            case "http://s0urce.io/client/img/word/h/50":
                form.value = "loadregisterlist";
                break;

            case "http://s0urce.io/client/img/word/h/15":
                form.value = "disconnectchannel";
                break;

            case "http://s0urce.io/client/img/word/h/3":
                form.value = "getpartoffile";
                break;

            case "http://s0urce.io/client/img/word/m/23":
                form.value = "thread";
                break;

            case "http://s0urce.io/client/img/word/m/37":
                form.value = "getinfo";
                break;

            case "http://s0urce.io/client/img/word/h/40":
                form.value = "encryptunpackedbatch";
                break;

            case "http://s0urce.io/client/img/word/h/41":
                form.value = "destroybatch";
                break;

            case "http://s0urce.io/client/img/word/m/63":
                form.value = "response";
                break;

            case "http://s0urce.io/client/img/word/h/9":
                form.value = "sizeofhexagon";
                break;

            case "http://s0urce.io/client/img/word/h/13":
                form.value = "changepassword";
                break;

            case "http://s0urce.io/client/img/word/h/44":
                form.value = "mergesocket";
                break;


            default:
                console.log(url);
                break;
        }
        setTimeout(handle,100);
    }

    handle();
})();
