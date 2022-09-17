const express = require('express');
const { checkUser, createUser } = require('../data/users');
const app = express();
const router = express.Router()
const bcrypt = require('bcrypt');
let x;

router.get('/', async (req, res) => {
    if (req.session.user){
        res.redirect('/private')
    }
    else {
        res.render('posts/login')
    }
});

router.get('/signup', async (req, res) => {
    if (req.session.user){
        res.redirect('/private')
    }
    else {
        res.render('posts/signup')
    }
});

router.post('/signup', async (req, res) => {
    x = req.body
    let y = await createUser(x.username, x.password)
    if (y.userInserted == true){
        res.redirect('/private')
    } else {
        res.render('posts/error', {error: y})
    }
});

router.post('/login', async (req, res) => {
    x = req.body
    let y = await checkUser(x.username, x.password)
    req.session.user = {username: x.username}
    x = x.username
    if (y.authenticated == true){
        res.redirect('/private')
    } else {
        res.render('posts/error', {error: y})
    }
});

router.get('/private', async (req, res) => {
    res.render('posts/private', {username: x})
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('posts/logout')
});

module.exports = router