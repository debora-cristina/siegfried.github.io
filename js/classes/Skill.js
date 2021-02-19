
function Skill(config){
    this.controller = config.controller;
	this.speedPlayer = config.speedPlayer;
	this.skill = config.skill;
	this.hpMonstro = config.hpMonstro;
	this.level = config.level;
	this.mp = config.mp;
	this.efeito = null;
	this.attack = 2.25*this.level;
	this.dano = null;

}
//3. Define the draw() method which draws the health bar:
Skill.prototype.draw = function(habilidade){
    var context = this.controller.view.context;	
	var skillMp=2;
	var num = this.controller.num;
         
   
   switch(habilidade){
	case 1:
		this.attack = 2.25* this.level;
		this.hpMonstro = this.hpMonstro - this.attack;
			
		break;
	
	case 2:
		this.attack =2.25*this.level;

				
		break;
	
	case 3:
	
	break;
	
   }
		
};
