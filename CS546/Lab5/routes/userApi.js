const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.userApi;
router.route('/people').get(async (req, res) => {
    try {
        const people = await peopleData.getAllDataPeople();
        res.json(people);
    } catch (e) {
        res.status(404).json(e);
    }
})

router.route('/work').get(async (req, res) => {
    try {
        const people = await peopleData.getAllDataWork();
        res.json(people);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.route('/people/:id').get(async (req, res) => {
    var id = parseInt(req.params.id)
    try {
        const people = await peopleData.getPersonByID(id);
        res.json(people);
    } catch (e) {
        res.status(404).json(e);
    }
})

router.route('/work/:id').get(async (req, res) => {
    var id = parseInt(req.params.id)
    try {
        const people = await peopleData.getWorkByID(id);
        res.json(people);
    } catch (e) {
        res.status(404).json(e);
    }
})
module.exports = router;
