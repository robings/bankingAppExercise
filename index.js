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

//landing route
app.get('/', (req, res) => {
    res.send('<h1>Hippos Banking App</h1>use url /accounts to use the API');
})

//route to get all accounts
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

//route to add an account
app.post('/accounts', (req, res) => {
    const dataToSend = {
        name: req.body.name,
        balance: req.body.balance
    };

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
        console.log ('Connect to MongoDb');

        let db = client.db(dbName)

        //run a function that adds data to db
        let docs = await insertDataInDb(db, dataToSend);
            if (docs.insertedCount === 1) {
                res.send('It Worked')
            } else {
                res.send('It did nay work')
            }
            client.close()
    })
})

let insertDataInDb = async (db, dataToSend) => {
        let collection = db.collection(collectionAccounts);
        collection.insertOne(dataToSend, (err, docs) => {
           console.log (docs);
        })
        return await didItWork;
}




app.listen(PORT, ()=> {
    console.log(`Hippos Banking App listening on port ${PORT}`);
})
