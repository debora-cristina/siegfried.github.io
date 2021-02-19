
function Monstro(config){
    this.controller = config.controller;
    this.tipoMonstro = config.monstro;
	this.hpMonstro = config.hpMonstro;
	this.danoMonstro = config.danoMonstro;
	this.attack = config.attack;

}

//2. Define the setHealth() method which sets the health value:
Monstro.prototype.setHp = function(hp){
    this.hpMonstro = hp;
};
