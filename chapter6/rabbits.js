function Rabbit(name, age) {
    this.name = name;
    this.age = age;
    this.alive = true;
}

Rabbit.prototype.fullName = function() {
    return this.name + " the normal rabbit";
}

Rabbit.prototype.speak = function(message) {
    console.log(this.fullName() + " says '" + message + "'");
};

Rabbit.prototype.die = function(message) {
    this.alive = false; 
    console.log(this.fullName() + " is dead :(");
}

function KillerRabbit(name, age) {
    Rabbit.call(this, name, age);
    this.frags = 0;
}
KillerRabbit.prototype = Object.create(Rabbit.prototype);

KillerRabbit.prototype.fullName = function() {
    return this.name + " the killer rabbit";
}

KillerRabbit.prototype.kill = function(rabbit) {
    this.frags++;
    console.log(this.fullName() + ' kills ' + rabbit.fullName() + ' (current frags: ' + this.frags + ')');

    rabbit.die();
}

var john = new Rabbit('John', 3);
var mike = new Rabbit('Mike', 1);

john.speak('YOLO');
mike.speak('get rekt m8');

var terminator = new KillerRabbit('Terminator', 1);

terminator.kill(john);
terminator.kill(mike);
