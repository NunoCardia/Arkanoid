"use strict";

(function()
{
    window.addEventListener("load",main);
}());

var frame;

function main(){
    window.addEventListener("message",optionHandler);
    frame = document.getElementsByTagName("iframe")[0];
    showPage("html/start.html");
}

function showPage(new_name){
    frame.src = new_name;
}

function hidePage(){
    frame.src = "";
}

function optionHandler(evt){
    var temp = evt.data;
    localStorage.setItem("sourceFrame",temp);
    switch(temp){
        case "Menu":
            hidePage("html/start.html");
            showPage("html/menu.html");
            break;
        case "Play":
            hidePage("html/menu.html");
            showPage("html/play.html");
            break;
        case "Ranking":
            hidePage("html/menu.html");
            showPage("html/rankings.html");
            break;
        case "About - Main Menu":
            hidePage("html/menu.html");
            showPage("html/about.html");
            break;
        case "From ranking to main":
            hidePage("html/rankings.html");
            showPage("html/menu.html");
            break;
        case "From play to main":
            hidePage("html/play.html");
            showPage("html/menu.html");
            break;
        case "From about to main":
            hidePage("html/about.html");
            showPage("html/menu.html");
            break;
        case "Play to game":
            hidePage("html/play.html");
            showPage("html/game.html");
            break;
        case "Game to menu":
            hidePage("html/game.html");
            showPage("html/menu.html");
            break;
    }
}