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

/*
(function() {
    var nonBlank = 0;
    for (var i = 0; i < plan.length; i++) {
        for (var j = 0; j < plan[0].length; j++) {
            if (plan[i][j] != ' ')
                nonBlank++;
        }
    }

    console.log(nonBlank);
})();
*/

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
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
Grid.prototype.forEach = function(f, context) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var value = this.space[x + y * this.width];
            if (value != null) 
                f.call(context, value, vec(x, y));
        }
    }
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
World.prototype.turn = function() {
    var acted = [];
    this.grid.forEach(function(critter, vector) {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};
World.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type == 'move') {
        var dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) == null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
};
World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        var dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest)) 
            return dest;
    }
};

function Wall() {}

function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) 
        return charFromElement(this.world.grid.get(target));
    else
        return '#';
};
View.prototype.findAll = function(ch) {
    var found = [];
    for (var dir in directions) {
        if (this.look(dir) == ch)
            found.push(dir);
    }
    return found;
};
View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length == 0) 
        return null;
    else
        return randomElement(found);
};

var world = new World(plan, {'#': Wall, 'o': BouncingCritter});

animateWorld(world);

// for (var i = 0; i < 5; i++) {
//     try {
//         world.turn();
//     } catch (e) {
//         console.log(e.stack);
//     }
//     console.log(world.toString());
// }
