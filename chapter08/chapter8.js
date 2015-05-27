function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
    while (true) {
        try {
            return primitiveMultiply(a, b);
        } catch (e) {
            // Ooops... try again
        }
    }
}

var box = {
    locked: true,
    unlock: function() { this.locked = false; },
    lock: function() { this.locked = true;  },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    box.unlock();
    try {
        body();
    } finally {
        box.lock();
    }
}

withBoxUnlocked(function() {
    box.content.push('gold piece');
});

try {
    withBoxUnlocked(function() {
        throw new Error('Pirates on horizon! Abort!');
    });
} catch (e) {
    console.log('Error raised: ', e);
}

console.log(box.locked);

console.log(reliableMultiply(8, 8));