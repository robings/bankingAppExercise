# Hippos Banking App

An exercise to build routes for a simple Banking App using node and express.

WARNING: Completely unsuitable for using for real banking!

Requirements:
MongoDb database "hipposBank" with "accounts" collection.
Export of "accounts" collection to json available in db folder.

# API Endpoints (Routes)

##  Get All Accounts
URL: /accounts

Method: GET

URL Params: none

Data Params: none

Success Response:

Code: 200
```
{
      "success": true,
      "message": "Accounts retrieved",
      "data": [
          {
              "_id": "5e8ee8b135fc7507b6c0136a",
              "name": "Cuthbert",
              "balance": 24000,
              "deleted": false
          },
          {
              "_id": "5e8ee8e235fc7507b6c0136b",
              "name": "Dibble",
              "balance": 12000,
              "deleted": false
          },
          {
              "_id": "5e8ee8fe35fc7507b6c0136c",
              "name": "Grub",
              "balance": 30000,
              "deleted": false
          }
      ]
  }
```
  
  Error response:
  
  Code: 404
  ```{
        "success": false,
        "message": "Could not retrieve accounts",
        "data": []
    }
```