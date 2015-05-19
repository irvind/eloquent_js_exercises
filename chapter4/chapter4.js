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

console.log(sum(range(1, 10)));
console.log(range(5, 2, -1))

console.log(reverseArray([3, 2, 1]));

var revArr = [6, 5, 4];
reverseArrayInPlace(revArr);
console.log(revArr);

var list = arrayToList([10, 20, 30, 40, 50]);
console.log(list);

console.log(listToArray(list));