function flattenArray(arr) {
    return arr.reduce(function(result, curArr) {
        return result.concat(curArr);
    }, []);
}

function average(arr) {
    function plus(a, b) { return a + b; }
    return arr.reduce(plus) / arr.length;
}

var ancestry = JSON.parse(ANCESTRY_FILE);

var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});

/*
function averageMotherChild() {
    var skipped = 0;
    return ancestry.reduce(function(sum, person) {
        var mother = byName[person.mother];
        if (mother != undefined) {
            var diff = person.born - mother.born;
            return sum + diff;
        } else {
            skipped++;
            return sum;
        }
    }, 0) / (ancestry.length - skipped);
}
*/

function averageMotherChild() {
    var withMother = ancestry.filter(function (person) {
        var mother = byName[person.mother];
        if (mother != undefined) 
            person.ageDiff = person.born - mother.born;

        return mother != undefined;
    });

    var diff = withMother.map(function(person) {
        return person.ageDiff;
    });

    return average(diff);
}

function centuryGroup(person) {
    return Math.ceil(person.died / 100);
}

function groupBy(arr, group) {
    var groups = {};
    arr.forEach(function(elem) {
        var groupName = group(elem);
        if (groupName in groups) 
            groups[groupName].push(elem);
        else 
            groups[groupName] = [elem];
    });

    return groups;
}

function averageAgeByCentury() {
    var centuries = groupBy(ancestry, centuryGroup);
    for (var centuriy in centuries) {
        var persons = centuries[centuriy];
        var ages = persons.map(function(person) {
            return person.died - person.born;
        }); 

        centuries[centuriy] = average(ages);
    }

    return centuries;
}

function every(arr, test) {
    for (var i = 0; i < arr.length; i++) {
        if (!test(arr[i]))
            return false;
    }

    return true;
}

function some(arr, test) {
    for (var i = 0; i < arr.length; i++) {
        if (test(arr[i])) 
            return true;
    }

    return false;
}

function isEven(num) {
    return num % 2 == 0;
}

console.log(flattenArray([[6], [1, 2, 3], [4, 5]]));
console.log(averageMotherChild());

var avgCenturies = averageAgeByCentury();
for (var centuriy in avgCenturies) {
    console.log(centuriy + ' ' + avgCenturies[centuriy]);
}

console.log(every([2, 4, 6], isEven));
console.log(every([2, 4, 5], isEven));

console.log(some([1, 3, 6], isEven));
console.log(some([1, 3, 5], isEven));
