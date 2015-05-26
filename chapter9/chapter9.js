function verify(regexp, yes, no) { 
    if (regexp.source == "...") return;
    yes.forEach(function(s) {
        if (!regexp.test(s))
            console.log("Failure to match '" + s + "'");
    });

    no.forEach(function(s) {
        if (regexp.test(s))
            console.log("Unexpected match for '" + s + "'");
    });

    console.log('Succeed: ' + regexp.source);
}

verify(/ca[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop"]);   

verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/\b\w+ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\s[\.,:;]/,
       ["bad punctuation ."],
       ["escape the dot"]);

verify(/\b\w{7,}\b/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(/\b[a-df-zA-DF-Z]+\b/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);

var text = "'I'm the cook,' he said, 'it's my job.'";

console.log(text.replace(/(^|\W)'|'($|\W)/g, '$1"$2'));

var number = /^[-+]?(\d+|\d+\.\d+|\d+\.|\.\d+)([eE][-+]?\d+)?$/;

var correct = ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"];
var incorrect = ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."];

correct.forEach(function(s) {
    if (!number.test(s))
        console.log("Failed to match '" + s + "'");
});

incorrect.forEach(function(s) {
    if (number.test(s))
        console.log("Incorrectly accepted '" + s + "'");
});