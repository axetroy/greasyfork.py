// ==UserScript==
// @name         WAZEPT Landmark
// @version      2.0.3
// @description  Facilitates the standardization of landmarks
// @author       J0N4S13 (jonathanserrario@gmail.com)
// @include 	   /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @exclude        https://www.waze.com/user/*editor/*
// @exclude        https://www.waze.com/*/user/*editor/*
// @grant        none
// @namespace https://greasyfork.org/users/218406
// ==/UserScript==

(function() {
    var version = "2.0.3";
    setTimeout(function() {var myVar = setInterval(myTimer ,500);}, 2000);
    var indexselected = "";
    var valueselected = "";

    var array_landmarks = { '⛽': "⛽", '🅿️': "[P]", '🔌': "🅿️ 🔌", '♿️': "🅿️ ♿️", '🚚' : "🚚", '🚘': "🅿️", '<img src="https://dl.dropboxusercontent.com/s/ztt36b6ejebmxrg/roundabout-traffic-sign.png" height="18" width="18">' : '<img src="https://dl.dropboxusercontent.com/s/ztt36b6ejebmxrg/roundabout-traffic-sign.png" height="18" width="18">' };

    var array_url_postos = {};

    var array_brand_postos = ['Alves Bandeira','Avia','Azória','BP','Cepsa','Cipol','Creixoauto','E.Leclerc','Ecobrent','Freitas','Fueltejo','Galp','Gaspe','Gasprocar','Ilidio Mota','Intermarché','Jumbo','Other','Petroibérica','Pingo Doce','Prio','Rede Energia','Redil','Repsol','Sopor']

    var array_roads = [];

    var array_data = {};

    var array_excel_pce = {};

    var array_excel_postos = {};

    var array_excel_cd = {};

    var array_excel_gas = {};

    var array_excel_csh = {};

    function receivedata() {
        return new Promise(resolve => {
            var url_data = "https://spreadsheets.google.com/feeds/list/16F6tdn5lQRemFAFP9iFvJL8rU6GzT_XmCLA41JwOGBA/1/public/values?alt=json";

            $.getJSON(url_data, function(data) {

                var entry = data.feed.entry;

                $(entry).each(function(){
                    var elem = [this.gsx$excel.$t, this.gsx$bloqueio.$t]
                    array_data[ this.gsx$funcionalidade.$t ] = elem;
                });
            });
            var timer = setInterval(check_data, 100);

            function check_data() {
                if(eval("array_data['LINKS_MARCAS_COMB'] !== undefined"))
                {
                    clearInterval(timer);
                    resolve('true');
                }
            }

        });
    }
    function receiveLinksGas() {
        return new Promise(resolve => {
            $.getJSON(array_data['LINKS_MARCAS_COMB'][0], function(data) {

                var entry = data.feed.entry;

                $(entry).each(function(){
                    array_url_postos[ this.gsx$posto.$t ] = this.gsx$sitelink.$t;
                });
            });
            resolve('true');
        });
    }
    function receivePCE() {
        return new Promise(resolve => {
            $.getJSON(array_data['LD_PCE'][0], function(data) {

                var entry = data.feed.entry;

                $(entry).each(function(){
                    if(eval("this['gsx$_cn6ca'] === undefined") || eval("this['gsx$_d2mkx'] === undefined") || eval("this['gsx$_d6ua4'] === undefined") || eval("this['gsx$_d88ul'] === undefined"))
                        return true;
                    else
                    {
                        var elem = [this.gsx$_cn6ca.$t, this.gsx$_d2mkx.$t,this.gsx$_d6ua4.$t,this.gsx$_d88ul.$t]
                        array_excel_pce[ this.gsx$_cn6ca.$t ] = elem;
                    }
                });
            });
            resolve('true');
        });
    }
    function receiveCD() {
        return new Promise(resolve => {
            $.getJSON(array_data['LD_CD'][0], function(data) {

                var entry = data.feed.entry;

                $(entry).each(function(){
                    if(eval("this['gsx$_cn6ca'] === undefined") || eval("this['gsx$_cokwr'] === undefined") || eval("this['gsx$_cre1l'] === undefined")|| eval("this['gsx$_chk2m'] === undefined")|| eval("this['gsx$_ciyn3'] === undefined"))
                        return true;
                    else
                    {
                        var codigo = this.gsx$_cn6ca.$t.split(" ")
                        var horarios = [eval("this['gsx$_ckd7g'] === undefined")?"":this.gsx$_ckd7g.$t,eval("this['gsx$_clrrx'] === undefined")?"":this.gsx$_clrrx.$t,eval("this['gsx$_cyevm'] === undefined")?"":this.gsx$_cyevm.$t,eval("this['gsx$_cztg3'] === undefined")?"":this.gsx$_cztg3.$t,eval("this['gsx$_d180g'] === undefined")?"":this.gsx$_d180g.$t,eval("this['gsx$_d2mkx'] === undefined")?"":this.gsx$_d2mkx.$t,eval("this['gsx$_cssly'] === undefined")?"":this.gsx$_cssly.$t];
                        var elem = [codigo[1], this.gsx$_cokwr.$t,this.gsx$_cpzh4.$t,this.gsx$_cre1l.$t,this.gsx$_chk2m.$t,this.gsx$_ciyn3.$t,horarios]
                        array_excel_cd[ this.gsx$_cn6ca.$t ] = elem;
                    }
                });
            });
            resolve('true');
        });
    }
    function receiveGas() {
        return new Promise(resolve => {
            $.getJSON(array_data['LD_COMBUSTIVEIS'][0], function(data) {

                var entry = data.feed.entry;

                $(entry).each(function(){
                    if(eval("this['gsx$marca'] === undefined") || eval("this['gsx$nome'] === undefined") || eval("this['gsx$gpl'] === undefined") || eval("this['gsx$id'] === undefined"))
                        return true;
                    else
                    {
                        var elem = [this.gsx$marca.$t, this.gsx$nome.$t,this.gsx$gpl.$t]
                        array_excel_gas[ this.gsx$id.$t ] = elem;
                    }
                });
            });
            resolve('true');
        });
    }

    function receiveCSH() {
        return new Promise(resolve => {
            $.getJSON(array_data['LD_CSH'][0], function(data) {

                var entry = data.feed.entry;

                $(entry).each(function(){
                    if(eval("this['gsx$_cn6ca'] === undefined") || eval("this['gsx$_cokwr'] === undefined") || eval("this['gsx$_cre1l'] === undefined")|| eval("this['gsx$_chk2m'] === undefined")|| eval("this['gsx$_ciyn3'] === undefined"))
                        return true;
                    else
                    {
                        var codigo = this.gsx$_cn6ca.$t
                        var horarios = [eval("this['gsx$_ckd7g'] === undefined")?"":this.gsx$_ckd7g.$t,eval("this['gsx$_clrrx'] === undefined")?"":this.gsx$_clrrx.$t,eval("this['gsx$_cyevm'] === undefined")?"":this.gsx$_cyevm.$t,eval("this['gsx$_cztg3'] === undefined")?"":this.gsx$_cztg3.$t,eval("this['gsx$_d180g'] === undefined")?"":this.gsx$_d180g.$t,eval("this['gsx$_d2mkx'] === undefined")?"":this.gsx$_d2mkx.$t,eval("this['gsx$_cssly'] === undefined")?"":this.gsx$_cssly.$t];
                        var elem = [codigo, this.gsx$_cokwr.$t,this.gsx$_cpzh4.$t,this.gsx$_cre1l.$t,this.gsx$_chk2m.$t,this.gsx$_ciyn3.$t,horarios];
                        array_excel_csh[ this.gsx$_cn6ca.$t ] = elem;
                    }
                });
            });
            resolve('true');
        });
    }

    function optionsUser() {

        var $auto_link;
        var $settings = $('<li><a href="#sidepanel-LAND" data-toggle="tab" aria-expanded="true">LAND</a></li>');
        $("#user-tabs ul").append($settings);

        if(localStorage.getItem("auto_link") === null)
            localStorage.setItem("auto_link", "true");

        var $home = $('<div id="sidepanel-LAND" class="tab-pane"><b>WME Landmark</b><br><br><b><i>Definições</i></b><br><br>');
        var div_sidepnale = document.createElement("div");
        div_sidepnale.id = "sidepanel-LAND";
        div_sidepnale.className = "tab-pane";

        var label_home = document.createElement("label");
        label_home.innerHTML = 'WAZEPT Landmark (Version: ' + version + ")";
        label_home.style.cssText = 'font-size: 15px;color:blue;';
        div_sidepnale.appendChild(label_home);

        /*var saveButton = document.createElement("button");
        saveButton.innerHTML = 'Guardar';
        saveButton.id = 'btnsave';
        saveButton.onclick = function() {
            if($('input[name=auto_link]:checked').length > 0)
                localStorage.setItem("auto_link", "true");
            else
                localStorage.setItem("auto_link", "false");
        }
        div_sidepnale.appendChild(saveButton);*/

        $("div.tab-content")[0].prepend(div_sidepnale);
    }

    async function dataCall() {
        var result = await receivedata();
        optionsUser();
        result = await receiveLinksGas();
        result = await receivePCE();
        result = await receiveCD();
        result = await receiveGas();
        result = await receiveCSH();
    }

    dataCall();

    var unifor_gas = {'corrigir' : 0, 'url' : 0, 'checks' : 0, 'block' : 0, 'emoji' : 0, 'name' : 0, 'brand' : 0, 'secundary_name' : 0, 'gpl' : 0, 'dados' : []};
    var unifor_parking = {'corrigir' : 0,'emoji' : 0};
    var unifor_pce = {'corrigir' : 0,'url' : 0, 'phone' : 0, 'checks' : 0, 'block' : 0, 'main_name' : 0, 'secundary_name' : 0, 'description' : 0, 'dados' : []};
    var unifor_pmr = {'corrigir' : 0,'checks' : 0, 'block' : 0, 'secundary_name' : 0, 'description' : 0};
    var unifor_cd = {'corrigir' : 0,'description' : 0, 'checks' : 0, 'block' : 0, 'main_name' : 0, 'secundary_name' : 0};

    function myTimer() {
        unifor_gas = {'corrigir' : 0, 'url' : 0, 'checks' : 0, 'block' : 0, 'emoji' : 0, 'name' : 0, 'brand' : 0, 'secundary_name' : 0, 'gpl' : 0, 'dados' : []};
        unifor_parking = {'corrigir' : 0,'emoji' : 0};
        unifor_pce = {'corrigir' : 0,'url' : 0, 'phone' : 0, 'checks' : 0, 'block' : 0, 'main_name' : 0, 'secundary_name' : 0, 'description' : 0, 'dados' : []};
        unifor_pmr = {'corrigir' : 0,'checks' : 0, 'block' : 0, 'secundary_name' : 0, 'description' : 0};
        unifor_cd = {'corrigir' : 0,'description' : 0, 'checks' : 0, 'block' : 0, 'main_name' : 0, 'secundary_name' : 0, 'horarios' : 0, 'dados' : []};
        var n_bloqueio;
        var nivel;
        var lvl_atual;
        var lvl_max;

        if($("input[name=categories]").val() !== undefined && $("input[name=categories]").val().indexOf("GAS_STATION") != -1)
        {

            var aux_id = "";
            var id_gas = "";
            var aux_gas = [];

            $.each($( ".additional-attributes.list-unstyled.side-panel-section li" ), function(index , li) {
                li = li.innerText + "";
                if(li.indexOf("ID:") != -1)
                {
                    var aux = li.split("ID: ");
                    aux_id = aux[1];
                }
            });

            $.each(array_excel_gas, function(posto , dados) {

                if(posto == aux_id)
                {
                    id_gas = aux_id
                    aux_gas = dados;
                    unifor_gas['dados'] = aux_gas;
                    return true;
                }
            });

            if(id_gas != "")
            {
                if($("input[name=name]").val().indexOf(aux_gas[1]) != -1)
                    unifor_gas['name'] = 0;
                else
                    unifor_gas['name'] = 1;

                if($("select[name=brand]").val() == "")
                    unifor_gas['brand'] = 1;
                else
                {
                    unifor_gas['brand'] = 0;
                    var encontrar = 0;
                    $.each(array_brand_postos, function(index, brand) {
                        if(aux_gas[0].indexOf(brand) != -1)
                        {
                            encontrar = 1;
                            if($("select[name=brand]").val() == brand)
                                unifor_gas['brand'] = 0;
                            else
                                unifor_gas['brand'] = 1;
                        }
                        else
                            if(encontrar == 0)
                                if($("select[name=brand]").val() != "Other")
                                    unifor_gas['brand'] = 1;
                    });
                }
                if(aux_gas[2] == "Sim")
                {
                    if($("textarea[name=description]").val().indexOf("GPL Auto") != -1)
                        unifor_gas['gpl'] = 0;
                    else
                        unifor_gas['gpl'] = 1;

                    if($( ".alias-name.form-control" ).length < 1)
                        unifor_gas['secundary_name'] = 1;
                    else
                    {
                        let existegpl = 0;
                        $.each($(".alias-name.form-control"), function(index_secundary , name_secundary) {
                            let nome = name_secundary.value + "";
                            if($.trim(nome) == "GPL Auto")
                                existegpl = 1;
                        });
                        if(existegpl == 0)
                            unifor_gas['secundary_name'] = 1;
                    }
                }
                if(aux_gas[2] == "Não")
                    if($("textarea[name=description]").val().indexOf("GPL Auto") == -1)
                        unifor_gas['gpl'] = 0;
                    else
                        unifor_gas['gpl'] = 1;

            }
            else
            {

                if($("input[name=name]").val().indexOf(" - ") != -1)
                    unifor_gas['name'] = 0;
                else
                    unifor_gas['name'] = 1;
                if($("select[name=brand]").val() == "")
                    unifor_gas['brand'] = 1;
                else
                {
                    unifor_gas['brand'] = 0;
                    encontrar = 0;
                    $.each(array_brand_postos, function(index, brand) {
                        if($("input[name=name]").val().indexOf(brand) != -1)
                        {
                            encontrar = 1;
                            if($("select[name=brand]").val() == brand)
                                unifor_gas['brand'] = 0;
                            else
                                unifor_gas['brand'] = 1;
                        }
                        else
                            if(encontrar == 0)
                                if($("select[name=brand]").val() != "Other")
                                    unifor_gas['brand'] = 1;
                    });
                }
            }

            if($("input[name=name]").val().indexOf(array_landmarks['⛽']) != -1)
                unifor_gas['emoji'] = 0;
            else
                unifor_gas['emoji'] = 1;
            var aux_name;
            var name;
            if($("input[name=name]").val().indexOf("-") != -1)
            {
                aux_name = $("input[name=name]").val().split("-");
                name = aux_name[0];
            }
            else
                name = $("input[name=name]").val();

            if($("input[name=name]").val().indexOf("A. S.") != -1)
            {

                let aeraservico = 0;
                $.each($(".alias-name.form-control"), function(index_secundary , name_secundary) {
                    let nome = name_secundary.value + "";
                    var res = $("input[name=name]").val().replace("A. S.", "Área de Serviço");
                    if($.trim(nome) == res)
                        aeraservico = 1;
                });
                if(aeraservico == 0)
                    unifor_gas['secundary_name'] = 1;
            }

            $.each(array_url_postos, function(posto , url) {
                if(name.toUpperCase().indexOf(posto.trim().toUpperCase()) != -1 && $("input[name=url]").val().trim() != url.trim())
                {
                    unifor_gas['url'] = 1;
                    return true;
                }
                if(name.toUpperCase().indexOf(posto.trim().toUpperCase()) == -1 && $("input[name=url]").val().trim() == url.trim())
                {
                    unifor_gas['url'] = 1;
                    return true;
                }
            });
            if($('#service-checkbox-WHEELCHAIR_ACCESSIBLE:checked').length + $('#service-checkbox-PARKING_FOR_CUSTOMERS:checked').length + $('#service-checkbox-CREDIT_CARDS:checked').length < 3)
                unifor_gas['checks'] = 1;
            else
                unifor_gas['checks'] = 0;

            n_bloqueio = array_data['LD_COMBUSTIVEIS'][1] - 1;
            nivel = 6;
            for(let i = 0; i < n_bloqueio; i++)
            {
                if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                    nivel = i;
            }
            if(nivel < n_bloqueio && $("input[name=lockRank][value=" + ++nivel + "]").length != 0)
                unifor_gas['block'] = 1;

            if(unifor_gas['url'] != 0 || unifor_gas['checks'] != 0 || unifor_gas['block'] != 0 || unifor_gas['name'] != 0|| unifor_gas['brand'] != 0 || unifor_gas['emoji'] != 0 || unifor_gas['gpl'] != 0 || unifor_gas['secundary_name'] != 0)
            {
                if(unifor_gas['url'] != 0 || unifor_gas['checks'] != 0 || unifor_gas['block'] != 0|| unifor_gas['gpl'] != 0)
                {
                    unifor_gas['corrigir'] = 1;
                    $( "#divuniformizar" ).show();
                    $( "#labeluniform" ).text("Auto adicionar informação complementar?");
                    $( "#btnuniformizar" ).show();
                }
                if(unifor_gas['name'] != 0 || unifor_gas['brand'] != 0 || unifor_gas['emoji'] != 0 || unifor_gas['secundary_name'] != 0)
                {
                    unifor_gas['corrigir'] = 1;
                    $( "#divuniformizar" ).show();
                    $( "#labeluniform" ).text("Nome do posto não conforme. Quer corrigir?");
                    $( "#btnuniformizar" ).show();
                }
            }
            else
            {
                $( "#divuniformizar" ).hide();
                unifor_gas['corrigir'] = 0;
            }
        }

        if($("input[name=categories]").val() == "PARKING_LOT")
        {
            if($("input[name=name]").val().indexOf(array_landmarks['🔌']) != -1 || $("input[name=name]").val().indexOf("🅿️🔌") != -1)
            {
                var tipo_pce = "";
                var name_pce = $("input[name=name]").val();
                if(name_pce.toUpperCase().indexOf('PCN') != -1)
                    tipo_pce = "PCN";
                if(name_pce.toUpperCase().indexOf('PCR') != -1)
                    tipo_pce = "PCR";
                if(name_pce.toUpperCase().indexOf('SUC') != -1)
                    tipo_pce = "SUC";

                var number_pce = "";
                var aux_pce = [];

                $.each(array_excel_pce, function(pce , dados) {

                    if(name_pce.indexOf(pce) != -1)
                    {
                        number_pce = pce;
                        aux_pce = dados;
                        return true;
                    }
                    else
                    {
                        $.each($(".alias-name.form-control"), function(index_secundary , name_secundary) {
                            let nome = name_secundary.value + "";
                            if(nome.indexOf(pce) != -1)
                            {
                                number_pce = pce;
                                aux_pce = dados;
                                return true;
                            }
                        });
                    }
                });

                if(number_pce == "")
                {
                    $( "#divuniformizar" ).show();
                    $( "#labeluniform" ).text("Este posto não consta no excel!");
                    $( "#btnuniformizar" ).hide();
                }
                else
                {
                    unifor_pce['dados'] = aux_pce;

                    var aux;
                    if($("input[name=name]").val().indexOf(array_landmarks['🔌']) != -1)
                        aux = name_pce.split(array_landmarks['🔌']);
                    if($("input[name=name]").val().indexOf('🅿️🔌') != -1)
                        aux = name_pce.split(array_landmarks['🔌']);
                    name_pce = aux[1];

                    if($("input[name=name]").val().indexOf('🅿️🔌') != -1 || name_pce.trim() != aux_pce[2])
                        unifor_pce['main_name'] = 1;

                    var secundary_names;
                    if(tipo_pce == 'PCN')
                    {
                        secundary_names = ["PCE", number_pce, "Posto de Carregamento Eléctrico"];
                        $.each(secundary_names, function(index , name) {
                            var existe = 0;
                            $.each($(".alias-name.form-control"), function(index_secundary , name_secundary) {
                                let nome = name_secundary.value + "";
                                if(nome == name)
                                    existe = 1;
                            });
                            if(existe != 1)
                                unifor_pce['secundary_name'] = 1;
                        });
                    }
                    else
                        if(tipo_pce == 'PCR')
                        {
                            secundary_names = ["PCE", number_pce, "Posto de Carregamento Eléctrico", "PCR"];
                            $.each(secundary_names, function(index , name) {
                                var existe = 0;
                                $.each($(".alias-name.form-control"), function(index_secundary , name_secundary) {
                                    let nome = name_secundary.value + "";
                                    if(nome == name)
                                        existe = 1;
                                });
                                if(existe != 1)
                                    unifor_pce['secundary_name'] = 1;
                            });
                        }
                    else
                        if(tipo_pce == 'SUC')
                        {
                            secundary_names = ["PCE", "Supercharger TESLA", "Posto de Carregamento Eléctrico", "SuC"];
                            $.each(secundary_names, function(index , name) {
                                var existe = 0;
                                $.each($(".alias-name.form-control"), function(index_secundary , name_secundary) {
                                    let nome = name_secundary.value + "";
                                    if($.trim(nome) == $.trim(name))
                                        existe = 1;
                                });
                                if(existe != 1)
                                    unifor_pce['secundary_name'] = 1;
                            });
                        }

                    if($('#service-checkbox-EV_CHARGING_STATION:checked').length < 1)
                        unifor_pce['checks'] = 1;
                    else
                        unifor_pce['checks'] = 0;

                    n_bloqueio = array_data['LD_PCE'][1] - 1;
                    nivel = 6;
                    for(let i = 0; i < n_bloqueio; i++)
                    {
                        if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                            nivel = i;
                    }
                    if(nivel < n_bloqueio && $("input[name=lockRank][value=" + ++nivel + "]").length != 0)
                        unifor_pce['block'] = 1;

                    if(tipo_pce == 'PCN' || tipo_pce == 'PCR')
                        if($("input[name=url]").val() != "https://www.mobie.pt/map")
                            unifor_pce['url'] = 1;
                    if(tipo_pce == 'SUC')
                        if($("input[name=url]").val() != "http://www.tesla.com")
                            unifor_pce['url'] = 1;

                    if(tipo_pce == 'PCN' || tipo_pce == 'PCR')
                        if($("input[name=phone]").val() != "800 916 624")
                            unifor_pce['phone'] = 1;
                    if(tipo_pce == 'SUC')
                        if($("input[name=phone]").val() != "800 180 343")
                            unifor_pce['phone'] = 1;

                    if($('textarea[name=description]').val().trim() != aux_pce[3].trim())
                    {
                        unifor_pce['description'] = 1;
                    }

                    if(unifor_pce['url'] != 0 || unifor_pce['checks'] != 0 || unifor_pce['block'] != 0 || unifor_pce['secundary_name'] != 0 || unifor_pce['main_name'] != 0 || unifor_pce['phone'] != 0 || unifor_pce['description'] != 0)
                    {
                        if(unifor_pce['url'] != 0 || unifor_pce['checks'] != 0 || unifor_pce['block'] != 0 || unifor_pce['phone'] != 0 || unifor_pce['description'] != 0)
                        {
                            unifor_pce['corrigir'] = 1;
                            $( "#divuniformizar" ).show();
                            $( "#labeluniform" ).text("Auto adicionar informação complementar?");
                            $( "#btnuniformizar" ).show();

                        }
                        if(unifor_pce['secundary_name'] != 0 || unifor_pce['main_name'] != 0)
                        {
                            unifor_pce['corrigir'] = 1;
                            $( "#divuniformizar" ).show();
                            $( "#labeluniform" ).text("Nome do PCE não conforme. Quer corrigir?");
                            $( "#btnuniformizar" ).show();
                        }
                    }
                    else
                    {
                        $( "#divuniformizar" ).hide();
                        unifor_pce['corrigir'] = 0;
                    }
                }
            }
            else
                if($("input[name=name]").val().indexOf(array_landmarks['♿️']) != -1)
                {
                    if($( ".alias-name.form-control" ).length < 1)
                        unifor_pmr['secundary_name'] = 1;
                    else
                    {
                        $.each($(".alias-name.form-control"), function(index_secundary , name_secundary) {
                            let nome = name_secundary.value + "";
                            if($.trim(nome) != "PMR")
                                unifor_pmr['secundary_name'] = 1;
                        });
                    }

                    n_bloqueio = array_data['LD_PMR'][1] - 1;
                    nivel = 6;
                    for(let i = 0; i < n_bloqueio; i++)
                    {
                        if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                            nivel = i;
                    }
                    if(nivel < n_bloqueio && $("input[name=lockRank][value=" + ++nivel + "]").length != 0)
                        unifor_pmr['block'] = 1;

                    if($('#service-checkbox-DISABILITY_PARKING:checked').length < 1)
                        unifor_pmr['checks'] = 1;
                    else
                        unifor_pmr['checks'] = 0;
                    if($('textarea[name=description]').val().indexOf('1 Lugar.\nEstacionamento para pessoas com mobilidade reduzida.') == -1 && $('textarea[name=description]').val().indexOf(' Lugares.\nEstacionamento para pessoas com mobilidade reduzida.') == -1)
                    {
                        unifor_pmr['description'] = 1;
                    }
                    if(unifor_pmr['checks'] != 0 || unifor_pmr['block'] != 0 || unifor_pmr['secundary_name'] != 0 || unifor_pmr['description'] != 0)
                    {
                        if(unifor_pmr['checks'] != 0 || unifor_pmr['block'] != 0 || unifor_pmr['description'] != 0)
                        {
                            unifor_pmr['corrigir'] = 1;
                            $( "#divuniformizar" ).show();
                            $( "#labeluniform" ).text("Auto adicionar informação complementar?");
                            $( "#btnuniformizar" ).show();
                        }
                        if(unifor_pmr['secundary_name'] != 0)
                        {
                            unifor_pmr['corrigir'] = 1;
                            $( "#divuniformizar" ).show();
                            $( "#labeluniform" ).text("Nome do PMR não conforme. Quer corrigir?");
                            $( "#btnuniformizar" ).show();
                        }
                    }
                    else
                    {
                        $( "#divuniformizar" ).hide();
                        unifor_pmr['corrigir'] = 0;
                    }
                }
            else
                if($( ".alias-name.form-control" ).length < 1)
                {
                    if($("input[name=name]").val().indexOf(array_landmarks['🅿️']) == -1)
                        unifor_parking['emoji'] = 1;

                    if(unifor_parking['emoji'] != 0)
                    {
                        unifor_parking['corrigir'] = 1;
                        $( "#divuniformizar" ).show();
                        $( "#labeluniform" ).text("Nome do estacionamento não conforme. Quer corrigir?");
                        $( "#btnuniformizar" ).show();
                    }
                    else
                    {
                        $( "#divuniformizar" ).hide();
                        unifor_parking['corrigir'] = 0;
                    }
                }
        }

        if($("input[name=categories]").val() == "TRANSPORTATION")
        {
            if($("input[name=name]").val().indexOf(array_landmarks['🚚']) != -1)
            {

                var number_cd = "";
                var aux_cd= [];

                $.each(array_excel_cd, function(cd , dados) {
                    $.each($(".alias-name.form-control"), function(index_secundary , name_secundary) {
                        let nome = name_secundary.value + "";
                        if(nome.indexOf(cd) != -1)
                        {
                            number_cd = cd;
                            aux_cd = dados;
                            unifor_cd['dados'] = aux_cd;
                            return true;
                        }
                    });
                });

                if(number_cd != "")
                {
                    if($('textarea[name=description]').val().indexOf('1 Lugar') == -1 && $('textarea[name=description]').val().indexOf(aux_cd[5] + ' Lugares') == -1)
                    {
                        unifor_cd['description'] = 1;
                    }

                    var existe = 0;
                    $.each(aux_cd[6], function(index , horario) {
                        if(horario != "")
                            existe = 1;
                    });

                    /*if(existe != 0)
                {
                    if($( ".opening-hours.side-panel-section ul li" ).length == 0)
                        unifor_cd['horarios'] = 1;
                }*/

                }
                else
                {
                    if($('textarea[name=description]').val().indexOf('1 Lugar') == -1 && $('textarea[name=description]').val().indexOf(' Lugares') == -1)
                    {
                        unifor_cd['description'] = 1;
                    }
                }
                if($( ".alias-name.form-control" ).length < 3)
                {
                    unifor_cd['secundary_name'] = 1;
                }

                if($("input[name=name]").val().indexOf(array_landmarks['🚚'] + " Cargas e Descargas") != -1)
                    unifor_cd['main_name'] = 0;
                else
                    unifor_cd['main_name'] = 1;

                if($('#service-checkbox-PARKING_FOR_CUSTOMERS:checked').length < 1)
                    unifor_cd['checks'] = 1;
                else
                    unifor_cd['checks'] = 0;

                n_bloqueio = array_data['LD_CD'][1] - 1;
                nivel = 6;
                for(let i = 0; i < n_bloqueio; i++)
                {
                    if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                        nivel = i;
                }
                if(nivel < n_bloqueio && $("input[name=lockRank][value=" + ++nivel + "]").length != 0)
                    unifor_cd['block'] = 1;

                if(unifor_cd['description'] != 0 || unifor_cd['checks'] != 0 || unifor_cd['block'] != 0 || unifor_cd['main_name'] != 0 || unifor_cd['secundary_name'] != 0 || unifor_cd['horarios'] != 0)
                {
                    unifor_cd['corrigir'] = 1;
                    if(unifor_cd['description'] != 0 || unifor_cd['checks'] != 0 || unifor_cd['block'] != 0 || unifor_cd['horarios'] != 0)
                    {
                        $( "#divuniformizar" ).show();
                        $( "#labeluniform" ).text("Auto adicionar informação complementar?");
                        $( "#btnuniformizar" ).show();
                    }
                    if(unifor_cd['main_name'] != 0 || unifor_cd['secundary_name'] != 0)
                    {
                        $( "#divuniformizar" ).show();
                        $( "#labeluniform" ).text("Nome da CD não conforme. Quer corrigir?");
                        $( "#btnuniformizar" ).show();
                    }
                }
                else
                    $( "#divuniformizar" ).hide();
            }
        }

        if (!$("#signsroad").length) {
            var signsroad = document.createElement("div");
            signsroad.id = 'signsroad';
            var array_roads = {'<img src="https://dl.dropboxusercontent.com/s/b6okbz2mstwhauk/Untitled-10.png" height="18" width="18">': ""};

            $.each(array_roads, function(emoji , allowedland) {

                // The sign background
                var addsign = document.createElement("div");
                addsign.id = 'sign_' + emoji;

                // Get width/height of sign background img
                addsign.style.cssText = 'cursor:pointer;float:left;width:34px;height:34px;';
                // Credits for some of these parts go to t0cableguy & Rickzabel
                addsign.onclick =  function() {

                    setTimeout(function() {
                        $('select[name=roadType]').val('20').change().focusout();
                    }, 1);
                    $("input[name=fwdMaxSpeed]").val('30').change().focusout();
                    $("input[name=revMaxSpeed]").val('30').change().focusout();

                    setTimeout(function() {
                        $("input[id=empty-street]").prop('checked', true).change().focusout();
                    }, 5);
                    setTimeout(function() {
                        $("input[id=empty-city]").prop('checked', true).change().focusout();
                    }, 5);
                    setTimeout(function() {
                        $(".save-button.waze-btn.waze-btn-blue.waze-btn-smaller").trigger('click');
                    }, 10);
                    setTimeout(function() {
                        $("input[name=lockRank][value=1]").prop('checked', true).change().focusout();
                    }, 15);

                }
                var emojivalue = document.createElement("div");
                emojivalue.id = 'emoji_' + emoji;
                emojivalue.style.cssText = 'text-align:center;font-size:14px;visibility:visible;';
                emojivalue.innerHTML = emoji;
                addsign.appendChild(emojivalue);
                signsroad.appendChild(addsign);
            });

            $("div #segment-edit-general").prepend(signsroad);
        }

        if (!$("#signsmoji").length) {
            var signsmoji = document.createElement("div");
            signsmoji.id = 'signsmoji';

            $.each(array_landmarks, function(emoji , allowedland) {

                // The sign background
                var addsign = document.createElement("div");
                addsign.id = 'sign_' + emoji;

                // Get width/height of sign background img
                addsign.style.cssText = 'cursor:pointer;float:left;width:34px;height:34px;';
                // Credits for some of these parts go to t0cableguy & Rickzabel
                addsign.onclick =  function() {
                    indexselected = emoji;
                    valueselected = allowedland;
                    var include = "";
                    var final = "";
                    var name = "";

                    if(indexselected == '⛽')
                    {
                        $( "#divlabelexcel" ).hide();
                        $( "#label4" ).text("GPL:");
                        $( "#input4").prop('checked', false);
                        $( "#divinput4" ).show();
                        $( "#input1" ).removeAttr("placeholder");
                        $( "#label1" ).text("Marca:");
                        $( "#input1" ).val('');
                        $( "#divinput1" ).show();
                        $( "#input2" ).removeAttr("placeholder");
                        $( "#label2" ).text("Localidade:");
                        $( "#input2" ).val('');
                        $( "#divinput2" ).show();
                        $( "#input3" ).val('');
                        $( "#divinput3" ).hide();
                        $( "#label5" ).text("Sentido:");
                        $( "#drop" ).val('n/a');
                        $( "#divinput5" ).show();
                        $( "#divbutton" ).show();

                    }

                    if(indexselected == '🅿️')
                    {
                        $( "#divlabelexcel" ).hide();
                        $( "#label4" ).text("Pago:");
                        $( "#input4").prop('checked', false);
                        $( "#divinput4" ).show();
                        $( "#input1" ).removeAttr("placeholder");
                        $( "#label1" ).text("Estacionamento:");
                        name = $("input[name=name]").val();
                        $.each(array_landmarks, function(emoji , allowedland) {
                            if(name.includes(allowedland) || name.includes("€ [P]") || name.includes('🅿'))
                            {
                                if(!name.includes("€ [P]"))
                                    include = allowedland;
                                else
                                    include = '€ [P]';
                            }
                        });
                        if(include != "")
                        {
                            final = name.split(include);
                            $( "#input1" ).val(final[1]);
                        }
                        else
                        {
                            $( "#input1" ).val($("input[name=name]").val());
                        }
                        $( "#divinput1" ).show();
                        $( "#input2" ).val('');
                        $( "#divinput2" ).hide();
                        $( "#input3" ).val('');
                        $( "#divinput3" ).hide();
                        $( "#drop" ).val('n/a');
                        $( "#divinput5" ).hide();
                        $( "#divbutton" ).show();
                    }

                    if(indexselected == '♿️')
                    {
                        $( "#divlabelexcel" ).hide();
                        $( "#divinput4" ).hide();
                        $( "#input1" ).val('');
                        $( "#divinput1" ).hide();
                        $( "#input2" ).val('');
                        $( "#divinput2" ).hide();
                        $( "#label3" ).text("Nº de Lugares PMR:");
                        $( "#input3" ).val('');
                        $( "#divinput3" ).show();
                        $( "#drop" ).val('n/a');
                        $( "#divinput5" ).hide();
                        $( "#divbutton" ).show();
                    }

                    if(indexselected == '🔌')
                    {
                        $( "#divlabelexcel" ).hide();
                        $( "#divinput4" ).hide();
                        $( "#input1" ).attr("placeholder", "PCN ou PCR ou SuC");
                        $( "#label1" ).text("Tipo de PCE:");
                        $( "#input1" ).val('');
                        $( "#divinput1" ).show();
                        $( "#input2" ).attr("placeholder", "Ex.: LRA-00005");
                        $( "#label2" ).text("Número do PCE:");
                        $( "#input2" ).val('');
                        $( "#divinput2" ).show();
                        $( "#input3" ).val('');
                        $( "#divinput3" ).hide();
                        $( "#drop" ).val('n/a');
                        $( "#divinput5" ).hide();
                        $( "#divbutton" ).show();
                    }

                    if(indexselected == '🚚')
                    {
                        /*var cdlocal = $("input[id=input1]").val();
                            var cdnumber = $("input[id=input2]").val();
                            var cdlugares = $("input[id=input3]").val();*/
                        var aux = prompt("Código do CD");

                        var aux_cd = [];

                        $.each(array_excel_cd, function(cd , dados) {

                            if(cd.indexOf(aux) != -1)
                            {
                                aux_cd = dados;
                                return true;
                            }
                        });
                        var cdnumber = aux_cd[0];
                        var cdlocal = aux_cd[4];
                        var cdlugares = aux_cd[5];
                        var prefixo = cdnumber.split("-");

                        unifor_cargas(cdlocal, cdnumber, prefixo, cdlugares);

                        setTimeout(function() {
                            $("input[id=empty-street]").prop('checked', false).change().focusout();
                        }, 150);
                        setTimeout(function() {
                            $(".form-control.street-name.tts-input").val(aux_cd[2]).change().focusout();
                        }, 200);
                        setTimeout(function() {
                            if(aux_cd[1] != "0" && aux_cd[1] != "")
                                $(".form-control.house-number").val(aux_cd[1]).change().focusout();
                        }, 250);
                        setTimeout(function() {
                            $(".city-name.form-control").val("Lisboa (" + aux_cd[4] + ")").change().focusout();
                        }, 300);
                        setTimeout(function() {
                            $(".save-button.waze-btn.waze-btn-blue.waze-btn-smaller").trigger('click');
                        }, 350);


                        if(cdlugares < 1)
                            return;
                        if(cdlugares == 1)
                            $("textarea[name=description]").val('1 Lugar.').change().focusout();
                        if(cdlugares > 1)
                            $("textarea[name=description]").val(cdlugares + ' Lugares.').change().focusout();

                        setTimeout(function() {
                            $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', true).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-EV_CHARGING_STATION').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-DISABILITY_PARKING').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-WHEELCHAIR_ACCESSIBLE').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-CREDIT_CARDS').prop('checked', false).change().focusout();
                        }, 100);

                        $("input[name=name]").val(valueselected + ' Cargas e Descargas').change().focusout();

                        n_bloqueio = array_data['LD_CD'][1];
                        lvl_atual=-1;

                        for(let i = 0; i < n_bloqueio; i++)
                        {
                            if($("input[name=lockRank][value=" + i + "]").length > 0)
                            {
                                lvl_max = i;
                                if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                                    lvl_atual = i;
                            }
                        }
                        if(lvl_atual != -1)
                        {
                            if(lvl_max + 1 > n_bloqueio)
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + n_bloqueio + "]").prop('checked', true).change().focusout();
                                }, 50);
                            else
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + lvl_max + "]").prop('checked', true).change().focusout();
                                }, 50);
                        }

                        /*setTimeout(function() {
                            add_horarios(aux_cd[6]);
                        }, 400);*/

                        definecategories(new Array("TRANSPORTATION"));

                        $( "#divlabelexcel" ).hide();
                        $( "#divinput4" ).hide();
                        $( "#input1" ).removeAttr("placeholder");
                        $( "#label1" ).text("Localidade do CD:");
                        $( "#input1" ).val('');
                        $( "#divinput1" ).hide();
                        $( "#label2" ).text("Número do CD:");
                        $( "#input2" ).attr("placeholder", "Ex.: LX-0011");
                        $( "#input2" ).val('');
                        $( "#divinput2" ).hide();
                        $( "#label3" ).text("Lugares do CD:");
                        $( "#input3" ).val('');
                        $( "#divinput3" ).hide();
                        $( "#drop" ).val('n/a');
                        $( "#divinput5" ).hide();
                        $( "#divbutton" ).hide();
                    }


                    if(indexselected == '<img src="https://dl.dropboxusercontent.com/s/ztt36b6ejebmxrg/roundabout-traffic-sign.png" height="18" width="18">')
                    {
                        n_bloqueio = array_data['LD_ROTUNDA'][1];
                        lvl_atual=-1;

                        for(let i = 0; i < n_bloqueio; i++)
                        {
                            if($("input[name=lockRank][value=" + i + "]").length > 0)
                            {
                                lvl_max = i;
                                if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                                    lvl_atual = i;
                            }
                        }
                        if(lvl_atual != -1)
                        {
                            if(lvl_max + 1 > n_bloqueio)
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + n_bloqueio + "]").prop('checked', true).change().focusout();
                                }, 50);
                            else
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + lvl_max + "]").prop('checked', true).change().focusout();
                                }, 50);
                        }

                        definecategories(new Array("FARM","JUNCTION_INTERCHANGE"));
                    }

                    if(indexselected == '🚘')
                    {
                        var number_csh = prompt("Código do Car Sharing");
                        var aux_csh = [];

                        $.each(array_excel_csh, function(csh , dados) {

                            if(csh.indexOf(number_csh) != -1)
                            {
                                aux_csh = dados;
                                return true;
                            }
                        });

                        $("input[name=name]").val(valueselected + ' Car Sharing ' + aux_csh[0]).change().focusout();

                        setTimeout(function() {
                            $('input[type="text"].alias-name.form-control').each(function () {
                                $(this).val('').change().focusout();
                            });
                        }, 20);
                        setTimeout(function() {
                            $("a.add.waze-link").trigger('click');
                        }, 25);
                        setTimeout(function() {
                            $('input[type="text"].alias-name.form-control').each(function () {
                                $(this).val(aux_csh[0]).change().focusout();
                            });
                        }, 30);

                        if(aux_csh[5] < 1)
                            return;
                        if(aux_csh[5] == 1)
                            $("textarea[name=description]").val('1 Lugar.').change().focusout();
                        if(aux_csh[5] > 1)
                            $("textarea[name=description]").val(aux_csh[5] + ' Lugares.').change().focusout();

                        n_bloqueio = array_data['LD_CSH'][1];
                        lvl_atual=-1;

                        for(let i = 0; i < n_bloqueio; i++)
                        {
                            if($("input[name=lockRank][value=" + i + "]").length > 0)
                            {
                                lvl_max = i;
                                if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                                    lvl_atual = i;
                            }
                        }
                        if(lvl_atual != -1)
                        {
                            if(lvl_max + 1 > n_bloqueio)
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + n_bloqueio + "]").prop('checked', true).change().focusout();
                                }, 50);
                            else
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + lvl_max + "]").prop('checked', true).change().focusout();
                                }, 50);
                        }

                        setTimeout(function() {
                            $('#has-tbr').prop('checked', true).change().focusout();
                        }, 40);

                        setTimeout(function() {
                            $('#parking-type-RESTRICTED').prop('checked', true).change().focusout();
                        }, 40);

                        setTimeout(function() {
                            add_horarios(aux_csh[6]);
                        }, 60);

                        definecategories(new Array("PARKING_LOT"));

                    }

                };

                // The speed value
                var emojivalue = document.createElement("div");
                emojivalue.id = 'emoji_' + emoji;
                emojivalue.style.cssText = 'text-align:center;font-size:14px;visibility:visible;';
                emojivalue.innerHTML = emoji;
                addsign.appendChild(emojivalue);
                signsmoji.appendChild(addsign);
            });



            // CSS Clear after the floats
            var cleardiv = document.createElement("div");
            cleardiv.style.cssText ='clear:both;margin-bottom:5px;';

            var labelexcelnome = document.createElement("label");
            labelexcelnome.id = 'labelexcelnome';
            labelexcelnome.innerHTML = '';
            labelexcelnome.style.cssText = 'font-size:11px;color:red;width:100%;';
            var labelexcelrevisto = document.createElement("label");
            labelexcelrevisto.id = 'labelexcelrevisto';
            labelexcelrevisto.innerHTML = '';
            labelexcelrevisto.style.cssText = 'font-size:11px;color:red;width:100%;';
            var label1 = document.createElement("label");
            label1.id = 'label1';
            label1.innerHTML = 'Teste:';
            var input1 = document.createElement("input");
            input1.id = 'input1';
            input1.style.cssText = 'width:100%;';
            var label2 = document.createElement("label");
            label2.id = 'label2';
            label2.innerHTML = 'Teste:';
            var input2 = document.createElement("input");
            input2.id = 'input2';
            input2.style.cssText = 'width:100%;';
            var label3 = document.createElement("label");
            label3.id = 'label3';
            label3.innerHTML = 'Teste:';
            var input3 = document.createElement("input");
            input3.id = 'input3';
            input3.type = 'number';
            input3.min = '1';
            input3.style.cssText = 'width:15%;height:24px;margin-left:5px;';
            var label4 = document.createElement("label");
            label4.id = 'label4';
            label4.innerHTML = 'Teste:';
            var input4 = document.createElement("input");
            input4.id = 'input4';
            input4.type = 'checkbox';
            input4.value = 'Sim';
            input4.style.cssText = 'width:24px;';

            var label5 = document.createElement("label");
            label5.id = 'label5';
            label5.innerHTML = 'Teste:';
            var dropdown5 = document.createElement("select");
            dropdown5.id = "drop";
            var array = ["n/a","S/N","N/S","O/E","E/O"];
            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("option");
                option.value = array[i];
                option.text = array[i];
                option.id = 'opcao_' + i;
                dropdown5.appendChild(option);
            }
            var label5aviso = document.createElement("label");
            label5aviso.id = 'label5aviso';
            label5aviso.innerHTML = 'Aplicável apenas a postos nos 2 sentidos';
            label5aviso.style.cssText = 'width:65%;font-size:9px;color:red;';


            label1.style.cssText = 'margin-bottom:0px;';
            label2.style.cssText = 'margin-bottom:0px;';
            label3.style.cssText = 'margin-bottom:0px;';
            var divlabelexcel = document.createElement("div");
            divlabelexcel.appendChild(labelexcelnome);
            divlabelexcel.appendChild(labelexcelrevisto);
            var divinput1 = document.createElement("div");
            divinput1.appendChild(label1);
            divinput1.appendChild(input1);
            var divinput2 = document.createElement("div");
            divinput2.appendChild(label2);
            divinput2.appendChild(input2);
            var divinput3 = document.createElement("div");
            divinput3.appendChild(label3);
            divinput3.appendChild(input3);
            var divinput4 = document.createElement("div");
            divinput4.appendChild(label4);
            divinput4.appendChild(input4);
            var divinput5 = document.createElement("div");
            divinput5.appendChild(label5);
            divinput5.appendChild(dropdown5);
            divinput5.appendChild(label5aviso);
            divinput1.style.cssText = 'margin-top:5px;';
            divinput2.style.cssText = 'margin-top:5px;';
            divinput3.style.cssText = 'margin-top:5px;';
            divinput4.style.cssText = 'margin-top:5px;';
            divinput5.style.cssText = 'margin-top:5px;';

            // Add everything to the stage
            signsmoji.appendChild(cleardiv);
            divlabelexcel.id = 'divlabelexcel';
            signsmoji.appendChild(divlabelexcel);
            divinput4.id = 'divinput4';
            signsmoji.appendChild(divinput4);
            divinput1.id = 'divinput1';
            signsmoji.appendChild(divinput1);
            divinput2.id = 'divinput2';
            signsmoji.appendChild(divinput2);
            divinput3.id = 'divinput3';
            signsmoji.appendChild(divinput3);
            divinput5.id = 'divinput5';
            signsmoji.appendChild(divinput5);
            var btnsubmit = document.createElement("button");
            btnsubmit.innerHTML = 'Aplicar';
            btnsubmit.id = 'btnsubmit';

            var labeluniform = document.createElement("label");
            labeluniform.id = 'labeluniform';
            labeluniform.innerHTML = 'O posto não está correto. Deseja corrigir?';
            labeluniform.style.cssText = 'width:85%;font-size:11px;color:red;';
            var btnuniformizar = document.createElement("button");
            btnuniformizar.innerHTML = 'Sim';
            btnuniformizar.id = 'btnuniformizar';
            btnuniformizar.style.cssText = 'height: 75%;float:right;';
            var divuniformizar = document.createElement("div");
            divuniformizar.id = 'divuniformizar';
            divuniformizar.style.cssText = 'margin-top:5px;height: 30px;';
            divuniformizar.appendChild(labeluniform);
            divuniformizar.appendChild(btnuniformizar);




            btnsubmit.onclick =  function() {

                $( "#divlabelexcel" ).hide();
                $( "#divinput4" ).hide();
                $( "#divinput1" ).hide();
                $( "#divinput2" ).hide();
                $( "#divinput3" ).hide();
                $( "#divinput5" ).hide();
                $( "#divbutton" ).hide();

                $("input[name=name]").prop('disabled', false);

                if(!$("input[name=name]").prop('disabled')) {

                    if(indexselected == '♿️')
                    {

                        definecategories(new Array("PARKING_LOT"));

                        definealiases(new Array("PMR"));

                        var lugares = $("input[id=input3]").val();
                        if(lugares < 1)
                            return;
                        if(lugares == 1)
                            $("textarea[name=description]").val('1 Lugar.\nEstacionamento para pessoas com mobilidade reduzida.').change().focusout();
                        if(lugares > 1)
                            $("textarea[name=description]").val(lugares + ' Lugares.\nEstacionamento para pessoas com mobilidade reduzida.').change().focusout();

                        setTimeout(function() {
                            $('#service-checkbox-DISABILITY_PARKING').prop('checked', true).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-EV_CHARGING_STATION').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-WHEELCHAIR_ACCESSIBLE').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-CREDIT_CARDS').prop('checked', false).change().focusout();
                        }, 100);
                        $("input[name=name]").val(valueselected).change().focusout();

                        n_bloqueio = array_data['LD_PMR'][1];
                        lvl_atual=-1;

                        for(let i = 0; i < n_bloqueio; i++)
                        {
                            if($("input[name=lockRank][value=" + i + "]").length > 0)
                            {
                                lvl_max = i;
                                if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                                    lvl_atual = i;
                            }
                        }
                        if(lvl_atual != -1)
                        {
                            if(lvl_max + 1 > n_bloqueio)
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + n_bloqueio + "]").prop('checked', true).change().focusout();
                                }, 50);
                            else
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + lvl_max + "]").prop('checked', true).change().focusout();
                                }, 50);
                        }
                    }
                    else
                        if(indexselected == '🔌')
                        {
                            definecategories(new Array("PARKING_LOT"));

                            var pcetype = $("input[id=input1]").val();
                            var pcenumber = $("input[id=input2]").val();
                            var number_pce = "";
                            var aux_pce = [];

                            $.each(array_excel_pce, function(pce , dados) {

                                if(pcenumber.indexOf(pce) != -1)
                                {
                                    number_pce = pce;
                                    aux_pce = dados;
                                    return true;
                                }
                            });

                            if(number_pce != "")
                            {
                                $("input[name=name]").val(array_landmarks['🔌'] + ' ' + aux_pce[2]).change().focusout();

                                if(aux_pce[1] == "Tesla")
                                    unifor_eletrico('SUC', aux_pce[0])
                                else
                                    unifor_eletrico(aux_pce[1], aux_pce[0])

                                setTimeout(function() {
                                    $("textarea[name=description]").val(aux_pce[3]).change().focusout();
                                }, 10);
                            }
                            else
                            {
                                if(pcetype.toUpperCase()=="PCN" ||pcetype.toUpperCase()=="PCR")
                                {
                                    unifor_eletrico(pcetype.toUpperCase(), pcenumber)
                                    $("input[name=name]").val(valueselected + ' ' + pcetype + ' ' + pcenumber).change().focusout();
                                    $("input[name=url]").val('https://www.mobie.pt/map').change().focusout();
                                    $("input[name=phone]").val('800 916 624').change().focusout();
                                }
                                if(pcetype.toUpperCase()=="SUC")
                                {
                                    unifor_eletrico(pcetype.toUpperCase(), pcenumber)
                                    $("input[name=name]").val(valueselected + ' Tesla SuC ' + pcenumber).change().focusout();
                                    $("input[name=url]").val('http://www.tesla.com').change().focusout();
                                    $("input[name=phone]").val('800 180 343').change().focusout();
                                }
                            }
                            setTimeout(function() {
                                $('#service-checkbox-EV_CHARGING_STATION').prop('checked', true).change().focusout();
                            }, 100);
                            setTimeout(function() {
                                $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', false).change().focusout();
                            }, 100);
                            setTimeout(function() {
                                $('#service-checkbox-DISABILITY_PARKING').prop('checked', false).change().focusout();
                            }, 100);
                            setTimeout(function() {
                                $('#service-checkbox-WHEELCHAIR_ACCESSIBLE').prop('checked', false).change().focusout();
                            }, 100);
                            setTimeout(function() {
                                $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', false).change().focusout();
                            }, 100);
                            setTimeout(function() {
                                $('#service-checkbox-CREDIT_CARDS').prop('checked', false).change().focusout();
                            }, 100);
                            $("textarea[name=description]").val('').change().focusout();

                            n_bloqueio = array_data['LD_PCE'][1];
                            lvl_atual=-1;

                            for(let i = 0; i < n_bloqueio; i++)
                            {
                                if($("input[name=lockRank][value=" + i + "]").length > 0)
                                {
                                    lvl_max = i;
                                    if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                                        lvl_atual = i;
                                }
                            }
                            if(lvl_atual != -1)
                            {
                                if(lvl_max + 1 > n_bloqueio)
                                    setTimeout(function() {
                                        $("input[name=lockRank][value=" + n_bloqueio + "]").prop('checked', true).change().focusout();
                                    }, 50);
                                else
                                    setTimeout(function() {
                                        $("input[name=lockRank][value=" + lvl_max + "]").prop('checked', true).change().focusout();
                                    }, 50);
                            }

                        }
                    else
                        if(indexselected == '🚚')
                        {
                            setTimeout(function() {
                                $('input[type="text"].alias-name.form-control').each(function () {
                                    $(this).val("").change().focusout();
                                });
                            }, 1);
                            var cdlocal = $("input[id=input1]").val();
                            var cdnumber = $("input[id=input2]").val();
                            var cdlugares = $("input[id=input3]").val();
                            var prefixo = cdnumber.split("-");

                            unifor_cargas(cdlocal, cdnumber, prefixo, cdlugares);

                            if(cdlugares < 1)
                                return;
                            if(cdlugares == 1)
                                $("textarea[name=description]").val('1 Lugar.').change().focusout();
                            if(cdlugares > 1)
                                $("textarea[name=description]").val(cdlugares + ' Lugares.').change().focusout();

                            setTimeout(function() {
                                $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', true).change().focusout();
                            }, 100);
                            setTimeout(function() {
                                $('#service-checkbox-EV_CHARGING_STATION').prop('checked', false).change().focusout();
                            }, 100);
                            setTimeout(function() {
                                $('#service-checkbox-DISABILITY_PARKING').prop('checked', false).change().focusout();
                            }, 100);
                            setTimeout(function() {
                                $('#service-checkbox-WHEELCHAIR_ACCESSIBLE').prop('checked', false).change().focusout();
                            }, 100);
                            setTimeout(function() {
                                $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', false).change().focusout();
                            }, 100);
                            setTimeout(function() {
                                $('#service-checkbox-CREDIT_CARDS').prop('checked', false).change().focusout();
                            }, 100);

                            $("input[name=name]").val(valueselected + ' Cargas e Descargas').change().focusout();

                            n_bloqueio = array_data['LD_CD'][1];
                            lvl_atual=-1;

                            for(let i = 0; i < n_bloqueio; i++)
                            {
                                if($("input[name=lockRank][value=" + i + "]").length > 0)
                                {
                                    lvl_max = i;
                                    if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                                        lvl_atual = i;
                                }
                            }
                            if(lvl_atual != -1)
                            {
                                if(lvl_max + 1 > n_bloqueio)
                                    setTimeout(function() {
                                        $("input[name=lockRank][value=" + n_bloqueio + "]").prop('checked', true).change().focusout();
                                    }, 50);
                                else
                                    setTimeout(function() {
                                        $("input[name=lockRank][value=" + lvl_max + "]").prop('checked', true).change().focusout();
                                    }, 50);
                            }

                            definecategories(new Array("TRANSPORTATION"));

                        }
                    if(indexselected == '🅿️')
                    {

                        if($('input[id=input4]:checked').length > 0)
                            $("input[name=name]").val('€ [P]'+ ' ' + $("input[id=input1]").val()).change().focusout();
                        else
                            $("input[name=name]").val(valueselected + ' ' + $("input[id=input1]").val()).change().focusout();
                        setTimeout(function() {
                            $('input[type="text"].alias-name.form-control').each(function () {
                                $(this).val('').change().focusout();
                            });
                        }, 10);
                        setTimeout(function() {
                            $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-EV_CHARGING_STATION').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-DISABILITY_PARKING').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-WHEELCHAIR_ACCESSIBLE').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-CREDIT_CARDS').prop('checked', false).change().focusout();
                        }, 100);

                        definecategories(new Array("PARKING_LOT"));

                    }
                    if(indexselected == '⛽')
                    {
                        definecategories(new Array("GAS_STATION"));

                        $("select[id=drop]").val() != 'n/a'?$("input[name=name]").val(valueselected + ' ' + $("input[id=input1]").val() + ' - ' + $("input[id=input2]").val() + ' [' + $("select[id=drop]").val() + ']').change().focusout():$("input[name=name]").val(valueselected + ' ' + $("input[id=input1]").val() + ' - ' + $("input[id=input2]").val()).change().focusout();
                        var marca = 1;
                        $.each(array_brand_postos, function(index, brand) {
                            if($("input[id=input1]").val().indexOf(brand) != -1)
                            {
                                setTimeout(function() {$("select[name=brand]").val(brand).change().focusout();}, 150);
                                marca=0;
                            }
                        });
                        if(marca == 1)
                            setTimeout(function() {$("select[name=brand]").val("Other").change().focusout();}, 150);
                        marca=1;
                        $.each(array_url_postos, function(posto , url) {
                            if($("input[id=input1]").val().toUpperCase() == posto.trim().toUpperCase())
                            {
                                $("input[name=url]").val(url).change().focusout();
                            }
                        });
                        setTimeout(function() {
                            $('#service-checkbox-EV_CHARGING_STATION').prop('checked', false).change().focusout();
                        }, 100);
                        setTimeout(function() {
                            $('#service-checkbox-DISABILITY_PARKING').prop('checked', false).change().focusout();
                        }, 100);
                        unifor_posto();
                        n_bloqueio = array_data['LD_COMBUSTIVEIS'][1];
                        lvl_atual=-1;

                        for(let i = 0; i < n_bloqueio; i++)
                        {
                            if($("input[name=lockRank][value=" + i + "]").length > 0)
                            {
                                lvl_max = i;
                                if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                                    lvl_atual = i;
                            }
                        }
                        if(lvl_atual != -1)
                        {
                            if(lvl_max + 1 > n_bloqueio)
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + n_bloqueio + "]").prop('checked', true).change().focusout();
                                }, 50);
                            else
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + lvl_max + "]").prop('checked', true).change().focusout();
                                }, 50);
                        }

                        if($('input[id=input4]:checked').length > 0)
                            $("textarea[name=description]").val("GPL Auto").change().focusout();

                        var camposgas = [];
                            if($("input[name=name]").val().indexOf("A. S.") != -1)
                            {
                                camposgas.push($("input[name=name]").val().replace("A. S.", "Área de Serviço"));
                            }
                            if($('input[id=input4]:checked').length > 0)
                            {
                                camposgas.push("GPL Auto");
                            }
                            definealiases(camposgas);

                    }
                }
            }

            btnuniformizar.onclick = function() {
                if(unifor_gas['corrigir'] == 1)
                {
                    if(unifor_gas['dados'].length > 1)
                    {
                        if(unifor_gas['name'] == 1)
                        {
                            $("input[name=name]").val(array_landmarks['⛽'] + " "+ unifor_gas['dados'][1]).change().focusout();
                        }
                        if(unifor_gas['brand'] == 1)
                        {
                            var marca = 1;
                            $.each(array_brand_postos, function(index, brand) {
                                if(unifor_gas['dados'][0].indexOf(brand) != -1)
                                {
                                    $("select[name=brand]").val(brand).change().focusout();
                                    marca=0;
                                }
                            });
                            if(marca == 1)
                                $("select[name=brand]").val("Other").change().focusout();
                            marca=1;
                        }
                        if(unifor_gas['gpl'] == 1)
                        {
                            if(unifor_gas['dados'][2] == "Sim")
                            {
                                if($("textarea[name=description]").val() == "")
                                    $("textarea[name=description]").val("GPL Auto").change().focusout();
                                else
                                {
                                    let descricao = $("textarea[name=description]").val().concat("\nGPL Auto");
                                    $("textarea[name=description]").val(descricao).change().focusout();
                                }
                            }
                            if(unifor_gas['dados'][2] == "Não")
                            {
                                let descricao = $("textarea[name=description]").val();
                                descricao = descricao.replace("GPL Auto","");
                                $("textarea[name=description]").val(descricao).change().focusout();
                            }
                        }
                        if(unifor_gas['secundary_name'] == 1)
                        {
                            var camposgas = [];
                            /*$.each($(".alias-name.form-control"), function(index_secundary , name_secundary) {
                                let nome = name_secundary.value + "";
                                camposgas.push(nome);
                            });*/
                            if($("input[name=name]").val().indexOf("A. S.") != -1)
                            {
                                camposgas.push($("input[name=name]").val().replace("A. S.", "Área de Serviço"));
                            }
                            if(unifor_gas['dados'][2] == "Sim")
                            {
                                camposgas.push("GPL Auto");
                            }
                            definealiases(camposgas);
                        }
                    }
                    else
                    {
                        if(unifor_gas['name'] == 1)
                        {
                            let marca = prompt('Marca',$("select[name=brand]").val() != 'Other'?$("select[name=brand]").val():'');
                            let localidade = prompt('Localidade');
                            $("input[name=name]").val(array_landmarks['⛽'] + " "+ marca + ' - ' + localidade).change().focusout();
                        }
                        if(unifor_gas['brand'] == 1)
                        {
                            var marca = 1;
                            $.each(array_brand_postos, function(index, brand) {
                                if($("input[name=name]").val().indexOf(brand) != -1)
                                {
                                    $("select[name=brand]").val(brand).change().focusout();
                                    marca=0;
                                }
                            });
                            if(marca == 1)
                                $("select[name=brand]").val("Other").change().focusout();
                            marca=1;
                        }
                    }

                    if(unifor_gas['emoji'] == 1)
                    {
                        let name = $("input[name=name]").val();
                        if(name.indexOf(array_landmarks['⛽']) == -1)
                            $("input[name=name]").val(array_landmarks['⛽'] + " " + name).change().focusout();
                    }
                    if(unifor_gas['url'] == 1)
                    {
                        let url_existe = 0;
                        $.each(array_url_postos, function(posto , url) {
                            var aux_name;
                            var name;
                            if($("input[name=name]").val().indexOf("-") != -1)
                            {
                                aux_name = $("input[name=name]").val().split("-");
                                name = aux_name[0];
                            }
                            else
                                name = $("input[name=name]").val();
                            if(name.toUpperCase().indexOf(posto.trim().toUpperCase()) != -1)
                            {
                                url_existe = 1;
                                $("input[name=url]").val(url).change().focusout();
                            }
                        });
                        if(url_existe == 0)
                            $("input[name=url]").val("").change().focusout();
                    }
                    if(unifor_gas['checks'] != 0)
                        unifor_posto();
                    if(unifor_gas['block'] != 0){
                        n_bloqueio = array_data['LD_COMBUSTIVEIS'][1];
                        lvl_atual=-1;

                        for(let i = 0; i < n_bloqueio; i++)
                        {
                            if($("input[name=lockRank][value=" + i + "]").length > 0)
                            {
                                lvl_max = i;
                                if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                                    lvl_atual = i;
                            }
                        }
                        if(lvl_atual != -1)
                        {
                            if(lvl_max + 1 > n_bloqueio)
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + n_bloqueio + "]").prop('checked', true).change().focusout();
                                }, 50);
                            else
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + lvl_max + "]").prop('checked', true).change().focusout();
                                }, 50);
                        }
                    }
                    unifor_gas['url'] = 0;
                    unifor_gas['checks'] = 0;
                    unifor_gas['block'] = 0;
                    unifor_gas['name'] = 0;
                    unifor_gas['brand'] = 0;
                    unifor_gas['emoji'] = 0;
                    unifor_gas['gpl'] = 0;
                    unifor_gas['corrigir'] = 0;
                }
                if(unifor_parking['corrigir'] == 1)
                {
                    if(unifor_parking['emoji'] == 1)
                    {
                        let name = $("input[name=name]").val();
                        if(name.indexOf('🅿️') != -1 || name.indexOf('🅿') != -1)
                        {
                            var final;
                            if(name.indexOf('🅿️ ') != -1)
                                final = name.split('🅿️ ');
                            else
                                if(name.indexOf('🅿 ') != -1)
                                    final = name.split('🅿 ');
                            else
                                if(name.indexOf('🅿️') != -1)
                                    final = name.split('🅿️');
                            else
                                if(name.indexOf('🅿') != -1)
                                    final = name.split('🅿');
                            name = final[1].trim();
                            name = name + "";
                            $("input[name=name]").val(array_landmarks['🅿️'] + ' ' + name).change().focusout();
                        }
                        else
                        {
                            if (confirm('Estacionamento Gratuito?'))
                                $("input[name=name]").val(array_landmarks['🅿️'] + ' ' + name).change().focusout();
                            else
                                $("input[name=name]").val('€ [P]'+ ' ' + name).change().focusout();
                        }

                    }
                    unifor_parking['emoji'] = 0;
                    unifor_parking['corrigir'] = 0;
                }

                if(unifor_pce['corrigir'] == 1)
                {
                    if(unifor_pce['main_name'] == 1)
                        $("input[name=name]").val(array_landmarks['🔌'] + ' ' + unifor_pce['dados'][2]).change().focusout();

                    if(unifor_pce['secundary_name'] == 1)
                        if(unifor_pce['dados'][1] == "Tesla")
                            unifor_eletrico('SUC', unifor_pce['dados'][0])
                    else
                        unifor_eletrico(unifor_pce['dados'][1], unifor_pce['dados'][0])

                    if(unifor_pce['block'] == 1)
                    {
                        n_bloqueio = array_data['LD_PCE'][1];
                        lvl_atual=-1;

                        for(let i = 0; i < n_bloqueio; i++)
                        {
                            if($("input[name=lockRank][value=" + i + "]").length > 0)
                            {
                                lvl_max = i;
                                if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                                    lvl_atual = i;
                            }
                        }
                        if(lvl_atual != -1)
                        {
                            if(lvl_max + 1 > n_bloqueio)
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + n_bloqueio + "]").prop('checked', true).change().focusout();
                                }, 50);
                            else
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + lvl_max + "]").prop('checked', true).change().focusout();
                                }, 50);
                        }
                    }

                    if(unifor_pce['url'] == 1)
                    {
                        if(unifor_pce['dados'][1] == 'PCN' || unifor_pce['dados'][1] == 'PCR')
                            $("input[name=url]").val('https://www.mobie.pt/map').change().focusout();
                        if(unifor_pce['dados'][1] == 'Tesla')
                            $("input[name=url]").val('http://www.tesla.com').change().focusout();
                    }

                    if(unifor_pce['phone'] == 1)
                    {
                        if(unifor_pce['dados'][1] == 'PCN' || unifor_pce['dados'][1] == 'PCR')
                            $("input[name=phone]").val('800 916 624').change().focusout();
                        if(unifor_pce['dados'][1] == 'Tesla')
                            $("input[name=phone]").val('800 180 343').change().focusout();
                    }

                    if(unifor_pce['checks'] == 1)
                    {
                        setTimeout(function() {
                            $('#service-checkbox-EV_CHARGING_STATION').prop('checked', true).change().focusout();
                        }, 100);
                    }

                    if(unifor_pce['description'] == 1)
                        $("textarea[name=description]").val(unifor_pce['dados'][3]).change().focusout();

                    unifor_pce['main_name'] = 0;
                    unifor_pce['secundary_name'] = 0;
                    unifor_pce['checks'] = 0;
                    unifor_pce['description'] = 0;
                    unifor_pce['url'] = 0;
                    unifor_pce['block'] = 0;
                    unifor_pce['type_pce'] = [];
                    unifor_pce['corrigir'] = 0;
                }

                if(unifor_pmr['corrigir'] == 1)
                {
                    if(unifor_pmr['secundary_name'] == 1)
                    {
                        definealiases(new Array("PMR"));
                    }

                    if(unifor_pmr['block'] == 1)
                    {
                        n_bloqueio = array_data['LD_PMR'][1];
                        for(let i = 0; i < n_bloqueio; i++)
                        {
                            if($("input[name=lockRank][value=" + i + "]:checked").length <= 0)
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + i + "]").prop('checked', true).change().focusout();
                                }, 50);
                        }
                    }

                    if(unifor_pmr['description'] == 1)
                    {
                        var lugares = prompt("Número de Lugadres de PMR:");
                        if(lugares < 1)
                            return;
                        if(lugares == 1)
                            $("textarea[name=description]").val('1 Lugar.\nEstacionamento para pessoas com mobilidade reduzida.').change().focusout();
                        if(lugares > 1)
                            $("textarea[name=description]").val(lugares + ' Lugares.\nEstacionamento para pessoas com mobilidade reduzida.').change().focusout();
                    }

                    if(unifor_pmr['checks'] == 1)
                    {
                        setTimeout(function() {
                            $('#service-checkbox-DISABILITY_PARKING').prop('checked', true).change().focusout();
                        }, 100);
                    }

                    unifor_pmr['secundary_name'] = 0;
                    unifor_pmr['checks'] = 0;
                    unifor_pmr['description'] = 0;
                    unifor_pmr['block'] = 0;
                    unifor_pmr['corrigir'] = 0;
                }

                if(unifor_cd['corrigir'] == 1)
                {

                    if(unifor_cd['dados'].length > 1)
                    {
                        if(unifor_cd['horarios'] == 1)
                        {
                            setTimeout(function() {
                                add_horarios(aux_cd[6]);
                            }, 50);
                        }

                        if(unifor_cd['description'] == 1)
                        {
                            if(unifor_cd['dados'][5] < 1)
                                return;
                            if(unifor_cd['dados'][5] == 1)
                                $("textarea[name=description]").val('1 Lugar.').change().focusout();
                            if(unifor_cd['dados'][5] > 1)
                                $("textarea[name=description]").val(unifor_cd['dados'][5] + ' Lugares.').change().focusout();
                        }
                        if(unifor_cd['secundary_name'] == 1)
                        {
                            unifor_cargas(unifor_cd['dados'][0], unifor_cd['dados'][4], unifor_cd['dados'][0].split("-"), unifor_cd['dados'][5]);
                        }

                    }
                    else
                    {
                        if(unifor_cd['description'] == 1)
                        {
                            var lugares_cd = prompt("Lugares do CD:");
                            if(lugares_cd < 1)
                                return;
                            if(lugares_cd == 1)
                                $("textarea[name=description]").val('1 Lugar.').change().focusout();
                            if(lugares_cd > 1)
                                $("textarea[name=description]").val(lugares_cd + ' Lugares.').change().focusout();
                        }
                        if(unifor_cd['secundary_name'] == 1)
                        {
                            var cdlocal = prompt("Localidade do CD:");
                            var cdnumber = prompt("Número do CD:");
                            var cdlugares = prompt("Lugares do CD:");
                            var prefixo = cdnumber.split("-");
                            unifor_cargas(cdlocal, cdnumber, prefixo, cdlugares);
                        }
                    }
                    if(unifor_cd['main_name'] == 1)
                    {
                        $("input[name=name]").val(array_landmarks['🚚'] + ' Cargas e Descargas').change().focusout();
                    }

                    if(unifor_cd['checks'] == 1)
                    {
                        setTimeout(function() {
                            $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', true).change().focusout();
                        }, 100);
                    }
                    if(unifor_cd['block'] == 1)
                    {
                        n_bloqueio = array_data['LD_CD'][1];
                        lvl_atual=-1;

                        for(let i = 0; i < n_bloqueio; i++)
                        {
                            if($("input[name=lockRank][value=" + i + "]").length > 0)
                            {
                                lvl_max = i;
                                if($("input[name=lockRank][value=" + i + "]:checked").length > 0)
                                    lvl_atual = i;
                            }
                        }
                        if(lvl_atual != -1)
                        {
                            if(lvl_max + 1 > n_bloqueio)
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + n_bloqueio + "]").prop('checked', true).change().focusout();
                                }, 50);
                            else
                                setTimeout(function() {
                                    $("input[name=lockRank][value=" + lvl_max + "]").prop('checked', true).change().focusout();
                                }, 50);
                        }
                    }
                    unifor_cd['main_name'] = 0;
                    unifor_cd['secundary_name'] = 0;
                    unifor_cd['checks'] = 0;
                    unifor_cd['description'] = 0;
                    unifor_cd['block'] = 0;
                    unifor_cd['corrigir'] = 0;
                }
            }

            btnsubmit.style.cssText = 'height: 75%;float:right;';
            var divbutton = document.createElement("div");
            divbutton.id = 'divbutton';
            divbutton.style.cssText = 'margin-top:5px;height: 30px;';
            divbutton.appendChild(btnsubmit);
            signsmoji.appendChild(divbutton);
            $("div #landmark-edit-general").prepend(signsmoji);
            $("div #landmark-edit-general").prepend(divuniformizar);
            $( "#divlabelexcel" ).hide();
            $( "#divinput1" ).hide();
            $( "#divinput2" ).hide();
            $( "#divinput3" ).hide();
            $( "#divinput4" ).hide();
            $( "#divinput5" ).hide();
            $( "#divbutton" ).hide();
            $( "#divuniformizar" ).hide();

        }
    }

    function unifor_posto()
    {
        setTimeout(function() {
            $('#service-checkbox-WHEELCHAIR_ACCESSIBLE').prop('checked', true).change().focusout();
        }, 100);
        setTimeout(function() {
            $('#service-checkbox-PARKING_FOR_CUSTOMERS').prop('checked', true).change().focusout();
        }, 100);
        setTimeout(function() {
            $('#service-checkbox-CREDIT_CARDS').prop('checked', true).change().focusout();
        }, 100);
    }

    function unifor_eletrico(pcetype, pcenumber)
    {
        var camposPCN = ["PCE", pcenumber, "Posto de Carregamento Eléctrico"];
        var camposPCR = ["PCE", pcenumber, "Posto de Carregamento Eléctrico","PCR"];
        var camposSUC = ["PCE", "Supercharger TESLA", "Posto de Carregamento Eléctrico", "SuC"];
        if(pcetype.toUpperCase()=="PCR")
        {
            definealiases(camposPCR);
        }
        if(pcetype.toUpperCase()=="PCN")
        {
            definealiases(camposPCN);
        }
        if(pcetype.toUpperCase() == "SUC")
        {
            definealiases(camposPCN);
        }
    }

    function unifor_cargas(cdlocal, cdnumber, prefixo, cdlugares)
    {
        var camposcd = ["CD " + cdlocal, "CD " + cdnumber, "CD " + prefixo[0] + " " + cdlugares + "L"];
        definealiases(camposcd);
    }

    function add_horarios(horarios)
    {
        var varios_horarios = [];

        $(".opening-hours a.delete").trigger('click');

        $.each(horarios, function(dia , horario) {
            if(horario != "" && varios_horarios.length < 1)
            {
                varios_horarios.push(horario);
                return true;
            }
            var existe = 0;
            $.each(varios_horarios, function(index , dif_horario) {
                if(horario == "" || dif_horario == horario)
                {
                    existe = 1;
                    return true;
                }
            });
            if(horario != "" && existe == 0)
                varios_horarios.push(horario);
        });

        if(varios_horarios.length > 0)
        {
            $.each(varios_horarios, function(index , dif_horario) {
                $("a.add.waze-btn.waze-btn-white").trigger('click');
                if(dif_horario == "24:00")
                {
                    $('input[name="allDay"][value="on"]').prop('checked', true).change().focusout();
                }
                else
                {
                    var aux = dif_horario.split("-");
                    $('input[name="fromTime"]').val(aux[0]);
                    $('input[name="toTime"]').val(aux[1]);
                }
                $('input[name="days"][value="1"]').prop('checked', false).change().focusout();
                $('input[name="days"][value="2"]').prop('checked', false).change().focusout();
                $('input[name="days"][value="3"]').prop('checked', false).change().focusout();
                $('input[name="days"][value="4"]').prop('checked', false).change().focusout();
                $('input[name="days"][value="5"]').prop('checked', false).change().focusout();
                $('input[name="days"][value="6"]').prop('checked', false).change().focusout();
                $('input[name="days"][value="0"]').prop('checked', false).change().focusout();
                $.each(horarios, function(dia , horario) {
                    if(dif_horario == horario)
                    {
                        if(dia == 0)
                            $('input[name="days"][value="1"]').prop('checked', true).change().focusout();
                        if(dia == 1)
                            $('input[name="days"][value="2"]').prop('checked', true).change().focusout();
                        if(dia == 2)
                            $('input[name="days"][value="3"]').prop('checked', true).change().focusout();
                        if(dia == 3)
                            $('input[name="days"][value="4"]').prop('checked', true).change().focusout();
                        if(dia == 4)
                            $('input[name="days"][value="5"]').prop('checked', true).change().focusout();
                        if(dia == 5)
                            $('input[name="days"][value="6"]').prop('checked', true).change().focusout();
                        if(dia == 6)
                            $('input[name="days"][value="0"]').prop('checked', true).change().focusout();
                    }
                });
                $("button.waze-btn.waze-btn-blue.waze-btn-smaller").trigger('click');
            });
        }
    }

    function definecategories (categories) {

        let UpdateObject= require("Waze/Action/UpdateObject");
        let myPlace = W.selectionManager.getSelectedFeatures()[0].model;
        W.model.actionManager.add(new UpdateObject(myPlace, {'categories': categories}));

    }

    function definealiases (aliases) {

        let UpdateObject= require("Waze/Action/UpdateObject");
        let myPlace = W.selectionManager.getSelectedFeatures()[0].model;
        W.model.actionManager.add(new UpdateObject(myPlace, {'aliases': aliases}));

    }

})();