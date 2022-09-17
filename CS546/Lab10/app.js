const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

app.use(async (req,res,next)=>{
  console.log("[%s]: %s %s ", new Date().toUTCString(), req.method, req.originalUrl, (req.session.user))
  if (req.session.user) {
    console.log('User is authenticated')
  } else {
    console.log('User is not authenticated')
  }
  next();
})

app.use('/private', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
});

app.use('/login', (req, res, next) => {
  let x = req.body

  if (req.session.user) {
    console.log('User is authenticated')
    console.log(x.password)
    return res.redirect('/private');
  } else {
    console.log('User is not authenticated')
    //here I'm just manually setting the req.method to post since it's usually coming from a form
    req.method = 'POST';
    next();
  }
  
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});