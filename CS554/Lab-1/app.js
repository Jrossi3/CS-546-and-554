const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

app.use('/login', (req, res, next) => {
  if (req.session.user) {
    console.log('User is authenticated')
    next();
  } else {
    console.log('User is not authenticated')
    res.status(404);
    return
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});