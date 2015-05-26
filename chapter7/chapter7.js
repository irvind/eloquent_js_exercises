function SmartPlantEater() {
    this.energy = 20;
    this.direction = randomElement(directionNames);
    this.eatCounter = 6;
}
SmartPlantEater.prototype.act = function(context) {
    var space = context.find(" ");
    if (this.energy > 100 && space) 
        return {type: "reproduce", direction: space};
     
    var plant = context.find("*");

    // Variant 1: stop near plant if stuffed
    if (plant) {
        if (this.eatCounter > 0) {
            this.eatCounter--;
            return false;
        } else {
            this.eatCounter = 1;
            return {type: "eat", direction: plant}; 
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
};

function Tiger() {
    this.energy = 100;
    this.direction = randomElement(directionNames);

    this.totalMoves = 0;
    this.preySeen = 0;
    this.lastHunt = 999;
}
Tiger.prototype.act = function(context) {
    this.totalMoves++;
    this.lastHunt++;    

    console.log('prey factor: ' + this.preyFactor());
    console.log('hunt factor: ' + this.huntFactor());
    console.log('energy: ' + this.energy);

    var space = context.find(' ');
    if (this.energy > 150 && space)
        return {type: "reproduce", direction: space};
    
    var prey = context.findAll('O');
    this.preySeen += prey.length;

    // console.log(this.preySeen);

    if (prey.length != 0 && (this.energy < 30 || this.huntFactor() > this.preyFactor())) {
        this.lastHunt = 0;
        return {type: "eat", direction: randomElement(prey)}; 
    }

    if (context.look(this.direction) != ' ') 
        this.direction = context.find(' ') || 's';

    return {type: 'move', direction: this.direction};
};
Tiger.prototype.preyFactor = function() {
    return (this.totalMoves / this.preySeen) * 1;
};
Tiger.prototype.huntFactor = function() {
    return this.lastHunt;
};

// animateWorld(new LifelikeWorld(
//     ["############################",
//      "#####                 ######",
//      "##   ***                **##",
//      "#   *##**         **  O  *##",
//      "#    ***     O    ##**    *#",
//      "#       O         ##***    #",
//      "#                 ##**     #",
//      "#   O       #*             #",
//      "#*          #**       O    #",
//      "#***        ##**    O    **#",
//      "##****     ###***       *###",
//      "############################"],
//     {"#": Wall,
//      "O": SmartPlantEater,
//      "*": Plant}
// ));

animateWorld(new LifelikeWorld(
    ["####################################################",
     "#                 ####         ****              ###",
     "#   *  @  ##                 ########       OO    ##",
     "#   *    ##        O O                 ****       *#",
     "#       ##*                        ##########     *#",
     "#      ##***  *         ****                     **#",
     "#* **  #  *  ***      #########                  **#",
     "#* **  #      *               #   *              **#",
     "#     ##              #   O   #  ***          ######",
     "#*            @       #       #   *        O  #    #",
     "#*                    #  ######                 ** #",
     "###          ****          ***                  ** #",
     "#       O                        @         O       #",
     "#   *     ##  ##  ##  ##               ###      *  #",
     "#   **         #              *       #####  O     #",
     "##  **  O   O  #  #    ***  ***        ###      ** #",
     "###               #   *****                    ****#",
     "####################################################"],
    {"#": Wall,
     "@": Tiger,
     "O": SmartPlantEater, 
     "*": Plant}
));
