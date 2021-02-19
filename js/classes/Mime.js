//1. Define the magicBar constructor:
/*
* Mime class should have no knowledge
* of the Actor or Level classes to
* keep it decoupled
*/
function Mime(config){
    this.controller = config.controller;
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;

}

Mime.prototype.draw = function(){
    var context = this.controller.view.context;

	var frames = 6,currentFrame = 0;
	img = new Image();
    img.src = 'img/mime-1.png';
         
    var draw = function(){
	context.drawImage(img, currentFrame*96, 0 , 96 , 92, 0, 400, 96,92);
	 
			if (currentFrame == frames) {
			  currentFrame = 0;
							  context.restore();
			} else {
			  currentFrame++;
			}
	}
	setInterval(draw,  800);
	 
    


};