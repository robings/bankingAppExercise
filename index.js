const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const dbName = 'hipposBank';
const collectionAccounts = 'accounts';

const url = 'mongodb://localhost:27017';

const responseTemplate = {
    success: false,
    message: '',
    data: []
}

app.use(bodyParser.json());

//landing route
app.get('/', (req, res) => {
    res.send('<h1>Hippos Banking App</h1>use url /accounts to use the API');
})

//route to get all accounts
app.get('/accounts', (req, res) => {
    let filterOperand;
    let filterValue;
    if (req.query.gt) {
        filterValue = req.query.gt;
        filterOperand = 'gt'
    }
    if (req.query.lt) {
        filterValue = req.query.lt
        filterOperand = 'lt'
    }

    MongoClient.connect(url, {useUnifiedTopology: true}, async (err, client) => {
        let db = client.db(dbName);
        let accountsReturned = await getAccounts(db, filterOperand, filterValue);
        let response = responseTemplate;
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

let getAccounts = async(db, filterOperand, filterValue) => {
    let collection = db.collection(collectionAccounts);
    let result;

    if (filterOperand && filterValue) {
        if (filterOperand === 'gt') {
        result = await collection.find({$and: [{deleted:false}, {balance: {$gt: parseInt(filterValue)}}]}).toArray();
        } else if (filterOperand === 'lt') {
        result = await collection.find({$and: [{deleted:false}, {balance: {$lt: parseInt(filterValue)}}]}).toArray();
        }
    } else {
        result = await collection.find({deleted:false}).toArray();
    }

    return result;
};

//route to add an account
app.post('/accounts', (req, res) => {
    const dataToSend = {
        name: req.body.name,
        balance: req.body.balance,
        deleted: false
    };

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
        console.log ('Connect to MongoDb');

        let db = client.db(dbName);
        let response = responseTemplate;
        let status;
        let docs = await insertDataInDb(db, dataToSend);
            console.log(docs.insertedCount)
            if (docs.insertedCount === 1) {
                response.success = true;
                response.message = 'Account successfully added';
                status=200;
            } else {
                response.success = false;
                response.message = 'Could not add account';
                status=404;
            }
        res.status(status).send(response)
        client.close()
    })
})

let insertDataInDb = async (db, dataToSend) => {
        let collection = db.collection(collectionAccounts);
        let results = await collection.insertOne(dataToSend);
        return results;
}

//route to edit balance of account
app.put('/accounts', (req, res) => {
    const dataToSend = {
        id: ObjectId(req.body.id),
        addToBalance: req.body.addToBalance,
    };

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
        console.log ('Connect to MongoDb');

        let db = client.db(dbName);
        let response = responseTemplate;
        let status;
        let docs = await updateBalanceInDb(db, dataToSend);
        console.log(docs.modifiedCount)
        if (docs.modifiedCount === 1) {
            response.success = true;
            response.message = 'Account balance successfully updated';
            status=200;
        } else {
            response.success = false;
            response.message = 'Could not update balance';
            status=404;
        }
        res.status(status).send(response)
        client.close()
    })
})

let updateBalanceInDb = async (db, dataToSend) => {
    let collection = db.collection(collectionAccounts);
    let results = await collection.updateOne({_id:dataToSend.id}, {$inc: {balance: dataToSend.addToBalance}});
    return results;
}

//route to soft delete an account
app.delete('/accounts', (req, res) => {
    const dataToSend = {
        id: ObjectId(req.body.id)
    };

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
        console.log ('Connect to MongoDb');

        let db = client.db(dbName);
        let response = responseTemplate;
        let status;
        let docs = await softDeleteAccountFromDb(db, dataToSend);
        console.log(docs.modifiedCount)
        if (docs.modifiedCount === 1) {
            response.success = true;
            response.message = 'Account successfully deleted';
            status=200;
        } else {
            response.success = false;
            response.message = 'Could not delete account';
            status=404;
        }
        res.status(status).send(response)
        client.close()
    })
})

let softDeleteAccountFromDb = async (db, dataToSend) => {
    let collection = db.collection(collectionAccounts);
    let results = await collection.updateOne({_id:dataToSend.id}, {$set: {deleted: true}});
    return results;
}

app.listen(PORT, ()=> {
    console.log(`Hippos Banking App listening on port ${PORT}`);
})
