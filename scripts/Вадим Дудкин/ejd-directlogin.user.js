// ==UserScript==
// @name         ejd-directlogin
// @namespace    https://greasyfork.org/ru/users/169722
// @version      2.5.0
// @description  Direct login to dnevnik.mos.ru
// @author       Vadim D.
// @match        http://dnevnik.mos.ru/
// @match        https://dnevnik.mos.ru/
// @match        http://dnevnik.mos.ru/auth
// @match        https://dnevnik.mos.ru/auth
// @require      http://code.jquery.com/jquery-latest.js
// @grant        GM_xmlhttpRequest
// @connect      mos.ru
// ==/UserScript==

const DBG = false;
const DO_AUTOLOGIN = false; //if used, re-logins after each direct logout
var $ = window.jQuery;

function password_keydown (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        lbtnclick();
    }
}

function btn_enable() {
    var btn = $("#loginbtn");
    btn.click(lbtnclick);
    btn.text("Войти");
    $("input#password").keydown(password_keydown);
}

function btn_disable() {
    var btn = $("#loginbtn");
    btn.off( "click" );
    btn.text("Загрузка...");
    $("input#password").off("keydown");
}

function debug_log(text) {
    if (DBG) {
        console.log(text);
    }
}

function loginType(login){
    if (/\S+@\S+\.\S+/.test(login)) {
        return 'email';
    }
    login = login.replace(/[ ()-]/g, '');
    if (login.substring(0, 1) == '+') {
        login = login.substring(1);
    }
    if (!isNaN(login)) {
        if ((login.length == 10 && login.substring(0, 1) == '9') || (login.length == 11 && login.substring(0,2) == '79')) {
            return 'phone';
        }
        if (login.length == 11) {
            return 'snils';
        }
    }
    return '';
}

function do_login(userdata, ver) {
    var login_url, form_data;
    switch (ver){
        case 1:
            login_url = "https://oauth20.mos.ru/sps/j_security_check";
            form_data = `j_username=${userdata.login}&j_password=${userdata.password}&accessType=${userdata.type}`;
            break;
        case 2:
            login_url = "https://login.mos.ru/sps/login/methods/password";
            form_data = `login=${userdata.login}&password=${userdata.password}`;
            break;
        default:
            debug_log("[do_login] Unknown auth version");
            return;
    }
    debug_log(`[do_login] opening request (auth v${ver})`);
    GM_xmlhttpRequest({
        method: "POST",
        url: login_url,
        data: form_data,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response){
            debug_log("[do_login] handling response");
            var r_url = new URL(response.finalUrl);
            if (r_url.hostname == "dnevnik.mos.ru" && r_url.search.indexOf("token") != -1){
                debug_log("[do_login] success, redirecting to ejd");
                window.location.replace(r_url);
            }
            else if (r_url.pathname == "/sps/loginError.jsp"){
                debug_log("[do_login] login failed");
                alert("Ошибка: неверный логин или пароль.");
                debug_log("[do_login] restoring button");
                btn_enable();
            }
            else {
                debug_log("[do_login] unknown error");
                alert("Неизвестная ошибка.");
                btn_enable();
            }
        }
    });
}

function mosru_init(userdata={}){
    debug_log("[mosru_init] opening request to initial url");
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.mos.ru/pgu/ru/application/dogm/journal/",
        headers: {
            "User-Agent": "Mozilla/5.0"
        },
        onload: function(response){
            debug_log("[mosru_init] handling response");
            var r_url = new URL(response.finalUrl);
            if (r_url.hostname == "dnevnik.mos.ru"){
                debug_log("[mosru_init] already logged in, redirecting to ejd");
                window.location.replace(r_url);
            }
            else{
                //if this is autologin and it failed
                if (!(userdata.hasOwnProperty("login") && userdata.hasOwnProperty("password") && userdata.hasOwnProperty("type"))) {
                    return;
                }
                if (r_url.pathname == "/sps/login.jsp" || r_url.pathname == "/sps/login/methods/password"){
                    debug_log("[click-mosru_init-cb] sending form data");
                    var ver = r_url.pathname == "/sps/login/methods/password" ? 2 : 1;
                    //2nd step - do actual login
                    do_login(userdata, ver);
                } else {
                    debug_log("[click-mosru_init-cb] init failed: Now at " + r_url);
                    alert("Ошибка, попробуйте еще раз.");
                    debug_log("[click-mosru_init-cb] restoring button");
                    btn_enable();
                }
            }
        }
    });
}

