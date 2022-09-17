const axios = require("axios").default;
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
}

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of people objects
}

async function getPersonByID(id) {//do edge cases
    if (typeof id != 'string') {
        throw "Error, id must be a string"
    }
    else if (id == ''){
        throw "Error, id must not be empty"
    }
    else {
        let data = await getPeople()
        for (let i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                return data[i]
            }
        }
        throw "Error, person not found"
    }

}
async function sameEmail(emailDomain) {
    answer = []
    checker = true
    if (typeof emailDomain != 'string') {
        throw "Error, input must be a string"
    }
    else if (emailDomain == ''){
        throw "Error, email domain must not be empty"
    }
    else if (emailDomain.indexOf(".") == -1){
        throw "Error, email domain must contain a dot"
    }
    else if ((emailDomain.length - emailDomain.indexOf(".")) < 3) {
        throw "Error, email domain must have at least 2 chracters after any dot"
    }
    //COVER TWO DOTS CASE
    else {
        let data = await getPeople()
        for (let i = 0; i < data.length; i++) {
            if (data[i].email.split("@")[1].toLowerCase() == emailDomain.toLowerCase()){
                answer.push(data[i])
                checker = false
            }
        }
        if (!checker) {
            return answer
        }
        else {
            throw "Error, need at least two people with the same email domain"
        }
    }
}

async function manipulateIp(){
    answer = {}
    helperArray = []
    numbersArray = []
    max = 0
    highCount = 0
    lowCount = 0
    average = 0
    total = 0
    let data = await getPeople()
    for (let i = 0; i<data.length; i++) {
        test = data[i].ip_address.split('.').join("")
        for (let j = 0; j < test.length; j++) {
            helperArray.push(test[j])
        }
        unscrambled = parseInt(helperArray.sort().toString().split(',').join(""))
        total = total + unscrambled
        if (max < unscrambled) {
            max = unscrambled
        }
        numbersArray.push(unscrambled)
        helperArray = []
    }
    newArray = numbersArray.sort(function(a, b){return a-b})
    lowest = newArray[0]
    max = newArray[newArray.length - 1]
    for (let i = 0; i<data.length; i++) {
        test = data[i].ip_address.split('.').join("")
        for (let j = 0; j < test.length; j++) {
            helperArray.push(test[j])
        }
        unscrambled = parseInt(helperArray.sort().toString().split(',').join(""))
        if (lowest == unscrambled) {
            lowCount = i
        }
        if (unscrambled == max) {
            highCount = i
        }
        helperArray = []
    }
    average = total / data.length
    answer['highest'] = { 'firstName': '' + data[highCount].first_name + '', 
    'lastName': '' + data[highCount].last_name + ''}
    answer['lowest'] = {'firstName': '' + data[lowCount].first_name + '', 'lastName': '' + data[lowCount].last_name + ''}
    answer['average'] = Math.floor(average)
    return answer
}

async function sameBirthday(month, day) {
    //Have a check for if it is a string and if we can parse it
    let data = await getPeople()
    helperArray = []
    daysToMonths = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}
    if (month < 0 || month > 12) {
        throw "Error, month must be between 1-12"
    }
    else if (daysToMonths[parseInt(month)] < parseInt(day)){
        throw "Error, too many days for that specific month"
    }
    else if (parseInt(day) > 0 && parseInt(month) > 0) {
        for (let i = 0; i<data.length; i++) {
            if (parseInt(data[i].date_of_birth.split('/')[0]) == parseInt(month) && parseInt(data[i].date_of_birth.split('/')[1]) == parseInt(day)){
                helperArray.push(data[i].first_name + ' ' + data[i].last_name)
            }
        }
        return helperArray
    }
    else if (typeof month != 'number') {
        throw "Error, month must be a number"
    }
    else if (typeof day != 'number') {
        throw "Error, day must be a number"
    }
    else {
        throw "Error"
    }
}

module.exports = {
    firstName: "Jason", 
    lastName: "Rossi", 
    studentId: "10447479",
    getPeople,
    getPersonByID,
    sameEmail,
    manipulateIp,
    sameBirthday
}