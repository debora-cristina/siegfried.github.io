//1. Define the HealthBar constructor:
/*
* HealthBar class should have no knowledge
* of the Actor or Level classes to
* keep it decoupled
*/
function Siegfried(config){
    this.controller = config.controller;
    this.hp = config.hp;
    this.maxMp = config.maxMp;
    this.level = config.level;
	this.attack = config.attack;
    this.exp = config.exp;
}

//2. Define the setHealth() method which sets the health value:
Siegfried.prototype.setHp = function(hp){
    this.hp = hp;
};

