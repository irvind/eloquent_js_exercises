var plan = [
    "############################",
    "#      #    #      o      ##",
    "#                          #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#           ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"
];

function randomElement(array) {
    return array[Math.random() * array.length];
}

function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

function vec(x, y) {
    return new Vector(x, y);
}

function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.y >= 0 && vector.x < this.width && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
    return this.space[vector.x + (vector.y * this.width)];
};
Grid.prototype.set = function(vector, value) {
    this.space[vector.x + (vector.y * this.width)] = value;
};

var directions = {
    "n":  vec(0, -1),
    "ne": vec(1, -1),
    "e":  vec(1,  0),
    "se": vec( 1,  1),
    "s":  vec( 0,  1),
    "sw": vec(-1,  1),
    "w":  vec(-1,  0),
    "nw": vec(-1, -1)
};

var directionNames = 'n ne e se s sw w nw'.split(' ');

function BouncingCritter() {
    this.direction = randomElement(directionNames);
}
BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != ' ') 
        this.direction = view.find(' ') || 's';
    return {type: 'move', direction: this.direction};
};

function elementFromChar(legend, ch) {
    if (ch == ' ')
        return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

function charFromElement(element) {
    if (element == null) 
        return ' ';
    else 
        return element.originChar;
}

function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function (line, y) {
        for (var x = 0; x < line.length; x++) 
            grid.set(vec(x, y), elementFromChar(legend, line[x]));
    });
}
World.prototype.toString = function() {
    var output = '';
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var elem = this.grid.get(vec(x, y));
            output += charFromElement(elem);
        }
        output += '\n';
    }

    return output; 
};

function Wall() {}

var world = new World(plan, {'#': Wall, 'o': BouncingCritter});
console.log(world.toString());