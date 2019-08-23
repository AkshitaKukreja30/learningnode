var express = require('express')  //Framework designed for building web applications and APIs.
const bodyParser     = require('body-parser') //extracts the entire body portion of an incoming request stream and exposes it on req.body .
const _               = require('lodash');  //library for utility functions
var { Employee } = require('../model/Employee');
var { mongoose } = require('../mongoose');
var {ObjectID} = require('mongodb');

var employee = {
	postData :(req,res) => {
		console.log(req.body.name);
		console.log(req.body.cgiCode);
		console.log(req.body.emailId);
		console.log("entire request");
		var EmployeeObj = new Employee({
			name : req.body.name ,
			cgiCode : req.body.cgiCode ,
			emailId : req.body.emailId ,
			address : {
				city : req.body.city ,
				street : req.body.street ,
				pincode : req.body.pincode
			} ,
			isDeleted : req.body.isDeleted
		});

		EmployeeObj.save().then((doc) => {
			res.send(doc);
			console.log('Saved it',doc);

		} , (e) => {
			res.send(e);
			console.log('unable to save');
		});

	} ,

	getData : (req,res) => {
		var limitNum = Number(req.query.limit);
		var pageNum = Number(req.query.page);
		if(!limitNum)
		{
			limitNum = 3;
		}
		if(!pageNum)
		{
			pageNum = 1;
		}
		var skipRecords = (pageNum-1)*limitNum;
		console.log('limit is' + limitNum);
		Employee.find({'isDeleted':false})
		.limit(limitNum)
		.sort({'name':1})
		.skip(skipRecords)
		.then((doc) => {
			console.log(doc);
			res.send(doc);
			

		} , (e) => {
			res.send(e);
			res.status(480).send(e);
			console.log(doc);
		});

	}  ,

	getDataById : (req,res) => { 
    //console.log(req.query.id);
    var id = req.query.id;
    console.log(id);

    if(!ObjectID.isValid(id)) {
    	console.log('enter a valid id');
    	return res.status(404).send();
    }
    
    Employee.findById(id).then((doc) => {
    	if(!doc) {
    		console.log('id not found');
    		return res.status(404).send();
    	}


    	res.send(doc);

    }).catch((e) => {

    	res.status(400).send();
    });
},

deleteDataById :(req,res) => {
    console.log("in delete");
	var id = req.query.id;
	console.log(id);
	if(!ObjectID.isValid(id)) {
		console.log('enter a valid id');
		return res.status(404).send();
	}
	Employee.findById(id).then((doc) => {
		if(!doc) {
			console.log('id not found');
			return res.status(404).send();
		}

		Employee.findByIdAndRemove(id).then((doc) => {
			if(!doc) {
				console.log('id not found');
				return res.status(404).send();

			}

			res.send(doc);


		}).catch((e) => {

			res.status(400).send();
		});

	});
} ,

updateById : (req,res) => {
	var id = req.body.id ;
	var body=_.pick(req.body, ['name','cgiCode','emailId','address.city','address.street','address.pincode','isDeleted']);
	if(!ObjectID.isValid(id)) {
		console.log('enter a valid id');
		return res.status(404).send();
	}
	Employee.findByIdAndUpdate(id, {$set:body}, {new:true}).then((doc) => {
		if(!doc) {
			console.log('id not found');
			return res.status(404).send();
		}

		console.log('found it');
		res.send(doc);
	}).catch((e) => {
		res.status(400).send(); 

	})



} ,

displaySimilarNames :(req,res) => {
	var expression = req.query.expression;
	console.log(expression);
	Employee.find({name: {$regex: "^"+ expression} }).then((doc)=> {
		res.send(doc);
	})
} ,

deleteDataByIdVirtually :(req,res) => {

	var id = req.query.id;

	if(!ObjectID.isValid(id)) {
		console.log('enter a valid id');
		return res.status(404).send();
	}
	Employee.findById(id).then((doc) => {
		if(!doc) {
			console.log('id not found');
			return res.status(404).send();
		}

		Employee.findByIdAndUpdate(id, {$set:{isDeleted:true}}, {new:true}).then((doc) => {
			if(!doc) {
				console.log('id not found');
				return res.status(404).send();
			}

			res.send(doc);         

		}).catch((e) => {

			res.status(400).send();
		});

	});
} ,

	getDeletedRecords:(req,res) => {
		
		var limitNum = Number(req.query.limit);
		var pageNum = Number(req.query.page);
		
		if(!limitNum)
		{
			limitNum = 3;
		}

		if(!pageNum)
		{
			pageNum = 1;
		}
		
		var skipRecords = (pageNum-1)*limitNum;
		
		console.log('limit is' + limitNum);
		Employee.find({'isDeleted':true})
		.limit(limitNum)
		.sort({'name':1})
		.skip(skipRecords)
		.then((doc) => {
			res.send(doc);
			

		} , (e) => {
			res.send(e);
			res.status(480).send(e);
		});

	}

}

module.exports = employee