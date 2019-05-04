// ==UserScript==
// @name        Vk(Вк) о погоде
// @description Vk(Вк) бот предоставляющий информацию о погоде в вашем городе
// @version     1
// @namespace https://greasyfork.org/users/169211
// ==/UserScript==

/**
 * автор: Катя Пестрякова( настоящее ФИ скрыты:) )
 * ссылка на меня: https://vk.com/id471422730
 * 
 */
vk.addListener.messages(function(msg) {

    if (msg.body == "Бот погода" | msg.body == "бот погода") {
        var httpRequest = new XMLHttpRequest();
        var myString = Date();
        var stringTwo = myString.substring(3, 24)
        var gorod_id = 'Moscow' // ВНИМАНИЕ укажите тут ваш город на англиском!!!!!!!!!!!!!!!

        var messageText = "привет "+gorod_id+"!"+"\nСегодня: " + stringTwo + " ";

        var Info = {
            "temp": null,
            "temp_min": null,
            "temp_max": null,
            "wind_speed": null,
            "weather": null
        };

        httpRequest.open("GET", "http://api.openweathermap.org/data/2.5/find?q="+gorod_id+"&units=metric&type=like&lang=ru&APPID=50a20b250aa2e38f12bf337aa4ff2948", false);
        httpRequest.send(null);

        var response = JSON.parse(httpRequest.responseText, function(key, value) {
            return value;
        });

        Info["temp"] = response['list'][0]['main']['temp'];
        Info["temp_min"] = response['list'][0]['main']['temp_min'];
        Info["temp_max"] = response['list'][0]['main']['temp_max'];
        Info["wind_speed"] = response['list'][0]['wind']['speed'];
        Info["weather"] = response['list'][0]['weather'][0]['description'];
        messageText = messageText + Info["weather"] + "\n" + "Температура: " + Info["temp"] + "\n" + "минимальная температура за сегодня: " + Info["temp_min"] + "\n" + "максимальная температура за сегодня: " + Info["temp_max"] + "\n" + "Скорость ветра: " + Info["wind_speed"];

        msg.send(messageText);

    }
