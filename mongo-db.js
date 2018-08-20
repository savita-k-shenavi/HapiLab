// Connection URL. This is where your mongodb server is running.
'use strict';
//var url = 'mongodb://apistoreusr:welcome-1234@g4t7569.houston.hpecorp.net:20001/apistore?authMechanism=MONGODB-CR&authSource=admin';
var url = 'mongodb://localhost:27017/apistore';
//lets require/import the mongodb native drivers.
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = require('mongodb').MongoClient;
var myDb;

var db_options = {
    db: {
        raw: false
    },
    server: {
        poolSize: 100
    }
}



/**
 * will reuse connection if already created
 */
function connect() {
    if (myDb === undefined) {
        MongoClient.connect(url, db_options, function (err, db) {
            // if (err) {
            //     console.log('connect Error' + err);
            // }

            myDb = db;
            console.log(myDb);
            console.log('mongo connect done !!');
        });
    }
    return myDb;
}





var createCollection = function (collectionName, callback) {


    var collection = myDb.collection(collectionName);

    // Find some documents
    myDb.createCollection(collectionName, function (err, result) {
        // //console.log(result);

        callback(result);

    });


}



var findDocuments = function (collectionName, MongoFilterCondition, options, callback) {
    //  if (myDb === undefined) {
    //          connect();
    //      }
    var collection = myDb.collection(collectionName);


    calculateCount(collection, MongoFilterCondition, options, function (total) {
        var resultObj = total;
        if (total) {
            collection.find(MongoFilterCondition, options).toArray(function (err, docs) {
                resultObj.results = docs;
                //console.log(resultObj);
                callback(resultObj);
            })
        }
    });

    


}





var insertDocuments = function (collectionName, document, callback) {
    if (myDb === undefined) {
        connect();
    }

    // MongoClient.connect(url, function (err, db) {
    // assert.equal(null, err);
    // db.authenticate('kafkauser', 'kafkaIB123', function (err, res) {
    var collection = myDb.collection(collectionName);

    // Insert some documents
    collection.insert(document, function (err, result) {
        console.log("Inserted the documents in collection " + collectionName);
        //console.log(result);
        // myDb.close();
        callback(result);
    });
    // });
    // });

}

var insertArrayofDocuments = function (collectionName, docArray, callback) {
    if (myDb === undefined) {
        connect();
    }
    //MongoClient.connect(url, function (err, db) {
    // assert.equal(null, err);
    // db.authenticate('kafkauser', 'kafkaIB123', function (err, res) {
    var collection = myDb.collection(collectionName);

    var obj = JSON.parse(docArray);
    for (var i = 0; i < obj.length; i++) {
        collection.insertOne(obj[i], function (err, result) {
            console.log("Inserted the documents in collection " + collectionName);
            // console.log(result);
            //myDb.close();
            callback(result);
        });
    }

    // });
    //});
}


var updateDocument = function (collectionName, whereClauseObj, document, callback) {
    if (myDb === undefined) {
        connect();
    }

    // MongoClient.connect(url, function (err, db) {
    // assert.equal(null, err);
    // db.authenticate('kafkauser', 'kafkaIB123', function (err, res) {
    var collection = myDb.collection(collectionName);
    collection.updateOne(whereClauseObj, { $set: document }, function (err, result) {
        console.log("Updated the document");
        // console.log(result);
        //myDb.close();
        callback(result);
    });

    // });
    // });
}


var upsertDocument = function (collectionName, whereClauseObj, setValuesObj, callback) {
    if (myDb === undefined) {
        connect();
    }

    // MongoClient.connect(url, function (err, db) {
    // assert.equal(null, err);
    // db.authenticate('kafkauser', 'kafkaIB123', function (err, res) {
    var collection = myDb.collection(collectionName);

    collection.findOneAndUpdate(whereClauseObj, { $inc: setValuesObj }, { returnOriginal: false, upsert: true }, function (err, result) {
        console.log("Upserted the document ");
        // console.log(result);
        // myDb.close();
        callback(result);
    });

    // });
    // });
}

var deleteDocument = function (collectionName, whereClauseObj, callback) {

    if (myDb === undefined) {
        connect();
    }
    //MongoClient.connect(url, function (err, db) {
    // assert.equal(null, err);
    // db.authenticate('kafkauser', 'kafkaIB123', function (err, res) {
    var collection = myDb.collection(collectionName);
    console.log('deleteDocument Error' + err);
    // Insert some documents
    collection.deleteOne(whereClauseObj, function (err, result) {
        console.log("Removed the document from the collection");
        // console.log(result);
        //myDb.close();
        callback(result);
    });
    // });
    // });
};

