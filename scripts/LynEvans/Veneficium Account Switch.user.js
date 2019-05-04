// ==UserScript==
// @name         Veneficium Account Switch
// @namespace    http://tampermonkey.net/
// @version      2.3
// @description  try to take over the world!
// @author       Miyuun
// @match        http://www.veneficium.org/*
// @exclude      http://www.veneficium.org/chatbox*
// @exclude      http://www.veneficium.org/smilies*
// @exclude      http://www.veneficium.org/admin*
// @exclude      http://www.veneficium.org/post?mode=smilies*
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/progressbar.js/1.0.1/progressbar.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js
// ==/UserScript==

var $331 = $.noConflict(true);

function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

$331(window).on('resize', function(){
    var height = $331(window).height() - $331("#fa_toolbar").height();
    $331("#divbubbles").css("height", height-80+"px");
});

if($331("#fa_toolbar").length == 0){
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (!mutation.addedNodes) return

            for (var i = 0; i < mutation.addedNodes.length; i++) {
                var node = mutation.addedNodes[i]
                if(node.id == "fa_toolbar"){
                    bubbleAccounts();
                    observer.disconnect();
                }
            }
        })
    })
    observer.observe(document.body, {
        childList: true
        , subtree: true
        , attributes: false
        , characterData: false
    })
}else{
    bubbleAccounts();
}


