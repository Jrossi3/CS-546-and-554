const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

app.use('/public', static);
app.get('/', function (request, response) {
    
    response.sendFile(__dirname + '/public/index.html', {
      pageTitle: 'So Much ToDo!'
    });
  });
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});