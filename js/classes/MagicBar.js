//1. Define the magicBar constructor:
/*
* magicBar class should have no knowledge
* of the Actor or Level classes to
* keep it decoupled
*/
function MagicBar(config){
    this.controller = config.controller;
    this.mp = config.mp;
    this.x = config.x;
    this.y = config.y;
    this.maxWidth = config.maxWidth;
    this.height = config.height;
    this.magic = this.mp;
}
//2. Define the setmagic() method which sets the magic value:
MagicBar.prototype.setMagic = function(magic){
    this.magic = magic;
};
//3. Define the draw() method which draws the magic bar:
MagicBar.prototype.draw = function(){
    var context = this.controller.view.context;
    context.beginPath();
    context.rect(this.x, this.y, this.maxWidth, this.height);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
    context.beginPath();
    var width = this.maxWidth * this.magic / this.mp;
	//console.log("MP:" + this.mp + "MAX" + this.magic);
	//console.log("MP:" + parseInt(width));
    context.rect(this.x, this.y, parseInt(width), this.height);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
	var controller = this.controller;
	var controller = this.controller;

};