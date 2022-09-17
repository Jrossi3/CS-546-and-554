const express = require('express');
const router = express.Router();
const data = require('../data');
const bandsData = data.bands;
const albumsData = data.albums;
const { ObjectId } = require('mongodb');

// DONE

router.route('/:bandId').get(async (req, res) => {
    var id = req.params.bandId
    try {
        if (!id) throw 'there must be an id found in the system'
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        if (typeof id !== 'string'){
            throw 'error'
        }
    }
    catch (e) {
        return res.status(400).json(e);
    }
    try {
        const people = await albumsData.getAll(id);
        res.json(people);
    } catch (e) {
        res.status(400).json(e);
    }
})

// DONE

router.route('/:bandId').post(async (req, res) => {
    let userInfo = req.body;
    try {
        if (!userInfo._id) throw "You must supply a band id"
        if (!userInfo.title) throw "You must supply a title"
        if (!userInfo.releaseDate) throw "You must supply a release date"
        if (!userInfo.tracks) throw "You must supply tracks"
        if (!userInfo.rating) throw "You must supply a rating"
        if (typeof userInfo._id !== 'string') throw "Title must be a string"
        if (typeof userInfo.releaseDate !== 'string') throw "Release Date must be a string"
        if (typeof userInfo.title !== 'string') throw "Tracks must be a string"
        if (userInfo.title.trim() == 0) throw "Name cannot be empty"
        if (userInfo.releaseDate.trim() == 0) throw "Website cannot be empty"
        if (userInfo._id.trim() == 0) throw "Record Label cannot be empty"
        if (!ObjectId.isValid(userInfo._id)) throw 'invalid object ID';
        if (userInfo.releaseDate.trim() == 0) throw "Website cannot be empty"
        if (typeof userInfo.tracks === 'object') {
            if (userInfo.tracks.length > 2) {
                tracksCheck = true
                for (let i = 0; i < userInfo.tracks.length; i++) {
                    if (typeof userInfo.tracks[i] !== 'string') {
                        tracksCheck = false
                    }
                    else if (typeof userInfo.tracks[i] === 'string') {
                        if (userInfo.tracks[i].trim().length == 0) {
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
        if (typeof userInfo.rating !== 'number') throw 'Rating must be a number'
        if (userInfo.rating < 1 || userInfo.rating > 5) throw 'Rating must be a number from 1 to 5'
        if (userInfo.releaseDate < 1900 || userInfo.releaseDate > 2022) throw "Release date must be between 1900 and the current year + 1"
    } catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        const newPost = await albumsData.create(userInfo._id, userInfo.title, userInfo.releaseDate, userInfo.tracks, userInfo.rating);
        res.status(200).json(newPost);
    } catch (e) {
        res.status(404).json(e);
    }
})

// DONE

router.route('/album/:albumId').get(async (req, res) => {
    var id = req.params.albumId
    try {
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        if (typeof id !== 'string'){
            throw 'error'
        }
    }
    catch (e) {
        return res.status(400).json(e);
    }
    try {
        const people = await albumsData.get(id);
        res.status(200).json(people);
    } catch (e) {
        res.status(404).json(e);
    }
})

// DONE

router.route('/:albumId').delete(async (req, res) => {
    var id = req.params.albumId
    try {
        await albumsData.get(id);
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
    } catch (e) {
        return res.status(404).json({error: 'Post not found'});
    }
    try {
        await albumsData.remove(id);
        res.status(200).json({deleted: true});
    } catch (e) {
        res.status(500).json({error: e});
    }
})
module.exports = router;
