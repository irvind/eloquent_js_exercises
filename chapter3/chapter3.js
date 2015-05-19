function min(a, b) {
    if (a > b) 
        return b;
    else 
        return a;
}

function isEven(num) {
    if (num == 0) 
        return true;
    else if (num == 1)
        return false;
    else
        return isEven(num - 2);
}

function countChar(str, ch) {
    var c = 0;
    for (var i = 0; i < str.length; i++) 
        if (str.charAt(i) == ch) 
            c++;

    return c;
}

console.log(min(-10, 0));
console.log(isEven(50));
console.log(isEven(75));
console.log(countChar('BBQ', 'B'));
console.log(countChar('kitteh', 'w'));