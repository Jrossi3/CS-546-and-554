const axios = require("axios").default;
const mongoCollections = require('../config/mongoCollections')
const sweets = mongoCollections.sweets
const bcrypt = require ('bcrypt')
const { ObjectId } = require("mongodb")
// const e = require("express")
let moods = ["happy", "sad", "angry", "excited", "surprised", "loved", "blessed", 
"greatful", "blissful", "silly", "chill", "motivated", "emotional", "annoyed", "lucky", "determined", "bored", "hungry", "disappointed", "worried"]

async function createSweet(sweetText, sweetMood, userThatPosted){
    if(!sweetText) throw "Error: sweetText does not exist"
    if(!sweetMood) throw "Error: sweetMood does not exist"
    if(!userThatPosted) throw "Error: No user exists"
    if(!userThatPosted._id) throw "Error: No user id present"
    if(typeof sweetText != "string") throw "Error: sweetText is not a string"
    if(typeof sweetMood != "string") throw "Error: sweetMood is not a string"
    let moods = ["happy", "sad", "angry", "excited", "surprised", "loved", "blessed", 
    "greatful", "blissful", "silly", "chill", "motivated", "emotional", "annoyed", "lucky", "determined", "bored", "hungry", "disappointed", "worried"]
    let checker = false
    if(!sweetText || !sweetMood){
        throw error
    }
    for(let i = 0; i < moods.length; i++){
        if(sweetMood.toLowerCase().localeCompare(moods[i]) == 0){
            checker = true
        }
    }
    if(!checker){
        throw "Error: mood must be happy, sad, angry, excited, surprised, loved, blessed, greatful, blissful, silly, chill, motivated, emotional, annoyed, lucky, determined, bored, hungry, disappointed, or worried"
    }
    let a = {
        _id: new ObjectId(),
        "sweetText": sweetText, 
        "sweetMood": sweetMood,
        "userThatPosted": {_id: userThatPosted._id, username: userThatPosted.username},
        "replies": [],
        "likes": [] 
    }
    const sweetsCollection = await sweets();
    const newInfo = await sweetsCollection.insertOne(a)
    if (!newInfo.acknowledged || !newInfo.insertedId){
        throw "Could not add sweet";
    }
    a._id = a._id.toString()
    return a;
}

async function getSweetId(sweetId) {
    if(!sweetId) throw "sweetId parameter not provided"
    if(typeof sweetId != "string") throw "sweetId is not a string"
    sweetId = sweetId.trim()
    sweetId = sweetId.toLowerCase()
    if(sweetId.length == 0) throw "sweetId is an empty string"
    id = Object(sweetId)
    const sweetsCollection = await sweets();
    const sweet = await sweetsCollection.findOne({ _id: id })
    if (sweet === null) throw 'No user with that sweetId'
    return id
}

async function addReply(sweetId, reply, userThatPosted){
    if(!reply) throw "Error: no reply provided"
    if(!sweetId) throw "Error: sweetId not provided"
    if(!userThatPosted) throw "Error: no user provided"
    if(typeof reply != "string") throw "Error: reply is not a string"
    if(typeof sweetId != "string") throw "Error: sweet id is not a string"
    if(typeof userThatPosted._id != "string") throw "Error: user id is not a string"
    sweetId = sweetId.trim()
    sweetId = sweetId.toLowerCase()
    if(sweetId.length == 0) throw "Error: sweetId is an empty string"
    const sweetsCollection = await sweets()
    const sweet = await sweetsCollection.getSweetId(ObjectId(userId))
    
    if (sweet === null) throw 'No user with that sweetId';
    const userId = userThatPosted._id
    const username1 = userThatPosted.username
    let newReply = {
        _id: new ObjectId(),
        "userThatPostedReply": {_id: ObjectId(userId), username: username1},
        "reply": reply
    }
    sweet.replies = sweet.replies.push(newReply)
    return sweet.replies
}

async function removeReply(sweetId, replyId, userThatPosted) {
    if(!replyId) throw "Error: no reply id provided"
    if(!sweetId) throw "Error: sweetId parameter not provided"
    if(!userThatPosted) throw "Error: no user provided"
    if(typeof replyId != "string") throw "Error: reply id is not a string"
    if(typeof sweetId != "string") throw "Error: sweet id is not a string"
    if(typeof userThatPosted._id != "string") throw "Error: user is not a string"
    sweetId = sweetId.trim()
    sweetId = sweetId.toLowerCase()
    if(sweetId.length == 0) throw "Error: sweetId is an empty string"
    const sweetsCollection = await sweets()
    let sweet = await getSweetId(sweetId)
    if(!sweet) throw "Error: Sweet could not be found based on given id"
    for(let i = 0; i < sweet.replies.length; i++){
        if(sweet.replies[i]._id.toString() != replyId 
        && sweet.replies[i].userThatPostedReply._id.toString() 
        == userThatPosted._id){
            sweet.replies.splice(i,1)
            break
        }
    }
    await sweetsCollection.updateOne({_id: ObjectId(sweetId)}, {$set: {replies: sweet.replies}})
    const newSweet = await getSweetId(sweetId)
    return newSweet
}

async function updateSweet(userId, sweetId, updatedSweet) {
    if(!userId) throw "Error: user id does not exist"
    if(!sweetId) throw "Error: sweet id does not exist"
    if(!updatedSweet) throw "Error: no updated sweet exists"
    if(typeof userId != "string") throw "Error: user id is not a string"
    if(typeof sweetId != "string") throw "Error: sweet id is not a string"
    let checker = false
    for(let i = 0; i < moods.length; i++){
        if(updatedSweet.toLowerCase().localeCompare(moods[i]) == 0){
            checker = true
        }
    }
    if(!checker){
        throw "Error: mood must be happy, sad, angry, excited, surprised, loved, blessed, greatful, blissful, silly, chill, motivated, emotional, annoyed, lucky, determined, bored, hungry, disappointed, or worried"
    }
    const sweetsCollection = await sweets()
    let newId = ObjectId(sweetId)
    let newInfo = await sweetsCollection.updateOne({_id: newId}, {$set: updatedSweet})
    if(newInfo.updatedCount == 0) throw "Error: could not update the database"
    let newSweet = await getSweetId(sweetId)
    return newSweet
}

async function getSweetsPage(page){
    let skipPage
    if(!page || page == 1){
        skipPage = 0
    } else {
        skipPage = 50 * (page - 1)
    }
    const sweetsCollection = await sweets()
    const sweetsList = await sweetsCollection.find({}).skip(skipPage).limit(50).toArray()
    if (sweetsList.length == 0) throw "Could not get all sweets"
    return sweetsList
}

async function likesSweet(sweetIdLike, user){
    const sweetsCollection = await sweets();
    let sweet = await getSweetId(sweetIdLike);
    let userId = user._id
    let checker = false
    for(let i = 0; i < sweet.likes.length; i++){
        if(userId == sweet.likes[i]._id){
            sweet.likes.splice(i,1)
            checker = true
            break
        }
    }
    if(!checker){
        sweet.likes.push(userId)
    }
    await sweetsCollection.updateOne({_id: ObjectId(sweetIdLike)}, {$set: {likes: sweet.likes}})
    return
}

module.exports = {
    createSweet,
    getSweetId,
    addReply,
    removeReply,
    updateSweet,
    getSweetsPage,
    likesSweet
}