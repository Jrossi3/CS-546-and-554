const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');
let overallRatingAverage = 0
const bandsFile = require('./bands')

async function create(bandId, title, releaseDate, tracks, rating) {
    if (!bandId) throw 'You must provide the band id';
    if (!title) throw 'You must provide the title';
    if (!releaseDate) throw 'You must provide the release date';
    if (!tracks) throw 'You must provide the tracks';
    if (!rating) throw 'You must provide the rating';
    if (typeof bandId !== 'string') throw 'Band id must be a string';
    if (typeof title !== 'string') throw 'Title must be a string';
    if (typeof releaseDate !== 'string') throw 'Release date must be a string';
    if (bandId.trim().length == 0) throw 'Band id must not be an empty string';
    if (title.trim().length == 0) throw 'Title must not be an empty string';
    if (releaseDate.trim().length == 0) throw 'Release date must not be an empty string';
    if (!ObjectId.isValid(bandId)) throw 'invalid object ID';
    if (typeof rating !== 'number') throw 'Rating must be a number'
    if (rating < 1 || rating > 5) throw 'Rating must be a number from 1 to 5'
    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(bandId) });
    if (!band) throw 'No band with that id';
    if (typeof tracks === 'object') {
        if (tracks.length > 2) {
            tracksCheck = true
            for (let i = 0; i < tracks.length; i++) {
                if (typeof tracks[i] !== 'string') {
                    tracksCheck = false
                }
                else if (typeof tracks[i] === 'string') {
                    if (tracks[i].trim().length == 0) {
                        tracksCheck = false
                    }
                }
            }
            if(!tracksCheck){
                throw "Every element in tracks must be a non-empty string"
            }
        } else {
            throw "Tracks must have at least 3 elements"
        }
    } else {
        throw "Tracks must be a non-empty array"
    }
    if (releaseDate < 1900 || releaseDate > 2023) throw "Release date must be between 1900 and the current year + 1"
    const albumInfo = {
        _id: new ObjectId(),
        title: title,
        releaseDate: releaseDate,
        tracks: tracks,
        rating: rating
    };
    const bandsCollection = await bands();
    for (let i = 0; i < band.albums.length; i++){
        overallRatingAverage = overallRatingAverage + band.albums[i].rating
    }
    overallRatingAverage = (overallRatingAverage / band.albums.length).toFixed(1)

    await bandsCollection.updateOne({_id: ObjectId(bandId)}, {$addToSet: {albums: albumInfo}})
    await bandsCollection.updateOne({_id: ObjectId(bandId)}, {$set: {overallRating: parseFloat(overallRatingAverage)}})
      .then(function () {
        albumInfo._id = albumInfo._id.toString();
      });
    return albumInfo
}

async function getAll(bandId) {
    if (!bandId) throw 'You must provide an band id'
    if (typeof bandId !== 'string') throw 'Band id must be a string'
    if (bandId.trim().length == 0) throw 'Band id must be a non-empty string'
    const bandCollection = await bands();
    const bandList = await bandCollection.find({}, {projection: {_id: 0, albums: 1}}).toArray();
    if (!bandList) throw 'Could not get all bands';  
    if (!ObjectId.isValid(bandId)) throw 'invalid object ID';
    const final = await bandsFile.get(bandId)
    return final.albums;
}

async function get(albumId) {
    if (!albumId) throw 'You must provide an id to search for';
    if (typeof albumId !== 'string') throw 'Id must be a string';
    if (albumId.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
    albumId = albumId.trim();
    if (!ObjectId.isValid(albumId)) throw 'invalid object ID';
    const bandCollection = await bands();
    const band = await bandCollection.find({"albums._id": ObjectId(albumId)})
        .project({"id": 0, "albums": {$elemMatch:{"_id":ObjectId(albumId)}}}).toArray();
    const x = band[0].albums[0]
    x._id = x._id.toString()
    return x
}

async function remove(albumId) {
    if (!albumId) throw 'You must provide an id to search for';
    if (typeof albumId !== 'string') throw 'Id must be a string';
    if (albumId.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
    albumId = albumId.trim();
    if (!ObjectId.isValid(albumId)) throw 'invalid object ID'
    const bandCollection = await bands();
    await bandCollection.aggregate([{$unset: "albums"}])
    const band = await bandCollection.find({"albums._id": ObjectId(albumId)})
        .project({"id": 0, "albums": {$elemMatch:{"_id":ObjectId(albumId)}}}).toArray();
    await bandCollection.update(
        {"_id": ObjectId(band[0]._id.toString())},
        {$pull : { albums : {_id: ObjectId(albumId)} } },
    )
    return band
}

module.exports = {
    create,
    getAll,
    get,
    remove
}