const axios = require("axios").default;
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require ('bcrypt')

async function createUser(username, password){
    if(typeof username != 'string' || typeof password != 'string'){
        return "Error, username and password must be a string"
    }
    if (!username || !password){
        return "Error, you must provide a username and password"
    }
    if (username.trim().length != username.length || password.trim().length != password.length){
        return "Error, username and password must not have any spaces in it"
    }
    if(username.length > 3){
        username = username.toLowerCase()
    } else {
        return "Error, username must be at least 4 characters long"
    }
    if (password.length <= 5) {
        return "Error, password must be at least 6 characters long"
    }
    let usersCollection = await users();
    let tempArr = await usersCollection.find({}).toArray();
    for (let i = 0; i < tempArr.length; i++){
        console.log(tempArr[i].username)
        if (username == tempArr[i].username){
            return "Error, username already in use"
        }
    }
    let saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);
    let x = await usersCollection.insertOne({username, hash})
    if (x.insertedCount == 0){
        return "Error, object was not inserted"
    }
    return {userInserted: true}
}

async function checkUser(username, password){
    let usersCollection = await users();
    let username1 = await usersCollection.findOne({username: username});
    if(!username1) {
        return "Error, either the username or password is invalid"
    }
    if(typeof username != 'string' || typeof password != 'string'){
        return "Error, username and password must be a string"
    }
    if (!username || !password){
        return "Error, you must provide a username and password"
    }
    if (username.trim().length != username.length || password.trim().length != password.length){
        return "Error, username and password must not have any spaces in it"
    }
    if(username.length > 3){
        username = username.toLowerCase()
    } else {
        return "Error, username must be at least 4 characters long"
    }
    if (password.length <= 5) {
        return "Password must be at least 6 characters long"
    }

    let saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);
    let compareTo = false;
    try {
        compareTo = await bcrypt.compare(password,hash)
    } catch(e) {
        
    }
    if(compareTo){
        console.log("Passwords do match")
    } else {
        console.log("Passwords do not match")
        return "Error, password does not match username"
    }

    return {authenticated: true}
}


module.exports = {
    createUser,
    checkUser
}