function bubbleAccounts(){
    var keyPressed = false;
    var mouseovered = false;

    var allAccounts = {};
    var lastMessages = {};
    var bubbleStack = [];
    var bubbleNumber = 0;
    var BubbleDiv = document.createElement('div');
    var $331targetedDiv;

    BubbleDiv.id = "divbubbles";
    var height = $331(window).height();
    $331(BubbleDiv).css({'height':height-150+"px",'position':'fixed','left':'-100px','top':'0px','margin-top':"30px"});
    $331(document.body).append($331("<style>#divbubbles:hover{overflow:auto;width:180px;}#divbubbles{overflow:hidden;width:90px;}" +
                                        "#divbubbles::-webkit-scrollbar { width: 12px;}#divbubbles::-webkit-scrollbar-track { border-radius:8px; padding:5 5 5 5; box-shadow: inset 0 0 10px 10px transparent;border: solid 4px transparent;} "+
                                        "#divbubbles::-webkit-scrollbar-thumb { border-radius: 8px;box-shadow: inset 0 0 10px 10px  #26282C;border: solid 4px transparent;}"+
                                        ".title-bubble{z-index:-2;background-color:#2F3136;width:0px;left:15px;padding-left:0px;padding-top:6px;text-overflow: ellipsis;bottom:10px;border-radius:20px;height:21px;overflow:hidden;font-size:12px;font-weight:bold;position:absolute;display:block;white-space: nowrap;"+
                                        "transition: all 0.5s ease-in-out; -moz-transition: all 0.5s ease-in-out; /* Firefox 4 */-webkit-transition: all 0.5s ease-in-out; /* Safari and Chrome */-o-transition: all 0.5s ease-in-out; /* Opera */-ms-transition: all 0.5s ease-in-out; /* Explorer 10 */}"+
                                        ".bubble:hover{transition: all 0.5s ease-in-out;}.bubble:hover .title-bubble{transition: all 0.5s ease-in-out;width:90px;padding-left:45px;padding-right:5px;}" +
                                        ".custom-menu { display: none; z-index: 1000; position: absolute; overflow: hidden; border: 1px solid #CCC; white-space: nowrap; font-family: sans-serif; background: #FFF; color: #333;"+
                                        "border-radius: 8px; padding: 0; } .custom-menu li { padding: 8px 12px; cursor: pointer; list-style-type: none; transition: all .3s ease; user-select: none; } "+
                                        ".custom-menu li:hover { background-color: #DEF; }.login_form.modal{padding: 0!important;} .login_form h3 { margin: 0; padding: 10px; color: #fff; font-size: 14px; background: -moz-linear-gradient(top, #2e5764, #1e3d47); background: -webkit-gradient(linear,left bottom,left top,color-stop(0, #1e3d47),color-stop(1, #2e5764)); } .login_form.modal p { padding: 20px 30px; border-bottom: 1px solid #ddd; margin: 0; background: -webkit-gradient(linear,left bottom,left top,color-stop(0, #eee),color-stop(1, #fff)); overflow: hidden; } .login_form.modal p label { float: left; font-weight: bold; color: #333; font-size: 13px; width: 110px; line-height: 22px; } .login_form.modal p input[type='text'], .login_form.modal p input[type='password'] { font: normal 12px/18px 'Lucida Grande', Verdana; padding: 3px; border: 1px solid #ddd; width: 200px; }</style>"
                                       ));
    $331(document.body).append($331('<ul class="custom-menu"> <li data-action="first">First thing</li> <li data-action="second">Second thing</li> <li data-action="third">Third thing</li> </ul>'));
    $331(document.body).append(BubbleDiv);

    var link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css';
    document.getElementsByTagName("HEAD")[0].appendChild(link);
    link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css';
    document.getElementsByTagName("HEAD")[0].appendChild(link);

    var isLoginPage = function(){
        if(location.href == "http://www.veneficium.org/login"){
            bubbleStack[bubbleStack.length-1].onclick = function(){$331("input[name=login]").click()};
            $331("input[name=login]").on("click", function(){
                createAccount(username.value, password.value);
            });
        }
    }

    //Récupère les infos de connexion et les stock
    var createAccount = function(username, password){
        allAccounts[username] = {"username" : username, "password" : password, "src" : undefined};
        localStorage.setItem('accounts', JSON.stringify(allAccounts));
    }

    var importAccount = function(username, password, src){
        allAccounts[username] = {"username" : username, "password" : password, "src" : src};
        localStorage.setItem('accounts', JSON.stringify(allAccounts));
    }

    //Ajoute la bulle d'ajout de compte
    var addAddAccountBubble = function(link, onclick, title){

        var bubbleId = bubbleNumber;
        var cssBubble = {"margin-top": "10px", "margin-left": "20px","position":"relative", "cursor":"pointer",'float' : 'bottom'};
        var cssImage = {"border-radius": "40px","width":"50px","height":"50px","box-shadow":"1px 1px 30px 1px black"};
        var BubbleAccount = document.createElement('div');
        var BubbleImage = document.createElement('img');

        if(link)
            BubbleImage.src = link;
        else
            BubbleImage.src = "http://image.noelshack.com/fichiers/2017/19/1494197222-defaut.jpg";

        $331(BubbleAccount).attr("title",title);
        $331(BubbleAccount).css(cssBubble);
        $331(BubbleImage).css(cssImage);
        $331(BubbleAccount).append(BubbleImage);
        $331(BubbleAccount).addClass("addbubble");
        $331(BubbleDiv).prepend(BubbleAccount);
        bubbleStack[bubbleId] = BubbleAccount;

        if(!onclick)
            BubbleAccount.onclick = function(){
                $331('.bubble').animate({
                    left: "-70px",
                }, 400, 'easeInOutBack');
            };
        else
            BubbleAccount.onclick = onclick;

        bubbleNumber++;

    }

    //Ajoute une bulle de compte
    var addBubble = function(link, onclick, title){

        var bubbleId = bubbleNumber;
        var cssBubble = {"margin-top": "10px", "margin-left": "20px","height":"50px", "position":"relative", "cursor":"pointer",'float' : 'bottom'};
        var cssImage = {"z-index":"-1", "position":"absolute", "border-radius": "40px","width":"50px","height":"50px","box-shadow":"1px 1px 30px 1px black"};
        var BubbleAccount = document.createElement('div');
        var BubbleImage = document.createElement('img');
        var BubbleImageDiv = document.createElement('div');

        if(link)
            BubbleImage.src = link;
        else
            BubbleImage.src = "http://image.noelshack.com/fichiers/2017/19/1494197222-defaut.jpg";

        $331(BubbleAccount).data("bubbleID", bubbleId);
        $331(BubbleAccount).attr("data-title",title);
        $331(BubbleImageDiv).attr("data-title",title);
        $331(BubbleAccount).css(cssBubble);
        $331(BubbleImage).css(cssImage);
        $331(BubbleImageDiv).css(cssImage);
        $331(BubbleImage).css({"width": "100%","height": "100%","object-fit": "cover"});
        $331(BubbleAccount).append(BubbleImageDiv);
        $331(BubbleImageDiv).append(BubbleImage);
        $331(BubbleAccount).addClass("bubble");
        $331(BubbleImageDiv).addClass("bubble-image-div");
        $331(BubbleAccount).append($331("<div class='title-bubble'>" + $331(BubbleAccount).attr('data-title') + "</div>"));
        $331(BubbleDiv).prepend(BubbleAccount);
        bubbleStack[bubbleId] = BubbleAccount;

        if(link == "https://i.imgur.com/FTnBXYR.png"){
            $331(BubbleAccount).addClass("add");
        }

        if(!onclick)
            BubbleAccount.onclick = function(){
                $331('.bubble').animate({
                    left: "-70px",
                }, 400, 'easeInOutBack');
            };
        else
            BubbleAccount.onclick = onclick;

        bubbleNumber++;

    }

    //Ajoute la bubble de départ
    var addMainBubble = function(link, onclick){

        var bubbleId = bubbleNumber;
        var cssBubble = {"bottom": "20px","left": "-70px","position":"fixed", "cursor":"pointer",'float' : 'bottom', "object-fit": "cover", "cursor": "pointer", "width": "50px", "height": "50px"}
        var cssImage = {"border-radius": "40px","width": "100%","height": "100%","object-fit": "cover","box-shadow":"1px 1px 30px 1px black"};
        var BubbleAccount = document.createElement('div');
        var BubbleImage = document.createElement('img');

        if(link)
            BubbleImage.src = link;
        else
            BubbleImage.src = "http://image.noelshack.com/fichiers/2017/19/1494197222-defaut.jpg";

        $331(BubbleAccount).attr("title","Vos comptes");
        $331(BubbleAccount).css(cssBubble);
        $331(BubbleImage).css(cssImage);
        $331(BubbleAccount).append(BubbleImage);
        $331(BubbleAccount).addClass("mainbubble");

        $331(document.body).append(BubbleAccount);
        bubbleStack[bubbleId] = BubbleAccount;

        if(!onclick)
            BubbleAccount.onclick = function(){
                $331('.bubble, .addbubble').animate({
                    left: "-70px",
                }, 400, 'easeInOutBack');
            };
        else
            BubbleAccount.onclick = onclick;

        bubbleNumber++;

        $331(BubbleAccount).animate({
            left: "20px",
        }, 400, 'easeInOutBack');

    }

    // Animation pour retirer un compte
    var removeBubble = function(bubbleID){
        $331(bubbleStack[bubbleID]).animate({
            left: "-70px",
        }, 500, 'easeInOutBack',function(){
            $331(bubbleStack[bubbleID]).animate({
                height: "0px",
            }, 500, 'easeInOutBack', function(){
                setTimeout($331(bubbleStack[bubbleID]).remove(),100);
            });
        });
    }

    var changeCharacter = function(bubble, username, password){

        var progressBar =
            new ProgressBar.Circle('.bubble[data-title="'+ username.replace(/"/g, '\\"') + '"] .bubble-image-div', {
                color: '#FF5E00',
                strokeWidth: 15,
                duration: 2000, // milliseconds
                easing: 'easeInOut'
            });


        // Sauvegarder les messages des Textareas (réponses de post, nouveau post...)
        if($331("textarea").length > 0){
            for(var i = 0; i < $331("textarea").length; i++){
                lastMessages[i] = $331("textarea")[i].value;
                progressBar.animate(0.5*i/$331("textarea").length);
            }
            lastMessages.scrollTop = $331(document).scrollTop();
            localStorage.setItem('lastmessages', JSON.stringify(lastMessages));
        }else{
            progressBar.animate(0.5);
        }

        // Déconnexion puis connexion si utilisateur déjà connecté
        // Sinon connexion simple
        var url = location.href;
        if($331("#logout").attr("href") !== undefined)
            $331.ajax("http://www.veneficium.org/" + $331("#logout").attr("href"), {
                method: 'POST',
                crossDomain: false,
                success: function(){
                    progressBar.animate(0.8);
                    $331.ajax("http://www.veneficium.org/login", {
                        method: 'POST',
                        data:{ "username": username, "password": password, "autologin": "on", "redirect": "", "query": "", "login": "Connexion" },
                        crossDomain: false,
                        success: function(){
                            progressBar.animate(1.0);
                            document.location.reload(true);
                        },
                        error: function(e){
                            console.log(e);
                        }
                    });
                },
                error: function(e){
                    console.log(e);
                }
            });
        else{
            progressBar.animate(0.8);
            $331.ajax("http://www.veneficium.org/login", {
                method: 'POST',
                data:{ "username": username, "password": password, "autologin": "on", "redirect": "", "query": "", "login": "Connexion" },
                crossDomain: false,
                success: function(){
                    progressBar.animate(1.0);
                    document.location.reload(true);
                },
                error: function(e){
                    console.log(e);
                }
            });
        }
    }

    //Envoie sur la page de login
    //Déconnecte l'utilisateur si connecté
    var loginPage = function(){
        if($331("#logout").attr("href") !== undefined)
            $331.ajax("http://www.veneficium.org/" + $331("#logout").attr("href"), {
                method: 'POST',
                crossDomain: false,
                success: function(){
                    document.location.assign("http://www.veneficium.org/login");
                },
                error: function(e){
                    console.log(e);
                }
            });
        else
            document.location.assign("http://www.veneficium.org/login");
    }

    //Charge les bulles de compte à gauche
    var loadBubbles = function(){
        //bulle toujours présente
        addMainBubble($331("#fa_usermenu").find('img').attr("src"), function(){
            if($331(this).data('toggle')){
                $331('#divbubbles').animate({
                    left: "-100px",
                }, 400, 'easeInOutBack');
                $331(this).data('toggle', false);
            }else{
                $331('#divbubbles').animate({
                    left: "0px",
                }, 400, 'easeInOutBack');
                $331(this).data('toggle', true);
            }
        });

        //bulles de comptes
        for(var account in allAccounts){
            if($331("#fa_welcome").html() && (allAccounts[account].src == undefined || (allAccounts[account].username == $331("#fa_welcome").html().substring($331("#fa_welcome").html().indexOf(' ')+1) && allAccounts[account].src !== $331("#fa_usermenu").find('img').attr("src")))){
                allAccounts[account].src = $331("#fa_usermenu").find('img').attr("src");
            }
            try{throw allAccounts[account]}
            catch(account2) {
                addBubble(allAccounts[account].src, function(){
                    if(mouseovered && keyPressed){
                        // CTRL+Clic = Supprimer le compte
                        delete allAccounts[account2.username];
                        localStorage.setItem('accounts', JSON.stringify(allAccounts));
                        removeBubble($331(this).data("bubbleID"));
                    }else{
                        // Change de compte
                        changeCharacter(this, account2.username, account2.password);
                    }
                }, account2.username);
            }
        }

        // Bulle "+"
        addAddAccountBubble("https://i.imgur.com/FTnBXYR.png", function(){loginPage();}, "Ajouter un compte");

        //Sauvegarde les comptes
        localStorage.setItem('accounts', JSON.stringify(allAccounts));

        //Ajouter l'import et l'export de comptes
        $331('<form class="login_form modal" id="dialog-form"> <h3>Exporter les comptes</h3> <p><label>Comptes</label><input type="text" name="account" id="account"></p> <p><label for="email">Clé de décryptage</label><input type="text" name="decryptkey" id="decryptkey" ></p></form>').appendTo(document.body);
        $331('<a href="#dialog-form" rel="modal:open" style="display:none;">Open Modal</a>').appendTo(document.body);

        var p = document.createElement("p");
        var button = document.createElement("button");
        button.name = "submit_form";
        button.id = "submit_form";
        button.type = "button";
        button.innerHTML = "Importer les comptes";
        button.onclick = function(e){
            e.preventDefault();
            var decrypted = Crypto.decode($331('#dialog-form')[0].account.value, $331('#dialog-form')[0].decryptkey.value);
            if(isValidJson(decrypted)){
                var allAccounts = JSON.parse(decrypted);
                for(var account in allAccounts){
                    importAccount(allAccounts[account].username, allAccounts[account].password, allAccounts[account].src);
                }
                document.location.reload(true);
            }
        }
        $331(p).append(button);
        $331('#dialog-form').append(p);

        //Nouveau context menu
        $331.contextMenu({
            selector: '.mainbubble',
            callback: function(key, options) {
                switch(key){
                    case "export":
                        var array = Crypto.encode(localStorage.getItem('accounts'));
                        $331('#dialog-form')[0].account.value = array[0].toString()
                        $331('#dialog-form')[0].decryptkey.value = array[1].toString()
                        $331('#dialog-form')[0].submit_form.style.display = 'none';
                        $331('a[href="#dialog-form"]').trigger("click");
                        break;
                    case "import":
                        $331('#dialog-form')[0].account.value = ''
                        $331('#dialog-form')[0].decryptkey.value = ''
                        $331('#dialog-form')[0].submit_form.style.display = 'block';
                        $331('a[href="#dialog-form"]').trigger("click");
                        break;
                }
            },
            items: {
                "export": {name: "Exporter les comptes", icon: "fa-download"},
                "import": {name: "Importer des comptes", icon: "fa-download"}
            }
        });

        // Fonction pour vérifier si on est sur la page de login
        isLoginPage();
    }

    //Récupère les comptes
    if(isValidJson(localStorage.getItem('accounts')) && localStorage.getItem('accounts') !== null && localStorage.getItem('accounts') !== undefined){
        allAccounts = JSON.parse(localStorage.getItem('accounts'));
    }

    //Encodeur
    var Crypto = {
        encode : function(string){
            var key = Math.random().toString(36).substr(2, 10);
            var encrypted = CryptoJS.AES.encrypt(string, key);
            return [encrypted, key];
        },
        decode : function(encrypted, key){
            var decrypted = CryptoJS.AES.decrypt(encrypted, key);
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
    }

    //Récupère les messages sauvegardés puis les supprime du cache
    if(isValidJson(localStorage.getItem('lastmessages')) && localStorage.getItem('lastmessages') !== null && localStorage.getItem('lastmessages') !== undefined){
        lastMessages = JSON.parse(localStorage.getItem('lastmessages'));
        if($331("textarea").length > 0){
            for(var i = 0; i < $331("textarea").length; i++){
                $331("textarea")[i].value = lastMessages[i];
            }
        }
        $331(document).scrollTop(lastMessages.scrollTop);
        localStorage.setItem('lastmessages', undefined);
        console.log(lastMessages);
    }

    loadBubbles();

    // UI pour supprimer un compte
    function isBubbleCTRLHovered(element){
        console.log($331targetedDiv.className);
        console.log(mouseovered + " " + keyPressed);
        if(mouseovered && keyPressed){
            if($331(element).find('img')[0].src !== "https://i.imgur.com/iLi71DS.png"){
                $331(element).data('oldsrc', $331(element).find('img')[0].src);
                $331(element).find('img')[0].src = "https://i.imgur.com/iLi71DS.png";
            }
        }
        else
            $331(element).find('img')[0].src = $331(element).data('oldsrc') || $331(element).find('img')[0].src;
    }

    $331(window).bind('mousemove', function(e) {
        $331targetedDiv = $331(e.target)[0];
    });

    $331(window).keydown(function(e){
        if (e.keyCode == 17)
        {
            keyPressed = true;
        }
        else {
            keyPressed = false;
        }
        if($331targetedDiv.className == "bubble")
            isBubbleCTRLHovered($331targetedDiv);
    });

    $331(window).keyup(function(e){
        keyPressed = false;
        if($331targetedDiv.className == "bubble")
            isBubbleCTRLHovered($331targetedDiv);
    });

    $331(".bubble").mouseover(function(e){
        mouseovered = true;
        isBubbleCTRLHovered(this);
    });
    $331(".bubble").mouseout(function(){
        mouseovered = false;
        isBubbleCTRLHovered(this);
    });

}