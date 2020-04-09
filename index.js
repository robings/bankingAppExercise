const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bodyParser =  require('body-parser');
const app = express();
const PORT = 4000;
const dbName = 'hipposBank';
const collectionAccounts = 'accounts';

const url = 'mongodb://localhost:27017';

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Hippos Banking App</h1>');
})

app.get('/accounts', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, async (err, client) => {
        let db = client.db(dbName);
        let documentsReturned = await getUsers(db);
        await res.send(documentsReturned);
    });
});

let getUsers = async(db) => {
    let collection = db.collection(collectionAccounts);
    let result = await collection.find({deleted:false}).toArray();
    return result
};



app.listen(PORT, ()=> {
    console.log(`Hippos Banking App listening on port ${PORT}`);
})
