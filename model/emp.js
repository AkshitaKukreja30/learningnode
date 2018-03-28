var mongoose = require ('mongoose');

var emp = mongoose.model('emp',{

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
   }


});
module.exports = {
	emp
} ;