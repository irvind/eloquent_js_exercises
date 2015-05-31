(function(exports) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']

    exports.name = function(number) {
        if (number < 0 && number >= months.length) 
            return '';
        return months[number];
    };

    exports.number = function(name) {
        return months.indexOf(name);
    };
})(this.month = {});

console.log(month.name(2));
console.log(month.number('November'))