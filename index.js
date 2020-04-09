const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser =  require('body-parser');
const app = express();
const PORT = 4000;

const url = 'mongodb://localhost:27017';

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Hippos Banking App</h1>');
})

app.get('/accounts', (req, res) => {

})

app.listen(PORT, ()=> {
    console.log(`Hippos Banking App listening on port ${PORT}`);
})
