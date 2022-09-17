function makeArrays([objects]) {
    if (typeof objects == 'object') {
        const answer = [];
        for (let i = 0; i < Object.keys(first).length; i++) {
            let dictionary = objects[i]
            if (typeof dictionary == 'object') {
                for (const [key, value] of Object.entries(dictionary)) {
                    console.log(`${key}: ${value}`);
                }
            }
        }
        return answer
    }
    else {
        throw "Error, should be inputting an array of objects"
    }
}

function isDeepEqual(obj1, obj2) {
    //User https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames for these
    var first = Object.getOwnPropertyNames(obj1);
    var second = Object.getOwnPropertyNames(obj2);
    if (typeof obj1 == 'object' && typeof obj2 == 'object') {
        if (first.length == second.length) {
            for (let i = 0; i < first.length; i++) {
                property = first[i];
                if (obj1[property] != obj2[property]) {
                    return false
                }
            }
            return true
        }
        else{
            return false
        }
    }
    else {
        throw "Error, the inputs need to be objects"
    }
}
const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
console.log(isDeepEqual(first, second)); // false
console.log(isDeepEqual(forth, fifth)); // true
console.log(isDeepEqual(forth, third)); // false
console.log(isDeepEqual({}, {})); // true
// console.log(isDeepEqual([1,2,3], [1,2,3])); // throws error 
// console.log(isDeepEqual("foo", "bar")); // throws error

function computeObject(object, func) {
    if (typeof object == 'object') {
        var first = Object.getOwnPropertyNames(object);
        var dic = {}
        for (var i = 0; i < first.length; i++) {
            var property = first[i];
            newValue = func(object[property])
            dic[property] = newValue
        }
        return dic
    }
    else {
        throw "Error"
    }
}

module.exports = {
    firstName: "Jason", 
    lastName: "Rossi", 
    studentId: "10447479",
    makeArrays,
    isDeepEqual,
    computeObject
};