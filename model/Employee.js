var mongoose = require ('mongoose'),
Schema = mongoose.Schema,
EmployeeSchema = new Schema({

    name: {
        type: String
    },
    
    cgiCode : {
        type: Number
    },

    emailId : {
        type: String
    },

    address : {

        city : {
            type: String
        } ,

        street : {
            type: String
        } ,

        pincode : {
            type : Number
        }
    } ,

    isDeleted : {
     type : Boolean ,
     default : false
 }});

var Employee = mongoose.model('Employee',EmployeeSchema);
module.exports = {
	Employee: Employee
} ;