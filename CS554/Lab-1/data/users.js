const axios = require("axios").default;
const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users
const bcrypt = require ('bcrypt')
const { ObjectId } = require("mongodb")

async function loginUser(username, password){
    let usersCollection = await users()
    let username1 = await usersCollection.findOne({username: username})
    if(!username || !password) return "Error: you must provide a username and password"
    if(typeof username != 'string' || typeof password != 'string') return "Error: username and password must be a string"
    if(!username.trim()) throw "Error: username cannot be empty"
    if(!password.trim()) throw "Error: password cannot be empty"
    if(username.length < 4) return "Error: username must be at least 4 characters long"
    username = username.toLowerCase()
    if (password.length <= 5) return "Password must be at least 6 characters long"
    let compareTo = false;
    compareTo = await bcrypt.compare(password, username1.password)
    if(compareTo){
        console.log("Passwords do match")
    } else {
        console.log("Passwords do not match")
        return "Error: password does not match username"
    }
    delete username1.password
    return username1
}

async function createSweetsUser(password, username, name){
    if(typeof username != "string" || typeof password != "string" || typeof name != "string") return "Error: username, password, and name must be a string"
    if(!username || !password || !name) return "Error: you must provide a username, password, and name"
    if(username.length < 4) return "Error: username must be at least 4 characters long"
    if(password.length <= 5) return "Error: password must be at least 6 characters long"
    if(password.trim().length == 0) return "Error: password cannot be empty"
    if(username.trim().length == 0) return "Error: username cannot be empty"
    if(name.trim().length == 0) return "Error: name cannot be empty"
    username = username.toLowerCase()
    let usersCollection = await users()
    let tempArr = await usersCollection.find({}).toArray()
    let saltRounds = 12
    const hash = await bcrypt.hash(password, saltRounds)
    for (let i = 0; i < tempArr.length; i++){
        if (username == tempArr[i].username) return "Error: username already in use"
    }
    let b = {
        _id: new ObjectId(),
        "name": name,
        "username": username,
        "password": hash
    }
    let x = await usersCollection.insertOne(b)
    if (x.insertedCount == 0) return "Error, object was not inserted"
    // b._id = b.insertedId.toString()
    // to ensure password is not in json
    delete b.password
    return b
}

async function getUserId(userId) {
    if(!userId) throw "sweetId parameter not provided";
    if(typeof userId != "string") throw "sweetId is not a string";
    userId = userId.trim();
    userId = userId.toLowerCase();
    if(userId.length == 0) throw "sweetId cannot be an empty string";
    id = Object(userId)
    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: id });
    if (user === null) throw "No user with that sweetId";
    return id;
}

module.exports={
    loginUser,
    createSweetsUser,
    getUserId
}