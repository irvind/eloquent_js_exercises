topEnv['array'] = function() {
    var arr = [];
    for (var i = 0; i < arguments.length; i++) 
        arr.push(arguments[i]);
    return arr;
};

topEnv['length'] = function(array) {
    if (!(array instanceof Array)) 
        throw new TypeError("Argument is not an array");
    return array.length;
};

topEnv['element'] = function(array, n) {
    if (!(array instanceof Array)) 
        throw new TypeError("Argument is not an array");
    return array[n];
};

specialForms['set'] = function(args, env) {
    if (args.length != 2 && args[0].type !== 'word')
        throw new SyntaxError("Bad use of set");

    var value = evalute(args[1], env);
    var name = args[0].name;
    while (true) {
        if (env === null) 
            throw new ReferenceError("Undefined variable: " + name);

        if (Object.prototype.hasOwnProperty.call(env, name)) {
            env[name] = value;
            return env[name];
        } else {
            env = Object.getPrototypeOf(env);
        }
    }
};

run("do(define(sum, fun(array,",
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");

run("do(define(f, fun(a, fun(b, +(a, b)))),",
    "   print(f(4)(5)))");

justParse("do(define(f, fun(a, fun(b, +(a, b)))),",
          "   print(f(4)(5)))");

justParse("# hello\nx");

justParse("a # one\n   # two\n()");

run("do(define(x, 4),",
    "   define(setx, fun(val, set(x, val))),",
    "   setx(50),",
    "   print(x))");

run("set(quux, true)");
