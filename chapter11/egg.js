function parseExpression(program) {
    program = skipSpace(program);
    var match, expr;
    if (match = /^"([^"]*)"/.exec(program)) 
        expr = {type: 'value', value: match[1]};
    else if (match = /^\d+\b/.exec(program)) 
        expr = {type: 'value', value: Number(match[0])};
    else if (match = /^[^\s(),"]+/.exec(program))
        expr = {type: 'word', name: match[0]};
    else
        throw new SyntaxError('Unexpected syntax: ' + program);

    return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr, program) {
    program = skipSpace(program);
    if (program[0] != '(')
        return {expr: expr, rest: program};

    program = skipSpace(program.slice(1));
    expr = {type: 'apply', operator: expr, args: []};
    while (program[0] != ')') {
        var arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ',')
            program = skipSpace(program.slice(1));
        else if (program[0] != ')')
            throw new SyntaxError("Expected ',' or ')'");
    }

    return parseApply(expr, program.slice(1));
}

function skipSpace(string) {
    var first = string.search(/\S/)
    if (first == -1) 
        return '';
    return string.slice(first);
}

function parse(program) {
    var result = parseExpression(program);
    if (skipSpace(result.rest).length > 0)
        throw new SyntaxError("Unexpected text after program");
    return result.expr;
}

function evalute(expr, env) {
    switch (expr.type) {
        case 'value':
            return expr.value;

        case 'word':
            if (expr.name in env)
                return env[expr.name];
            else 
                throw new ReferenceError("Undefined variable: " + expr.name);

        case 'apply':
            if (expr.operator.type == 'word' && expr.operator.name in specialForms)
                return specialForms[expr.operator.name](expr.args, env);

            var op = evalute(expr.operator, env);
            if (typeof op != 'function') 
                throw new TypeError("Applying a non-function.");

            return op.apply(null, expr.args.map(function(arg) {
                return evalute(arg, env);
            }));
    }
}

var specialForms = Object.create(null);

specialForms['if'] = function(args, env) {
    if (args.length != 3)
        throw new SyntaxError("Bad number of args to if");

    if (evalute(args[0], env) !== false) 
        return evalute(args[1], env);
    else
        return evalute(args[2], env);
};

specialForms['while'] = function(args, env) {
    if (args.length != 2)
        throw new SyntaxError("Bad number of args to while"); 

    while (evalute(args[0], env) !== false) {
        evalute(args[1], env);
    }

    return false;
};

specialForms['do'] = function(args, env) {
    var value = false;
    args.forEach(function(arg) {
        value = evalute(arg, env);
    });

    return value;
}

specialForms['define'] = function(args, env) {
    if (args.length != 2 && args[0].type !== 'word')
        throw new SyntaxError("Bad use of define");

    var value = evalute(args[1], env);
    env[args[0].name] = value;
    return value;
};

 console.log(parse("+(a, 10)"));