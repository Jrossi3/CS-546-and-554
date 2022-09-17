const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');

async function create(name, genre, website, recordLabel, bandMembers, yearFormed){
    if (!name) throw 'You must provide a name';
    if (!genre) throw 'You must provide a genre';
    if (!website) throw 'You must provide a website';
    if (!recordLabel) throw 'You must provide a record label';
    if (!bandMembers) throw 'You must provide band members';
    if (!yearFormed) throw 'You must provide the year formed';
    if (typeof name !== 'string') throw 'name must be a string';
    if (typeof website !== 'string') throw 'genre must be a string';
    if (typeof recordLabel !== 'string') throw 'website must be a string';
    if (name.trim().length === 0) throw 'Name cannot be an empty string or just spaces';
    if (website.trim().length === 0) throw 'Genre cannot be an empty string or just spaces';
    if (recordLabel.trim().length === 0) throw 'Website cannot be an empty string or just spaces';
    if (website.startsWith("http://www.") && website.endsWith(".com") && website.trim().length >= 20) {

    } else {
        throw 'Website must include "https://www.", end with ".com" and have 5 letters between those.'
    }
    if (typeof genre === 'object') {
        if (genre.length > 0) {
            genreCheck = false
            for (let i = 0; i < genre.length; i++) {
                if (typeof genre[i] === 'string') {
                    if (genre[i].trim().length > 0) {
                        genreCheck = true
                    }
                }
            }
            if(!genreCheck){
                throw "Genre must contain a string"
            }
        } else {
            throw "Genre cannot be empty"
        }
    } else {
        throw "Genre must be a non-empty array"
    }
    if (typeof bandMembers === 'object') {
        if (bandMembers.length > 0) {
            bandCheck = false
            for (let i = 0; i < bandMembers.length; i++) {
                if (typeof bandMembers[i] === 'string') {
                    if (bandMembers[i].trim().length > 0) {
                        bandCheck = true
                    }
                }
            }
            if (!bandCheck) {
                throw "Band Members must contain a string"
            }
        } else {
            throw "Band Members shoudl not be empty"
        }
    } else {
        throw "bandMembers must be a non-empty array"
    }
    if (typeof yearFormed === 'number') {
        if (yearFormed >= 1900 && yearFormed <= 2022 ) {

        } else {
            throw "Year formed must be between 1900 and 2022"
        }
    } else {
        throw "Year formed must be a number"
    }
    const bandCollection = await bands();
    const newBandInfo = {
        name: name,
        genre: genre,
        website: website,
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearFormed: yearFormed
    };
        const insertInfo = await bandCollection.insertOne(newBandInfo);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
          throw 'Could not add band';
        const newBand = await this.get(insertInfo.insertedId.toString());
        return newBand;
}

async function getAll() {
    const bandCollection = await bands();
    const bandList = await bandCollection.find({}).toArray();
    if (!bandList) throw 'Could not get all bands';    
    for (let i = 0; i < bandList.length; i++){
        bandList[i]._id = bandList[i]._id.toString()
    }
    return bandList;
}

async function get(id){
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(id) });
    if (!band) throw 'No band with that id';
    band._id = band._id.toString()
    return band;
}

async function remove(id){
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const bandCollection = await bands();
    const name = await get(id);
    const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });
    if (deletionInfo.deletedCount === 0) {
      throw 'Could not delete band with id of ' + id;
    }
    return name.name + ' has been successfully deleted!';
}

async function rename(id, newName) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
        throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    if (!newName) throw 'You must provide a new name';
    if (typeof newName !== 'string') throw 'New Name must be a string';
    if (newName.trim().length === 0)
        throw 'New Name cannot be an empty string or just spaces';
    const bandCollection = await bands();
    const bandToBeRenamed = await get(id);
    const updatedInfo = await bandCollection.updateOne(
        { _id: ObjectId(id) },
        {$set:{name: newName}},
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not rename the band successfully';
    }
    return await this.get(id)
}

module.exports = {
    create,
    getAll,
    get,
    remove,
    rename
}