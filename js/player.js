"use strict";

class Player{
    constructor(name,mode,score){
        this.name = name;
        this.mode = mode;
        this.score = score;
    }
}

Player.prototype.toString = function playerToString() {
  var ret = 'Name ' + this.name + ' Mode ' + this.mode + ' Score ' + this.score;
  return ret;
}