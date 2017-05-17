"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

var playersArray;
var multiplayer;
var survival;

function main()
{
	var btn = document.getElementById("back");
	btn.addEventListener("click", btnHandler);
    var btn2 = document.getElementById("soundLogo");
    btn2.addEventListener("click",handleSound);
    var btn3 = document.getElementById("exit");
    btn3.addEventListener("click",handleExit);
    playersArray = JSON.parse(localStorage.getItem("playersArray"));
    multiplayer = document.getElementById("multiplayerList");
    survival = document.getElementById("survivalList");
    survivalMode();
    var mode = document.getElementById("mode");
	mode.addEventListener("change",changeMode);
}

function survivalMode(){
    var line;
	multiplayer.style.display="block";
	survival.style.display="none";
	if(playersArray != null){
		rankings1(survival,"Survival");
	}
	else{
		line = survival.rows[0];
		if(line == null){
			line = survival.insertRow(0);
			var texto = line.insertCell(0);
			texto.innerHTML = "No players have played this mode";
		}
	}
}

function btnHandler(ev)
{
	var btnClicado = ev.target.id;
	
	ev.target.removeEventListener("click", btnHandler);

	var mainWindow = window.parent;
	
	mainWindow.postMessage("From ranking to main",'*');
}

function changeMode(ev){
    var mode = document.getElementById("mode").value;
    
	if(playersArray != null){
		if(mode == "Survival_Mode"){
			multiplayer.style.display="block";
			survival.style.display="none";
			rankings1(survival,"Survival");
		}
		else{
			survival.style.display="block";
			multiplayer.style.display="none";
			rankings1(multiplayer,"Multiplayer");
		}
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

function handleExit(ev){
    var btnClicado = ev.target.id;
    ev.target.removeEventListener("click", handleExit);
	var mainWindow = window.parent;
    
    if(btnClicado == "exit"){
        mainWindow.postMessage("Leave",'*');
    }
}

function rankings1(playersList,mode) {
	var line;
	var count = 0;
	var nome;
	var points;
	var j = 0;
	playersArray.sort(function(a,b) {
		return b.score - a.score;
	});

	for (var i = 0; i < playersArray.length; i++) {
		if(playersArray[i].mode == mode){
			count = 1;
			line = playersList.rows[j];
			if(line != null){
				playersList.deleteRow(j);
			}
			line = playersList.insertRow(j);
			nome = line.insertCell(0);
			points = line.insertCell(1);
			if(j<9){	
				nome.innerHTML = (j+1) + ".  " + playersArray[i].name;

				points.innerHTML = playersArray[i].score;
			}
			else if(j == 9){
				nome.innerHTML = (j+1) + ". " + playersArray[i].name;

				points.innerHTML = playersArray[i].score;
			}
			j++;	
		}
	}
	if(count == 0){
		line = playersList.rows[0];
		if(line == null){
			line = playersList.insertRow(0);
			var texto = line.insertCell(0);
			texto.innerHTML = "No players have played this mode";
		}
	}
}