function lbtnclick(){
    debug_log("[click] button clicked, disabling it");
    btn_disable();
    debug_log("[click] getting form data");
    var login = $("#login").val();
    var password = $("#password").val();
    debug_log("[click] determining login type");
    var acctype = loginType(login);
    //if login is *correct* and password is present
    if (acctype && password) {
        if (acctype == "phone" || acctype == "snils"){
            //format login
            login = login.replace(/[ ()-]/g, '');
        }
        login = encodeURIComponent(login);
        password = encodeURIComponent(password);
        //1st step - get cookies for logging in
        debug_log("[click] logging in to mos.ru");
        mosru_init({"login": login, "password": password, "type": acctype});
    }
    else{
        debug_log("[click] invalid form data");
        alert(!acctype ? "Введите номер телефона, адрес e-mail или СНИЛС!" : "Введите пароль!");
        btn_enable();
    }
}

function rewritePage(){
    debug_log("[rewrite] searching for login button");
    //find login button
    var loginbutton = $("div.b-login__call-pp");
    //not found (~page is not fully loaded)
    if (loginbutton.length == 0) {
        debug_log("[rewrite] sleeping for 100ms");
        //retry after 100 ms
        setTimeout(rewritePage, 100);
        return;
    }
    debug_log("[rewrite] found button, deleting");
    loginbutton.remove();
    debug_log("[rewrite] removing description and old login form");
    //bottom mask and description
    $("div.b-login__line-bg").remove();
    $("div.b-login__about-book").remove();
    //old (hidden) login form
    $("div.b-login-modal__wrap").remove();
    debug_log("[rewrite] removing event listeners");
    //remove broken onkeydown
    var wrapper = $("div.login-wrapper")[0];
    wrapper.outerHTML = wrapper.outerHTML;
    debug_log("[rewrite] creating new login form");
    debug_log("[rewrite-addform] removing official message");
    //find textbox
    var box = $("div.b-login__table-mac");
    //remove official message
    box.empty();
    //form code
    var formhtml = `
<div class="b-login__table-description">
<h2>Добро пожаловать!</h2><p>Для входа в систему введите, пожалуйста, Ваши логин и пароль</p>
<div>
<p><input type="text" placeholder="Телефон/email/СНИЛС" id="login" style="width: 440px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;border: 2px solid #6ad9c7;border-radius: 0"></p>
<p><input type="password" placeholder="Пароль" id="password" style="width: 440px;padding: 6px 12px;font-size: 14px;line-height: 1.42857143;color: #555;border: 2px solid #6ad9c7;border-radius: 0"></p>
<p><button class="b-login__btn" id="loginbtn">Войти</button></p>
</div>
</div>`;
    debug_log("[rewrite-addform] showing login form");
    box.append(formhtml);
    debug_log("[rewrite-addform] enabling button and enter bindings");
    $("input#login").keydown(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $("input#password").focus();
        }
    });
    btn_enable();
}

$(document).ready(function() {
    debug_log("[main] userscript started");
    //if user is not logged in and this is not a redirect
    if(new URL(document.URL).search.indexOf("token") == -1 && document.cookie.indexOf("auth_token") == -1){
        if (DO_AUTOLOGIN) {
            debug_log("[main] not logged in, trying autologin");
            //redirect if already logged in at mos.ru
            mosru_init();
        }
        debug_log("[main] rewriting page");
        rewritePage();
    }
    debug_log("[main] main finished");
});