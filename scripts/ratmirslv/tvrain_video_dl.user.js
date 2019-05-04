// ==UserScript==
// @name tvrain_video_dl
// @description tvrain.ru video downloader
// @author ANT
// @include https://tvrain.ru/*
// @include https://tvrainru.media.eagleplatform.com/index/player*
// @version 0.8
// @created 14.12.2017
// @run-at document-ready
// @namespace https://greasyfork.org/users/13151
// ==/UserScript==

if(document.location.href.indexOf("tvrainru.media.eagleplatform.com/index/player") != -1)
{
    window.document.__defineGetter__("referrer", function () { return "https://tvrain.ru/";});
}

document.onreadystatechange = function ()
{
    if(document.readyState === "complete")
    {
        if(document.location.href.indexOf("tvrain.ru/") != -1)
        {
            if((vod = document.getElementsByClassName('eagleplayer-instance')[0]))
            {
                var img_link = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAHlBMVEVMaXHPNHbPNHbPNHbPNHbPNHbPNHbPNHbPNHb///+WJ8/MAAAACXRSTlMAEInc/rdPM2jMyAdHAAAAeElEQVR4AWXOQRJCMQgDUAiB9v4nVsnUXzTLN2mD3XEEs2xkBT/BMJKRJGsaup6/ZgbyWll6loxDG5BtEmO32ujPbpDRtr6236X0muZZ9tdLfUCZ677qpZAZzgkFbDclGLIl6ah4Np7mktUhLWSOnpY4TN1kwG95AatyA0Ta+0ahAAAAAElFTkSuQmCC' style='position:absolute'/>";
                var js = document.createElement('script');
                js.text = "var img_link=\"" + img_link + "\";";
                document.getElementsByTagName('body')[0].appendChild(js);

                var child = document.createElement('div');
                child.setAttribute("style", "background-color:#e7e7e7;float:right;width:" + vod.parentNode.clientWidth + "px");
                child.innerHTML = '<div id="lnk" style="float:left;padding-left:5px;cursor:pointer;" title="Получить прямые ссылки" onmousedown="this.innerHTML=\'&#x2022; &#x2022; &#x2022;\';" onmouseup="window.postMessage(\'getlinks#\'+GetRecordId(), \'https://tvrain.ru/\');">'+img_link+'</div><div style="float:right;padding-right:5px"><a href="javascript:void(0);" onclick="FindVideos(vid_range);" title="Искать видеоролики"><b>Найти</b></a> | <a id="cururl" href="https://tvrainru.media.eagleplatform.com/index/player?player=new&record_id=" title="Текущий URL">URL</a> | <a href="javascript:void(0);" onclick=\'var answ=prompt("Диапазон для поиска:", vid_range); (answ ? vid_range=answ : null);\' title="Настройки">[*]</a></div><br>';
                if(document.getElementsByClassName('player_subscribe')[0]) document.getElementsByClassName('player_subscribe')[0].style.position = "static";

                vod.parentNode.insertBefore(child, vod.nextElementSibling);

                js = document.createElement('script');
                js.text = "var vid_range = '-250;20';";
                document.getElementsByTagName('body')[0].appendChild(js);

                js = document.createElement('script');
                js.text = FindVideos.toString() + PutInfo.toString() + GetRecordId.toString() + PlayVid.toString() + GetInfo.toString() + GetLinks.toString() + LinkOpener.toString();
                document.getElementsByTagName('body')[0].appendChild(js);

                js = document.createElement('script');
                js.text = 'window.addEventListener("message", function(event) { if(event.data.indexOf("putinfo") != -1) PutInfo(event.data); if(event.data.indexOf("getlinks") != -1) GetLinks(event.data.split("#")[1]); if(event.data.indexOf("getinfo") != -1) GetInfo(event.data.split("#")[1]); }, false); document.getElementById("cururl").href += GetRecordId();';
                document.getElementsByTagName('body')[0].appendChild(js);
            }
        }
    }
};

    function GetRecordId()
    {
        var record_id = TVRAIN.VodPlayer.getCurrent().elData.id;
        if (!record_id) record_id = document.getElementsByClassName('eagleplayer-instance')[0].getAttribute("id").match(/\d+/)[0];
        return record_id;
    }

    function GetInfo(id)
    {
        var url = "https://tvrainru.media.eagleplatform.com/api/player_data?id=" + id + "&referrer=https://tvrain.ru/";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function ()
        {
            if((this.readyState===4) && ((this.status===206) || (this.status===200)))
            {
                var item = JSON.parse(this.responseText).data.playlist.viewports[0].medialist[0];
                var vid_id = item.id;
                var vid_lnk = "";
                var vid_date = "";
                var vid_length = item.duration;
                var vid_title = '<a href="https://tvrainru.media.eagleplatform.com/index/player?player=new&record_id=' + item.id + '/" onclick="return window.opener.LinkOpener(' + item.id + ');" target="_blank">' + item.title + '</a>';
                var vid_snapshot = '<img style="height:178px" src="' + item.snapshot + '" />';
                var msg = JSON.stringify({ vid_id: vid_id, vid_lnk: vid_lnk, vid_date: vid_date, vid_length: vid_length, vid_title: vid_title, vid_snapshot: vid_snapshot });
            } else var msg = JSON.stringify({ vid_id: -1 });
            window.postMessage("putinfo#" + msg, "https://tvrain.ru/");
        };
        xhr.send(null);
    }

    function GetLinks(id)
    {
        var url = "https://tvrainru.media.eagleplatform.com/api/player_data?id=" + id + "&referrer=https://tvrain.ru/";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function ()
        {
            if((this.readyState===4) && (this.status===200))
            {
                var item = JSON.parse(this.responseText).data.playlist.viewports[0].medialist[0];
                url = (item.hasOwnProperty('sources.secure_http.auto') ? item.sources.secure_http.auto : item.sources.secure_m3u8.auto);

                xhr.open('GET', url);
                xhr.onload = function ()
                {
                    if((this.readyState===4) && (this.status===200))
                    {
                        xhr.open('GET', JSON.parse(this.responseText).data[0], true);
                        xhr.onload = function ()
                        {
                            var data = this.responseText.split("\n");

                            xhr.open('GET', url.replace("hlsvod","mp4s"));
                            xhr.onload = function ()
                            {
                                if((this.readyState===4) && (this.status===200))
                                {
                                    Object.assign(data, JSON.parse(this.responseText).data);

                                    var links = {};
                                    for(var key in data)
                                        if((match = data[key].match(/((http[s]?:\/\/.+?\/.+?_(\d+)p\.mp4).*?)\?/))) links[match[3]] = (match[0].indexOf(".stream.") != -1 ? match[2].replace(".stream.", ".servers.") : match[1]);

                                    var sorted = {};
                                    Object.keys(links).sort(function(a,b) { return a - b; }).forEach(function(key) {
                                        sorted[key] = links[key];
                                    });

                                    var msg = JSON.stringify({ vid_id: id, vid_lnk: sorted });
                                    window.postMessage("putinfo#" + msg, "https://tvrain.ru/");
                                }
                            };
                            xhr.send(null);
                        };
                        xhr.send(null);
                    }
                };
                xhr.send(null);
            }
        };
        xhr.send(null);
    }

    function PlayVid(id)
    {
        if(window.myPopup.db[id].length > 0)
        {
            window.myPopup.document.getElementById("player_" + id).removeAttribute("onclick");
            window.myPopup.document.getElementById("player_" + id).style.width = "500px";
            window.myPopup.document.getElementById("player_" + id).style.height = "281px";
            var playlist = JSON.stringify(window.myPopup.db[id].reverse());
            if(typeof(navigator.plugins) != "undefined" && typeof(navigator.plugins["Shockwave Flash"]) == "object")
            {
                var uppod = '<object id="videoplayer158" type="application/x-shockwave-flash" data="https://dl.dropboxusercontent.com/s/9lzw6p1ajo8wiql/uppod.swf" width="100%" height="100%"><param name="bgcolor" value="#ffffff" /><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="movie" value="https://dl.dropboxusercontent.com/s/tsclcznwcmqudet/uppod.swf" /><param name="flashvars" value=\'st=02AEEZybAxYNl1fGkbk1b1BkOk1mwXRWNsvzW069mwDzHC5k=uOTcCaKJ1j1l1CQVY3v1Xcv13Q3Q23Q3Qktj1fRidwnY31gVj1eDpv0yT30cLNWNkbk13Q3Qn3Q3Qktj1fREdwnYWQkzC5bRFj5btj1hRzIQkzC5k=j1tl1fQkzfUl1SkGyp3wVT30dhzdwnQmsXzQBGDY31XajO2k82MvzsNoTZd0kbSal1SQSi6dMXzBGDY531X1Ca4Hj1Fl1k0nTWwjG73NXzBGDY31YXej5btj1iTsWwyFdMbT2NAbavNopBGXHHv1X1SQD6dwFyL2GfTk06Qt3QIzd5cL2Q6jR30bTCwXpbvQXZm0VT2U3hTd0XbdwhREpQo6dGXe3wZVTd5WRpQD6BdwfF3NXR3GTXisNXHms6Ii2McTC0n9m08XisNXHv1l1Qf0XR30cLWwKjzC5kedOIN4xN3zkOk1mwhXRWNvzdaJzy2wI9BwbzC5tT7jal1CMkbSkYWtj1m9Bw5bzC5Ttj16Is2GXR3GyYmG7nzv0hRpU6o7dGnh31X=jOrk1sQWR2Qi6ZdMXzBGDY31hX0xaTtj1cQk2QXRIQD6dQHiFd0XHv1XZkjOkZsMo6dw2XHv1X=jOked2whLWGnhW0QkbSal1C0V9Dv1X=jOkbdwFIQWQkT30cLDWNkbk1Izv1sl1fQDFdwkbACaftj1t9BwZbzC5k42Qi6K3Gktj1ozfUrk&pl={"playlist":' + playlist + '}\' /></object>';
                window.myPopup.document.getElementById("player_" + id).innerHTML = uppod;
            }
            else
            {
                var snapshot = window.myPopup.document.getElementById("player_" + id).getElementsByTagName("img")[0].getAttribute("src");
                var uppod = 'this.player = new Uppod({m:"video",uid:"player_' + id + '",poster:"' + snapshot + '","pl":{"playlist":' + playlist + '}});';
                var js = document.createElement('script');
                js.text = uppod;
                window.myPopup.document.getElementsByTagName('body')[0].appendChild(js);
            }
        }
        else
        {
            window.myPopup.document.getElementById("player_" + id).setAttribute("play", "");
            window.postMessage("getlinks#"+id, "https://tvrain.ru/");
        }
    }

    function PutInfo(data)
    {
        data = JSON.parse(data.split('putinfo#')[1]);
        if(window.myPopup)
        {
            if(data['vid_id'] != "-1")
            {
                if(window.myPopup.db === undefined) window.myPopup.db = [];

                if(window.myPopup.document.getElementById("lnk_" + data['vid_id']) === null)
                {
                    window.myPopup.document.getElementsByTagName('body')[0].innerHTML += '<div id="title_' + data['vid_id'] + '" style="float:left"></div><div id="length_' + data['vid_id'] + '" style="float:right"></div><br><div class="player" id="player_' + data['vid_id'] + '" onclick="window.opener.PlayVid(' + data['vid_id'] + ');" style="display:table;cursor:pointer;width:316px;height:178px;background-color:black"></div><div id="lnk_' + data['vid_id'] + '" style="float:left;padding-left:5px;cursor:pointer;" title="Получить прямые ссылки" onmousedown="this.innerHTML=\'&#x2022; &#x2022; &#x2022;\';" onmouseup="window.opener.postMessage(\'getlinks#'+data['vid_id']+'\', \'https://tvrain.ru/\');">'+img_link+'</div><div id="date_' + data['vid_id'] + '" style="float:right"></div><br><hr>';

                    var duration = ('0'+Math.floor(data['vid_length']/3600) % 24).slice(-2)+':'+('0'+Math.floor(data['vid_length']/60)%60).slice(-2)+':'+('0' + data['vid_length'] % 60).slice(-2);

                    window.myPopup.document.getElementById("title_" + data['vid_id']).innerHTML = data['vid_title'];
                    window.myPopup.document.getElementById("date_" + data['vid_id']).innerHTML = data['vid_date'];
                    window.myPopup.document.getElementById("length_" + data['vid_id']).innerHTML = '(' + duration + ')';
                    window.myPopup.document.getElementById("player_" + data['vid_id']).innerHTML = data['vid_snapshot'];

                    window.myPopup.db[data['vid_id']] = [];
                }
                if(data['vid_lnk'] !== "")
                {
                    window.myPopup.document.getElementById("lnk_" + data['vid_id']).innerHTML = "";
                    window.myPopup.document.getElementById("lnk_" + data['vid_id']).removeAttribute("onmousedown");
                    window.myPopup.document.getElementById("lnk_" + data['vid_id']).removeAttribute("onmouseup");
                    window.myPopup.document.getElementById("lnk_" + data['vid_id']).removeAttribute("title");
                    for(var key in data['vid_lnk'])
                    {
                        window.myPopup.document.getElementById("lnk_" + data['vid_id']).innerHTML += '<a href=' + data['vid_lnk'][key] + ' target="_blank">' + key + 'p' + (data['vid_lnk'][key].indexOf(".m3u8") != -1 ? "*" : "") +'</a> ';
                        if (data['vid_lnk'][key].indexOf(".m3u8") == -1) window.myPopup.db[data['vid_id']].push({ file: data['vid_lnk'][key], comment:key + 'p'});
                    }
                    if(window.myPopup.document.getElementById("player_" + data['vid_id']).getAttribute("play", "") !== null)
                    {
                        window.myPopup.document.getElementById("player_" + data['vid_id']).removeAttribute("play");
                        PlayVid(data['vid_id']);
                    }
                }
            }
            if(window.count <= window.vid_from - window.vid_to)
            {
              window.count = window.count + 1;
              window.myPopup.document.getElementById('my_progress').innerHTML = 'Выполнено: ' + Math.round(100/(window.vid_from-window.vid_to+1)*window.count) + '%';
            }
        }
        else
        {
            document.getElementById("lnk").innerHTML = "";
            document.getElementById("lnk").removeAttribute("onmousedown");
            document.getElementById("lnk").removeAttribute("onmouseup");
            document.getElementById("lnk").removeAttribute("title");
            for(var key in data['vid_lnk'])
                document.getElementById("lnk").innerHTML += '<a href=' + data['vid_lnk'][key] + ' target="_blank">' + key + 'p' + (data['vid_lnk'][key].indexOf(".m3u8") != -1 ? "*" : "") + '</a> ';
        }
    }

    function FindVideos(range)
    {
        var record_id = GetRecordId();
        if(record_id !== 0)
        {
            window.vid_from = parseInt(record_id) + parseInt(range.split(';')[1]);
            window.vid_to = parseInt(record_id) + parseInt(range.split(';')[0]);

            window.count = 0;

            window.myPopup = window.open('','','width=600,height=600,left=100,top=100,scrollbars=1');
            window.myPopup.document.write('<html><head><title>Поиск видеороликов</title><link rel="stylesheet" type="text/css" href="https://s79369.cdn.ngenix.net/static/app/build/app.css" /></head><body><center><b><div id="my_progress">Поиск...</div></b></center><hr><br></body></html>');

            for(var vid = window.vid_from; vid >= window.vid_to; vid--)
            {
                window.postMessage("getinfo#"+vid, "https://tvrain.ru/");
            }

            var js = document.createElement('script');
            js.setAttribute("src", "https://dl.dropboxusercontent.com/s/6zz1nviheixyr3c/uppod-0.12.20.js");
            window.myPopup.document.getElementsByTagName('head')[0].appendChild(js);
        }
    }

    function LinkOpener(id)
    {
        if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ) return true;
        else
        {
            var a = document.createElement('a');
            a.href = 'https://tvrainru.media.eagleplatform.com/index/player?player=new&record_id=' + id;
            a.setAttribute("target", "_blank");
            a.setAttribute("style", "display:none;");
            document.getElementsByTagName('body')[0].appendChild(a);
            a.click();
            a.remove();
            return false;
        }
    }