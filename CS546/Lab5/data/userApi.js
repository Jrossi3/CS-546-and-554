const axios = require("axios").default;
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    return data // this will be the array of people objects
}

async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
    return data // this will be the array of people objects
}

async function getAllDataPeople(){
    let data = await getPeople()
    return data
}
async function getAllDataWork(){
    let data = await getWork()
    return data
}

async function getPersonByID(id) {//do edge cases
    if (isNaN(id)) {
        throw "Error, id must be a number"
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

async function getWorkByID(id) {//do edge cases
    if (isNaN(id)) {
        throw "Error, id must be a number"
    }
    else if (id == ''){
        throw "Error, id must not be empty"
    }
    else {
        let data = await getWork()
        for (let i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                return data[i]
            }
        }
        throw "Error, company not found"
    }
}

module.exports = {
    getAllDataPeople,
    getAllDataWork,
    getPersonByID,
    getWorkByID
}