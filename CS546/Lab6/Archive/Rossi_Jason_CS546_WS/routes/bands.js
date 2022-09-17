const express = require('express');
const router = express.Router();
const data = require('../data');
const bandsData = data.bands;
const albumsData = data.albums;
const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');

// DONE

router.route('/').get(async (req, res) => {
    try {
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
    } catch (e) {
        res.status(400).json(e);
    }
    try {
        const bandCollection = await bands();
        const movieList = await bandCollection
            .find({}, { projection: { _id: 1, name: 1 } })
            .toArray();
        res.json(movieList);
    } catch (e) {
        res.status(404).json(e);
    }
})

// DONE

router.route('/').post(async (req, res) => {
    let userInfo = req.body;
    try {
        if (!userInfo.name) throw "You must supply a name"
        if (!userInfo.genre) throw "You must supply a genre"
        if (!userInfo.website) throw "You must supply a website"
        if (!userInfo.recordLabel) throw "You must supply a record label"
        if (!userInfo.bandMembers) throw "You must supply band members"
        if (!userInfo.yearFormed) throw "You must supply a year formed"
        if (typeof userInfo.name !== 'string') throw "You must supply a name"
        if (typeof userInfo.website !== 'string') throw "You must supply a website"
        if (typeof userInfo.recordLabel !== 'string') throw "You must supply a record label"
        if (userInfo.name.trim() == 0) throw "Name cannot be empty"
        if (userInfo.website.trim() == 0) throw "Website cannot be empty"
        if (userInfo.recordLabel.trim() == 0) throw "Record Label cannot be empty"
        if (userInfo.website.startsWith("http://www.") && userInfo.website.endsWith(".com") && userInfo.website.trim().length >= 20) {

        } else {
            throw 'Website must include "https://www.", end with ".com" and have 5 letters between those.'
        }
        if (!ObjectId.isValid(userInfo._id)) throw 'invalid object ID';
        if (userInfo.yearFormed < 1900 || userInfo.yearFormed > 2022) throw "Release date must be between 1900 and the current year + 1"
    } catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        const newPost = await bandsData.create(userInfo.name, userInfo.genre, userInfo.website, userInfo.recordLabel, userInfo.bandMembers, userInfo.yearFormed);
        res.status(200).json(newPost);
    } catch (e) {
        res.status(404).json(e);
    }
})

// DONE

router.route('/:id').get(async (req, res) => {
    var id = req.params.id
    try {
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        if (typeof id !== 'string') {
            throw 'error'
        }
    } catch (e) {
        return res.status(400).json(e);
    }
    try {
        const temp = await bandsData.get(id) 
        res.status(200).json(temp);
    } catch (e) {
        return res.status(404).json(e);
    }
})

// DONE

router.route('/:id').put(async (req, res) => {
    var id = req.params.id
    const newName = req.body
    try {
        if (typeof id !== 'string') {
            throw 'error'
        }
        else if (id.trim().length == 0) {
            throw 'error'
        }
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
    } catch (e) {
        return res.status(400).json(e);
    }
    try {
        const people = await bandsData.rename(id, newName.name);
        res.status(200).json(people);
    } catch (e) {
        res.status(404).json(e);
    }
})

// DONE

router.delete('/:id', async (req, res) => {
    var id = req.params.id
    console.log(1)
    try {
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        if (typeof id !== 'string') {
            throw 'error'
        }
    } catch (e) {
        return res.status(400).json({ error: 'Post not found' });
    }
    try {
        await bandsData.remove(req.params.id);
        res.status(200).json({ deleted: true });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
})
module.exports = router;
