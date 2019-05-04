// ==UserScript==
// @name        letour
// @namespace   http://userscripts.org/users/wpn
// @include     http://www.dw.de/tour-de-france-2014/*
// @version     1.3
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_xmlhttpRequest
// @grant    GM_openInTab
// @description For Tour de France 2014
// ==/UserScript==

var script_link = 'https://greasyfork.org/scripts/5300-letour/code/letour.user.js';
updateCheck();

var d = new Date();
var n = d.getDate(); 
var dict = {5: "1. Etappe",
            6: "2. Etappe",
            7: "3. Etappe",
            8: "4. Etappe",
            9: "5. Etappe",
            10: "6. Etappe",
            11: "7. Etappe",
            12: "8. Etappe",
            13: "9. Etappe",
            14: "10. Etappe",
            15: "Rasttag",
            16: "11. Etappe",
            17: "12. Etappe",
            18: "13. Etappe",
            19: "14. Etappe",
            20: "15. Etappe",
            21: "Rasttag",
            22: "16. Etappe",
            23: "17. Etappe",
            24: "18. Etappe",
            25: "19. Etappe",
            26: "20. Etappe",
            27: "21. Etappe"};

document.title = dict[n];

function updateCheck(forced)
{
    if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
    {
        try
        {
            GM_xmlhttpRequest(
                {
                    method: 'GET',
                    url: script_link,
                    headers: {'Cache-Control': 'no-cache'},
                    onload: function(resp)
                    {
                        var local_version, remote_version, rt, script_name;
                        
                        rt=resp.responseText;
                        GM_setValue('SUC_last_update', new Date().getTime()+'');
                        var re = /@version\s*(.*?)\s/m; 
                        remote_version=parseFloat(re.exec(rt)[1]);
                        local_version=parseFloat(GM_getValue('SUC_current_version', '-1'));
                        if(local_version!=-1)
                        {
                            script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                            GM_setValue('SUC_target_script_name', script_name);
                            if (remote_version > local_version)
                            {
                                if(confirm('There is an update available for the Greasemonkey script "'+script_name+'".\nWould you like to go to the install page now?'))
                                {
                                    GM_openInTab(script_link);
                                    GM_setValue('SUC_current_version', remote_version);
                                }
                            }
                        }
                        else
                            GM_setValue('SUC_current_version', remote_version+'');
                    }
                });
        }
        catch (err)
        {
            if (true)
                alert('An error occurred while checking for updates:\n'+err);
        }
    }
}