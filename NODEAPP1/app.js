
/**
 * Module dependencies.
*express as backbone
 */

var express = require('express');
var app = express();
var routes = require('./routes');
var http = require('http');
var path = require('path');

//new db stuff
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
var TaskList = require('./routes/tasklist.js');
var TaskDao = require('./Models/TaskDAO.js');
var docDBUTIL = require('./Models/docDBUTIL.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/practicepage', routes.practicepage);


//docDBUTIL.getOrCreateDatabase(docDbClient, config.databaseId, function (err,result) {
//    if (err) {
//        console.log(err);
//    }
//    else {
//        var db = result._self;
//        console.log(result._self);
//        // so possibly the collID has to be in result or somewhere from Db query
//        //result ?? or ??
//        docDBUTIL.getOrCreateCollection(docDbClient, db, config.collectionId, function (err, results) {
//            if (err) {
//                console.log(err);
//            } else {
//                var coll = results._self;
//                console.log(coll);
//                console.log("the data is..  :   ");
//                docDBUTIL.getOrCreateDocuments(docDbClient, coll , "1", function (err, docresult) {
                    
//                    console.log("entered document phase...");

//                    if (err) {
//                        console.log(err);
//                    }
//                    else {
//                        console.log(docresult);
//                    }

//                });
//            }
//        });
//    }
    
//});
//kevin

//docDBUTIL.getOrCreateCollection(docDbClient, config.databaseId, config.collectionId, function (err, results) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(results);
//    }
//});

//app.get('/dbandsocket', taskList.showTasks.find(taskList));
//app.get('/socketpp/:id',socetprac.chat);

//http.createServer(app).listen(app.get('port'), function () {
//    console.log('Express server listening on port ' + app.get('port'));
//});

var server = http.createServer(app).listen(app.get('port'), function () {
       console.log('Express server listening on port ' + app.get('port'));
    });

var io = require('socket.io').listen(server);


io.on("connection",function (socket) {
    console.log('a new user connected');
    //one more event handler inside this function..
    socket.on("disconnect", function (socket) {
        console.log("user has disconnected.."); 
    });
    //one more event handler when client sends a message..
    socket.on("clientsent",function (msg , fn) {
        io.emit("serversent", msg);
        fn("success");   
    });
});


//here we declare a new ddb client
var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});
var taskDao = new TaskDao(docDbClient, config.databaseId, config.collectionId);

//this is not needed right now.. it contains component or controll specific code.. look at it later..
var taskList = new TaskList(taskDao);
taskDao.init();
app.get('/dbandsocket', taskList.showTasks.bind(taskList));
app.post('/bindingdata', taskList.showTasks.bind(taskList));



