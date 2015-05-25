function SmartPlantEater() {
    this.energy = 20;
    this.direction = randomElement(directionNames);
    this.eatCounter = 6;
}
SmartPlantEater.prototype.act = function(context) {
    var space = context.find(" ");
    if (this.energy > 100 && space) {
        return {type: "reproduce", direction: space};
    } 

    var plant = context.find("*");

    // Variant 1: stop near plant if stuffed
    if (plant) {
        if (this.eatCounter > 0) {
            this.eatCounter = this.eatCounter ? this.eatCounter - 1 : 0;
            return false;
        } else {
            this.eatCounter = 6;
            
        }
    }

    // Variant 2: don't wait 
    // if (!this.eatCounter && plant) {
    //     return {type: "eat", direction: plant};
    // }

    if (context.look(this.direction) != ' ') 
        this.direction = context.find(' ') || 's';

    this.eatCounter = this.eatCounter ? this.eatCounter - 1 : 0;
    return {type: 'move', direction: this.direction};
}

animateWorld(new LifelikeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": SmartPlantEater,
   "*": Plant}
));