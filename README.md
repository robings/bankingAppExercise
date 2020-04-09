# Hippos Banking App

An exercise to build routes for a simple Banking App using node and express.

WARNING: Completely unsuitable for using for real banking!

Requirements:
MongoDb database "hipposBank" with "accounts" collection.
Export of "accounts" collection to json available in db folder.

# API Endpoints (Routes)

##  Get All Accounts
* **URL:** /accounts

* **Method:** GET

* **URL Params:** required: none

* **Data Params:** none

* **Success Response:**

    **Code:** 200
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
  
* **Error response:**
  
    **Code:** 404
    ```
    {
        "success": false,
        "message": "Could not retrieve accounts",
        "data": []
    }
    ```

## Add Account

* **URL:** /accounts

* **Method:** `POST`

* **URL Params:**

    required: none

* **Data Params:**
 
    { "name": "Cuthbert", "balance":1500}

    "name" - name of the account holder

    "balance" - the balance of the new account

* **Success Response:**

    **Code:** 200
    ```
    {
        "success": true,
        "message": "Account successfully added",
        "data": []
    }
    ```
  
* **Error response:**
    
    **Code:** 404
    ```
    {
      "success": false,
      "message": "Could not add account",
      "data": []
    }
    ```
  
  ## Update Account Balance
  
  * **URL:** /accounts
  
  * **Method:** `PUT`
  
  * **URL Params:**
  
      required: none
  
  * **Data Params:**
   
      { "id": "5e8f19ec3a6e79194b335667", "addToBalance": 200}
  
      "id" - the MongoDb ObjectId
  
      "balance" - the amount to add
  
  * **Success Response:**
  
      **Code:** 200
      ```
      {
          "success": true,
          "message": "Account balance successfully updated",
          "data": []
      }
      ```
    
  * **Error response:**
      
      **Code:** 404
      ```
      {
        "success": false,
        "message": "Could not update balance",
        "data": []
      }
      ```
    
## Delete Account
  
  * **URL:** /accounts
  
  * **Method:** `DELETE`
  
  * **URL Params:**
  
      required: none
  
  * **Data Params:**
   
      { "id": "5e8f19ec3a6e79194b335667" }
  
      "id" - the MongoDb ObjectId
  
  * **Success Response:**
  
      **Code:** 200
      ```
      {
          "success": true,
          "message": "Account successfully deleted",
          "data": []
      }
      ```
    
  * **Error response:**
      
      **Code:** 404
      ```
      {
        "success": false,
        "message": "Could not delete account",
        "data": []
      }
      ```