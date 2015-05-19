function isObject(val) {
	return typeof val == 'object' && val !== null;
}

function sum(arr) {
	var s = 0;
	for (var i = 0; i < arr.length; i++) 
		s += arr[i];
	return s;
}

function range(start, end, step) {
	step = step || 1;
	var res = [];
	for (var i = start; start < end ? i <= end : i >= end; i += step) 
		res.push(i);
	return res;
}

function reverseArray(arr) {
	var res = [];
	for (var i = arr.length - 1; i >= 0; i--) 
		res.push(arr[i]);
	return res;
}

function reverseArrayInPlace(arr) {
	for (var i = 0; i < Math.floor(arr.length) - 1; i++) {
		var swap = arr[i];
		arr[i] = arr[arr.length - 1 - i];
		arr[arr.length - 1 - i] = swap;
	}
}

function arrayToList(arr) {
	if (arr.length == 0) 
		return {};

	var list, cur;
	list = cur = {value: arr[0], rest: null};
	for (var i = 1; i < arr.length; i++) {
		var item = {value: arr[i], rest: null};
		cur.rest = item;
		cur = item;
	}

	return list;
}

function listToArray(list) {
	var arr = [];
	while (list != null) {
		arr.push(list.value);
		list = list.rest;
	}

	return arr;
}

function prepend(list, val) {
	var newList = {value: val, rest: list};
	return newList;
}

function nth(list, n) {
	var item = list;
	for (var i = 0; i < n; i++) {
		item = item.rest;
		if (item == null) 
			return undefined;
	}

	return item.value;
}

function deepEqual(a, b) {	
	if (isObject(a) && isObject(b)) {
		var prop, bProps = [];

		for (prop in b) 
			bProps.push(prop);

		for (prop in a) {
			if (!(prop in b)) 
				return false;
			else if (isObject(a[prop]) && isObject(b[prop])) {
				if (!deepEqual(a[prop], b[prop])) 
					return false;
			} else {
				if (a[prop] !== b[prop])
					return false;
			}

			bProps.splice(bProps.indexOf(prop), 1);
		}

		if (bProps.length > 0) 
			return false;

		return true;
	} else {
		return a === b;
	}
}

console.log(sum(range(1, 10)));
console.log(range(5, 2, -1))

console.log(reverseArray([3, 2, 1]));

var revArr = [6, 5, 4];
reverseArrayInPlace(revArr);
console.log(revArr);

var list = arrayToList([10, 20, 30, 40, 50]);
console.log(list);

console.log(listToArray(list));

console.log(deepEqual(1, 1));
console.log(deepEqual(1, 2));
console.log(deepEqual('str', 'str'));

var obj = {test: 5};
console.log(deepEqual(obj, obj));
console.log(deepEqual({a: 5}, {a: 5}));
console.log(deepEqual({a: 5}, {a: 6}));
console.log(deepEqual({a: 5}, {a: 5, b: 6}));
console.log(deepEqual({a: 5, b: {test: 5}}, {a: 5, b: {test: 5}}));
console.log(deepEqual({a: 5, b: {test: 5}}, {a: 5, b: {test: 6}}));
