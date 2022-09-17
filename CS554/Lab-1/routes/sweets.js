const express = require('express');
// const { getSweetsPage, createSweet } = require('../data/sweets');
const data = require('../data');
const sweet = data.sweets
const users = data.users
const app = express();
const router = express.Router()
let x;

// 404 is not found
// 403 is forbidden, logged in but still don't have permission
// 401 is unauthorized, not logged in

router.get('/', async (req, res) => {
    try {
        if(typeof parseInt(req.query.page) != "number"){
            throw "Must be a number"
        } else {
            if(parseInt(req.query.page)<0){
                throw "Error: page number must be 0 or positive"
            }
            res.status(200).json(await sweet.getSweetsPage(parseInt(req.query.page)))
        }
    } catch (error) {
        res.status(404).json(error)
    }
});

router.get('/:id', async (req, res) => {
    var id = req.params.id
    try {
        if(!id) throw "Error: no id"
        if(typeof id != "string") throw "Error: id is not a string"
        const sweet = await sweet.getSweetId(id)
        res.status(200).json(sweet)
    } catch (error) {
        res.status(404).json({error: "Error: sweet id could not be found"})
    }
});

router.post('/', async (req, res) => {
    try {
        x = req.body
        if(!x.sweetText) throw "Error: no sweet text provided"
        if(!x.sweetMood) throw "Error: no sweet mood provided"
        if(typeof x.sweetText != "string") throw "Error: sweet text is not a string"
        if(typeof x.sweetMood != "string") throw "Error: sweet mood is not a string"
        const details = req.session.body
        const username = details.username
        let y
        if(req.session.user){
            y = await createSweet(x.sweetText, x.sweetMood, username)
            res.status(200).json(y)
        } else {
            throw error
        }
    } catch (error) {
        res.status(401).json({error: "Error: user must be logged in"})
    }
})

router.patch('/:id', async (req, res) => {
    try{
        if(req.session.user){
            if(req.body.sweetText){
                if(typeof sweetText != "string") throw "Error: sweet text is not a string"
            }
            if(req.body.sweetMood){
                if(typeof sweetMood != "string") throw "Error: sweet move is not a string"
            }
            const id = req.params.id
            if(!id) throw "Error: id must be supplied"
            if(typeof id != "string") throw "Error: id invalid type"
            const newSweet = await sweet.updateSweet(req.session.user._id, id, req.body)
            res.status(200).json(newSweet)
        } else {
            throw error
        }
    } catch(error){
        res.status(401).json({error: "Error: user must be logged in to update the sweet"})
    }
    
});

router.post('/:id/replies', async (req, res) => {
    try {
        if(req.session.user){
            const id = req.params.id
            const reply = req.body.reply
            if(!id) throw "Error: id must be supplied"
            if(typeof id != "string") throw "Error: id invalid type"
            if(!reply) throw "Error: reply must be supplied"
            if(typeof reply != "string") throw "Error: reply invalid type"
            const y = await sweet.addReply(id, reply, req.session.user)
            res.status(200).json(y)
        }
        else {
            throw error
        }
    } catch (error) {
        res.status(401).json({error: "Error: user must be logged in to post a reply"})
    }
})

router.delete('/:id/replies', async (req, res) => {
    try{
        if(req.session.user){
            const id = req.params.sweetId
            const replyId = req.params.replyId
            if(!id) throw "Error: sweetId must be supplied"
            if(typeof id != "string") throw "Error: sweet id should be a string"
            if(!replyId) throw "Error: replyId must be supplied"
            if(typeof replyId != "string") throw "Error: replyId should be a string"
            const removedSweet = await sweet.removeReply(id, replyId, req.session.user)
            res.status(200).json(removedSweet)
        } else {
            throw error
        }
    } catch(error){
        res.status(401).json({error: "Error: user must be logged in to delete a reply"})
    }
})

router.post('/:id/likes', async (req, res) => {
    try{
        if(req.session.user){
            try {
                const id = await sweet.getSweetId(req.params.sweetId)
                if(!id) throw "Error: sweet Id must be supplied"
                if(typeof id != "string") throw "Error: sweet id must be string"
                let y = await sweet.likesSweet(id, req.session.user)
                res.status(200).json(y)
            } catch (error) {
                res.status(500).json({error: "Error: the request failed"})
            }
        } else {
            throw error
        }
    } catch(error){
        res.status(401).json({error: "Error: user must be logged in to like a sweet"})
    }
});

router.post('/signup', async (req, res) => {
    try {
        if(!req.session.user){
            x = req.body
            let y = await users.createSweetsUser(x.password.trim(), x.username.trim(), x.name.trim())
            res.status(200).json(y)
        } else {
            throw error
        }
    } catch (error) {
        res.status(400).json({error: "Error: user is already logged in"})
    }
});

router.post('/login', async (req, res) => {
    try {
        if(!req.session.user){
            x = req.body
            let y = await users.loginUser(x.username, x.password)
            res.status(200).json(y)
        } else {
            throw error
        }
    } catch (error) {
        res.status(400).json({error: "Error: user is already logged in"})
    }
});

router.get('/logout', async (req, res) => {
    try {
        if(req.session.user){
            req.session.destroy()
            res.status(200)
        } else {
            throw error
        }
    } catch (error) {
        res.status(401).json({error: "Error: user is not logged in"})
    }
});

module.exports = router