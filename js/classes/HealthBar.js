//1. Define the HealthBar constructor:
/*
* HealthBar class should have no knowledge
* of the Actor or Level classes to
* keep it decoupled
*/
function HealthBar(config){
    this.controller = config.controller;
    this.maxHealth = config.maxHealth;
    this.x = config.x;
    this.y = config.y;
    this.maxWidth = config.maxWidth;
    this.height = config.height;
    this.health = this.maxHealth;
}
//2. Define the setHealth() method which sets the health value:
HealthBar.prototype.setHealth = function(health){
    this.health = health;
};
//3. Define the draw() method which draws the health bar:
HealthBar.prototype.draw = function(){
    var context = this.controller.view.context;
    context.beginPath();
    context.rect(this.x, this.y, this.maxWidth, this.height);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
    context.beginPath();
    var width = this.maxWidth * this.health / this.maxHealth;
	//console.log("HP:" + this.health + "MAX" + this.maxHealth);
	//console.log("HP" + width);
    context.rect(this.x, this.y, width, this.height);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
	
};
