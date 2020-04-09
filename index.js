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
        let accountsReturned = await getUsers(db);
        let response = {};
        let status;
        if (accountsReturned.length > 0) {
            response.success = true;
            response.message = 'Accounts retrieved';
            response.data = accountsReturned;
            status=200;
        } else {
            response.success = false;
            response.message = 'Could not retrieve accounts';
            response.data = [];
            status=404;
        }

        await res.status(status).send(response);
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
