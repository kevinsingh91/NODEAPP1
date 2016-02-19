var DocumentDBClient = require('documentdb').DocumentClient;

//this part is for basic queries that can be reused all over app...

var DocDBUtils = {
    getOrCreateDatabase: function (client, databaseId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                    name: '@id',
                    value: databaseId
                }]
        };
        
        client.queryDatabases(querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                if (results.length === 0) {
                    var databaseSpec = {
                        id: databaseId
                    };
                    
                    client.createDatabase(databaseSpec, function (err, created) {
                        callback(null, created);
                    });

                } else {
                    callback(null, results[0]);
                }
            }
        });
    },
    
    getOrCreateCollection: function (client, databaseLink, collectionId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                    name: '@id',
                    value: collectionId
                }]
        };
        
        client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                if (results.length === 0) {
                    var collectionSpec = {
                        id: collectionId
                    };
                    
                    var requestOptions = {
                        offerType: 'S1'
                    };
                    
                    client.createCollection(databaseLink, collectionSpec, requestOptions, function (err, created) {
                        callback(null, created);
                    });

                } else {
                    callback(null, results[0]);
                }
            }
        });
    },

    //// func for documents..

    getOrCreateDocuments: function (client, collectionlink, documentID, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                    name: '@id',
                    value: documentID        //this should be changed as per dynamic inputs given
                }]
        };
        
        client.queryDocuments(collectionlink, querySpec).toArray(function (err, documents) {
            if (err) {
                callback(err);

            } else {
                if (documents.length === 0) {
                    var collectionSpec = {
                        id: documentID
                    };
                  
                } else {
                    callback(null, documents);
                }
            }
        });
    }

};

module.exports = DocDBUtils;