var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function TaskList(taskDao) {
    this.taskDao = taskDao;
}

module.exports = TaskList;

TaskList.prototype = {
    showTasks: function (req, res) {
        var self = this;
        
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                    name: '@id',
                    value: "1"
                }]
        };
        
        self.taskDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
            
            res.render('dbandsocket', {
                title: 'My ToDo List ',
                tasks: items
            });
        });
    }

};