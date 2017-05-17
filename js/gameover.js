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
}

function btnHandler(ev)
{
	var btnClicado = ev.target.id;
	console.log("ON BUTTON HANDLER");
	ev.target.removeEventListener("click", btnHandler);

	var mainWindow = window.parent;
	
	mainWindow.postMessage("Gameover to main menu",'*');
}

function handleSound(ev){
    
    var btnClicado = ev.target.id;
    var sound = document.getElementById("vol-control");
    console.log("IN IF: "+sound.style.visibility);
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
        console.log("..:"+btnClicado);
        mainWindow.postMessage("Leave",'*');
    }
}

function handleRetry(ev){
    var btnClicado = ev.target.id;
    ev.target.removeEventListener("click", handleRetry);
	var mainWindow = window.parent;
    if(btnClicado == "retry"){
        console.log("on retry button: "+localStorage.getItem("gamemode"));
        if(localStorage.getItem("gamemode") == "survival"){
            mainWindow.postMessage("Gameover to survival",'*');   
        }
        else if(localStorage.getItem("gamemode") == "multiplayer"){
            mainWindow.postMessage("Gameover to multiplayer",'*');
        }
    }
}