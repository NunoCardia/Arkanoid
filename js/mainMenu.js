"use strict";

(function()
{
    window.addEventListener("load",main);
}());

var frame;

function main(){
    window.addEventListener("option",optionHandler);
    frame = document.getElementsByTagName("iframe")[0];
    showPage("start.html");
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
        case "Start":
            hidePage("start.html");
            showPage("mainMenu.html");
            break;
        case 
    }
}