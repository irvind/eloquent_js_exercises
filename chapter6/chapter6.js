function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
}
Vector.prototype.minus = function(vec) {
    return new Vector(this.x - vec.x, this.y - vec.y);
}
Object.defineProperty(Vector.prototype, 'length', {
    get: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
});

function vec(x, y) {
    return new Vector(x, y);
}

function StretchCell(inner, width, height) {
    this.inner = inner;
    this.width = width;
    this.height = height;
}
StretchCell.prototype.minWidth = function() {
    return Math.max(this.inner.minWidth(), this.width);
};
StretchCell.prototype.minHeight = function() {
    return Math.max(this.inner.minHeight(), this.height);
};
StretchCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height);
};

function dataStretchTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
        return new StretchCell(new UnderlinedCell(new TextCell(name)), 10, 1);
    });

    var body = data.map(function(row) {
        return keys.map(function(name) {
            var value = row[name];
            if (typeof value == 'number') 
                return new RTextCell(String(row[name]));
            else
                return new TextCell(String(row[name]));
        });
    });

    return [headers].concat(body);
}

function ArraySeq(array) {
    this.data = array;
    this.ind = 0;
}
ArraySeq.prototype.hasNext = function() {
    if (this.ind < this.data.length) 
        return true;
    else
        return false;
};
ArraySeq.prototype.next = function() {
    return this.data[this.ind++];
};

function RangeSeq(from, to) {
    this.from = from;
    this.to = to;
    this.cur = this.from;

    if (from <= to) 
        this.dir = 1;
    else
        this.dir = -1; 
}
RangeSeq.prototype.hasNext = function() {
    if (this.dir == 1 && this.cur > this.to) 
        return false;
    else if (this.dir == -1 && this.cur < this.to)
        return false;
    else 
        return true;
};
RangeSeq.prototype.next = function() {
    var ret = this.cur;
    this.cur += this.dir;
    return ret;
};

function logFive(seq) {
    var counter = 0;
    while (seq.hasNext() && counter < 5) {
        console.log(seq.next());
        counter++;
    }
}

var vec1 = vec(1, 2);
console.log(vec1.plus(vec(1, 2)));
console.log(vec1.minus(vec(1, 2)));
console.log(new Vector(3, 4).length);

console.log(drawTable(dataStretchTable(MOUNTAINS)));

var arr = [1, 2, 3, 4, 5, 6];
logFive(new ArraySeq(arr));
logFive(new RangeSeq(100, 120));
logFive(new RangeSeq(50, 20));
