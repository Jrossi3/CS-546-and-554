const md5 = require('blueimp-md5');
const publickey = '68d414f0697d2803278394996509607d';
const privatekey = '81fa5adb4356542bf2b1ff3ed65f63e6a513ff9d';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const axios = require("axios").default;

async function getCharactersId(id){
    try {
        const charactersUrl = 'https://gateway.marvel.com:443/v1/public/characters/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash
        const { data } = await axios.get(charactersUrl)
        if(data.code == 404) throw error
        return data
    } catch (error) {
        return error
    }
}

async function getComicsId(id){
    try {
        const comicsUrl = 'https://gateway.marvel.com:443/v1/public/comics/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash
        const { data } = await axios.get(comicsUrl)
        if(data.code == 404) throw error
        return data
    } catch (error) {
        return error
    }
}

async function getStoriesId(id){
    try {
        const storiesUrl = 'https://gateway.marvel.com:443/v1/public/stories/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash
        const { data } = await axios.get(storiesUrl)
        if(data.code == 404) throw error
        return data
    } catch (error) {
        return error
    }
}

module.exports = {
    getCharactersId,
    getComicsId,
    getStoriesId
}