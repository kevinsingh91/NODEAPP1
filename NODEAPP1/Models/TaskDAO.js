var DocumentDBClient = require('documentdb').DocumentClient;
var docDBUTIL = require('./docDBUTIL.js');

function TaskDao(documentDBClient, databaseId, collectionId) {
    this.client = documentDBClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;
    
    this.database = null;
    this.collection = null;
}

module.exports = TaskDao;

TaskDao.prototype = {
    init: function (callback) {
    var self = this;
        
        docDBUTIL.getOrCreateDatabase(self.client, self.databaseId, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                var db = result._self;
                self.database = db;
                console.log(result._self);
                // so possibly the collID has to be in result or somewhere from Db query
                //result ?? or ??
                docDBUTIL.getOrCreateCollection(self.client, db, self.collectionId, function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        var coll = results._self;
                        self.collection = coll;
                        console.log(coll);
                        console.log("the data is..  :   ");
                        docDBUTIL.getOrCreateDocuments(self.client, coll , "1", function (err, docresult) {
                            
                            console.log("entered document phase...");
                            
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(docresult);
                            }

                        });
                    }
                });
            }
        //self.client.queryDatabases('SELECT * FROM root r WHERE r.id="' + self.databaseId + '"').toArray(function (err, database) {
        //    if (err) return console.log(err);
        //    console.log('Query db');
            
        //    self.client.queryCollections(database[0]._self, 'SELECT * FROM root r WHERE r.id="' + self.collectionId + '"').toArray(function (err, collection) {
        //        if (err) return console.log(err);
        //        console.log('Query collection');
                
        //        self.client.queryDocuments(collection[0]._self, 'SELECT * FROM root r WHERE r.id="' + 1 + '"').toArray(function (err, document) {
        //            if (err) return console.log(err);
        //            console.log('Got Document with content: ', document);
            
        //        });
        //    });
        //});

        
        }
        );
    },
    find: function (querySpec, callback) {
        var self = this;
        self.client.queryDocuments(self.collection, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                callback(null, results);
            }
        });
}
}