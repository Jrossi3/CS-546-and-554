const { Axios, default: axios } = require('axios')
const express = require('express')
const redis = require('redis')
const data = require('../data')
const client = redis.createClient()
const api = data.api
const app = express()
const router = express.Router()
client.connect().then(() => {})

// 404 is not found
// 403 is forbidden, logged in but still don't have permission
// 401 is unauthorized, not logged in

router.get('/characters/history', async (req, res) => {
    try {
        await client.LRANGE("jason", 0, 19)
        res.json(await client.LRANGE("jason", 0, 19))
    } catch (error) {
        throw error
    }
});

router.get('/characters/:id', async (req, res) => {
    let id = req.params.id
    let x = await api.getCharactersId(id)
    try {
        let cacheForIdExists = await client.get(id)
        if(x.code != 200){
            throw error
        }
        x = x.data.results[0]
        if (cacheForIdExists) {
            console.log('Data was in cache')
            await client.LPUSH("jason", JSON.stringify(x))
            res.send(JSON.parse(cacheForIdExists))
        } else {
            console.log('Data was not in cache')
            await client.set(
                id,
                JSON.stringify(x)
            )
            res.send("Not in the cache")
        }
    } catch (error) {
        res.status(404).json({error: x})
    }
});

router.get('/stories/:id', async (req, res) => {
    let id = req.params.id
    let x = await api.getStoriesId(id)
    try {
        let cacheForIdExists = await client.get(id)
        if(x.code != 200){
            throw error
        }
        x = x.data.results[0]
        if (cacheForIdExists) {
            console.log('Data was in cache')
            await client.LPUSH("stories", JSON.stringify(x))
            res.send(JSON.parse(cacheForIdExists))
        } else {
            console.log('Data was not in cache')
            await client.set(
                id,
                JSON.stringify(x)
            )
            res.send("Not in the cache")
        }
    } catch (error) {
        res.status(404).json({error: x})
    }
});

router.get('/comics/:id', async (req, res) => {
    let id = req.params.id
    let x = await api.getComicsId(id)
    try {
        let cacheForIdExists = await client.get(id)
        if(x.code != 200){
            throw error
        }
        x = x.data.results[0]
        if (cacheForIdExists) {
            console.log('Data was in cache')
            await client.LPUSH("comics", JSON.stringify(x))
            res.send(JSON.parse(cacheForIdExists))
        } else {
            console.log('Data was not in cache')
            await client.set(
                id,
                JSON.stringify(x)
            )
            res.send("Not in the cache")
        }
    } catch (error) {
        res.status(404).json({error: x})
    }
});

module.exports = router