var NumberOfHits = function (db_collection_obj, MongoFilterCondition, options, callback) {

    if (db_collection_obj) {
        var nofhits;
        db_collection_obj.find(MongoFilterCondition, options).count(function (err, count) {
            nofhits = count;
            // console.log(nofhits);
            callback(nofhits);
        });
    }
    else {
        console.log('NumberOfHits Error' + err);
    }
};


var TotalNumberOfHits = function (db_collection_obj, MongoFilterCondition, callback) {
    if (db_collection_obj) {
        var totalhits;
        db_collection_obj.find(MongoFilterCondition).count(function (err, count) {
            console.log("Number of hits inside loop" + JSON.stringify(count))
            totalhits = count;
            console.log(totalhits);
            callback(totalhits);
        });
    }
    else { // Perform a total count command
        console.log('TotalNumberOfHits Error' + err);
    }
}


//
var findDocswithOutLimit = function (collectionName, MongoFilterCondition, MongoPrintFieldCondition, callback) {

    if (myDb === undefined) {
        connect();
    }

    // MongoClient.connect(url, function (err, db) {
    // assert.equal(null, err);
    // db.authenticate('kafkauser', 'kafkaIB123', function (err, res) {
    var collection = myDb.collection(collectionName);


    if (collection) {
        // Find some documents
        collection.find(MongoFilterCondition, MongoPrintFieldCondition).limit(1000).toArray(function (err, docs) {
            // console.log(docs);
            //myDb.close();
            callback(docs);
        });
    }
    else {
        console.log('findDocswithOutLimit Error' + err);
    }

    // });
    // });
}



var calculateCount = function (db_collection_obj, MongoFilterCondition, options, callback) {
    NumberOfHits(db_collection_obj, MongoFilterCondition, options, function (Hits) {
        TotalNumberOfHits(db_collection_obj, MongoFilterCondition, function (THits) {
            var combinedResult = { "LimitedHits": Hits, "TotalHits": THits };
            callback(combinedResult)
        });

    });
}



var updateUserFavorites = function (collectionName, userEmailAddress, updatedocument, callback) {
    if (myDb === undefined) {
        connect();
    }


    //MongoClient.connect(url, function (err, db) {
    // assert.equal(null, err);
    // db.authenticate('kafkauser', 'kafkaIB123', function (err, res) {
    var collection = myDb.collection(collectionName);
    var whereClauseObj = { "email": userEmailAddress };
    var favPayload = { $push: { "favoriteapi": updatedocument } };

    collection.update(whereClauseObj, favPayload, function (err, result) {
        console.log("Updated the document");
        //  console.log(result);
        // myDb.close();
        callback(result);
    });


    // });
    //});
}

var RemoveUserFavorites = function (collectionName, userEmailAddress, toberemovedocument, callback) {


    if (myDb === undefined) {
        connect();
    }

    //MongoClient.connect(url, function (err, db) {
    // assert.equal(null, err);
    // db.authenticate('kafkauser', 'kafkaIB123', function (err, res) {
    var collection = myDb.collection(collectionName);
    var whereClauseObj = { "email": userEmailAddress };
    var favPayload = { $pull: { "favoriteapi": toberemovedocument } };

    collection.update(whereClauseObj, favPayload, function (err, result) {
        console.log("Removed the document");
        //  console.log(result);
        //  myDb.close();
        callback(result);
    });


    // });
    // });
}

var findCategories = function (collectionName, reply) {
    if (myDb === undefined) {
        connect();
    }
    console.log(collectionName);
    var collection = myDb.collection(collectionName);
    collection.find({}).toArray(function (err, docs) {
        reply(docs);
    });

}

exports.findCategories = findCategories;
exports.connect = connect;
exports.createCollection = createCollection;
exports.findDocuments = findDocuments;
exports.insertDocuments = insertDocuments;
exports.insertArrayofDocuments = insertArrayofDocuments;
exports.updateDocument = updateDocument;
exports.upsertDocument = upsertDocument;
exports.deleteDocument = deleteDocument;
exports.NumberOfHits = NumberOfHits;
exports.TotalNumberOfHits = TotalNumberOfHits;
exports.findDocswithOutLimit = findDocswithOutLimit;
exports.updateUserFavorites = updateUserFavorites;
exports.RemoveUserFavorites = RemoveUserFavorites;