const axios = require("axios").default;
const stocks = require("./stocks")
const people = require("./people")
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
}

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of people objects
}

async function listShareholders(stockName) {
    if (typeof stockName != 'string'){
        throw "Error, stock name must be a string"
    }
    else if (stockName.length == 0){
        throw "Error, stock name must not be empty"
    }
    else {
        let data = await getStocks()
        answer = {}
        count = 0
        checker = true
        for (let i = 0; i < data.length; i++) {
            if (stockName == data[i].stock_name) {
                answer['id'] = data[i].id
                answer['stock_name'] = stockName
                count = i
                checker = false
            }
        }
        helperArray = []
        for (let i = 0; i < data[count].shareholders.length; i++) {
            temp = await people.getPersonByID(data[count].shareholders[i].userId)
            tempHelper = {'first_name': "" + temp.first_name 
                + "", 'last_name': '' + temp.last_name + '', 
                'number_of_shares': data[count].shareholders[i].number_of_shares}
            helperArray.push(tempHelper)
        }
        answer['shareholders'] = helperArray
        if (!checker) {
            return answer
        }
        else{
            throw "Error, nothing matches"
        }
    }
}

async function totalShares(stockName) {
    if (typeof stockName != 'string'){
        throw "Error, stock name must be a string"
    }
    else if (stockName.trim().length == 0){
        throw "Error, stock name must not be empty"
    }
    else {
        let data = await getStocks()
        answer = {}
        count = 0
        checker = true
        for (let i = 0; i < data.length; i++) {
            if (stockName == data[i].stock_name) {
                answer['id'] = data[i].id
                answer['stock_name'] = stockName
                count = i
                checker = false
            }
        }
        helperArray = []
        sharesTotal = 0
        shareHolderCounter = 0
        for (let i = 0; i < data[count].shareholders.length; i++) {
            sharesTotal = data[count].shareholders[i].number_of_shares + sharesTotal
            shareHolderCounter++;
        }
        if (!checker) {
            if (shareHolderCounter == 1)
            {
                return "" + stockName + ", has " + shareHolderCounter + " shareholder that owns a total of " + sharesTotal + " shares."
            }
            else if (shareHolderCounter == 0) {
                return "" + stockName + " currently has no shareholders."
            }
            else {
                return "" + stockName + ", has " + shareHolderCounter + " shareholders that own a total of " + sharesTotal + " shares."
            }
        }
        else{
            throw "Error, nothing matches"
        }
    }
}

async function listStocks(firstName, lastName) {
    if (typeof firstName != 'string' || typeof lastName != 'string') {
        throw "Error, first name and last name must be strings"
    }
    else if (firstName.trim().length == 0 || lastName.trim().length == 0){
        throw "Error, first name and last name must not be empty"
    }
    else {
        let data = await getPeople()
        let dataStocks = await getStocks()
        id = ""
        for (let i = 0; i < data.length; i++) {
            if (data[i].first_name == firstName && data[i].last_name == lastName) {
                id = data[i].id
            }
        }
        answer = []
        count = 0;
        temp = {}
        checker = true
        for (let i = 0; i < dataStocks.length; i++) {
            for (let j = 0; j < dataStocks[i].shareholders.length; j++) {
                if (id == dataStocks[i].shareholders[j].userId) {
                    temp = {'stock_name': "" + dataStocks[i].stock_name + "", 'number_of_shares': dataStocks[i].shareholders[j].number_of_shares}
                    answer.push(temp)
                    checker = false
                }
            }
        }
        if (!checker) {
            return answer
        }
        else {
            throw "Error, the first name and last name are not in people.json together"
        }
    }
}

async function getStockByID(id) {
    if (typeof id != 'string') {
        throw "Error, id must be a string"
    }
    else if (id == ''){
        throw "Error, id must not be empty"
    }
    else {
        let data = await getStocks()
        for (let i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                return data[i]
            }
        }
        throw "Error, stock not found"
    }
}

module.exports = {
    firstName: "Jason", 
    lastName: "Rossi", 
    studentId: "10447479",
    listShareholders,
    totalShares,
    listStocks,
    getStockByID
}