var express = require('express')
const bodyParser     = require('body-parser');
const _               = require('lodash');

var { Employee } = require('../model/Employee');
var { mongoose } = require('../mongoose');
var {ObjectID} = require('mongodb');

var api = require('../controllers'),
    apiRoutes;
// var path = require('path')

apiRoutes = function(router) {
    router = express.Router();
 
    // router.post('/user/signup', api.user.signup);
   
    
    router.post('/postData', api.employee.postData);
    router.get('/getData', api.employee.getData);
    router.get('/getDataById', api.employee.getDataById);
    router.delete('/deleteDataById',api.employee.deleteDataById);
    router.patch('/updateById',api.employee.updateById);
    router.get('/displaySimilarNames',api.employee.displaySimilarNames);
    router.delete('/deleteDataByIdVirtually',api.employee.deleteDataByIdVirtually);
    router.get('/getDeletedRecords',api.employee.getDeletedRecords);
    


    return router;
};

module.exports = apiRoutes;