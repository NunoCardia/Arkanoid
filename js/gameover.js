"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

function main()
{
	var btn = document.getElementById("back");
	btn.addEventListener("click", btnHandler);
    var btn2 = document.getElementById("soundLogo");
    btn2.addEventListener("click",handleSound);
    var btn3 = document.getElementById("exit");
    btn3.addEventListener("click",handleExit);
    var btn4 = document.getElementById("retry");
    btn4.addEventListener("click",handleRetry);
    var theDiv = document.getElementById("point");
    var temp = localStorage.getItem("currentPlayer").split(" ");
    theDiv.innerHTML += temp[5]; 
}

function btnHandler(ev)
{
	var btnClicado = ev.target.id;
	ev.target.removeEventListener("click", btnHandler);

	var mainWindow = window.parent;
	
	mainWindow.postMessage("Gameover to main menu",'*');
}

function handleSound(ev){
    
    var btnClicado = ev.target.id;
    var sound = document.getElementById("vol-control");
    if(sound.style.visibility == "hidden" || sound.style.visibility == ''){
        sound.style.visibility = "visible";   
    }
    else{
        sound.style.visibility = "hidden";
    }
}

function handleExit(ev){
    var btnClicado = ev.target.id;
    ev.target.removeEventListener("click", handleExit);
	var mainWindow = window.parent;
    
    if(btnClicado == "exit"){
        mainWindow.postMessage("Leave",'*');
    }
}

function handleRetry(ev){
    var btnClicado = ev.target.id;
    ev.target.removeEventListener("click", handleRetry);
	var mainWindow = window.parent;
    if(btnClicado == "retry"){
        if(localStorage.getItem("gamemode") == "survival"){
            mainWindow.postMessage("Gameover to survival",'*');   
        }
        else if(localStorage.getItem("gamemode") == "multiplayer"){
            mainWindow.postMessage("Gameover to multiplayer",'*');
        }
    }
}