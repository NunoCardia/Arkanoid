"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

var gameMode;
var namePlayer;

function main()
{
	var btn = document.getElementById("back");
	btn.addEventListener("click", btnHandler);
    var btn1 = document.getElementById("play1");
    btn1.addEventListener("click",btnHandler);
    var btn2 = document.getElementById("soundLogo");
    btn2.addEventListener("click",handleSound);
    var btn3 = document.getElementById("exit");
    btn3.addEventListener("click",handleExit);
}

function gameMode1(){
    gameMode = document.getElementById("mode").value;
    namePlayer = document.getElementById("user").value;
    
    
}

function handleExit(ev){
    var btnClicado = ev.target.id;
    ev.target.removeEventListener("click", handleExit);
	var mainWindow = window.parent;
    
    if(btnClicado == "exit"){
        mainWindow.postMessage("Leave",'*');
    }
}

function btnHandler(ev)
{
	var btnClicado = ev.target.id;

	ev.target.removeEventListener("click", btnHandler);

	var mainWindow = window.parent;

	switch(btnClicado){
		case "back":
			mainWindow.postMessage("From play to main", '*');
			break;
        case "play":
            newPlayer();
            gameMode1();
            if(gameMode == "Survival Mode"){
                mainWindow.postMessage("Play to survival", '*');
            }
            else if(gameMode == "Multiplayer Mode"){
                mainWindow.postMessage("Play to multiplayer", '*');    
            }
            break;
	}
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

function newPlayer(){
	gameMode = document.getElementById("mode").value;
	namePlayer = document.getElementById("user").value;

	var player = new Player(namePlayer,gameMode,0);
	localStorage.setItem("currentPlayer",player.toString());
}
