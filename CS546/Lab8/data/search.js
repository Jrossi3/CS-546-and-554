const axios = require("axios").default;
async function getSearchTerm(searchTerm){
    const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)
    temp = []
    for (let i = 0; i < 5; i++) {
        if(data[i]){
            temp[i] = data[i]
        }
    }
    return temp
}

async function getId(id){
    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`)
    return data
}

module.exports = {
    getSearchTerm,
    getId
}