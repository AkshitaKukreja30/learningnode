var express = require('express')
const bodyParser     = require('body-parser');
const _               = require('lodash');

var { emp } = require('../model/emp');
var { mongoose } = require('../mongoose');
var {ObjectID} = require('mongodb');

var apiRoutes = function(router) {
	router = express.Router();

	router.post('/postData',(req,res) => {
		console.log(req.body.name);
		console.log(req.body.cgiCode);
		console.log(req.body.emailId);
		var empObj = new emp({
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

		empObj.save().then((doc) => {
			res.send(doc);
			console.log('Saved it',doc);

		} , (e) => {
			res.send(e);
			console.log('unable to save');
		});

	});


	router.get('/getData',(req,res) => {

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
		emp.find({'isDeleted':false})
		.limit(limitNum)
		.sort({'name':1})
		.skip(skipRecords)
		.then((doc) => {
			res.send(doc);


		} , (e) => {
			res.send(e);
			res.status(480).send(e);
		});

	});


	router.get('/getDataById',(req,res) => {
    //console.log(req.query.id);
    var id = req.query.id;
    console.log(id);

    if(!ObjectID.isValid(id)) {
    	console.log('enter a valid id');
    	return res.status(404).send();
    }
    emp.findById(id).then((doc) => {
    	if(!doc) {
    		console.log('id not found');
    		return res.status(404).send();
    	}


    	res.send(doc);

    }).catch((e) => {

    	res.status(400).send();
    });

});



    router.delete('/deleteDataById',(req,res) => {
    
    var id = req.query.id;
    

    if(!ObjectID.isValid(id)) {
        console.log('enter a valid id');
        return res.status(404).send();
    }
    emp.findById(id).then((doc) => {
            if(!doc) {
                console.log('id not found');
                return res.status(404).send();
            }
    
        emp.findByIdAndRemove(id).then((doc) => {
            if(!doc) {
                console.log('id not found');
                return res.status(404).send();
                
            }

            res.send(doc);
            

        }).catch((e) => {
        
        res.status(400).send();
        });

            });
});

	router.patch('/updateById', (req,res) => {
		var id = req.query.id ;
		var body=_.pick(req.body, ['name','cgiCode','emailId','address.city','address.street','address.pincode','isDeleted']);
		if(!ObjectID.isValid(id)) {
			console.log('enter a valid id');
			return res.status(404).send();
		}
		emp.findByIdAndUpdate(id, {$set:body}, {new:true}).then((doc) => {
			if(!doc) {
				console.log('id not found');
				return res.status(404).send();
			}

			console.log('found it');
			res.send(doc);
		}).catch((e) => {
			res.status(400).send(); 


		})



	});


	router.get('/displaySimilarNames' , (req,res) => {
		var expression = req.query.expression;
		console.log(expression);
		emp.find({name: {$regex: "^"+ expression} }).then((doc)=> {
			res.send(doc);
		})
	});


	router.delete('/deleteDataByIdVirtually',(req,res) => {

		var id = req.query.id;

		if(!ObjectID.isValid(id)) {
			console.log('enter a valid id');
			return res.status(404).send();
		}
		emp.findById(id).then((doc) => {
			if(!doc) {
				console.log('id not found');
				return res.status(404).send();
			}

			emp.findByIdAndUpdate(id, {$set:{isDeleted:true}}, {new:true}).then((doc) => {
				if(!doc) {
					console.log('id not found');
					return res.status(404).send();
				}

				res.send(doc);         

			}).catch((e) => {

				res.status(400).send();
			});

		});
	});


	router.get('/getDeletedRecords',(req,res) => {
    
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
    emp.find({'isDeleted':true})
    .limit(limitNum)
    .sort({'name':1})
    .skip(skipRecords)
    .then((doc) => {
            res.send(doc);
            

        } , (e) => {
        res.send(e);
        res.status(480).send(e);
        });

            });


	return router;
};

module.exports = apiRoutes;