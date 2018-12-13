const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
//const url = 'mongodb://172.22.0.2:27017';
const url = "mongodb://localhost:27017/";

// Database Name
const dbName = 'BudgeDB';

//MongoClient.connect("mongodb://localhost:27017/BudgeDB", { useNewUrlParser: true })

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Connected successfully to server");
    var dbo = db.db(dbName);
    var query = {Utilities: 33};
    dbo.collection("spendingData").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});