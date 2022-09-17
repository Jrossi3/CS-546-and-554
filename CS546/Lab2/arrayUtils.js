function mean(array) {
    if (typeof array != 'object'){
        throw 'Error, should be an array'
    }
    else if (array.length == 0) {
        throw 'Error, array should not be empty'
    }
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total = total + array[i];
    }
    return total / array.length;
}

function medianSquared(array){
    lengthOfArray = array.length
    if (typeof array != 'object'){
        throw 'Error, should be an array'
    }
    else if (lengthOfArray == 0) {
        throw 'Error, array should not be empty'
    }
    array.sort()
    if (lengthOfArray % 2 != 0) {
        return array[Math.trunc(lengthOfArray/2)];
    }
}
console.log(medianSquared([7]))

function maxElement(array) {
    if (typeof array != 'object'){
        throw 'Error, should be an array'
    }
    else if (array.length == 0) {
        throw 'Error, array should not be empty'
    }
    max = array[0];
    position = 0
    for(let i = 1; i < array.length; i++) {
        if (typeof array[i] != 'number') {
            throw 'Error, should have only numbers'
        }
        if (max < array[i]) {
            max = array[i]
            position = i
        }
    }
    return "{'" + max + "': " + position + "}";
}

function fill(end, value) {
    fillArray = []
    if (typeof value == 'undefined' && typeof end == 'number' && end > 0) {
        for (let i = 0; i<end; i++) {
            fillArray[i] = i;
        }
    }
    else if (typeof end == 'number' && end > 0 ){
        for(let i = 0; i<end; i++) {
            fillArray[i] = value;
        }
    }
    else if (typeof end != 'number' || end <= 0) {
        throw 'Error, must be a positive number'
    }
    return fillArray;
}
function countRepeating(array){
    if (typeof array === 'object'){
        tempArrayCounter = []
        tempArrayUnique = []
        tCount = 0
        tUnique = 0
        for (let i = 0; i<array.length; i++) {
            checkRepeat = false;
            tempCheckRepeat = false;
            noRepeats = true;
            temp = array[i]
            count = 0;
            for (let j = i+1; j<array.length; j++) {
                if(noRepeats){
                    for (let x = 0; x < tempArrayUnique.length; x++){
                        if (temp === tempArrayUnique[x]) {
                            tempCheckRepeat = true;
                            count++;
                        }
                    }
                }
                if (temp == array[j] && tempCheckRepeat == false){
                    if ((temp === true && array[j] === 1) || (temp === 1 && array[j] === true)) {
                        
                    }else{
                    count++;
                    noRepeats = false
                    if (checkRepeat == false) {
                        tempArrayUnique[tUnique] = temp;
                        tUnique++;
                    }
                    checkRepeat = true;
                    }
                }
                
            }
            if (checkRepeat){
                count++;
                tempArrayCounter[tCount] = count;
                tCount++;
            }
        }
        if (tempArrayCounter.length == tempArrayUnique.length) {
            var answer = {};
            for (let i = 0; i < tempArrayCounter.length; i++) {
                answer[tempArrayUnique[i]] = tempArrayCounter[i]
            }
            return answer
        }
    }
    else {
        throw "Error, should input an array"
    }
}
console.log(countRepeating(['a', 'a', 'b', '8', 8, 8, true, 'true']))
function isEqual(arrayOne, arrayTwo) {
    if(typeof arrayOne == 'object' && typeof arrayTwo == 'object') {
        if (arrayOne.length == arrayTwo.length) {
            for (let i = 0; i < arrayOne.length; i++) {
                if (typeof arrayOne[i] == 'object' && typeof arrayTwo[i] == 'object') {
                    if (JSON.stringify(arrayTwo[i].sort()) != JSON.stringify(arrayOne[i].sort())) {
                        return false;
                    }
                }
                if (typeof arrayOne[i] == 'number' && typeof arrayTwo[i] == 'number') {
                    arrayOne.sort();
                    arrayTwo.sort();
                    if (arrayOne[i] != arrayTwo[i]) {
                        return false;
                    }
                }
                if (typeof arrayOne[i] == 'string' && typeof arrayTwo[i] == 'string') {
                    arrayOne.sort();
                    arrayTwo.sort();
                    if (arrayOne[i] != arrayTwo[i]) {
                        return false;
                    }
                }
            }
            return true
        }
        else {
            return false;
        }
    }
    else {
        throw "Error, inputs need to be arrays"
    }
}

module.exports = {
    firstName: "Jason", 
    lastName: "Rossi", 
    studentId: "10447479",
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
};