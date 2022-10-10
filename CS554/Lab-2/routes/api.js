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
        res.json(await client.LRANGE("jason", 0, 19))
    } catch (error) {
        throw error
    }
});

router.get('/characters/:id', async (req, res) => {
    let id = req.params.id
    try {
        let cacheForIdExists = await client.get(id)
        if (cacheForIdExists) {
            console.log('Data was in cache')
            await client.LPUSH("jason", cacheForIdExists)
            res.send(JSON.parse(cacheForIdExists))
        } else {
            let x = await api.getCharactersId(id)
            if(x.code != 200){
                throw error
            }
            x = x.data.results[0]
            console.log('Data was not in cache')
            await client.set(
                id,
                JSON.stringify(x)
            )
            res.send(x)
        }
    } catch (error) {
        res.status(404).json({error: await api.getCharactersId(id)})
    }
});

router.get('/stories/:id', async (req, res) => {
    let id = req.params.id
    try {
        let cacheForIdExists = await client.get(id)
        if (cacheForIdExists) {
            console.log('Data was in cache')
            await client.LPUSH("stories", cacheForIdExists)
            res.send(JSON.parse(cacheForIdExists))
        } else {
            let x = await api.getStoriesId(id)
            if(x.code != 200){
                throw error
            }
            x = x.data.results[0]
            console.log('Data was not in cache')
            await client.set(
                id,
                JSON.stringify(x)
            )
            res.send(x)
        }
    } catch (error) {
        res.status(404).json({error: await api.getStoriesId(id)})
    }
});

router.get('/comics/:id', async (req, res) => {
    let id = req.params.id
    try {
        let cacheForIdExists = await client.get(id)
        if (cacheForIdExists) {
            console.log('Data was in cache')
            await client.LPUSH("comics", cacheForIdExists)
            res.send(JSON.parse(cacheForIdExists))
        } else {
            let x = await api.getComicsId(id)
            if(x.code != 200){
                throw error
            }
            x = x.data.results[0]
            console.log('Data was not in cache')
            await client.set(
                id,
                JSON.stringify(x)
            )
            res.send(x)
        }
    } catch (error) {
        res.status(404).json({error: await api.getComicsId(id)})
    }
});

module.exports = router