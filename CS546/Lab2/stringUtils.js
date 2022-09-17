function camelCase(string){
    if (typeof string == 'string') {
        if (string.length > 0 && string.trim().length != 0) {
            upperCaseString = string.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            updated = upperCaseString.charAt(0).toLowerCase() + upperCaseString.slice(1);
            updated = updated.replace(/\s/g, '');
            return updated 
        }
        else {
            throw 'Error, input must have length greater than 0'
        }
    }
    else {
        throw 'Error, input must be a string'
    }
}
// console.log(camelCase("Hi my name is jason rossi"))
function replaceChar(string){
    if (typeof string == 'string' && string.length != 0) {
        temp1 = string;
        temp2 = '';
        firstLetter = string[0]
        switcher = true
        for (let i = 1; i < string.length; i++) {
            if (firstLetter == string[i].toLowerCase() || firstLetter == string[i].toUpperCase()) {
                if (switcher) {
                    temp2 = temp1.substring(0, i) + '*' + temp1.substring(i + 1);
                    temp1 = temp2;
                    switcher = false
                }
                else if (!switcher) {
                    temp2 = temp1.substring(0, i) + '$' + temp1.substring(i + 1);
                    temp1 = temp2;
                    switcher = true
                }
            }
        }
        return temp2
    }
    else {
        throw "Error, input should be a non-empty string"
    }

}
console.log(replaceChar('foo'))
function mashUp(string1, string2){
    if (typeof string1 == 'string' && typeof string2 == 'string') {
        if (string1.trim().length > 1 && string2.trim().length > 1) {
            temp1 = string1;
            temp2 = string2;
            temp1 = string2[0] + string1.substring(1);
            temp2 = string1[0] + string2.substring(1);
            final1 = temp1.substring(0, 1) + string2[1] + temp1.substring(2);
            final2 = temp2.substring(0, 1) + string1[1] + temp2.substring(2);
            return final1 + " " + final2
        }
        else {
            throw "Error, each string must be at least 2 characters without spaces"
        }
    }
    else{
        throw "Error, both inputs need to be a string"
    }
}

module.exports = {
    firstName: "Jason", 
    lastName: "Rossi", 
    studentId: "10447479",
    camelCase,
    replaceChar,
    mashUp
};
