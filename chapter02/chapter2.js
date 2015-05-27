function loopingTriangle() {
    var tri = '#';
    while (tri.length < 8)  {
        console.log(tri);
        tri = tri + '#';
    }
}

function fuzzBuzz() {
    for (var i = 1; i <= 100; i++) {
        var out = '';
        if (i % 3 == 0) 
            out += 'Fizz';
        if (i % 5 == 0)
            out += 'Buzz';
        out = out || i;

        console.log(out);
    }
}

function chessBoard(size) {
    var out = '';
    for (var i = 0; i < size; i++) {
        var ch = i % 2 == 0 ? ' ' : '#';
        for (var j = 0; j < size; j++) {
            out += ch;
            ch = ch == '#' ? ' ' : '#';
        }

        out += '\n';
    }
    
    console.log(out);
}

loopingTriangle();
fuzzBuzz();
chessBoard(8);