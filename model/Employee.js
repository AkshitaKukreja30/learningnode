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
//class call it simply by Employee.
EmployeeSchema.statics= {
    

}
//instance call it simply by response.
EmployeeSchema.methods= {

}
var Employee = mongoose.model('Employee',EmployeeSchema);
module.exports = {
	Employee: Employee
} ;