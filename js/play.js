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
            gameMode();
            if(gameMode == "Survival Mode"){
                mainWindow.postMessage("Play to survival", '*');
            }
            else if(gameMode == "Multiplayer Mode"){
                mainWindow.postMessage("Play to multiplayer", '*');    
            }
            break;
	}
}

function gameMode(){
    gameMode = document.getElementById("mode").value;
    namePlayer = document.getElementById("user").value;
    
    
}
//TODO: ADD PLAYERS TO FILE